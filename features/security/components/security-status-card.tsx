import { CheckCircle2, ShieldCheck } from 'lucide-react'

export default function SecurityStatusCard() {
  return (
    <section className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100">
          <ShieldCheck className="h-6 w-6 text-emerald-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Account Security Status
          </h2>

          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            Secure
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm leading-6 text-slate-600">
        Your account password is active and your current login session is
        protected.
      </p>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-slate-500">Account access</p>

          <p className="text-sm font-semibold text-emerald-700">Protected</p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-500">Password status</p>

          <p className="text-sm font-semibold text-emerald-700">Active</p>
        </div>
      </div>
    </section>
  )
}