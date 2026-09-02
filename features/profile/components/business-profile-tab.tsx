import {
    Building2,
    FileText,
    Globe,
    Mail,
    MapPin,
    MapPinIcon,
    Phone,
    AlertCircle,
} from 'lucide-react'

import type { BusinessData } from '../types/profile'

interface BusinessProfileTabProps {
    data: BusinessData
}

export default function BusinessProfileTab({
    data,
}: BusinessProfileTabProps) {
    return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6"> 
    <div className="mb-6"> <h2 className="text-xl font-semibold text-slate-900">
        Business Information </h2>

        <p className="mt-1 text-sm text-slate-500">
            Your registered business details.
        </p>
    </div>

        <div className="divide-y divide-slate-100">
            <InfoRow
                icon={Building2}
                iconClassName="bg-indigo-50 text-indigo-600"
                label="Company Name"
                value={data.companyName}
            />

            <InfoRow
                icon={Building2}
                iconClassName="bg-emerald-50 text-emerald-600"
                label="Business Type"
                value={data.businessType}
            />

            <InfoRow
                icon={FileText}
                iconClassName="bg-blue-50 text-blue-600"
                label="GST Number"
                value={data.gstNumber}
            />

            <InfoRow
                icon={FileText}
                iconClassName="bg-amber-50 text-amber-600"
                label="PAN Number"
                value={data.panNumber}
            />

            <InfoRow
                icon={Building2}
                iconClassName="bg-pink-50 text-pink-600"
                label="CIN Number"
                value={data.cinNumber}
            />

            <InfoRow
                icon={Mail}
                iconClassName="bg-violet-50 text-violet-600"
                label="Email Address"
                value={data.emailAddress}
            />

            <InfoRow
                icon={Phone}
                iconClassName="bg-sky-50 text-sky-600"
                label="Mobile Number"
                value={data.mobileNumber}
            />

            <InfoRow
                icon={Globe}
                iconClassName="bg-green-50 text-green-600"
                label="Website"
                value={data.website || 'Not provided'}
            />

            <InfoRow
                icon={MapPin}
                iconClassName="bg-rose-50 text-rose-600"
                label="Registered Address"
                value={data.registeredAddress}
            />
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
            <SmallInfo
                icon={MapPinIcon}
                iconClassName="bg-blue-50 text-blue-600"
                label="City"
                value={data.city}
            />

            <SmallInfo
                icon={AlertCircle}
                iconClassName="bg-violet-50 text-violet-600"
                label="State"
                value={data.state}
            />

            <SmallInfo
                icon={MapPin}
                iconClassName="bg-amber-50 text-amber-600"
                label="Pincode"
                value={data.pincode}
            />
        </div>

        <div className="mt-6 flex items-center gap-4 border-t border-slate-200 pt-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-indigo-50">
                <Building2 className="h-7 w-7 text-indigo-600" />
            </div>

            <div>
                <p className="font-semibold text-slate-900">
                    {data.companyName}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                    Business logo
                </p>
            </div>
        </div>

        {data.businessOwners && data.businessOwners.length > 0 && (
            <div className="mt-8 border-t border-slate-200 pt-8">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                    Business Owners
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {data.businessOwners.map((owner, index) => (
                        <div key={index} className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-slate-50 p-4">
                            <p className="font-semibold text-slate-900">{owner.fullName || 'Not Available'}</p>
                            <p className="text-xs text-slate-500">{owner.designation || 'Owner'}</p>
                            
                            <div className="mt-2 flex flex-col gap-1 text-sm text-slate-600">
                                {owner.emailId && (
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-slate-400" />
                                        <span>{owner.emailId}</span>
                                    </div>
                                )}
                                {owner.mobileNumber && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-slate-400" />
                                        <span>{owner.mobileNumber}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>

    )
}

function InfoRow({
    icon: Icon,
    iconClassName,
    label,
    value,
}: {
    icon: React.ElementType
    iconClassName: string
    label: string
    value: string
}) {
    return (<div className="flex items-start gap-4 py-4">
        <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
        > <Icon className="h-5 w-5" /> </div>


        <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-1 break-words text-sm font-medium text-slate-900">
                {value}
            </p>
        </div>
    </div>


    )
}

function SmallInfo({
    icon: Icon,
    iconClassName,
    label,
    value,
}: {
    icon: React.ElementType
    iconClassName: string
    label: string
    value: string
}) {
    return (<div className="flex items-start gap-3">
        <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
        > <Icon className="h-4 w-4" /> </div>


        <div>
            <p className="text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
                {value}
            </p>
        </div>
    </div>

    )
}
