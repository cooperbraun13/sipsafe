/**
 * Add Drink API Route
 * 
 * Adds a drink to the active session for the authenticated user.
 * 
 * Features:
 * - Protected route (requires authentication)
 * - Validates drink data
 * - Creates drink record linked to active session
 * - Returns created drink
 * 
 * Route: POST /api/drink
 * 
 * Request Body:
 *   {
 *     type: string,      // Beverage type (e.g., 'beer', 'wine', 'whiskey_shot')
 *     volumeOz: number,  // Volume in ounces
 *     time?: string,     // Optional timestamp (defaults to now)
 *     duration?: string  // Optional duration as ISO interval (e.g., '2 hours', defaults to '0 hours')
 *   }
 * 
 * Response:
 *   { session_id: number, type: string, time: string, volume_oz: number, duration: string }
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const zagmail = user.email

  try {
    const body = await request.json()
    const { type, volumeOz, time, duration } = body

    // Validate request body
    if (!type || typeof type !== 'string') {
      return NextResponse.json({ error: 'Drink type is required' }, { status: 400 })
    }

    if (!volumeOz || typeof volumeOz !== 'number' || volumeOz <= 0 || volumeOz > 100) {
      return NextResponse.json({ error: 'Volume must be a positive number between 0 and 100 ounces' }, { status: 400 })
    }

    // Validate duration if provided
    if (duration && typeof duration !== 'string') {
      return NextResponse.json({ error: 'Duration must be a string in ISO interval format' }, { status: 400 })
    }

    // Verify beverage type exists
    const { data: beverage, error: beverageError } = await supabase
      .from('beverages')
      .select('type, alc_pct')
      .eq('type', type)
      .single()

    if (beverageError || !beverage) {
      return NextResponse.json({ error: 'Invalid beverage type' }, { status: 400 })
    }

    // Find active session for user
    const { data: activeSession, error: sessionError } = await supabase
      .from('sessions')
      .select('session_id')
      .eq('zagmail', zagmail)
      .is('end_time', null)
      .order('start_time', { ascending: false })
      .limit(1)
      .single()

    if (sessionError || !activeSession) {
      return NextResponse.json({ error: 'No active session found. Please start a session first.' }, { status: 404 })
    }

    // Prepare drink record
    const drinkTime = time || new Date().toISOString()
    const drinkDuration = duration || '0 hours' // Default to 0 if not provided

    // Create drink record
    const { data: drink, error: drinkError } = await supabase
      .from('drinks')
      .insert({
        session_id: activeSession.session_id,
        type,
        time: drinkTime,
        volume_oz: volumeOz,
        duration: drinkDuration,
      })
      .select('session_id, type, time, volume_oz, duration')
      .single()

    if (drinkError || !drink) {
      return NextResponse.json({ error: 'Failed to create drink' }, { status: 500 })
    }

    // Return created drink with formatted response
    return NextResponse.json({
      session_id: drink.session_id,
      type: drink.type,
      time: drink.time,
      volume_oz: drink.volume_oz,
      duration: drink.duration,
      abv_pct: beverage.alc_pct * 100, // Convert to percentage
    })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}

