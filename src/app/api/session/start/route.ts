/**
 * Start Session API Route
 * 
 * Creates a new drinking session for the authenticated user.
 * 
 * Features:
 * - Protected route (requires authentication)
 * - Creates new session record
 * - Returns session ID
 * 
 * Route: POST /api/session/start
 * 
 * Request Body: (none required)
 * 
 * Response:
 *   { id: string, started_at: string }
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

  // Ensure user exists in users table
  const { error: userError } = await supabase
    .from('users')
    .upsert({ zagmail, created_at: new Date().toISOString() }, { onConflict: 'zagmail' })

  if (userError) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }

  // Check if user already has an active session
  const { data: activeSession, error: sessionError } = await supabase
    .from('sessions')
    .select('session_id, start_time')
    .eq('zagmail', zagmail)
    .is('end_time', null)
    .order('start_time', { ascending: false })
    .limit(1)
    .single()

  if (sessionError && sessionError.code !== 'PGRST116') { // PGRST116 = no rows returned
    return NextResponse.json({ error: 'Failed to check for active session' }, { status: 500 })
  }

  // If active session exists, return it
  if (activeSession) {
    return NextResponse.json({
      id: activeSession.session_id,
      started_at: activeSession.start_time,
    })
  }

  // Create new session
  const { data: newSession, error: createError } = await supabase
    .from('sessions')
    .insert({
      zagmail,
      start_time: new Date().toISOString(),
      bac: 0,
    })
    .select('session_id, start_time')
    .single()

  if (createError || !newSession) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
  }

  return NextResponse.json({
    id: newSession.session_id,
    started_at: newSession.start_time,
  })
}