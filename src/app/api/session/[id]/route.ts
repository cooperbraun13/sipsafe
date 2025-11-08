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

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // TODO: Fetch session by ID
  // TODO: Verify session belongs to user
  // TODO: Fetch all drinks for this session
  // TODO: Return session with drinks

  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}

