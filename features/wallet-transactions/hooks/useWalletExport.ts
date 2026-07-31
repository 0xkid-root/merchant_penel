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
const downloadExport = (
    blob: Blob,
    format: "CSV" | "EXCEL"
) => {

    console.log("========== DOWNLOAD ==========")

    console.log("Blob:", blob)
    console.log("Blob instanceof Blob:", blob instanceof Blob)
    console.log("Blob Type:", blob.type)
    console.log("Blob Size:", blob.size)

    const url = URL.createObjectURL(blob)

    console.log("Object URL:", url)

    const a = document.createElement("a")

    a.href = url

    a.download =
        format === "EXCEL"
            ? "wallet-transactions.xlsx"
            : "wallet-transactions.csv"

    console.log("Download Name:", a.download)

    document.body.appendChild(a)

    console.log("Clicking Download...")

    a.click()

    document.body.removeChild(a)

    URL.revokeObjectURL(url)

    console.log("Download Finished")
}

export const useWalletExport = () => {
    return useMutation({
        mutationFn: (params: ExportParams) => {
            return walletTransactionsApi.exportTransactions(params)
        },
        onSuccess: (blob, variables) => {

            console.log("========== MUTATION SUCCESS ==========")

            console.log("Blob:", blob)

            console.log("Blob instanceof Blob:", blob instanceof Blob)

            console.log("Blob Size:", blob.size)

            console.log("Blob Type:", blob.type)

            downloadExport(blob, variables.exportFormat)

            toast.success(`${variables.exportFormat} exported successfully`)
        },
        onError: () => {
            toast.error("Failed to export transactions")
        }
    })
}
