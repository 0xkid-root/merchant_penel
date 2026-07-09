'use client'

import {
  CheckCircle2,
  Clock3,
  XCircle,
  MoreVertical,
  Pencil,
  Eye,
  Trash2,
} from 'lucide-react'

import { mockBeneficiaries } from '../data/beneficiary-data'

interface Props {
  currentPage: number
  setCurrentPage: (page: number) => void
}

export default function BeneficiariesTable({
  currentPage,
  setCurrentPage,
}: Props) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="inline-flex whitespace-nowrap items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified
          </span>
        )

      case 'Pending':
        return (
          <span className="inline-flex whitespace-nowrap items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
            <Clock3 className="h-3.5 w-3.5" />
            Pending
          </span>
        )

      default:
        return (
          <span className="inline-flex whitespace-nowrap items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
            <XCircle className="h-3.5 w-3.5" />
            Failed
          </span>
        )
    }
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="min-w-0 overflow-x-auto">
        <table className="w-full min-w-[1050px] border-collapse">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Beneficiary
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Bank
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Account Number
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                IFSC
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Created On
              </th>

              <th className="whitespace-nowrap px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {mockBeneficiaries.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <div className="flex min-w-[180px] items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                      {item.initials}
                    </div>

                    <p className="whitespace-nowrap font-semibold text-slate-900">
                      {item.name}
                    </p>
                  </div>
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                  {item.bankName}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-700">
                  {item.accountNumber}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                  {item.ifscCode}
                </td>

                <td className="px-6 py-4">
                  {getStatusBadge(item.status)}
                </td>

                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {item.createdOn}
                </td>

                <td className="px-6 py-4">
                  <div className="flex min-w-[170px] items-center justify-center gap-1">
                    <button
                      type="button"
                      className="rounded-lg p-2 transition hover:bg-slate-100"
                      aria-label="View beneficiary"
                    >
                      <Eye className="h-4 w-4 text-slate-600" />
                    </button>

                    <button
                      type="button"
                      className="rounded-lg p-2 transition hover:bg-slate-100"
                      aria-label="Edit beneficiary"
                    >
                      <Pencil className="h-4 w-4 text-indigo-600" />
                    </button>

                    <button
                      type="button"
                      className="rounded-lg p-2 transition hover:bg-slate-100"
                      aria-label="Delete beneficiary"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>

                    <button
                      type="button"
                      className="rounded-lg p-2 transition hover:bg-slate-100"
                      aria-label="More actions"
                    >
                      <MoreVertical className="h-4 w-4 text-slate-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}