import { WithdrawalRequest } from '@/features/withdrawal-request/pages/withdrawal-request';

export const metadata = {
  title: 'Withdrawal Request | Merchant Panel',
  description: 'Request a withdrawal from your wallet to your registered bank account',
};

export default function WithdrawalRequestPage() {
  return <WithdrawalRequest />;
}
