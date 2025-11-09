'use client';
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/ui/header'
import Footer from '@/components/ui/Footer'
import DrunkBar from '@/components/ui/DrunkBar'
import DrinkLog from '@/components/ui/DrinkLog'
import { useAuth } from '@/hooks/useAuth'
import { useSession } from '@/hooks/useSession'
import { useBAC } from '@/hooks/useBAC'

export default function HomePage() {
  const router = useRouter()
  const { user, profile, isLoading: authLoading, isAuthenticated } = useAuth()
  const { activeSession, isLoading: sessionLoading, startSession, endSession, refreshSession, error: sessionError } = useSession()
  const { currentBAC, timeToSober, bacRange } = useBAC(
    activeSession?.drinks || [],
    profile,
    activeSession?.started_at
  )

  // Debug logging
  useEffect(() => {
    console.log('Debug:', { authLoading, sessionLoading, isAuthenticated, user: user?.email, profile, activeSession })
  }, [authLoading, sessionLoading, isAuthenticated, user, profile, activeSession])

  // Auto-refresh disabled - use the manual Refresh button instead
  // This prevents the loading screen from blocking the UI
  // useEffect(() => {
  //   if (!activeSession) return
  //   const interval = setInterval(() => {
  //     console.log('Auto-refreshing session...')
  //     refreshSession()
  //   }, 60000) // 60 seconds
  //   return () => clearInterval(interval)
  // }, [activeSession, refreshSession])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [authLoading, isAuthenticated, router])

  if (authLoading || sessionLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#C1C6C8]">
        <div className="text-center">
          <p className="text-[#041E42] text-xl font-semibold mb-2">Loading...</p>
          <p className="text-sm text-gray-600">Auth: {authLoading ? 'Loading' : 'Done'}, Session: {sessionLoading ? 'Loading' : 'Done'}</p>
          {sessionError && <p className="text-red-600 text-sm mt-2">Error: {sessionError.message}</p>}
        </div>
      </div>
    )
  }

  return (
    <>
      <Header/>
      
      {/* Show Start Session button if no active session */}
      {!activeSession ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#041E42] mb-4">Welcome to Sip Safe</h1>
            <p className="text-lg text-[#041E42] mb-8">Ready to track your drinks responsibly?</p>
          </div>
          
          <button
            onClick={startSession}
            className="bg-[#041E42] text-[#C1C6C8] px-8 py-4 rounded-lg text-xl font-bold hover:bg-[#C41E3A] transition-colors shadow-lg"
          >
            Start Session
          </button>

          {profile && (
            <div className="mt-8 p-4 bg-white rounded-lg border-2 border-[#041E42] text-center">
              <p className="text-sm text-[#041E42]">
                <span className="font-semibold">Profile:</span> {profile.weight_lbs} lbs, {profile.height_in} in, {profile.sex}
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Session is active - show drink logging UI */}
          <div className="bg-white border-2 border-[#041E42] m-4 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#041E42]">Active Session</h2>
                <p className="text-sm text-gray-600">
                  Started: {new Date(activeSession.started_at).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={refreshSession}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 font-semibold"
                >
                  Refresh
                </button>
                <button
                  onClick={endSession}
                  className="bg-[#C41E3A] text-white px-4 py-2 rounded-md hover:bg-red-700 font-semibold"
                >
                  End Session
                </button>
              </div>
            </div>

            {/* BAC Display */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Current BAC</p>
                <p className="text-2xl font-bold text-[#041E42]">{currentBAC.toFixed(3)}%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Time to Sober</p>
                <p className="text-2xl font-bold text-[#041E42]">{timeToSober.toFixed(1)}h</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Drinks</p>
                <p className="text-2xl font-bold text-[#041E42]">{activeSession.drinks?.length || 0}</p>
              </div>
            </div>

            {/* BAC Status */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm font-semibold text-[#041E42]">Status: {bacRange}</p>
            </div>
          </div>

          <DrunkBar />
          <DrinkLog onDrinkAdded={refreshSession} />
        </>
      )}
      
      <Footer/>
    </>
  );
}

