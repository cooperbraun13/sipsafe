/*
* User Types
* 
* TypeScript types related to users and profiles.
*
*/

import { User, Profile } from './database'

export type UserProfile = User & {
  profile: Profile | null
}

export type ProfileInput = {
  weight_lbs: number
  height_in: number
  gender: 'female' | 'male'
  emergency_phone?: string
}

export type OnboardingData = ProfileInput & {
  username?: string // If you want to store username separately
}

export type Gender = 'male' | 'female';