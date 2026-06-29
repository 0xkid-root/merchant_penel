import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface SecondaryButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
}

export function SecondaryButton({
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  size = 'md',
}: SecondaryButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors border border-gray-300 ${sizeClasses[size]} ${className}`}
      style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
    >
      {children}
    </Button>
  )
}
