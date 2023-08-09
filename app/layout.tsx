import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Fathom from './fathom'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Recast — Convert anything to anything',
  description: 'Convert any file to anything online. Fast, free, and easy.',
  viewport: 'initial-scale=1, viewport-fit=cover',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Fathom />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
