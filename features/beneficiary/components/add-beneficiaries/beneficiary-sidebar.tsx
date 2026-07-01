'use client'

import {
  Lock,
  CheckCircle,
  FileText,
  Users,
  ArrowRight,
} from 'lucide-react'

export default function BeneficiarySidebar() {
  return (
    <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h3 className="mb-8 text-lg font-semibold text-slate-900">
        How It Works
      </h3>

      <div className="space-y-8">

        {/* Step 1 */}

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
            <Lock className="h-5 w-5 text-indigo-600" />
          </div>

          <div>

            <h4 className="text-sm font-semibold text-slate-900">
              Enter Bank Details
            </h4>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Provide beneficiary name, account number and IFSC code.
            </p>

          </div>

        </div>

        {/* Step 2 */}

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>

          <div>

            <h4 className="text-sm font-semibold text-slate-900">
              Auto Verification
            </h4>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Penny Drop instantly validates the beneficiary account.
            </p>

          </div>

        </div>

        {/* Step 3 */}

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
            <FileText className="h-5 w-5 text-purple-600" />
          </div>

          <div>

            <h4 className="text-sm font-semibold text-slate-900">
              Bank Details Retrieved
            </h4>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Account holder, branch and bank information are fetched automatically.
            </p>

          </div>

        </div>

        {/* Step 4 */}

        <div className="flex items-start gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
            <Users className="h-5 w-5 text-amber-600" />
          </div>

          <div>

            <h4 className="text-sm font-semibold text-slate-900">
              Save Beneficiary
            </h4>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Once verified, save the beneficiary for future payouts.
            </p>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 border-t border-slate-200 pt-6">

        <p className="text-sm text-slate-500">
          Need help?
        </p>

        <button
          type="button"
          className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Contact Support

          <ArrowRight className="h-4 w-4" />
        </button>

      </div>

    </div>
  )
}