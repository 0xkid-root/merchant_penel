'use client';

import { Search, RotateCcw } from 'lucide-react';

interface TransactionFiltersProps {
  filters: any;
  setFilters: any;
}

export function TransactionFilters({ filters, setFilters }: TransactionFiltersProps) {
  const handleReset = () => {
    setFilters({
      search: '',
      type: 'All Types',
      mode: 'All Modes',
      status: 'All Status',
      dateRange: { from: '01/06/2025', to: '18/06/2025' }
    });
  };

  return (
    <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', alignItems: 'flex-end' }}>
        {/* Search */}
        <div style={{ gridColumn: 'span 2' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '10px 12px',
              backgroundColor: 'white'
            }}
          >
            <Search style={{ width: '16px', height: '16px', color: '#6b7280', marginRight: '8px' }} />
            <input
              type="text"
              placeholder="Search by transaction ID, remark..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '14px',
                color: '#111827'
              }}
            />
          </div>
        </div>

        {/* Type Filter */}
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          style={{
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: 'white',
            fontSize: '14px',
            color: '#111827',
            cursor: 'pointer'
          }}
        >
          <option>All Types</option>
          <option>Add Funds</option>
          <option>Payout</option>
          <option>Withdrawal</option>
          <option>Adjustment</option>
          <option>Fees</option>
        </select>

        {/* Mode Filter */}
        <select
          value={filters.mode}
          onChange={(e) => setFilters({ ...filters, mode: e.target.value })}
          style={{
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: 'white',
            fontSize: '14px',
            color: '#111827',
            cursor: 'pointer'
          }}
        >
          <option>All Modes</option>
          <option>NEFT</option>
          <option>RTGS</option>
          <option>IMPS</option>
          <option>UPI</option>
          <option>SYSTEM</option>
        </select>

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          style={{
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: 'white',
            fontSize: '14px',
            color: '#111827',
            cursor: 'pointer'
          }}
        >
          <option>All Status</option>
          <option>Success</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>

        {/* Date Range */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: 'white'
          }}
        >
          <input
            type="date"
            value={filters.dateRange.from}
            onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, from: e.target.value } })}
            style={{ fontSize: '13px', border: 'none', outline: 'none', flex: 1 }}
          />
          <span style={{ color: '#d1d5db' }}>-</span>
          <input
            type="date"
            value={filters.dateRange.to}
            onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, to: e.target.value } })}
            style={{ fontSize: '13px', border: 'none', outline: 'none', flex: 1 }}
          />
        </div>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '10px 12px',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#111827',
            fontWeight: 500,
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
        >
          <RotateCcw style={{ width: '16px', height: '16px' }} />
          Reset
        </button>
      </div>
    </div>
  );
}
