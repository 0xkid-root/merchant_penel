'use client'

import { useRouter } from 'next/navigation'

import PageHeader from '@/components/layout/page-header'

import AddBeneficiaryForm from '../components/add-beneficiaries/add-beneficiary-form'

export default function AddBeneficiaryPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/beneficiaries')
  }

  return (
    <div className="space-y-6 p-6">

      <PageHeader
        title="Add Beneficiary"
        subtitle="Add a new beneficiary for payouts. Bank details will be verified automatically."
        backHref="/beneficiaries"
        backLabel="Back to Beneficiaries"
      />

      <AddBeneficiaryForm
        onSuccess={handleSuccess}
      />

    </div>
  )
}