'use client'

import { WalletWhitelistResponse } from '../../types/wallet-whitelist.types'

interface Props {
  walletWhitelist: WalletWhitelistResponse
}

export default function WalletWhitelistBankDetails({ walletWhitelist }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">
        Bank Details
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Bank Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Bank Name
          </label>
          <input
            value={walletWhitelist.bankName || ''}
            readOnly
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default"
          />
        </div>

        {/* Account Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Account Type
          </label>
          <input
            value={walletWhitelist.accountType || ''}
            readOnly
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default"
          />
        </div>

        {/* Account Number */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Account Number
          </label>
          <input
            value={walletWhitelist.accountNumber || ''}
            readOnly
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default"
          />
        </div>

        {/* IFSC Code */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            IFSC Code
          </label>
          <input
            value={walletWhitelist.ifscCode || ''}
            readOnly
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default uppercase"
          />
        </div>
      </div>
    </div>
  )
}
