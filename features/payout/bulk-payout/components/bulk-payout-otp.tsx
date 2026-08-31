'use client'

import { AlertCircle } from 'lucide-react'
import PayoutOtpVerification from '../../components/payout-otp-verification'

interface BulkPayoutOtpProps {
  onBack: () => void
  onVerify: (otp: string) => Promise<void>
  onResend: () => Promise<number>
  remainingSeconds: number
  error?: string | null
}

export default function BulkPayoutOtp({
  onBack,
  onVerify,
  onResend,
  remainingSeconds,
  error,
}: BulkPayoutOtpProps) {

  return (
    <div className="space-y-6">
      {error ? (
        <div className="mx-auto max-w-lg rounded-xl border border-red-100 bg-red-50 p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        </div>
      ) : null}

      <PayoutOtpVerification
        title="Verify Bulk Payout"
        description="Enter the OTP sent to your registered mobile number to authorize this bulk payout batch."
        verifyLabel="Verify and Submit Batch"
        onBack={onBack}
        onVerify={onVerify}
        onResend={onResend}
        initialSecondsLeft={remainingSeconds}
      />
    </div>
  )
}