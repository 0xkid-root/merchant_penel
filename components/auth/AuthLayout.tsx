'use client'

import Image from 'next/image'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-[#F6F4FF] p-5">

      <div className="h-[calc(100vh-40px)] overflow-hidden rounded-[22px] bg-white shadow-sm">

        <div className="grid h-full lg:grid-cols-[46%_54%]">

          {/* LEFT */}

          <div className="bg-white flex items-center justify-center">
            {children}
          </div>

          {/* RIGHT */}

          <div className="relative hidden lg:block bg-[#F5F3FF]">

            <Image
              src="/loginsection-image.png"
              alt="Login"
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