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

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // TODO: Find active session for user
  // TODO: If no active session, return error
  // TODO: Calculate peak BAC from all drinks in session
  // TODO: Update session with ended_at and peak_bac
  // TODO: Return updated session data

  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}

