'use client'

import {
    KeyRound,
    MonitorSmartphone,
    ShieldCheck,
} from 'lucide-react'

import type {
    SecurityTab,
    SecurityTabId,
} from '../types/security.types'

interface SecurityTabsProps {
    tabs: SecurityTab[]
    activeTab: SecurityTabId
    onChange: (tab: SecurityTabId) => void
}

const tabIcons = {
    password: KeyRound,
    sessions: MonitorSmartphone,
    activity: ShieldCheck,
}

export default function SecurityTabs({
    tabs,
    activeTab,
    onChange,
}: SecurityTabsProps) {
    return (
        <div className="border-b border-slate-200">
            <div className="flex items-center gap-7 overflow-x-auto">
                {tabs.map((tab) => {
                    const Icon = tabIcons[tab.id]
                    const isActive = activeTab === tab.id

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onChange(tab.id)}
                            className={`relative flex shrink-0 items-center gap-2 px-1 pb-4 text-sm font-medium transition-colors ${isActive
                                    ? 'text-indigo-600'
                                    : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            <Icon className="h-5 w-5" />

                            {tab.label}

                            {isActive && (
                                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-indigo-600" />
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}