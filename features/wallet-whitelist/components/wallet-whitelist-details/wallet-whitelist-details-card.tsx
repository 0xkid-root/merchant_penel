'use client'

import { WalletWhitelistResponse } from '../../types/wallet-whitelist.types'

interface Props {
  walletWhitelist: WalletWhitelistResponse
}

export default function WalletWhitelistDetailsCard({ walletWhitelist }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">
        Wallet Whitelist Information
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Wallet Holder Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Wallet Holder Name
          </label>
          <input
            value={walletWhitelist.walletHolderName || ''}
            readOnly
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default"
          />
        </div>

        {/* Verified Account Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Verified Account Name
          </label>
          <input
            value={walletWhitelist.verifiedAccountName || ''}
            readOnly
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default"
          />
        </div>
      </div>
    </div>
  )
}
