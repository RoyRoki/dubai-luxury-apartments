'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { fadeInOnScroll } from '@/lib/animations'

export default function Amenities() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    fadeInOnScroll('.amenity-item', { y: 80, duration: 1.4, stagger: 0.3 })
  }, [])

  const amenities = [
    {
      title: 'Infinity Pool',
      description: "Weightless mornings. Your infinity pool suspends above the city's pulse, where water meets sky.",
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600&q=80',
      align: 'left',
    },
    {
      title: 'Private Cinema',
      description: 'Cinematic evenings in intimate luxury. Your personal theater awaits, draped in velvet silence.',
      image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=1600&q=80',
      align: 'right',
    },
    {
      title: 'Wellness Sanctuary',
      description: 'Transcend the everyday. Steam, sauna, thermal baths—rituals of renewal, privately yours.',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=80',
      align: 'left',
    },
    {
      title: 'Sky Terrace',
      description: 'Dusk conversations under desert stars. Your private observatory overlooks a city of infinite light.',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1600&q=80',
      align: 'right',
    },
  ]

  return (
    <section ref={sectionRef} className="section bg-obsidian-950" id="amenities">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-32">
          <p className="text-bronze-500 text-xs md:text-sm uppercase tracking-[0.3em] font-light mb-6">
            Beyond Living
          </p>
          <h2 className="heading-xl mb-6">
            <span className="text-ivory-300">Immersive</span>
            <br />
            <span className="text-bronze">Experiences</span>
          </h2>
          <p className="text-base md:text-lg text-ivory-500 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            Every detail curated for those who seek more than space—they seek sanctuary.
          </p>
        </div>

        {/* Staggered Cinematic Photo Grid */}
        <div className="space-y-16 md:space-y-24">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className={`amenity-item grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center ${
                amenity.align === 'right' ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Image - Cinematic 16:9 */}
              <div
                className={`relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden group ${
                  amenity.align === 'right' ? 'lg:col-span-7 lg:col-start-6' : 'lg:col-span-7'
                }`}
              >
                <Image
                  src={amenity.image}
                  alt={amenity.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  unoptimized
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/20 via-transparent to-obsidian-950/60" />
              </div>

              {/* Text Content */}
              <div
                className={`lg:col-span-5 ${
                  amenity.align === 'right' ? 'lg:col-start-1 lg:row-start-1' : ''
                } flex flex-col justify-center ${
                  amenity.align === 'right' ? 'lg:pr-12' : 'lg:pl-12'
                }`}
              >
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-light text-ivory-300 mb-6 tracking-wide">
                  {amenity.title}
                </h3>
                <p className="text-base md:text-lg lg:text-xl text-ivory-500 font-light leading-relaxed tracking-wide italic">
                  {amenity.description}
                </p>
                <div className="mt-8 w-24 h-[1px] bg-gradient-to-r from-bronze-500 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
