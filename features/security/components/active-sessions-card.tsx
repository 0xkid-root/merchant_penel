'use client'

import {
  LogOut,
  MapPin,
  Monitor,
} from 'lucide-react'

import { SecondaryButton } from '@/components/buttons/secondary-button'

import type { LoginSession } from '../types/security.types'

interface ActiveSessionsCardProps {
  sessions: LoginSession[]
  onLogoutOtherDevices: () => void
}

export default function ActiveSessionsCard({
  sessions,
  onLogoutOtherDevices,
}: ActiveSessionsCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50">
            <Monitor className="h-7 w-7 text-sky-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Active Login Sessions
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Review devices currently signed in to your merchant account.
            </p>
          </div>
        </div>

        <SecondaryButton onClick={onLogoutOtherDevices}>
          <LogOut className="h-4 w-4 text-red-500" />
          <span className="text-red-600">Logout Other Devices</span>
        </SecondaryButton>
      </div>

      <div className="mt-8 space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
                  <Monitor className="h-5 w-5 text-slate-600" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-semibold text-slate-900">
                      {session.deviceName} · {session.browser}
                    </p>

                    {session.isCurrentSession && (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Current Session
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    IP Address: {session.ipAddress}
                  </p>

                  <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-500">
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