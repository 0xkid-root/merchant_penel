'use client'

import { useState } from 'react'
import { CheckCircle, Lock, FileText, Users, AlertCircle, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

interface BankDetails {
  accountHolderName: string
  bankName: string
  branchName: string
  accountType: string
  upiId: string
  verificationStatus: string
}

export function AddBeneficiaryForm({ onSuccess }: { onSuccess?: () => void }) {
  const [formData, setFormData] = useState({
    beneficiaryName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    mobileNumber: '',
    emailId: '',
    remarks: '',
  })

  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null)

  const handleVerifyAccount = async () => {
    if (!formData.beneficiaryName || !formData.accountNumber || !formData.confirmAccountNumber || !formData.ifscCode) {
      toast.error('Please fill all required fields')
      return
    }

    if (formData.accountNumber !== formData.confirmAccountNumber) {
      toast.error('Account numbers do not match')
      return
    }

    setIsVerifying(true)
    await new Promise(resolve => setTimeout(resolve, 1500))

    setBankDetails({
      accountHolderName: 'Rahul Sharma',
      bankName: 'HDFC Bank',
      branchName: 'Noida Sector 18, Uttar Pradesh',
      accountType: 'Savings',
      upiId: 'rahulusharma@okhdfcbank',
      verificationStatus: 'Verified',
    })
    setIsVerified(true)
    setIsVerifying(false)
    toast.success('Account verified successfully!')
  }

  const handleSave = () => {
    if (!isVerified) {
      toast.error('Please verify account first')
      return
    }
    toast.success('Beneficiary saved successfully!')
    if (onSuccess) onSuccess()
  }

  const handleCancel = () => {
    setFormData({
      beneficiaryName: '',
      accountNumber: '',
      confirmAccountNumber: '',
      ifscCode: '',
      mobileNumber: '',
      emailId: '',
      remarks: '',
    })
    setIsVerified(false)
    setBankDetails(null)
    if (onSuccess) onSuccess()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="flex gap-8">
      {/* Main Form */}
      <div className="flex-1">
        {/* Beneficiary Name */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Beneficiary Name</label>
          <input
            type="text"
            name="beneficiaryName"
            value={formData.beneficiaryName}
            onChange={handleInputChange}
            placeholder="Enter beneficiary name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Account Number and Confirm - 2 Columns */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              placeholder="Enter account number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Account Number</label>
            <input
              type="text"
              name="confirmAccountNumber"
              value={formData.confirmAccountNumber}
              onChange={handleInputChange}
              placeholder="Re-enter account number"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* IFSC Code */}
        <div className="mb-2">
          <label className="block text-sm font-semibold text-gray-900 mb-2">IFSC Code</label>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleInputChange}
            placeholder="Enter IFSC code"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Enter correct IFSC code to auto-verify account</p>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerifyAccount}
          disabled={isVerifying || isVerified}
          className={`w-full py-3 rounded-lg font-semibold text-white mb-8 transition ${
            isVerified ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isVerifying ? 'Verifying...' : 'Verify Account'}
        </button>

        {/* Verification Card */}
        {isVerified && bankDetails && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-green-700">Account Verified Successfully</p>
                <p className="text-sm text-green-600">Bank details fetched and verified.</p>
              </div>
              <span className="text-green-600 text-sm font-semibold">Verified ✓</span>
            </div>

            {/* Bank Details 3x2 Grid */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Account Holder Name</p>
                <p className="text-sm font-semibold text-gray-900">{bankDetails.accountHolderName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Bank Name</p>
                <p className="text-sm font-semibold text-gray-900">{bankDetails.bankName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Branch Name</p>
                <p className="text-sm font-semibold text-gray-900">{bankDetails.branchName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Account Type</p>
                <p className="text-sm font-semibold text-gray-900">{bankDetails.accountType}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">UPI ID (if available)</p>
                <p className="text-sm font-semibold text-gray-900">{bankDetails.upiId}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">Verification Status</p>
                <p className="text-sm font-semibold text-green-600">Verified ✓</p>
              </div>
            </div>
          </div>
        )}

        {/* Optional Fields */}
        {isVerified && (
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Mobile Number (Optional)</label>
                <div className="flex gap-2">
                  <select className="px-3 py-2.5 border border-gray-300 rounded-lg bg-white text-sm">
                    <option>+91</option>
                  </select>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email ID (Optional)</label>
                <input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  placeholder="Enter email ID"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Remarks (Optional)</label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  placeholder="Enter remarks"
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Note Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">Note</p>
            <p className="text-sm text-blue-800">Bank details are verified using Penny Drop. Only verified beneficiaries can receive payouts.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-900 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isVerified}
            className={`px-6 py-2.5 rounded-lg font-semibold text-white ${
              isVerified ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400'
            }`}
          >
            Save Beneficiary
          </button>
        </div>
      </div>

      {/* Right Sidebar - How It Works */}
      <div className="w-80 flex-shrink-0">
        <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-6">How It Works</h3>

          {/* Step 1 */}
          <div className="flex gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 mb-1">Enter Bank Details</p>
              <p className="text-xs text-gray-600">Provide account number and IFSC code.</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 mb-1">Auto Verification</p>
              <p className="text-xs text-gray-600">We verify details using Penny Drop API.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 mb-1">Details Fetched</p>
              <p className="text-xs text-gray-600">Account holder name and bank details are fetched automatically.</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4 mb-8">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 mb-1">Save Beneficiary</p>
              <p className="text-xs text-gray-600">Once verified, you can save the beneficiary.</p>
            </div>
          </div>

          {/* Contact Support */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-3">Need help?</p>
            <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Contact Support
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
