import { useQuery } from '@tanstack/react-query';
import { walletApi } from '../api/walletApi';

export const useWallet = () =>
  useQuery({
    queryKey: ['wallet'],
    queryFn: walletApi.getWallet,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

export const useWalletSummary = () =>
  useQuery({
    queryKey: ['wallet-summary'],
    queryFn: walletApi.getWalletSummary,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });