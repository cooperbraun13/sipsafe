/**
 * Verify Code Form Component
 * 
 * Client component for OTP code verification.
 * 
 * Features:
 * - 6-digit code input
 * - Verify button
 * - Resend code functionality
 * - Handles both login and signup flows
 * - Creates user profile if signup flow
 * - Redirects to home after successful verification
 * 
 * Usage:
 *   <VerifyCodeForm email={email} />
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function VerifyCodeForm({ email }: { email: string }) {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email'
      })

      if (verifyError) throw verifyError

      // Successfully verified, redirect to home
      router.push('/home')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid code')
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setError('')
    try {
      const { error: resendError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        }
      })

      if (resendError) throw resendError
      
      alert('Code resent! Check your email.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend code')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Verify Your Email</h1>
        <p className="text-gray-600 text-center mb-6">
          Enter the code sent to<br />
          <span className="font-medium">{email}</span>
        </p>
        
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              required
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest disabled:bg-gray-100"
              maxLength={6}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || code.length !== 6}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={isLoading}
            className="w-full text-blue-600 text-sm hover:underline"
          >
            Resend code
          </button>
        </form>
      </div>
    </div>
  )
}

