'use client'

import { WalletWhitelistResponse } from '../../types/wallet-whitelist.types'
import { Info, ShieldAlert, ShieldCheck, Clock } from 'lucide-react'

interface Props {
  walletWhitelist: WalletWhitelistResponse
}

export default function WalletWhitelistDetailsSidebar({ walletWhitelist }: Props) {
  return (
    <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 ">
      <h3 className="mb-6 text-lg font-semibold text-slate-900">
        Status Information
      </h3>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${walletWhitelist.status === 'APPROVED' ? 'bg-emerald-50' :
            walletWhitelist.status === 'REJECTED' ? 'bg-red-50' :
              'bg-amber-50'
            }`}>
            {walletWhitelist.status === 'APPROVED' ? <ShieldCheck className="h-5 w-5 text-emerald-600" /> :
              walletWhitelist.status === 'REJECTED' ? <ShieldAlert className="h-5 w-5 text-red-600" /> :
                <Clock className="h-5 w-5 text-amber-600" />}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              {walletWhitelist.status === 'APPROVED' ? 'Approved' :
                walletWhitelist.status === 'REJECTED' ? 'Rejected' :
                  'Pending Review'}
            </h4>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              {walletWhitelist.status === 'APPROVED' ? 'This bank account is approved and can be used for wallet transactions.' :
                walletWhitelist.status === 'REJECTED' ? `This request was rejected. Reason: ${walletWhitelist.rejectionReason || walletWhitelist.customRejectionReason || 'Unknown'}` :
                  'This request is currently under review by an administrator.'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
            <Info className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Read Only
            </h4>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Verified bank account details cannot be edited. If you need to make changes, please submit a new request.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
