'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { addFundsSchema, AddFundsSchema } from '../schema/add-funds.schema'

export function useAddFunds() {
  const [fileName, setFileName] = useState('')

  const form = useForm<AddFundsSchema>({
    resolver: zodResolver(addFundsSchema),

    defaultValues: {
      amount: '',
      paymentMethod: '',
      referenceId: '',
      transactionDate: '',
      remarks: '',
      file: null,
    },
  })

  const copyVan = () => {
    navigator.clipboard.writeText('YESB000123456678')
    toast.success('VAN copied successfully')
  }

  const uploadFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Maximum file size is 5MB')
      return
    }

    form.setValue('file', file)
    setFileName(file.name)
  }

  const submit = (data: AddFundsSchema) => {
    console.log(data)

    toast.success('Add Funds Request Submitted')
  }

  return {
    form,
    fileName,
    copyVan,
    uploadFile,
    submit,
  }
}