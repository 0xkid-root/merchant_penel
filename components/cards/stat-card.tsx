import { LucideIcon } from 'lucide-react'

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
  iconColor
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-600 mb-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '15px' }}>{label}</p>
          <h3 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '34px' }}>{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${iconBg}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
      {change && (
        <div className="flex items-center gap-1">
          <span className={`${
            changeType === 'up' ? 'text-green-600' : 
            changeType === 'down' ? 'text-red-600' : 
            'text-gray-600'
          }`}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '13px' }}>
            {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : ''} {change}
          </span>
        </div>
      )}
    </div>
  )
}
