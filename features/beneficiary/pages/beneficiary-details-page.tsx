'use client'

import { useBeneficiaryDetails } from '../hooks/useBeneficiaryDetails'
import BeneficiaryDetailsCard from '../components/beneficiary-details/beneficiary-details-card'
import BeneficiaryBankDetails from '../components/beneficiary-details/beneficiary-bank-details'
import BeneficiaryContactDetails from '../components/beneficiary-details/beneficiary-contact-details'
import BeneficiaryDetailsSidebar from '../components/beneficiary-details/beneficiary-details-sidebar'
import { BeneficiaryDetailsSkeleton } from '../components/beneficiary-details/beneficiary-details-skeleton'

interface Props {
  beneficiaryId: number
}

export default function BeneficiaryDetailsPage({ beneficiaryId }: Props) {
  const query = useBeneficiaryDetails(beneficiaryId)
  const { data: response, isLoading, isError, isPending } = query

  console.log('BeneficiaryDetailsPage render:', { beneficiaryId, isLoading, isPending, isError, response })

  // In React Query v5, isPending is true when enabled is false and no data exists.
  if (isLoading || isPending) {
    return <BeneficiaryDetailsSkeleton />
  }

  if (isError || !response?.data) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-6">
        <div className="text-center">
          <p className="text-slate-500">Failed to load beneficiary details. Please try again later.</p>
          <p className="text-xs mt-2 text-slate-400">ID: {beneficiaryId}</p>
        </div>
      </div>
    )
  }

  const beneficiary = response.data

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => window.history.back()}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">Beneficiary Details</h1>
          <p className="text-xs md:text-sm text-slate-500">
            View information for this beneficiary.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-9">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-5 ">
            <BeneficiaryDetailsCard beneficiary={beneficiary} />
            <hr className="border-slate-200" />
            <BeneficiaryBankDetails beneficiary={beneficiary} />
            <hr className="border-slate-200" />
            <BeneficiaryContactDetails beneficiary={beneficiary} />
          </div>
        </div>

        <div className="col-span-12 xl:col-span-3">
          <BeneficiaryDetailsSidebar />
        </div>
      </div>
    </div>
  )
}

