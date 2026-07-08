'use client'



import { securityMockData } from '../data/security.mock'

import ActiveSessionsCard from '../components/active-sessions-card'
import PasswordLoginCard from '../components/password-login-card'
import SecurityActivityCard from '../components/security-activity-card'
import SecurityStatusCard from '../components/security-status-card'
import SecuritySupportCard from '../components/security-support-card'

export default function SecurityPage() {
  return (
    <div className="min-h-full bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Security Settings
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Manage your account access and login security.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
          <div className="space-y-6">
            <PasswordLoginCard
              passwordStatus={securityMockData.passwordStatus}
              lastPasswordChanged={securityMockData.lastPasswordChanged}
              passwordPolicy={securityMockData.passwordPolicy}
            />

            <ActiveSessionsCard sessions={securityMockData.sessions} />

            <SecurityActivityCard activities={securityMockData.activities} />
          </div>

          <div className="space-y-6">
            <SecurityStatusCard />

            <SecuritySupportCard />
          </div>
        </div>
      </div>
    </div>
  )
}