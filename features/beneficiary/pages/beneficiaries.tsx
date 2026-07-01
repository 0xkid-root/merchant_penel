'use client'

import { useState } from 'react'
import { Plus, Trash2, Shield, Clock, Lock, Search, Filter, MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface Beneficiary {
  id: string
  initials: string
  name: string
  bankName: string
  accountNumber: string
  ifscCode: string
  status: 'Verified' | 'Pending' | 'Failed'
  createdOn: string
}

const mockBeneficiaries: Beneficiary[] = [
  {
    id: '1',
    initials: 'RS',
    name: 'Rahul Sharma',
    bankName: 'HDFC Bank',
    accountNumber: 'XXXX XXXX 4521',
    ifscCode: 'HDFC0001234',
    status: 'Verified',
    createdOn: '18 Jun 2025, 10:30 AM',
  },
  {
    id: '2',
    initials: 'PS',
    name: 'Priya Singh',
    bankName: 'ICICI Bank',
    accountNumber: 'XXXX XXXX 7865',
    ifscCode: 'ICIC0000789',
    status: 'Pending',
    createdOn: '17 Jun 2025, 04:15 PM',
  },
  {
    id: '3',
    initials: 'AK',
    name: 'Amit Kumar',
    bankName: 'Axis Bank',
    accountNumber: 'XXXX XXXX 9654',
    ifscCode: 'UTIB0000555',
    status: 'Failed',
    createdOn: '16 Jun 2025, 11:20 AM',
  },
  {
    id: '4',
    initials: 'NK',
    name: 'Neha Kumari',
    bankName: 'State Bank of India',
    accountNumber: 'XXXX XXXX 1122',
    ifscCode: 'SBIN0004321',
    status: 'Verified',
    createdOn: '15 Jun 2025, 03:45 PM',
  },
  {
    id: '5',
    initials: 'VM',
    name: 'Vikram Mehta',
    bankName: 'Federal Bank',
    accountNumber: 'XXXX XXXX 3344',
    ifscCode: 'FDRL0002211',
    status: 'Pending',
    createdOn: '14 Jun 2025, 01:10 PM',
  },
]

const getInitialColor = (initials: string) => {
  const colors = [
    { bg: '#f3e8ff', text: '#a855f7' },
    { bg: '#e0e7ff', text: '#6366f1' },
    { bg: '#dcfce7', text: '#16a34a' },
    { bg: '#fef3c7', text: '#ca8a04' },
    { bg: '#e0e7ff', text: '#6366f1' },
  ]
  return colors[initials.charCodeAt(0) % colors.length]
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Verified':
      return { bg: '#dcfce7', text: '#16a34a' }
    case 'Pending':
      return { bg: '#fef3c7', text: '#ca8a04' }
    case 'Failed':
      return { bg: '#fee2e2', text: '#dc2626' }
    default:
      return { bg: '#f3f4f6', text: '#6b7280' }
  }
}

export default function BeneficiariesPage() {
  const router = useRouter()
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(mockBeneficiaries)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredBeneficiaries = beneficiaries.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.accountNumber.includes(searchQuery) ||
    b.ifscCode.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredBeneficiaries.length / itemsPerPage)
  const paginatedBeneficiaries = filteredBeneficiaries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this beneficiary?')) {
      setBeneficiaries(prev => prev.filter(b => b.id !== id))
      toast.success('Beneficiary deleted successfully')
    }
  }

  return (
    <div style={{ padding: '24px 32px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '32px', fontWeight: 700, color: '#111827', margin: 0, marginBottom: '8px' }}>
            Beneficiaries
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 400, color: '#6b7280', margin: 0 }}>
            Manage your payout beneficiaries. Add, edit, delete and verify beneficiary account details.
          </p>
        </div>
        <button
          onClick={() => router.push('/beneficiaries/add')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
        >
          <Plus style={{ width: '18px', height: '18px' }} />
          Add Beneficiary
        </button>
      </div>

      {/* Search and Filter */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: 'white' }}>
          <Search style={{ width: '18px', height: '18px', color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search by name, account no., or IFSC"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              fontFamily: 'var(--font-sans)',
              backgroundColor: 'transparent',
            }}
          />
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: 'white',
            color: '#111827',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '14px',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
          <Filter style={{ width: '18px', height: '18px' }} />
          Filter
        </button>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        {/* Table Header Title */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e7eb', backgroundColor: 'white' }}>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: '#111827', margin: 0 }}>
            All Beneficiaries ({filteredBeneficiaries.length})
          </h3>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            {/* Table Head */}
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: '12px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
                  Beneficiary Name
                </th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: '12px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
                  Bank Name
                </th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: '12px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
                  Account Number
                </th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: '12px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
                  IFSC Code
                </th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: '12px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
                  Verification Status
                </th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: '12px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
                  Created On
                </th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 600, color: '#6b7280', fontSize: '12px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {paginatedBeneficiaries.length > 0 ? (
                paginatedBeneficiaries.map((ben, idx) => {
                  const initialsColor = getInitialColor(ben.initials)
                  const statusColor = getStatusColor(ben.status)
                  return (
                    <tr key={ben.id} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafbfc' }}>
                      {/* Beneficiary Name with Avatar */}
                      <td style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            backgroundColor: initialsColor.bg,
                            color: initialsColor.text,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 600,
                            fontSize: '12px',
                            flexShrink: 0,
                          }}
                        >
                          {ben.initials}
                        </div>
                        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, color: '#111827' }}>
                          {ben.name}
                        </span>
                      </td>

                      {/* Bank Name */}
                      <td style={{ padding: '16px 24px', fontFamily: 'var(--font-sans)', color: '#4b5563' }}>
                        {ben.bankName}
                      </td>

                      {/* Account Number */}
                      <td style={{ padding: '16px 24px', fontFamily: 'var(--font-mono)', fontWeight: 500, color: '#111827' }}>
                        {ben.accountNumber}
                      </td>

                      {/* IFSC Code */}
                      <td style={{ padding: '16px 24px', fontFamily: 'var(--font-mono)', color: '#4b5563' }}>
                        {ben.ifscCode}
                      </td>

                      {/* Status Badge */}
                      <td style={{ padding: '16px 24px' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 10px',
                            backgroundColor: statusColor.bg,
                            color: statusColor.text,
                            borderRadius: '4px',
                            fontSize: '13px',
                            fontWeight: 500,
                            fontFamily: 'var(--font-sans)',
                          }}
                        >
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: statusColor.text }} />
                          {ben.status}
                        </div>
                      </td>

                      {/* Created On */}
                      <td style={{ padding: '16px 24px', fontFamily: 'var(--font-sans)', color: '#4b5563' }}>
                        {ben.createdOn}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            style={{
                              padding: '6px 12px',
                              border: '1px solid #e5e7eb',
                              borderRadius: '4px',
                              backgroundColor: 'white',
                              color: '#6366f1',
                              fontWeight: 500,
                              fontSize: '13px',
                              cursor: 'pointer',
                              fontFamily: 'var(--font-sans)',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                          >
                            Edit
                          </button>
                          <button
                            style={{
                              padding: '6px 8px',
                              border: '1px solid #e5e7eb',
                              borderRadius: '4px',
                              backgroundColor: 'white',
                              color: '#dc2626',
                              cursor: 'pointer',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            onClick={() => handleDelete(ben.id)}
                          >
                            <Trash2 style={{ width: '16px', height: '16px' }} />
                          </button>
                          <button
                            style={{
                              padding: '6px 8px',
                              border: '1px solid #e5e7eb',
                              borderRadius: '4px',
                              backgroundColor: 'white',
                              color: '#6b7280',
                              cursor: 'pointer',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                          >
                            <MoreVertical style={{ width: '16px', height: '16px' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={7} style={{ padding: '40px 24px', textAlign: 'center', color: '#6b7280' }}>
                    No beneficiaries found. Add one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#6b7280', margin: 0 }}>
            Showing {Math.max(1, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(currentPage * itemsPerPage, filteredBeneficiaries.length)} of {filteredBeneficiaries.length} beneficiaries
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              disabled={currentPage === 1}
              style={{
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                backgroundColor: 'white',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  backgroundColor: currentPage === page ? '#6366f1' : 'white',
                  color: currentPage === page ? 'white' : '#111827',
                  fontWeight: currentPage === page ? 600 : 400,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                }}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              style={{
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                backgroundColor: 'white',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Info Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginTop: '40px' }}>
        {/* Card 1 */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px', display: 'flex', gap: '16px' }}>
          <Shield style={{ width: '24px', height: '24px', color: '#6366f1', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: '#111827', margin: '0 0 6px 0' }}>
              Only verified beneficiaries
            </h4>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#6b7280', margin: 0 }}>
              can be used for payouts.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px', display: 'flex', gap: '16px' }}>
          <Clock style={{ width: '24px', height: '24px', color: '#ca8a04', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: '#111827', margin: '0 0 6px 0' }}>
              Verification is usually completed
            </h4>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#6b7280', margin: 0 }}>
              within 5-30 minutes.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '20px', display: 'flex', gap: '16px' }}>
          <Lock style={{ width: '24px', height: '24px', color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: '#111827', margin: '0 0 6px 0' }}>
              Ensure account details are correct
            </h4>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#6b7280', margin: 0 }}>
              to avoid payout failures.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
