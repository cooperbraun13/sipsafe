/**
 * User Types
 * 
 * TypeScript types related to users and profiles.
 * 
 * Types:
 * - UserProfile: Complete user profile with auth and profile data
 * - ProfileInput: Input for creating/updating profile
 * - OnboardingData: Data collected during onboarding
 */

import { User, Profile } from './database'

export type UserProfile = User & {
  profile: Profile | null
}

export type ProfileInput = {
  weight_kg: number
  height_cm: number
  gender: string
  emergency_phone?: string
}

export type OnboardingData = ProfileInput & {
  username?: string // If you want to store username separately
}

export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say'

