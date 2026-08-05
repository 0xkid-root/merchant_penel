import BeneficiaryDetailsPage from '@/features/beneficiary/pages/beneficiary-details-page'

export default function Page({ params }: { params: { id: string } }) {
  return <BeneficiaryDetailsPage beneficiaryId={Number(params.id)} />
}
