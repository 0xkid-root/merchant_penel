'use client'

import { useState, useEffect } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import {
  addBeneficiarySchema,
  AddBeneficiaryFormData,
} from '../../schema/add-beneficiary.schema'

import BeneficiaryBasicDetails from './beneficiary-basic-details'
import BeneficiaryOptionalDetails from './beneficiary-optional-details'
import BeneficiaryActions from './beneficiary-actions'
import BeneficiarySidebar from './beneficiary-sidebar'

import { useBankVerification } from '../../hooks/useBankVerification'
import { useCreateBeneficiary } from '../../hooks/useCreateBeneficiary'

interface Props {
  onSuccess?: () => void
}

export default function AddBeneficiaryForm({
  onSuccess,
}: Props) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const methods = useForm<AddBeneficiaryFormData>({
    resolver: zodResolver(addBeneficiarySchema),
    defaultValues: {
      beneficiaryName: '',
      accountNumber: '',
      confirmAccountNumber: '',
      ifscCode: '',
      accountType: 'SAVINGS',
      bankName: '',
      mobileNumber: '',
      emailId: '',
    },
    mode: 'onBlur',
  })

  const [verificationData, setVerificationData] = useState<{
    verificationId: string
    accountName: string
    bankTxnStatus: boolean
  } | null>(null)

  const { mutateAsync: verifyBank, isPending: isVerifying } = useBankVerification()
  const { mutateAsync: createBeneficiary, isPending: isSaving } = useCreateBeneficiary()

  const isVerified = verificationData?.bankTxnStatus === true

  const watchedAccountNumber = useWatch({ control: methods.control, name: 'accountNumber' })
  const watchedIfscCode = useWatch({ control: methods.control, name: 'ifscCode' })

  useEffect(() => {
    if (isVerified) {
      setVerificationData(null)
    }
  }, [watchedAccountNumber, watchedIfscCode])

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

    const formData = methods.getValues()

    try {
      const response = await verifyBank({
        accountNumber: formData.accountNumber,
        ifsc: formData.ifscCode,
      })

      if (response.data.bankTxnStatus) {
        setVerificationData({
          verificationId: response.data.verificationId,
          accountName: response.data.accountName,
          bankTxnStatus: response.data.bankTxnStatus,
        })
        methods.setValue(
          "beneficiaryName",
          response.data.accountName,
          {
            shouldValidate: true,
            shouldDirty: true
          }
        );
      } else {
        setVerificationData(null)
      }
    } catch (error: any) {
      setVerificationData(null)
    }
  }

  //-----------------------------------
  // Save Beneficiary
  //-----------------------------------

  const onSubmit = async (
    data: AddBeneficiaryFormData
  ) => {
    if (!isVerified || !verificationData) {
      return
    }

    try {
      await createBeneficiary({
        verificationId: verificationData.verificationId,
        beneficiaryName: data.beneficiaryName,
        bankName: data.bankName,
        accountType: data.accountType,
        mobile: data.mobileNumber || '',
        email: data.emailId || '',
      })

      queryClient.invalidateQueries({ queryKey: ['beneficiaries'] })
      router.push('/beneficiaries')
      onSuccess?.()
    } catch (error) {
      // Error handled by hook
    }
  }

  //-----------------------------------
  // Cancel
  //-----------------------------------

  const handleCancel = () => {
    methods.reset()
    setVerificationData(null)
    onSuccess?.()
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-6"
      >
        {/* LEFT SIDE */}

        <div className="col-span-12 xl:col-span-9">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-8">
            {/* Basic Details */}
            <BeneficiaryBasicDetails isVerified={isVerified} />

            {/* Verify Button */}
            {!isVerified && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isVerifying ? 'Verifying...' : 'Verify Bank'}
                </button>
              </div>
            )}

            {/* Verification Result */}
            {isVerified && verificationData && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                <div className="flex items-center gap-3 text-green-700 mb-4">
                  <span className="text-xl">✓</span>
                  <h3 className="font-semibold">Account Verified Successfully</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 text-sm text-slate-700">
                  <div>
                    <span className="font-medium">Verified Account Name:</span>
                    <p className="mt-1 font-semibold text-slate-900">{verificationData.accountName}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Always Visible */}
            <BeneficiaryOptionalDetails />

            {/* Footer Buttons */}
            <BeneficiaryActions
              isVerified={isVerified}
              isSaving={isSaving}
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