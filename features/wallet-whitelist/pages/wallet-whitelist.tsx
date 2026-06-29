'use client'

import { Shield, Plus } from 'lucide-react'
import { PrimaryButton } from '@/components/buttons/primary-button'

export default function WalletWhitelistPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '32px' }}>
          Wallet Whitelist
        </h1>
        <p className="text-gray-600 mt-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '15px' }}>
          Manage whitelisted accounts for enhanced security
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-100 rounded-lg">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '18px' }}>
              No whitelisted accounts yet
            </h2>
            <p className="text-gray-600 mt-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}>
              Add accounts to your whitelist for faster transfers
            </p>
          </div>
        </div>
        <PrimaryButton>
          <Plus className="w-4 h-4" />
          Add Account
        </PrimaryButton>
      </div>
    </div>
  )
}
