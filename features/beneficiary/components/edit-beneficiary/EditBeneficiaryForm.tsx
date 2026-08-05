'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import EditBeneficiaryBasicDetails from './EditBeneficiaryBasicDetails'
import EditBeneficiaryOptionalDetails from './EditBeneficiaryOptionalDetails'
import EditBeneficiarySidebar from './EditBeneficiarySidebar'
import EditBeneficiaryActions from './EditBeneficiaryActions'
import { BeneficiaryDetailsSkeleton } from '../beneficiary-details/beneficiary-details-skeleton'

import { useBeneficiaryDetails } from '../../hooks/useBeneficiaryDetails'
import { useUpdateBeneficiary } from '../../hooks/useUpdateBeneficiary'
import { editBeneficiarySchema, EditBeneficiaryFormData } from '../../schema/edit-beneficiary.schema'

interface Props {
  beneficiaryId: number
}

export default function EditBeneficiaryForm({ beneficiaryId }: Props) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: response, isLoading, isPending: isQueryPending, isError } = useBeneficiaryDetails(beneficiaryId)
  const { mutateAsync: updateBeneficiary, isPending: isUpdating } = useUpdateBeneficiary()

  const methods = useForm<EditBeneficiaryFormData>({
    resolver: zodResolver(editBeneficiarySchema),
    mode: 'onBlur',
  })

  useEffect(() => {
    if (response?.data) {
      methods.reset({
        mobile: response.data.mobile || '',
        email: response.data.email || '',
      })
    }
  }, [response?.data, methods])

  const onSubmit = async (data: EditBeneficiaryFormData) => {
    try {
      await updateBeneficiary({
        id: beneficiaryId,
        payload: {
          mobile: data.mobile,
          email: data.email,
        }
      })
      
      toast.success('Beneficiary updated successfully')
      
      queryClient.invalidateQueries({ queryKey: ['beneficiaries'] })
      queryClient.invalidateQueries({ queryKey: ['beneficiary', beneficiaryId] })
      
      router.push('/beneficiaries')
    } catch (error) {
      // Error is handled by the hook
    }
  }

  const handleCancel = () => {
    router.push('/beneficiaries')
  }

  if (isLoading || isQueryPending) {
    return <BeneficiaryDetailsSkeleton />
  }

  if (isError || !response?.data) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-6">
        <div className="text-center">
          <p className="text-slate-500">Failed to load beneficiary details.</p>
        </div>
      </div>
    )
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-12 gap-6">
        {/* LEFT SIDE */}
        <div className="col-span-12 xl:col-span-9">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-8 shadow-sm">
            
            <EditBeneficiaryBasicDetails beneficiary={response.data} />

            <hr className="border-slate-200" />

            <EditBeneficiaryOptionalDetails />

            <EditBeneficiaryActions onCancel={handleCancel} isSaving={isUpdating} />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-12 xl:col-span-3">
          <EditBeneficiarySidebar />
        </div>
      </form>
    </FormProvider>
  )
}
