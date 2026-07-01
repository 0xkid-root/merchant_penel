'use client'

import { useRouter } from 'next/navigation'

import BeneficiariesHeader from '../components/beneficiaries-header'
import BeneficiariesFilters from '../components/beneficiaries-filters'
import BeneficiariesTable from '../components/beneficiaries-table'
// import BeneficiariesPagination from '../components/beneficiaries-pagination'

export default function BeneficiariesPage() {
  const router = useRouter()

  const handleAddBeneficiary = () => {
    router.push('/beneficiaries/add')
  }

  const handleExport = () => {
    console.log('Export beneficiaries')
  }

  return (
    <div className="space-y-6 p-6">

      <BeneficiariesHeader
        onAddBeneficiary={handleAddBeneficiary}
        onExport={handleExport}
      />

      <BeneficiariesFilters />

      <BeneficiariesTable />

      <BeneficiariesPagination />

    </div>
  )
}
