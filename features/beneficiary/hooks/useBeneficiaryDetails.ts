import { useQuery } from '@tanstack/react-query'
import { beneficiaryApi } from '../api/beneficiaryApi'

export const useBeneficiaryDetails = (
    id: number
) => {
    return useQuery({
        queryKey: ['beneficiary', id],

        queryFn: () =>
            beneficiaryApi.getBeneficiaryById(id),

        enabled: !!id,
    })
}