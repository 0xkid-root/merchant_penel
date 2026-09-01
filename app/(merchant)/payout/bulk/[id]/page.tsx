import { Metadata } from 'next'
import BulkPayoutTransactionsPage from '@/features/payout/bulk-payout/components/bulk-payout-transactions-page'

export const metadata: Metadata = {
    title: 'Bulk Payout Transactions | Merchant Panel',
    description: 'View transactions for a specific bulk payout batch.',
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const batchId = parseInt(id, 10)
    return <BulkPayoutTransactionsPage batchId={batchId} />
}
