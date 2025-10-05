import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { CyberpunkHeader } from '@/components/cyberpunk-header'
import './globals.css'

export const metadata: Metadata = {
  title: 'HelpDesk System',
  description: 'Next-generation cyberpunk helpdesk and ticket management system',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-black text-white`}>
        <CyberpunkHeader />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
