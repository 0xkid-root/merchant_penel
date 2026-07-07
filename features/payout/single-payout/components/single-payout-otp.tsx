'use client'

import PayoutOtpVerification from '../../components/payout-otp-verification'

interface SinglePayoutOtpProps {
  onBack: () => void
  onVerify: (otp: string) => void | Promise<void>
}

export default function SinglePayoutOtp({
  onBack,
  onVerify,
}: SinglePayoutOtpProps) {
  return (
    <PayoutOtpVerification
      title="Verify Single Payout"
      description="Enter the OTP sent to your registered mobile number to confirm this single payout."
      verifyLabel="Verify and Submit Payout"
      onBack={onBack}
      onVerify={onVerify}
    />
  )
}