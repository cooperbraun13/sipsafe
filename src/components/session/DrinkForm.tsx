/**
 * Drink Form Component
 * 
 * Form for adding a new drink to a session.
 * 
 * Features:
 * - Preset drink options (beer, wine, shot)
 * - Custom drink option (name, volume, ABV)
 * - Validation for inputs
 * - Submit to API endpoint
 * 
 * Props:
 *   sessionId: Current session ID
 *   onSuccess: Callback after successful drink addition
 * 
 * Usage:
 *   <DrinkForm sessionId={sessionId} onSuccess={handleSuccess} />
 */

'use client'

// TODO: Implement drink form with:
// - Preset drink buttons (beer, wine, shot)
// - Custom drink inputs (name, volume_oz, abv_pct)
// - Form validation
// - POST to /api/drink endpoint
// - Success/error handling
// - Reset form after submission

export default function DrinkForm({ 
  sessionId, 
  onSuccess 
}: { 
  sessionId: string
  onSuccess: () => void 
}) {
  return (
    <div>
      {/* TODO: Implement drink form */}
    </div>
  )
}

