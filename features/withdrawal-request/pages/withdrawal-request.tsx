'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { WithdrawalRequestForm } from '../components/withdrawal-request-form';
import { WithdrawalLimitsInfo } from '../components/withdrawal-limits-info';

export function WithdrawalRequest() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Withdrawal request submitted:', data);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        
        <div>
          <h1 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '32px', margin: 0, marginBottom: '8px' }}>
            Withdrawal Request
          </h1>
          <p className="text-gray-600" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '15px', margin: 0 }}>
            Request a withdrawal from your wallet to your registered bank account. The request will be reviewed by our team.
          </p>
        </div>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Left Column - Form */}
        <WithdrawalRequestForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

        {/* Right Column - Info & Help */}
        <WithdrawalLimitsInfo />
      </div>
    </div>
  );
}
