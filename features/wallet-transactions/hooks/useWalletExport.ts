import { useMutation } from '@tanstack/react-query'
import { walletTransactionsApi } from '../api/walletTransactionsApi'
import { toast } from 'sonner'

interface ExportParams {
    transactionType?: string
    referenceType?: string
    referenceId?: string
    fromDate?: string
    toDate?: string
    search?: string
    exportFormat?: string
}

export const useWalletExport = () => {
    return useMutation({
        mutationFn: (params: ExportParams) => {
            return walletTransactionsApi.exportTransactions(params)
        },
        onSuccess: (blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            // We use .csv extension for now as requested. Future formats will adjust this.
            a.download = 'wallet-transactions.csv'
            document.body.appendChild(a)
            a.click()
            
            // Cleanup
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
            
            toast.success("CSV exported successfully")
        },
        onError: () => {
            toast.error("Failed to export transactions")
        }
    })
}
