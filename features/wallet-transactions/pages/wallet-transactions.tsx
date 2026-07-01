'use client';

import Link from 'next/link';
import { ChevronLeft, Download } from 'lucide-react';
import { useState } from 'react';
import { TransactionSummary } from '../components/transaction-summary';
import { TransactionFilters } from '../components/transaction-filters';
import { TransactionTable } from '../components/transaction-table';

export function WalletTransactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    type: 'All Types',
    mode: 'All Modes',
    status: 'All Status',
    dateRange: { from: '01/06/2025', to: '18/06/2025' }
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', padding: '24px' }}>
      {/* Header with Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Link href="/wallet" className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>Back to Wallet</span>
          </Link>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h1 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '32px', margin: '0 0 8px 0' }}>
              Wallet Transactions
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '15px', margin: 0 }}>
              View all credits, debits and adjustments in your wallet.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontWeight: 500,
                fontSize: '14px',
                color: '#111827',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                backgroundColor: '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 500,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6366f1'}
            >
              ⚙️ Filters
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <TransactionSummary />

      {/* Filters */}
      <TransactionFilters filters={filters} setFilters={setFilters} />

      {/* Transaction Table */}
      <TransactionTable currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}
