export interface WalletResponse {
    id: number;
    merchantId: number;
    merchantName: string;
    walletCode: string;
    walletStatus: string;
    availableBalance: number;
    holdBalance: number;
    totalBalance: number;
    currency: string;
    createdAt: string;
    updatedAt: string;
}

export interface WalletSummaryResponse {
    availableBalance: number;
    holdBalance: number;
    totalBalance: number;
    withdrawableBalance: number;

    // Keep these for now.
    lifetimeCredit: number;
    lifetimeDebit: number;
    successfulCreditCount: number;
    debitTransactionCount: number;

    currency: string;
}

import { WalletLedger } from './walletLedger.types';

export interface WalletDashboardResponse {
    summary: WalletSummaryResponse;
    recentTransactions: WalletLedger[];
}