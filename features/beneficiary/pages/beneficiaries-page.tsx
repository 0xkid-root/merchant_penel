'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useBeneficiaryList } from '../hooks/useBeneficiaryList'

import BeneficiariesHeader from '../components/beneficiaries-header'
import BeneficiariesFilters from '../components/beneficiaries-filters'
import BeneficiariesTable from '../components/beneficiaries-table'
import Pagination from '@/components/common/pagination/Pagination'
import { useDeleteBeneficiary } from '../hooks/useDeleteBeneficiary'
import { useUpdateBeneficiaryStatus } from '../hooks/useUpdateBeneficiaryStatus'

export default function BeneficiariesPage() {
  const router = useRouter()

  const [page, setPage] = useState(0)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')

  const { data: beneficiariesResponse, isLoading, refetch } = useBeneficiaryList({
    page,
    size: 10,
    search,
    status,
  } as any)

  const beneficiaries = beneficiariesResponse?.data || {
    content: [],
    number: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0
  }

  const deleteBeneficiaryMutation = useDeleteBeneficiary()
  const updateStatusMutation = useUpdateBeneficiaryStatus()

  const handleAddBeneficiary = () => {
    router.push('/beneficiaries/add-beneficiaries')
  }

  const handleExport = () => {
    console.log('Export beneficiaries')
  }

  const handleView = (id: number) => {
    router.push(`/beneficiaries/${id}`)
  }

  const handleEdit = (id: number) => {
    router.push(`/beneficiaries/edit/${id}`)
  }

  const handleDelete = (id: number) => {
    deleteBeneficiaryMutation.mutate(id, {
      onSuccess: () => {
        refetch()
      }
    })
  }

  const handleStatusToggle = async (id: number, newStatus: string) => {
    await updateStatusMutation.mutateAsync({ id, payload: { status: newStatus } })
    refetch()
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
        onReset={() => {
          setSearch('')
          setStatus('')
          setPage(0)
        }}
      />

      <BeneficiariesTable
        beneficiaries={beneficiaries}
        loading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusToggle={handleStatusToggle}
      />

      <Pagination
        page={beneficiaries.number}
        pageSize={beneficiaries.size}
        totalPages={beneficiaries.totalPages}
        totalElements={beneficiaries.totalElements}
        onPageChange={setPage}
        itemName="beneficiaries"
      />
    </div>
  )
}

