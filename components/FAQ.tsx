'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { staggerAnimation } from '@/lib/animations'
import { getAssetPath } from '@/lib/utils'

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  // Animations removed to ensure visibility


  const faqs = [
    {
      question: 'Can foreigners buy property in Dubai?',
      answer: 'Yes, foreigners can buy property in designated freehold areas of Dubai, including Downtown Dubai, Dubai Marina, and Palm Jumeirah. You can own the property outright and have full ownership rights.',
      image: '/images/interiors/grand-lobby.webp',
      imageTitle: 'Ownership Rights',
      imageDescription: 'Full freehold ownership in designated areas across Dubai',
    },
    {
      question: 'What is the typical ROI for Dubai properties?',
      answer: 'Dubai properties typically offer 5-8% annual rental yields, which is among the highest globally. Capital appreciation varies by location, with prime areas showing consistent growth of 3-7% annually.',
      image: '/images/interiors/downtown-views.webp',
      imageTitle: 'Investment Returns',
      imageDescription: 'Industry-leading yields and capital appreciation',
    },
    {
      question: 'What are the payment options available?',
      answer: 'We offer flexible payment plans including cash purchases, developer payment plans (typically 30% down payment with installments during construction), and mortgage options through local and international banks with competitive rates.',
      image: '/images/interiors/luxury-bedroom-bright.webp',
      imageTitle: 'Flexible Financing',
      imageDescription: 'Multiple payment options tailored to your needs',
    },
    {
      question: 'Are there any taxes on property in Dubai?',
      answer: 'Dubai offers a tax-free environment with no property tax, no rental income tax, and no capital gains tax. You only pay a one-time 4% Dubai Land Department transfer fee and annual service charges.',
      image: '/images/interiors/modern-dark-living.webp',
      imageTitle: 'Tax-Free Benefits',
      imageDescription: 'Zero property, income, or capital gains tax',
    },
    {
      question: 'How long does the purchase process take?',
      answer: 'For ready properties, the process typically takes 2-4 weeks from offer to completion. For off-plan properties, you sign a Sales Purchase Agreement immediately and take possession upon project completion.',
      image: '/images/interiors/marina-suite.webp',
      imageTitle: 'Swift Process',
      imageDescription: 'Streamlined acquisition from offer to ownership',
    },
    {
      question: 'What about property management and maintenance?',
      answer: 'All our properties include professional property management services. Annual service charges cover common area maintenance, security, and facilities. We can also arrange rental management if you wish to lease your property.',
      image: '/images/interiors/chef-kitchen.webp',
      imageTitle: 'Concierge Service',
      imageDescription: 'Professional management available 24/7',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section ref={sectionRef} className="section bg-obsidian-950" id="faq">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-bronze-500 text-xs md:text-sm uppercase tracking-[0.3em] font-light mb-4">
            Expert Guidance
          </p>
          <h2 className="heading-xl mb-4">
            Frequently Asked <span className="text-bronze">Questions</span>
          </h2>
          <p className="text-lg text-ivory-500 max-w-2xl mx-auto font-light">
            Everything you need to know about investing in Dubai luxury properties
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Dynamic Image */}
          <div className="lg:col-span-5 relative h-[500px] lg:h-[600px] hidden lg:block rounded-sm overflow-hidden group">
            <Image
              key={openIndex ?? 0} // Key changes trigger transition
              src={getAssetPath(faqs[openIndex ?? 0]?.image || faqs[0].image)}
              alt={faqs[openIndex ?? 0]?.imageTitle || 'FAQ Image'}
              fill
              unoptimized
              className="object-cover transition-all duration-700 group-hover:scale-105 animate-in fade-in"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />

            {/* Overlay Text - Changes with FAQ */}
            <div className="absolute bottom-10 left-8 right-8 text-left">
              <h3 className="text-2xl font-display text-ivory-100 mb-2 transition-opacity duration-500">
                {faqs[openIndex ?? 0]?.imageTitle || faqs[0].imageTitle}
              </h3>
              <p className="text-sm text-ivory-400 font-light transition-opacity duration-500">
                {faqs[openIndex ?? 0]?.imageDescription || faqs[0].imageDescription}
              </p>
            </div>
          </div>

          {/* Right Column: FAQ Items */}
          <div className="lg:col-span-12 lg:col-start-7 lg:col-end-13 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item glass-dark rounded-sm overflow-hidden border border-white/5 hover:border-bronze-500/30 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-light text-ivory-200 pr-4">{faq.question}</h3>
                  <ChevronDown
                    size={20}
                    className={`text-bronze-500 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <p className="px-6 pb-6 text-ivory-400 font-light leading-relaxed text-sm md:text-base">{faq.answer}</p>
                </div>
              </div>
            ))}

            {/* Still Have Questions CTA */}
            <div className="text-left mt-12 pt-8 border-t border-white/10">
              <p className="text-ivory-400 mb-4 font-light">Still have questions?</p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
              >
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
