'use client';

import { ArrowDown, ArrowUp, MoreVertical } from 'lucide-react';

interface TransactionTableProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export function TransactionTable({ currentPage, setCurrentPage }: TransactionTableProps) {
  const transactions = [
    { id: '#WTX1142', type: 'Add Funds', icon: 'down', mode: 'NEFT', amount: '+₹50,000.00', balance: '₹14,82,350.00', remarks: 'Fund Added via NEFT', date: '18 Jun 2025, 10:02 AM', status: 'Success' },
    { id: '#WTX1141', type: 'Payout', icon: 'up', mode: 'IMPS', amount: '-₹5,200.00', balance: '₹14,32,350.00', remarks: 'Payout to Ravi Kumar', date: '18 Jun 2025, 09:47 AM', status: 'Success' },
    { id: '#WTX1140', type: 'Payout', icon: 'up', mode: 'UPI', amount: '-₹12,000.00', balance: '₹14,37,550.00', remarks: 'Payout to Priya Singh', date: '18 Jun 2025, 09:30 AM', status: 'Pending' },
    { id: '#WTX1139', type: 'Withdrawal Request', icon: 'up', mode: 'NEFT', amount: '-₹25,000.00', balance: '₹14,49,550.00', remarks: 'Withdrawal to HDFC - 4321', date: '18 Jun 2025, 09:15 AM', status: 'Pending' },
    { id: '#WTX1138', type: 'Add Funds', icon: 'down', mode: 'NEFT', amount: '+₹1,00,000.00', balance: '₹14,24,550.00', remarks: 'Wallet top-up via NEFT', date: '17 Jun 2025, 04:25 PM', status: 'Success' },
    { id: '#WTX1137', type: 'Payout', icon: 'up', mode: 'RTGS', amount: '-₹8,500.00', balance: '₹13,74,550.00', remarks: 'Payout to Deepak Mehta', date: '17 Jun 2025, 03:40 PM', status: 'Success' },
    { id: '#WTX1136', type: 'Payout', icon: 'up', mode: 'NEFT', amount: '-₹3,200.00', balance: '₹13,83,050.00', remarks: 'Payout to Sneha Patel', date: '17 Jun 2025, 02:18 PM', status: 'Failed' },
    { id: '#WTX1135', type: 'Add Funds', icon: 'down', mode: 'IMPS', amount: '+₹25,000.00', balance: '₹13,86,250.00', remarks: 'Fund Added via IMPS', date: '17 Jun 2025, 11:05 AM', status: 'Success' },
    { id: '#WTX1134', type: 'Adjustments', icon: 'down', mode: 'SYSTEM', amount: '+₹250.00', balance: '₹13,61,250.00', remarks: 'Interest Credited', date: '16 Jun 2025, 10:00 PM', status: 'Success' },
    { id: '#WTX1133', type: 'Fees', icon: 'up', mode: 'SYSTEM', amount: '-₹18.00', balance: '₹13,61,000.00', remarks: 'GST Charge', date: '16 Jun 2025, 10:00 PM', status: 'Success' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return '#16a34a';
      case 'Pending': return '#d97706';
      case 'Failed': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Success': return '#dcfce7';
      case 'Pending': return '#fef3c7';
      case 'Failed': return '#fee2e2';
      default: return '#f3f4f6';
    }
  };

  return (
    <div>
      {/* Table */}
      <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>TXN ID</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>TYPE</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>MODE</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>AMOUNT</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>BALANCE AFTER</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>REMARKS</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>DATE & TIME</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>STATUS</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px 16px', fontSize: '14px', color: '#6366f1', fontWeight: 500 }}>{tx.id}</td>
                <td style={{ padding: '12px 16px', fontSize: '14px', color: '#111827' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: tx.icon === 'down' ? '#dcfce7' : '#fee2e2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {tx.icon === 'down' ? (
                        <ArrowDown style={{ width: '14px', height: '14px', color: '#16a34a' }} />
                      ) : (
                        <ArrowUp style={{ width: '14px', height: '14px', color: '#dc2626' }} />
                      )}
                    </div>
                    {tx.type}
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '14px', color: '#6366f1', fontWeight: 500 }}>{tx.mode}</td>
                <td style={{ padding: '12px 16px', fontSize: '14px', color: tx.amount.includes('+') ? '#16a34a' : '#dc2626', fontWeight: 500 }}>{tx.amount}</td>
                <td style={{ padding: '12px 16px', fontSize: '14px', color: '#111827' }}>{tx.balance}</td>
                <td style={{ padding: '12px 16px', fontSize: '14px', color: '#6b7280' }}>{tx.remarks}</td>
                <td style={{ padding: '12px 16px', fontSize: '14px', color: '#6b7280' }}>{tx.date}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 500,
                      color: getStatusColor(tx.status),
                      backgroundColor: getStatusBg(tx.status)
                    }}
                  >
                    {tx.status}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MoreVertical style={{ width: '18px', height: '18px', color: '#6b7280' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Showing 1 to 10 of 80 transactions</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#6b7280'
            }}
          >
            ←
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: '8px 12px',
                border: page === currentPage ? 'none' : '1px solid #e5e7eb',
                borderRadius: '6px',
                backgroundColor: page === currentPage ? '#6366f1' : 'white',
                color: page === currentPage ? 'white' : '#111827',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: page === currentPage ? 600 : 400
              }}
            >
              {page}
            </button>
          ))}
          <button
            style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#6b7280'
            }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
