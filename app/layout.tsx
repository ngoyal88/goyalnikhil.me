import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import CustomCursor from '@/components/CustomCursor'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Nikhil Goyal — AI Engineer & Software Developer',
  description:
    'AI Engineer & Software Developer. B.E. CSE @ Thapar 2026. Building RAG pipelines, voice agents, and low-latency systems. LeetCode top 8%, competitive programmer.',
  keywords: [
    'AI engineer',
    'software developer',
    'RAG pipelines',
    'LLMs',
    'FastAPI',
    'C++',
    'competitive programming',
    'Thapar',
    'Nikhil Goyal',
  ],
  authors: [{ name: 'Nikhil Goyal' }],
  creator: 'Nikhil Goyal',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Nikhil Goyal — AI Engineer & Software Developer',
    description: 'Building RAG pipelines, voice agents, and low-latency systems.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nikhil Goyal — AI Engineer & Software Developer',
    description: 'Building RAG pipelines, voice agents, and low-latency systems.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  themeColor: '#5c5cff',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <CustomCursor />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
