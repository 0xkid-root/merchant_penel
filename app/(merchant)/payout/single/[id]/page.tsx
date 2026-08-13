import SinglePayoutDetails from '@/features/payout/single-payout/details/single-payout-details'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function SinglePayoutDetailsPage({ params }: PageProps) {
  const resolvedParams = await params
  const id = parseInt(resolvedParams.id, 10)

  return <SinglePayoutDetails id={id} />
}
