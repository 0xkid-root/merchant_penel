import {
  AlertCircle,
  ArrowUpRight,
  Plus,
} from 'lucide-react'
import Link from 'next/link'

const ACTIVITIES = [
  {
    id: 1,
    title: 'Payout to Ravi Kumar',
    amount: '-₹5,200.00',
    amountColor: 'text-red-600',
    subtitle: 'IMPS • 2 min ago',
    icon: ArrowUpRight,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: 2,
    title: 'Fund Added',
    amount: '+₹50,000.00',
    amountColor: 'text-green-600',
    subtitle: 'NEFT • 15 min ago',
    icon: Plus,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    id: 3,
    title: 'Payout to Priya Singh',
    amount: '-₹12,000.00',
    amountColor: 'text-red-600',
    subtitle: 'UPI • 30 min ago',
    icon: ArrowUpRight,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: 4,
    title: 'Failed Payout',
    amount: '-₹8,500.00',
    amountColor: 'text-red-600',
    subtitle: 'NEFT • 45 min ago',
    icon: AlertCircle,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
  },
  {
    id: 5,
    title: 'Fund Added',
    amount: '+₹2,00,000.00',
    amountColor: 'text-green-600',
    subtitle: 'RTGS • 1 hr ago',
    icon: Plus,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
]

export function RecentActivity() {
  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-6">
        <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          Recent Activity
        </h3>

        <Link
          href="/activity"
          className="shrink-0 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
        >
          View all
        </Link>
      </div>

      <div>
        {ACTIVITIES.map((activity) => {
          const Icon = activity.icon

          return (
            <div
              key={activity.id}
              className="flex items-center justify-between gap-3 border-t border-slate-100 px-4 py-4 transition-colors hover:bg-slate-50 sm:px-6 sm:py-5"
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${activity.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${activity.iconColor}`} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {activity.title}
                  </p>

                  <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
                    {activity.subtitle}
                  </p>
                </div>
              </div>

              <p
                className={`shrink-0 text-sm font-semibold sm:text-base ${activity.amountColor}`}
              >
                {activity.amount}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}