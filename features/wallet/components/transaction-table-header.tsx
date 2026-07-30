'use client'

export default function TransactionTableHeader() {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <h3 className="text-xl font-semibold leading-7 text-slate-900 sm:text-2xl">
        Recent Transactions
      </h3>
    </div>
  )
}
