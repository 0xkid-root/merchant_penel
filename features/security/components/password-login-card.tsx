'use client'

import {
  KeyRound,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react'

import { PrimaryButton } from '@/components/buttons/primary-button'

import type { PasswordSecurityData } from '../types/security.types'

interface PasswordLoginCardProps {
  data: PasswordSecurityData
  onChangePassword: () => void
}

export default function PasswordLoginCard({
  data,
  onChangePassword,
}: PasswordLoginCardProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50">
            <KeyRound className="h-7 w-7 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Password & Login
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Manage your password and protect access to your merchant account.
            </p>
          </div>
        </div>

        <PrimaryButton onClick={onChangePassword}>
          <LockKeyhole className="h-4 w-4" />
          Change Password
        </PrimaryButton>
      </div>

      <div className="grid gap-6 py-7 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Password Status
          </p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
            <ShieldCheck className="h-4 w-4" />
            {data.status}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">
            Last Password Changed
          </p>

          <p className="mt-3 text-base font-semibold text-slate-900">
            {data.lastChangedAt}
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-600">
        {data.recommendation}
      </div>
    </section>
  )
}