import { Building2, FileText, Banknote } from 'lucide-react'

export default function ProfileSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header Skeleton */}
      <div className="animate-pulse">
        <div className="h-8 w-64 rounded-lg bg-slate-200"></div>
        <div className="mt-2 h-5 w-96 rounded-lg bg-slate-200"></div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-4 border-b border-slate-200 pb-px">
        {[Building2, FileText, Banknote].map((Icon, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 border-b-2 border-transparent px-4 py-3 pb-4"
          >
            <Icon className="h-4 w-4 text-slate-300" />
            <div className="h-5 w-24 animate-pulse rounded-md bg-slate-200"></div>
          </div>
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        
        {/* Left Side (Content) */}
        <main className="xl:col-span-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            
            <div className="mb-6 flex items-center justify-between">
              <div className="h-6 w-48 animate-pulse rounded-lg bg-slate-200"></div>
              <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200"></div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 w-32 rounded bg-slate-200"></div>
                  <div className="mt-2 h-12 w-full rounded-xl bg-slate-100"></div>
                </div>
              ))}
            </div>

          </div>
        </main>

        {/* Right Side (Sidebar) */}
        <aside className="xl:col-span-4">
          <div className="space-y-6">
            <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                <div>
                  <div className="h-5 w-32 rounded bg-slate-200"></div>
                  <div className="mt-2 h-5 w-16 rounded bg-slate-200"></div>
                </div>
              </div>

              <div className="h-4 w-full rounded bg-slate-200"></div>
              <div className="mt-2 h-4 w-3/4 rounded bg-slate-200"></div>

              <div className="mt-5 space-y-4 border-t border-slate-200 pt-5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-5 w-5 rounded bg-slate-200"></div>
                    <div className="flex-1">
                      <div className="h-4 w-24 rounded bg-slate-200"></div>
                      <div className="mt-1 h-5 w-full rounded bg-slate-100"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-pulse rounded-2xl border border-slate-200 bg-blue-50 p-6">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded bg-slate-200"></div>
                <div className="flex-1">
                  <div className="h-5 w-48 rounded bg-slate-200"></div>
                  <div className="mt-2 h-4 w-full rounded bg-slate-200"></div>
                  <div className="mt-1 h-4 w-2/3 rounded bg-slate-200"></div>
                  <div className="mt-4 h-5 w-24 rounded bg-slate-200"></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}
