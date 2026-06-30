
'use client'

import { UploadCloud } from 'lucide-react'
import { Control, Controller } from 'react-hook-form'
import { AddFundsSchema } from '../schema/add-funds.schema'

interface PaymentProofUploadProps {
  control: Control<AddFundsSchema>
  fileName: string
  uploadFile: (file: File) => void
}

export default function PaymentProofUpload({
  control,
  fileName,
  uploadFile,
}: PaymentProofUploadProps) {
  return (
    <Controller
      name="file"
      control={control}
      render={({ fieldState }) => (
        <div className="space-y-2">

          <label className="text-sm font-medium text-slate-900">
            Payment Proof
          </label>

          <label
            htmlFor="payment-proof"
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition
            ${
              fieldState.error
                ? 'border-red-400'
                : 'border-slate-300 hover:border-indigo-500'
            }`}
          >
            <UploadCloud className="mb-3 h-10 w-10 text-slate-400" />

            <p className="text-sm font-medium text-slate-700">
              Click to upload
            </p>

            <p className="mt-1 text-xs text-slate-500">
              PNG, JPG or PDF (Maximum 5 MB)
            </p>

            {fileName && (
              <p className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-600">
                {fileName}
              </p>
            )}
          </label>

          <input
            id="payment-proof"
            type="file"
            hidden
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) uploadFile(file)
            }}
          />

          {fieldState.error && (
            <p className="text-xs text-red-500">
              {fieldState.error.message}
            </p>
          )}

        </div>
      )}
    />
  )
}
