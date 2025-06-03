import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientBody from './ClientBody'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SOC Events - Entdecke unsere Events',
  description: 'Entdecke die besten Events und kaufe deine Tickets online bei SOC Events',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <ClientBody className={inter.className}>
        {children}
      </ClientBody>
    </html>
  )
}
