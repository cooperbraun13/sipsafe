/**
 * Get Active Session API Route
 * 
 * Retrieves the current active session for the authenticated user.
 * 
 * Features:
 * - Protected route (requires authentication)
 * - Returns active session with all drinks
 * - Returns 404 if no active session
 * 
 * Route: GET /api/session/active
 * 
 * Response:
 *   {
 *     id: number,
 *     started_at: string,
 *     ended_at: string | null,
 *     peak_bac: number | null,
 *     drinks: Drink[]
 *   }
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const zagmail = user.email

  try {
    // Fetch active session (no end_time)
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('session_id, zagmail, start_time, end_time, bac')
      .eq('zagmail', zagmail)
      .is('end_time', null)
      .order('start_time', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (sessionError) {
      console.error('Session fetch error:', sessionError)
      return NextResponse.json({ error: 'Failed to fetch session' }, { status: 500 })
    }

    if (!session) {
      return NextResponse.json({ error: 'No active session' }, { status: 404 })
    }

    // Fetch all drinks for this session
    const { data: drinks, error: drinksError } = await supabase
      .from('drinks')
      .select('session_id, type, time, volume_oz, duration')
      .eq('session_id', session.session_id)
      .order('time', { ascending: true })

    if (drinksError) {
      console.error('Drinks fetch error:', drinksError)
      return NextResponse.json({ error: 'Failed to fetch drinks' }, { status: 500 })
    }

    // Get beverage information for drinks
    let formattedDrinks: any[] = []
    if (drinks && drinks.length > 0) {
      const beverageTypes = [...new Set(drinks.map(d => d.type))]
      const { data: beverages } = await supabase
        .from('beverages')
        .select('type, alc_pct')
        .in('type', beverageTypes)

      if (beverages) {
        const beverageMap = new Map(beverages.map(b => [b.type, b.alc_pct]))
        
        formattedDrinks = drinks.map(drink => ({
          session_id: drink.session_id,
          type: drink.type,
          time: drink.time,
          volume_oz: drink.volume_oz,
          duration: drink.duration,
          abv_pct: (beverageMap.get(drink.type) || 0) * 100,
        }))
      }
    } else {
      formattedDrinks = []
    }

    return NextResponse.json({
      id: session.session_id,
      started_at: session.start_time,
      ended_at: session.end_time,
      peak_bac: session.bac,
      drinks: formattedDrinks,
    })
  } catch (error) {
    console.error('Active session fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

