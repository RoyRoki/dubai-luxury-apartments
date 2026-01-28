import type { Metadata } from 'next'
import { Inter, Playfair_Display, Sora, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant'
})

export const metadata: Metadata = {
  title: 'Dubai Luxury Apartments | Premium Properties in Prime Locations',
  description: 'Discover exclusive luxury apartments in Dubai\'s most prestigious locations - Downtown, Marina, and Palm Jumeirah. Schedule your viewing today.',
  keywords: 'Dubai luxury apartments, premium properties Dubai, Downtown Dubai, Dubai Marina, Palm Jumeirah, luxury real estate',
  icons: {
    icon: '/logo.webp',
    shortcut: '/logo.webp',
    apple: '/logo.webp',
  },
  openGraph: {
    title: 'Dubai Luxury Apartments | Premium Properties',
    description: 'Exclusive luxury living in Dubai\'s prime locations',
    images: ['/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${sora.variable} ${cormorant.variable} font-sans antialiased bg-obsidian-950 text-ivory-300`}>
        {children}
      </body>
    </html>
  )
}
