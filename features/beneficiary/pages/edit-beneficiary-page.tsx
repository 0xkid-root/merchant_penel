'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import EditBeneficiaryForm from '../components/edit-beneficiary/EditBeneficiaryForm'

interface Props {
  beneficiaryId: number
}

export default function EditBeneficiaryPage({ beneficiaryId }: Props) {
  const router = useRouter()

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">Edit Beneficiary</h1>
          <p className="text-xs md:text-sm text-slate-500">
            Update beneficiary information.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <EditBeneficiaryForm beneficiaryId={beneficiaryId} />
      </div>
    </div>
  )
}
