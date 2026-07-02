'use client'

import { useState } from 'react'
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  Globe,
  FileText,
  MapPinIcon,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Eye,
  CreditCard,
  Lock,
  Copy,
  History,
} from 'lucide-react'

import { kycDocuments, mockData, bankDetailsData,tabs } from '@/features/profile/data/profile-data'
import { BankDetails, BusinessData, KYCDocument } from '../types/profile'



export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('business')

  const getHeaderContent = () => {
    switch (activeTab) {
      case 'kyc':
        return {
          title: 'KYC Documents',
          description: 'View your submitted KYC documents and their verification status.',
        }
      case 'bank':
        return {
          title: 'Bank Details',
          description: 'View your registered bank account details.',
        }
      case 'password':
        return {
          title: 'Change Password',
          description: 'Update your account password for enhanced security.',
        }
      case 'api':
        return {
          title: 'API Credentials',
          description: 'Manage your API keys and credentials.',
        }
      default:
        return {
          title: 'Business Information',
          description: 'View your registered business details. For any changes, please contact your administrator.',
        }
    }
  }

  const header = getHeaderContent()

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{header.title}</h1>
        <p className="text-gray-600 mt-2">{header.description}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-1 py-3 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Left Column - Tab Content */}
        <div className="flex-1">
          {activeTab === 'kyc' && <KYCDocumentsTab documents={kycDocuments} />}
          {activeTab === 'business' && <BusinessProfileTab data={mockData} />}
          {activeTab === 'bank' && <BankDetailsTab data={bankDetailsData} />}
        </div>

        {/* Right Sidebar */}
        <div className="w-96 flex-shrink-0">
          {activeTab === 'bank' && <BankStatusSidebar data={bankDetailsData} />}
          {(activeTab === 'business' || activeTab === 'kyc') && (
            <>
          {/* Status Card */}
          <div className="bg-white rounded-lg border border-green-200 p-6 space-y-4 sticky top-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Business Profile Status</p>
                <span className="text-xs font-medium text-green-600">Verified</span>
              </div>
            </div>

            <p className="text-sm text-gray-600">Your business profile has been verified and approved.</p>

            {/* Status Details */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">Verified On</p>
                  <p className="text-sm text-foreground">{mockData.verifiedOn}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">Verified By</p>
                  <p className="text-sm text-foreground">{mockData.verifiedBy}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1">Remarks</p>
                  <p className="text-sm text-foreground">{mockData.remarks}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="mt-6 bg-blue-50 rounded-lg border border-blue-200 p-6 space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground text-sm mb-2">Need to update your information?</p>
                <p className="text-sm text-gray-600 mb-4">
                  If there are any changes to your business information, please contact our support team.
                </p>
                <a
                  href="#"
                  className="text-blue-600 text-sm font-semibold hover:text-blue-700 inline-flex items-center gap-1"
                >
                  Contact Support
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Bank Status Sidebar Component
function BankStatusSidebar({ data }: { data: BankDetails }) {
  return (
    <div className="space-y-6">
      {/* Account Status Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4 sticky top-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Account Status</h3>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
            {data.status}
          </span>
        </div>

        <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">Verified Account</p>
            <p className="text-sm text-gray-600">Your settlement bank account has been verified and is active.</p>
          </div>
        </div>

        {/* Verification Details */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Verified On</p>
              <p className="text-sm text-foreground">{data.verifiedOn}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Verified By</p>
              <p className="text-sm text-foreground">{data.verifiedBy}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">Remarks</p>
              <p className="text-sm text-foreground">{data.remarks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Change Bank Account Card */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 space-y-4">
        <p className="font-semibold text-foreground text-sm mb-3">Need to change bank account?</p>
        <p className="text-sm text-gray-600 mb-4">
          You can request for a change. Our team will review and get back to you.
        </p>
        <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-blue-600 text-blue-600 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors">
          <CreditCard className="w-4 h-4" />
          Request Change
        </button>
      </div>
    </div>
  )
}

// KYC Documents Tab Component
function KYCDocumentsTab({ documents }: { documents: KYCDocument[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground mb-6">KYC Documents</h2>

      {/* Documents Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Document
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Uploaded On
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, idx) => (
              <tr key={doc.id} className={idx !== documents.length - 1 ? 'border-b border-gray-100' : ''}>
                {/* Document Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${doc.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <doc.icon className={`w-5 h-5 ${doc.iconColor}`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </div>
                  </div>
                </td>

                {/* Status Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">{doc.status}</span>
                  </div>
                </td>

                {/* Uploaded On Column */}
                <td className="px-6 py-4">
                  <p className="text-sm text-foreground">{doc.uploadedOn}</p>
                </td>

                {/* Action Column */}
                <td className="px-6 py-4">
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-900 mb-1">All your KYC documents have been verified.</p>
          <p className="text-sm text-blue-800">
            If you need to update any document, please contact support. Our team will review your request.
          </p>
        </div>
      </div>
    </div>
  )
}

// Bank Details Tab Component
function BankDetailsTab({ data }: { data: BankDetails }) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Settlement Bank Account</h2>
        <p className="text-gray-600 text-sm">
          This is your primary settlement account. Payouts from our platform will be settled to this bank account.
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          To change your settlement bank account, please raise a request. Our team will review and verify the details before approval.
        </p>
      </div>

      {/* Bank Details Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        {/* Account Holder */}
        <div className="flex items-center gap-4 py-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">Account Holder</p>
            <p className="text-foreground font-medium">{data.accountHolder}</p>
          </div>
        </div>

        {/* Company Name */}
        <div className="flex items-center gap-4 py-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">Company Name</p>
            <p className="text-foreground font-medium">{data.companyName}</p>
          </div>
        </div>

        {/* Account Number */}
        <div className="flex items-center gap-4 py-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">Account Number</p>
            <p className="text-foreground font-medium">{data.accountNumber}</p>
          </div>
          <button
            onClick={() => handleCopy(data.accountNumber)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Copy account number"
          >
            <Copy className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* IFSC Code */}
        <div className="flex items-center gap-4 py-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">IFSC Code</p>
            <p className="text-foreground font-medium">{data.ifscCode}</p>
          </div>
          <button
            onClick={() => handleCopy(data.ifscCode)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Copy IFSC code"
          >
            <Copy className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Bank Name */}
        <div className="flex items-center gap-4 py-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">Bank Name</p>
            <p className="text-foreground font-medium">{data.bankName}</p>
          </div>
        </div>

        {/* Branch */}
        <div className="flex items-center gap-4 py-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">Branch</p>
            <p className="text-foreground font-medium">{data.branch}</p>
          </div>
        </div>

        {/* Account Type */}
        <div className="flex items-center gap-4 py-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">Account Type</p>
            <p className="text-foreground font-medium">{data.accountType}</p>
          </div>
        </div>
      </div>

      {/* Important Warning Box */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-yellow-900 mb-2">Important</p>
          <p className="text-sm text-yellow-800 mb-4">
            Settlement bank account can only be changed with admin approval. Please ensure the new bank account details are correct and under the same entity.
          </p>
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <History className="w-4 h-4" />
            View Change Request History
          </button>
        </div>
      </div>
    </div>
  )
}

// Business Profile Tab Component
function BusinessProfileTab({ data }: { data: BusinessData }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground mb-6">Business Information</h2>

      {/* Company Name */}
      <div className="flex items-start gap-4 py-4 border-b border-gray-100">
        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
          <Building2 className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">Company Name</p>
          <p className="text-foreground font-medium">{data.companyName}</p>
        </div>
      </div>

      {/* Business Type */}
      <div className="flex items-start gap-4 py-4 border-b border-gray-100">
        <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
          <Building2 className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">Business Type</p>
          <p className="text-foreground font-medium">{data.businessType}</p>
        </div>
      </div>

      {/* GST Number */}
      <div className="flex items-start gap-4 py-4 border-b border-gray-100">
        <div className="w-8 h-8 bg-emerald-100 rounded flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">GST Number</p>
          <p className="text-foreground font-medium">{data.gstNumber}</p>
        </div>
      </div>

      {/* PAN Number */}
      <div className="flex items-start gap-4 py-4 border-b border-gray-100">
        <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-orange-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">PAN Number</p>
          <p className="text-foreground font-medium">{data.panNumber}</p>
        </div>
      </div>

      {/* Email Address */}
      <div className="flex items-start gap-4 py-4 border-b border-gray-100">
        <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">Email Address</p>
          <p className="text-foreground font-medium">{data.emailAddress}</p>
        </div>
      </div>

      {/* Mobile Number */}
      <div className="flex items-start gap-4 py-4 border-b border-gray-100">
        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
          <Phone className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">Mobile Number</p>
          <p className="text-foreground font-medium">{data.mobileNumber}</p>
        </div>
      </div>

      {/* Website */}
      <div className="flex items-start gap-4 py-4 border-b border-gray-100">
        <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
          <Globe className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">Website</p>
          <p className="text-foreground font-medium">{data.website}</p>
        </div>
      </div>

      {/* Registered Address */}
      <div className="flex items-start gap-4 py-4 border-b border-gray-100">
        <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
          <MapPin className="w-5 h-5 text-red-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">Registered Address</p>
          <p className="text-foreground font-medium">{data.registeredAddress}</p>
        </div>
      </div>

      {/* City, State, Pincode */}
      <div className="grid grid-cols-3 gap-6 py-4">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
            <MapPinIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">City</p>
            <p className="text-foreground font-medium">{data.city}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">State</p>
            <p className="text-foreground font-medium">{data.state}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">Pincode</p>
            <p className="text-foreground font-medium">{data.pincode}</p>
          </div>
        </div>
      </div>

      {/* Logo Upload Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-50 rounded-lg border border-gray-200 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Demo Pvt. Ltd.</p>
            <p className="text-sm text-gray-600">PNG • Max size 2MB</p>
          </div>
        </div>
      </div>
    </div>
  )
}
