import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  Wallet2,
} from 'lucide-react'

export const stats = [
  {
    title: 'Total Credits',
    value: '₹14,82,35.00',
    icon: ArrowDown,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    title: 'Total Debits',
    value: '₹9,44,200.00',
    icon: ArrowUp,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-600',
  },
  {
    title: 'Net Balance Impact',
    value: '₹5,38,150.00',
    icon: CreditCard,
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    title: 'Total Transactions',
    value: '80',
    icon: Wallet2,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
  },
]


  export const transactions = [
    { id: '#WTX1142', type: 'Add Funds', icon: 'down', mode: 'NEFT', amount: '+₹50,000.00', remarks: 'Fund Added via NEFT', date: '18 Jun 2025, 10:02 AM', status: 'Success' },
    { id: '#WTX1141', type: 'Payout', icon: 'up', mode: 'IMPS', amount: '-₹5,200.00', remarks: 'Payout to Ravi Kumar', date: '18 Jun 2025, 09:47 AM', status: 'Success' },
    { id: '#WTX1140', type: 'Payout', icon: 'up', mode: 'UPI', amount: '-₹12,000.00', remarks: 'Payout to Priya Singh', date: '18 Jun 2025, 09:30 AM', status: 'Pending' },
    { id: '#WTX1139', type: 'Withdrawal Request', icon: 'up', mode: 'NEFT', amount: '-₹25,000.00', remarks: 'Withdrawal to HDFC - 4321', date: '18 Jun 2025, 09:15 AM', status: 'Pending' },
    { id: '#WTX1138', type: 'Add Funds', icon: 'down', mode: 'NEFT', amount: '+₹1,00,000.00', remarks: 'Wallet top-up via NEFT', date: '17 Jun 2025, 04:25 PM', status: 'Success' },
    { id: '#WTX1137', type: 'Payout', icon: 'up', mode: 'RTGS', amount: '-₹8,500.00', remarks: 'Payout to Deepak Mehta', date: '17 Jun 2025, 03:40 PM', status: 'Success' },
    { id: '#WTX1136', type: 'Payout', icon: 'up', mode: 'NEFT', amount: '-₹3,200.00', remarks: 'Payout to Sneha Patel', date: '17 Jun 2025, 02:18 PM', status: 'Failed' },
    { id: '#WTX1135', type: 'Add Funds', icon: 'down', mode: 'IMPS', amount: '+₹25,000.00', remarks: 'Fund Added via IMPS', date: '17 Jun 2025, 11:05 AM', status: 'Success' },
    { id: '#WTX1134', type: 'Adjustments', icon: 'down', mode: 'SYSTEM', amount: '+₹250.00', remarks: 'Interest Credited', date: '16 Jun 2025, 10:00 PM', status: 'Success' },
    { id: '#WTX1133', type: 'Fees', icon: 'up', mode: 'SYSTEM', amount: '-₹18.00', remarks: 'GST Charge', date: '16 Jun 2025, 10:00 PM', status: 'Success' },
  ];
