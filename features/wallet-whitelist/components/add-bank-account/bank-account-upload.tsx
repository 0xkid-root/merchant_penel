'use client'

import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  CheckCircle2,
  FileText,
  Info,
  Trash2,
  UploadCloud,
  Eye,
} from 'lucide-react'
import { toast } from 'sonner'

import type { AddBankAccountFormData } from '../../schema/add-bank.schema'

const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'application/pdf',
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

export default function BankAccountUpload() {
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<AddBankAccountFormData>()

  const [isDragging, setIsDragging] = useState(false)

  const selectedFile = watch('cancelledCheque')

  const handleFile = (file?: File) => {
    if (!file) return

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast.error('Please upload a JPG, PNG, or PDF file only')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be less than 5 MB')
      return
    }

    setValue('cancelledCheque', file, {
      shouldValidate: true,
      shouldDirty: true,
    })

    toast.success('Document uploaded successfully')
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)

    handleFile(event.dataTransfer.files?.[0])
  }

  const handleRemove = () => {
    setValue('cancelledCheque', null, {
      shouldValidate: true,
      shouldDirty: true,
    })

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const formatFileSize = (size: number) => {
    if (size < 1024 * 1024) {
      return `${Math.round(size / 1024)} KB`
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1">
        <label className="text-sm font-semibold text-slate-800">
          Upload Cancelled Cheque / Passbook
        </label>

      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.pdf"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      {!selectedFile ? (
        <div
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 text-center transition ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-slate-200 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/40'
          }`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
            <UploadCloud className="h-6 w-6 text-indigo-600" />
          </div>

          <p className="mt-4 text-sm text-slate-700">
            <span className="font-semibold text-indigo-600">
              Click to upload
            </span>{' '}
            or drag and drop
          </p>

          <p className="mt-1 text-xs text-slate-500">
            JPG, PNG, PDF up to 5 MB
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {selectedFile.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>

            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const url = URL.createObjectURL(selectedFile)
                window.open(url, '_blank')
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-indigo-600 transition hover:bg-indigo-100"
              aria-label="Preview uploaded file"
              title="Preview"
            >
              <Eye className="h-4 w-4" />
            </button>
            
            <button
              type="button"
              onClick={handleRemove}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-100"
              aria-label="Remove uploaded file"
              title="Remove"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {errors.cancelledCheque && (
        <p className="text-xs font-medium text-red-500">
          {errors.cancelledCheque.message}
        </p>
      )}

      <p className="text-xs text-slate-500">
        Upload a clear cancelled cheque or the first page of your bank passbook.
      </p>
    </div>
  )
}