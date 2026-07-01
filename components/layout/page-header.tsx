'use client'
import { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'


interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  backHref?: string
  backLabel?: string
}

export default function PageHeader({
  title,
  subtitle,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-start justify-between">

     <div className="space-y-4">

  {backHref && (
    <Link
      href={backHref}
      className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
    >
      <ChevronLeft className="h-4 w-4" />
      {backLabel}
    </Link>
  )}

  <div className="flex items-start justify-between">

    <div>

      <h1 className="text-3xl font-bold text-slate-900">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-sm text-slate-500">
          {subtitle}
        </p>
      )}

    </div>

    {actions && (
      <div className="flex items-center gap-3">
        {actions}
      </div>
    )}

  </div>

</div>
    </div>
  )
}