// lib/get-page-title.ts

export function getPageTitle(pathname: string) {
  const routes = [
    { path: '/dashboard', title: 'Dashboard' },

    { path: '/wallet', title: 'Wallet' },
    { path: '/wallet-transactions', title: 'Wallet Transactions' },
    { path: '/wallet-whitelist', title: 'Wallet Whitelist' },

    { path: '/beneficiaries', title: 'Beneficiaries' },

    { path: '/payout/single', title: 'Single Payout' },
    { path: '/payout/direct', title: 'Direct Payout' },
    { path: '/payout/bulk', title: 'Bulk Payout' },
    { path: '/payout/payout-history', title: 'Payout History' },

    { path: '/reports', title: 'Reports' },
    { path: '/notifications', title: 'Notifications' },
  ]

  const matchedRoute = routes.find(
    (route) =>
      pathname === route.path || pathname.startsWith(`${route.path}/`),
  )

  return matchedRoute?.title ?? 'Merchant Panel'
}