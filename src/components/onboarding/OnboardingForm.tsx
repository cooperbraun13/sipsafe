/**
 * Onboarding Form Component
 * 
 * Form for collecting user profile information during signup.
 * 
 * Features:
 * - Height input (cm)
 * - Weight input (kg)
 * - Gender selection
 * - Optional emergency contact
 * - Validation
 * - Submit to create/update profile
 * 
 * Props:
 *   userId: User ID from auth
 *   onComplete: Callback after profile creation
 * 
 * Usage:
 *   <OnboardingForm userId={userId} onComplete={handleComplete} />
 */

'use client'

// TODO: Implement onboarding form with:
// - Height and weight inputs
// - Gender dropdown
// - Optional emergency contact field
// - Form validation
// - POST to create profile
// - Handle existing profile (update vs create)

export default function OnboardingForm({ 
  userId, 
  onComplete 
}: { 
  userId: string
  onComplete: () => void 
}) {
  return (
    <div>
      {/* TODO: Implement onboarding form */}
    </div>
  )
}

