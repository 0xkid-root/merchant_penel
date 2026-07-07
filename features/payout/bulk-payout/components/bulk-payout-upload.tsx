
'use client'

import { useRef, useState } from 'react'
import {
  ArrowRight,
  FileSpreadsheet,
  UploadCloud,
} from 'lucide-react'
import { toast } from 'sonner'

import {
  BulkPayoutFormValues,
  BulkPayoutRecord,
} from './bulk-payout-create-page'

interface BulkPayoutUploadProps {
  values: BulkPayoutFormValues
  onContinue: (values: BulkPayoutFormValues) => void
}

const DEMO_RECORDS: BulkPayoutRecord[] = [
  {
    id: 1,
    beneficiaryName: 'Amit Sharma',
    accountNumber: 'XXXXXX1245',
    ifscCode: 'HDFC0001234',
    amount: 15000,
    remarks: 'Vendor payment',
    status: 'valid',
  },
  {
    id: 2,
    beneficiaryName: 'Priya Verma',
    accountNumber: 'XXXXXX7821',
    ifscCode: 'SBIN0004567',
    amount: 22000,
    remarks: 'Service payment',
    status: 'valid',
  },
  {
    id: 3,
    beneficiaryName: 'Rahul Singh',
    accountNumber: 'XXXXXX4509',
    ifscCode: 'ICIC0000789',
    amount: 18500,
    remarks: 'Commission payment',
    status: 'valid',
  },
  {
    id: 4,
    beneficiaryName: 'Neha Gupta',
    accountNumber: 'XXXXXX9988',
    ifscCode: 'INVALID0001',
    amount: 12000,
    remarks: 'Partner payment',
    status: 'invalid',
    errorMessage: 'Invalid IFSC code',
  },
]

export default function BulkPayoutUpload({
  values,
  onContinue,
}: BulkPayoutUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [batchName, setBatchName] = useState(values.batchName)
  const [fileName, setFileName] = useState(values.fileName)

  const handleFileSelect = (file?: File) => {
    if (!file) return

    const isCsv =
      file.name.toLowerCase().endsWith('.csv') ||
      file.type === 'text/csv'

    if (!isCsv) {
      toast.error('Please upload a CSV file')
      return
    }

    setFileName(file.name)
    toast.success('Payout file selected successfully')
  }

  const handleContinue = () => {
    if (!batchName.trim()) {
      toast.error('Please enter a batch name')
      return
    }

    if (!fileName) {
      toast.error('Please upload a CSV file')
      return
    }

    const totalAmount = DEMO_RECORDS.reduce(
      (total, record) => total + record.amount,
      0,
    )

    const validRecords = DEMO_RECORDS.filter(
      (record) => record.status === 'valid',
    ).length

    const invalidRecords = DEMO_RECORDS.filter(
      (record) => record.status === 'invalid',
    ).length

    onContinue({
      batchName: batchName.trim(),
      fileName,
      records: DEMO_RECORDS,
      totalAmount,
      validRecords,
      invalidRecords,
    })
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
              Upload a CSV file containing beneficiary bank account payout details.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-5 py-6 lg:px-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Batch Name
          </label>

          <input
            value={batchName}
            onChange={(event) => setBatchName(event.target.value)}
            placeholder="Example: July Vendor Payout"
            className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Payout CSV File
          </label>

          <input
            ref={inputRef}
            type="file"
            accept=".csv,text/csv"
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
              {fileName || 'Choose CSV file'}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              CSV format only
            </p>
          </button>
        </div>

        {fileName ? (
          <div className="flex items-center gap-3 border-t border-slate-200 pt-5">
            <FileSpreadsheet className="h-5 w-5 text-emerald-600" />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">
                {fileName}
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
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Validate File
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}