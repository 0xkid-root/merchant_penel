'use client'

import { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: ReactNode
}

export default function PageHeader({
  title,
  subtitle,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-start justify-between">

      {/* Left */}
      <div>

        <h1 className="text-[16px] font-bold leading-tight text-slate-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-[15px] font-normal text-slate-500">
            {subtitle}
          </p>
        )}

      </div>

      {/* Right */}
      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}

    </div>
  )
}