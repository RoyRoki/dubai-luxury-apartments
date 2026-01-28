'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

export default function Amenities() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // using gsap.context ensures all ScrollTriggers/animations created here are properly cleaned up
    const ctx = gsap.context(() => {
      // Select items within this context (scoped to sectionRef)
      const items = document.querySelectorAll('.amenity-item')
      items.forEach((item, index) => {
        // Simple fade in animation (removed problematic fadeInOnScroll)
        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 1,
          delay: index * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        })

        const image = item.querySelector('img')
        const overlay = item.querySelector('.absolute.inset-0') // The gradient overlay

        if (image) {
          // Parallax Effect
          gsap.fromTo(image,
            { scale: 1.15, yPercent: -10 },
            {
              yPercent: 10,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          )

          // Hover Animation (Scale only, respecting parallax scale base)
          item.addEventListener('mouseenter', () => {
            gsap.to(image, { scale: 1.25, duration: 1.5, ease: 'power2.out', overwrite: 'auto' })
            if (overlay) gsap.to(overlay, { opacity: 0.8, duration: 0.5, overwrite: 'auto' })
          })

          item.addEventListener('mouseleave', () => {
            gsap.to(image, { scale: 1.15, duration: 1.5, ease: 'power2.out', overwrite: 'auto' })
            if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.5, overwrite: 'auto' })
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const amenities = [
    {
      title: 'Infinity Pool',
      description: "Weightless mornings. Your infinity pool suspends above the city's pulse, where water meets sky.",
      image: '/images/amenities/infinity-pool.webp',
      align: 'left',
    },
    {
      title: 'Private Cinema',
      description: 'Cinematic evenings in intimate luxury. Your personal theater awaits, draped in velvet silence.',
      image: '/images/amenities/private-cinema.webp',
      align: 'right',
    },
    {
      title: 'Wellness Sanctuary',
      description: 'Transcend the everyday. Steam, sauna, thermal baths—rituals of renewal, privately yours.',
      image: '/images/amenities/wellness.webp',
      align: 'left',
    },
    {
      title: 'Sky Terrace',
      description: 'Dusk conversations under desert stars. Your private observatory overlooks a city of infinite light.',
      image: '/images/amenities/sky-terrace.webp',
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
              className={`amenity-item grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center ${amenity.align === 'right' ? 'lg:grid-flow-dense' : ''
                }`}
            >
              {/* Image - Cinematic 16:9 */}
              <div
                className={`relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden group ${amenity.align === 'right' ? 'lg:col-span-7 lg:col-start-6' : 'lg:col-span-7'
                  }`}
              >
                <Image
                  src={amenity.image}
                  alt={amenity.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/20 via-transparent to-obsidian-950/60" />
              </div>

              {/* Text Content */}
              <div
                className={`lg:col-span-5 ${amenity.align === 'right' ? 'lg:col-start-1 lg:row-start-1' : ''
                  } flex flex-col justify-center ${amenity.align === 'right' ? 'lg:pr-12' : 'lg:pl-12'
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
