'use client'

import {
    AlertCircle,
    Building2,
    Copy,
    CreditCard,
    History,
    MapPin,
} from 'lucide-react'

import type { BankDetails } from '../types/profile'

interface BankDetailsTabProps {
    data: BankDetails
}

export default function BankDetailsTab({
    data,
}: BankDetailsTabProps) {
    const handleCopy = async (text: string) => {
        await navigator.clipboard.writeText(text)
    }

    return (
        <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Settlement Bank Account
                    </h2>


                    <p className="mt-1 text-sm text-slate-500">
                        This is your primary settlement account. Payouts from our platform
                        will be settled to this bank account.
                    </p>
                </div>

            

                <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 px-5">
                    <BankInfoRow
                        icon={Building2}
                        iconClassName="bg-indigo-50 text-indigo-600"
                        label="Account Holder"
                        value={data.accountHolder}
                    />

                    <BankInfoRow
                        icon={Building2}
                        iconClassName="bg-violet-50 text-violet-600"
                        label="Company Name"
                        value={data.companyName}
                    />

                    <BankInfoRow
                        icon={CreditCard}
                        iconClassName="bg-blue-50 text-blue-600"
                        label="Account Number"
                        value={data.accountNumber}
                        copyValue={data.accountNumber}
                        onCopy={handleCopy}
                    />

                    <BankInfoRow
                        icon={Building2}
                        iconClassName="bg-emerald-50 text-emerald-600"
                        label="IFSC Code"
                        value={data.ifscCode}
                        copyValue={data.ifscCode}
                        onCopy={handleCopy}
                    />

                    <BankInfoRow
                        icon={Building2}
                        iconClassName="bg-indigo-50 text-indigo-600"
                        label="Bank Name"
                        value={data.bankName}
                    />

                    <BankInfoRow
                        icon={MapPin}
                        iconClassName="bg-amber-50 text-amber-600"
                        label="Branch"
                        value={data.branch}
                    />

                    <BankInfoRow
                        icon={CreditCard}
                        iconClassName="bg-sky-50 text-sky-600"
                        label="Account Type"
                        value={data.accountType}
                    />
                </div>
            </div>

            <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50  p-5">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-slate-900" />

                <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                        Important
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                        Settlement bank account can only be changed with admin approval.
                        Please ensure the new bank account details are correct and under the
                        same entity.
                    </p>

                    <button
                        type="button"
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-indigo-600 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-indigo-100"
                    >
                        <History className="h-4 w-4" />
                        View Change Request History
                    </button>
                </div>
            </div>
        </div>


    )
}

function BankInfoRow({
    icon: Icon,
    iconClassName,
    label,
    value,
    copyValue,
    onCopy,
}: {
    icon: React.ElementType
    iconClassName: string
    label: string
    value: string
    copyValue?: string
    onCopy?: (value: string) => void
}) {
    return (<div className="flex items-center gap-4 py-4">
        <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
        > <Icon className="h-5 w-5" /> </div>


        <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-1 break-all text-sm font-semibold text-slate-900">
                {value}
            </p>
        </div>

        {copyValue && onCopy && (
            <button
                type="button"
                onClick={() => onCopy(copyValue)}
                title={`Copy ${label}`}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
            >
                <Copy className="h-4 w-4" />
            </button>
        )}
    </div>


    )
}
