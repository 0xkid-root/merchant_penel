'use client';

import { Shield, Clock, FileText, AlertTriangle, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export function WithdrawalLimitsInfo() {
  const dailyLimit = 500000;
  const usedToday = 120000;
  const remainingLimit = dailyLimit - usedToday;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
      {/* Important Information Card */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 600, color: '#111827', margin: '0 0 16px 0' }}>Important Information</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          {/* Info Item 1 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield style={{ width: '16px', height: '16px', color: '#16a34a' }} />
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#111827', margin: 0 }}>
                Withdrawals are processed to your registered bank account only.
              </p>
            </div>
          </div>

          {/* Info Item 2 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock style={{ width: '16px', height: '16px', color: '#2563eb' }} />
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#111827', margin: 0 }}>
                Requests are reviewed within <span style={{ fontWeight: 600 }}>30 minutes</span> during working hours.
              </p>
            </div>
          </div>

          {/* Info Item 3 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText style={{ width: '16px', height: '16px', color: '#d97706' }} />
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#111827', margin: 0 }}>
                Ensure your bank account is active and KYC verified.
              </p>
            </div>
          </div>

          {/* Info Item 4 */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle style={{ width: '16px', height: '16px', color: '#dc2626' }} />
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#111827', margin: 0 }}>
                Incorrect information may lead to rejection or processing delays.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Limits Card */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px' }}>
        <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 600, color: '#111827', margin: '0 0 16px 0' }}>Withdrawal Limits</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
          {/* Daily Limit */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Daily Withdrawal Limit</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
              ₹{dailyLimit.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #e5e7eb' }} />

          {/* Used Today */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Used Today</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
              ₹{usedToday.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid #e5e7eb' }} />

          {/* Remaining Limit */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: '#6b7280' }}>Remaining Limit</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#6366f1' }}>
              ₹{remainingLimit.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Need Help Card */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <HelpCircle style={{ width: '20px', height: '20px', color: '#6366f1', flexShrink: 0, marginTop: '4px' }} />
          <div>
            <h4 style={{ fontWeight: 600, color: '#111827', margin: '0 0 8px 0' }}>Need Help?</h4>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 16px 0' }}>
              If you face any issues while withdrawing, our support team is here to help.
            </p>
            <Link
              href="#"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, color: '#6366f1', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.color = '#4f46e5'}
              onMouseOut={(e) => e.currentTarget.style.color = '#6366f1'}
            >
              Contact Support
              <span>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
