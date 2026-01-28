'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, Award, Users, TrendingUp, CheckCircle, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const developers = [
  {
    name: 'Emaar Properties',
    logo: 'EMAAR',
    tagline: 'Shaping the Dubai skyline since 1997',
    projects: '85+ Luxury Developments',
    awards: 'Best Developer Award 2023',
    credentials: ['Burj Khalifa', 'Dubai Mall', 'Dubai Marina'],
  },
  {
    name: 'DAMAC Properties',
    logo: 'DAMAC',
    tagline: 'Luxury living at its finest',
    projects: '45,000+ Homes Delivered',
    awards: 'International Property Award',
    credentials: ['DAMAC Hills', 'Aykon City', 'DAMAC Lagoons'],
  },
  {
    name: 'Meraas',
    logo: 'MERAAS',
    tagline: 'Innovation meets heritage',
    projects: '20+ Iconic Destinations',
    awards: 'Excellence in Design 2024',
    credentials: ['Bluewaters', 'City Walk', 'La Mer'],
  },
  {
    name: 'Nakheel',
    logo: 'NAKHEEL',
    tagline: 'Master developers of Dubai',
    projects: '50+ Residential Communities',
    awards: 'Master Developer of the Year',
    credentials: ['Palm Jumeirah', 'Jumeirah Village', 'The World'],
  },
  {
    name: 'Dubai Properties',
    logo: 'DP',
    tagline: 'Building communities, enriching lives',
    projects: '30+ Premium Projects',
    awards: 'Customer Excellence Award',
    credentials: ['Jumeirah Beach Residence', 'Dubai Wharf', 'Marasi'],
  },
  {
    name: 'Omniyat',
    logo: 'OMNIYAT',
    tagline: 'Ultra-luxury by design',
    projects: '15+ Ultra-Luxury Properties',
    awards: 'Arabian Property Award',
    credentials: ['The Opus', 'ONE Palm', 'Sterling West'],
  },
]

export default function DeveloperPartners() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate developer cards
      gsap.utils.toArray<HTMLElement>('.developer-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section bg-obsidian-900 px-4 md:px-6 lg:px-8 py-24 lg:py-40"
      id="developers"
    >
      <div className="container-custom max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <p className="text-bronze-500 text-xs md:text-sm uppercase tracking-[0.3em] font-light mb-6">
            Trusted Excellence
          </p>
          <h2 className="heading-xl mb-8 text-ivory-100">
            Developer Partners
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-bronze-500 to-transparent mb-8 opacity-50 mx-auto" />
          <p className="text-base md:text-xl text-ivory-400 font-light leading-relaxed tracking-wide max-w-3xl mx-auto">
            We collaborate with Dubai's most prestigious developers—names synonymous with excellence, innovation, and uncompromising quality.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 lg:mb-24">
          <div className="text-center p-6 bg-obsidian-950/60 border border-bronze-500/10">
            <Building2 className="w-8 h-8 mx-auto mb-4 text-bronze-500" strokeWidth={1.5} />
            <p className="text-3xl lg:text-4xl font-light text-ivory-100 mb-2">200+</p>
            <p className="text-xs uppercase tracking-wider text-ivory-500">Projects Delivered</p>
          </div>
          <div className="text-center p-6 bg-obsidian-950/60 border border-bronze-500/10">
            <Award className="w-8 h-8 mx-auto mb-4 text-bronze-500" strokeWidth={1.5} />
            <p className="text-3xl lg:text-4xl font-light text-ivory-100 mb-2">50+</p>
            <p className="text-xs uppercase tracking-wider text-ivory-500">International Awards</p>
          </div>
          <div className="text-center p-6 bg-obsidian-950/60 border border-bronze-500/10">
            <Users className="w-8 h-8 mx-auto mb-4 text-bronze-500" strokeWidth={1.5} />
            <p className="text-3xl lg:text-4xl font-light text-ivory-100 mb-2">100K+</p>
            <p className="text-xs uppercase tracking-wider text-ivory-500">Satisfied Residents</p>
          </div>
          <div className="text-center p-6 bg-obsidian-950/60 border border-bronze-500/10">
            <TrendingUp className="w-8 h-8 mx-auto mb-4 text-bronze-500" strokeWidth={1.5} />
            <p className="text-3xl lg:text-4xl font-light text-ivory-100 mb-2">25%</p>
            <p className="text-xs uppercase tracking-wider text-ivory-500">Avg ROI Growth</p>
          </div>
        </div>

        {/* Developer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {developers.map((developer, index) => (
            <div
              key={index}
              className="developer-card group relative bg-obsidian-950/40 border border-bronze-500/10 hover:border-bronze-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-bronze-500/0 via-bronze-500/0 to-bronze-500/0 group-hover:from-bronze-500/5 group-hover:via-bronze-500/10 group-hover:to-bronze-500/5 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 p-8">
                {/* Logo */}
                <div className="mb-6 h-16 flex items-center justify-center bg-bronze-500/10 group-hover:bg-bronze-500/20 transition-all duration-300">
                  <span className="text-2xl font-light text-bronze-500 tracking-[0.2em]">
                    {developer.logo}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-xl lg:text-2xl font-light text-ivory-100 mb-3 group-hover:text-bronze-400 transition-colors duration-300">
                  {developer.name}
                </h3>

                {/* Tagline */}
                <p className="text-sm text-ivory-500 mb-6 font-light italic">
                  {developer.tagline}
                </p>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-bronze-500 flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <p className="text-sm text-ivory-400">{developer.projects}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-bronze-500 flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <p className="text-sm text-ivory-400">{developer.awards}</p>
                  </div>
                </div>

                {/* Credentials */}
                <div className="space-y-2 mb-6">
                  <p className="text-xs uppercase tracking-wider text-bronze-500 mb-3">Notable Projects</p>
                  {developer.credentials.map((credential, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-3 h-3 text-bronze-500" strokeWidth={2} />
                      <p className="text-xs text-ivory-500">{credential}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full flex items-center justify-center gap-2 py-3 border border-bronze-500/30 text-bronze-500 hover:bg-bronze-500/10 transition-all duration-300 text-sm uppercase tracking-wider">
                  View Portfolio
                  <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 lg:mt-24 text-center p-8 lg:p-12 bg-obsidian-950/60 border border-bronze-500/10">
          <CheckCircle className="w-12 h-12 mx-auto mb-6 text-bronze-500" strokeWidth={1.5} />
          <h3 className="text-2xl lg:text-3xl font-light text-ivory-100 mb-4">
            Verified Excellence
          </h3>
          <p className="text-base text-ivory-400 max-w-2xl mx-auto font-light leading-relaxed">
            Every developer we partner with undergoes rigorous due diligence. We verify credentials, track records, and ensure alignment with our uncompromising standards of quality and integrity.
          </p>
        </div>
      </div>
    </section>
  )
}
