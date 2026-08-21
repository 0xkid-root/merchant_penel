import { useMutation } from '@tanstack/react-query'
import { otpApi, VerifyOtpRequest, VerifyOtpResponse } from '../api/otpApi'

export const useVerifyOtp = () => {
  return useMutation<VerifyOtpResponse, Error, VerifyOtpRequest>({
    mutationFn: (data: VerifyOtpRequest) => otpApi.verifyOtp(data),
  })
}
