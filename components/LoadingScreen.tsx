'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { getAssetPath } from '@/lib/utils'

interface LoadingScreenProps {
    onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0)
    const [fadeOut, setFadeOut] = useState(false)
    const calledRef = useRef(false)

    useEffect(() => {
        // Critical assets: first 60 hero frames + sequence 1 frame 0
        // Enough to deliver a smooth hero + first scroll section immediately
        const heroFrames = Array.from({ length: 60 }, (_, i) =>
            getAssetPath(`/images/sequence/hero-bg-webp/${(i + 1).toString().padStart(4, '0')}.webp`)
        )
        const seq1Frame0 = getAssetPath(
            `/images/sequence/Sketch_to_Luxury_Home_Evolution/frame_0001.webp`
        )
        const criticalAssets = [...heroFrames, seq1Frame0]
        const total = criticalAssets.length
        let loaded = 0

        const loadAsset = (src: string) =>
            new Promise<void>((resolve) => {
                const img = new window.Image()
                img.onload = img.onerror = () => {
                    loaded++
                    setProgress(Math.round((loaded / total) * 100))
                    resolve()
                }
                img.src = src
            })

        Promise.all(criticalAssets.map(loadAsset)).then(() => {
            if (calledRef.current) return
            calledRef.current = true
            setProgress(100)
            setTimeout(() => {
                setFadeOut(true)
                setTimeout(onComplete, 700)
            }, 300)
        })
    }, [onComplete])

    return (
        <div
            className="fixed inset-0 z-[9999] bg-obsidian-950 flex flex-col items-center justify-center"
            style={{
                transition: 'opacity 0.7s ease',
                opacity: fadeOut ? 0 : 1,
                pointerEvents: fadeOut ? 'none' : 'all',
            }}
        >
            {/* Logo */}
            <div className="mb-16 opacity-90">
                <Image
                    src={getAssetPath('/logo.webp')}
                    alt="Luxury UAE"
                    width={120}
                    height={80}
                    className="object-contain"
                    priority
                />
            </div>

            {/* Thin bronze progress bar */}
            <div className="w-48 md:w-64 h-[1px] bg-obsidian-800 relative overflow-hidden">
                <div
                    className="absolute inset-y-0 left-0 bg-bronze-500"
                    style={{
                        width: `${progress}%`,
                        transition: 'width 0.3s ease-out',
                    }}
                />
            </div>

            {/* Percentage */}
            <p className="mt-5 text-[10px] uppercase tracking-[0.4em] text-bronze-500/50">
                {progress < 100 ? `${progress}%` : 'Welcome'}
            </p>
        </div>
    )
}
