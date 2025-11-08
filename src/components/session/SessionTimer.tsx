/**
 * Session Timer Component
 * 
 * Displays elapsed time for an active drinking session.
 * 
 * Features:
 * - Real-time timer showing hours:minutes:seconds
 * - Updates every second
 * - Shows time since session started
 * 
 * Props:
 *   startTime: ISO timestamp of when session started
 * 
 * Usage:
 *   <SessionTimer startTime={session.started_at} />
 */

'use client'

// TODO: Implement session timer with:
// - Real-time updates (use setInterval or similar)
// - Format as HH:MM:SS
// - Handle cleanup on unmount
// - Use time utilities from lib/utils/time.ts

export default function SessionTimer({ startTime }: { startTime: string }) {
  return (
    <div>
      {/* TODO: Implement session timer */}
    </div>
  )
}

