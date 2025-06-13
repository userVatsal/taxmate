import { Inter } from 'next/font/google'
import { Navigation } from '@/components/layout/Navigation'
import { PostHogProvider } from '@/components/providers/PostHogProvider'
import { SentryProvider } from '@/components/providers/SentryProvider'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'TaxMate - AI-Powered UK Tax Assistant',
  description: 'Automate your tax management with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <SentryProvider>
          <PostHogProvider>
            <Navigation />
            <main>{children}</main>
          </PostHogProvider>
        </SentryProvider>
      </body>
    </html>
  )
}
