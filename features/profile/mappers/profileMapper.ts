import { FileText } from 'lucide-react'
import { BusinessData, BankDetails, KYCDocument, ProfileSidebarData } from '../types/profile'
import { MerchantProfileResponse } from '../types/profile.types'
import { formatDate } from '@/lib/utils/dateFormatter'

const NOT_AVAILABLE = "Not Available";
const NOT_VERIFIED = "-";

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
    companyName: response.businessProfile?.businessName ?? NOT_AVAILABLE,
    businessType: response.businessProfile?.businessType ?? NOT_AVAILABLE,
    gstNumber: response.businessProfile?.companyGstin ?? NOT_AVAILABLE,
    panNumber: response.businessProfile?.businessPan ?? NOT_AVAILABLE,
    website: response.businessProfile?.websiteUrl ?? NOT_AVAILABLE,
    emailAddress: response.basicDetails?.email ?? NOT_AVAILABLE,
    mobileNumber: response.basicDetails?.mobile ?? NOT_AVAILABLE,
    registeredAddress: response.address?.regAddress?.addressLine ?? NOT_AVAILABLE,
    city: response.address?.regAddress?.city ?? NOT_AVAILABLE,
    state: response.address?.regAddress?.state ?? NOT_AVAILABLE,
    pincode: response.address?.regAddress?.pinCode ?? NOT_AVAILABLE,
    // TODO:
    // Replace when backend exposes this field.
    verifiedOn: NOT_VERIFIED,
    // TODO:
    // Replace when backend exposes this field.
    verifiedBy: NOT_VERIFIED,
    // TODO:
    // Replace when backend exposes this field.
    remarks: NOT_VERIFIED,
  }
}

export function mapBankDetails(response: MerchantProfileResponse): BankDetails {
  return {
    accountHolder: response.bankDetails?.accountHolderName ?? NOT_AVAILABLE,
    companyName: response.businessProfile?.businessName ?? NOT_AVAILABLE,
    accountNumber: response.bankDetails?.accountNumber ?? NOT_AVAILABLE,
    bankName: response.bankDetails?.bankName ?? NOT_AVAILABLE,
    ifscCode: response.bankDetails?.ifscCode ?? NOT_AVAILABLE,
    // TODO:
    // Replace when backend exposes this field.
    branch: NOT_AVAILABLE,
    // TODO:
    // Replace when backend exposes this field.
    accountType: 'Current Account',
    status: mapUserStatus(response.merchantStatus?.userStatus),
    // TODO:
    // Replace when backend exposes this field.
    verifiedOn: NOT_VERIFIED,
    // TODO:
    // Replace when backend exposes this field.
    verifiedBy: NOT_VERIFIED,
    // TODO:
    // Replace when backend exposes this field.
    remarks: NOT_VERIFIED,
  }
}

export function mapKycDocuments(response: MerchantProfileResponse): KYCDocument[] {
  if (!response.merchantVerifications) return [];
  
  return response.merchantVerifications.map((doc, index) => ({
    id: String(index + 1),
    name: doc?.fieldName ?? NOT_AVAILABLE,
    description: doc?.section ?? NOT_AVAILABLE,
    status: mapVerificationStatus(doc?.status),
    uploadedOn: formatDate(doc?.reviewedAt),
    icon: FileText,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  }))
}

export function mapProfileStatus(response: MerchantProfileResponse): ProfileSidebarData {
  const businessData = mapBusinessProfile(response)
  
  return {
    ...businessData,
    status: mapUserStatus(response.merchantStatus?.userStatus),
    stage: response.merchantStatus?.stage ?? NOT_AVAILABLE,
  }
}
