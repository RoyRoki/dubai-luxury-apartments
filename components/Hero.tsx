'use client'

import { useEffect, useRef, MouseEvent } from 'react'
import { gsap } from 'gsap'
import { scrollToElement } from '@/lib/utils'
import { createRipple } from '@/lib/animations'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ULTRA-LUXURY: Hero Pin Effect
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          pin: false,
          scrub: 1,
        },
      })

      // Video slow-down on scroll
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            onUpdate: (self) => {
              if (videoRef.current) {
                videoRef.current.playbackRate = 1 - self.progress * 0.5
              }
            },
          },
        })
      }

      // Split text animation - letter by letter reveal
      const headline = document.querySelector('.hero-headline')
      if (headline) {
        const text = headline.textContent || ''
        headline.innerHTML = text
          .split('')
          .map(char => `<span class="inline-block opacity-0" style="transform: translateY(100px)">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('')

        gsap.to('.hero-headline span', {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.03,
          ease: 'power4.out',
          delay: 0.3,
        })
      }

      // Subheadline cascade
      gsap.from('.hero-subheadline', {
        opacity: 0,
        y: 40,
        duration: 1.4,
        ease: 'power3.out',
        delay: 1.2,
      })

      // CTA fade in
      gsap.from('.hero-cta', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out',
        delay: 1.8,
      })

      // Scroll indicator with pulse
      gsap.from('.scroll-indicator', {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: 'power2.out',
        delay: 2.2,
      })

      // Infinite pulse animation
      gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 3,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleScroll = () => {
    scrollToElement('properties')
  }

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>, action: () => void) => {
    createRipple(e.nativeEvent, e.currentTarget)
    action()
  }

  return (
    <section ref={heroRef} className="relative h-[120vh] w-full overflow-hidden" id="hero">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        {/* Video - Replace with actual Dubai skyline drone footage */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Use a real Dubai skyline video URL or local file */}
          <source
            src="https://cdn.coverr.co/videos/coverr-dubai-skyline-at-night-5394/1080p.mp4"
            type="video/mp4"
          />
        </video>

        {/* Obsidian Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/20 via-obsidian-950/70 to-obsidian-950" />

        {/* Subtle teal accent gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-800/10 via-transparent to-bronze-900/10" />

        {/* Film grain texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center z-10">
        <div className="container-editorial text-center">
          {/* Eyebrow Text */}
          <div className="mb-8 md:mb-12">
            <p className="text-bronze-500 text-xs md:text-sm uppercase tracking-[0.3em] font-light">
              Dubai&apos;s Legendary Addresses
            </p>
          </div>

          {/* Massive Headline - 10vw Cormorant */}
          <h1 className="hero-headline heading-hero text-ivory-300 mb-6 md:mb-10 will-change-transform">
            SANCTUARY
          </h1>

          {/* Subheadline - Poetic & Minimal */}
          <div className="hero-subheadline max-w-3xl mx-auto mb-12 md:mb-16">
            <p className="text-lg md:text-2xl lg:text-3xl text-ivory-400 font-display font-light leading-relaxed tracking-[0.08em]">
              Where the city&apos;s pulse meets <span className="text-bronze-500 italic">timeless elegance.</span>
            </p>
            <p className="text-base md:text-xl text-ivory-500 font-light leading-relaxed tracking-wide mt-4">
              Residences curated for those who shape horizons.
            </p>
          </div>

          {/* CTAs - Frosted Glass Style with Ripple */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={(e) => handleButtonClick(e, handleScroll)}
              className="btn-primary group"
            >
              <span className="relative z-10">Private Viewing</span>
            </button>
            <button
              onClick={(e) => handleButtonClick(e, () => scrollToElement('contact'))}
              className="btn-secondary group"
            >
              <span className="relative z-10">Enquire Discreetly</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Minimal */}
      <button
        onClick={handleScroll}
        className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-bronze-500 hover:text-bronze-400 transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-light">Discover</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-bronze-500/60 to-transparent group-hover:h-20 transition-all duration-500" />
      </button>
    </section>
  )
}
