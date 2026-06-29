'use client'

import { User, Mail, Phone, Building2 } from 'lucide-react'
import { PrimaryButton } from '@/components/buttons/primary-button'

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '32px' }}>
          Profile
        </h1>
        <p className="text-gray-600 mt-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '15px' }}>
          Manage your account and business information
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-10 h-10 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '24px' }}>
              Demo Merchant
            </h2>
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5" />
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}>
                  merchant@demo.com
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5" />
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}>
                  +91 98765 43210
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Building2 className="w-5 h-5" />
                <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}>
                  Demo Pvt. Ltd.
                </span>
              </div>
            </div>
          </div>
          <PrimaryButton>Edit Profile</PrimaryButton>
        </div>
      </div>
    </div>
  )
}
