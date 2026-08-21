import { ChevronDown, UserRound, CheckCircle2 } from 'lucide-react'
import { useBeneficiaryList } from '@/features/beneficiary/hooks/useBeneficiaryList'
import type { BeneficiaryResponse } from '@/features/beneficiary/types/beneficiary.types'

interface SinglePayoutBeneficiarySelectProps {
  selectedBeneficiaryId: number | null
  selectedBeneficiary: BeneficiaryResponse | null
  onSelectBeneficiary: (beneficiary: BeneficiaryResponse | null) => void
}

export default function SinglePayoutBeneficiarySelect({
  selectedBeneficiaryId,
  selectedBeneficiary,
  onSelectBeneficiary,
}: SinglePayoutBeneficiarySelectProps) {
  // Fetch up to 100 active beneficiaries for the dropdown
  const { data: response, isLoading } = useBeneficiaryList({
    page: 0,
    size: 100,
    status: 'ACTIVE',
  })

  const beneficiaries = response?.data?.content || []

  const handleBeneficiaryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const beneficiaryId = Number(event.target.value)

    if (!beneficiaryId) {
      onSelectBeneficiary(null)
      return
    }

    const beneficiary = beneficiaries.find((b) => b.id === beneficiaryId)
    onSelectBeneficiary(beneficiary || null)
  }

  return (
    <>
      <div>
        <label
          htmlFor="beneficiary"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Select Beneficiary
          <span className="ml-1 text-red-500">*</span>
        </label>

        <div className="relative">
          <UserRound className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <select
            id="beneficiary"
            value={selectedBeneficiaryId ?? ''}
            onChange={handleBeneficiaryChange}
            disabled={isLoading}
            className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white pl-11 pr-10 text-sm font-medium text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-slate-50 disabled:text-slate-400"
          >
            <option value="">
              {isLoading ? 'Loading beneficiaries...' : 'Choose a saved beneficiary'}
            </option>

            {beneficiaries.map((beneficiary) => (
              <option key={beneficiary.id} value={beneficiary.id}>
                {beneficiary.beneficiaryName} — {beneficiary.bankName}
              </option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {selectedBeneficiary && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Beneficiary Selected
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                This saved bank account will receive the payout.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Account Holder
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {selectedBeneficiary.beneficiaryName}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Bank Name
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {selectedBeneficiary.bankName}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                Account Number
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {selectedBeneficiary.accountNumber
                  ? `XXXXXX${selectedBeneficiary.accountNumber.slice(-4)}`
                  : 'N/A'}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500">
                IFSC Code
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-800">
                {selectedBeneficiary.ifscCode}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
