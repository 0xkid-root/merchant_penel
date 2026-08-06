import WalletWhitelistDetailsPage from '@/features/wallet-whitelist/pages/wallet-whitelist-details-page'
import { use } from 'react'

export default function Page({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Handle both Next.js 14 and 15 paradigms where params might be a Promise
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const id = resolvedParams?.id ? Number(resolvedParams.id) : 0;
  
  return <WalletWhitelistDetailsPage walletWhitelistId={id} />
}
