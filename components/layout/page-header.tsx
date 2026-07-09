'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'

interface PageHeaderProps {
  title?: string
  subtitle?: string
  actions?: ReactNode
  backHref?: string
  backLabel?: string
}

export default function PageHeader({
  title,
  subtitle,
  actions,
  backHref,
  backLabel,
}: PageHeaderProps) {
  return (
    <div className="mb-6 space-y-4 sm:mb-8">
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
        >
          <ChevronLeft className="h-4 w-4" />
          {backLabel || 'Back'}
        </Link>
      )}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          {title && (
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="w-full shrink-0 lg:w-auto">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}