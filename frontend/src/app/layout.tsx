import { Inter } from 'next/font/google'
import { Navigation } from '@/components/layout/Navigation'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'TaxMate - AI-Powered Tax Management',
  description: 'Streamline your tax management with AI-powered insights and automation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
