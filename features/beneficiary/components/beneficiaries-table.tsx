'use client'

import { useState } from 'react'
import {
  MoreVertical,
  Pencil,
  Eye,
  Trash2,
} from 'lucide-react'

import { BeneficiaryResponse } from '../types/beneficiary.types'

interface Props {
  beneficiaries: {
    content: BeneficiaryResponse[]
  }
  loading: boolean
  onView: (id: number) => void
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  onStatusToggle: (id: number, newStatus: string) => Promise<void>
}

export default function BeneficiariesTable({
  beneficiaries,
  loading,
  onView,
  onEdit,
  onDelete,
  onStatusToggle,
}: Props) {
  const [optimisticStatuses, setOptimisticStatuses] = useState<Record<number, string>>({})
  const [loadingToggles, setLoadingToggles] = useState<Record<number, boolean>>({})

  const handleToggle = async (id: number, currentStatus: string) => {
    // Only allow toggling ACTIVE and INACTIVE
    if (currentStatus !== 'ACTIVE' && currentStatus !== 'INACTIVE') return

    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    
    // Optimistic update
    setOptimisticStatuses((prev) => ({ ...prev, [id]: newStatus }))
    setLoadingToggles((prev) => ({ ...prev, [id]: true }))

    try {
      await onStatusToggle(id, newStatus)
    } catch (error) {
      // Revert on error
      setOptimisticStatuses((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
    } finally {
      setLoadingToggles((prev) => {
        const next = { ...prev }
        delete next[id]
        return next
      })
    }
  }

  const getInitials = (name?: string) => {
    if (!name) return ''
    const parts = name.trim().split(' ')
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const TableHeader = () => (
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
        <th className="whitespace-nowrap px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
          Action
        </th>
      </tr>
    </thead>
  )

  if (loading) {
    return (
      <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="min-w-0 overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse">
            <TableHeader />
            <tbody>
              {Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200 animate-pulse" />
                      <div className="h-4 w-32 bg-slate-200 animate-pulse rounded" />
                    </div>
                  </td>
                  <td className="px-6 py-4"><div className="h-4 w-24 bg-slate-200 animate-pulse rounded" /></td>
                  <td className="px-6 py-4"><div className="h-4 w-24 bg-slate-200 animate-pulse rounded" /></td>
                  <td className="px-6 py-4"><div className="h-4 w-20 bg-slate-200 animate-pulse rounded" /></td>
                  <td className="px-6 py-4"><div className="h-6 w-12 bg-slate-200 animate-pulse rounded-full" /></td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-8 w-8 bg-slate-200 animate-pulse rounded-lg" />
                      <div className="h-8 w-8 bg-slate-200 animate-pulse rounded-lg" />
                      <div className="h-8 w-8 bg-slate-200 animate-pulse rounded-lg" />
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

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="min-w-0 overflow-x-auto">
        <table className="w-full min-w-[1050px] border-collapse">
          <TableHeader />
          <tbody>
            {beneficiaries.content.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  No beneficiaries found
                </td>
              </tr>
            ) : (
              beneficiaries.content.map((item) => {
                const displayStatus = optimisticStatuses[item.id] || item.status
                const isActive = displayStatus === 'ACTIVE'
                const isToggleDisabled = (item.status !== 'ACTIVE' && item.status !== 'INACTIVE') || loadingToggles[item.id]

                return (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex min-w-[180px] items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
                          {getInitials(item.beneficiaryName)}
                        </div>
                        <p className="whitespace-nowrap font-semibold text-slate-900">
                          {item.beneficiaryName}
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
                      <button
                        type="button"
                        onClick={() => handleToggle(item.id, displayStatus)}
                        disabled={isToggleDisabled}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${
                          isActive ? 'bg-green-500' : 'bg-slate-300'
                        }`}
                        role="switch"
                        aria-checked={isActive}
                      >
                        <span className="sr-only">Toggle status</span>
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            isActive ? 'translate-x-2.5' : '-translate-x-2.5'
                          }`}
                        />
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex min-w-[170px] items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => onView(item.id)}
                          className="rounded-lg p-2 transition hover:bg-slate-100"
                          aria-label="View beneficiary"
                        >
                          <Eye className="h-4 w-4 text-slate-600" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onEdit(item.id)}
                          className="rounded-lg p-2 transition hover:bg-slate-100"
                          aria-label="Edit beneficiary"
                        >
                          <Pencil className="h-4 w-4 text-indigo-600" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(item.id)}
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
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
