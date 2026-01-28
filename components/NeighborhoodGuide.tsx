'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  GraduationCap, Heart, ShoppingBag, UtensilsCrossed, MapPin,
  Dumbbell, Theater, Building2, Navigation, Clock
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    locations: [
      { name: 'Dubai International Academy', distance: '1.2 km', time: '3 min drive', type: 'International School' },
      { name: 'Jumeirah College', distance: '2.5 km', time: '6 min drive', type: 'British Curriculum' },
      { name: 'American School of Dubai', distance: '3.8 km', time: '8 min drive', type: 'American Curriculum' },
      { name: 'GEMS Wellington Academy', distance: '4.2 km', time: '10 min drive', type: 'International Baccalaureate' },
    ],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Heart,
    locations: [
      { name: 'American Hospital Dubai', distance: '1.8 km', time: '4 min drive', type: 'Multi-specialty Hospital' },
      { name: 'Mediclinic City Hospital', distance: '2.3 km', time: '5 min drive', type: 'Private Hospital' },
      { name: 'Prime Medical Center', distance: '900 m', time: '2 min drive', type: 'General Practice' },
      { name: 'NMC Royal Hospital', distance: '3.5 km', time: '8 min drive', type: 'Specialty Care' },
    ],
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: ShoppingBag,
    locations: [
      { name: 'The Dubai Mall', distance: '4.5 km', time: '10 min drive', type: 'Luxury Shopping' },
      { name: 'City Walk', distance: '1.5 km', time: '4 min drive', type: 'Lifestyle Destination' },
      { name: 'Boxpark', distance: '2.8 km', time: '6 min drive', type: 'Retail & F&B' },
      { name: 'Galleria Mall', distance: '3.2 km', time: '7 min drive', type: 'Shopping Center' },
    ],
  },
  {
    id: 'dining',
    name: 'Dining',
    icon: UtensilsCrossed,
    locations: [
      { name: 'Zuma Dubai', distance: '4.2 km', time: '9 min drive', type: 'Contemporary Japanese' },
      { name: 'La Petite Maison', distance: '1.8 km', time: '4 min drive', type: 'French Mediterranean' },
      { name: 'Pierchic', distance: '3.5 km', time: '8 min drive', type: 'Seafood Fine Dining' },
      { name: 'The Cheesecake Factory', distance: '4.5 km', time: '10 min drive', type: 'American Casual' },
    ],
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    icon: Dumbbell,
    locations: [
      { name: 'Kite Beach', distance: '2.2 km', time: '5 min drive', type: 'Beach & Water Sports' },
      { name: 'Dubai Opera', distance: '4.8 km', time: '11 min drive', type: 'Arts & Entertainment' },
      { name: 'Fitness First', distance: '800 m', time: '2 min walk', type: 'Gym & Wellness' },
      { name: 'Reel Cinemas', distance: '1.5 km', time: '4 min drive', type: 'Movie Theater' },
    ],
  },
]

export default function NeighborhoodGuide() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCategory, setActiveCategory] = useState('education')

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate location cards
      gsap.utils.toArray<HTMLElement>('.location-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [activeCategory])

  const activeData = categories.find(cat => cat.id === activeCategory) || categories[0]
  const ActiveIcon = activeData.icon

  return (
    <section
      ref={sectionRef}
      className="section bg-obsidian-950 px-4 md:px-6 lg:px-8 py-24 lg:py-40"
      id="neighborhood"
    >
      <div className="container-custom max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <p className="text-bronze-500 text-xs md:text-sm uppercase tracking-[0.3em] font-light mb-6">
            Connected Living
          </p>
          <h2 className="heading-xl mb-8 text-ivory-100">
            Neighborhood Guide
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-bronze-500 to-transparent mb-8 opacity-50 mx-auto" />
          <p className="text-base md:text-xl text-ivory-400 font-light leading-relaxed tracking-wide max-w-3xl mx-auto">
            Everything you need is moments away. From world-class schools to fine dining, your new address puts Dubai's best within effortless reach.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 lg:mb-16">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group flex items-center gap-3 px-6 py-3 border transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-bronze-500/20 border-bronze-500/50 text-bronze-500'
                    : 'bg-obsidian-900/40 border-bronze-500/10 text-ivory-400 hover:border-bronze-500/30'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'text-bronze-500 scale-110'
                      : 'text-ivory-500 group-hover:text-bronze-500'
                  }`}
                  strokeWidth={1.5}
                />
                <span className="text-sm uppercase tracking-wider">{category.name}</span>
              </button>
            )
          })}
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {activeData.locations.map((location, index) => (
            <div
              key={index}
              className="location-card group relative bg-obsidian-900/40 border border-bronze-500/10 hover:border-bronze-500/30 transition-all duration-500 p-6 lg:p-8"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-bronze-500/0 via-bronze-500/0 to-bronze-500/0 group-hover:from-bronze-500/5 group-hover:via-bronze-500/10 group-hover:to-bronze-500/5 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-bronze-500/10 group-hover:bg-bronze-500/20 transition-all duration-300">
                    <ActiveIcon className="w-6 h-6 text-bronze-500" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-bronze-500 bg-bronze-500/10 px-3 py-1.5">
                    {location.type}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-xl lg:text-2xl font-light text-ivory-100 mb-4 group-hover:text-bronze-400 transition-colors duration-300">
                  {location.name}
                </h3>

                {/* Distance & Time */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-bronze-500" strokeWidth={1.5} />
                    <span className="text-sm text-ivory-400">{location.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-bronze-500" strokeWidth={1.5} />
                    <span className="text-sm text-ivory-400">{location.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transit & Connectivity */}
        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-obsidian-900/40 border border-bronze-500/10 p-8 text-center">
            <Building2 className="w-10 h-10 mx-auto mb-4 text-bronze-500" strokeWidth={1.5} />
            <h4 className="text-lg font-light text-ivory-100 mb-2">Dubai International Airport</h4>
            <p className="text-sm text-ivory-500">15 min drive</p>
          </div>
          <div className="bg-obsidian-900/40 border border-bronze-500/10 p-8 text-center">
            <MapPin className="w-10 h-10 mx-auto mb-4 text-bronze-500" strokeWidth={1.5} />
            <h4 className="text-lg font-light text-ivory-100 mb-2">Burj Khalifa / Downtown</h4>
            <p className="text-sm text-ivory-500">10 min drive</p>
          </div>
          <div className="bg-obsidian-900/40 border border-bronze-500/10 p-8 text-center">
            <Theater className="w-10 h-10 mx-auto mb-4 text-bronze-500" strokeWidth={1.5} />
            <h4 className="text-lg font-light text-ivory-100 mb-2">Business Bay Metro</h4>
            <p className="text-sm text-ivory-500">5 min walk</p>
          </div>
        </div>
      </div>
    </section>
  )
}
