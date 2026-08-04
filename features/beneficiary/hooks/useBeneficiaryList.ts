import { useQuery } from '@tanstack/react-query'
import { beneficiaryApi } from '../api/beneficiaryApi'

interface UseBeneficiaryListParams {
    page?: number
    size?: number
    search?: string
    status?: string
}

export const useBeneficiaryList = ({
    page = 0,
    size = 10,
    search,
    status
}: UseBeneficiaryListParams = {}) => {
    return useQuery({
        queryKey: ['beneficiaries', page, size, search, status],

        queryFn: () =>
            beneficiaryApi.getBeneficiaries(
                page,
                size,
                search,
                status
            ),
    })
}