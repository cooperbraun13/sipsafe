/**
 * Drink Log Component
 * 
 * Displays a list of drinks consumed in a session.
 * 
 * Features:
 * - List of drinks with name, volume, ABV, and time consumed
 * - Total alcohol consumed
 * - Ability to add new drinks (if active session)
 * 
 * Props:
 *   drinks: Array of drink objects
 *   sessionId: Current session ID (if active)
 *   onAddDrink: Callback to add a new drink
 * 
 * Usage:
 *   <DrinkLog drinks={drinks} sessionId={sessionId} onAddDrink={handleAddDrink} />
 */

'use client'

// TODO: Implement drink log with:
// - Display list of drinks
// - Show drink details (name, volume, ABV, time)
// - Calculate and display total alcohol
// - Add drink button (if active session)
// - Format times nicely

export default function DrinkLog({ 
  drinks, 
  sessionId, 
  onAddDrink 
}: { 
  drinks: any[]
  sessionId?: string
  onAddDrink?: () => void 
}) {
  return (
    <div>
      {/* TODO: Implement drink log */}
    </div>
  )
}

