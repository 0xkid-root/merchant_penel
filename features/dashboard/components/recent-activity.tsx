import {
  ArrowUpRight,
  Plus,
  AlertCircle,
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
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between px-6 pt-6 pb-5">

        <h3 className="text-2xl font-semibold text-slate-900">
          Recent Activity
        </h3>

        <Link
          href="/activity"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
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
              className="flex items-center justify-between border-b border-slate-100 px-6 py-5 last:border-0 hover:bg-slate-50 transition-colors"
            >

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${activity.iconBg}`}
                >
                  <Icon
                    className={`h-5 w-5 ${activity.iconColor}`}
                  />
                </div>

                <div>

                  <p className="text-sm font-medium text-slate-900">
                    {activity.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {activity.subtitle}
                  </p>

                </div>

              </div>

              <p
                className={`text-base font-semibold ${activity.amountColor}`}
              >
                {activity.amount}
              </p>

            </div>

          )
        })}

      </div>

    </div>
  )
}