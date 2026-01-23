import React from "react"
import type { Metadata } from 'next'
import { Great_Vibes, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const greatVibes = Great_Vibes({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-cursive'
});

const cormorant = Cormorant_Garamond({ 
  weight: ['400', '500', '600'],
  subsets: ["latin"],
  variable: '--font-serif'
});

export const metadata: Metadata = {
  title: 'Convite de Casamento - Altamir Júnior & Gleise Ribeiro',
  description: 'Convite digital de casamento',
  generator: 'v0.app',
  icons: {
    icon: '/images/wedding-ring.png',
    apple: '/images/wedding-ring.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${greatVibes.variable} ${cormorant.variable} font-serif antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
