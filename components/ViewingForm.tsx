'use client'

import { useState, FormEvent, FocusEvent, useRef, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { gsap } from 'gsap'
import { getAssetPath } from '@/lib/utils'

export default function ViewingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>({})
  const formRef = useRef<HTMLFormElement>(null)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone required'
    if (!formData.preferredDate) newErrors.preferredDate = 'Date required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        preferredDate: '',
      })
      setIsSuccess(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name
    setFocusedFields({ ...focusedFields, [fieldName]: true })

    // Animate label lift
    const label = e.target.previousElementSibling
    if (label) {
      gsap.to(label, {
        y: -8,
        scale: 0.9,
        color: '#a08968',
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    // Animate underline glow
    gsap.to(e.target, {
      boxShadow: '0 1px 0 0 rgba(160, 137, 104, 0.6)',
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const fieldName = e.target.name
    if (!formData[fieldName as keyof typeof formData]) {
      setFocusedFields({ ...focusedFields, [fieldName]: false })

      // Animate label back
      const label = e.target.previousElementSibling
      if (label) {
        gsap.to(label, {
          y: 0,
          scale: 1,
          color: '#8b7355',
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    // Remove underline glow
    gsap.to(e.target, {
      boxShadow: 'none',
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const shakeOnError = (fieldName: string) => {
    const input = document.querySelector(`input[name="${fieldName}"]`)
    if (input) {
      gsap.fromTo(
        input,
        { x: 0 },
        {
          keyframes: [
            { x: -10 },
            { x: 10 },
            { x: -10 },
            { x: 10 },
            { x: -5 },
            { x: 5 },
            { x: 0 }
          ],
          duration: 0.6,
          ease: 'power2.out',
        }
      )
    }
  }

  useEffect(() => {
    // Shake inputs with errors
    Object.keys(errors).forEach((fieldName) => {
      if (errors[fieldName]) {
        shakeOnError(fieldName)
      }
    })
  }, [errors])

  return (
    <section className="section bg-obsidian-950 relative overflow-hidden" id="contact">
      {/* Full-bleed dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-teal-900/10" />

      <div className="container-custom px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-bronze-600/10 bg-obsidian-900/50 backdrop-blur-sm shadow-2xl">

          {/* Left Column: Image & Context */}
          <div className="relative h-64 lg:h-auto overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/20 to-transparent z-10" />

            {/* Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: `url('${getAssetPath('/images/interiors/modern-dark-living.webp')}')` }}
            />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20">
              <p className="text-bronze-500 text-xs uppercase tracking-[0.3em] font-light mb-4">
                Exclusive Access
              </p>
              <h2 className="heading-lg mb-4 text-ivory-100">
                Request Private<br />Viewing
              </h2>
              <p className="text-ivory-300 font-light leading-relaxed max-w-md">
                Experience the pinnacle of luxury living. Our concierge team is ready to curate your personal tour.
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="p-8 md:p-12 lg:p-16 flex items-center bg-obsidian-950/80">
            <div className="w-full">
              {isSuccess ? (
                <div className="text-center py-12">
                  <CheckCircle size={64} className="text-bronze-500 mx-auto mb-6" />
                  <h3 className="text-2xl md:text-3xl font-display font-light text-ivory-300 mb-4 tracking-wide">
                    Request Received
                  </h3>
                  <p className="text-ivory-500 font-light leading-relaxed">
                    Our team will contact you discreetly within 24 hours to arrange your private viewing.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-8">
                  {/* Name */}
                  <div className="relative group/input">
                    <label
                      htmlFor="name"
                      className="absolute -top-5 left-0 text-xs text-bronze-500 uppercase tracking-[0.2em] font-light transition-all duration-300"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className={`w-full px-0 py-4 bg-transparent border-b-2 ${errors.name ? 'border-red-500' : 'border-bronze-600/20'
                        } focus:outline-none focus:border-bronze-500 transition-all duration-500 text-ivory-300 font-light placeholder:text-ivory-600`}
                      placeholder="Full Name"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-2 font-light animate-shake">{errors.name}</p>}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative group/input">
                      <label
                        htmlFor="email"
                        className="absolute -top-5 left-0 text-xs text-bronze-500 uppercase tracking-[0.2em] font-light transition-all duration-300"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className={`w-full px-0 py-4 bg-transparent border-b-2 ${errors.email ? 'border-red-500' : 'border-bronze-600/20'
                          } focus:outline-none focus:border-bronze-500 transition-all duration-500 text-ivory-300 font-light placeholder:text-ivory-600`}
                        placeholder="Email Address"
                      />
                      {errors.email && <p className="text-red-400 text-sm mt-2 font-light animate-shake">{errors.email}</p>}
                    </div>

                    <div className="relative group/input">
                      <label
                        htmlFor="phone"
                        className="absolute -top-5 left-0 text-xs text-bronze-500 uppercase tracking-[0.2em] font-light transition-all duration-300"
                      >
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className={`w-full px-0 py-4 bg-transparent border-b-2 ${errors.phone ? 'border-red-500' : 'border-bronze-600/20'
                          } focus:outline-none focus:border-bronze-500 transition-all duration-500 text-ivory-300 font-light placeholder:text-ivory-600`}
                        placeholder="+971 50 123 4567"
                      />
                      {errors.phone && <p className="text-red-400 text-sm mt-2 font-light animate-shake">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div className="relative group/input">
                    <label
                      htmlFor="preferredDate"
                      className="absolute -top-5 left-0 text-xs text-bronze-500 uppercase tracking-[0.2em] font-light transition-all duration-300"
                    >
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-0 py-4 bg-transparent border-b-2 ${errors.preferredDate ? 'border-red-500' : 'border-bronze-600/20'
                        } focus:outline-none focus:border-bronze-500 transition-all duration-500 text-ivory-300 font-light`}
                    />
                    {errors.preferredDate && <p className="text-red-400 text-sm mt-2 font-light animate-shake">{errors.preferredDate}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? 'Submitting Request...' : 'Enquire Discreetly'}
                      </span>
                    </button>
                  </div>

                  {/* Privacy Notice */}
                  <p className="text-xs text-ivory-600 text-center font-light leading-relaxed">
                    Your information is handled with absolute discretion. We never share your details with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
