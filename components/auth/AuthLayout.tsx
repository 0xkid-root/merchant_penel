'use client'

import Image from 'next/image'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#F6F4FF] p-0 sm:p-5">
      <div className="min-h-screen overflow-hidden bg-white sm:min-h-[calc(100vh-40px)] sm:rounded-[22px]">
        <div className="grid min-h-screen lg:min-h-[calc(100vh-40px)] lg:grid-cols-[46%_54%]">
          <div className="flex min-h-screen items-center justify-center bg-white lg:min-h-[calc(100vh-40px)]">
            {children}
          </div>

          <div className="relative hidden bg-[#F5F3FF] lg:block">
            <Image
              src="/loginsection-image.png"
              alt="AtMoonPe merchant dashboard"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  )
}