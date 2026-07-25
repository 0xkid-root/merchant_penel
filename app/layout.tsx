import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'
import ReactQueryProvider from "@/lib/react-query/ReactQueryProvider";

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'AtMoonPe - Merchant Panel',
  description: 'All Your Payouts. One Powerful Platform.',
  generator: 'AtMoonPe.com',

}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} bg-slate-50`}>
      <body className="font-sans antialiased bg-slate-50">
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
        <Toaster />

      </body>
    </html>
  )
}
