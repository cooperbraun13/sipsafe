/**
 * Session Types
 * 
 * TypeScript types related to drinking sessions.
 * 
 * Types:
 * - ActiveSession: Session that is currently in progress
 * - CompletedSession: Session that has ended
 * - SessionWithDrinks: Session with all associated drinks
 */

import { Session, Drink } from './database'

export type ActiveSession = Session & {
  ended_at: null
  drinks: Drink[]
}

export type CompletedSession = Session & {
  ended_at: string
  peak_bac: number
  drinks: Drink[]
}

export type SessionWithDrinks = Session & {
  drinks: Drink[]
}

export type SessionStatus = 'active' | 'completed'

