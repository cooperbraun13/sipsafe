/**
 * Home Page (Protected)
 * 
 * Main dashboard page after login.
 * 
 * Features:
 * - Protected route (requires authentication)
 * - Shows active session if exists
 * - Option to start new session
 * - List of past sessions
 * - Resources panel (always visible)
 * - User profile info
 * 
 * Route: /home
 */

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// TODO: Implement home page with:
// - Check authentication (redirect to / if not logged in)
// - Check if profile exists (redirect to /onboarding if not)
// - Fetch active session
// - Display active session or "Start Session" button
// - List past sessions
// - Include ResourcesPanel component
// - Include EmergencyButton component

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  // TODO: Check if profile exists
  // TODO: Fetch active session
  // TODO: Fetch past sessions

  return (
    <div>
      {/* TODO: Implement home page layout */}
      <h1>Welcome to SipSafe!</h1>
    </div>
  )
}

