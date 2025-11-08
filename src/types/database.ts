/*
* Database Types
* 
* TypeScript types for database tables.
*/

export type User = {
  zagmail: string
  created_at: string
  deleted_at?: string | null
}

export type Profile = {
  zagmail: string
  weight_lbs: number
  height_in: number
  gender: string
  emergency_phone?: string | null
}

export type Session = {
  session_id: number
  zagmail: string
  last_drink: string
  start_time: string
  end_time?: string | null
  bac: number
}

export type Drink = {
  session_id: string
  type: string
  volume_oz: number
  duration: number
}

export type Beverage = {
  type: string
  alc_pct: number
}