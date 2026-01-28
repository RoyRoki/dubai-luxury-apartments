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
        {!isMobile && (
          <ScrollSequence
            sequenceName="Sketch_to_Luxury_Home_Evolution"
            title="The Genesis"
            subtitle="From ink and imagination to architectural poetry"
            frameCount={120}
            curveVariant="wave-flow"
            nextSectionBg="obsidian-900"
          />
        )}

        <FeaturedProperties />

        <DeveloperPartners />

        {/* 2. The Blueprint */}
        {!isMobile && (
          <ScrollSequence
            sequenceName="Video_Prompt_Revision_and_Generation"
            title="The Blueprint"
            subtitle="Where vision meets precision"
            frameCount={120}
            curveVariant='geometric-sharp'
            nextSectionBg="obsidian-950"
          />
        )}

        {!isMobile && <FloorPlans />}

        {!isMobile && <PaymentPlans />}

        {/* 3. Time's Embrace */}
        {!isMobile && (
          <ScrollSequence
            sequenceName="Construction_to_Luxury_Transformation_Video"
            title="Time's Embrace"
            subtitle="Witness raw earth sculpted into timeless luxury"
            frameCount={120}
            curveVariant="layered-depth"
            textColor="dark"
            nextSectionBg="obsidian-950"
          />
        )}

        <Investment />

        {/* 4. The Arrival */}
        {!isMobile && (
          <ScrollSequence
            sequenceName="Luxury_Home_Entry_Transition"
            title="The Arrival"
            subtitle="Step into a world of uncompromised elegance"
            frameCount={120}
            curveVariant='wave-top'
            lazyLoad={true}
            nextSectionBg="obsidian-950"
          />
        )}

        {!isMobile && <Location />}

        {/* 5. Sky-High Haven */}
        {!isMobile && (
          <ScrollSequence
            sequenceName="Drone_Portal_to_Luxury_Suite"
            title="Sky-High Haven"
            subtitle="Elevated living, redefined"
            frameCount={120}
            curveVariant='geometric-sharp'
            lazyLoad={true}
            nextSectionBg="obsidian-950"
            className="z-40"
          />
        )}

        {!isMobile && <NeighborhoodGuide />}

        {/* 6. Inner Sanctum */}
        {!isMobile && (
          <ScrollSequence
            sequenceName="Dubai_Luxury_Interior_Drone_Reveal"
            title="Inner Sanctum"
            subtitle="A private retreat above the clouds"
            frameCount={120}
            curveVariant='geometric-top'
            lazyLoad={true}
            nextSectionBg="obsidian-900"
          />
        )}

        {!isMobile && <Amenities />}

        {/* 7. Your Constellation */}
        {!isMobile && (
          <ScrollSequence
            sequenceName="Dubai_Hyper_Zoom_To_Home"
            title="Your Constellation"
            subtitle="In a city of millions, only one address calls to you"
            frameCount={120}
            curveVariant='layered-top'
            lazyLoad={true}
            nextSectionBg="obsidian-950"
          />
        )}

        {!isMobile && <Testimonials />}

        {/* 8. The Mirror Moment */}
        {!isMobile && (
          <ScrollSequence
            sequenceName="Reflective_Reveal_Video_Generation"
            title="The Mirror Moment"
            subtitle="Beauty reflecting beauty—infinity in every surface"
            frameCount={120}
            curveVariant='wave-flow'
            lazyLoad={true}
            nextSectionBg="obsidian-950"
          />
        )}

        {!isMobile && <CuratedInteriorsSection />}

        {/* 9. Living Art */}
        {!isMobile && (
          <ScrollSequence
            sequenceName="Ghost_Furniture_Video_Generation"
            title="Living Art"
            subtitle="Curated spaces that breathe and inspire"
            frameCount={120}
            curveVariant='layered-depth'
            lazyLoad={true}
            nextSectionBg="obsidian-950"
          />
        )}

        {!isMobile && <FAQ />}

        {/* 11. The Golden Hours */}
        {!isMobile && (
          <ScrollSequence
            sequenceName="Day_to_Night_Window_Wipe_Transition"
            title="The Golden Hours"
            subtitle="Morning coffee to midnight reflection—your sanctuary evolves"
            frameCount={120}
            curveVariant='layered-depth'
            lazyLoad={true}
            nextSectionBg="obsidian-950"
          />
        )}

        <div className="container-custom px-4 md:px-6 lg:px-8 py-20 lg:py-32" id="contact">
          <ViewingForm />
        </div>
      </main>

      <Footer />
    </>
  )
}
