'use client'

import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  withdrawalSchema,
  WithdrawalSchema,
} from '../schema/withdrawal.schema'

export function useWithdrawal() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fileName, setFileName] = useState('')

  const availableBalance = 1482350

  const form = useForm<WithdrawalSchema>({
    resolver: zodResolver(withdrawalSchema),
    defaultValues: {
      amount: '',
      bankAccount: '',
      paymentMethod: '',
      remarks: '',
      document: undefined,
    },
  })

  const uploadFile = (files: FileList | null) => {
    if (!files?.length) return

    const file = files[0]

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Maximum file size is 5MB')
      return
    }

    form.setValue('document', file)

    setFileName(file.name)

    toast.success('File uploaded successfully')
  }

  const submit = async (data: WithdrawalSchema) => {
    const amount = Number(data.amount)

    if (amount > availableBalance) {
      toast.error(
        `Maximum withdrawable amount is ₹${availableBalance.toLocaleString()}`
      )
      return
    }

    console.log(data)

    toast.success('Withdrawal request submitted')
  }

  return {
    form,
    submit,
    uploadFile,
    fileInputRef,
    fileName,
    availableBalance,
  }
}