/**
 * Onboarding Page
 * 
 * Page for collecting user profile information.
 * 
 * Features:
 * - Protected route (requires authentication)
 * - Collects height, weight, gender
 * - Optional emergency contact
 * - Creates/updates user profile
 * - Redirects to home after completion
 * 
 * Route: /onboarding
 */

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// TODO: Implement onboarding page with:
// - Check authentication (redirect to / if not logged in)
// - Use OnboardingForm component
// - Handle form submission
// - Create/update profile in database
// - Redirect to /home after completion

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  // TODO: Check if profile already exists (optional - allow updates)

  return (
    <div>
      {/* TODO: Implement onboarding page */}
      <h1>Complete Your Profile</h1>
    </div>
  )
}

