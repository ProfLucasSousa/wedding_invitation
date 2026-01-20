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
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
