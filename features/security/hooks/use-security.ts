'use client'

import { useState } from 'react'

import type { SecurityTabId } from '../types/security.types'

export function useSecurity() {
  const [activeTab, setActiveTab] = useState<SecurityTabId>('password')

  const handleChangePassword = () => {
    console.log('Change password clicked')
  }

  const handleLogoutOtherDevices = () => {
    console.log('Logout other devices clicked')
  }

  const handleContactSupport = () => {
    console.log('Contact support clicked')
  }

  return {
    activeTab,
    setActiveTab,
    handleChangePassword,
    handleLogoutOtherDevices,
    handleContactSupport,
  }
}