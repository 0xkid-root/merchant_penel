'use client'

import { BankDetails } from '../types'

interface Props {
  bankDetails: BankDetails
}

export default function BeneficiaryBankDetails({
  bankDetails,
}: Props) {
  return (
    <div>
      Bank Details
    </div>
  )
}