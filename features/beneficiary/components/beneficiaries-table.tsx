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
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified
          </span>
        )

      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
            <Clock3 className="h-3.5 w-3.5" />
            Pending
          </span>
        )

      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
            <XCircle className="h-3.5 w-3.5" />
            Failed
          </span>
        )
    }
  }
  

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="border-b border-slate-200 bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Beneficiary
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Bank
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Account Number
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                IFSC
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Created On
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
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

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                      {item.initials}
                    </div>

                    <div>

                      <p className="font-semibold text-slate-900">
                        {item.name}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {item.bankName}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                  {item.accountNumber}
                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {item.ifscCode}
                </td>

                <td className="px-6 py-4">
                  {getStatusBadge(item.status)}
                </td>

                <td className="px-6 py-4 text-sm text-slate-500">
                  {item.createdOn}
                </td>

                <td className="px-6 py-4">

                  <div className="flex items-center justify-center gap-2">

                    <button className="rounded-lg p-2 hover:bg-slate-100">
                      <Eye className="h-4 w-4 text-slate-600" />
                    </button>

                    <button className="rounded-lg p-2 hover:bg-slate-100">
                      <Pencil className="h-4 w-4 text-indigo-600" />
                    </button>

                    <button className="rounded-lg p-2 hover:bg-slate-100">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>

                    <button className="rounded-lg p-2 hover:bg-slate-100">
                      <MoreVertical className="h-4 w-4 text-slate-600" />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Pagination */}

      <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">

        <p className="text-sm text-slate-500">
          Showing 1 to {mockBeneficiaries.length} of {mockBeneficiaries.length} beneficiaries
        </p>

        <div className="flex items-center gap-2">

          <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">
            Previous
          </button>

          {[1].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-9 w-9 rounded-lg text-sm font-medium ${
                page === currentPage
                  ? 'bg-indigo-600 text-white'
                  : 'border border-slate-300 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">
            Next
          </button>

        </div>

      </div>

    </div>
  )
}
