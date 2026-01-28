'use client'

import { useState, useEffect, RefObject } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { scrollToElement } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import type Lenis from '@studio-freight/lenis'
import ViewingFormCard from './ViewingFormCard'

interface HeaderProps {
  lenisInstance?: RefObject<Lenis | null>
}

export default function Header({ lenisInstance }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  useEffect(() => {
    // FIXED: Use Lenis scroll event instead of window.addEventListener
    if (lenisInstance?.current) {
      const lenis = lenisInstance.current
      const handleScroll = (e: any) => {
        setIsScrolled(e.scroll > 50)
      }
      lenis.on('scroll', handleScroll)

      return () => {
        lenis.off('scroll', handleScroll)
      }
    } else {
      // Fallback to window scroll if Lenis not available
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50)
      }
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [lenisInstance])

  const pathname = usePathname()
  const router = useRouter()

  interface NavLink {
    name: string
    href: string
    isPage?: boolean
  }

  const navLinks: NavLink[] = [
    { name: 'Properties', href: 'properties' },
    { name: 'Developers', href: 'developers' },
    { name: 'Location', href: 'location' },
    { name: 'Investment', href: 'investment' },
    { name: 'FAQ', href: 'faq' },
  ]

  const handleNavClick = (href: string, isPage = false) => {
    if (isPage) {
      router.push(`/${href}`)
      setIsMobileMenuOpen(false)
      return
    }

    // Handle home/logo click - scroll to top
    if (href === '/' || href === '') {
      if (pathname !== '/') {
        router.push('/')
      } else if (lenisInstance?.current) {
        lenisInstance.current.scrollTo(0, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      setIsMobileMenuOpen(false)
      return
    }

    if (pathname !== '/') {
      router.push(`/#${href}`)
      setIsMobileMenuOpen(false)
      return
    }

    if (lenisInstance?.current) {
      lenisInstance.current.scrollTo(`#${href}`, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      scrollToElement(href)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-obsidian-950/98 backdrop-blur-xl shadow-2xl shadow-bronze-500/10 border-b border-bronze-600/10'
        : 'bg-obsidian-950/40 backdrop-blur-md border-b border-bronze-600/5'
        }`}
    >
      <nav className="container-custom flex items-center justify-between py-4 md:py-6 px-4 sm:px-6 lg:px-8">
        {/* Logo - With Metallic Hover */}
        <div className="flex items-center space-x-2 group/logo cursor-pointer" onClick={() => handleNavClick('/')}>
          <div className="relative w-32 h-14 md:w-40 md:h-16 transition-transform duration-500 group-hover/logo:scale-105">
            <Image
              src="/logo.webp"
              alt="Dubai Luxury"
              fill
              className="object-contain" // object-contain to ensure it fits and doesn't crop
              priority
            />
          </div>
        </div>

        {/* Desktop Navigation - FIXED: Collapsed at 1024px to prevent tablet crowding */}
        <ul className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href, link.isPage)}
                className="text-ivory-400 hover:text-bronze-500 transition-colors duration-500 font-light text-sm xl:text-base uppercase tracking-wider"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Button - Desktop - FIXED: Hidden on tablet, shown only on large screens */}
        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="hidden lg:flex items-center space-x-2 btn-primary text-sm xl:text-base"
        >
          <Phone size={18} />
          <span>Book Viewing</span>
        </button>

        {/* Mobile Menu Button - FIXED: Shows on tablet (lg breakpoint) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-ivory-300 p-2 hover:text-bronze-500 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu - FIXED: Added solid background, strong backdrop, proper z-index, shows on tablet */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-obsidian-950/95 backdrop-blur-xl border-t border-bronze-600/30 shadow-2xl shadow-black/50 transition-all duration-300 z-[100] ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
      >
        <ul className="flex flex-col space-y-4 p-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href, link.isPage)}
                className="text-ivory-400 hover:text-bronze-500 transition-colors duration-500 font-light text-lg w-full text-left uppercase tracking-wide"
              >
                {link.name}
              </button>
            </li>
          ))}
          <li className="pt-4 border-t border-bronze-600/20">
            <button
              onClick={() => {
                setIsBookingModalOpen(true)
                setIsMobileMenuOpen(false)
              }}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Phone size={18} />
              <span>Book Viewing</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsBookingModalOpen(false)}
          />
          <div className="relative w-full max-w-5xl animate-in fade-in zoom-in-95 duration-300">
            <ViewingFormCard onClose={() => setIsBookingModalOpen(false)} isModal />
          </div>
        </div>
      )}
    </header>
  )
}
