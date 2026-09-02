import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { QUICK_LINKS } from '../data/dashboard-data'

export function RecentActivity() {
  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-6">
        <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          Quick Links
        </h3>
      </div>

      <div className="flex flex-col pb-2">
        {QUICK_LINKS.map((link) => {
          const Icon = link.icon

          return (
            <Link
              key={link.id}
              href={link.href}
              className="group flex items-center justify-between gap-3 px-4 py-4 transition-colors hover:bg-slate-50 sm:px-6 sm:py-4 border-b border-slate-50 last:border-transparent"
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${link.iconBg}`}
                >
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${link.iconColor}`} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900 sm:text-base">
                    {link.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-500 sm:text-sm">
                    {link.subtitle}
                  </p>
                </div>
              </div>

              <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${link.iconBg} ${link.iconColor} opacity-70 group-hover:opacity-100 group-hover:scale-105`}>
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}