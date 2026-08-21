import { useQuery } from '@tanstack/react-query';
import { walletApi } from '../api/walletApi';

export const useWalletBalance = () => {
    return useQuery({
        queryKey: ['wallet-balance'],
        queryFn: () => walletApi.getWalletBalance(),
    });
};
