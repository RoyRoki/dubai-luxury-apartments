'use client'

import { useState, useEffect } from 'react'
import { X, ChevronRight, Calculator, TrendingUp, CheckCircle } from 'lucide-react'
import { getAssetPath } from '@/lib/utils'
import { gsap } from 'gsap'

interface MortgageCalculatorProps {
    isOpen: boolean
    onClose: () => void
}

export default function MortgageCalculator({ isOpen, onClose }: MortgageCalculatorProps) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Calculator state
    const [purchasePrice, setPurchasePrice] = useState(5415000)
    const [downPaymentPercent, setDownPaymentPercent] = useState(25)
    const [loanPeriod, setLoanPeriod] = useState(25)
    const [interestRate, setInterestRate] = useState(4.54)
    const [residencyStatus, setResidencyStatus] = useState<'uae-national' | 'uae-resident' | 'non-resident'>('uae-national')

    // Form state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Calculated values
    const downPayment = (purchasePrice * downPaymentPercent) / 100
    const loanAmount = purchasePrice - downPayment

    // Monthly payment calculation (standard mortgage formula)
    const monthlyInterestRate = interestRate / 100 / 12
    const numberOfPayments = loanPeriod * 12
    const monthlyPayment = monthlyInterestRate > 0
        ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)
        : loanAmount / numberOfPayments

    // Format currency
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!name.trim()) newErrors.name = 'Name is required'
        if (!email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Invalid email address'
        }
        if (!phone.trim()) newErrors.phone = 'Phone is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        setIsSuccess(true)
        setTimeout(() => {
            setIsSuccess(false)
            if (onClose) onClose()
        }, 3000)
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onWheel={(e) => e.stopPropagation()}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-obsidian-950/90 backdrop-blur-xl transition-opacity duration-500"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className="grid grid-cols-1 lg:grid-cols-12 gap-0 w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl border border-bronze-600/10 bg-obsidian-900/50 backdrop-blur-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-obsidian-950/50 hover:bg-bronze-500 hover:text-obsidian-950 text-ivory-100 rounded-full transition-all duration-300 pointer-events-auto"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Column: Image & Context (Span 4) */}
                <div className="relative hidden lg:block lg:col-span-4 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/30 to-transparent z-10" />

                    {/* Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                        style={{ backgroundImage: `url('${getAssetPath('/images/architecture/detail-1.webp')}')` }}
                    />

                    {/* Small Image in Top Empty Space */}
                    <div className="absolute top-12 left-10 z-20 w-64 h-80 opacity-80 mix-blend-screen grayscale hover:grayscale-0 transition-all duration-500 hidden lg:block">
                        <img
                            src={getAssetPath('/images/exteriors/architectural-detail.webp')}
                            alt="Detail"
                            className="object-cover w-full h-full rounded border border-bronze-500/30"
                        />
                    </div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 p-8 md:p-10 z-20 w-full">
                        <div className="flex justify-between items-start w-full">
                            {/* The image that was here has been moved to the top */}
                        </div>
                        <p className="text-bronze-500 text-xs uppercase tracking-[0.3em] font-light mb-4">
                            Financial Planning
                        </p>
                        <h2 className="heading-lg mb-4 text-ivory-100 leading-none">
                            Smart<br />Investment
                        </h2>
                        <p className="text-ivory-300 font-light leading-relaxed max-w-xs text-sm">
                            Calculate your potential monthly payments and explore financing options tailored to your needs.
                        </p>

                        <div className="mt-8 pt-8 border-t border-bronze-500/20">
                            <div className="flex items-center gap-3">
                                <p className="text-xs text-ivory-400">Current Interest Rate</p>
                                <span className="text-bronze-400 font-medium">{interestRate}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Calculator & Form (Span 8) */}
                <div className="col-span-1 lg:col-span-8 p-6 md:p-10 lg:p-12 bg-obsidian-950/80 overflow-y-auto max-h-[90vh]">

                    {/* Mobile Header (only visible on mobile) */}
                    <div className="lg:hidden mb-8">
                        <p className="text-bronze-500 text-xs uppercase tracking-[0.3em] font-light mb-2">Smart Investment</p>
                        <h2 className="text-3xl font-display text-ivory-100">Mortgage Calculator</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                        {/* Inputs Column */}
                        <div className="space-y-8">
                            {/* Purchase Price */}
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-bronze-500 mb-2 font-light">
                                    Property Value
                                </label>
                                <div className="text-2xl font-light text-ivory-100 mb-4 border-b border-bronze-500/20 pb-2">
                                    {formatCurrency(purchasePrice)} <span className="text-sm text-ivory-500">AED</span>
                                </div>
                                <input
                                    type="range"
                                    min="2000000"
                                    max="50000000"
                                    step="50000"
                                    value={purchasePrice}
                                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                                    className="w-full h-1 bg-bronze-500/20 appearance-none cursor-pointer slider"
                                    style={{
                                        background: `linear-gradient(to right, #a08968 0%, #a08968 ${((purchasePrice - 2000000) / (50000000 - 2000000)) * 100}%, rgba(160, 137, 104, 0.2) ${((purchasePrice - 2000000) / (50000000 - 2000000)) * 100}%, rgba(160, 137, 104, 0.2) 100%)`
                                    }}
                                />
                            </div>

                            {/* Down Payment */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="block text-xs uppercase tracking-wider text-bronze-500 font-light">
                                        Down Payment
                                    </label>
                                    <span className="text-bronze-400 text-sm">{downPaymentPercent}%</span>
                                </div>
                                <div className="text-xl font-light text-ivory-100 mb-4 border-b border-bronze-500/20 pb-2">
                                    {formatCurrency(downPayment)} <span className="text-sm text-ivory-500">AED</span>
                                </div>
                                <input
                                    type="range"
                                    min="20"
                                    max="80"
                                    step="1"
                                    value={downPaymentPercent}
                                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                                    className="w-full h-1 bg-bronze-500/20 appearance-none cursor-pointer slider"
                                    style={{
                                        background: `linear-gradient(to right, #a08968 0%, #a08968 ${((downPaymentPercent - 20) / 60) * 100}%, rgba(160, 137, 104, 0.2) ${((downPaymentPercent - 20) / 60) * 100}%, rgba(160, 137, 104, 0.2) 100%)`
                                    }}
                                />
                            </div>

                            {/* Loan Period */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="block text-xs uppercase tracking-wider text-bronze-500 font-light">
                                        Loan Period
                                    </label>
                                    <span className="text-bronze-400 text-sm">{loanPeriod} Years</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="25"
                                    step="1"
                                    value={loanPeriod}
                                    onChange={(e) => setLoanPeriod(Number(e.target.value))}
                                    className="w-full h-1 bg-bronze-500/20 appearance-none cursor-pointer slider mt-4"
                                    style={{
                                        background: `linear-gradient(to right, #a08968 0%, #a08968 ${((loanPeriod - 1) / 24) * 100}%, rgba(160, 137, 104, 0.2) ${((loanPeriod - 1) / 24) * 100}%, rgba(160, 137, 104, 0.2) 100%)`
                                    }}
                                />
                            </div>
                        </div>

                        {/* Results Column */}
                        <div className="bg-obsidian-900/40 border border-bronze-500/10 p-8 rounded-xl flex flex-col justify-center">
                            <h3 className="text-sm text-ivory-400 uppercase tracking-widest mb-8 text-center">Estimated Monthly Payment</h3>
                            <div className="text-center mb-8">
                                <span className="text-5xl lg:text-6xl font-display font-light text-bronze-200 block mb-2">
                                    {formatCurrency(monthlyPayment)}
                                </span>
                                <span className="text-sm text-ivory-500 uppercase tracking-wider">AED / Month</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-bronze-500/10 pt-6">
                                <div>
                                    <p className="text-xs text-ivory-500 uppercase tracking-wider mb-1">Loan Amount</p>
                                    <p className="text-lg text-ivory-200">{formatCurrency(loanAmount)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-ivory-500 uppercase tracking-wider mb-1">Interest Rate</p>
                                    <p className="text-lg text-ivory-200">{interestRate}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="border-t border-bronze-500/10 pt-10">
                        <div className="flex items-center gap-3 mb-8">
                            <TrendingUp className="w-5 h-5 text-bronze-500" />
                            <h3 className="text-xl font-display text-ivory-200">Request Financial Consultation</h3>
                        </div>

                        {isSuccess ? (
                            <div className="bg-bronze-500/10 border border-bronze-500/20 p-8 text-center rounded-lg">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bronze-500/20 mb-4">
                                    <CheckCircle className="w-6 h-6 text-bronze-400" />
                                </div>
                                <h4 className="text-xl text-ivory-100 mb-2">Request Sent Successfully</h4>
                                <p className="text-ivory-400 text-sm">Our financial advisors will contact you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="relative group/input">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                            if (errors.name) setErrors({ ...errors, name: '' })
                                        }}
                                        className={`w-full bg-transparent border-b py-3 text-ivory-100 placeholder:text-ivory-600 focus:outline-none transition-colors ${errors.name ? 'border-red-500/50' : 'border-bronze-600/30 focus:border-bronze-500'}`}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div className="relative group/input">
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            if (errors.email) setErrors({ ...errors, email: '' })
                                        }}
                                        className={`w-full bg-transparent border-b py-3 text-ivory-100 placeholder:text-ivory-600 focus:outline-none transition-colors ${errors.email ? 'border-red-500/50' : 'border-bronze-600/30 focus:border-bronze-500'}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                                <div className="relative group/input">
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value)
                                            if (errors.phone) setErrors({ ...errors, phone: '' })
                                        }}
                                        className={`w-full bg-transparent border-b py-3 text-ivory-100 placeholder:text-ivory-600 focus:outline-none transition-colors ${errors.phone ? 'border-red-500/50' : 'border-bronze-600/30 focus:border-bronze-500'}`}
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                </div>
                                <div className="md:col-span-3 mt-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full md:w-auto px-8 py-3 bg-bronze-500/10 hover:bg-bronze-500/20 border border-bronze-500/30 text-bronze-400 hover:text-bronze-300 uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                                    >
                                        {isSubmitting ? 'Processing...' : 'Get Pre-Qualified'}
                                        {!isSubmitting && <ChevronRight className="w-4 h-4" />}
                                    </button>
                                </div>
                            </form>
                        )}
                        <p className="text-[10px] text-ivory-600 text-center mt-6 font-light">
                            *Calculations are estimates only and do not constitute a formal loan offer. Terms and conditions apply.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .slider::-webkit-slider-thumb {
                  appearance: none;
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  background: #a08968;
                  cursor: pointer;
                  border: 2px solid #1a1410;
                  box-shadow: 0 0 0 1px rgba(160, 137, 104, 0.3);
                  transition: all 0.3s ease;
                  margin-top: -6px; /* center thumb */
                }
                .slider::-webkit-slider-runnable-track {
                    height: 4px;
                    border-radius: 2px;
                }
                .slider::-moz-range-thumb {
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  background: #a08968;
                  cursor: pointer;
                  border: 2px solid #1a1410;
                  box-shadow: 0 0 0 1px rgba(160, 137, 104, 0.3);
                  transition: all 0.3s ease;
                }
            `}</style>
        </div>
    )
}
