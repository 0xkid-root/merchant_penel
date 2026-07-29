import TransactionDetailsPage from '@/features/wallet/pages/transaction-details-page'

export default async function Page({ params }: { params: Promise<{ ledgerId: string }> }) {
  const { ledgerId } = await params;
  return <TransactionDetailsPage ledgerId={ledgerId} />
}
