'use client'

import { useBeneficiaryDetails } from '../hooks/useBeneficiaryDetails'
import BeneficiaryDetailsCard from '../components/beneficiary-details/beneficiary-details-card'
import BeneficiaryBankDetails from '../components/beneficiary-details/beneficiary-bank-details'
import BeneficiaryContactDetails from '../components/beneficiary-details/beneficiary-contact-details'
import BeneficiaryDetailsSidebar from '../components/beneficiary-details/beneficiary-details-sidebar'
import { BeneficiaryDetailsSkeleton } from '../components/beneficiary-details/beneficiary-details-skeleton'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface Props {
  beneficiaryId: number
}

export default function BeneficiaryDetailsPage({ beneficiaryId }: Props) {
  const router = useRouter()
  const { data: response, isLoading, isError } = useBeneficiaryDetails(beneficiaryId)

  if (isLoading) {
    return <BeneficiaryDetailsSkeleton />
  }

  if (isError || !response?.data) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-500">Failed to load beneficiary details. Please try again later.</p>
      </div>
    )
  }

  const beneficiary = response.data

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Beneficiary Details</h1>
          <p className="mt-1 text-sm text-slate-500">
            View information for this beneficiary.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Side */}
        <div className="col-span-12 xl:col-span-9">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-8 shadow-sm">
            <BeneficiaryDetailsCard beneficiary={beneficiary} />
            <hr className="border-slate-200" />
            <BeneficiaryBankDetails beneficiary={beneficiary} />
            <hr className="border-slate-200" />
            <BeneficiaryContactDetails beneficiary={beneficiary} />
          </div>
        </div>

        {/* Right Side Sidebar */}
        <div className="col-span-12 xl:col-span-3">
          <BeneficiaryDetailsSidebar />
        </div>
      </div>
    </div>
  )
}
