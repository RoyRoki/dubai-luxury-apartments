'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedProperties from '@/components/FeaturedProperties'
import Amenities from '@/components/Amenities'
import Location from '@/components/Location'
import Investment from '@/components/Investment'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import ViewingForm from '@/components/ViewingForm'
import Footer from '@/components/Footer'
import LuxuryCursor from '@/components/LuxuryCursor'

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // Initialize Lenis Smooth Scroll - FIXED: Proper initialization
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    })

    lenisRef.current = lenis

    // FIXED: Use only gsap.ticker, not double raf calls
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Refresh ScrollTrigger after init to ensure positions are correct
    ScrollTrigger.refresh()

    gsap.ticker.lagSmoothing(0)

    // Proper cleanup
    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
    }
  }, [])

  return (
    <main className="overflow-x-hidden bg-obsidian-950 relative">
      {/* Animated Noise Texture Background */}
      <div className="animated-noise fixed inset-0 z-0" />

      {/* Custom Luxury Cursor */}
      <LuxuryCursor />

      <Header lenisInstance={lenisRef} />
      <Hero />
      <FeaturedProperties />
      <Amenities />
      <Location />
      <Investment />
      <Testimonials />
      <FAQ />
      <ViewingForm />
      <Footer />
    </main>
  )
}
