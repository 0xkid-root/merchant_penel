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
          <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-medium text-slate-900">
              Payment Proof
            </label>

            <span className="text-xs text-slate-500">Optional</span>
          </div>

          <label
            htmlFor="payment-proof"
            className={`flex min-h-16 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 text-center transition sm:px-8 ${
              fieldState.error
                ? 'border-red-400 bg-red-50'
                : 'border-slate-300 bg-slate-50/50 hover:border-indigo-500 hover:bg-indigo-50/30'
            }`}
          >
            <UploadCloud className="mb-3 h-10 w-10 text-slate-400" />

            <p className="text-sm font-semibold text-slate-700">
              Click to upload payment proof
            </p>

            <p className="mt-1 text-xs text-slate-500">
              PNG, JPG, JPEG or PDF up to 5 MB
            </p>

            {fileName ? (
              <p className="mt-4 max-w-full truncate rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                Uploaded: {fileName}
              </p>
            ) : null}
          </label>

          <input
            id="payment-proof"
            type="file"
            hidden
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={(event) => {
              const file = event.target.files?.[0]

              if (file) {
                uploadFile(file)
              }
            }}
          />

          {fieldState.error ? (
            <p className="text-xs text-red-500">
              {fieldState.error.message}
            </p>
          ) : null}
        </div>
      )}
    />
  )
}