import {
  AlertTriangle,
  CheckCircle2,
  KeyRound,
  MonitorSmartphone,
} from 'lucide-react'

import type {
  SecurityActivity,
  SecurityActivityType,
} from '../types/security.types'

interface SecurityActivityCardProps {
  activities: SecurityActivity[]
}

const activityIconMap: Record<SecurityActivityType, React.ReactNode> = {
  login: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
  password: <KeyRound className="h-5 w-5 text-indigo-600" />,
  device: <MonitorSmartphone className="h-5 w-5 text-sky-600" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-600" />,
}

const activityBackgroundMap: Record<SecurityActivityType, string> = {
  login: 'bg-emerald-50',
  password: 'bg-indigo-50',
  device: 'bg-sky-50',
  warning: 'bg-amber-50',
}

export default function SecurityActivityCard({
  activities,
}: SecurityActivityCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          Recent Security Activity
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Monitor recent activity related to your account access.
        </p>
      </div>

      <div className="mt-6 divide-y divide-slate-100">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activityBackgroundMap[activity.type]}`}
            >
              {activityIconMap[activity.type]}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div>
                  <p className="font-semibold text-slate-900">
                    {activity.title}
                  </p>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {activity.description}
                  </p>
                </div>

                <p className="shrink-0 text-sm text-slate-500">
                  {activity.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}