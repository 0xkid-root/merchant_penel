'use client'

import React from 'react'
import PageHeader from '@/components/layout/page-header'
import PayoutStatusBadge from './payout-status-badge'
import { formatIndianCurrency, formatPayoutDateTime } from '../data/single-payout-data'
import { useSinglePayoutDetails } from '../hooks/use-single-payout-details'
import { Skeleton } from '@/components/ui/skeleton'

interface SinglePayoutDetailsProps {
  id: number
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="p-6">
        <dl className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
          {children}
        </dl>
      </div>
    </section>
  )
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

export default function SinglePayoutDetails({ id }: SinglePayoutDetailsProps) {
  const { data, isLoading, isError } = useSinglePayoutDetails(id)

  if (isLoading) {
    return (
      <div className="min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Skeleton className="h-8 w-48 sm:h-9" />
            <Skeleton className="mt-2 h-5 w-64 sm:w-80" />
          </div>
        </div>
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    )
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-center items-center text-center">
          <p className="text-sm font-medium text-slate-500 mb-2">Total Amount</p>
          <p className="text-3xl font-bold text-slate-900">{formatIndianCurrency(data.amount)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-center items-center text-center">
          <p className="text-sm font-medium text-slate-500 mb-2">Payout Status</p>
          <PayoutStatusBadge status={data.payoutStatus} />
        </div>
      </div>

      <SectionCard title="Transaction Details">
        <DetailItem label="Transaction ID" value={data.transactionId} />
        <DetailItem label="UTR Number" value={data.utrNumber} />
        <DetailItem label="Payout Type" value={data.payoutType} />
        <DetailItem label="Payment Mode" value={data.paymentMode} />
        <DetailItem label="Created At" value={formatPayoutDateTime(data.createdAt)} />
      </SectionCard>

      <SectionCard title="Beneficiary / Bank Details">
        <DetailItem label="Beneficiary Name" value={data.beneficiaryName} />
        <DetailItem label="Merchant Name" value={data.merchantName} />
        <DetailItem label="Account Number" value={data.accountNumber} />
        <DetailItem label="IFSC Code" value={data.ifscCode} />
      </SectionCard>
    </div>
  )
}
