'use client'

import { CheckCircle2, Clock, AlertTriangle, Headphones } from 'lucide-react'
import Link from 'next/link'

const infoItems = [
  {
    icon: CheckCircle2,
    title: 'Use only your unique Virtual Account Number (VAN)',
    description: 'Use only your unique Virtual Account Number (VAN) to transfer funds.',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: Clock,
    title: '30 minutes review time',
    description: 'Requests are typically reviewed within 30 minutes during working hours.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: AlertTriangle,
    title: 'Account name verification',
    description: 'Ensure the name on the sending account matches your registered business name.',
    color: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
  },
  {
    icon: AlertTriangle,
    title: 'Avoid incorrect information',
    description: 'Incorrect information may lead to delays in crediting your wallet.',
    color: 'bg-red-50',
    iconColor: 'text-red-600',
  },
]

export function PaymentNotes() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
      {/* Important Information Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-6" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '16px' }}>
          Important Information
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          {infoItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className={`${item.color} rounded-lg p-4 flex gap-3`}
              >
                <Icon className={`${item.iconColor} w-5 h-5 flex-shrink-0 mt-0.5`} />
                <div>
                  <p className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '13px', marginBottom: '4px' }}>
                    {item.title}
                  </p>
                  <p className="text-gray-700" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '13px' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Need Help Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-4" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '16px' }}>
          Need Help?
        </h3>

        <div className="flex gap-3 mb-4">
          <Headphones className="w-6 h-6 text-indigo-600 flex-shrink-0" />
          <div>
            <p className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', marginBottom: '2px' }}>
              Support Available
            </p>
            <p className="text-gray-600" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '13px' }}>
              If you face any issues while adding funds, our support team is here to help.
            </p>
          </div>
        </div>

        <Link
          href="/support"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}
        >
          Contact Support
          <span>→</span>
        </Link>
      </div>
    </div>
  )
}
