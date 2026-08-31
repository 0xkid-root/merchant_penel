
'use client'

import { useRef, useState } from 'react'
import { AlertCircle, ArrowRight, FileSpreadsheet, UploadCloud } from 'lucide-react'
import { toast } from 'sonner'

interface BulkPayoutUploadProps {
  file: File | null
  onContinue: (file: File) => void
  error?: string | null
}

export default function BulkPayoutUpload({
  file,
  onContinue,
  error,
}: BulkPayoutUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [selectedFile, setSelectedFile] = useState<File | null>(file)



  const handleFileSelect = (file?: File) => {
    if (!file) return

    const isExcel =
      file.name.toLowerCase().endsWith('.xlsx') ||
      file.name.toLowerCase().endsWith('.xls') ||
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.type === 'application/vnd.ms-excel'

    if (!isExcel) {
      toast.error('Please upload a valid Excel file (.xlsx or .xls)')
      return
    }

    setSelectedFile(file)
    toast.success('Payout file selected successfully')
  }

  const handleContinue = () => {
    if (!selectedFile) {
      toast.error('Please upload an Excel file')
      return
    }
    onContinue(selectedFile)
  }

  return (
    <div className="overflow-hidden  bg-white">
      <div className="border-b border-slate-200 px-5 py-5 lg:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
            <FileSpreadsheet className="h-5 w-5 text-indigo-600" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Upload Bulk Payout File
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload an Excel file (.xlsx, .xls) containing beneficiary bank account payout details.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-5 py-6 lg:px-6">
        {error ? (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        ) : null}


        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Payout Excel File
          </label>

          <input
            ref={inputRef}
            type="file"
            accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            className="hidden"
            onChange={(event) => handleFileSelect(event.target.files?.[0])}
          />

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex min-h-40 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
              <UploadCloud className="h-5 w-5 text-indigo-600" />
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-900">
              {selectedFile ? selectedFile.name : 'Choose Excel file'}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Excel format (.xlsx, .xls) only
            </p>
          </button>
        </div>

        {selectedFile ? (
          <div className="flex items-center gap-3 border-t border-slate-200 pt-5">
            <FileSpreadsheet className="h-5 w-5 text-emerald-600" />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {selectedFile.name}
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                File ready for validation
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex justify-end  px-5 py-4 lg:px-6">
        <button
          type="button"
          onClick={handleContinue}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
        >
          Validate File
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}