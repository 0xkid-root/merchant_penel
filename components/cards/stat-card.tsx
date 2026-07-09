import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

export function StatCard({
  label,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconBg,
  iconColor,
}: StatCardProps) {
  const changeColor =
    changeType === 'up'
      ? 'text-green-600'
      : changeType === 'down'
        ? 'text-red-500'
        : 'text-indigo-600'

  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4  transition-all duration-300 hover:shadow-md sm:p-5 lg:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-500">
            {label}
          </p>

          <h2 className="mt-2 truncate text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 lg:h-14 lg:w-14 lg:rounded-2xl ${iconBg}`}
        >
          <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${iconColor}`} />
        </div>
      </div>

      {change && (
        <div className="mt-5">
          <span className={`text-sm font-semibold ${changeColor}`}>
            {changeType === 'up' && '↑ '}
            {changeType === 'down' && '↓ '}
            {change}
          </span>
        </div>
      )}
    </article>
  )
}