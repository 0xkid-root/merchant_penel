import {
  Users,
  Wallet,
  Send,
  Layers,
  FileText
} from 'lucide-react'

export const QUICK_LINKS = [
  {
    id: 1,
    title: 'Beneficiaries',
    subtitle: 'Manage your beneficiaries',
    icon: Users,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    href: '/beneficiaries',
  },
  {
    id: 2,
    title: 'Add Funds',
    subtitle: 'Add money to your wallet',
    icon: Wallet,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    href: '/wallet',
  },
  {
    id: 3,
    title: 'Single Payout',
    subtitle: 'Make a single payout',
    icon: Send,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    href: '/payouts/single',
  },
  {
    id: 4,
    title: 'Bulk Payout',
    subtitle: 'Make bulk payouts',
    icon: Layers,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    href: '/payouts/bulk',
  },
  {
    id: 5,
    title: 'Transactions',
    subtitle: 'View all transactions',
    icon: FileText,
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    href: '/wallet-transactions',
  },
]