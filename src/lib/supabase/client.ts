/**
 * Supabase Browser Client
 * 
 * Creates a Supabase client for use in Client Components.
 * This client is used for client-side authentication and database operations.
 * 
 * Usage:
 *   import { createClient } from '@/lib/supabase/client'
 *   const supabase = createClient()
 */
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}