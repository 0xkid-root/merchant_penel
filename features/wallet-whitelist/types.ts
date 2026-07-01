export interface WalletWhitelist {
  id: number;
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;

  status: "Approved" | "Pending" | "Rejected";

  defaultAccount: boolean;
}