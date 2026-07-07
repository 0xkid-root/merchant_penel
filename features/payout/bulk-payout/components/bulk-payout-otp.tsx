'use client'

import PayoutOtpVerification from '../../components/payout-otp-verification'

interface BulkPayoutOtpProps {
  onBack: () => void
  onVerified: (otp: string) => void
}

export default function BulkPayoutOtp({
  onBack,
  onVerified,
}: BulkPayoutOtpProps) {
  return (
    <PayoutOtpVerification
      title="Verify Bulk Payout"
      description="Enter the OTP sent to your registered mobile number to authorize this bulk payout batch."
      verifyLabel="Verify and Submit Batch"
      onBack={onBack}
      onVerify={onVerified}
    />
  )
}