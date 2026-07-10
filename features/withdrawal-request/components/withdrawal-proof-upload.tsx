'use client'

import { Controller, Control } from 'react-hook-form'
import { Upload, FileText } from 'lucide-react'
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
          <div className="flex flex-wrap items-center gap-1">
            <label className="text-sm font-medium text-slate-900">
              Upload Supporting Document
            </label>
            <span className="text-xs text-slate-500">(Optional)</span>
          </div>

          <label
            htmlFor="withdrawal-proof"
            className={`flex min-h-16 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition sm:px-6 ${
              fieldState.error
                ? 'border-red-400 bg-red-50'
                : 'border-slate-300 bg-slate-50/50 hover:border-indigo-500 hover:bg-indigo-50/30'
            }`}
          >
            {fileName ? (
              <>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>

                <p className="max-w-full break-all text-sm font-semibold text-slate-800">
                  {fileName}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Click to replace this document
                </p>
              </>
            ) : (
              <>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                  <Upload className="h-5 w-5 text-slate-500" />
                </div>

                <p className="text-sm font-medium text-slate-700">
                  Click to upload supporting document
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  JPG, PNG or PDF · Maximum 5 MB
                </p>
              </>
            )}
          </label>

          <input
            id="withdrawal-proof"
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => uploadFile(e.target.files)}
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