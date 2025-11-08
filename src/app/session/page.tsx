/**
 * Active Session Page
 * 
 * Page for viewing and managing an active drinking session.
 * 
 * Features:
 * - Protected route (requires authentication)
 * - Shows current BAC and time to sober
 * - Drink log with ability to add drinks
 * - Safety tips based on BAC
 * - Session timer
 * - End session button
 * - Resources always visible
 * 
 * Route: /session
 */

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// TODO: Implement active session page with:
// - Check authentication
// - Fetch active session
// - If no active session, redirect to /home
// - Display BACDisplay component
// - Display TimeToSober component
// - Display DrinkLog component
// - Display DrinkForm component
// - Display SafetyTips component
// - Display SessionTimer component
// - Include ResourcesPanel and EmergencyButton
// - End session functionality

export default async function SessionPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  // TODO: Fetch active session
  // TODO: If no active session, redirect to /home

  return (
    <div>
      {/* TODO: Implement active session page */}
      <h1>Active Session</h1>
    </div>
  )
}

