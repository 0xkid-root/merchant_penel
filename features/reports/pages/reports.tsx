'use client'

import { useState } from 'react'
import { Download, Calendar, Filter, TrendingUp } from 'lucide-react'
import { PrimaryButton } from '@/components/buttons/primary-button'
import { SecondaryButton } from '@/components/buttons/secondary-button'

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [reportType, setReportType] = useState('all')

  const reportOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'payouts', label: 'Payouts Only' },
    { value: 'deposits', label: 'Deposits Only' },
    { value: 'withdrawals', label: 'Withdrawals Only' },
  ]

  const mockReportData = [
    { period: 'June 2025', transactions: 245, amount: 2612500, status: 'completed' },
    { period: 'May 2025', transactions: 189, amount: 1956800, status: 'completed' },
    { period: 'April 2025', transactions: 156, amount: 1645300, status: 'completed' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '32px' }}>
          Reports
        </h1>
        <p className="text-gray-600 mt-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '15px' }}>
          Download and view detailed transaction reports
        </p>
      </div>

      {/* Report Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <h3 className="text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '18px' }}>
          Generate Report
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Report Type */}
          <div className="space-y-2">
            <label className="block text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}
            >
              {reportOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <label className="block text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="block text-gray-900" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px' }}>
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: '14px' }}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <PrimaryButton>
            <Download className="w-4 h-4" />
            Generate Report
          </PrimaryButton>
          <SecondaryButton>Reset</SecondaryButton>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-gray-900 mb-6" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '18px' }}>
          Available Reports
        </h3>

        <div className="space-y-3">
          {mockReportData.map((report, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '15px' }}>
                    {report.period}
                  </p>
                  <p className="text-gray-600 text-sm mt-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}>
                    {report.transactions} transactions • ₹{report.amount.toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '14px' }}
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Report Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Transactions (This Month)', value: '245', trend: '+12%' },
          { label: 'Total Amount Processed', value: '₹26.1L', trend: '+8%' },
          { label: 'Average Transaction Value', value: '₹10,663', trend: '-2%' },
        ].map((insight, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
              {insight.label}
            </p>
            <p className="text-gray-900 text-2xl mt-3" style={{ fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
              {insight.value}
            </p>
            <p className="text-green-600 text-sm mt-2" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              {insight.trend} from last month
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
