import type { Metadata } from 'next'
import { Inter, Playfair_Display, Sora, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { getAssetPath } from '@/lib/utils'
import ImagePreloader from '@/components/ImagePreloader'

// Define fonts with variable names for Tailwind usage
// Inter - consistently modern sans
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

// Playfair Display - elegant serif for headings
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const sora = Sora({ subsets: ['latin'], variable: '--font-sora' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant'
})

export const metadata: Metadata = {
  title: 'Dubai Luxury Apartments | Premium Properties',
  description: 'Exclusive luxury living in Dubai\'s prime locations',
  icons: {
    icon: getAssetPath('/logo.webp'),
    shortcut: getAssetPath('/logo.webp'),
    apple: getAssetPath('/logo.webp'),
  },
  openGraph: {
    title: 'Dubai Luxury Apartments | Premium Properties',
    description: 'Exclusive luxury living in Dubai\'s prime locations',
    images: [getAssetPath('/logo.png')],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${sora.variable} ${cormorant.variable} font-sans antialiased bg-obsidian-950 text-ivory-300 selection:bg-bronze-500 selection:text-white`}>
        <ImagePreloader />
        {children}
      </body>
    </html>
  )
}
