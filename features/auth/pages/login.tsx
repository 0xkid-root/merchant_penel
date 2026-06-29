'use client'

import Image from 'next/image'
import { LoginForm } from '../components/login-form'

export function AuthLoginPage() {
  return (
    <main className="min-h-screen bg-[#F6F4FF] p-5">
      <div className="mx-auto h-[calc(100vh-40px)] max-w-[1880px] overflow-hidden rounded-[28px] bg-white shadow-2xl">

        <div className="grid h-full grid-cols-1 lg:grid-cols-[46%_54%]">

          {/* LEFT */}
          <div className="bg-white">
            <LoginForm />
          </div>

          {/* RIGHT */}
          <div className="relative hidden lg:block bg-[#F5F3FF]">

            <Image
              src="/loginsection-image.png"
              alt="Login Illustration"
              fill
              priority
              className="object-cover object-center"
            />

          </div>

        </div>

      </div>
    </main>
  )
}