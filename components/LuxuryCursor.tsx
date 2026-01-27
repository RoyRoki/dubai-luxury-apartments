'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function LuxuryCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const trail1Ref = useRef<HTMLDivElement>(null)
  const trail2Ref = useRef<HTMLDivElement>(null)
  const trail3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    const trail1 = trail1Ref.current
    const trail2 = trail2Ref.current
    const trail3 = trail3Ref.current

    if (!cursor || !cursorDot || !trail1 || !trail2 || !trail3) return

    // Mouse move handler
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      })

      gsap.to(trail1, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out',
      })

      gsap.to(trail2, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      })

      gsap.to(trail3, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    // Hover handlers for interactive elements
    const onMouseEnter = () => {
      gsap.to(cursorDot, {
        scale: 3,
        backgroundColor: 'transparent',
        border: '1px solid #a08968',
        duration: 0.3,
        ease: 'back.out(1.7)',
      })
    }

    const onMouseLeave = () => {
      gsap.to(cursorDot, {
        scale: 1,
        backgroundColor: '#a08968',
        border: 'none',
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove)

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, .property-card, .cursor-pointer'
    )
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    // Hide default cursor
    document.body.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.body.style.cursor = 'auto'
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [])

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <div ref={cursorRef} className="luxury-cursor-container">
      {/* Trail 3 (slowest, most transparent) */}
      <div
        ref={trail3Ref}
        className="luxury-cursor-trail"
        style={{
          width: '8px',
          height: '8px',
          opacity: 0.15,
        }}
      />

      {/* Trail 2 */}
      <div
        ref={trail2Ref}
        className="luxury-cursor-trail"
        style={{
          width: '8px',
          height: '8px',
          opacity: 0.25,
        }}
      />

      {/* Trail 1 */}
      <div
        ref={trail1Ref}
        className="luxury-cursor-trail"
        style={{
          width: '8px',
          height: '8px',
          opacity: 0.4,
        }}
      />

      {/* Main cursor dot */}
      <div
        ref={cursorDotRef}
        className="luxury-cursor-dot"
      />
    </div>
  )
}
