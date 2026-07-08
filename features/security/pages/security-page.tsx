'use client'

import ActiveSessionsCard from '../components/active-sessions-card'
import PasswordLoginCard from '../components/password-login-card'
import SecurityActivityCard from '../components/security-activity-card'
import SecurityStatusCard from '../components/security-status-card'
import SecurityTabs from '../components/security-tabs'

import {
  loginSessions,
  passwordSecurityData,
  securityActivities,
  securityStatusData,
  securitySupportData,
  securityTabs,
} from '../data/security.mock'

import { useSecurity } from '../hooks/use-security'

export default function SecurityPage() {
  const {
    activeTab,
    setActiveTab,
    handleChangePassword,
    handleLogoutOtherDevices,
    handleContactSupport,
  } = useSecurity()

  return (
    <div className="min-h-full bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-9">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Security Settings
          </h1>

          <p className="mt-3 text-base text-slate-500">
            Manage your account access and login security.
          </p>
        </div>

        <SecurityTabs
          tabs={securityTabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-8 grid gap-7 xl:grid-cols-[minmax(0,1.75fr)_minmax(320px,0.8fr)]">
          <div className="space-y-7">
            {activeTab === 'password' && (
              <PasswordLoginCard
                data={passwordSecurityData}
                onChangePassword={handleChangePassword}
              />
            )}

            {activeTab === 'sessions' && (
              <ActiveSessionsCard
                sessions={loginSessions}
                onLogoutOtherDevices={handleLogoutOtherDevices}
              />
            )}

            {activeTab === 'activity' && (
              <SecurityActivityCard
                activities={securityActivities}
              />
            )}
          </div>

          <div className="space-y-7">
            <SecurityStatusCard data={securityStatusData} />

          </div>
        </div>
      </div>
    </div>
  )
}