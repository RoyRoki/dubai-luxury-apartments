'use client'

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getAssetPath, debounce } from '@/lib/utils'

import { motion } from 'framer-motion'

interface ScrollSequenceProps {
    sequenceName?: string
    title?: string
    subtitle?: string
    frameCount?: number
    curveVariant?: 'asymmetric' | 'diagonal' | 'stepped' | 'stepped-top' | 'wave-flow' | 'geometric-sharp' | 'layered-depth' | 'wave-top' | 'geometric-top' | 'layered-top' | 'none'
    textColor?: 'light' | 'dark' | 'gold'
    lazyLoad?: boolean // Load images only when section is near viewport
    nextSectionBg?: 'obsidian-950' | 'obsidian-900' // Background color of next section for bottom curves
    className?: string
    isMobile?: boolean
}

export default function ScrollSequence({
    sequenceName = 'scroll-sequence',
    title = 'Cinematic Living',
    subtitle = 'Experience every moment in perfect detail.',
    frameCount = 120,
    curveVariant = 'none',
    textColor = 'light',
    lazyLoad = false,
    nextSectionBg = 'obsidian-900',
    className = '',
    isMobile = false,
}: ScrollSequenceProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isInView, setIsInView] = useState(!lazyLoad) // If not lazy, start as "in view"

    // Configuration
    const padNumber = useCallback((n: number) => n.toString().padStart(4, '0'), [])
    const getFrameUrl = useCallback((index: number) => {
        const folder = isMobile ? 'sequence-mobile' : 'sequence'
        return getAssetPath(`/images/${folder}/${sequenceName}/frame_${padNumber(index + 1)}.webp`)
    }, [sequenceName, padNumber, isMobile])

    // Intersection Observer for lazy loading
    useEffect(() => {
        // Global ScrollTrigger configuration for mobile performance
        ScrollTrigger.config({
            ignoreMobileResize: true
        })

        if (!lazyLoad || !containerRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true)
                    }
                })
            },
            {
                rootMargin: '50% 0px 50% 0px', // Start loading when section is 50vh before entering viewport
                threshold: 0
            }
        )

        observer.observe(containerRef.current)

        return () => observer.disconnect()
    }, [lazyLoad])

    useEffect(() => {
        if (!isInView) return // Don't load until in view (or not lazy loading)

        let isActive = true

        // Helper to load image with fallback
        const loadImageWithFallback = async (index: number): Promise<HTMLImageElement | null> => {
            return new Promise((resolve) => {
                const img = new Image()
                const folder = isMobile ? 'sequence-mobile' : 'sequence'
                // Use the correct path construction
                const primaryUrl = getAssetPath(`/images/${folder}/${sequenceName}/frame_${padNumber(index + 1)}.webp`)

                img.src = primaryUrl

                img.onload = () => resolve(img)

                img.onerror = () => {
                    console.warn(`Failed to load frame ${index} from ${folder}. Trying fallback.`)

                    // Fallback logic: if mobile failed, try desktop. 
                    if (isMobile) {
                        const fallbackImg = new Image()
                        const fallbackUrl = getAssetPath(`/images/sequence/${sequenceName}/frame_${padNumber(index + 1)}.webp`)
                        fallbackImg.src = fallbackUrl
                        fallbackImg.onload = () => {
                            console.log(`Fallback successful for frame ${index}`)
                            resolve(fallbackImg)
                        }
                        fallbackImg.onerror = () => {
                            console.error(`Fallback failed for frame ${index}`)
                            resolve(null)
                        }
                    } else {
                        resolve(null)
                    }
                }
            })
        }

        // Preload images
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = []

            // Prioritize first frame for immediate feedback
            const firstImg = await loadImageWithFallback(0)

            if (!isActive) return

            if (firstImg) {
                loadedImages[0] = firstImg
                setImages((prev) => {
                    if (prev.length === 0) return [...loadedImages]
                    return prev
                })
                setIsLoading(false)
            } else {
                console.error("FATAL: First frame failed to load even with fallback")
                // Keep loading spinner to indicate issue? Or hide?
            }

            // Load the rest of the frames in batches
            const BATCH_SIZE = 10
            for (let i = 1; i < frameCount; i += BATCH_SIZE) {
                if (!isActive) break

                const batchPromises: Promise<void>[] = []
                const end = Math.min(i + BATCH_SIZE, frameCount)

                for (let j = i; j < end; j++) {
                    batchPromises.push(
                        loadImageWithFallback(j).then(img => {
                            if (isActive && img) loadedImages[j] = img
                        })
                    )
                }

                await Promise.all(batchPromises)

                if (isActive && loadedImages.length > 0) {
                    // updates could happen here
                }
            }

            if (isActive) {
                setImages(loadedImages)
                ScrollTrigger.refresh()
            }
        }

        loadImages()

        return () => {
            isActive = false
        }
    }, [getFrameUrl, frameCount, isInView, isMobile, sequenceName, padNumber])

    // Use ref for images to access in render loop without dependency issues
    const imagesRef = useRef<HTMLImageElement[]>([])
    const currentFrameRef = useRef<number>(0)

    // Update ref when images change
    useEffect(() => {
        imagesRef.current = images
        if (!isLoading && images.length > 0) {
            // Force a refresh once images are ready to ensure everything is synced
            ScrollTrigger.refresh()

            // Draw the first frame immediately to avoid black screen
            const canvas = canvasRef.current
            const context = canvas?.getContext('2d')
            const firstImage = images[0]

            if (canvas && context && firstImage && firstImage.complete) {
                // Set dimensions if not already set (though the other effect handles this, safer to ensure)
                canvas.width = window.innerWidth
                canvas.height = window.innerHeight

                const ratio = Math.max(canvas.width / firstImage.width, canvas.height / firstImage.height)
                const centerShift_x = (canvas.width - firstImage.width * ratio) / 2
                const centerShift_y = (canvas.height - firstImage.height * ratio) / 2

                context.clearRect(0, 0, canvas.width, canvas.height)
                context.drawImage(
                    firstImage,
                    0,
                    0,
                    firstImage.width,
                    firstImage.height,
                    centerShift_x,
                    centerShift_y,
                    firstImage.width * ratio,
                    firstImage.height * ratio
                )
            }
        }
    }, [images, isLoading])

    useLayoutEffect(() => {
        if (!canvasRef.current || !containerRef.current) return

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        if (!context) return

        // Set canvas dimensions immediately
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Render loop with mobile frame skipping optimization
        const renderFrame = (index: number) => {
            const imgs = imagesRef.current
            // Mobile optimization: skip every other frame (60 effective frames vs 120)
            let frameIndex = isMobile ? Math.round(index / 2) * 2 : Math.round(index)

            // Safety check for bounds
            if (frameIndex >= imagesRef.current.length) {
                frameIndex = imagesRef.current.length - 1
            }

            currentFrameRef.current = frameIndex // Track current frame for resize
            const img = imgs[frameIndex]
            if (!img || !img.complete) return

            // Draw image "cover" style
            const ratio = Math.max(canvas.width / img.width, canvas.height / img.height)
            const centerShift_x = (canvas.width - img.width * ratio) / 2
            const centerShift_y = (canvas.height - img.height * ratio) / 2

            context.clearRect(0, 0, canvas.width, canvas.height)
            context.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                centerShift_x,
                centerShift_y,
                img.width * ratio,
                img.height * ratio
            )
        }

        // Initial render if images exist
        if (imagesRef.current[0] && imagesRef.current[0].complete) {
            renderFrame(0)
        }

        // Track last width to detect real resize (not mobile address bar)
        let lastWidth = window.innerWidth

        // Set canvas dimensions (only on width change to avoid mobile address bar interruption)
        const resizeCanvas = () => {
            const newWidth = window.innerWidth
            // Only resize if width changed (mobile address bar only affects height)
            if (newWidth !== lastWidth) {
                lastWidth = newWidth
                canvas.width = newWidth
                canvas.height = window.innerHeight
                renderFrame(currentFrameRef.current) // Re-render current frame
            }
        }

        // Debounced resize handler to prevent interruption during scroll
        const debouncedResize = debounce(resizeCanvas, 150)

        // Initial render
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        window.addEventListener('resize', debouncedResize)

        // Use gsap.context for proper cleanup/scoping
        const ctx = gsap.context(() => {
            // GSAP ScrollTrigger
            const obj = { frame: 0 }

            // Longer scroll duration on mobile for better viewing
            // Use prop instead of local calculation for consistency
            const scrollDuration = isMobile ? '+=250%' : '+=150%'
            const pinSpacing = true // Enable pinSpacing on mobile to match desktop behavior

            gsap.to(obj, {
                frame: frameCount - 1,
                ...(isMobile ? {} : { snap: 'frame' }),
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: scrollDuration, // Extended on mobile for better UX
                    scrub: 0.5,
                    pin: true,
                    pinType: 'fixed',
                    pinSpacing: pinSpacing,
                    anticipatePin: isMobile ? 0 : 1,
                    invalidateOnRefresh: true,
                    fastScrollEnd: isMobile ? false : true,
                    preventOverlaps: true,
                    onUpdate: (self) => renderFrame(obj.frame),
                },
            })

            // Text Animation
            gsap.fromTo('.scroll-reveal',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: '+=80%',
                        scrub: 1,
                    }
                }
            )

            gsap.to('.scroll-reveal', {
                opacity: 0,
                y: -50,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top+=100% top',
                    end: 'top+=130% top',
                    scrub: 1,
                }
            })
        }, containerRef)

        return () => {
            window.removeEventListener('resize', debouncedResize)
            ctx.revert()
        }
    }, [frameCount, isMobile]) // Removed isLoading and images dependency to prevent re-init

    const getTitleClass = () => {
        if (textColor === 'dark') return 'text-obsidian-950'
        if (textColor === 'gold') return 'text-bronze-500 drop-shadow-md'
        return 'text-ivory-100 mix-blend-difference'
    }

    const getSubtitleClass = () => {
        if (textColor === 'dark') return 'text-obsidian-900'
        if (textColor === 'gold') return 'text-bronze-400 drop-shadow-sm'
        return 'text-ivory-200 mix-blend-difference'
    }

    return (
        <div
            ref={containerRef}
            className={`relative h-[100svh] w-full bg-obsidian-950 z-20 ${className}`}
            id="experience"
            style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
                contain: 'layout paint',
                touchAction: isMobile ? 'pan-y' : 'auto' // Allow vertical scrolling on mobile
            }}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ willChange: 'transform' }} // Optimization hint
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
                <div className="scroll-reveal text-center max-w-4xl opacity-0">
                    <h2 className={`heading-xl mb-6 ${getTitleClass()}`}>
                        {title}
                    </h2>
                    <p className={`text-xl md:text-2xl font-light ${getSubtitleClass()}`}>
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* Curve Divider */}
            {curveVariant === 'asymmetric' && (
                <div className="absolute bottom-0 left-0 w-full z-30 translate-y-[1px] pointer-events-none">
                    <svg
                        viewBox="0 0 1440 120"
                        className={`w-full h-[80px] md:h-[120px] fill-${nextSectionBg} block`}
                        preserveAspectRatio="none"
                    >
                        <path d="M0,0 C240,120 480,120 720,60 C960,0 1200,0 1440,60 V120 H0 Z" />
                    </svg>
                </div>
            )}

            {curveVariant === 'diagonal' && (
                <div className="absolute bottom-0 left-0 w-full z-30 translate-y-[2px] pointer-events-none">
                    <svg
                        viewBox="0 0 1440 120"
                        className="w-full h-[80px] md:h-[120px] block"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,120 L1440,80"
                            className="fill-none stroke-bronze-500 stroke-[4px]"
                        />
                    </svg>
                </div>
            )}

            {curveVariant === 'stepped' && (
                <div className="absolute bottom-0 left-0 w-full z-30 translate-y-[2px] pointer-events-none">
                    <svg
                        viewBox="0 0 1440 120"
                        className="w-full h-[60px] md:h-[100px] block"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M0,20 L360,20 L360,60 L720,60 L720,20 L1080,20 L1080,60 L1440,60"
                            className="fill-none stroke-bronze-500 stroke-[3px]"
                        />
                    </svg>
                </div>
            )}

            {curveVariant === 'stepped-top' && (
                <div className="absolute top-0 left-0 w-full z-30 translate-y-[-1px] pointer-events-none">
                    <svg
                        viewBox="0 0 1440 120"
                        className="w-full h-[60px] md:h-[100px] block"
                        preserveAspectRatio="none"
                    >
                        {/* Fill Shape (No Stroke) */}
                        <path
                            d="M0,0 L1440,0 L1440,80 L1080,80 L1080,40 L720,40 L720,80 L360,80 L360,40 L0,40 Z"
                            className="fill-obsidian-900 stroke-none"
                        />
                        {/* Bottom Stroke Only */}
                        <path
                            d="M1440,80 L1080,80 L1080,40 L720,40 L720,80 L360,80 L360,40 L0,40"
                            className="fill-none stroke-bronze-500 stroke-[3px]"
                        />
                    </svg>
                </div>
            )}

            {/* Wave Flow - Bottom (Organic smooth waves) */}
            {curveVariant === 'wave-flow' && (
                <div className="absolute bottom-0 left-0 w-full z-30 translate-y-[1px] pointer-events-none">
                    <svg
                        viewBox="0 0 1440 120"
                        className={`w-full h-[80px] md:h-[120px] fill-${nextSectionBg} block`}
                        preserveAspectRatio="none"
                    >
                        <path d="M0,40 C120,80 240,80 360,60 C480,40 600,20 720,40 C840,60 960,80 1080,60 C1200,40 1320,20 1440,40 L1440,120 L0,120 Z" />
                        <path
                            d="M0,40 C120,80 240,80 360,60 C480,40 600,20 720,40 C840,60 960,80 1080,60 C1200,40 1320,20 1440,40"
                            className="fill-none stroke-bronze-500 stroke-[2px] opacity-60"
                        />
                    </svg>
                </div>
            )}

            {/* Geometric Sharp - Bottom (Angular modern cuts) */}
            {curveVariant === 'geometric-sharp' && (
                <div className="absolute bottom-0 left-0 w-full z-30 translate-y-[1px] pointer-events-none">
                    <svg
                        viewBox="0 0 1440 120"
                        className={`w-full h-[80px] md:h-[120px] fill-${nextSectionBg} block`}
                        preserveAspectRatio="none"
                    >
                        <path d="M0,60 L240,20 L480,70 L720,30 L960,80 L1200,40 L1440,70 L1440,120 L0,120 Z" />
                        <path
                            d="M0,60 L240,20 L480,70 L720,30 L960,80 L1200,40 L1440,70"
                            className="fill-none stroke-bronze-500 stroke-[3px]"
                        />
                    </svg>
                </div>
            )}

            {/* Layered Depth - Bottom (Multiple overlapping curves with depth) */}
            {curveVariant === 'layered-depth' && (
                <div className="absolute bottom-0 left-0 w-full z-30 translate-y-[1px] pointer-events-none">
                    <svg
                        viewBox="0 0 1440 120"
                        className="w-full h-[100px] md:h-[140px] block"
                        preserveAspectRatio="none"
                    >
                        {/* Back layer */}
                        <path
                            d="M0,80 Q360,40 720,80 T1440,80 L1440,120 L0,120 Z"
                            className={`fill-${nextSectionBg} opacity-50`}
                        />
                        {/* Middle layer */}
                        <path
                            d="M0,60 Q360,30 720,60 T1440,60 L1440,120 L0,120 Z"
                            className={`fill-${nextSectionBg} opacity-75`}
                        />
                        {/* Front layer */}
                        <path
                            d="M0,40 Q360,20 720,40 T1440,40 L1440,120 L0,120 Z"
                            className={`fill-${nextSectionBg}`}
                        />
                        {/* Bronze accent lines */}
                        <path
                            d="M0,40 Q360,20 720,40 T1440,40"
                            className="fill-none stroke-bronze-500 stroke-[2px] opacity-80"
                        />
                        <path
                            d="M0,60 Q360,30 720,60 T1440,60"
                            className="fill-none stroke-bronze-500 stroke-[2px] opacity-40"
                        />
                    </svg>
                </div>
            )}

            {/* Wave Top (Organic smooth waves at top) */}
            {curveVariant === 'wave-top' && (
                <div className="absolute top-0 left-0 w-full z-30 translate-y-[-1px] pointer-events-none">
                    <svg
                        viewBox="0 0 1440 120"
                        className="w-full h-[80px] md:h-[120px] block"
                        preserveAspectRatio="none"
                    >
                        {/* Fill shape */}
                        <path
                            d="M0,0 L1440,0 L1440,80 C1320,100 1200,100 1080,80 C960,60 840,40 720,60 C600,80 480,100 360,80 C240,60 120,40 0,60 Z"
                            className={`fill-${nextSectionBg}`}
                        />
                        {/* Bronze accent line */}
                        <path
                            d="M1440,80 C1320,100 1200,100 1080,80 C960,60 840,40 720,60 C600,80 480,100 360,80 C240,60 120,40 0,60"
                            className="fill-none stroke-bronze-500 stroke-[2px] opacity-60"
                        />
                    </svg>
                </div>
            )}

            {/* Geometric Top (Angular modern cuts at top) */}
            {curveVariant === 'geometric-top' && (
                <div className="absolute top-0 left-0 w-full z-30 translate-y-[-1px] pointer-events-none">
                    <svg
                        viewBox="0 0 1440 120"
                        className="w-full h-[80px] md:h-[120px] block"
                        preserveAspectRatio="none"
                    >
                        {/* Fill shape */}
                        <path
                            d="M0,0 L1440,0 L1440,60 L1200,80 L960,40 L720,90 L480,50 L240,100 L0,70 Z"
                            className={`fill-${nextSectionBg}`}
                        />
                        {/* Bronze accent line */}
                        <path
                            d="M1440,60 L1200,80 L960,40 L720,90 L480,50 L240,100 L0,70"
                            className="fill-none stroke-bronze-500 stroke-[3px]"
                        />
                    </svg>
                </div>
            )}

            {/* Layered Top (Multiple overlapping curves at top with depth) */}
            {curveVariant === 'layered-top' && (
                <div className="absolute top-0 left-0 w-full z-30 translate-y-[-1px] pointer-events-none">
                    <svg
                        viewBox="0 0 1440 120"
                        className="w-full h-[100px] md:h-[140px] block"
                        preserveAspectRatio="none"
                    >
                        {/* Back layer */}
                        <path
                            d="M0,0 L1440,0 L1440,40 Q1080,60 720,40 T0,40 Z"
                            className={`fill-${nextSectionBg} opacity-50`}
                        />
                        {/* Middle layer */}
                        <path
                            d="M0,0 L1440,0 L1440,60 Q1080,90 720,60 T0,60 Z"
                            className={`fill-${nextSectionBg} opacity-75`}
                        />
                        {/* Front layer */}
                        <path
                            d="M0,0 L1440,0 L1440,80 Q1080,120 720,80 T0,80 Z"
                            className={`fill-${nextSectionBg}`}
                        />
                        {/* Bronze accent lines */}
                        <path
                            d="M1440,80 Q1080,120 720,80 T0,80"
                            className="fill-none stroke-bronze-500 stroke-[2px] opacity-80"
                        />
                        <path
                            d="M1440,60 Q1080,90 720,60 T0,60"
                            className="fill-none stroke-bronze-500 stroke-[2px] opacity-40"
                        />
                    </svg>
                </div>
            )}

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-obsidian-950 z-30">
                    <div className="w-16 h-16 border-2 border-bronze-500/30 border-t-bronze-500 rounded-full animate-spin" />
                </div>
            )}
        </div>
    )
}
