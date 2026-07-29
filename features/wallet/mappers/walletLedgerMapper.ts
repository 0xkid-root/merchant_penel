import { WalletLedger } from '../types/walletLedger.types'

export const walletLedgerMapper = {
    toTransaction: (ledger: WalletLedger) => ({
        id: ledger.id,

        transactionId: ledger.ledgerCode,

        amount: ledger.amount,

        balance: ledger.closingBalance,

        type: ledger.transactionType,

        referenceId: ledger.referenceId,

        referenceType: ledger.referenceType,

        remarks: ledger.remarks,

        createdBy: ledger.createdBy,

        date: ledger.createdAt,
    }),
}