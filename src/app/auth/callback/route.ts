/**
 * Auth Callback Route
 * 
 * Handles OAuth and email callback redirects from Supabase.
 * 
 * Features:
 * - Exchanges code for session
 * - Redirects to home page after successful auth
 * - Handles errors
 * 
 * Route: /auth/callback
 * Method: GET
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // TODO: Handle errors
  // TODO: Check if user needs onboarding
  // TODO: Redirect to appropriate page

  return NextResponse.redirect(`${origin}/home`)
}

