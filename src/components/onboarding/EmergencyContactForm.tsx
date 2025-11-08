/**
 * Emergency Contact Form Component
 * 
 * Form for adding/editing emergency contact information.
 * 
 * Features:
 * - Phone number input
 * - Name input (optional)
 * - Validation
 * - Can be updated later
 * 
 * Props:
 *   userId: User ID
 *   existingContact: Existing emergency contact (if any)
 *   onSave: Callback after saving
 * 
 * Usage:
 *   <EmergencyContactForm userId={userId} onSave={handleSave} />
 */

'use client'

// TODO: Implement emergency contact form with:
// - Phone number input with validation
// - Optional name field
// - Save to profile
// - Update existing contact if present
// - Success/error handling

export default function EmergencyContactForm({ 
  userId, 
  existingContact, 
  onSave 
}: { 
  userId: string
  existingContact?: string
  onSave: () => void 
}) {
  return (
    <div>
      {/* TODO: Implement emergency contact form */}
    </div>
  )
}

