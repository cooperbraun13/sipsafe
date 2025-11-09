/**
 * Verify Code Page
 * 
 * Page for verifying OTP code sent via email.
 * 
 * Features:
 * - Code input (6 digits)
 * - Verify button
 * - Resend code functionality
 * - Handles both login and signup flows
 * - Creates profile if signup
 * - Redirects to home after verification
 * 
 * Route: /verify-code?email=user@zagmail.gonzaga.edu
 */

'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import VerifyCodeForm from '@/components/auth/VerifyCodeForm'

function VerifyCodeContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">No email provided</p>
          <a href="/" className="text-blue-600 hover:underline mt-4 block">
            Go back to login
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <VerifyCodeForm email={email} />
    </div>
  )
}

export default function VerifyCodePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <VerifyCodeContent />
    </Suspense>
  )
}

