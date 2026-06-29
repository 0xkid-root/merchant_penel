'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { loginAction, logoutAction } from '../server-actions'
import { LoginCredentials, AuthState } from '../types'
import { MERCHANT_ROUTES, AUTH_ROUTES } from '@/lib/constants'

const INITIAL_STATE: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
}

export function useAuth() {
  const router = useRouter()
  const [state, setState] = useState<AuthState>(INITIAL_STATE)

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken')
      const user = localStorage.getItem('user')

      if (token && user) {
        try {
          setState(prev => ({
            ...prev,
            user: JSON.parse(user),
            isAuthenticated: true,
          }))
        } catch (error) {
          localStorage.removeItem('authToken')
          localStorage.removeItem('user')
        }
      }
    }

    checkAuth()
  }, [])

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      try {
        const response = await loginAction(credentials)

        if (!response.success) {
          const errorMessage = response.error?.message || 'Login failed'
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: errorMessage,
          }))
          toast.error(errorMessage)
          return
        }

        const { user, token } = response.data

        // Store auth data
        localStorage.setItem('authToken', token)
        localStorage.setItem('user', JSON.stringify(user))

        if (credentials.rememberMe) {
          localStorage.setItem('rememberEmail', credentials.email)
        }

        setState(prev => ({
          ...prev,
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        }))

        toast.success('Login successful! Welcome back.')
        router.push(MERCHANT_ROUTES.DASHBOARD)
      } catch (error) {
        const errorMessage = 'An unexpected error occurred'
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        toast.error(errorMessage)
      }
    },
    [router]
  )

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }))

    try {
      const response = await logoutAction()

      if (!response.success) {
        toast.error(response.error?.message || 'Logout failed')
        return
      }

      // Clear auth data
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')

      setState(INITIAL_STATE)
      toast.success('Logged out successfully')
      router.push(AUTH_ROUTES.LOGIN)
    } catch (error) {
      toast.error('Failed to logout')
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }, [router])

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  return {
    ...state,
    login,
    logout,
    clearError,
  }
}
