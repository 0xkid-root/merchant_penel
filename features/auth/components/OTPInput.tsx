import { useRef, useEffect, KeyboardEvent } from 'react'
import { Input } from '@/components/ui/input'

interface OTPInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function OTPInput({ value, onChange, disabled }: OTPInputProps) {
  const otp = value.split('').concat(Array(6).fill('')).slice(0, 6)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {

    // User  complete OTP
    if (value.length > 1) {

      const pasted = value.replace(/\D/g, '').slice(0, 6)

      const newOtp = [...otp]

      pasted.split('').forEach((char, i) => {
        if (index + i < 6) {
          newOtp[index + i] = char
        }
      })

      onChange(newOtp.join(''))

      const nextIndex = Math.min(index + pasted.length, 5)

      inputRefs.current[nextIndex]?.focus()

      return
    }

    const newOtp = [...otp]

    newOtp[index] = value

    onChange(newOtp.join(''))

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }


  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-between gap-2 sm:gap-4">
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => { inputRefs.current[index] = el }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          className="h-12 w-12 rounded-xl border-slate-300 text-center text-lg font-semibold sm:h-14 sm:w-14 sm:text-xl"
        />
      ))}
    </div>
  )
}
