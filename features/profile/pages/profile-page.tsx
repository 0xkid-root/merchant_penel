'use client'

import { useState } from 'react'

import ProfileTabs from '../components/profile-tabs'
import BusinessProfileTab from '../components/business-profile-tab'
import KYCDocumentsTab from '../components/kyc-documents-tab'
import BankDetailsTab from '../components/bank-details-tab'
import ProfileStatusSidebar from '../components/profile-status-sidebar'
import BankStatusSidebar from '../components/bank-status-sidebar'

import {
    bankDetailsData,
    kycDocuments,
    mockData,
    tabs,
} from '../data/profile-data'

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('business')

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

    const header =
        headerContent[activeTab as keyof typeof headerContent] ??
        headerContent.business

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">
                    {header.title}
                </h1>


                <p className="mt-2 text-sm text-slate-500">
                    {header.description}
                </p>
            </div>

            <ProfileTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <main className="xl:col-span-8">
                    {activeTab === 'business' && (
                        <BusinessProfileTab data={mockData} />
                    )}

                    {activeTab === 'kyc' && (
                        <KYCDocumentsTab documents={kycDocuments} />
                    )}

                    {activeTab === 'bank' && (
                        <BankDetailsTab data={bankDetailsData} />
                    )}
                </main>

                <aside className="xl:col-span-4">
                    {activeTab === 'bank' ? (
                        <BankStatusSidebar data={bankDetailsData} />
                    ) : (
                        <ProfileStatusSidebar data={mockData} />
                    )}
                </aside>
            </div>
        </div>


    )
}
