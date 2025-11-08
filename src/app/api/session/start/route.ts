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

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // TODO: Check if user already has an active session
  // TODO: If active session exists, return that session instead
  // TODO: Create new session record in database
  // TODO: Return session data

  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}

