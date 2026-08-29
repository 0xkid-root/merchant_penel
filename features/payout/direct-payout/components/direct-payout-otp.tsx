'use client'

import PayoutOtpVerification from '../../components/payout-otp-verification'

interface DirectPayoutOtpProps {
  remainingSeconds: number
  onBack: () => void
  onVerify: (otp: string) => void | Promise<void>
  onResend: () => void | Promise<number | void>
}

export default function DirectPayoutOtp({
  remainingSeconds,
  onBack,
  onVerify,
  onResend,
}: DirectPayoutOtpProps) {
  return (
    <PayoutOtpVerification
      title="Verify Direct Payout"
      description="Enter the OTP sent to your registered mobile number to confirm this direct payout."
      verifyLabel="Verify and Submit Payout"
      initialSecondsLeft={remainingSeconds}
      onBack={onBack}
      onVerify={onVerify}
      onResend={onResend}
    />
  )
}