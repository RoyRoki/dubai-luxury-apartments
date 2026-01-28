'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CreditCard, PiggyBank, Building, Check, Sparkles, TrendingUp } from 'lucide-react'
import MortgageCalculator from './MortgageCalculator'
import { getAssetPath } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const paymentPlans = [
  {
    icon: CreditCard,
    name: 'Standard Plan',
    tagline: 'Most Popular',
    downPayment: '20%',
    description: 'Flexible payment structure for long-term buyers',
    features: [
      '20% down payment',
      '80% during construction',
      'Quarterly installments',
      'No hidden fees',
      '0% interest on schedule',
    ],
    highlight: false,
  },
  {
    icon: Sparkles,
    name: 'Premium Plan',
    tagline: 'Best Value',
    downPayment: '30%',
    description: 'Enhanced benefits with significant savings',
    features: [
      '30% down payment',
      '70% during construction',
      '5% early payment discount',
      'Priority unit selection',
      'Complimentary upgrades',
    ],
    highlight: true,
  },
  {
    icon: PiggyBank,
    name: 'Investor Plan',
    tagline: 'For Smart Investors',
    downPayment: '40%',
    description: 'Maximum ROI with exclusive investor benefits',
    features: [
      '40% down payment',
      '60% during construction',
      '10% early payment discount',
      'Guaranteed rental pool',
      'Property management included',
    ],
    highlight: false,
  },
]

const financingPartners = [
  { name: 'Emirates NBD', logo: 'ENBD.png' },
  { name: 'Dubai Islamic Bank', logo: 'DIB.png' },
  { name: 'HSBC Middle East', logo: 'HSBC.png' },
  { name: 'Mashreq Bank', logo: 'MASHREQ.png' },
]

export default function PaymentPlans() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Animate plan cards
      gsap.utils.toArray<HTMLElement>('.plan-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // Animate bank logos
      gsap.utils.toArray<HTMLElement>('.bank-logo').forEach((logo, index) => {
        gsap.fromTo(
          logo,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: logo,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section bg-obsidian-950 px-4 md:px-6 lg:px-8 py-24 lg:py-40"
      id="payment"
    >
      <div className="container-custom max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <p className="text-bronze-500 text-xs md:text-sm uppercase tracking-[0.3em] font-light mb-6">
            Flexible Financing
          </p>
          <h2 className="heading-xl mb-8 text-ivory-100">
            Payment Plans
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-bronze-500 to-transparent mb-8 opacity-50 mx-auto" />
          <p className="text-base md:text-xl text-ivory-400 font-light leading-relaxed tracking-wide max-w-3xl mx-auto">
            We offer tailored payment solutions designed to make luxury accessible. Choose the plan that aligns with your financial strategy.
          </p>
        </div>

        {/* Payment Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-20 lg:mb-32">
          {paymentPlans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <div
                key={index}
                className={`plan-card group relative ${plan.highlight
                  ? 'bg-gradient-to-br from-bronze-500/10 via-obsidian-900/90 to-obsidian-950 border-2 border-bronze-500/40 shadow-2xl shadow-bronze-500/10'
                  : 'bg-obsidian-900/40 border border-bronze-500/10'
                  } hover:border-bronze-500/30 transition-all duration-500`}
              >
                {/* Best Value Badge */}
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-bronze-500 text-obsidian-950 text-xs uppercase tracking-wider font-medium">
                    {plan.tagline}
                  </div>
                )}

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-bronze-500/0 via-bronze-500/0 to-bronze-500/0 group-hover:from-bronze-500/5 group-hover:via-bronze-500/10 group-hover:to-bronze-500/5 transition-all duration-500 pointer-events-none" />

                <div className="relative z-10 p-8 lg:p-10">
                  {/* Icon */}
                  <div className="w-16 h-16 mb-6 flex items-center justify-center bg-bronze-500/10 group-hover:bg-bronze-500/20 transition-all duration-300">
                    <Icon className="w-8 h-8 text-bronze-500" strokeWidth={1.5} />
                  </div>

                  {/* Tagline (if not highlight) */}
                  {!plan.highlight && (
                    <p className="text-xs uppercase tracking-wider text-bronze-500 mb-3">
                      {plan.tagline}
                    </p>
                  )}

                  {/* Name */}
                  <h3 className="text-2xl lg:text-3xl font-light text-ivory-100 mb-4">
                    {plan.name}
                  </h3>

                  {/* Down Payment */}
                  <div className="mb-6 pb-6 border-b border-bronze-500/10">
                    <p className="text-sm text-ivory-500 mb-2">Down Payment</p>
                    <p className="text-4xl lg:text-5xl font-light text-bronze-500">
                      {plan.downPayment}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-ivory-400 mb-8 font-light leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-bronze-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                        <span className="text-sm text-ivory-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={`w-full py-4 text-sm uppercase tracking-wider transition-all duration-300 ${plan.highlight
                      ? 'bg-bronze-500 text-obsidian-950 hover:bg-bronze-400'
                      : 'border border-bronze-500/30 text-bronze-500 hover:bg-bronze-500/10'
                      }`}
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Financing Partners */}
        <div className="bg-obsidian-900/40 border border-bronze-500/10 p-8 lg:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl lg:text-3xl font-light text-ivory-100 mb-4">
              Financing Partners
            </h3>
            <p className="text-base text-ivory-400 font-light max-w-2xl mx-auto">
              We work with the region&apos;s most trusted financial institutions to offer competitive mortgage rates and flexible terms.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {financingPartners.map((partner, index) => (
              <div
                key={index}
                className="bank-logo group bg-obsidian-950/60 border border-bronze-500/10 hover:border-bronze-500/30 p-6 lg:p-8 flex items-center justify-center transition-all duration-300 cursor-pointer relative h-24 lg:h-28"
              >
                <Image
                  src={getAssetPath(`/images/logos/${partner.logo}`)}
                  alt={partner.name}
                  fill
                  className="object-contain p-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Calculator CTA */}
        <div className="mt-16 lg:mt-24 text-center">
          <div
            onClick={() => setIsCalculatorOpen(true)}
            className="inline-flex items-center gap-3 bg-bronze-500/10 border border-bronze-500/30 px-8 py-4 cursor-pointer hover:bg-bronze-500/20 transition-all duration-300 group"
          >
            <TrendingUp className="w-6 h-6 text-bronze-500 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
            <span className="text-base text-ivory-100 font-light">
              Calculate Your Payment Plan
            </span>
          </div>
          <p className="text-sm text-ivory-500 mt-4 font-light">
            Our advisors will help you find the perfect financing solution
          </p>
        </div>
      </div>

      {/* Mortgage Calculator Modal */}
      <MortgageCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </section>
  )
}
