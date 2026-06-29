'use client'

import { Input } from '@/components/ui/input'
import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface InputFieldProps {
  label: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  type?: string
  disabled?: boolean
  error?: string
  icon?: LucideIcon
  required?: boolean
  className?: string
  name?: string
}

export function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
  error,
  icon: Icon,
  required = false,
  className = '',
  name,
}: InputFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={name}
        className="block text-slate-900"
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}
      >
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-3 h-5 w-5 text-slate-400" />}
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`${Icon ? 'pl-10' : ''} bg-white border-slate-300 text-slate-900 placeholder:text-slate-400`}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}
        />
      </div>
      {error && (
        <p
          className="text-red-600 text-sm"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '13px' }}
        >
          {error}
        </p>
      )}
    </div>
  )
}
