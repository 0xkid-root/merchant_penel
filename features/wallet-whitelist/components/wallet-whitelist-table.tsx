'use client'

import { useMemo, useState } from 'react'
import {
    Search,
    Filter,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
} from 'lucide-react'

import { SecondaryButton } from '@/components/buttons/secondary-button'
import { walletWhitelistData } from '../data/wallet-whitelist-data'
import WalletWhitelistPagination from './wallet-whitelist-pagination'

export default function WalletWhitelistTable() {

    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = 5 // dummy for now

    const [search, setSearch] = useState('')

    const filteredData = useMemo(() => {
        if (!search) return walletWhitelistData

        return walletWhitelistData.filter((item) =>
            `${item.bankName}
       ${item.accountHolderName}
       ${item.accountNumber}
       ${item.ifscCode}`
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    }, [search])

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-100 text-green-700'

            case 'Pending':
                return 'bg-yellow-100 text-yellow-700'

            case 'Rejected':
                return 'bg-red-100 text-red-700'

            default:
                return 'bg-slate-100 text-slate-600'
        }
    }

    return (
        <div className="rounded-xl border border-slate-200 bg-white">

            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-200 p-6">

                <div className="relative w-[340px]">

                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search bank account..."
                        className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-600"
                    />

                </div>

                <SecondaryButton>
                    <Filter className="h-4 w-4" />
                    Filter
                </SecondaryButton>

            </div>

            {/* Table */}

            <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead>

                        <tr className="border-b border-slate-200 bg-slate-50">

                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Bank Name
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Account Holder
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Account Number
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                IFSC
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Status
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Default
                            </th>

                            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredData.length === 0 ? (
                            <tr>

                                <td
                                    colSpan={7}
                                    className="py-16 text-center text-slate-500"
                                >
                                    No bank accounts found.
                                </td>

                            </tr>
                        ) : (
                            filteredData.map((bank) => (
                                <tr
                                    key={bank.id}
                                    className="border-b border-slate-200 transition hover:bg-slate-50"
                                >

                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        {bank.bankName}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-700">
                                        {bank.accountHolderName}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-700">
                                        {bank.accountNumber}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-indigo-600 font-medium">
                                        {bank.ifscCode}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`rounded-md px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                                bank.status
                                            )}`}
                                        >
                                            {bank.status}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4">

                                        {bank.isDefault ? (
                                            <span className="rounded-md bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                                                Yes
                                            </span>
                                        ) : (
                                            <span className="text-sm text-slate-500">
                                                No
                                            </span>
                                        )}

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <button className="rounded-lg p-2 transition hover:bg-slate-100">

                                            <MoreVertical className="h-4 w-4 text-slate-500" />

                                        </button>

                                    </td>

                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>

            <div className="mt-4 mb-4 p-4 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                    Showing 1 to {filteredData.length} of {filteredData.length} bank accounts
                </p>

                <WalletWhitelistPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>

        </div>
    )
}