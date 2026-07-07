'use client'

import PayoutOtpVerification from '../../components/payout-otp-verification'

interface DirectPayoutOtpProps {
  onBack: () => void
  onVerify: () => void
}

export default function DirectPayoutOtp({
  onBack,
  onVerify,
}: DirectPayoutOtpProps) {
  return (
    <PayoutOtpVerification
      title="Verify Direct Payout"
      description="Enter the OTP sent to your registered mobile number to confirm this direct payout."
      verifyLabel="Verify and Submit Payout"
      onBack={onBack}
      onVerify={() => onVerify()}
    />
  )
}