'use client'

import { useEffect, useRef } from 'react'
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

  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // Initialize Lenis Smooth Scroll - FIXED: Proper initialization with ScrollTrigger integration
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

    // CRITICAL FIX: Use requestAnimationFrame properly
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // CRITICAL: Ensure ScrollTrigger refreshes after everything loads
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 1000)

    gsap.ticker.lagSmoothing(0)

    // Proper cleanup
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <LuxuryCursor />
      <Header lenisInstance={lenisRef} />

      <main className="overflow-x-hidden bg-obsidian-950 relative">
        {/* Animated Noise Texture Background */}
        <div className="animated-noise fixed inset-0 z-0" />

        <Hero />

        {/* 1. Genesis */}
        <ScrollSequence
          sequenceName="Sketch_to_Luxury_Home_Evolution"
          title="The Genesis"
          subtitle="From ink and imagination to architectural poetry"
          frameCount={120}
          curveVariant="wave-flow"
          nextSectionBg="obsidian-900"
        />

        <FeaturedProperties />

        <DeveloperPartners />

        {/* 2. The Blueprint */}
        <ScrollSequence
          sequenceName="Video_Prompt_Revision_and_Generation"
          title="The Blueprint"
          subtitle="Where vision meets precision"
          frameCount={120}
          curveVariant='geometric-sharp'
          nextSectionBg="obsidian-950"
        />

        <PaymentPlans />

        {/* 3. Time's Embrace */}
        <ScrollSequence
          sequenceName="Construction_to_Luxury_Transformation_Video"
          title="Time's Embrace"
          subtitle="Witness raw earth sculpted into timeless luxury"
          frameCount={120}
          curveVariant="layered-depth"
          textColor="dark"
          nextSectionBg="obsidian-950"
        />

        <Investment />

        {/* 4. The Arrival */}
        <ScrollSequence
          sequenceName="Luxury_Home_Entry_Transition"
          title="The Arrival"
          subtitle="Step into a world of uncompromised elegance"
          frameCount={120}
          curveVariant='wave-top'
          lazyLoad={true}
          nextSectionBg="obsidian-950"
        />

        <Location />

        {/* 5. Sky-High Haven */}
        <ScrollSequence
          sequenceName="Drone_Portal_to_Luxury_Suite"
          title="Sky-High Haven"
          subtitle="Elevated living, redefined"
          frameCount={120}
          curveVariant='geometric-sharp'
          lazyLoad={true}
          nextSectionBg="obsidian-950"
        />

        <NeighborhoodGuide />

        {/* 6. Inner Sanctum */}
        <ScrollSequence
          sequenceName="Dubai_Luxury_Interior_Drone_Reveal"
          title="Inner Sanctum"
          subtitle="A private retreat above the clouds"
          frameCount={120}
          curveVariant='geometric-top'
          lazyLoad={true}
          nextSectionBg="obsidian-900"
        />

        <Amenities />

        <FloorPlans />

        {/* 7. Your Constellation */}
        <ScrollSequence
          sequenceName="Dubai_Hyper_Zoom_To_Home"
          title="Your Constellation"
          subtitle="In a city of millions, only one address calls to you"
          frameCount={120}
          curveVariant='layered-top'
          lazyLoad={true}
          nextSectionBg="obsidian-950"
        />

        <Testimonials />

        {/* 8. The Mirror Moment */}
        <ScrollSequence
          sequenceName="Reflective_Reveal_Video_Generation"
          title="The Mirror Moment"
          subtitle="Beauty reflecting beauty—infinity in every surface"
          frameCount={120}
          curveVariant='wave-flow'
          lazyLoad={true}
          nextSectionBg="obsidian-950"
        />

        <CuratedInteriorsSection />

        {/* 9. Living Art */}
        <ScrollSequence
          sequenceName="Ghost_Furniture_Video_Generation"
          title="Living Art"
          subtitle="Curated spaces that breathe and inspire"
          frameCount={120}
          curveVariant='layered-depth'
          lazyLoad={true}
          nextSectionBg="obsidian-950"
        />

        {/* 10. Your Daily Return
        <ScrollSequence
          sequenceName="A_seamless_firstperson_202601272342"
          title="Your Daily Return"
          subtitle="The journey home has never felt this transcendent"
          frameCount={120}
          curveVariant='wave-top'
          lazyLoad={true}
          nextSectionBg="obsidian-950"
        /> */}

        <FAQ />

        {/* 11. The Golden Hours */}
        <ScrollSequence
          sequenceName="Day_to_Night_Window_Wipe_Transition"
          title="The Golden Hours"
          subtitle="Morning coffee to midnight reflection—your sanctuary evolves"
          frameCount={120}
          curveVariant='layered-depth'
          lazyLoad={true}
          nextSectionBg="obsidian-950"
        />

        <div className="container-custom px-4 md:px-6 lg:px-8 py-20 lg:py-32" id="contact">
          <ViewingForm />
        </div>
      </main>

      <Footer />
    </>
  )
}
