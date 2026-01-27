import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Ultra-Luxury: Text Mask Reveal (Clip-path animation)
 */
export function textMaskReveal(element: string | Element, options = {}) {
  gsap.from(element, {
    clipPath: 'inset(0 100% 0 0)',
    duration: 1.4,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    ...options,
  })
}

/**
 * Ultra-Luxury: Character Stagger Reveal (Premium headlines)
 */
export function characterStagger(element: string | Element, options = {}) {
  const text = typeof element === 'string' ? document.querySelector(element) : element
  if (!text) return

  const content = text.textContent || ''
  text.innerHTML = content
    .split('')
    .map(char => `<span class="inline-block" style="opacity: 0; transform: translateY(50px)">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('')

  gsap.to(`${typeof element === 'string' ? element : ''} span`, {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.03,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    ...options,
  })
}

/**
 * Ultra-Luxury: Counter Animation (Investment stats)
 */
export function counterAnimation(element: string | Element, target: number, options = {}) {
  const el = typeof element === 'string' ? document.querySelector(element) : element
  if (!el) return

  const counter = { value: 0 }

  gsap.to(counter, {
    value: target,
    duration: 2.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    onUpdate: () => {
      el.textContent = Math.round(counter.value).toLocaleString()
    },
    ...options,
  })
}

/**
 * Ultra-Luxury: Fade + Scale reveal with opacity
 */
export function fadeInOnScroll(element: string | Element, options = {}) {
  gsap.from(element, {
    opacity: 0,
    y: 60,
    scale: 0.95,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none none',
    },
    ...options,
  })
}

/**
 * Ultra-Luxury: Multi-layer Parallax (Slow, cinematic)
 */
export function parallaxImage(element: string | Element, speed = 0.3) {
  gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
    },
  })
}

/**
 * Ultra-Luxury: Stagger Animation (Cards, grid items)
 */
export function staggerAnimation(elements: string, options = {}) {
  gsap.from(elements, {
    opacity: 0,
    y: 40,
    scale: 0.96,
    duration: 1,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: elements,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    ...options,
  })
}

/**
 * Ultra-Luxury: Scale In with back ease
 */
export function scaleInOnScroll(element: string | Element, options = {}) {
  gsap.from(element, {
    opacity: 0,
    scale: 0.85,
    duration: 1.2,
    ease: 'back.out(1.2)',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    ...options,
  })
}

/**
 * Ultra-Luxury: Bronze shimmer effect
 */
export function bronzeShimmer(element: string | Element) {
  gsap.to(element, {
    backgroundPosition: '200% center',
    duration: 3,
    ease: 'none',
    repeat: -1,
    yoyo: true,
  })
}

/**
 * Ultra-Luxury: Ripple effect for CTAs
 */
export function createRipple(event: MouseEvent, element: HTMLElement) {
  const ripple = document.createElement('span')
  const rect = element.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2

  ripple.style.width = ripple.style.height = `${size}px`
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`
  ripple.className = 'ripple-effect'

  element.appendChild(ripple)

  gsap.fromTo(
    ripple,
    { scale: 0, opacity: 0.6 },
    {
      scale: 2.5,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    }
  )
}

/**
 * Ultra-Luxury: Section gradient shift on scroll
 */
export function gradientShiftOnScroll(element: string | Element, options = {}) {
  gsap.to(element, {
    backgroundPosition: '100% 50%',
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2,
    },
    ...options,
  })
}
