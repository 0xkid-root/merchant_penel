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
    cinNumber: response.businessProfile?.cinNumber ?? NOT_AVAILABLE,
    gstNumber: response.businessProfile?.companyGstin ?? NOT_AVAILABLE,
    panNumber: response.businessProfile?.businessPan ?? NOT_AVAILABLE,
    website: response.businessProfile?.websiteUrl ?? NOT_AVAILABLE,
    emailAddress: response.basicDetails?.email ?? NOT_AVAILABLE,
    mobileNumber: response.basicDetails?.mobile ?? NOT_AVAILABLE,
    registeredAddress: response.address?.regAddress?.addressLine ?? NOT_AVAILABLE,
    city: response.address?.regAddress?.city ?? NOT_AVAILABLE,
    state: response.address?.regAddress?.state ?? NOT_AVAILABLE,
    pincode: response.address?.regAddress?.pinCode ?? NOT_AVAILABLE,
    verifiedOn: NOT_VERIFIED,
    verifiedBy: NOT_VERIFIED,
    remarks: NOT_VERIFIED,
    businessOwners: response.businessOwners ?? [],
  }
}

export function mapBankDetails(response: MerchantProfileResponse): BankDetails {
  const ifsc = response.bankDetails?.ifscCode || '';
  
  // The backend is currently returning the person's name inside the `bankName` field
  // So we will use it for accountHolder if accountHolderName is missing.
  const holderName = response.bankDetails?.accountHolderName || response.bankDetails?.bankName || NOT_AVAILABLE;

  // Since the backend doesn't return the real bank name yet, 
  // we will just show NOT_AVAILABLE until the backend API is updated.
  const realBankName = NOT_AVAILABLE;

  return {
    accountHolder: holderName,
    companyName: response.businessProfile?.businessName ?? NOT_AVAILABLE,
    accountNumber: response.bankDetails?.accountNumber ?? NOT_AVAILABLE,
    bankName: realBankName,
    ifscCode: ifsc || NOT_AVAILABLE,
    branch: NOT_AVAILABLE,
    accountType: 'Current Account',
    status: mapUserStatus(response.merchantStatus?.userStatus),
    verifiedOn: NOT_VERIFIED,
    verifiedBy: NOT_VERIFIED,
    remarks: NOT_VERIFIED,
  }
}

export function mapKycDocuments(response: MerchantProfileResponse): KYCDocument[] {
  const documents: KYCDocument[] = [];

  // 1. Add Merchant Verifications (if any)
  if (response.merchantVerifications && response.merchantVerifications.length > 0) {
    response.merchantVerifications.forEach((doc, index) => {
      documents.push({
        id: `verification-${index}`,
        name: doc?.fieldName ?? NOT_AVAILABLE,
        description: doc?.section ?? NOT_AVAILABLE,
        status: mapVerificationStatus(doc?.status),
        uploadedOn: formatDate(doc?.reviewedAt),
        icon: FileText,
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
      });
    });
  }

  // 2. Add Merchant Agreements (if any) as they also act as KYC/legal documents
  if (response.merchantAgreements && response.merchantAgreements.length > 0) {
    response.merchantAgreements.forEach((agreement) => {
      documents.push({
        id: `agreement-${agreement.requestId}`,
        name: 'Merchant Agreement',
        description: `Request ID: ${agreement.requestId}`,
        status: agreement.status?.toUpperCase() === 'SIGNED' || agreement.status?.toUpperCase() === 'APPROVED' ? 'Verified' : 'Pending',
        uploadedOn: formatDate(agreement.signedAt),
        icon: FileText,
        iconBg: 'bg-indigo-100',
        iconColor: 'text-indigo-600',
      });
    });
  }

  return documents;
}

export function mapProfileStatus(response: MerchantProfileResponse): ProfileSidebarData {
  const businessData = mapBusinessProfile(response)
  
  return {
    ...businessData,
    status: mapUserStatus(response.merchantStatus?.userStatus),
    stage: response.merchantStatus?.stage ?? NOT_AVAILABLE,
  }
}
