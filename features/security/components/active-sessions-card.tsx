'use client'

import { Laptop, LogOut, MapPin, Monitor } from 'lucide-react'
import { toast } from 'sonner'

import type { SecuritySession } from '../types/security.types'

interface ActiveSessionsCardProps {
  sessions: SecuritySession[]
}

export default function ActiveSessionsCard({
  sessions,
}: ActiveSessionsCardProps) {
  const handleLogoutOtherDevices = () => {
    toast.info('Logout other devices API will be connected later.')
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50">
            <Monitor className="h-6 w-6 text-sky-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Active Login Sessions
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Review devices currently signed in to your merchant account.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogoutOtherDevices}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout Other Devices
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Laptop className="h-5 w-5 text-slate-600" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-900">
                      {session.device} · {session.browser}
                    </p>

                    {session.isCurrent ? (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        Current Session
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-1 text-sm text-slate-500">
                    IP Address: {session.ipAddress}
                  </p>

                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin className="h-4 w-4" />
                    {session.location}
                  </p>
                </div>
              </div>

              <p className="text-sm font-medium text-slate-600">
                Last active: {session.lastActive}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}