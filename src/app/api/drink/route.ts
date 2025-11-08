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
 *     volumeOz: number,  // Volume in ounces
 *     abvPct: number,    // Alcohol by volume percentage
 *     name?: string       // Optional drink name
 *   }
 * 
 * Response:
 *   { id: string, session_id: string, at: string, name: string, volume_oz: number, abv_pct: number }
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { volumeOz, abvPct, name } = body

  // TODO: Validate request body
  // TODO: Find active session for user
  // TODO: If no active session, return error
  // TODO: Create drink record linked to session
  // TODO: Return created drink

  return NextResponse.json({ error: 'Not implemented' }, { status: 501 })
}

