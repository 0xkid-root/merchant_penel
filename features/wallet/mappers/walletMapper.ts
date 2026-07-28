import { formatDate } from '@/lib/utils/dateFormatter';

import {
    WalletResponse,
    WalletSummaryResponse,
} from '../types/wallet.types';

/* ============================================
   Wallet Status Mapping
============================================ */

export function mapWalletStatus(
    status: string | null | undefined
): 'Active' | 'Blocked' | 'Closed' {
    switch (status?.toUpperCase()) {
        case 'ACTIVE':
            return 'Active';

        case 'BLOCKED':
            return 'Blocked';

        case 'CLOSED':
            return 'Closed';

        default:
            return 'Active';
    }
}

/* ============================================
   Wallet Details Mapper
============================================ */

export function mapWallet(
    response: WalletResponse
): WalletResponse & {
    formattedCreatedAt: string;
    formattedUpdatedAt: string;
    status: 'Active' | 'Blocked' | 'Closed';
} {
    return {
        ...response,

        status: mapWalletStatus(response.walletStatus),

        formattedCreatedAt: formatDate(response.createdAt),

        formattedUpdatedAt: formatDate(response.updatedAt),
    };
}

/* ============================================
   Wallet Summary Mapper
============================================ */

export function mapWalletSummary(
    response: WalletSummaryResponse
): WalletSummaryResponse {
    return {
        ...response,

        availableBalance: Number(response.availableBalance),

        holdBalance: Number(response.holdBalance),

        totalBalance: Number(response.totalBalance),

        withdrawableBalance: Number(response.withdrawableBalance),

        lifetimeCredit: Number(response.lifetimeCredit),

        lifetimeDebit: Number(response.lifetimeDebit),

        successfulCreditCount: Number(response.successfulCreditCount),

        debitTransactionCount: Number(response.debitTransactionCount),
    };
}