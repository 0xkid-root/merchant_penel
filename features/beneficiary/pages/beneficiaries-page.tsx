'use client'

import { useRouter } from 'next/navigation'

import BeneficiariesHeader from '../components/beneficiaries-header'
import BeneficiariesFilters from '../components/beneficiaries-filters'
import BeneficiariesTable from '../components/beneficiaries-table'
import { useState } from 'react'
import BeneficiariesPagination from '../components/beneficiaries-pagination'

export default function BeneficiariesPage() {
  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All Status')
  const [bank, setBank] = useState('All Banks')

  const handleAddBeneficiary = () => {
    router.push('/beneficiaries/add-beneficiaries')
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

      <BeneficiariesFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        bank={bank}
        setBank={setBank}
        onReset={() => {
          setSearch('')
          setStatus('All Status')
          setBank('All Banks')
        }}
      />
      <BeneficiariesTable
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <BeneficiariesPagination
        currentPage={currentPage}
        totalPages={5}
        totalRecords={80}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
