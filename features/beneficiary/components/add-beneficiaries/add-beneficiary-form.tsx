'use client'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import {
  addBeneficiarySchema,
  AddBeneficiaryFormData,
} from '../../schema/add-beneficiary.schema'

import BeneficiaryBasicDetails from './beneficiary-basic-details'
import BeneficiaryVerificationBanner from './beneficiary-verification-banner'
import BeneficiaryBankDetails from './beneficiary-bank-details'
import BeneficiaryOptionalDetails from './beneficiary-optional-details'
import BeneficiaryActions from './beneficiary-actions'
import BeneficiarySidebar from './beneficiary-sidebar'

import { BankDetails } from '../types'

interface Props {
  onSuccess?: () => void
}

export default function AddBeneficiaryForm({
  onSuccess,
}: Props) {
  const methods = useForm<AddBeneficiaryFormData>({
    resolver: zodResolver(addBeneficiarySchema),

    defaultValues: {
      beneficiaryName: '',
      accountNumber: '',
      confirmAccountNumber: '',
      ifscCode: '',
      mobileNumber: '',
      emailId: '',
      remarks: '',
    },

    mode: 'onBlur',
  })

  const [isVerifying, setIsVerifying] = useState(false)

  const [isVerified, setIsVerified] = useState(true)

  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null)

  //-----------------------------------
  // Verify Account
  //-----------------------------------

  const handleVerify = async () => {
    const isValid = await methods.trigger([
      'beneficiaryName',
      'accountNumber',
      'confirmAccountNumber',
      'ifscCode',
    ])

    if (!isValid) return

    try {
      setIsVerifying(true)

      // --------------------------------
      // Penny Drop API
      // Replace later
      // --------------------------------

      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      )

      const response: BankDetails = {
        accountHolderName: 'Rahul Sharma',

        bankName: 'HDFC Bank',

        branchName:
          'Noida Sector 18, Uttar Pradesh',

        accountType: 'Savings',

        upiId: 'rahulsharma@okhdfcbank',

        verificationStatus: 'Verified',
      }

      setBankDetails(response)

      setIsVerified(true)

      toast.success('Account Verified Successfully')
    } catch (error) {
      toast.error('Verification Failed')
    } finally {
      setIsVerifying(false)
    }
  }

  //-----------------------------------
  // Save Beneficiary
  //-----------------------------------

  const onSubmit = async (
    data: AddBeneficiaryFormData
  ) => {
    if (!isVerified) {
      toast.error('Please verify account first')
      return
    }

    console.log(data)

    toast.success('Beneficiary Added Successfully')

    onSuccess?.()
  }

  //-----------------------------------
  // Cancel
  //-----------------------------------

  const handleCancel = () => {
    methods.reset()

    setBankDetails(null)

    setIsVerified(false)

    onSuccess?.()
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-6"
      >
        {/* LEFT SIDE */}

        {/* LEFT SIDE */}

        <div className="col-span-12 xl:col-span-9">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-8">

            {/* Basic Details */}
            <BeneficiaryBasicDetails />

            {/* Verification Result */}
            {isVerified && bankDetails && (
              <>
                <BeneficiaryVerificationBanner />

                <BeneficiaryBankDetails
                  bankDetails={bankDetails}
                />
              </>
            )}

            {/* Always Visible */}
            <BeneficiaryOptionalDetails />


            {/* Footer Buttons */}
            <BeneficiaryActions
              isVerified={isVerified}
              onCancel={handleCancel}
            />

          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="col-span-12 xl:col-span-3">
          <BeneficiarySidebar />
        </div>
      </form>
    </FormProvider>
  )
}