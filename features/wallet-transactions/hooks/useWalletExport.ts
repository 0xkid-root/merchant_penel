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
    exportFormat: 'CSV' | 'EXCEL'
}

const downloadExport = (data: any, format: 'CSV' | 'EXCEL') => {
    const blob = data instanceof Blob ? data : new Blob([data])
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url

    const extension = format === 'EXCEL' ? 'xlsx' : 'csv'
    a.download = `wallet-transactions.${extension}`

    document.body.appendChild(a)
    a.click()

    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
}

export const useWalletExport = () => {
    return useMutation({
        mutationFn: (params: ExportParams) => {
            return walletTransactionsApi.exportTransactions(params)
        },
        onSuccess: (blob, variables) => {
            downloadExport(blob, variables.exportFormat)
            toast.success(`${variables.exportFormat} exported successfully`)
        },
        onError: () => {
            toast.error("Failed to export transactions")
        }
    })
}
