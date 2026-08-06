# Wallet Whitelist Module

The Wallet Whitelist module allows merchants to add, verify, and view their bank accounts for wallet withdrawals. It uses a strict fintech-grade verification flow to ensure that funds are only settled to legitimate, verified merchant accounts.

## 🚀 Features Integrated

### 1. Wallet Whitelist Table (Listing)
- **Data Fetching:** Integrates React Query (`useWalletWhitelistList`) for efficient fetching, caching, and background updates.
- **Pagination & Filtering:** Supports server-side pagination and client-side status filtering (Pending, Approved, Rejected) with real-time search.
- **Status Badges:** Visual indicators for the current review status of the bank account.
- **Action Column:** Includes a "View" (Eye icon) button that navigates directly to the comprehensive details page.

### 2. Add Bank Account Flow (Fintech Flow)
The creation flow enforces a strict sequence: **Enter Bank Details → Verify Bank (Penny Drop) → Upload Cancelled Cheque/Passbook → Submit Request → Pending Review → Admin Approval/Reject**.
- **Real-time Bank Verification (Penny Drop):** 
  - Merchant enters **Account Number** and **IFSC Code**.
  - Backend performs Penny Drop verification.
  - On success, the response returns:
    - `verificationId`
    - `accountName`
  - `verificationId` is stored and later sent during wallet whitelist creation.
- **Verified Data Locking:** 
  - After successful bank verification, Account Holder Name, Bank Name, Account Number, Confirm Account Number, IFSC Code, and Account Type become read-only to prevent any modification before submission.
- **Document Upload:** 
  - Integrated with the common `useFileUpload` hook to handle Cancelled Cheque or Passbook uploads.
  - File validation enforces JPG, PNG, and PDF formats with a maximum size of 5 MB before upload.
  - Includes local file validation and preview support (Eye icon) before submission.
- **Zod Validation:** Strict schema validation ensuring all required data is collected before the API call.

### 3. Wallet Whitelist Details Page
A dedicated, read-only view mapped to `/wallet-whitelist/[id]` for comprehensive inspection. 
- **Modular Architecture:** Mirrors the clean, component-based structure used in the Beneficiaries feature.
  - `wallet-whitelist-details-card.tsx`: High-level wallet holder details.
  - `wallet-whitelist-bank-details.tsx`: Deep dive into account number, IFSC, and bank name.
  - `wallet-whitelist-document-details.tsx`: Displays the document type with an external link to preview the securely uploaded file.
  - `wallet-whitelist-details-sidebar.tsx`: Contextual sidebar showing the exact approval status (Approved, Rejected, Pending) and reasons for rejection.
  - `wallet-whitelist-details-skeleton.tsx`: Smooth skeleton loaders for UX while fetching data.

### 4. Security & Business Logic Adjustments
- **Immutable Bank Records:** 
  - Once a bank account has been successfully verified and submitted, merchants cannot edit the request. To register another bank account, a new wallet whitelist request must be created.
- **Removed Deprecated Fields:** Cleaned up legacy fields (`mobile`, `email`, `branchName`, `bank dropdown`) to strictly follow the new backend payload requirements.

## 🔌 APIs Used

- Create Wallet Whitelist
- Get Wallet Whitelist List
- Get Wallet Whitelist By ID
- Bank Verification (Penny Drop)
- Common File Upload

## 📁 File Structure Overview
```text
features/wallet-whitelist/
├── api/                  # Axios API calls (create, list, getById)
├── components/
│   ├── add-bank-account/ # Verification, Form, and Upload components
│   ├── wallet-whitelist-details/ # Detail cards, sidebars, and skeletons
│   └── wallet-whitelist-table.tsx
├── hooks/                # React Query hooks (Queries and Mutations)
├── pages/                # Page layout wrappers
├── schema/               # Zod validation schemas
├── types/                # TypeScript interfaces and API response shapes
└── README.md             # This file
```
