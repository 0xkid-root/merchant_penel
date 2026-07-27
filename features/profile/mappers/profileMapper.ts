import { FileText } from 'lucide-react'
import { BusinessData, BankDetails, KYCDocument, ProfileSidebarData } from '../types/profile'
import { MerchantProfileResponse } from '../types/profile.types'
import { formatDate } from '@/lib/utils/dateFormatter'

export function mapUserStatus(status: string | null | undefined): 'Active' | 'Inactive' {
  if (status?.toUpperCase() === 'ACTIVE') return 'Active'
  if (status?.toUpperCase() === 'INACTIVE') return 'Inactive'
  return 'Active' // Default fallback
}

export function mapVerificationStatus(status: string | null | undefined): 'Verified' | 'Pending' | 'Rejected' {
  if (status?.toUpperCase() === 'APPROVED') return 'Verified'
  if (status?.toUpperCase() === 'REJECTED') return 'Rejected'
  return 'Pending' // Default fallback
}

export function mapBusinessProfile(response: MerchantProfileResponse): BusinessData {
  return {
    companyName: response.businessProfile.businessName,
    businessType: response.businessProfile.businessType,
    gstNumber: response.businessProfile.companyGstin || 'Not Available',
    panNumber: response.businessProfile.businessPan || 'Not Available',
    website: response.businessProfile.websiteUrl || 'Not Available',
    emailAddress: response.basicDetails.email,
    mobileNumber: response.basicDetails.mobile || 'Not Available',
    registeredAddress: response.address?.regAddress?.addressLine || 'Not Available',
    city: response.address?.regAddress?.city || 'Not Available',
    state: response.address?.regAddress?.state || 'Not Available',
    pincode: response.address?.regAddress?.pinCode || 'Not Available',
    // TODO:
    // Replace when backend exposes this field.
    verifiedOn: '-',
    // TODO:
    // Replace when backend exposes this field.
    verifiedBy: '-',
    // TODO:
    // Replace when backend exposes this field.
    remarks: '-',
  }
}

export function mapBankDetails(response: MerchantProfileResponse): BankDetails {
  return {
    accountHolder: response.bankDetails.accountHolderName || 'Not Available',
    companyName: response.businessProfile.businessName,
    accountNumber: response.bankDetails.accountNumber,
    bankName: response.bankDetails.bankName,
    ifscCode: response.bankDetails.ifscCode,
    // TODO:
    // Replace when backend exposes this field.
    branch: 'Not Available',
    // TODO:
    // Replace when backend exposes this field.
    accountType: 'Current Account',
    status: mapUserStatus(response.merchantStatus.userStatus),
    // TODO:
    // Replace when backend exposes this field.
    verifiedOn: '-',
    // TODO:
    // Replace when backend exposes this field.
    verifiedBy: '-',
    // TODO:
    // Replace when backend exposes this field.
    remarks: '-',
  }
}

export function mapKycDocuments(response: MerchantProfileResponse): KYCDocument[] {
  return response.merchantVerifications.map((doc, index) => ({
    id: String(index + 1),
    name: doc.fieldName,
    description: doc.section,
    status: mapVerificationStatus(doc.status),
    uploadedOn: formatDate(doc.reviewedAt),
    icon: FileText,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  }))
}

export function mapProfileStatus(response: MerchantProfileResponse): ProfileSidebarData {
  const businessData = mapBusinessProfile(response)
  
  return {
    ...businessData,
    status: response.merchantStatus.userStatus,
    stage: response.merchantStatus.stage,
  }
}
