'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  addBeneficiarySchema,
  AddBeneficiaryFormData,
} from '../../schema/add-beneficiary.schema'

import { BankDetails } from './types'

import BeneficiaryBasicDetails from './beneficiary-basic-details'
import BeneficiaryVerificationCard from './beneficiary-verification-card'
import BeneficiaryOptionalDetails from './beneficiary-optional-details'
import BeneficiaryNote from './beneficiary-note'
import BeneficiaryActions from './beneficiary-actions'
import BeneficiarySidebar from './beneficiary-sidebar'

export default function AddBeneficiaryForm() {
  const methods = useForm<AddBeneficiaryFormData>({
    resolver: zodResolver(addBeneficiarySchema),
    mode: 'onChange',

    defaultValues: {
      beneficiaryName: '',
      accountNumber: '',
      confirmAccountNumber: '',
      ifscCode: '',
      mobileNumber: '',
      emailId: '',
      remarks: '',
    },
  })

  const [isVerifying, setIsVerifying] = useState(false)

  const [isVerified, setIsVerified] = useState(false)

  const [bankDetails, setBankDetails] =
    useState<BankDetails | null>(null)

  const handleVerifyAccount = async () => {
    // API will come later
    console.log('Verify Account')
  }

  const handleSave = (data: AddBeneficiaryFormData) => {
    console.log(data)

    // Save API later
  }

  const handleCancel = () => {
    methods.reset()

    setIsVerified(false)

    setBankDetails(null)
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSave)}
        className="flex gap-8"
      >
        {/* Left Section */}

        <div className="flex-1 space-y-6">

          <BeneficiaryBasicDetails
            isVerifying={isVerifying}
            isVerified={isVerified}
            onVerify={handleVerifyAccount}
          />

          {isVerified && bankDetails && (
            <BeneficiaryVerificationCard
              bankDetails={bankDetails}
            />
          )}

          {isVerified && (
            <BeneficiaryOptionalDetails />
          )}

          <BeneficiaryNote />

          <BeneficiaryActions
            isVerified={isVerified}
            onCancel={handleCancel}
          />

        </div>

        {/* Right Sidebar */}

        <BeneficiarySidebar />

      </form>
    </FormProvider>
  )
}