# SipSafe File Structure

This document outlines the complete file structure for the SipSafe application.

## Directory Overview

### `/src/lib/` - Utilities & Configurations
- **`supabase/`** - Supabase client configurations
  - `client.ts` - Browser client for Client Components
  - `server.ts` - Server client for Server Components and API routes

- **`utils/`** - Utility functions
  - `bac.ts` - BAC calculation functions
  - `time.ts` - Time formatting and calculations
  - `validation.ts` - Form validation helpers

- **`constants/`** - Static data
  - `resources.ts` - Gonzaga emergency and support resources
  - `safety-tips.ts` - Safety tips organized by BAC range

### `/src/components/` - React Components

- **`auth/`** - Authentication components
  - `LoginForm.tsx` - Login form with email input
  - `SignUpForm.tsx` - Signup form with profile fields
  - `VerifyCodeForm.tsx` - OTP code verification form

- **`session/`** - Session management components
  - `SessionCard.tsx` - Card displaying session summary
  - `DrinkLog.tsx` - List of drinks in a session
  - `DrinkForm.tsx` - Form to add new drinks
  - `SessionTimer.tsx` - Real-time session duration timer

- **`bac/`** - BAC display components
  - `BACDisplay.tsx` - Large BAC number display
  - `TimeToSober.tsx` - Countdown to sobriety
  - `BACChart.tsx` - Visual BAC over time chart

- **`safety/`** - Safety and resources components
  - `SafetyTips.tsx` - Dynamic tips based on BAC
  - `ResourcesPanel.tsx` - Gonzaga resources display
  - `EmergencyButton.tsx` - One-tap 911 button
  - `HelpModal.tsx` - Modal with all help resources

- **`onboarding/`** - Onboarding components
  - `OnboardingForm.tsx` - Profile creation form
  - `EmergencyContactForm.tsx` - Emergency contact form

- **`ui/`** - Reusable UI components
  - `Button.tsx` - Button with variants
  - `Input.tsx` - Input field with label/error
  - `Card.tsx` - Card container
  - `Modal.tsx` - Modal dialog

### `/src/app/` - Next.js App Router

- **`page.tsx`** - Landing/login page
- **`layout.tsx`** - Root layout
- **`globals.css`** - Global styles

- **`auth/callback/`** - Auth callback handler
  - `route.ts` - Handles OAuth/email callbacks

- **`verify-code/`** - Code verification page
  - `page.tsx` - OTP code input page

- **`home/`** - Protected home page
  - `page.tsx` - Dashboard with sessions list

- **`onboarding/`** - Onboarding page
  - `page.tsx` - Profile setup page

- **`session/`** - Session pages
  - `page.tsx` - Active session view
  - `[id]/page.tsx` - Past session detail view

- **`api/`** - API routes
  - `session/start/route.ts` - POST - Start new session
  - `session/end/route.ts` - POST - End active session
  - `session/[id]/route.ts` - GET - Get session by ID
  - `drink/route.ts` - POST - Add drink to session
  - `resources/route.ts` - GET - Get Gonzaga resources

### `/src/types/` - TypeScript Types
- `database.ts` - Database table types
- `session.ts` - Session-related types
- `drink.ts` - Drink-related types
- `user.ts` - User and profile types

### `/src/hooks/` - Custom React Hooks
- `useSession.ts` - Session management hook
- `useBAC.ts` - BAC calculation hook
- `useAuth.ts` - Authentication state hook
- `useResources.ts` - Resources fetching hook

## Next Steps

1. **Set up Supabase:**
   - Create `.env.local` with Supabase credentials
   - Set up database tables (users, profiles, sessions, drinks)
   - Configure email allowlist for @zagmail.gonzaga.edu

2. **Implement Core Features:**
   - Start with authentication (LoginForm, SignUpForm, VerifyCodeForm)
   - Implement BAC calculation utilities
   - Build session management
   - Create UI components

3. **Database Setup:**
   - Create profiles table
   - Create sessions table
   - Create drinks table
   - Set up Row Level Security (RLS) policies

4. **Testing:**
   - Test authentication flow
   - Test BAC calculations
   - Test session creation and management
   - Test safety features

## Notes

- All files contain TODO comments explaining what needs to be implemented
- Follow the comments in each file to understand the expected functionality
- Use the types defined in `/src/types/` for type safety
- Use the hooks in `/src/hooks/` for shared logic
- Constants in `/src/lib/constants/` can be used directly or via API

