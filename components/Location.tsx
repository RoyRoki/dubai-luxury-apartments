'use client'

import { useRef } from 'react'
import Image from 'next/image'

import { getAssetPath } from '@/lib/utils'

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null)

  // Animations removed to ensure visibility


  const locations = [
    {
      title: 'Burj Khalifa',
      distance: '5 min',
      description: "The world's pinnacle. Five minutes.",
    },
    {
      title: 'Dubai Mall',
      distance: '10 min',
      description: 'Boundless luxury. Ten minutes.',
    },
    {
      title: 'Jumeirah Beach',
      distance: '15 min',
      description: 'Azure horizons. Fifteen minutes.',
    },
    {
      title: 'DXB Airport',
      distance: '25 min',
      description: 'Global gateway. Twenty-five minutes.',
    },
  ]

  return (
    <section ref={sectionRef} className="section bg-obsidian-900 min-h-screen flex flex-col justify-center relative overflow-hidden z-30" id="location">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-28">
          <p className="text-bronze-500 text-xs md:text-sm uppercase tracking-[0.3em] font-light mb-6">
            Strategic Positioning
          </p>
          <h2 className="heading-xl mb-6">
            <span className="text-ivory-300">Legendary</span>
            <br />
            <span className="text-bronze">Addresses</span>
          </h2>
          <p className="text-base md:text-lg text-ivory-500 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            Where the world converges. Every destination within reach.
          </p>
        </div>

        {/* Editorial Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Large Hero Image - 60% width */}
          <div className="location-content lg:col-span-7">
            <div className="relative h-[400px] md:h-[500px] lg:h-[700px] overflow-hidden group">
              <Image
                src={getAssetPath('/images/location/dubai-skyline.webp')}
                alt="Dubai Skyline"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-obsidian-950/30 via-transparent to-obsidian-950/70" />

              {/* Film grain overlay */}
              <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
            </div>
          </div>

          {/* Minimal Text Column - 40% width */}
          <div className="lg:col-span-5 space-y-8 location-tags">
            {locations.map((location, index) => (
              <div
                key={index}
                className="group"
              >
                {/* Metallic location tag */}
                <div className="glass-dark px-6 py-5 hover:bg-obsidian-900/90 transition-all duration-500 hover:shadow-lg hover:shadow-bronze-500/10">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-xl md:text-2xl font-display font-light text-ivory-300 group-hover:text-bronze-500 transition-colors duration-500">
                      {location.title}
                    </h3>
                    <span className="text-bronze-500 text-sm font-light tracking-[0.2em] uppercase">
                      {location.distance}
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-ivory-500 font-light italic leading-relaxed">
                    {location.description}
                  </p>
                </div>

                {/* Divider line */}
                {index < locations.length - 1 && (
                  <div className="mt-8 w-full h-[1px] bg-bronze-600/10" />
                )}
              </div>
            ))}

            {/* Connectivity Statement */}
            <div className="mt-12 pt-8 border-t border-bronze-600/20">
              <p className="text-base md:text-lg text-ivory-400 font-light leading-relaxed italic">
                Positioned at the intersection of legacy and innovation—where Dubai&apos;s heartbeat resonates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
