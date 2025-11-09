/**
 * Login Form Component
 * 
 * Client component for user login.
 * 
 * Features:
 * - Email input (must be @zagmail.gonzaga.edu)
 * - "Send Code" button that triggers Supabase OTP
 * - Redirects to verify-code page after sending code
 * - Error handling and loading states
 * 
 * Usage:
 *   <LoginForm />
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validate zagmail domain
    if (!email.endsWith('@zagmail.gonzaga.edu')) {
      setError('Please use your @zagmail.gonzaga.edu email')
      setIsLoading(false)
      return
    }

    try {
      // Get the current origin for the redirect URL
      const origin = window.location.origin
      
      const { error: signInError } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${origin}/auth/callback`, // Magic link will redirect here
        }
      })

      if (signInError) throw signInError

      setSuccess(true)
      // Redirect to verify code page with email as query param
      router.push(`/verify-code?email=${encodeURIComponent(email)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send code')
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">SipSafe Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Zagmail Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.name@zagmail.gonzaga.edu"
              required
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">
              Code sent! Check your email.
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send Login Code'}
          </button>
        </form>
      </div>
    </div>
  )
}

