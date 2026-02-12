'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'
import Counter from '@/components/ui/Counter'

export default function Investment() {
  const sectionRef = useRef<HTMLElement>(null)

  const stats = [
    { value: 5.8, unit: '%', label: 'Annual Yield', description: 'Industry-leading returns in prime locations' },
    { value: 0.0, unit: '%', label: 'Tax Rate', description: 'No property, income, or capital gains tax' },
    { value: 15.0, unit: '%', label: 'Growth Rate', description: 'Average annual property value appreciation' },
  ]

  return (
    <section ref={sectionRef} className="section bg-obsidian-950 relative overflow-hidden" id="investment">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-800/5 via-transparent to-bronze-900/5" />

      <div className="container-editorial relative">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-28">
          <p className="text-bronze-500 text-xs md:text-sm uppercase tracking-[0.3em] font-light mb-6">
            Generational Wealth
          </p>
          <h2 className="heading-xl mb-6">
            <span className="text-ivory-300">Investment</span>
            <br />
            <span className="text-bronze">Excellence</span>
          </h2>
          <p className="text-base md:text-lg text-ivory-500 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
            Dubai&apos;s real estate market offers unparalleled opportunities for discerning investors.
          </p>
        </div>

        {/* Editorial Magazine Layout: 60/40 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Large Architectural Photo - Left 60% */}
          <div className="investment-image lg:col-span-7">
            <div className="relative h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden group">
              <Image
                src={getAssetPath('/images/interiors/downtown-views.webp')}
                alt="Luxury Investment Property"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                unoptimized
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-obsidian-950/40 via-transparent to-obsidian-950/60" />

              {/* Film grain */}
              <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
            </div>
          </div>

          {/* Refined Text Column - Right 40% */}
          <div className="investment-content lg:col-span-5 space-y-10">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="flex items-baseline gap-2 mb-3">
                  {/* Elegant Numeral with Counter Animation */}
                  <Counter
                    target={stat.value}
                    decimals={1}
                    duration={2.0}
                    className="text-6xl md:text-7xl lg:text-8xl font-display font-light text-bronze-500"
                  />
                  <span className="text-3xl md:text-4xl font-display font-light text-bronze-500">
                    {stat.unit}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-light text-ivory-300 mb-2 tracking-wide">
                  {stat.label}
                </h3>
                <p className="text-sm md:text-base text-ivory-500 font-light leading-relaxed">
                  {stat.description}
                </p>

                {/* Metallic divider line */}
                {index < stats.length - 1 && (
                  <div className="mt-10 w-full h-[1px] bg-gradient-to-r from-bronze-600/30 via-bronze-500/50 to-bronze-600/30" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Investment Narrative - Full Width Editorial Text */}
        <div className="card-luxury p-10 md:p-16 group">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-light text-ivory-300 mb-8 tracking-wide">
              Why Dubai?
            </h3>
            <p className="text-base md:text-lg lg:text-xl text-ivory-500 font-light leading-relaxed tracking-wide mb-6">
              Dubai&apos;s strategic position as a global business hub, combined with world-class infrastructure and a business-friendly environment, creates exceptional opportunities for real estate investment.
            </p>
            <p className="text-base md:text-lg text-ivory-500 font-light leading-relaxed tracking-wide italic">
              More than investment—legacy architecture for those who shape tomorrow.
            </p>

            {/* Elegant stats bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-bronze-600/20">
              <div>
                <div className="text-4xl md:text-5xl font-display font-light text-bronze-500 mb-2">
                  <Counter
                    target={2.3}
                    decimals={1}
                    prefix="$"
                    suffix="B"
                    duration={2.5}
                  />
                </div>
                <p className="text-sm text-ivory-500 font-light tracking-wide">Foreign Investment 2023</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-display font-light text-bronze-500 mb-2">
                  <Counter
                    target={200}
                    decimals={0}
                    suffix="+"
                    duration={2.5}
                  />
                </div>
                <p className="text-sm text-ivory-500 font-light tracking-wide">Nationalities Invested</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-display font-light text-bronze-500 mb-2">
                  <Counter
                    target={10}
                    decimals={0}
                    suffix=" Years"
                    duration={2.5}
                  />
                </div>
                <p className="text-sm text-ivory-500 font-light tracking-wide">Residence Visa Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
