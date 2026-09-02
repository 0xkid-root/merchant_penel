import type { BusinessOwner } from './profile.types'

export interface KYCDocument {
  id: string
  name: string
  description: string
  status: 'Verified' | 'Pending' | 'Rejected'
  uploadedOn: string
  icon: React.ComponentType<any>
  iconBg: string
  iconColor: string
}

export interface BusinessData {
  companyName: string
  businessType: string
  cinNumber: string
  gstNumber: string
  panNumber: string
  emailAddress: string
  mobileNumber: string
  website: string
  registeredAddress: string
  city: string
  state: string
  pincode: string
  verifiedOn: string
  verifiedBy: string
  remarks: string
  businessOwners: BusinessOwner[]
}

export interface BankDetails {
  accountHolder: string
  companyName: string
  accountNumber: string
  ifscCode: string
  bankName: string
  branch: string
  accountType: string
  status: 'Active' | 'Inactive'
  verifiedOn: string
  verifiedBy: string
  remarks: string
}

export interface ProfileSidebarData extends BusinessData {
  status: string
  stage: string
}
