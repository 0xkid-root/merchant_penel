import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { useForgotPasswordSendOtp } from '../hooks/usePassword'

interface ApiErrorResponse {
  message: string
}

interface OTPCountdownProps {
  email: string
}

export function OTPCountdown({ email }: OTPCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(60)
  const { mutateAsync: sendOtp, isPending } = useForgotPasswordSendOtp()

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const handleResend = async () => {
    try {
      await sendOtp({ email })
      toast.success('OTP sent successfully.')
      setTimeLeft(60)
    } catch (error) {
      const err = error as AxiosError<ApiErrorResponse>
      toast.error(err.response?.data?.message || 'Failed to send OTP')
    }
  }

  const formattedTime = `00:${timeLeft.toString().padStart(2, '0')}`

  return (
    <div className="mt-4 text-center">
      {timeLeft > 0 ? (
        <span className="text-sm font-medium text-slate-400">
          Resend OTP in <span className="font-semibold text-slate-500">{formattedTime}</span>
        </span>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          disabled={isPending}
          className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? 'Sending...' : 'Resend OTP'}
        </button>
      )}
    </div>
  )
}
