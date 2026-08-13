'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { toast } from 'sonner'
import PageHeader from '@/components/layout/page-header'
import PayoutStatusBadge from './payout-status-badge'
import { formatIndianCurrency, formatPayoutDateTime } from '../data/single-payout-data'
import { useSinglePayoutDetails } from '../hooks/use-single-payout-details'
import { SinglePayoutDetailsSkeleton } from './single-payout-details-skeleton'

interface SinglePayoutDetailsProps {
  id: number
}



function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="text-sm font-semibold text-slate-900 break-all">
        {value === null || value === undefined || value === '' ? '—' : value}
      </dd>
    </div>
  )
}

function CopyableDetailItem({ label, value }: { label: string; value: string | null | undefined }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Unable to copy')
    }
  }

  const isEmpty = value === null || value === undefined || value === ''

  return (
    <div className="flex flex-col gap-1">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="text-sm font-semibold text-slate-900 break-all flex items-center gap-2">
        <span>{isEmpty ? '—' : value}</span>
        {!isEmpty && (
          <button
            type="button"
            onClick={handleCopy}
            className="text-slate-400 hover:text-indigo-600 transition-colors"
            aria-label={`Copy ${label}`}
          >
            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          </button>
        )}
      </dd>
    </div>
  )
}

export default function SinglePayoutDetails({ id }: SinglePayoutDetailsProps) {
  const { data, isLoading, isError } = useSinglePayoutDetails(id)

  if (isLoading) {
    return <SinglePayoutDetailsSkeleton />
  }

  if (isError || !data) {
    return (
      <div className="min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">
        <PageHeader
          backHref="/payout/single"
          backLabel="Back to Single Payouts"
        />
        <div className="mx-auto max-w-3xl py-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <h1 className="text-2xl font-bold text-red-900">
              Payout Not Found
            </h1>
            <p className="mt-2 text-sm text-red-700">
              We could not find the details for this payout request. It may have been removed or the ID is invalid.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Single Payout Details"
        subtitle={`Detailed information for payout ${data.transactionId}`}
        backHref="/payout/single"
        backLabel="Back to Single Payouts"
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="p-6 sm:p-8">
          {/* Top Summary Area */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
            <CopyableDetailItem label="Transaction ID" value={data.transactionId} />
            <div className="flex flex-col gap-1">
              <dt className="text-sm font-medium text-slate-500">Payout Status</dt>
              <dd className="text-sm font-semibold text-slate-900 break-all">
                <PayoutStatusBadge status={data.payoutStatus} />
              </dd>
            </div>
            <DetailItem label="Amount" value={formatIndianCurrency(data.amount)} />
            <DetailItem label="Payment Mode" value={data.paymentMode} />
          </div>

          <hr className="my-8 border-slate-200" />

          {/* Transaction Details */}
          <div>
            <h3 className="mb-6 text-base font-semibold text-slate-900">Transaction Details</h3>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <CopyableDetailItem label="UTR Number" value={data.utrNumber} />
              <DetailItem label="Payout Type" value={data.payoutType} />
              <DetailItem label="Created At" value={formatPayoutDateTime(data.createdAt)} />
            </div>
          </div>

          <hr className="my-8 border-slate-200" />

          {/* Beneficiary / Bank Details */}
          <div>
            <h3 className="mb-6 text-base font-semibold text-slate-900">Beneficiary / Bank Details</h3>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <DetailItem label="Beneficiary Name" value={data.beneficiaryName} />
              <DetailItem label="Merchant Name" value={data.merchantName} />
              <CopyableDetailItem label="Account Number" value={data.accountNumber} />
              <CopyableDetailItem label="IFSC Code" value={data.ifscCode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
