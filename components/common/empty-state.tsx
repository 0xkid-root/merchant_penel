import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  children?: ReactNode
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {Icon && (
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <h3
        className="text-gray-900 mb-2"
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '18px' }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="text-gray-600 mb-6 max-w-md"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '15px' }}
        >
          {description}
        </p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}
        >
          {action.label}
        </button>
      )}
      {children}
    </div>
  )
}
