export function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'success':
      return 'inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700'

    case 'pending':
      return 'inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700'

    case 'failed':
      return 'inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700'

    default:
      return 'inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700'
  }
}