import { ArrowUpRight, Plus, ArrowDownLeft, AlertCircle } from 'lucide-react'
import Link from 'next/link'

const ACTIVITIES = [
  {
    id: 1,
    type: 'payout',
    title: 'Payout to Ravi Kumar',
    amount: '-₹5,200.00',
    amountColor: 'text-red-600',
    subtitle: 'IMPS • 2 min ago',
    icon: ArrowUpRight,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 2,
    type: 'fund',
    title: 'Fund Added',
    amount: '+₹50,000.00',
    amountColor: 'text-green-600',
    subtitle: 'NEFT • 15 min ago',
    icon: Plus,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 3,
    type: 'payout',
    title: 'Payout to Priya Singh',
    amount: '-₹12,000.00',
    amountColor: 'text-red-600',
    subtitle: 'UPI • 30 min ago',
    icon: ArrowUpRight,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 4,
    type: 'failed',
    title: 'Failed Payout',
    amount: '-₹8,500.00',
    amountColor: 'text-red-600',
    subtitle: 'NEFT • 45 min ago',
    icon: AlertCircle,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    id: 5,
    type: 'fund',
    title: 'Fund Added',
    amount: '+₹2,00,000.00',
    amountColor: 'text-green-600',
    subtitle: 'RTGS • 1 hr ago',
    icon: Plus,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  }
]

export function RecentActivity() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '20px' }}>Recent Activity</h3>
        <Link href="/activity" className="text-indigo-600 hover:text-indigo-700" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
          View all
        </Link>
      </div>

      <div className="space-y-4">
        {ACTIVITIES.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${activity.iconBg}`}>
                  <Icon className={`w-5 h-5 ${activity.iconColor}`} />
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>{activity.title}</p>
                  <p className="text-gray-500" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '13px' }}>{activity.subtitle}</p>
                </div>
              </div>
              <p className={`font-semibold ${activity.amountColor}`} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
                {activity.amount}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
