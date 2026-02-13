'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { getAssetPath, debounce } from '@/lib/utils'

interface ScrollSequenceProps {
    sequenceName?: string
    title?: string
    subtitle?: string
    frameCount?: number
    curveVariant?: 'asymmetric' | 'diagonal' | 'stepped' | 'stepped-top' | 'wave-flow' | 'geometric-sharp' | 'layered-depth' | 'wave-top' | 'geometric-top' | 'layered-top' | 'none'
    textColor?: 'light' | 'dark' | 'gold' | 'deep-gold'
    lazyLoad?: boolean
    nextSectionBg?: 'obsidian-950' | 'obsidian-900'
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
    const outerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [isLoading, setIsLoading] = useState(true)
    const [loadProgress, setLoadProgress] = useState(0)
    const [isInView, setIsInView] = useState(!lazyLoad)
    const [textOpacity, setTextOpacity] = useState(0)
    const [textY, setTextY] = useState(50)

    const imagesRef = useRef<HTMLImageElement[]>([])
    const currentFrameRef = useRef(0)
    const lastRenderedFrameRef = useRef(-1)
    const rafRef = useRef<number | null>(null)
    const pendingFrameRef = useRef<number | null>(null)

    const padNumber = useCallback((n: number) => n.toString().padStart(4, '0'), [])

    // px of scroll while pinned — more = slower animation feel
    const scrollDist = frameCount * (isMobile ? 12 : 9)

    // ─── Canvas render ─────────────────────────────────────────────────────────
    // CRITICAL: use setTransform (not scale) — scale() accumulates on each call
    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const frameIndex = Math.max(0, Math.min(Math.round(index), frameCount - 1))
        currentFrameRef.current = frameIndex

        let img = imagesRef.current[frameIndex]
        if ((!img || !img.complete) && lastRenderedFrameRef.current !== -1) {
            img = imagesRef.current[lastRenderedFrameRef.current]
        }
        if (!img || !img.complete || img.naturalWidth === 0) return

        const rect = canvas.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return

        const dpr = window.devicePixelRatio || 1
        const pw = Math.round(rect.width * dpr)
        const ph = Math.round(rect.height * dpr)

        // Resize only when needed
        if (canvas.width !== pw || canvas.height !== ph) {
            canvas.width = pw
            canvas.height = ph
        }

        // ALWAYS reset transform before drawing — prevents scale accumulation
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        const w = rect.width
        const h = rect.height
        const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight)
        const ox = (w - img.naturalWidth * scale) / 2
        const oy = (h - img.naturalHeight * scale) / 2

        ctx.clearRect(0, 0, w, h)
        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, ox, oy, img.naturalWidth * scale, img.naturalHeight * scale)

        if (imagesRef.current[frameIndex]) lastRenderedFrameRef.current = frameIndex
    }, [frameCount])

    // ─── Native scroll handler ─────────────────────────────────────────────────
    useEffect(() => {
        const outer = outerRef.current
        if (!outer) return

        const onScroll = () => {
            const rect = outer.getBoundingClientRect()
            // totalScroll = the px range where sticky is active
            const totalScroll = outer.offsetHeight - window.innerHeight
            if (totalScroll <= 0) return

            const scrolled = Math.max(0, -rect.top)
            const progress = Math.min(scrolled / totalScroll, 1)
            const targetFrame = Math.floor(progress * (frameCount - 1))

            // Text: fade in at 0–20%, hold for the rest (no fade out)
            let opacity = 0, y = 50
            if (progress < 0.2) {
                opacity = progress / 0.2
                y = 50 * (1 - progress / 0.2)
            } else {
                opacity = 1; y = 0
            }

            setTextOpacity(opacity)
            setTextY(y)

            pendingFrameRef.current = targetFrame
            if (rafRef.current === null) {
                rafRef.current = requestAnimationFrame(() => {
                    if (pendingFrameRef.current !== null) renderFrame(pendingFrameRef.current)
                    rafRef.current = null
                })
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [frameCount, renderFrame])

    // ─── Resize handler ────────────────────────────────────────────────────────
    useEffect(() => {
        let lastWidth = window.innerWidth
        const onResize = debounce(() => {
            if (window.innerWidth !== lastWidth) {
                lastWidth = window.innerWidth
                renderFrame(currentFrameRef.current)
            }
        }, 150)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [renderFrame])

    // ─── Lazy intersection ─────────────────────────────────────────────────────
    useEffect(() => {
        if (!lazyLoad || !outerRef.current) return
        const observer = new IntersectionObserver(
            (entries) => { if (entries[0].isIntersecting) setIsInView(true) },
            { rootMargin: '300% 0px 300% 0px', threshold: 0 }
        )
        observer.observe(outerRef.current)
        return () => observer.disconnect()
    }, [lazyLoad])

    // ─── Image loading ─────────────────────────────────────────────────────────
    useEffect(() => {
        if (!isInView) return
        let isActive = true

        const loadImg = (index: number): Promise<HTMLImageElement | null> =>
            new Promise((resolve) => {
                const img = new Image()
                const folder = isMobile ? 'sequence-mobile' : 'sequence'
                img.src = getAssetPath(`/images/${folder}/${sequenceName}/frame_${padNumber(index + 1)}.webp`)
                img.onload = () => resolve(img)
                img.onerror = () => {
                    if (!isMobile) return resolve(null)
                    const fb = new Image()
                    fb.src = getAssetPath(`/images/sequence/${sequenceName}/frame_${padNumber(index + 1)}.webp`)
                    fb.onload = () => resolve(fb)
                    fb.onerror = () => resolve(null)
                }
            })

        const run = async () => {
            const loaded: HTMLImageElement[] = []
            const BATCH = 10

            // Load frame 0 first so canvas can render in background while spinner shows
            const first = await loadImg(0)
            if (!isActive) return
            if (first) {
                loaded[0] = first
                imagesRef.current = [...loaded]
                setLoadProgress(Math.round(1 / frameCount * 100))
                renderFrame(0)
            }

            // Load rest in batches — keep spinner until ALL done
            for (let i = 1; i < frameCount; i += BATCH) {
                if (!isActive) break
                const end = Math.min(i + BATCH, frameCount)
                const results = await Promise.all(
                    Array.from({ length: end - i }, (_, k) =>
                        loadImg(i + k).then(img => ({ idx: i + k, img }))
                    )
                )
                if (!isActive) break
                results.forEach(({ idx, img }) => { if (img) loaded[idx] = img })
                imagesRef.current = [...loaded]
                setLoadProgress(Math.round(end / frameCount * 100))
            }

            if (!isActive) return
            setIsLoading(false)
        }

        run()
        return () => { isActive = false }
    }, [isInView, isMobile, frameCount, sequenceName, padNumber, renderFrame])

    const getTitleClass = () => {
        if (textColor === 'dark') return 'text-obsidian-950'
        if (textColor === 'gold') return 'text-bronze-500 drop-shadow-md'
        if (textColor === 'deep-gold') return 'text-[#D4AF37] drop-shadow-sm'
        return 'text-ivory-100 mix-blend-difference'
    }
    const getSubtitleClass = () => {
        if (textColor === 'dark') return 'text-obsidian-900'
        if (textColor === 'gold') return 'text-bronze-400 drop-shadow-sm'
        if (textColor === 'deep-gold') return 'text-bronze-700'
        return 'text-ivory-200 mix-blend-difference'
    }

    return (
        /*
         * Outer div: height = 100dvh (viewport) + scrollDist (animation distance)
         * bg-obsidian-950 prevents black flash when sticky un-sticks at the end
         * overscroll-behavior-none stops iOS rubber-band "come back" effect
         * NO overflow:hidden — that would break position:sticky
         */
        <div
            ref={outerRef}
            className={`relative bg-obsidian-950 ${className}`}
            id="experience"
            style={{
                height: `calc(100dvh + ${scrollDist}px)`,
                overscrollBehavior: 'none',
            }}
        >
            {/*
             * Sticky child: exactly 100dvh tall, sticks to top.
             * 100dvh (dynamic) adapts when mobile browser chrome shows/hides,
             * preventing height jumps that cause the "fly" glitch.
             */}
            <div
                className="sticky top-0 w-full bg-obsidian-950 overflow-hidden"
                style={{ height: '100dvh' }}
            >
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

                {/* Overlay Text */}
                <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none z-10">
                    <div
                        className="text-center max-w-4xl"
                        style={{ opacity: textOpacity, transform: `translateY(${textY}px)` }}
                    >
                        <h2 className={`heading-xl mb-6 ${getTitleClass()}`}>{title}</h2>
                        <p className={`text-xl md:text-2xl font-light ${getSubtitleClass()}`}>{subtitle}</p>
                    </div>
                </div>

                {/* Curve Dividers */}
                {curveVariant === 'asymmetric' && (
                    <div className="absolute bottom-0 left-0 w-full z-30 translate-y-[1px] pointer-events-none">
                        <svg viewBox="0 0 1440 120" className={`w-full h-[80px] md:h-[120px] fill-${nextSectionBg} block`} preserveAspectRatio="none">
                            <path d="M0,0 C240,120 480,120 720,60 C960,0 1200,0 1440,60 V120 H0 Z" />
                        </svg>
                    </div>
                )}
                {curveVariant === 'diagonal' && (
                    <div className="absolute bottom-0 left-0 w-full z-30 translate-y-[2px] pointer-events-none">
                        <svg viewBox="0 0 1440 120" className="w-full h-[80px] md:h-[120px] block" preserveAspectRatio="none">
                            <path d="M0,120 L1440,80" className="fill-none stroke-bronze-500 stroke-[4px]" />
                        </svg>
                    </div>
                )}
                {curveVariant === 'stepped' && (
                    <div className="absolute bottom-0 left-0 w-full z-30 translate-y-[2px] pointer-events-none">
                        <svg viewBox="0 0 1440 120" className="w-full h-[60px] md:h-[100px] block" preserveAspectRatio="none">
                            <path d="M0,20 L360,20 L360,60 L720,60 L720,20 L1080,20 L1080,60 L1440,60" className="fill-none stroke-bronze-500 stroke-[3px]" />
                        </svg>
                    </div>
                )}
                {curveVariant === 'stepped-top' && (
                    <div className="absolute top-0 left-0 w-full z-30 translate-y-[-1px] pointer-events-none">
                        <svg viewBox="0 0 1440 120" className="w-full h-[60px] md:h-[100px] block" preserveAspectRatio="none">
                            <path d="M0,0 L1440,0 L1440,80 L1080,80 L1080,40 L720,40 L720,80 L360,80 L360,40 L0,40 Z" className="fill-obsidian-900 stroke-none" />
                            <path d="M1440,80 L1080,80 L1080,40 L720,40 L720,80 L360,80 L360,40 L0,40" className="fill-none stroke-bronze-500 stroke-[3px]" />
                        </svg>
                    </div>
                )}
                {curveVariant === 'wave-flow' && (
                    <div className="absolute bottom-0 left-0 w-full z-30 translate-y-[1px] pointer-events-none">
                        <svg viewBox="0 0 1440 120" className={`w-full h-[80px] md:h-[120px] fill-${nextSectionBg} block`} preserveAspectRatio="none">
                            <path d="M0,40 C120,80 240,80 360,60 C480,40 600,20 720,40 C840,60 960,80 1080,60 C1200,40 1320,20 1440,40 L1440,120 L0,120 Z" />
                            <path d="M0,40 C120,80 240,80 360,60 C480,40 600,20 720,40 C840,60 960,80 1080,60 C1200,40 1320,20 1440,40" className="fill-none stroke-bronze-500 stroke-[2px] opacity-60" />
                        </svg>
                    </div>
                )}
                {curveVariant === 'geometric-sharp' && (
                    <div className="absolute bottom-0 left-0 w-full z-30 translate-y-[1px] pointer-events-none">
                        <svg viewBox="0 0 1440 120" className={`w-full h-[80px] md:h-[120px] fill-${nextSectionBg} block`} preserveAspectRatio="none">
                            <path d="M0,60 L240,20 L480,70 L720,30 L960,80 L1200,40 L1440,70 L1440,120 L0,120 Z" />
                            <path d="M0,60 L240,20 L480,70 L720,30 L960,80 L1200,40 L1440,70" className="fill-none stroke-bronze-500 stroke-[3px]" />
                        </svg>
                    </div>
                )}
                {curveVariant === 'layered-depth' && (
                    <div className="absolute bottom-0 left-0 w-full z-30 translate-y-[1px] pointer-events-none">
                        <svg viewBox="0 0 1440 120" className="w-full h-[100px] md:h-[140px] block" preserveAspectRatio="none">
                            <path d="M0,80 Q360,40 720,80 T1440,80 L1440,120 L0,120 Z" className={`fill-${nextSectionBg} opacity-50`} />
                            <path d="M0,60 Q360,30 720,60 T1440,60 L1440,120 L0,120 Z" className={`fill-${nextSectionBg} opacity-75`} />
                            <path d="M0,40 Q360,20 720,40 T1440,40 L1440,120 L0,120 Z" className={`fill-${nextSectionBg}`} />
                            <path d="M0,40 Q360,20 720,40 T1440,40" className="fill-none stroke-bronze-500 stroke-[2px] opacity-80" />
                            <path d="M0,60 Q360,30 720,60 T1440,60" className="fill-none stroke-bronze-500 stroke-[2px] opacity-40" />
                        </svg>
                    </div>
                )}
                {curveVariant === 'wave-top' && (
                    <div className="absolute top-0 left-0 w-full z-30 translate-y-[-1px] pointer-events-none">
                        <svg viewBox="0 0 1440 120" className="w-full h-[80px] md:h-[120px] block" preserveAspectRatio="none">
                            <path d="M0,0 L1440,0 L1440,80 C1320,100 1200,100 1080,80 C960,60 840,40 720,60 C600,80 480,100 360,80 C240,60 120,40 0,60 Z" className={`fill-${nextSectionBg}`} />
                            <path d="M1440,80 C1320,100 1200,100 1080,80 C960,60 840,40 720,60 C600,80 480,100 360,80 C240,60 120,40 0,60" className="fill-none stroke-bronze-500 stroke-[2px] opacity-60" />
                        </svg>
                    </div>
                )}
                {curveVariant === 'geometric-top' && (
                    <div className="absolute top-0 left-0 w-full z-30 translate-y-[-1px] pointer-events-none">
                        <svg viewBox="0 0 1440 120" className="w-full h-[80px] md:h-[120px] block" preserveAspectRatio="none">
                            <path d="M0,0 L1440,0 L1440,60 L1200,80 L960,40 L720,90 L480,50 L240,100 L0,70 Z" className={`fill-${nextSectionBg}`} />
                            <path d="M1440,60 L1200,80 L960,40 L720,90 L480,50 L240,100 L0,70" className="fill-none stroke-bronze-500 stroke-[3px]" />
                        </svg>
                    </div>
                )}
                {curveVariant === 'layered-top' && (
                    <div className="absolute top-0 left-0 w-full z-30 translate-y-[-1px] pointer-events-none">
                        <svg viewBox="0 0 1440 120" className="w-full h-[100px] md:h-[140px] block" preserveAspectRatio="none">
                            <path d="M0,0 L1440,0 L1440,40 Q1080,60 720,40 T0,40 Z" className={`fill-${nextSectionBg} opacity-50`} />
                            <path d="M0,0 L1440,0 L1440,60 Q1080,90 720,60 T0,60 Z" className={`fill-${nextSectionBg} opacity-75`} />
                            <path d="M0,0 L1440,0 L1440,80 Q1080,120 720,80 T0,80 Z" className={`fill-${nextSectionBg}`} />
                            <path d="M1440,80 Q1080,120 720,80 T0,80" className="fill-none stroke-bronze-500 stroke-[2px] opacity-80" />
                            <path d="M1440,60 Q1080,90 720,60 T0,60" className="fill-none stroke-bronze-500 stroke-[2px] opacity-40" />
                        </svg>
                    </div>
                )}

                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-obsidian-950 z-30 gap-6">
                        <div className="w-12 h-12 border border-bronze-500/30 border-t-bronze-500 rounded-full animate-spin" />
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-48 h-[1px] bg-obsidian-800 relative overflow-hidden">
                                <div
                                    className="absolute inset-y-0 left-0 bg-bronze-500 transition-all duration-300 ease-out"
                                    style={{ width: `${loadProgress}%` }}
                                />
                            </div>
                            <p className="text-[10px] text-bronze-500/50 uppercase tracking-[0.3em]">
                                {loadProgress < 100 ? `Loading ${loadProgress}%` : 'Ready'}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
