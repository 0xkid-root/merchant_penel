'use client'

import {
  CheckCircle2,
  Clock3,
  Info,
  TriangleAlert,
} from 'lucide-react'

import type { SecurityActivity } from '../types/security.types'

interface SecurityActivityCardProps {
  activities: SecurityActivity[]
}

const activityStyles = {
  success: {
    icon: CheckCircle2,
    iconClass: 'bg-emerald-50 text-emerald-600',
  },
  warning: {
    icon: TriangleAlert,
    iconClass: 'bg-amber-50 text-amber-600',
  },
  info: {
    icon: Info,
    iconClass: 'bg-indigo-50 text-indigo-600',
  },
}

export default function SecurityActivityCard({
  activities,
}: SecurityActivityCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-50">
          <Clock3 className="h-7 w-7 text-violet-600" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Recent Security Activity
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Review recent activity related to your merchant account security.
          </p>
        </div>
      </div>

      <div className="mt-8 divide-y divide-slate-100">
        {activities.map((activity) => {
          const config = activityStyles[activity.type]
          const Icon = config.icon

          return (
            <div
              key={activity.id}
              className="flex gap-4 py-5 first:pt-0 last:pb-0"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${config.iconClass}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-semibold text-slate-900">
                    {activity.title}
                  </p>

                  <p className="text-sm text-slate-500">
                    {activity.occurredAt}
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {activity.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}