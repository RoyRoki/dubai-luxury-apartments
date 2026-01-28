'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getAssetPath } from '@/lib/utils'

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
}: ScrollSequenceProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isInView, setIsInView] = useState(!lazyLoad) // If not lazy, start as "in view"

    // Configuration
    const padNumber = useCallback((n: number) => n.toString().padStart(4, '0'), [])
    const getFrameUrl = useCallback((index: number) => getAssetPath(`/images/sequence/${sequenceName}/frame_${padNumber(index + 1)}.webp`), [sequenceName, padNumber])

    // Intersection Observer for lazy loading
    useEffect(() => {
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

        // Preload images
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = []
            const promises: Promise<void>[] = []

            for (let i = 0; i < frameCount; i++) {
                promises.push(
                    new Promise((resolve) => {
                        const img = new Image()
                        img.src = getFrameUrl(i)
                        img.onload = () => {
                            loadedImages[i] = img
                            resolve()
                        }
                    })
                )
            }

            await Promise.all(promises)
            setImages(loadedImages)
            setIsLoading(false)
        }

        loadImages()
    }, [getFrameUrl, frameCount, isInView])

    useEffect(() => {
        if (isLoading || !canvasRef.current || !containerRef.current || images.length === 0) return

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        if (!context) return

        // Set canvas dimensions immediately
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Render loop
        const renderFrame = (index: number) => {
            const img = images[Math.round(index)]
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

        if (images[0] && images[0].complete) {
            renderFrame(0)
        }

        // Set canvas dimensions
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            renderFrame(0) // Re-render current frame
        }

        // Initial render
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Use gsap.context for proper cleanup/scoping
        const ctx = gsap.context(() => {
            // GSAP ScrollTrigger
            const obj = { frame: 0 }

            gsap.to(obj, {
                frame: frameCount - 1,
                snap: 'frame',
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=150%', // 1.5x viewport height for proper pinning duration
                    scrub: 0.5,
                    pin: true,
                    pinSpacing: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
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
            window.removeEventListener('resize', resizeCanvas)
            ctx.revert()
        }
    }, [isLoading, images, frameCount])

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
        <div ref={containerRef} className={`relative h-[100vh] w-full bg-obsidian-950 z-20 ${className}`} id="experience">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-cover"
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
