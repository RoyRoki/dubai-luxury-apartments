'use client'

import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface CounterProps {
    target: number
    duration?: number
    decimals?: number
    prefix?: string
    suffix?: string
    className?: string
}

export default function Counter({
    target,
    duration = 2.0,
    decimals = 0,
    prefix = '',
    suffix = '',
    className = '',
}: CounterProps) {
    const counterRef = useRef<HTMLSpanElement>(null)

    useLayoutEffect(() => {
        if (!counterRef.current) return

        gsap.registerPlugin(ScrollTrigger)

        const element = counterRef.current
        const obj = { value: 0 }

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: element,
                start: 'top 85%', // Start a bit earlier to be visible
                once: true, // Only animate once
                onEnter: () => {
                    gsap.to(obj, {
                        value: target,
                        duration: duration,
                        ease: 'power2.out',
                        onUpdate: () => {
                            if (element) {
                                const formattedValue = obj.value.toFixed(decimals)
                                element.textContent = `${prefix}${formattedValue}${suffix}`
                            }
                        },
                    })
                },
            })
        })

        return () => ctx.revert()
    }, [target, duration, decimals, prefix, suffix])

    // Initial render content (can be 0 or empty, relying on animation to fill)
    // Using prefix + 0 + suffix for initial state ensures correct layout
    const initialValue = `${prefix}${Number(0).toFixed(decimals)}${suffix}`

    return (
        <span ref={counterRef} className={className}>
            {initialValue}
        </span>
    )
}
