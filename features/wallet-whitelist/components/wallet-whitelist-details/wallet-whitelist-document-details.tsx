'use client'

import { WalletWhitelistResponse } from '../../types/wallet-whitelist.types'
import { FileText, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface Props {
  walletWhitelist: WalletWhitelistResponse
}

export default function WalletWhitelistDocumentDetails({ walletWhitelist }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">
        Document Details
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Document Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Document Type
          </label>
          <input
            value={walletWhitelist.documentType || ''}
            readOnly
            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none cursor-default"
          />
        </div>

        {/* Document Preview */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-900">
            Attached Document
          </label>
          {walletWhitelist.documentPreviewUrl || walletWhitelist.documentPath ? (
            <Link
              href={walletWhitelist.documentPreviewUrl || `/${walletWhitelist.documentPath}`}
              target="_blank"
              className="flex items-center justify-between rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-700 transition hover:bg-indigo-100"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="font-medium truncate max-w-[200px]">View Document</span>
              </div>
              <ExternalLink className="h-4 w-4" />
            </Link>
          ) : (
            <div className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-500 cursor-default">
              No document uploaded
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
