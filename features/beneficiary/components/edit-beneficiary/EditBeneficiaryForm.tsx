'use client'

import EditBeneficiaryBasicDetails from './EditBeneficiaryBasicDetails'
import EditBeneficiaryOptionalDetails from './EditBeneficiaryOptionalDetails'
import EditBeneficiarySidebar from './EditBeneficiarySidebar'
import EditBeneficiaryActions from './EditBeneficiaryActions'

export default function EditBeneficiaryForm() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* LEFT SIDE */}
      <div className="col-span-12 xl:col-span-9">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-8 shadow-sm">

          <EditBeneficiaryBasicDetails />

          <hr className="border-slate-200" />

          <EditBeneficiaryOptionalDetails />

          <EditBeneficiaryActions />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="col-span-12 xl:col-span-3">
        <EditBeneficiarySidebar />
      </div>
    </div>
  )
}
