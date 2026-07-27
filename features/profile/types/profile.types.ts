/* ============================
   Basic Details
============================ */

export interface BasicDetails {
    email: string;
    lastLoginAt: string;
    mobile: string | null;
    role: string;
    status: string;
}

/* ============================
   Business Profile
============================ */

export interface BusinessProfile {
    androidAppUrl: string;
    brandName: string;
    businessIncorpDate: string;
    businessName: string;
    businessPan: string | null;
    businessType: string;
    cinNumber: string;
    companyGstin: string | null;
    createdAt: string;
    eSigningVia: string;
    iosAppUrl: string;
    paymentPlatforms: string[];
    profileCode: string;
    websiteUrl: string;
}

/* ============================
   Address
============================ */

export interface AddressDetails {
    addressLine: string;
    city: string;
    houseBuildingFloor: string;
    pinCode: string;
    state: string;
}

export interface MerchantAddress {
    oprAddress: AddressDetails;
    regAddress: AddressDetails;
}

/* ============================
   Authorized Signatory
============================ */

export interface AuthorizedSignatory {
    id: number;
    fullName: string;
    designation: string | null;
    emailId: string;
    mobileNumber: string;
}

/* ============================
   Business Owner
============================ */

export interface BusinessOwner {
    id?: number;
    fullName?: string;
    designation?: string;
    emailId?: string;
    mobileNumber?: string;
}

/* ============================
   Bank Details
============================ */

export interface BankDetails {
    accountHolderName: string | null;
    accountNumber: string;
    bankName: string;
    ifscCode: string;
}

/* ============================
   Merchant Agreement
============================ */

export interface MerchantAgreement {
    requestId: string;
    signedAt: string;
    status: string;
}

/* ============================
   Merchant Status
============================ */

export type UserStatusEnum = "ACTIVE" | "INACTIVE";

export interface MerchantStatus {
    businessProfileStatus: string | null;
    stage: string;
    userStatus: UserStatusEnum;
}

/* ============================
   Merchant Verification
============================ */

export type VerificationStatusEnum = "APPROVED" | "PENDING" | "REJECTED";

export interface MerchantVerification {
    fieldName: string;
    remarks: string;
    reviewedAt: string;
    section: string;
    status: VerificationStatusEnum;
}

/* ============================
   Main Response
============================ */

export interface MerchantProfileResponse {
    merchantId: number;

    basicDetails: BasicDetails;

    businessProfile: BusinessProfile;

    address: MerchantAddress;

    authorizedSignatories: AuthorizedSignatory[];

    businessOwners: BusinessOwner[];

    bankDetails: BankDetails;

    merchantAgreements: MerchantAgreement[];

    merchantStatus: MerchantStatus;

    merchantVerifications: MerchantVerification[];
}