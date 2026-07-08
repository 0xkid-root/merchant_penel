import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    FileText,
    Mail,
} from 'lucide-react'

import type { BusinessData } from '../types/profile'

interface ProfileStatusSidebarProps {
    data: BusinessData
}

export default function ProfileStatusSidebar({
    data,
}: ProfileStatusSidebarProps) {
    return (
        <div className="space-y-6 xl:sticky xl:top-6">
            <div className="rounded-2xl border border-green-200 bg-white p-6">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>

                    <div>
                        <p className="font-semibold text-slate-900">
                            Business Profile Status
                        </p>

                        <span className="mt-1 inline-flex rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                            Verified
                        </span>
                    </div>
                </div>

                <p className="text-sm leading-6 text-slate-500">
                    Your business profile has been verified and approved.
                </p>

                <div className="mt-5 space-y-4 border-t border-slate-200 pt-5">
                    <StatusDetail
                        icon={FileText}
                        label="Verified On"
                        value={data.verifiedOn}
                    />

                    <StatusDetail
                        icon={Mail}
                        label="Verified By"
                        value={data.verifiedBy}
                    />

                    <StatusDetail
                        icon={CheckCircle2}
                        iconClassName="text-green-600"
                        label="Remarks"
                        value={data.remarks}
                    />
                </div>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
                <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                    <div>
                        <p className="text-sm font-semibold text-slate-900">
                            Need to update your information?
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            If there are any changes to your business information, please
                            contact our support team.
                        </p>

                        <button
                            type="button"
                            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                        >
                            Contact Support
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}

function StatusDetail({
    icon: Icon,
    iconClassName = 'text-slate-400',
    label,
    value,
}: {
    icon: React.ElementType
    iconClassName?: string
    label: string
    value: string
}) {
    return (<div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${iconClassName}`} />


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
