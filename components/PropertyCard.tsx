'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface PropertyCardProps {
  title: string
  location: string
  price: number
  image: string
  bedrooms: number
  bathrooms: number
  area: number
  size?: 'large' | 'medium'
}

export default function PropertyCard({
  title,
  location,
  price,
  image,
  bedrooms,
  bathrooms,
  area,
  size = 'medium',
}: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Responsive heights for asymmetric layout
  const heightClass = size === 'large'
    ? 'h-[400px] md:h-[500px] lg:h-[600px]'
    : 'h-[350px] md:h-[450px] lg:h-[600px]'

  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    // Card fade in + scale
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 60,
      scale: 0.95,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    // Image parallax effect
    gsap.to(imageRef.current, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, [])

  return (
    <div
      ref={cardRef}
      className="card-luxury property-card overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className={`relative ${heightClass} overflow-hidden bg-obsidian-900`}>
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw"
            unoptimized
            className={`object-cover transition-all duration-1000 ease-out ${
              isHovered ? 'scale-110 brightness-90' : 'scale-100 brightness-100'
            }`}
          />
        </div>

        {/* Location Badge - Top */}
        <div className="absolute top-6 left-6 z-10">
          <div className="glass px-4 py-2 flex items-center space-x-2">
            <MapPin size={12} className="text-bronze-500" />
            <span className="text-xs font-light uppercase tracking-wider text-ivory-300">
              {location}
            </span>
          </div>
        </div>

        {/* Base Info Overlay - Always Visible */}
        <div
          className={`absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-obsidian-950 via-obsidian-950/90 to-transparent z-10 transition-opacity duration-500 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h3 className="text-xl md:text-2xl font-display font-light text-ivory-300 mb-2 tracking-wide">
            {title}
          </h3>
          <div className="text-2xl md:text-3xl font-display font-normal text-bronze-500">
            {formatPrice(price)}
          </div>
        </div>

        {/* Hover Details Overlay - Elegant Slide Up */}
        <div
          className={`absolute inset-0 bg-obsidian-950/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 p-8 transition-all duration-700 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          {/* Title & Price */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-display font-light text-ivory-300 mb-3 tracking-wide">
              {title}
            </h3>
            <div className="text-3xl md:text-4xl font-display font-normal text-bronze-500 mb-6">
              {formatPrice(price)}
            </div>
          </div>

          {/* Specs - Elegant Serif Numerals */}
          <div className="flex items-center gap-8 text-ivory-400">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-light text-bronze-500 mb-1">
                {bedrooms}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] font-light">Chambers</div>
            </div>
            <div className="w-[1px] h-12 bg-bronze-600/20" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-light text-bronze-500 mb-1">
                {bathrooms}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] font-light">Baths</div>
            </div>
            <div className="w-[1px] h-12 bg-bronze-600/20" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-display font-light text-bronze-500 mb-1">
                {area.toLocaleString()}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] font-light">Sq Ft</div>
            </div>
          </div>

          {/* CTA - Minimal Underline */}
          <button className="group/btn relative mt-4 text-bronze-500 hover:text-bronze-400 transition-colors duration-500">
            <span className="text-sm uppercase tracking-[0.3em] font-light">View Residence</span>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-bronze-600/30">
              <div className="h-full w-0 bg-bronze-500 transition-all duration-700 group-hover/btn:w-full" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
