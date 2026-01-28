'use client'

import { useEffect } from 'react'
import { getAssetPath } from '@/lib/utils'

// List of high-priority static assets to preload for below-the-fold content
// This ensures they are ready when the user scrolls down
const staticImages = [
    // Exterior Highlights
    '/images/exteriors/burj-vista.webp',
    '/images/exteriors/palm-jumeirah-villa.webp',

    // Interior Highlights
    '/images/interiors/marina-suite.webp',
    '/images/interiors/downtown-views.webp',
    '/images/interiors/luxury-bedroom-bright.webp',
    '/images/interiors/modern-dark-living.webp',
    '/images/interiors/chef-kitchen.webp',
    '/images/interiors/grand-lobby.webp',

    // Amenity Images
    '/images/amenities/infinity-pool.webp',
    '/images/amenities/private-cinema.webp',
    '/images/amenities/wellness.webp',
    '/images/amenities/sky-terrace.webp',

    // Location
    '/images/location/dubai-skyline.webp',
]

// Sequence Configuration
const sequences = [
    { name: 'hero-bg-webp', prefix: '', count: 50, pad: 4 }, // Preload first 50 frames
    { name: 'A_seamless_firstperson_202601272342', prefix: 'frame_', count: 20, pad: 4 },
    { name: 'Construction_to_Luxury_Transformation_Video', prefix: 'frame_', count: 20, pad: 4 },
    { name: 'Day_to_Night_Window_Wipe_Transition', prefix: 'frame_', count: 20, pad: 4 },
    { name: 'Drone_Portal_to_Luxury_Suite', prefix: 'frame_', count: 20, pad: 4 },
    { name: 'Dubai_Hyper_Zoom_To_Home', prefix: 'frame_', count: 20, pad: 4 },
    { name: 'Dubai_Luxury_Interior_Drone_Reveal', prefix: 'frame_', count: 20, pad: 4 },
    { name: 'Ghost_Furniture_Video_Generation', prefix: 'frame_', count: 20, pad: 4 },
    { name: 'Luxury_Home_Entry_Transition', prefix: 'frame_', count: 20, pad: 4 },
    { name: 'Reflective_Reveal_Video_Generation', prefix: 'frame_', count: 20, pad: 4 },
    { name: 'Sketch_to_Luxury_Home_Evolution', prefix: 'frame_', count: 20, pad: 4 },
    { name: 'Video_Prompt_Revision_and_Generation', prefix: 'frame_', count: 20, pad: 4 },
]

/**
 * ImagePreloader Component
 * 
 * Automatically downloads key assets (that are below the fold) in the background
 * once the browser is idle or after the initial page load is complete.
 * This prevents "pop-in" and loading delays when the user scrolls down.
 */
export default function ImagePreloader() {
    useEffect(() => {
        // Function to perform the actual preloading
        const preloadImages = () => {
            if (typeof window === 'undefined') return

            // 1. Preload Static Images
            staticImages.forEach((src) => {
                const img = new Image()
                img.src = getAssetPath(src)
            })

            // 2. Preload Sequence Start Frames (Smart Buffering)
            sequences.forEach((seq) => {
                for (let i = 1; i <= seq.count; i++) {
                    const filename = i.toString().padStart(seq.pad, '0')
                    const src = `/images/sequence/${seq.name}/${seq.prefix}${filename}.webp`
                    const img = new Image()
                    img.src = getAssetPath(src)
                }
            })
        }

        // Smart scheduling: wait for the main thread to be idle
        const schedulePreload = () => {
            // If browser supports requestIdleCallback, use it to avoid jank
            if ('requestIdleCallback' in window) {
                // @ts-ignore - TS might not know about requestIdleCallback depending on config
                window.requestIdleCallback(() => preloadImages(), { timeout: 2000 })
            } else {
                // Fallback for Safari/others: wait 2.5s (likely enough for hero animation to start)
                setTimeout(preloadImages, 2500)
            }
        }

        // Wait until the window load event fires (all initial resources loaded)
        if (document.readyState === 'complete') {
            schedulePreload()
        } else {
            window.addEventListener('load', schedulePreload)
            return () => window.removeEventListener('load', schedulePreload)
        }
    }, [])

    return null // This component doesn't render anything visible
}
