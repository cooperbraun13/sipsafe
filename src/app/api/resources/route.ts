/**
 * Resources API Route
 * 
 * Returns Gonzaga-specific emergency and support resources.
 * 
 * Features:
 * - Public route (no authentication required)
 * - Returns static resource data
 * 
 * Route: GET /api/resources
 * 
 * Response:
 *   {
 *     resources: Resource[]
 *   }
 */

import { NextResponse } from 'next/server'
import { GONZAGA_RESOURCES } from '@/lib/constants/resources'

export async function GET() {
  // Convert resources object to array format
  const resources = Object.values(GONZAGA_RESOURCES)

  return NextResponse.json({ resources })
}

