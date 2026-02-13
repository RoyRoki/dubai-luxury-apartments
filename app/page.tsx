'use client'

import { useEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ScrollSequence from '@/components/ScrollSequence'
import FeaturedProperties from '@/components/FeaturedProperties'
import Amenities from '@/components/Amenities'
import Location from '@/components/Location'
import Investment from '@/components/Investment'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import ViewingForm from '@/components/ViewingForm'
import Footer from '@/components/Footer'
import LuxuryCursor from '@/components/LuxuryCursor'
import EditorialSection from '@/components/EditorialSection'
import CuratedInteriorsSection from '@/components/CuratedInteriorsSection'
import DeveloperPartners from '@/components/DeveloperPartners'
import PaymentPlans from '@/components/PaymentPlans'
import FloorPlans from '@/components/FloorPlans'
import NeighborhoodGuide from '@/components/NeighborhoodGuide'

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // Treat tablets (iPad Air/Pro) as mobile/touch devices
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // Scroll handling based on device type
    if (!isMobile) {
      // Desktop: Use Lenis for smooth scrolling
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
      })

      lenisRef.current = lenis

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      lenis.on('scroll', ScrollTrigger.update)

      return () => {
        lenis.destroy()
        lenisRef.current = null
      }
    } else {
      // Mobile: Use native scroll with ScrollTrigger normalization for better pinning
      ScrollTrigger.normalizeScroll({
        allowNestedScroll: true,
        lockAxis: false,
        momentum: (self: { velocityY: number }) => Math.min(3, self.velocityY / 1000), // Reduce momentum on mobile
        type: 'touch,wheel,pointer',
      })

      return () => {
        ScrollTrigger.normalizeScroll(false)
      }
    }
  }, [isMobile])

  // Separate effect for refresh to ensure it happens after init
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 1000)

    return () => clearTimeout(timer)
  }, [isMobile])

  return (
    <>
      <LuxuryCursor />
      <Header lenisInstance={lenisRef} />

      <main className="bg-obsidian-950 relative" style={{ overflowX: 'clip' }}>
        {/* Animated Noise Texture Background */}
        <div className="animated-noise fixed inset-0 z-0" />

        <Hero />

        {/* 1. Genesis */}
        {/* 1. Genesis */}
        <ScrollSequence
          key={isMobile ? 'mobile-1' : 'desktop-1'}
          sequenceName="Sketch_to_Luxury_Home_Evolution"
          title="The Genesis"
          subtitle="From ink and imagination to architectural poetry"
          frameCount={120}
          curveVariant="wave-flow"
          nextSectionBg="obsidian-900"
          isMobile={isMobile}
        />

        <FeaturedProperties />

        <DeveloperPartners />

        {/* 2. The Blueprint */}
        {/* 2. The Blueprint */}
        <ScrollSequence
          key={isMobile ? 'mobile-2' : 'desktop-2'}
          sequenceName="Video_Prompt_Revision_and_Generation"
          title="The Blueprint"
          subtitle="Where vision meets precision"
          frameCount={120}
          curveVariant='geometric-sharp'
          nextSectionBg="obsidian-950"
          isMobile={isMobile}
        />

        <FloorPlans />

        <PaymentPlans />

        {/* 3. Time's Embrace */}
        {/* 3. Time's Embrace */}
        <ScrollSequence
          key={isMobile ? 'mobile-3' : 'desktop-3'}
          sequenceName="Construction_to_Luxury_Transformation_Video"
          title="Time's Embrace"
          subtitle="Witness raw earth sculpted into timeless luxury"
          frameCount={120}
          curveVariant="layered-depth"
          textColor="dark"
          nextSectionBg="obsidian-950"
          isMobile={isMobile}
        />

        <Investment />

        {/* 4. The Arrival */}
        {/* 4. The Arrival */}
        <ScrollSequence
          key={isMobile ? 'mobile-4' : 'desktop-4'}
          sequenceName="Luxury_Home_Entry_Transition"
          title="The Arrival"
          subtitle="Step into a world of uncompromised elegance"
          frameCount={120}
          curveVariant='wave-top'
          textColor="deep-gold"
          lazyLoad={true}
          nextSectionBg="obsidian-950"
          isMobile={isMobile}
        />

        <Location />

        {/* 5. Sky-High Haven */}
        {/* 5. Sky-High Haven */}
        <ScrollSequence
          key={isMobile ? 'mobile-5' : 'desktop-5'}
          sequenceName="Drone_Portal_to_Luxury_Suite"
          title="Sky-High Haven"
          subtitle="Elevated living, redefined"
          frameCount={120}
          curveVariant='geometric-sharp'
          lazyLoad={true}
          nextSectionBg="obsidian-950"
          className="z-40"
          isMobile={isMobile}
        />

        <NeighborhoodGuide />

        {/* 6. Inner Sanctum */}
        {/* 6. Inner Sanctum */}
        <ScrollSequence
          key={isMobile ? 'mobile-6' : 'desktop-6'}
          sequenceName="Dubai_Luxury_Interior_Drone_Reveal"
          title="Inner Sanctum"
          subtitle="A private retreat above the clouds"
          frameCount={120}
          curveVariant='geometric-top'
          lazyLoad={true}
          nextSectionBg="obsidian-900"
          isMobile={isMobile}
        />

        <Amenities />

        {/* 7. Your Constellation */}
        {/* 7. Your Constellation */}
        <ScrollSequence
          key={isMobile ? 'mobile-7' : 'desktop-7'}
          sequenceName="Dubai_Hyper_Zoom_To_Home"
          title="Your Constellation"
          subtitle="In a city of millions, only one address calls to you"
          frameCount={120}
          curveVariant='layered-top'
          textColor="deep-gold"
          lazyLoad={true}
          nextSectionBg="obsidian-950"
          isMobile={isMobile}
        />

        <Testimonials />

        {/* 8. The Mirror Moment */}
        {/* 8. The Mirror Moment */}
        <ScrollSequence
          key={isMobile ? 'mobile-8' : 'desktop-8'}
          sequenceName="Reflective_Reveal_Video_Generation"
          title="The Mirror Moment"
          subtitle="Beauty reflecting beauty—infinity in every surface"
          frameCount={120}
          curveVariant='wave-flow'
          lazyLoad={true}
          nextSectionBg="obsidian-950"
          isMobile={isMobile}
        />

        <CuratedInteriorsSection />

        {/* 9. Living Art */}
        {/* 9. Living Art */}
        <ScrollSequence
          key={isMobile ? 'mobile-9' : 'desktop-9'}
          sequenceName="Ghost_Furniture_Video_Generation"
          title="Living Art"
          subtitle="Curated spaces that breathe and inspire"
          frameCount={120}
          curveVariant='layered-depth'
          lazyLoad={true}
          nextSectionBg="obsidian-950"
          isMobile={isMobile}
        />

        <FAQ />

        {/* 11. The Golden Hours */}
        {/* 11. The Golden Hours */}
        {/* 11. The Golden Hours */}
        <ScrollSequence
          key={isMobile ? 'mobile-10' : 'desktop-10'}
          sequenceName="Day_to_Night_Window_Wipe_Transition"
          title="The Golden Hours"
          subtitle="Morning coffee to midnight reflection—your sanctuary evolves"
          frameCount={120}
          curveVariant='layered-depth'
          textColor="deep-gold"
          lazyLoad={true}
          nextSectionBg="obsidian-950"
          isMobile={isMobile}
        />

        <div className="container-custom px-4 md:px-6 lg:px-8 py-20 lg:py-32" id="contact">
          <ViewingForm />
        </div>
      </main>

      <Footer />
    </>
  )
}
