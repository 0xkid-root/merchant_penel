export default function EditBeneficiarySkeleton() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* LEFT SIDE */}
      <div className="col-span-12 xl:col-span-9">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-5">
          
          <div className="space-y-4">
            {/* Beneficiary Info Skeleton */}
            <div className="space-y-4">
              <div className="h-6 w-48 animate-pulse rounded-lg bg-slate-200" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="mb-2 h-4 w-32 animate-pulse rounded bg-slate-200" />
                    <div className="h-11 w-full animate-pulse rounded-lg bg-slate-200" />
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Bank Details Skeleton */}
            <div className="space-y-4">
              <div className="h-6 w-40 animate-pulse rounded-lg bg-slate-200" />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="mb-2 h-4 w-32 animate-pulse rounded bg-slate-200" />
                    <div className="h-11 w-full animate-pulse rounded-lg bg-slate-200" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-slate-200" />

          {/* Contact Details Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-36 animate-pulse rounded-lg bg-slate-200" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[1, 2].map((i) => (
                <div key={i}>
                  <div className="mb-2 h-4 w-32 animate-pulse rounded bg-slate-200" />
                  <div className="h-11 w-full animate-pulse rounded-lg bg-slate-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Actions Skeleton */}
          <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
            <div className="h-10 w-24 animate-pulse rounded-lg bg-slate-200" />
            <div className="h-10 w-40 animate-pulse rounded-lg bg-slate-200" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Sidebar Skeleton) */}
      <div className="col-span-12 xl:col-span-3">
        <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-6 h-6 w-40 animate-pulse rounded-lg bg-slate-200" />
          <div className="flex items-start gap-4">
            <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-slate-200" />
            <div className="flex-1">
              <div className="mb-2 h-4 w-24 animate-pulse rounded bg-slate-200" />
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
