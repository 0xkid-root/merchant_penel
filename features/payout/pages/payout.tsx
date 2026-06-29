'use client'

import { useState, useEffect } from 'react'
import { Plus, Filter, Download } from 'lucide-react'
import { getPayoutsAction } from '@/features/payout/server-actions'
import { DataTable, DataTableColumn } from '@/components/table/data-table'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { Badge } from '@/components/common/badge'
import { Spinner } from '@/components/loader/spinner'
import { PayoutData } from '@/features/payout/types'
import { formatCurrency, formatDate } from '@/lib/utils/helpers'
import { toast } from 'sonner'

export default function PayoutPage() {
  const [payouts, setPayouts] = useState<PayoutData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)

  useEffect(() => {
    fetchPayouts()
  }, [])

  const fetchPayouts = async () => {
    setIsLoading(true)
    try {
      const response = await getPayoutsAction(1, 50)
      if (response.success) {
        setPayouts(response.data?.items || [])
      }
    } catch (error) {
      toast.error('Failed to fetch payouts')
    } finally {
      setIsLoading(false)
    }
  }

  const columns: DataTableColumn<PayoutData>[] = [
    {
      key: 'referenceId',
      label: 'Reference ID',
      render: (value) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#4f46e5' }}>
          {value}
        </span>
      ),
    },
    {
      key: 'beneficiaryName',
      label: 'Beneficiary',
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value) => (
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      key: 'bankName',
      label: 'Bank',
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge variant={value.toLowerCase() as any}>{value}</Badge>
      ),
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (value) => formatDate(value, 'dd MMM yyyy'),
    },
  ]

  if (isLoading && payouts.length === 0) {
    return <Spinner />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '32px' }}>
            Payouts
          </h1>
          <p className="text-gray-600 mt-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '15px' }}>
            View and manage all your payouts
          </p>
        </div>
        <PrimaryButton onClick={() => setShowCreateForm(true)}>
          <Plus className="w-4 h-4" />
          New Payout
        </PrimaryButton>
      </div>

      {/* Filter and Export */}
      <div className="flex items-center gap-3">
        <button
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-gray-700"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <button
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-gray-700"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Payout Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Payouts', value: payouts.length },
          { label: 'Successful', value: payouts.filter(p => p.status === 'SUCCESS').length },
          { label: 'Pending', value: payouts.filter(p => p.status === 'PENDING').length },
          { label: 'Failed', value: payouts.filter(p => p.status === 'FAILED').length },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
              {stat.label}
            </p>
            <p className="text-gray-900 text-2xl mt-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Payouts Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-6" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '20px' }}>
          Recent Payouts
        </h3>
        <DataTable
          columns={columns}
          data={payouts}
          emptyMessage="No payouts found. Create a new payout to get started."
        />
      </div>
    </div>
  )
}
