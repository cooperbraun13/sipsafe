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
  // TODO: Return resources from constants
  // TODO: Format response appropriately

  return NextResponse.json({ resources: GONZAGA_RESOURCES })
}

