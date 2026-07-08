'use client'

import { KeyRound, LockKeyhole, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

interface PasswordLoginCardProps {
  passwordStatus: string
  lastPasswordChanged: string
  passwordPolicy: string
}

export default function PasswordLoginCard({
  passwordStatus,
  lastPasswordChanged,
  passwordPolicy,
}: PasswordLoginCardProps) {
  const handleChangePassword = () => {
    toast.info('Change Password flow will be connected with backend API.')
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
            <KeyRound className="h-6 w-6 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Password & Login
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Manage your password and protect access to your merchant account.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleChangePassword}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <LockKeyhole className="h-4 w-4" />
          Change Password
        </button>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Password Status
            </p>

            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
              <ShieldCheck className="h-4 w-4" />
              {passwordStatus}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Last Password Changed
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-900">
              {lastPasswordChanged}
            </p>
          </div>
        </div>

        <p className="mt-6 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
          {passwordPolicy}
        </p>
      </div>
    </section>
  )
}