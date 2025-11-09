/**
 * Get Session API Route
 * 
 * Retrieves a specific session by ID for the authenticated user.
 * 
 * Features:
 * - Protected route (requires authentication)
 * - Verifies session belongs to user
 * - Returns session with all drinks
 * 
 * Route: GET /api/session/[id]
 * 
 * Response:
 *   {
 *     id: string,
 *     started_at: string,
 *     ended_at: string | null,
 *     peak_bac: number | null,
 *     drinks: Drink[]
 *   }
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const zagmail = user.email

  // Fetch session by ID (parse as integer since session_id is now SERIAL)
  const sessionId = parseInt(id, 10)
  if (isNaN(sessionId)) {
    return NextResponse.json({ error: 'Invalid session ID' }, { status: 400 })
  }

  const { data: session, error: sessionError } = await supabase
    .from('sessions')
    .select('session_id, zagmail, start_time, end_time, bac')
    .eq('session_id', sessionId)
    .single()

  if (sessionError || !session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  // Verify session belongs to user
  if (session.zagmail !== zagmail) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  // Fetch all drinks for this session
  const { data: drinks, error: drinksError } = await supabase
    .from('drinks')
    .select('session_id, type, time, volume_oz, duration')
    .eq('session_id', sessionId)
    .order('time', { ascending: true })

  if (drinksError) {
    return NextResponse.json({ error: 'Failed to fetch drinks' }, { status: 500 })
  }

  // Get beverage information for drinks
  if (drinks && drinks.length > 0) {
    const beverageTypes = [...new Set(drinks.map(d => d.type))]
    const { data: beverages } = await supabase
      .from('beverages')
      .select('type, alc_pct')
      .in('type', beverageTypes)

    if (beverages) {
      const beverageMap = new Map(beverages.map(b => [b.type, b.alc_pct]))
      
      // Format drinks with beverage info
      const formattedDrinks = drinks.map(drink => ({
        session_id: drink.session_id,
        type: drink.type,
        time: drink.time,
        volume_oz: drink.volume_oz,
        duration: drink.duration,
        abv_pct: (beverageMap.get(drink.type) || 0) * 100,
      }))

      return NextResponse.json({
        id: session.session_id,
        started_at: session.start_time,
        ended_at: session.end_time,
        peak_bac: session.bac,
        drinks: formattedDrinks,
      })
    }
  }

  return NextResponse.json({
    id: session.session_id,
    started_at: session.start_time,
    ended_at: session.end_time,
    peak_bac: session.bac,
    drinks: drinks || [],
  })
}