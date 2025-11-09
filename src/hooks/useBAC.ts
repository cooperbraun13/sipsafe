/**
 * useBAC Hook
 * 
 * Custom hook for BAC calculations and updates.
 * 
 * Features:
 * - Calculate current BAC from drinks and user profile
 * - Calculate time to sober
 * - Get BAC range category
 * - Real-time updates as drinks are added
 * 
 * Parameters:
 *   drinks: Drink[] - Array of drinks consumed
 *   userProfile: Profile - User profile data
 *   sessionStartTime: string - When session started
 * 
 * Returns:
 *   {
 *     currentBAC: number
 *     timeToSober: number (in hours)
 *     bacRange: string
 *     peakBAC: number
 *   }
 */

'use client'

import { useMemo, useState, useEffect } from 'react'
import { calculateSessionBAC, calculateTimeToSober, getBACRange, type DrinkRecord } from '@/lib/utils/bac'
import type { Profile } from '@/types/database'

type Drink = {
  session_id: number
  type: string
  time: string
  volume_oz: number
  duration: string
  abv_pct?: number
}

export function useBAC(
  drinks: Drink[],
  userProfile: Profile | null,
  sessionStartTime?: string
) {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every minute for real-time BAC updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const bacData = useMemo(() => {
    // If no profile or no drinks, return zeros
    if (!userProfile || !drinks || drinks.length === 0) {
      return {
        currentBAC: 0,
        timeToSober: 0,
        bacRange: '0.00-0.02: Sober / Minimal Effect',
        peakBAC: 0,
      }
    }

    // Convert drinks to DrinkRecord format for BAC calculation
    const drinkRecords: DrinkRecord[] = drinks.map(drink => ({
      time: drink.time,
      alcPct: drink.abv_pct ? drink.abv_pct / 100 : 0.05, // Convert % to decimal, default to 5%
      volumeOz: drink.volume_oz,
    }))

    // Calculate current BAC
    const currentBAC = calculateSessionBAC(
      userProfile.weight_lbs,
      userProfile.sex,
      drinkRecords,
      currentTime
    )

    // Calculate time to sober
    const timeToSober = calculateTimeToSober(currentBAC)

    // Get BAC range category
    const bacRange = getBACRange(currentBAC)

    // Calculate peak BAC (BAC at the time of the last drink)
    let peakBAC = currentBAC
    if (drinkRecords.length > 0) {
      const lastDrinkTime = new Date(drinkRecords[drinkRecords.length - 1].time)
      peakBAC = calculateSessionBAC(
        userProfile.weight_lbs,
        userProfile.sex,
        drinkRecords,
        lastDrinkTime
      )
    }

    return {
      currentBAC: Math.round(currentBAC * 1000) / 1000, // Round to 3 decimal places
      timeToSober: Math.round(timeToSober * 100) / 100, // Round to 2 decimal places
      bacRange,
      peakBAC: Math.round(peakBAC * 1000) / 1000,
    }
  }, [drinks, userProfile, currentTime])

  return bacData
}

