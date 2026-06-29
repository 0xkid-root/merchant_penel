import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface PrimaryButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  isLoading?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
}

export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  className = '',
  type = 'button',
  size = 'md',
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors ${sizeClasses[size]} ${className}`}
      style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </Button>
  )
}
