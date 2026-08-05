import EditBeneficiaryPage from '@/features/beneficiary/pages/edit-beneficiary-page'
import { use } from 'react'

export default function Page({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const id = resolvedParams?.id ? Number(resolvedParams.id) : 0;

  return <EditBeneficiaryPage beneficiaryId={id} />
}
