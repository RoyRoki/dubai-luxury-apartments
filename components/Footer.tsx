'use client'

import { Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'

import { getAssetPath } from '@/lib/utils'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  const navLinks = [
    { name: 'Properties', href: '#properties' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Location', href: '#location' },
    { name: 'Investment', href: '#investment' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="bg-obsidian-950 border-t border-bronze-600/10 pt-20 pb-10">
      <div className="container-editorial px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-6">
            <div className="relative w-32 h-16 -ml-2">
              <Image
                src={getAssetPath('/logo.webp')}
                alt="Dubai Luxury"
                fill
                className="object-contain" // object-contain to ensure it fits and doesn't crop
              />
            </div>
            <p className="text-ivory-500 font-light leading-relaxed text-sm max-w-xs">
              Curating the world&apos;s most exceptional properties for those who accept nothing less than perfection. A legacy of excellence in Dubai real estate.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-bronze-500 text-xs uppercase tracking-[0.2em] font-light mb-8">
              Explore
            </h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-ivory-400 hover:text-bronze-400 transition-colors duration-300 font-light text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-bronze-500 text-xs uppercase tracking-[0.2em] font-light mb-8">
              Private Office
            </h4>
            <div className="space-y-4 text-sm text-ivory-400 font-light">
              <p>
                Level 148, Burj Khalifa<br />
                Downtown Dubai, UAE
              </p>
              <p>
                <a href="mailto:concierge@dubailuxury.com" className="hover:text-bronze-400 transition-colors">
                  concierge@dubailuxury.com
                </a>
              </p>
              <p>
                <a href="tel:+971501234567" className="hover:text-bronze-400 transition-colors">
                  +971 50 123 4567
                </a>
              </p>
            </div>
          </div>

          {/* Column 4: Legal & Disclaimer */}
          <div>
            <h4 className="text-bronze-500 text-xs uppercase tracking-[0.2em] font-light mb-8">
              Important Notice
            </h4>
            <div className="space-y-4 text-xs text-ivory-600 font-light leading-relaxed">
              <p>
                RERA ORN: 12345 | BRN: 67890
              </p>
              <p>
                All images and renders are for illustrative purposes only. Prices and availability are subject to change without prior notice.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-bronze-600/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ivory-600 hover:text-bronze-500 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </a>
              )
            })}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs text-ivory-700 font-light">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <span>© {currentYear} Dubai Luxury. All rights reserved.</span>
              <span className="hidden md:inline text-bronze-600/30">|</span>
              <span>
                Developed by <a href="https://www.linkedin.com/in/rokiroy/" target="_blank" rel="noopener noreferrer" className="hover:text-bronze-500 transition-colors font-normal">ROKI ROY</a>
              </span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-bronze-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-bronze-500 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
