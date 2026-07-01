
'use client'

import { Controller, Control } from 'react-hook-form'
import { Upload } from 'lucide-react'
import { WithdrawalSchema } from '../schema/withdrawal.schema'

interface Props {
  control: Control<WithdrawalSchema>
  uploadFile: (files: FileList | null) => void
  fileName: string
}

export default function WithdrawalProofUpload({
  control,
  uploadFile,
  fileName,
}: Props) {
  return (
    <Controller
      name="document"
      control={control}
      render={({ fieldState }) => (
        <div className="space-y-2">

          <label className="text-sm font-medium text-slate-900">
            Upload Supporting Document
          </label>

          <label
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition ${
              fieldState.error
                ? 'border-red-500'
                : 'border-slate-300 hover:border-indigo-500'
            }`}
          >

            <Upload className="mb-3 h-8 w-8 text-slate-400" />

            <p className="text-sm font-medium text-slate-700">
              Click to Upload
            </p>

            <p className="mt-1 text-xs text-slate-500">
              JPG, PNG, PDF (Max 5MB)
            </p>

            {fileName && (
              <p className="mt-3 text-sm font-semibold text-indigo-600">
                {fileName}
              </p>
            )}

            <input
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => uploadFile(e.target.files)}
            />

          </label>

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
