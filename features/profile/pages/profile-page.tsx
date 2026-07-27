'use client'

import { useState } from 'react'
import { Building2, FileText, Banknote, AlertCircle } from 'lucide-react'

import ProfileTabs from '../components/profile-tabs'
import BusinessProfileTab from '../components/business-profile-tab'
import KYCDocumentsTab from '../components/kyc-documents-tab'
import BankDetailsTab from '../components/bank-details-tab'
import ProfileStatusSidebar from '../components/profile-status-sidebar'
import BankStatusSidebar from '../components/bank-status-sidebar'
import ProfileSkeleton from '../components/ProfileSkeleton'

import { useProfile } from '../hooks/useProfile'
import {
    mapBusinessProfile,
    mapBankDetails,
    mapKycDocuments,
    mapProfileStatus,
} from '../mappers/profileMapper'

const tabs = [
  { id: 'business', label: 'Business Profile', icon: Building2 },
  { id: 'kyc', label: 'KYC Documents', icon: FileText },
  { id: 'bank', label: 'Bank Details', icon: Banknote },
]

const headerContent = {
    business: {
        title: 'Business Information',
        description:
            'View your registered business details. For any changes, please contact your administrator.',
    },
    kyc: {
        title: 'KYC Documents',
        description:
            'View your submitted KYC documents and their verification status.',
    },
    bank: {
        title: 'Bank Details',
        description: 'View your registered bank account details.',
    },
}

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('business')
    const { data: profileResponse, isLoading, isError, refetch } = useProfile()

    const header = headerContent[activeTab as keyof typeof headerContent] ?? headerContent.business

    if (isLoading) {
        return <ProfileSkeleton />
    }

    if (isError || !profileResponse) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center p-6">
                <div className="flex max-w-sm flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Unable to load profile</h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Please try again.
                        </p>
                    </div>
                    <button
                        onClick={() => refetch()}
                        className="mt-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    const businessData = mapBusinessProfile(profileResponse)
    const bankDetailsData = mapBankDetails(profileResponse)
    const kycDocumentsData = mapKycDocuments(profileResponse)
    const profileSidebarData = mapProfileStatus(profileResponse)

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">{header.title}</h1>
                <p className="mt-2 text-sm text-slate-500">{header.description}</p>
            </div>

            <ProfileTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <main className="xl:col-span-8">
                    {activeTab === 'business' && <BusinessProfileTab data={businessData} />}
                    {activeTab === 'kyc' && <KYCDocumentsTab documents={kycDocumentsData} />}
                    {activeTab === 'bank' && <BankDetailsTab data={bankDetailsData} />}
                </main>

                <aside className="xl:col-span-4">
                    {activeTab === 'bank' ? (
                        <BankStatusSidebar data={bankDetailsData} />
                    ) : (
                        <ProfileStatusSidebar data={profileSidebarData} />
                    )}
                </aside>
            </div>
        </div>
    )
}
