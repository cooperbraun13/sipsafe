/*
* Session Types
* 
* TypeScript types related to drinking sessions.
*
*/

import { Session, Drink } from './database'

export type ActiveSession = Session & {
  end_time: null
  drinks: Drink[]
}

export type CompletedSession = Session & {
  end_time: string
  drinks: Drink[]
}

export type SessionWithDrinks = Session & {
  drinks: Drink[]
}

export type SessionStatus = 'active' | 'completed'

