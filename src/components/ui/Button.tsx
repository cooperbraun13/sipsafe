/**
 * Button UI Component
 * 
 * Reusable button component with variants.
 * 
 * Features:
 * - Multiple variants (primary, secondary, danger, etc.)
 * - Sizes (sm, md, lg)
 * - Loading state
 * - Disabled state
 * - TypeScript props
 * 
 * Props:
 *   variant: 'primary' | 'secondary' | 'danger' | 'outline'
 *   size: 'sm' | 'md' | 'lg'
 *   loading: boolean
 *   children: ReactNode
 *   ...rest: Standard button props
 * 
 * Usage:
 *   <Button variant="primary" size="md">Click me</Button>
 */

'use client'

// TODO: Implement button component with:
// - Variant styles (primary, secondary, danger, outline)
// - Size variants
// - Loading spinner when loading prop is true
// - Disabled state styling
// - Forward refs for proper typing
// - Tailwind classes for styling

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  children,
  ...props 
}: {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>
      {/* TODO: Implement button with variants and loading state */}
      {children}
    </button>
  )
}

