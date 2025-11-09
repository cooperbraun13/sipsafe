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
      <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-[#041E42]">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#041E42]">Sip Safe</h1>
        <p className="text-center text-[#041E42] mb-8 font-medium">Login to continue</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#041E42] mb-2">
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
              className="w-full px-4 py-2 border-2 border-[#041E42] rounded-md focus:ring-2 focus:ring-[#C41E3A] focus:border-[#C41E3A] disabled:bg-[#C1C6C8] text-[#041E42] font-medium"
            />
          </div>

          {error && (
            <div className="text-white text-sm bg-[#C41E3A] p-3 rounded-md font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="text-[#041E42] text-sm bg-[#22bb45] p-3 rounded-md font-medium">
              Code sent! Check your email.
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full bg-[#041E42] text-[#C1C6C8] py-3 px-4 rounded-md hover:bg-[#C41E3A] disabled:bg-[#C1C6C8] disabled:text-[#041E42] disabled:cursor-not-allowed transition-colors font-semibold text-lg"
          >
            {isLoading ? 'Sending...' : 'Send Login Code'}
          </button>

          <div className="text-center mt-4">
            <a href="/signup" className="text-[#041E42] text-sm hover:text-[#C41E3A] font-medium transition-colors">
              Don't have an account? Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

