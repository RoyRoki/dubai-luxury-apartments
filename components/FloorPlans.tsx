'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Maximize2, Bed, Bath, Ruler, Download, Eye, ChevronRight, ChevronLeft, X } from 'lucide-react'
import { getAssetPath } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const floorPlans = [
  {
    type: 'Studio',
    size: '550 sq ft',
    bedrooms: 0,
    bathrooms: 1,
    price: 'Starting from AED 850K',
    features: ['Open-plan living', 'Fitted kitchen', 'Balcony', 'Smart home ready'],
    available: '12 units',
    image: '/images/interiors/luxury-bedroom-bright.webp'
  },
  {
    type: '1 Bedroom',
    size: '780 sq ft',
    bedrooms: 1,
    bathrooms: 1,
    price: 'Starting from AED 1.2M',
    features: ['Master bedroom', 'Living & dining', 'Fitted kitchen', 'Balcony', 'Storage room'],
    available: '18 units',
    image: '/images/interiors/modern-dark-living.webp'
  },
  {
    type: '2 Bedroom',
    size: '1,250 sq ft',
    bedrooms: 2,
    bathrooms: 2,
    price: 'Starting from AED 1.8M',
    features: ['2 en-suite bedrooms', 'Spacious living', 'Dining area', 'Maid\'s room', 'Large balcony'],
    available: '24 units',
    popular: true,
    image: '/images/interiors/downtown-views.webp'
  },
  {
    type: '3 Bedroom',
    size: '1,850 sq ft',
    bedrooms: 3,
    bathrooms: 3,
    price: 'Starting from AED 2.8M',
    features: ['3 en-suite bedrooms', 'Study room', 'Powder room', 'Maid\'s room', 'Terrace'],
    available: '15 units',
    image: '/images/interiors/marina-suite.webp'
  },
  {
    type: '4 Bedroom',
    size: '2,600 sq ft',
    bedrooms: 4,
    bathrooms: 4,
    price: 'Starting from AED 4.2M',
    features: ['4 en-suite bedrooms', 'Family room', 'Study', 'Maid\'s room', 'Private terrace'],
    available: '8 units',
    image: '/images/interiors/chef-kitchen.webp'
  },
  {
    type: 'Penthouse',
    size: '4,500 sq ft',
    bedrooms: 5,
    bathrooms: 6,
    price: 'Starting from AED 12M',
    features: ['5 en-suite bedrooms', 'Private pool', 'Rooftop terrace', 'Private elevator', 'Butler pantry'],
    available: '3 units',
    luxury: true,
    image: '/images/interiors/grand-lobby.webp'
  },
]

export default function FloorPlans() {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState(2) // Default to 2BR (most popular)
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const scrollAmount = direction === 'left' ? -400 : 400
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  useEffect(() => {
    // No animations needed - using native CSS overflow scroll
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section bg-obsidian-900 px-4 md:px-6 lg:px-8 py-24 lg:py-40 relative z-10"
      id="floor-plans"
    >
      <div className="container-custom max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <p className="text-bronze-500 text-xs md:text-sm uppercase tracking-[0.3em] font-light mb-6">
            Thoughtful Layouts
          </p>
          <h2 className="heading-xl mb-8 text-ivory-100">
            Floor Plans
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-bronze-500 to-transparent mb-8 opacity-50 mx-auto" />
          <p className="text-base md:text-xl text-ivory-400 font-light leading-relaxed tracking-wide max-w-3xl mx-auto">
            Every floor plan is meticulously designed to maximize space, light, and functionality—crafted for the way you live.
          </p>
        </div>

        {/* Floor Plans Horizontal Scroll with Arrow Navigation */}
        <div className="relative px-14">
          {/* Left Arrow - Outside cards */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-obsidian-950/90 border border-bronze-500/30 hover:bg-bronze-500/20 hover:border-bronze-500 transition-all duration-300 flex items-center justify-center group"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-bronze-500 group-hover:text-bronze-400" strokeWidth={1.5} />
          </button>

          {/* Right Arrow - Outside cards */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-obsidian-950/90 border border-bronze-500/30 hover:bg-bronze-500/20 hover:border-bronze-500 transition-all duration-300 flex items-center justify-center group"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-bronze-500 group-hover:text-bronze-400" strokeWidth={1.5} />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 pb-6"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#C09A6B20 transparent' }}
          >
            <div className="cards-wrapper flex gap-6 lg:gap-8">
              {floorPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`floor-plan-card group relative bg-obsidian-950/40 border transition-all duration-500 overflow-hidden flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] ${plan.popular || plan.luxury
                    ? 'border-bronze-500/40 shadow-lg shadow-bronze-500/10'
                    : 'border-bronze-500/10 hover:border-bronze-500/30'
                    }`}
                >
                  {/* Badge */}
                  {plan.popular && (
                    <div className="absolute top-4 right-4 px-4 py-1.5 bg-bronze-500 text-obsidian-950 text-xs uppercase tracking-wider font-medium z-20">
                      Most Popular
                    </div>
                  )}
                  {plan.luxury && (
                    <div className="absolute top-4 right-4 px-4 py-1.5 bg-gradient-to-r from-bronze-500 to-bronze-400 text-obsidian-950 text-xs uppercase tracking-wider font-medium z-20">
                      Ultra Luxury
                    </div>
                  )}

                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-bronze-500/0 via-bronze-500/0 to-bronze-500/0 group-hover:from-bronze-500/5 group-hover:via-bronze-500/10 group-hover:to-bronze-500/5 transition-all duration-500 pointer-events-none" />

                  {/* Floor Plan Image */}
                  <div className="relative h-64 bg-obsidian-950/60 border-b border-bronze-500/10 overflow-hidden">
                    <Image
                      src={getAssetPath(plan.image)}
                      alt={`${plan.type} Floor Plan`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 to-transparent" />
                  </div>

                  <div className="relative z-10 p-6 lg:p-8">
                    {/* Type & Size */}
                    <div className="mb-6">
                      <h3 className="text-2xl lg:text-3xl font-light text-ivory-100 mb-2 group-hover:text-bronze-400 transition-colors duration-300">
                        {plan.type}
                      </h3>
                      <p className="text-sm text-ivory-500 uppercase tracking-wider">{plan.size}</p>
                    </div>

                    {/* Specs */}
                    <div className="flex items-center gap-6 mb-6 pb-6 border-b border-bronze-500/10">
                      {plan.bedrooms > 0 && (
                        <div className="flex items-center gap-2">
                          <Bed className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
                          <span className="text-sm text-ivory-300">{plan.bedrooms}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Bath className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
                        <span className="text-sm text-ivory-300">{plan.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
                        <span className="text-sm text-ivory-300">{plan.size.split(' ')[0]}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-ivory-400">
                          <ChevronRight className="w-4 h-4 text-bronze-500" strokeWidth={2} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Price & Availability */}
                    <div className="mb-6">
                      <p className="text-lg text-bronze-500 font-light mb-1">{plan.price}</p>
                      <p className="text-xs text-ivory-500 uppercase tracking-wider">
                        {plan.available} Available
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-bronze-500/30 text-bronze-500 hover:bg-bronze-500/10 transition-all duration-300 text-sm">
                        <Eye className="w-4 h-4" strokeWidth={1.5} />
                        View
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-bronze-500/30 text-bronze-500 hover:bg-bronze-500/10 transition-all duration-300 text-sm">
                        <Download className="w-4 h-4" strokeWidth={1.5} />
                        PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Virtual Tour CTA */}
        <div className="mt-16 lg:mt-24 text-center bg-obsidian-950/60 border border-bronze-500/10 p-10 lg:p-16">
          <Eye className="w-12 h-12 mx-auto mb-6 text-bronze-500" strokeWidth={1.5} />
          <h3 className="text-2xl lg:text-3xl font-light text-ivory-100 mb-4">
            Experience in 3D
          </h3>
          <p className="text-base text-ivory-400 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Take an immersive virtual tour of our floor plans. Walk through each space, visualize the layout, and envision your future home.
          </p>
          <button
            onClick={() => setIsVirtualTourOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-bronze-500 text-obsidian-950 hover:bg-bronze-400 transition-all duration-300 uppercase tracking-wider text-sm font-medium"
          >
            Launch Virtual Tour
            <ChevronRight className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Virtual Tour Modal */}
        {/* Virtual Tour Modal */}
        {isVirtualTourOpen && typeof document !== 'undefined' && createPortal(
          <div className="fixed inset-0 bg-obsidian-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-8" onClick={() => setIsVirtualTourOpen(false)}>
            {/* Modal Content - Matched to ViewingFormCard styles */}
            <div
              className="relative w-full max-w-7xl aspect-video bg-obsidian-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-bronze-600/10 animate-in fade-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVirtualTourOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-obsidian-950/50 hover:bg-bronze-500 hover:text-obsidian-950 text-ivory-100 rounded-full transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              <iframe
                src="https://my.matterport.com/show?play=1&lang=en-US&m=MARFGJFtTjc"
                className="w-full h-full"
                allow="fullscreen; vr"
                title="Virtual Tour"
              />
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  )
}
