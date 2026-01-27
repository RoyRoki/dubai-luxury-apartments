'use client'

import { useEffect, useRef } from 'react'
import { fadeInOnScroll } from '@/lib/animations'

export default function LegacyPartners() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    fadeInOnScroll('.partner-logo', { y: 40, duration: 1, stagger: 0.1 })
  }, [])

  // Prestigious Dubai developers
  const partners = [
    { name: 'Emaar Properties', opacity: 0.6 },
    { name: 'OMNIYAT', opacity: 0.6 },
    { name: 'Binghatti', opacity: 0.6 },
    { name: 'DAMAC Properties', opacity: 0.6 },
    { name: 'Nakheel', opacity: 0.6 },
    { name: 'Sobha Realty', opacity: 0.6 },
  ]

  return (
    <section ref={sectionRef} className="section bg-obsidian-900 relative overflow-hidden">
      {/* Subtle radial accent */}
      <div className="absolute inset-0 bg-radial-gradient from-bronze-900/5 via-transparent to-transparent" />

      <div className="container-editorial relative">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-bronze-500 text-xs md:text-sm uppercase tracking-[0.3em] font-light mb-6">
            Trusted Excellence
          </p>
          <h2 className="heading-lg text-ivory-300 mb-6 tracking-wide">
            <span className="text-bronze">Legacy</span> Partners
          </h2>
          <p className="text-base md:text-lg text-ivory-500 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            Collaborating with Dubai&apos;s most distinguished developers.
          </p>
        </div>

        {/* Logo Grid - Grayscale with Bronze Hover */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="partner-logo flex items-center justify-center group cursor-pointer"
            >
              {/* Text-based logos (replace with actual SVG logos if available) */}
              <div className="text-center transition-all duration-500 grayscale group-hover:grayscale-0">
                <div
                  className="text-ivory-400/60 group-hover:text-bronze-500 font-display text-lg md:text-xl font-light tracking-wide transition-colors duration-500"
                  style={{ opacity: partner.opacity }}
                >
                  {partner.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote Section - Single Anonymous Quote */}
        <div className="mt-20 md:mt-32 max-w-4xl mx-auto text-center">
          <div className="card-luxury p-10 md:p-16">
            <div className="mb-6">
              <svg
                className="w-12 h-12 text-bronze-500/30 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
              </svg>
            </div>
            <p className="text-2xl md:text-3xl lg:text-4xl font-display font-light text-ivory-400 leading-relaxed italic mb-8">
              A residence worthy of the horizon.
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-[1px] bg-bronze-600/30" />
              <p className="text-sm text-bronze-500 uppercase tracking-[0.3em] font-light">
                Anonymous, 2025
              </p>
              <div className="w-16 h-[1px] bg-bronze-600/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
