'use client'

import Link from 'next/link'
import { User, HelpCircle, LogOut, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  onClose: () => void
}

export default function ProfileDropdown({ onClose }: Props) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userEmail')
    router.push('/')
  }

  return (
    <div className="absolute right-0 top-16 w-52 rounded-xl border border-slate-200 bg-white shadow-lg">

      <Link
        href="/profile"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50"
      >
        <User className="h-5 w-5 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">
          Profile
        </span>
      </Link>


      <Link
        href="/security"
        className='flex items-center gap-3 px-4 py-3 hover:bg-slate-50'
      >
        <Lock className="h-5 w-5 text-slate-500" />
        <span className='text-sm font-medium text-slate-700'>
          Security
        </span>
      </Link>

      <Link
        href="/support"
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50"
      >
        <HelpCircle className="h-5 w-5 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">
          Support
        </span>
      </Link>

      <button
        onClick={handleLogout}
        className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
      >
        <LogOut className="h-5 w-5" />
        <span className="text-sm font-medium">
          Logout
        </span>
      </button>

    </div>
  )
}