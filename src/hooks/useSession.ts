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
import { createClient } from '@/lib/supabase/client'

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
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  const fetchActiveSession = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.email) {
        setActiveSession(null)
        return
      }

      // Fetch active session from database
      const { data: session, error: sessionError } = await supabase
        .from('sessions')
        .select('session_id, start_time, end_time, bac')
        .eq('zagmail', user.email)
        .is('end_time', null)
        .order('start_time', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (sessionError) throw sessionError

      if (!session) {
        setActiveSession(null)
        return
      }

      // Fetch drinks for this session
      const { data: drinks, error: drinksError } = await supabase
        .from('drinks')
        .select('session_id, type, time, volume_oz, duration')
        .eq('session_id', session.session_id)
        .order('time', { ascending: true })

      if (drinksError) throw drinksError

      // Fetch beverage info
      let drinksWithAbv = drinks || []
      if (drinks && drinks.length > 0) {
        const beverageTypes = [...new Set(drinks.map(d => d.type))]
        const { data: beverages } = await supabase
          .from('beverages')
          .select('type, alc_pct')
          .in('type', beverageTypes)

        if (beverages) {
          const beverageMap = new Map(beverages.map(b => [b.type, b.alc_pct]))
          drinksWithAbv = drinks.map(drink => ({
            ...drink,
            abv_pct: (beverageMap.get(drink.type) || 0) * 100,
          }))
        }
      }

      setActiveSession({
        id: session.session_id,
        started_at: session.start_time,
        ended_at: session.end_time,
        peak_bac: session.bac,
        drinks: drinksWithAbv,
      })
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch session'))
      setActiveSession(null)
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

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

  const refreshSession = async () => {
    await fetchActiveSession()
  }

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

