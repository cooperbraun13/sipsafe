/**
 * useSession Hook
 * 
 * Custom hook for managing drinking sessions.
 * 
 * Features:
 * - Fetch active session
 * - Start new session
 * - End current session
 * - Refresh session data
 * 
 * Returns:
 *   {
 *     activeSession: ActiveSession | null
 *     isLoading: boolean
 *     error: Error | null
 *     startSession: () => Promise<void>
 *     endSession: () => Promise<void>
 *     refreshSession: () => Promise<void>
 *   }
 */

'use client'

import { useState, useEffect, useCallback } from 'react'

type Drink = {
  session_id: number
  type: string
  time: string
  volume_oz: number
  duration: string
  abv_pct?: number
}

type ActiveSession = {
  id: number
  started_at: string
  ended_at: string | null
  peak_bac: number | null
  drinks: Drink[]
}

export function useSession() {
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchActiveSession = useCallback(async (skipLoadingState = false) => {
    try {
      // Only set loading state on initial load, not refreshes
      if (!skipLoadingState) {
        setIsLoading(true)
      }
      setError(null)

      console.log('Fetching active session via API...')

      // Use API route instead of direct Supabase query
      const response = await fetch('/api/session/active', {
        method: 'GET',
        credentials: 'include', // Include cookies for auth
      })

      if (!response.ok) {
        if (response.status === 404) {
          console.log('No active session found')
          setActiveSession(null)
          setIsLoading(false)
          if (isInitialLoad) setIsInitialLoad(false)
          return
        }
        throw new Error('Failed to fetch session')
      }

      const sessionData = await response.json()
      console.log('Got session data:', sessionData)
      
      setActiveSession(sessionData)
      
      if (isInitialLoad) {
        setIsInitialLoad(false)
      }
      setIsLoading(false)
      console.log('Session fetch completed successfully')
    } catch (err) {
      console.error('fetchActiveSession error:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch session'))
      setActiveSession(null)
      if (isInitialLoad) {
        setIsInitialLoad(false)
      }
      setIsLoading(false)
    }
  }, [isInitialLoad])

  const startSession = async () => {
    try {
      setError(null)
      const response = await fetch('/api/session/start', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to start session')
      }

      await fetchActiveSession()
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to start session'))
      throw err
    }
  }

  const endSession = async () => {
    try {
      setError(null)
      const response = await fetch('/api/session/end', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to end session')
      }

      setActiveSession(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to end session'))
      throw err
    }
  }

  const refreshSession = useCallback(async () => {
    // Pass true to skip showing loading state during refresh
    await fetchActiveSession(true)
  }, [fetchActiveSession])

  useEffect(() => {
    fetchActiveSession()
  }, [fetchActiveSession])

  return {
    activeSession,
    isLoading,
    error,
    startSession,
    endSession,
    refreshSession,
  }
}

