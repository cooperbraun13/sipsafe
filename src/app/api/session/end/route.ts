/**
 * End Session API Route
 * 
 * Ends the active drinking session for the authenticated user.
 * 
 * Features:
 * - Protected route (requires authentication)
 * - Updates session with end time
 * - Calculates and stores peak BAC
 * - Returns completed session data
 * 
 * Route: POST /api/session/end
 * 
 * Request Body: (none required)
 * 
 * Response:
 *   { id: string, started_at: string, ended_at: string, peak_bac: number }
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !user.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const zagmail = user.email

  // Find active session for user
  const { data: activeSession, error: sessionError } = await supabase
    .from('sessions')
    .select('session_id, start_time')
    .eq('zagmail', zagmail)
    .is('end_time', null)
    .order('start_time', { ascending: false })
    .limit(1)
    .single()

  if (sessionError || !activeSession) {
    return NextResponse.json({ error: 'No active session found' }, { status: 404 })
  }

  // Get user profile for BAC calculation
  const { data: profile } = await supabase
    .from('profiles')
    .select('weight_lbs, sex')
    .eq('zagmail', zagmail)
    .single()

  // Get all drinks for this session
  const { data: drinks, error: drinksError } = await supabase
    .from('drinks')
    .select('type, volume_oz, time, duration')
    .eq('session_id', activeSession.session_id)
    .order('time', { ascending: true })

  if (drinksError) {
    return NextResponse.json({ error: 'Failed to fetch drinks' }, { status: 500 })
  }

  // Calculate peak BAC
  let peakBAC = 0
  if (drinks && drinks.length > 0 && profile) {
    // Get beverage types with alcohol percentages
    const beverageTypes = [...new Set(drinks.map(d => d.type))]
    const { data: beverages } = await supabase
      .from('beverages')
      .select('type, alc_pct')
      .in('type', beverageTypes)

    if (beverages) {
      const beverageMap = new Map(beverages.map(b => [b.type, b.alc_pct]))
      
      // Widmark factors
      const widmarkFactor = profile.sex === 'male' ? 0.68 : 0.55
      const weightKg = profile.weight_lbs * 0.453592 // Convert lbs to kg
      const eliminationRate = 0.15 // g/L per hour

      // Calculate BAC at each point in time
      const startTime = new Date(activeSession.start_time).getTime()
      
      for (let i = 0; i < drinks.length; i++) {
        const drink = drinks[i]
        
        // Calculate total alcohol consumed up to this point (in grams)
        // Alcohol density is approximately 0.789 g/mL
        // 1 oz = 29.5735 mL
        let totalAlcoholGrams = 0
        for (let j = 0; j <= i; j++) {
          const d = drinks[j]
          const dAlcPct = beverageMap.get(d.type) || 0
          const volumeMl = d.volume_oz * 29.5735
          const alcoholMl = volumeMl * dAlcPct
          totalAlcoholGrams += alcoholMl * 0.789
        }

        // Calculate time elapsed since first drink (in hours)
        const drinkTime = new Date(drink.time).getTime()
        const timeElapsedHours = (drinkTime - startTime) / (1000 * 60 * 60)

        // Calculate BAC using Widmark formula: BAC = (A / (W * r)) - (β * t)
        // Convert to g/100mL (BAC percentage)
        const bac = (totalAlcoholGrams / (weightKg * widmarkFactor * 10)) - (eliminationRate * timeElapsedHours)
        const bacPercentage = Math.max(0, bac) // BAC can't be negative

        if (bacPercentage > peakBAC) {
          peakBAC = bacPercentage
        }
      }
    }
  }

  // Update session with end time and peak BAC
  const endTime = new Date().toISOString()
  const { data: updatedSession, error: updateError } = await supabase
    .from('sessions')
    .update({
      end_time: endTime,
      bac: peakBAC,
    })
    .eq('session_id', activeSession.session_id)
    .select('session_id, start_time, end_time, bac')
    .single()

  if (updateError || !updatedSession) {
    return NextResponse.json({ error: 'Failed to end session' }, { status: 500 })
  }

  return NextResponse.json({
    id: updatedSession.session_id,
    started_at: updatedSession.start_time,
    ended_at: updatedSession.end_time,
    peak_bac: updatedSession.bac,
  })
}