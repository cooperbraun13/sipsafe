/**
 * useResources Hook
 * 
 * Custom hook for fetching Gonzaga resources.
 * 
 * Features:
 * - Fetch resources from API
 * - Cache resources (they're static)
 * - Format resources for display
 * 
 * Returns:
 *   {
 *     resources: Resource[]
 *     isLoading: boolean
 *     error: Error | null
 *   }
 */

'use client'

// TODO: Implement useResources hook with:
// - Fetch from /api/resources
// - Cache resources (they don't change often)
// - Return formatted resources
// - Use React Query or SWR
// - Can also just use constants directly if no API needed

export function useResources() {
  // TODO: Implement hook
  // Note: Since resources are static, you might just import from constants
  return {
    resources: [],
    isLoading: false,
    error: null,
  }
}

