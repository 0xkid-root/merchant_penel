'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Shield, AlertCircle } from 'lucide-react'
import { getBeneficiariesAction, deleteBeneficiaryAction } from '@/features/beneficiary/server-actions'
import { DataTable, DataTableColumn } from '@/components/table/data-table'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { Badge } from '@/components/common/badge'
import { Spinner } from '@/components/loader/spinner'
import { BeneficiaryData } from '@/features/beneficiary/types'
import { maskAccountNumber } from '@/lib/utils/helpers'
import { toast } from 'sonner'

export default function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchBeneficiaries()
  }, [])

  const fetchBeneficiaries = async () => {
    setIsLoading(true)
    try {
      const response = await getBeneficiariesAction(1, 50)
      if (response.success) {
        setBeneficiaries(response.data?.items || [])
      }
    } catch (error) {
      toast.error('Failed to fetch beneficiaries')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this beneficiary?')) return

    try {
      const response = await deleteBeneficiaryAction(id)
      if (response.success) {
        setBeneficiaries(prev => prev.filter(b => b.id !== id))
        toast.success('Beneficiary deleted successfully')
      } else {
        toast.error(response.error?.message || 'Failed to delete beneficiary')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  const columns: DataTableColumn<BeneficiaryData>[] = [
    {
      key: 'name',
      label: 'Beneficiary Name',
      render: (value) => (
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>{value}</span>
      ),
    },
    {
      key: 'bankName',
      label: 'Bank',
    },
    {
      key: 'accountNumber',
      label: 'Account Number',
      render: (value) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
          {maskAccountNumber(value)}
        </span>
      ),
    },
    {
      key: 'accountType',
      label: 'Type',
      render: (value) => <Badge variant="info">{value}</Badge>,
    },
    {
      key: 'isVerified',
      label: 'Status',
      render: (value) => (
        <Badge variant={value ? 'success' : 'warning'}>
          {value ? 'Verified' : 'Pending'}
        </Badge>
      ),
    },
    {
      key: 'id',
      label: 'Actions',
      render: (value) => (
        <button
          onClick={() => handleDelete(value)}
          className="text-red-600 hover:text-red-700 p-2"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      ),
    },
  ]

  if (isLoading && beneficiaries.length === 0) {
    return <Spinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '32px' }}>
            Beneficiaries
          </h1>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '15px' }}>
            Manage your beneficiary accounts for payouts
          </p>
        </div>
        <PrimaryButton onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4" />
          Add Beneficiary
        </PrimaryButton>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-900 font-semibold" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}>
            Account Verification
          </p>
          <p className="text-blue-800 text-sm mt-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}>
            All beneficiary accounts are verified using Penny Drop method for your security.
          </p>
        </div>
      </div>

      {/* Beneficiaries Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-6" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '20px' }}>
          Your Beneficiaries ({beneficiaries.length})
        </h3>
        <DataTable
          columns={columns}
          data={beneficiaries}
          emptyMessage="No beneficiaries added yet. Add one to get started."
        />
      </div>
    </div>
  )
}
