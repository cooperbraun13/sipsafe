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

export default function VerifyCodeForm({ email, isSignup }: { email: string; isSignup?: boolean }) {
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

      // If this is a signup, create the user profile
      if (isSignup) {
        const signupDataStr = sessionStorage.getItem('signupData')
        if (signupDataStr) {
          const signupData = JSON.parse(signupDataStr)
          
          // Create or update user record (upsert)
          const { error: userError } = await supabase
            .from('users')
            .upsert({ 
              zagmail: email,
              created_at: new Date().toISOString()
            }, { 
              onConflict: 'zagmail',
              ignoreDuplicates: false 
            })

          if (userError) {
            console.error('User creation error:', userError)
            throw new Error('Failed to create user: ' + userError.message)
          }

          // Create or update profile record (upsert)
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              zagmail: email,
              weight_lbs: signupData.weight_lbs,
              height_in: signupData.height_in,
              sex: signupData.sex,
            }, {
              onConflict: 'zagmail'
            })

          if (profileError) {
            console.error('Profile creation error:', profileError)
            throw new Error('Failed to create profile: ' + profileError.message)
          }

          // Clear signup data from session storage
          sessionStorage.removeItem('signupData')
        }
      }

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
      const origin = window.location.origin
      
      const { error: resendError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${origin}/auth/callback`, // Magic link will redirect here
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
      <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-[#041E42]">
        <h1 className="text-3xl font-bold text-center mb-2 text-[#041E42]">Verify Your Email</h1>
        <p className="text-[#041E42] text-center mb-6 font-medium">
          Enter the code sent to<br />
          <span className="font-bold">{email}</span>
        </p>
        
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label htmlFor="code" className="block text-sm font-semibold text-[#041E42] mb-2">
              Verification Code
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
              placeholder="00000000"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 border-[#041E42] rounded-md focus:ring-2 focus:ring-[#C41E3A] focus:border-[#C41E3A] text-center text-2xl tracking-widest disabled:bg-[#C1C6C8] text-[#041E42] font-bold"
              maxLength={8}
            />
          </div>

          {error && (
            <div className="text-white text-sm bg-[#C41E3A] p-3 rounded-md font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || code.length !== 8}
            className="w-full bg-[#041E42] text-[#C1C6C8] py-3 px-4 rounded-md hover:bg-[#C41E3A] disabled:bg-[#C1C6C8] disabled:text-[#041E42] disabled:cursor-not-allowed transition-colors font-semibold text-lg"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={isLoading}
            className="w-full text-[#041E42] text-sm hover:text-[#C41E3A] font-medium transition-colors"
          >
            Resend code
          </button>
        </form>
      </div>
    </div>
  )
}

