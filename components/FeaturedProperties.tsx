'use client'

import { useEffect, useRef } from 'react'
import PropertyCard from './PropertyCard'
import { staggerAnimation } from '@/lib/animations'

export default function FeaturedProperties() {
  const sectionRef = useRef<HTMLElement>(null)

  // Stagger animation removed - PropertyCard handles its own entrance animation
  // to avoid GSAP conflicts and opacity issues
  /* 
  useEffect(() => {
    staggerAnimation('.property-card', { y: 60, duration: 1.2 })
  }, [])
  */

  // Curated properties - reduced to 4 exclusive residences
  const properties = [
    {
      title: 'Burj Vista Penthouse',
      location: 'Downtown Dubai',
      price: 8500000,
      image: '/images/exteriors/burj-vista.webp',
      bedrooms: 4,
      bathrooms: 5,
      area: 4500,
      featured: true, // Large card
    },
    {
      title: 'Palm Jumeirah Villa',
      location: 'Palm Jumeirah',
      price: 12000000,
      image: '/images/exteriors/palm-jumeirah-villa.webp',
      bedrooms: 6,
      bathrooms: 7,
      area: 8500,
      featured: true, // Large card
    },
    {
      title: 'Marina Promenade Suite',
      location: 'Dubai Marina',
      price: 3200000,
      image: '/images/interiors/marina-suite.webp',
      bedrooms: 3,
      bathrooms: 3,
      area: 2800,
      featured: false, // Medium card
    },
    {
      title: 'Downtown Views',
      location: 'Downtown Dubai',
      price: 5500000,
      image: '/images/interiors/downtown-views.webp',
      bedrooms: 3,
      bathrooms: 4,
      area: 3100,
      featured: false, // Medium card
    },
  ]

  return (
    <section ref={sectionRef} className="section relative bg-obsidian-900 pt-24 md:pt-32" id="properties">
      <div className="container-editorial">
        {/* Section Header - Editorial Style */}
        <div className="text-center mb-20 md:mb-28">
          <p className="text-bronze-500 text-xs md:text-sm uppercase tracking-[0.3em] font-light mb-6">
            Curated Collection
          </p>
          <h2 className="heading-xl mb-6">
            <span className="text-ivory-300">Legendary</span>
            <br />
            <span className="text-bronze">Residences</span>
          </h2>
          <p className="text-base md:text-lg text-ivory-500 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            Four masterpieces. Each residence tells a story of architectural distinction.
          </p>
        </div>

        {/* Asymmetric Masonry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-16">
          {/* Row 1: Large Featured + Medium */}
          <div className="property-card lg:col-span-8">
            <PropertyCard {...properties[0]} size="large" />
          </div>
          <div className="property-card lg:col-span-4">
            <PropertyCard {...properties[2]} size="medium" />
          </div>

          {/* Row 2: Medium + Large Featured */}
          <div className="property-card lg:col-span-4">
            <PropertyCard {...properties[3]} size="medium" />
          </div>
          <div className="property-card lg:col-span-8">
            <PropertyCard {...properties[1]} size="large" />
          </div>
        </div>

        {/* View All - Minimal Link Style */}
        <div className="flex justify-center mt-16 md:mt-20">
          <button className="group relative text-bronze-500 hover:text-bronze-400 transition-colors duration-500">
            <span className="text-sm uppercase tracking-[0.3em] font-light">
              View Complete Collection
            </span>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-bronze-600/30">
              <div className="h-full w-0 bg-bronze-500 transition-all duration-700 group-hover:w-full" />
            </div>
          </button>
        </div>
      </div>

    </section>
  )
}
