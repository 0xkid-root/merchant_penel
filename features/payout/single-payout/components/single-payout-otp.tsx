'use client'

import PayoutOtpVerification from '../../components/payout-otp-verification'

interface SinglePayoutOtpProps {
  remainingSeconds?: number
  onBack: () => void
  onVerify: (otp: string) => void | Promise<void>
  onResend: () => Promise<number | void>
}

export default function SinglePayoutOtp({
  remainingSeconds,
  onBack,
  onVerify,
  onResend,
}: SinglePayoutOtpProps) {
  return (
    <PayoutOtpVerification
      title="Verify Single Payout"
      description="Enter the OTP sent to your registered mobile number to confirm this single payout."
      verifyLabel="Verify and Submit Payout"
      initialSecondsLeft={remainingSeconds}
      onBack={onBack}
      onVerify={onVerify}
      onResend={onResend}
    />
  )
}