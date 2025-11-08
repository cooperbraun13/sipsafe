/**
 * Database Types
 * 
 * TypeScript types for database tables.
 * 
 * These types should match your Supabase database schema.
 * You can generate these automatically using Supabase CLI:
 *   npx supabase gen types typescript --project-id <project-id> > src/types/database.ts
 * 
 * Tables:
 * - users (Supabase auth.users)
 * - profiles (user_id, weight_kg, height_cm, gender, emergency_phone)
 * - sessions (id, user_id, started_at, ended_at, peak_bac)
 * - drinks (id, session_id, at, name, volume_oz, abv_pct)
 */

// TODO: Generate types from Supabase or define manually:

export type User = {
  id: string
  email: string
  created_at: string
  deleted_at?: string | null
}

export type Profile = {
  user_id: string
  weight_kg: number
  height_cm: number
  gender: string
  emergency_phone?: string | null
}

export type Session = {
  id: string
  user_id: string
  started_at: string
  ended_at?: string | null
  peak_bac?: number | null
}

export type Drink = {
  id: string
  session_id: string
  at: string
  name: string
  volume_oz: number
  abv_pct: number
}

