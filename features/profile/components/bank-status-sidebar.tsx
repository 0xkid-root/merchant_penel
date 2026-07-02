import {
    CheckCircle2,
    CreditCard,
} from 'lucide-react'

import type { BankDetails } from '../types/profile'

interface BankStatusSidebarProps {
    data: BankDetails
}

export default function BankStatusSidebar({
    data,
}: BankStatusSidebarProps) {
    return (
        <div className="space-y-6 xl:sticky xl:top-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-slate-900">
                        Account Status </h3>

                    <span className="rounded-md bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                        {data.status}
                    </span>
                </div>

                <div className="flex items-start gap-3 border-b border-slate-200 pb-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>

                    <div>
                        <p className="font-semibold text-slate-900">
                            Verified Account
                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                            Your settlement bank account has been verified and is active.
                        </p>
                    </div>
                </div>

                <div className="mt-5 space-y-4">
                    <VerificationDetail
                        label="Verified On"
                        value={data.verifiedOn}
                    />

                    <VerificationDetail
                        label="Verified By"
                        value={data.verifiedBy}
                    />

                    <VerificationDetail
                        label="Remarks"
                        value={data.remarks}
                    />
                </div>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
                <h3 className="text-sm font-semibold text-slate-900">
                    Need to change bank account?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                    You can request a change. Our team will review and get back to you.
                </p>

                <button
                    type="button"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-600 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                >
                    <CreditCard className="h-4 w-4" />
                    Request Change
                </button>
            </div>
        </div>


    )
}

function VerificationDetail({
    label,
    value,
}: {
    label: string
    value: string
}) {
    return (<div className="flex items-start gap-3"> <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />


        <div>
            <p className="text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
                {value}
            </p>
        </div>
    </div>


    )
}
