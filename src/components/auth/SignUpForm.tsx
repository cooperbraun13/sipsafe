/**
 * Sign Up Form Component
 * 
 * Client component for new user registration.
 * 
 * Features:
 * - Zagmail email input (must be @zagmail.gonzaga.edu)
 * - Username input
 * - Weight input (lbs)
 * - Height input (inches)
 * - Gender selection
 * - "Sign Up" button that sends OTP code
 * - Stores signup data for profile creation after verification
 * - Redirects to verify-code page
 * 
 * Usage:
 *   <SignUpForm />
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignUpForm() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [sex, setSex] = useState<'male' | 'female' | ''>('')
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

    // Validate all fields
    if (!username || !weight || !height || !sex) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    // Validate numeric inputs
    const weightNum = parseFloat(weight)
    const heightNum = parseFloat(height)
    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      setError('Please enter valid weight and height')
      setIsLoading(false)
      return
    }

    try {
      const origin = window.location.origin
      
      // Store signup data in sessionStorage for after verification
      const signupData = {
        email,
        username,
        weight_lbs: weightNum,
        height_in: heightNum,
        sex,
      }
      sessionStorage.setItem('signupData', JSON.stringify(signupData))

      const { error: signUpError } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${origin}/auth/callback`,
        }
      })

      if (signUpError) throw signUpError

      setSuccess(true)
      // Redirect to verify code page with email and signup flag
      router.push(`/verify-code?email=${encodeURIComponent(email)}&signup=true`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send code')
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-[#041E42]">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#041E42]">Sign Up</h1>
        <p className="text-center text-[#041E42] mb-8 font-medium">Create your Sip Safe account</p>
        
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

          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-[#041E42] mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              disabled={isLoading}
              className="w-full px-4 py-2 border-2 border-[#041E42] rounded-md focus:ring-2 focus:ring-[#C41E3A] focus:border-[#C41E3A] disabled:bg-[#C1C6C8] text-[#041E42] font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="weight" className="block text-sm font-semibold text-[#041E42] mb-2">
                Weight (lbs)
              </label>
              <input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="150"
                required
                disabled={isLoading}
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border-2 border-[#041E42] rounded-md focus:ring-2 focus:ring-[#C41E3A] focus:border-[#C41E3A] disabled:bg-[#C1C6C8] text-[#041E42] font-medium"
              />
            </div>

            <div>
              <label htmlFor="height" className="block text-sm font-semibold text-[#041E42] mb-2">
                Height (inches)
              </label>
              <input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="68"
                required
                disabled={isLoading}
                min="0"
                step="0.1"
                className="w-full px-4 py-2 border-2 border-[#041E42] rounded-md focus:ring-2 focus:ring-[#C41E3A] focus:border-[#C41E3A] disabled:bg-[#C1C6C8] text-[#041E42] font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#041E42] mb-2">
              Sex
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSex('male')}
                disabled={isLoading}
                className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
                  sex === 'male'
                    ? 'bg-[#041E42] text-[#C1C6C8]'
                    : 'bg-white border-2 border-[#041E42] text-[#041E42] hover:bg-[#C1C6C8]'
                } disabled:opacity-50`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setSex('female')}
                disabled={isLoading}
                className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
                  sex === 'female'
                    ? 'bg-[#041E42] text-[#C1C6C8]'
                    : 'bg-white border-2 border-[#041E42] text-[#041E42] hover:bg-[#C1C6C8]'
                } disabled:opacity-50`}
              >
                Female
              </button>
            </div>
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
            disabled={isLoading || !email || !username || !weight || !height || !sex}
            className="w-full bg-[#041E42] text-[#C1C6C8] py-3 px-4 rounded-md hover:bg-[#C41E3A] disabled:bg-[#C1C6C8] disabled:text-[#041E42] disabled:cursor-not-allowed transition-colors font-semibold text-lg"
          >
            {isLoading ? 'Sending...' : 'Sign Up'}
          </button>

          <div className="text-center mt-4">
            <a href="/" className="text-[#041E42] text-sm hover:text-[#C41E3A] font-medium transition-colors">
              Already have an account? Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

