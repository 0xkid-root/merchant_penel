export const PAYOUT_DATA = [
  { date: '1 Jun', amount: 45000 },
  { date: '6 Jun', amount: 52000 },
  { date: '11 Jun', amount: 48000 },
  { date: '16 Jun', amount: 61000 },
  { date: '18 Jun', amount: 55000 }
]

export const RECENT_TRANSACTIONS = [
  { id: '#TXN8821', type: 'IMPS', amount: '₹5,200.00', status: 'Success', date: '18 Jun, 10:02 AM' },
  { id: '#TXN8820', type: 'NEFT', amount: '₹50,000.00', status: 'Success', date: '18 Jun, 09:47 AM' },
  { id: '#TXN8819', type: 'UPI', amount: '₹12,000.00', status: 'Pending', date: '18 Jun, 09:30 AM' },
  { id: '#TXN8818', type: 'NEFT', amount: '₹8,500.00', status: 'Failed', date: '18 Jun, 09:15 AM' },
  { id: '#TXN8817', type: 'RTGS', amount: '₹2,00,000.00', status: 'Success', date: '18 Jun, 08:55 AM' }
]

export const RECENT_PAYOUTS = [
  { beneficiary: 'Ravi Kumar', bank: 'HDFC ****4821', amount: '₹5,200.00', mode: 'IMPS', status: 'Success', avatar: '🧑' },
  { beneficiary: 'Priya Singh', bank: 'priya@upi', amount: '₹12,000.00', mode: 'UPI', status: 'Pending', avatar: '👩' },
  { beneficiary: 'Deepak Mehta', bank: 'ICICI ****9234', amount: '₹8,500.00', mode: 'NEFT', status: 'Failed', avatar: '🧑' },
  { beneficiary: 'Sneha Patel', bank: 'SBI ****1102', amount: '₹22,000.00', mode: 'RTGS', status: 'Success', avatar: '👩' },
  { beneficiary: 'Amit Verma', bank: 'amit@upi', amount: '₹3,400.00', mode: 'UPI', status: 'Success', avatar: '🧑' }
]