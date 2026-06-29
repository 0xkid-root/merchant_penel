'use client'

import { Wallet, Lock, TrendingUp, TrendingDown } from 'lucide-react'

export function BalanceCards() {
  const cards = [
    {
      label: 'Available Balance',
      amount: '₹14,82,350.00',
      sublabel: 'Withdrawable Balance',
      subamount: '₹14,32,350.00',
      icon: Wallet,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Hold Balance',
      amount: '₹50,000.00',
      sublabel: 'On Hold',
      subamount: '₹50,000.00',
      icon: Lock,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      label: 'Lifetime Credit',
      amount: '₹28,45,300.00',
      sublabel: 'Total Credits',
      subamount: '32',
      icon: TrendingUp,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      label: 'Lifetime Debit',
      amount: '₹13,62,950.00',
      sublabel: 'Total Debits',
      subamount: '48',
      icon: TrendingDown,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '24px' }}>
      {cards.map((card, idx) => {
        const Icon = card.icon
        return (
          <div
            key={idx}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E5E7EB',
              padding: '24px',
              height: '170px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Top: Label + Icon */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', color: '#6B7280', margin: 0 }}>
                {card.label}
              </p>
              <div
                className={card.iconBg}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>

            {/* Middle: Amount */}
            <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '24px', color: '#111827', margin: 0, lineHeight: '1.2' }}>
              {card.amount}
            </h3>

            {/* Bottom: Divider + Sub Info */}
            <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '12px' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>
                {card.sublabel}
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px', color: '#111827', margin: 0 }}>
                {card.subamount}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
