'use client'

import { useRouter } from 'next/navigation'
import { AddBeneficiaryForm } from '../../components/add-beneficiaries/add-beneficiary-form'

export default function AddBeneficiaryPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/beneficiaries')
  }

  return (
    <div style={{ padding: '24px 32px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontFamily: 'var(--font-sans)' }}>
          <a 
            href="/beneficiaries" 
            style={{ fontSize: '14px', color: '#6366f1', textDecoration: 'none', cursor: 'pointer' }}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            Beneficiaries
          </a>
          <span style={{ color: '#d1d5db', margin: '0 4px' }}>›</span>
          <span style={{ fontSize: '14px', color: '#111827', fontWeight: 500 }}>Add Beneficiary</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '32px', fontWeight: 700, color: '#111827', margin: '0 0 8px 0' }}>
          Add Beneficiary hii
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 400, color: '#6b7280', margin: 0 }}>
          Add a new beneficiary for payouts. Bank details will be verified automatically.
        </p>
      </div>

      {/* Form */}
      <AddBeneficiaryForm onSuccess={handleSuccess} />
    </div>
  )
}
