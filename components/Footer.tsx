'use client'

import { Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-obsidian-950 border-t border-bronze-600/10">
      <div className="container-editorial px-8 lg:px-16 xl:px-24 py-12">
        {/* Single Row - Ultra Minimal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-bronze rounded flex items-center justify-center">
              <span className="font-display text-lg font-light text-ivory-300">D</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base font-light leading-none text-ivory-300 tracking-wide">Dubai</span>
              <span className="text-[10px] text-bronze-500 leading-none uppercase tracking-wider">Luxury</span>
            </div>
          </div>

          {/* Social Icons - With Scale Hover */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center text-ivory-600 hover:text-bronze-500 transition-all duration-500 hover:scale-110"
                  aria-label={social.label}
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              )
            })}
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-6 text-xs text-ivory-600">
            <span className="font-light tracking-wide">
              © {currentYear} Dubai Luxury
            </span>
            <span className="text-bronze-600/30">|</span>
            <a href="#" className="font-light tracking-wide hover:text-bronze-500 transition-colors duration-500">
              Privacy
            </a>
            <a href="#" className="font-light tracking-wide hover:text-bronze-500 transition-colors duration-500">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
