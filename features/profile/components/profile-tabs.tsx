'use client'

import type { LucideIcon } from 'lucide-react'

type ProfileTab = {
    id: string
    label: string
    icon: LucideIcon
}

interface ProfileTabsProps {
    tabs: ProfileTab[]
    activeTab: string
    onTabChange: (tabId: string) => void
}

export default function ProfileTabs({
    tabs,
    activeTab,
    onTabChange,
}: ProfileTabsProps) {
    return (<div className="border-b border-slate-200"> <div className="flex gap-6 overflow-x-auto">
        {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
                <button
                    key={tab.id}
                    type="button"
                    onClick={() => onTabChange(tab.id)}
                    className={`flex shrink-0 items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium transition ${isActive
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-slate-500 hover:text-slate-900'
                        }`}
                >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                </button>
            )
        })}
    </div>
    </div>

    )
}
