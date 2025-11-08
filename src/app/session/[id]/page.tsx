/**
 * Past Session Detail Page
 * 
 * Page for viewing details of a completed session.
 * 
 * Features:
 * - Protected route (requires authentication)
 * - Shows session details (start time, end time, duration)
 * - Drink log for that session
 * - Peak BAC reached
 * - BAC chart over time
 * - Read-only view
 * 
 * Route: /session/[id]
 */

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

// TODO: Implement past session detail page with:
// - Check authentication
// - Get session ID from params
// - Fetch session data
// - Verify session belongs to user
// - Display session details
// - Display drink log (read-only)
// - Display BAC chart
// - Show peak BAC

export default async function SessionDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  // TODO: Fetch session by ID
  // TODO: Verify session belongs to user
  // TODO: Fetch drinks for session

  return (
    <div>
      {/* TODO: Implement session detail page */}
      <h1>Session Details</h1>
    </div>
  )
}

