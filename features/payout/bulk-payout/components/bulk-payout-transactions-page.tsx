'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Filter } from 'lucide-react'

import PageHeader from '@/components/layout/page-header'
import Pagination from '@/components/common/pagination/Pagination'
import BatchTransactionsList from './batch-transactions-list'
import { useBatchTransactions } from '../hook/useBatchTransactions'

interface BulkPayoutTransactionsPageProps {
    batchId: number
}

export default function BulkPayoutTransactionsPage({ batchId }: BulkPayoutTransactionsPageProps) {
    const router = useRouter()
    const [page, setPage] = useState(0)

    const { data, isLoading, isError } = useBatchTransactions({
        bulkPayoutId: batchId,
        page,
        size: 10,
    })

    return (
        <div className="min-h-full bg-slate-50 px-4 py-5 lg:px-6">
            <div className="mx-auto max-w-[1440px] space-y-6">
                <div>
                    <button
                        onClick={() => router.push('/payout/bulk')}
                        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Bulk Payouts
                    </button>

                    <PageHeader
                        title={`Batch Transactions (#${batchId})`}
                        subtitle="View all individual transactions for this bulk payout batch."
                    />
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <div className="border-b border-slate-200 px-5 py-5 lg:px-6">
                        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-slate-900">
                                    Transactions
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Detailed list of all transfers in this batch.
                                </p>
                            </div>
                            <p className="text-sm font-medium text-slate-500">
                                {data?.totalElements || 0} Total Transactions
                            </p>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex min-h-64 items-center justify-center">
                            <p className="text-sm text-slate-500">Loading transactions...</p>
                        </div>
                    ) : isError ? (
                        <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
                            <h3 className="mt-4 text-base font-semibold text-slate-900">
                                Failed to load transactions
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Please try again later.
                            </p>
                        </div>
                    ) : !data?.content.length ? (
                        <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                                <Filter className="h-5 w-5 text-slate-400" />
                            </div>
                            <h3 className="mt-4 text-base font-semibold text-slate-900">
                                No transactions found
                            </h3>
                        </div>
                    ) : (
                        <>
                            <BatchTransactionsList transactions={data.content} />
                            <div className="border-t border-slate-200">
                                <Pagination
                                    page={data.number}
                                    totalPages={data.totalPages}
                                    totalElements={data.totalElements}
                                    pageSize={data.size}
                                    onPageChange={setPage}
                                    itemName="transactions"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
