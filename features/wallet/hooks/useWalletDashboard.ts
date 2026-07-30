import { useQuery } from '@tanstack/react-query';
import { walletApi } from '../api/walletApi';

export const useWalletDashboard = () => {
    return useQuery({
        queryKey: ['wallet-dashboard'],
        queryFn: walletApi.getWalletDashboard,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
