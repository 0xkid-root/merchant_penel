import { ArrowDown, ArrowUp, CreditCard, Wallet2 } from 'lucide-react';

export function TransactionSummary() {
  const stats = [
    {
      title: 'Total Credits',
      value: '₹14,82,350.00',
      count: '32 Transactions',
      icon: ArrowDown,
      bgColor: '#dcfce7',
      iconColor: '#16a34a',
      textColor: '#16a34a'
    },
    {
      title: 'Total Debits',
      value: '₹9,44,200.00',
      count: '48 Transactions',
      icon: ArrowUp,
      bgColor: '#fee2e2',
      iconColor: '#dc2626',
      textColor: '#dc2626'
    },
    {
      title: 'Net Balance Impact',
      value: '₹5,38,150.00',
      count: 'This Month',
      icon: CreditCard,
      bgColor: '#f0f4ff',
      iconColor: '#4f46e5',
      textColor: '#4f46e5'
    },
    {
      title: 'Total Transactions',
      value: '80',
      count: 'This Month',
      icon: Wallet2,
      bgColor: '#f3f4f6',
      iconColor: '#6b7280',
      textColor: '#6b7280'
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            style={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              gap: '12px'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: stat.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Icon style={{ width: '24px', height: '24px', color: stat.iconColor }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, fontWeight: 500 }}>
                {stat.title}
              </p>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: 0 }}>
                {stat.value}
              </h3>
              <p style={{ fontSize: '12px', color: stat.textColor, margin: 0, fontWeight: 500 }}>
                {stat.count}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
