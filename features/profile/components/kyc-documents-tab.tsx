import { AlertCircle, Eye } from 'lucide-react'

import type { KYCDocument } from '../types/profile'

interface KYCDocumentsTabProps {
    documents: KYCDocument[]
}

export default function KYCDocumentsTab({
    documents,
}: KYCDocumentsTabProps) {
    return (

        <div className="space-y-5"> <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
                <h2 className="text-xl font-semibold text-slate-900">
                    KYC Documents 
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    View your submitted documents and verification status.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Document
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Status
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Uploaded On
                            </th>

                            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {documents.map((document, index) => {
                            const Icon = document.icon
                            const isLastRow = index === documents.length - 1

                            return (
                                <tr
                                    key={document.id}
                                    className={`transition hover:bg-slate-50 ${!isLastRow ? 'border-b border-slate-200' : ''
                                        }`}
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${document.iconBg}`}
                                            >
                                                <Icon className={`h-5 w-5 ${document.iconColor}`} />
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {document.name}
                                                </p>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    {document.description}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-2 rounded-md bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                            {document.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        {document.uploadedOn}
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
                                        >
                                            <Eye className="h-4 w-4" />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>

            <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                <div>
                    <p className="text-sm font-semibold text-blue-900">
                        All your KYC documents have been verified.
                    </p>

                    <p className="mt-1 text-sm text-blue-800">
                        If you need to update any document, please contact support. Our
                        team will review your request.
                    </p>
                </div>
            </div>
        </div>


    )
}
