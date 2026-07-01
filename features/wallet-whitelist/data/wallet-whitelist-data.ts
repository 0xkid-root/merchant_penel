export type WalletWhitelistStatus =
  | 'Approved'
  | 'Pending'
  | 'Rejected'

export interface WalletWhitelistItem {
  id: number
  bankName: string
  accountHolderName: string
  accountNumber: string
  ifscCode: string
  branchName: string
  accountType: string
  status: WalletWhitelistStatus
  isDefault: boolean
  createdAt: string
}

export const walletWhitelistData: WalletWhitelistItem[] = [
  {
    id: 1,
    bankName: 'HDFC Bank',
    accountHolderName: 'Rahul Sharma',
    accountNumber: 'XXXXXX4587',
    ifscCode: 'HDFC0001234',
    branchName: 'Noida Sector 18',
    accountType: 'Savings',
    status: 'Approved',
    isDefault: true,
    createdAt: '10 Jun 2026',
  },
  {
    id: 2,
    bankName: 'ICICI Bank',
    accountHolderName: 'Rahul Sharma',
    accountNumber: 'XXXXXX8965',
    ifscCode: 'ICIC0002548',
    branchName: 'Delhi Connaught Place',
    accountType: 'Current',
    status: 'Pending',
    isDefault: false,
    createdAt: '11 Jun 2026',
  },
  {
    id: 3,
    bankName: 'Axis Bank',
    accountHolderName: 'Rahul Sharma',
    accountNumber: 'XXXXXX1478',
    ifscCode: 'UTIB0000214',
    branchName: 'Lucknow Gomti Nagar',
    accountType: 'Savings',
    status: 'Rejected',
    isDefault: false,
    createdAt: '12 Jun 2026',
  },
  {
    id: 4,
    bankName: 'State Bank of India',
    accountHolderName: 'Rahul Sharma',
    accountNumber: 'XXXXXX7754',
    ifscCode: 'SBIN0001478',
    branchName: 'Kanpur Civil Lines',
    accountType: 'Savings',
    status: 'Approved',
    isDefault: false,
    createdAt: '13 Jun 2026',
  },
]