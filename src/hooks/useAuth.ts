/**
 * useAuth Hook
 * 
 * Custom hook for authentication state and actions.
 * 
 * Features:
 * - Get current user
 * - Check authentication status
 * - Sign out functionality
 * - Redirect helpers
 * 
 * Returns:
 *   {
 *     user: User | null
 *     profile: Profile | null
 *     isLoading: boolean
 *     isAuthenticated: boolean
 *     signOut: () => Promise<void>
 *   }
 */

'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import type { Profile } from '@/types/database'

export function useAuth() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    
    // Get initial session
    const getUser = async () => {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        setUser(currentUser)

        if (currentUser?.email) {
          // Fetch user profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('zagmail', currentUser.email)
            .single()

          setProfile(profileData)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user?.email) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('zagmail', session.user.email)
          .single()

        setProfile(profileData)
      } else {
        setProfile(null)
      }
      
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user,
    signOut,
  }
}