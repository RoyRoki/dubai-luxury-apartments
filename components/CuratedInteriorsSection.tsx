'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Home, Lock, Mic, Zap, Sparkles, Hammer, Paintbrush, Package,
  Sofa, Palette, Lightbulb, Frame, Leaf, Droplet, Award, Sun,
  ChevronLeft, ChevronRight
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = {
  smartHome: [
    {
      icon: Home,
      title: 'Climate Control AI',
      description: 'Intelligent temperature and humidity management that learns your preferences'
    },
    {
      icon: Lock,
      title: 'Security Systems',
      description: '24/7 biometric access, smart locks, and integrated monitoring'
    },
    {
      icon: Mic,
      title: 'Voice Control',
      description: 'Seamless voice commands for lights, blinds, and entertainment'
    },
    {
      icon: Zap,
      title: 'Energy Management',
      description: 'Smart meters and automated energy optimization for sustainability'
    }
  ],
  materials: [
    {
      icon: Sparkles,
      title: 'Italian Marble',
      description: 'Calacatta Gold and Statuario sourced from Carrara quarries'
    },
    {
      icon: Hammer,
      title: 'Premium Hardwood',
      description: 'European oak and walnut with hand-applied finishes'
    },
    {
      icon: Paintbrush,
      title: 'Custom Fixtures',
      description: 'Bespoke hardware from renowned European artisans'
    },
    {
      icon: Package,
      title: 'Designer Hardware',
      description: 'Premium faucets, handles, and fittings from Dornbracht and Vola'
    }
  ],
  furniture: [
    {
      icon: Sofa,
      title: 'Designer Collections',
      description: 'Curated pieces from Minotti, B&B Italia, and Poltrona Frau'
    },
    {
      icon: Palette,
      title: 'Art Curation',
      description: 'Original works from emerging and established contemporary artists'
    },
    {
      icon: Frame,
      title: 'Bespoke Pieces',
      description: 'Custom furniture designed exclusively for your residence'
    },
    {
      icon: Lightbulb,
      title: 'Lighting Design',
      description: 'Statement fixtures from Flos, Artemide, and custom installations'
    }
  ],
  sustainability: [
    {
      icon: Leaf,
      title: 'Eco Materials',
      description: 'Sustainably sourced timber, recycled metals, and low-VOC finishes'
    },
    {
      icon: Sun,
      title: 'Energy Efficiency',
      description: 'Solar panels, LED lighting, and smart energy management systems'
    },
    {
      icon: Award,
      title: 'Green Certifications',
      description: 'LEED Platinum and WELL Building Standard certified'
    },
    {
      icon: Droplet,
      title: 'Water Conservation',
      description: 'Rainwater harvesting and greywater recycling systems'
    }
  ]
}

export default function CuratedInteriorsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const smartHomeRef = useRef<HTMLDivElement>(null)
  const materialsRef = useRef<HTMLDivElement>(null)
  const furnitureRef = useRef<HTMLDivElement>(null)
  const sustainabilityRef = useRef<HTMLDivElement>(null)

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (!ref.current) return
    const scrollAmount = direction === 'left' ? -400 : 400
    ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate category headers only
      gsap.utils.toArray<HTMLElement>('.category-header').forEach((header) => {
        gsap.fromTo(
          header,
          {
            opacity: 0,
            x: -40,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => {
      ctx.revert() // Properly cleanup GSAP context
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section bg-obsidian-950 px-4 md:px-6 lg:px-8 py-24 lg:py-40 relative z-10"
    >
      <div className="container-custom max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 lg:mb-32">
          <p className="text-bronze-500 text-xs md:text-sm uppercase tracking-[0.3em] font-light mb-6">
            Bespoke Design
          </p>
          <h2 className="heading-xl mb-8 text-ivory-100">
            Curated Interiors
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-bronze-500 to-transparent mb-8 opacity-50 mx-auto" />
          <p className="text-base md:text-xl text-ivory-400 font-light leading-relaxed tracking-wide max-w-3xl mx-auto">
            Interiors that are not just furnished, but curated. A seamless blend of art, comfort, and technology designed to anticipate your every need.
          </p>
        </div>

        {/* Smart Home Features */}
        <div className="mb-24 lg:mb-32">
          <h3 className="category-header text-2xl md:text-3xl lg:text-4xl font-serif text-ivory-100 mb-4 flex items-center gap-3">
            <span className="w-12 h-[2px] bg-bronze-500" />
            Smart Home Features
          </h3>
          <div className="relative px-12 mt-12">
            {/* Arrow Navigation */}
            <button
              onClick={() => scroll(smartHomeRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-obsidian-900/90 border border-bronze-500/30 hover:bg-bronze-500/20 hover:border-bronze-500 transition-all duration-300 flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll(smartHomeRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-obsidian-900/90 border border-bronze-500/30 hover:bg-bronze-500/20 hover:border-bronze-500 transition-all duration-300 flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
            </button>

            <div
              ref={smartHomeRef}
              className="overflow-x-auto overflow-y-hidden -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 pb-6"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#C09A6B20 transparent' }}
            >
              <div className="cards-wrapper flex gap-6 lg:gap-8">
                {features.smartHome.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div
                      key={index}
                      className="feature-card group relative p-6 lg:p-8 bg-obsidian-900/40 border border-bronze-500/10 hover:border-bronze-500/30 transition-all duration-500 cursor-pointer flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[25vw]"
                    >
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-bronze-500/0 via-bronze-500/0 to-bronze-500/0 group-hover:from-bronze-500/5 group-hover:via-bronze-500/10 group-hover:to-bronze-500/5 transition-all duration-500 pointer-events-none" />

                      <div className="relative z-10">
                        <div className="w-14 h-14 mb-6 flex items-center justify-center bg-bronze-500/10 group-hover:bg-bronze-500/20 transition-all duration-500 group-hover:scale-110">
                          <Icon className="w-7 h-7 text-bronze-500" strokeWidth={1.5} />
                        </div>
                        <h4 className="text-lg font-light text-ivory-100 mb-3 group-hover:text-bronze-400 transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-ivory-500 leading-relaxed font-light">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Materials & Finishes */}
        <div className="mb-24 lg:mb-32">
          <h3 className="category-header text-2xl md:text-3xl lg:text-4xl font-serif text-ivory-100 mb-4 flex items-center gap-3">
            <span className="w-12 h-[2px] bg-bronze-500" />
            Materials & Finishes
          </h3>
          <div className="relative px-12 mt-12">
            <button
              onClick={() => scroll(materialsRef, 'left')}
              className="absolute -left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-obsidian-900/90 border border-bronze-500/30 hover:bg-bronze-500/20 hover:border-bronze-500 transition-all duration-300 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll(materialsRef, 'right')}
              className="absolute -right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-obsidian-900/90 border border-bronze-500/30 hover:bg-bronze-500/20 hover:border-bronze-500 transition-all duration-300 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
            </button>
            <div
              ref={materialsRef}
              className="overflow-x-auto overflow-y-hidden -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 pb-6"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#C09A6B20 transparent' }}
            >
              <div className="cards-wrapper flex gap-6 lg:gap-8">
                {features.materials.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div
                      key={index}
                      className="feature-card group relative p-6 lg:p-8 bg-obsidian-900/40 border border-bronze-500/10 hover:border-bronze-500/30 transition-all duration-500 cursor-pointer flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[25vw]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-bronze-500/0 via-bronze-500/0 to-bronze-500/0 group-hover:from-bronze-500/5 group-hover:via-bronze-500/10 group-hover:to-bronze-500/5 transition-all duration-500 pointer-events-none" />

                      <div className="relative z-10">
                        <div className="w-14 h-14 mb-6 flex items-center justify-center bg-bronze-500/10 group-hover:bg-bronze-500/20 transition-all duration-500 group-hover:scale-110">
                          <Icon className="w-7 h-7 text-bronze-500" strokeWidth={1.5} />
                        </div>
                        <h4 className="text-lg font-light text-ivory-100 mb-3 group-hover:text-bronze-400 transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-ivory-500 leading-relaxed font-light">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Furniture & Art */}
        <div className="mb-24 lg:mb-32">
          <h3 className="category-header text-2xl md:text-3xl lg:text-4xl font-serif text-ivory-100 mb-4 flex items-center gap-3">
            <span className="w-12 h-[2px] bg-bronze-500" />
            Furniture & Art
          </h3>
          <div className="relative px-12 mt-12">
            <button
              onClick={() => scroll(furnitureRef, 'left')}
              className="absolute -left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-obsidian-900/90 border border-bronze-500/30 hover:bg-bronze-500/20 hover:border-bronze-500 transition-all duration-300 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll(furnitureRef, 'right')}
              className="absolute -right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-obsidian-900/90 border border-bronze-500/30 hover:bg-bronze-500/20 hover:border-bronze-500 transition-all duration-300 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
            </button>
            <div
              ref={furnitureRef}
              className="overflow-x-auto overflow-y-hidden -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 pb-6"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#C09A6B20 transparent' }}
            >
              <div className="cards-wrapper flex gap-6 lg:gap-8">
                {features.furniture.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div
                      key={index}
                      className="feature-card group relative p-6 lg:p-8 bg-obsidian-900/40 border border-bronze-500/10 hover:border-bronze-500/30 transition-all duration-500 cursor-pointer flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[25vw]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-bronze-500/0 via-bronze-500/0 to-bronze-500/0 group-hover:from-bronze-500/5 group-hover:via-bronze-500/10 group-hover:to-bronze-500/5 transition-all duration-500 pointer-events-none" />

                      <div className="relative z-10">
                        <div className="w-14 h-14 mb-6 flex items-center justify-center bg-bronze-500/10 group-hover:bg-bronze-500/20 transition-all duration-500 group-hover:scale-110">
                          <Icon className="w-7 h-7 text-bronze-500" strokeWidth={1.5} />
                        </div>
                        <h4 className="text-lg font-light text-ivory-100 mb-3 group-hover:text-bronze-400 transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-ivory-500 leading-relaxed font-light">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability */}
        <div>
          <h3 className="category-header text-2xl md:text-3xl lg:text-4xl font-serif text-ivory-100 mb-4 flex items-center gap-3">
            <span className="w-12 h-[2px] bg-bronze-500" />
            Sustainability
          </h3>
          <div className="relative px-12 mt-12">
            <button
              onClick={() => scroll(sustainabilityRef, 'left')}
              className="absolute -left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-obsidian-900/90 border border-bronze-500/30 hover:bg-bronze-500/20 hover:border-bronze-500 transition-all duration-300 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll(sustainabilityRef, 'right')}
              className="absolute -right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-obsidian-900/90 border border-bronze-500/30 hover:bg-bronze-500/20 hover:border-bronze-500 transition-all duration-300 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
            </button>
            <div
              ref={sustainabilityRef}
              className="overflow-x-auto overflow-y-hidden -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 pb-6"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#C09A6B20 transparent' }}
            >
              <div className="cards-wrapper flex gap-6 lg:gap-8">
                {features.sustainability.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div
                      key={index}
                      className="feature-card group relative p-6 lg:p-8 bg-obsidian-900/40 border border-bronze-500/10 hover:border-bronze-500/30 transition-all duration-500 cursor-pointer flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[25vw]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-bronze-500/0 via-bronze-500/0 to-bronze-500/0 group-hover:from-bronze-500/5 group-hover:via-bronze-500/10 group-hover:to-bronze-500/5 transition-all duration-500 pointer-events-none" />

                      <div className="relative z-10">
                        <div className="w-14 h-14 mb-6 flex items-center justify-center bg-bronze-500/10 group-hover:bg-bronze-500/20 transition-all duration-500 group-hover:scale-110">
                          <Icon className="w-7 h-7 text-bronze-500" strokeWidth={1.5} />
                        </div>
                        <h4 className="text-lg font-light text-ivory-100 mb-3 group-hover:text-bronze-400 transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-ivory-500 leading-relaxed font-light">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
