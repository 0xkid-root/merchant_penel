import { useQuery } from '@tanstack/react-query'
import { beneficiaryApi } from '../api/beneficiaryApi'

interface UseBeneficiaryListParams {
    page?: number
    size?: number
}

export const useBeneficiaryList = ({
    page = 0,
    size = 10,
}: UseBeneficiaryListParams = {}) => {
    return useQuery({
        queryKey: ['beneficiaries', page, size],

        queryFn: () =>
            beneficiaryApi.getBeneficiaries(
                page,
                size
            ),
    })
}