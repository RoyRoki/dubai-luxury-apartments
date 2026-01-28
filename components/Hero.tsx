'use client'

import { useEffect, useRef, useState, MouseEvent } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToElement } from '@/lib/utils'
import { createRipple } from '@/lib/animations'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Sequence Configuration
  const frameCount = 300
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const currentFrame = useRef({ frame: 0 }) // Changed to useRef

  useEffect(() => {
    // 1. Progressive Image Loading
    const loadImages = async () => {
      // Helper to load a batch of images
      const loadBatch = (start: number, end: number) => {
        return new Promise<void>((resolve) => {
          let loaded = 0
          const total = end - start + 1
          if (total <= 0) { resolve(); return; }

          for (let i = start; i <= end; i++) {
            const img = new window.Image()
            const filename = i.toString().padStart(4, '0')
            img.src = getAssetPath(`/images/sequence/hero-bg-webp/${filename}.webp`) // Updated path with helper

            // Store image in array index (0-based)
            const index = i - 1
            imagesRef.current[index] = img

            img.onload = () => {
              loaded++
              if (loaded === total) resolve()
              // If it's the very first frame, mark as loaded to show something
              if (i === 1) setIsLoaded(true)
            }
            img.onerror = () => {
              console.warn(`Failed to load frame ${i}`)
              loaded++
              if (loaded === total) resolve()
            }
          }
        })
      }

      // Phase 1: Critical Frame (First 1)
      await loadBatch(1, 1)

      // Phase 2: Initial Movement (Next 49) - Priority
      loadBatch(2, 50).then(() => {
        // Start animation ONLY after buffer is ready
        if (heroRef.current) {
          gsap.globalTimeline.add(() => {
            // We use a custom event or just access the timeline if we store it?
            // Easier: Dispatch event or use a ref.
            // Actually, let's just trigger the animation here if we can access the GSAP instance?
            // We can't easily access the localized 'tl' from here unless we structure differently.
            // Alternative: Set a state 'canPlay' -> useEffect -> play.
            // Or: just emit a custom event.
            window.dispatchEvent(new Event('hero-buffer-ready'))
          })
        }

        // Phase 3: Rest of Sequence
        const chunkSize = 50
        const loadRest = async () => {
          for (let i = 51; i <= frameCount; i += chunkSize) {
            await loadBatch(i, Math.min(i + chunkSize - 1, frameCount))
            // Small breathing room for UI
            await new Promise(r => setTimeout(r, 50))
          }
        }
        loadRest()
      })
    }

    // Start Loading
    loadImages()

    // 2. Setup Canvas & Animation
    const ctx = gsap.context(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const context = canvas.getContext('2d')
      if (!context) return

      // Render loop
      const render = () => {
        const frameIndex = Math.round(currentFrame.current.frame) // Access .current
        const img = imagesRef.current[frameIndex]

        if (!context || !img || !img.complete || img.naturalWidth === 0) return

        // Draw image cover logic
        const hRatio = canvas.width / img.width
        const vRatio = canvas.height / img.height
        const ratio = Math.max(hRatio, vRatio)
        const centerShift_x = (canvas.width - img.width * ratio) / 2
        const centerShift_y = (canvas.height - img.height * ratio) / 2

        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(
          img,
          0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        )
      }

      // Set canvas size
      const updateSize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        // Redraw current frame on resize
        if (imagesRef.current[Math.round(currentFrame.current.frame)]) { // Access .current
          render()
        }
      }
      updateSize()
      window.addEventListener('resize', updateSize)

      // Animation Timeline (Paused initially)
      const duration = frameCount / 24 // 24 fps
      const tl = gsap.timeline({
        paused: true,
        repeat: -1,
        onUpdate: render
      })

      tl.to(currentFrame.current, { // Animate .current
        frame: frameCount - 1,
        duration: duration,
        ease: 'none',
      })

      // Listen for buffer ready
      const startAnimation = () => {
        tl.play()
      }
      window.addEventListener('hero-buffer-ready', startAnimation)

      // Initial Render Check
      const checkFirstFrame = setInterval(() => {
        if (imagesRef.current[0] && imagesRef.current[0].complete) {
          render()
          clearInterval(checkFirstFrame)
        }
      }, 50)

      // CTA Entrance (Independent)
      gsap.from('.hero-cta', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
      })

      // Scroll Indicator Fade
      gsap.from('.scroll-indicator', {
        opacity: 0,
        delay: 1.5
      })

      // Curve Animation
      const curve = document.querySelector('.hero-curve-path')
      if (curve) {
        gsap.to(curve, {
          attr: { d: 'M0,0 C480,0 960,0 1440,0 V100 H0 Z' },
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          },
          ease: 'none'
        })
      }

      return () => window.removeEventListener('resize', updateSize)
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
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-obsidian-950" id="hero">
      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 object-cover"
      />

      {/* Fallback while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 z-0 bg-obsidian-950 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-bronze-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-950/30 via-transparent to-obsidian-950/80 z-10 pointer-events-none" />

      {/* Content Layer */}
      <div className="relative z-20 h-full flex items-end justify-center pb-32 md:pb-40">
        <div className="container-editorial text-center">
          {/* Buttons moved to bottom */}
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

      <button
        onClick={handleScroll}
        className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 text-bronze-500 hover:text-bronze-400 transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-light">Discover</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-bronze-500/60 to-transparent group-hover:h-20 transition-all duration-500" />
      </button>

      {/* Curved Divider */}
      <div className="absolute bottom-0 left-0 w-full z-[15] translate-y-[1px] pointer-events-none">
        <svg
          viewBox="0 0 1440 100"
          className="w-full h-[80px] md:h-[120px] fill-obsidian-950 block"
          preserveAspectRatio="none"
        >
          <path
            className="hero-curve-path"
            d="M0,0 C480,100 960,100 1440,0 V100 H0 Z"
          />
        </svg>
      </div>
    </section>
  )
}
