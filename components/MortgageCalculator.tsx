'use client'

import { useState, useEffect } from 'react'
import { X, ChevronRight, Calculator, TrendingUp } from 'lucide-react'

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
    const [purchasePrice, setPurchasePrice] = useState(54150000)
    const [downPaymentPercent, setDownPaymentPercent] = useState(25)
    const [loanPeriod, setLoanPeriod] = useState(25)
    const [interestRate, setInterestRate] = useState(4.54)
    const [residencyStatus, setResidencyStatus] = useState<'uae-national' | 'uae-resident' | 'non-resident'>('uae-national')

    // Form state
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('+971')

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log('Form submitted:', { name, email, phone, purchasePrice, monthlyPayment })
        // You can add API call or other logic here
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onWheel={(e) => e.stopPropagation()}
        >
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-obsidian-950/90 backdrop-blur-2xl transition-opacity duration-500"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className="relative w-full max-w-7xl max-h-[90vh] bg-obsidian-900 border border-bronze-500/20 shadow-2xl shadow-bronze-500/10 animate-in fade-in zoom-in-95 duration-500 flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 p-3 bg-obsidian-950/80 hover:bg-bronze-500 hover:text-obsidian-950 text-ivory-100 border border-bronze-500/20 hover:border-bronze-500 transition-all duration-300 group"
                    aria-label="Close calculator"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="border-b border-bronze-500/10 bg-obsidian-950/60 px-8 md:px-12 py-8">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-bronze-500/10 border border-bronze-500/20">
                            <Calculator className="w-8 h-8 text-bronze-500" strokeWidth={1.5} />
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-ivory-100 font-display tracking-wider uppercase">
                            Get the right mortgage for you
                        </h2>
                    </div>
                    <p className="text-ivory-400 text-sm md:text-base font-light ml-20">
                        Calculate your monthly payments and explore financing options
                    </p>
                </div>

                {/* Calculator Grid - Scrollable Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12 overflow-y-auto flex-1">
                    {/* Left Column - Calculator Inputs */}
                    <div className="space-y-8">
                        {/* Purchase Price */}
                        <div>
                            <label className="block text-sm text-ivory-300 mb-3 font-light tracking-wide">
                                Purchase Price
                            </label>
                            <input
                                type="text"
                                value={formatCurrency(purchasePrice)}
                                readOnly
                                className="w-full bg-obsidian-950/60 border border-bronze-500/20 px-4 py-3 text-ivory-100 text-lg mb-3"
                            />
                            <div className="relative">
                                <input
                                    type="range"
                                    min="5000000"
                                    max="200000000"
                                    step="50000"
                                    value={purchasePrice}
                                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                                    className="w-full h-1 bg-bronze-500/20 appearance-none cursor-pointer slider"
                                    style={{
                                        background: `linear-gradient(to right, #a08968 0%, #a08968 ${((purchasePrice - 5000000) / (200000000 - 5000000)) * 100}%, rgba(160, 137, 104, 0.2) ${((purchasePrice - 5000000) / (200000000 - 5000000)) * 100}%, rgba(160, 137, 104, 0.2) 100%)`
                                    }}
                                />
                                <div className="flex justify-between text-xs text-ivory-500 mt-2">
                                    <span>5,000,000 AED</span>
                                    <span>200,000,000 AED</span>
                                </div>
                            </div>
                        </div>

                        {/* Residency Status */}
                        <div>
                            <label className="block text-sm text-ivory-300 mb-3 font-light tracking-wide">
                                Residency Status
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => setResidencyStatus('uae-national')}
                                    className={`py-3 px-4 border text-sm transition-all duration-300 ${residencyStatus === 'uae-national'
                                        ? 'bg-bronze-500/10 border-bronze-500 text-bronze-400'
                                        : 'bg-obsidian-950/40 border-bronze-500/20 text-ivory-400 hover:border-bronze-500/40'
                                        }`}
                                >
                                    UAE national
                                </button>
                                <button
                                    onClick={() => setResidencyStatus('uae-resident')}
                                    className={`py-3 px-4 border text-sm transition-all duration-300 ${residencyStatus === 'uae-resident'
                                        ? 'bg-bronze-500/10 border-bronze-500 text-bronze-400'
                                        : 'bg-obsidian-950/40 border-bronze-500/20 text-ivory-400 hover:border-bronze-500/40'
                                        }`}
                                >
                                    UAE resident
                                </button>
                                <button
                                    onClick={() => setResidencyStatus('non-resident')}
                                    className={`py-3 px-4 border text-sm transition-all duration-300 ${residencyStatus === 'non-resident'
                                        ? 'bg-bronze-500/10 border-bronze-500 text-bronze-400'
                                        : 'bg-obsidian-950/40 border-bronze-500/20 text-ivory-400 hover:border-bronze-500/40'
                                        }`}
                                >
                                    Non resident
                                </button>
                            </div>
                        </div>

                        {/* Down Payment */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="block text-sm text-ivory-300 font-light tracking-wide">
                                    Down payment
                                </label>
                                <span className="text-bronze-500 text-sm font-medium">{downPaymentPercent}%</span>
                            </div>
                            <input
                                type="text"
                                value={`${formatCurrency(downPayment)} AED`}
                                readOnly
                                className="w-full bg-obsidian-950/60 border border-bronze-500/20 px-4 py-3 text-ivory-100 mb-3"
                            />
                            <div className="relative">
                                <input
                                    type="range"
                                    min="5"
                                    max="80"
                                    step="1"
                                    value={downPaymentPercent}
                                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                                    className="w-full h-1 bg-bronze-500/20 appearance-none cursor-pointer slider"
                                    style={{
                                        background: `linear-gradient(to right, #a08968 0%, #a08968 ${((downPaymentPercent - 5) / 75) * 100}%, rgba(160, 137, 104, 0.2) ${((downPaymentPercent - 5) / 75) * 100}%, rgba(160, 137, 104, 0.2) 100%)`
                                    }}
                                />
                                <div className="flex justify-between text-xs text-ivory-500 mt-2">
                                    <span>{formatCurrency((5000000 * 5) / 100)} AED</span>
                                    <span>{formatCurrency((purchasePrice * 80) / 100)} AED</span>
                                </div>
                            </div>
                        </div>

                        {/* Loan Amount */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="block text-sm text-ivory-300 font-light tracking-wide">
                                    Loan amount
                                </label>
                                <span className="text-bronze-500 text-sm font-medium">{100 - downPaymentPercent}%</span>
                            </div>
                            <input
                                type="text"
                                value={`${formatCurrency(loanAmount)} AED`}
                                readOnly
                                className="w-full bg-obsidian-950/60 border border-bronze-500/20 px-4 py-3 text-ivory-100"
                            />
                            <div className="flex justify-between text-xs text-ivory-500 mt-2">
                                <span>{formatCurrency((purchasePrice * 20) / 100)} AED</span>
                                <span>{formatCurrency((purchasePrice * 95) / 100)} AED</span>
                            </div>
                        </div>

                        {/* Loan Period */}
                        <div>
                            <label className="block text-sm text-ivory-300 mb-3 font-light tracking-wide">
                                Loan Period
                            </label>
                            <input
                                type="text"
                                value={loanPeriod}
                                readOnly
                                className="w-full bg-obsidian-950/60 border border-bronze-500/20 px-4 py-3 text-ivory-100 mb-3"
                            />
                            <div className="relative">
                                <input
                                    type="range"
                                    min="1"
                                    max="25"
                                    step="1"
                                    value={loanPeriod}
                                    onChange={(e) => setLoanPeriod(Number(e.target.value))}
                                    className="w-full h-1 bg-bronze-500/20 appearance-none cursor-pointer slider"
                                    style={{
                                        background: `linear-gradient(to right, #a08968 0%, #a08968 ${((loanPeriod - 1) / 24) * 100}%, rgba(160, 137, 104, 0.2) ${((loanPeriod - 1) / 24) * 100}%, rgba(160, 137, 104, 0.2) 100%)`
                                    }}
                                />
                                <div className="flex justify-between text-xs text-ivory-500 mt-2">
                                    <span>1 year</span>
                                    <span>25 years</span>
                                </div>
                            </div>
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="block text-sm text-ivory-300 font-light tracking-wide">
                                    Interest rate
                                </label>
                                <span className="text-bronze-500 text-sm font-medium">%</span>
                            </div>
                            <input
                                type="text"
                                value={interestRate.toFixed(2)}
                                readOnly
                                className="w-full bg-obsidian-950/60 border border-bronze-500/20 px-4 py-3 text-ivory-100 mb-3"
                            />
                            <div className="relative">
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    step="0.01"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="w-full h-1 bg-bronze-500/20 appearance-none cursor-pointer slider"
                                    style={{
                                        background: `linear-gradient(to right, #a08968 0%, #a08968 ${((interestRate - 1) / 9) * 100}%, rgba(160, 137, 104, 0.2) ${((interestRate - 1) / 9) * 100}%, rgba(160, 137, 104, 0.2) 100%)`
                                    }}
                                />
                                <div className="flex justify-between text-xs text-ivory-500 mt-2">
                                    <span>1%</span>
                                    <span>10%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Results & Form */}
                    <div className="space-y-8">
                        {/* Payment Summary */}
                        <div className="bg-obsidian-950/60 border border-bronze-500/20 p-8">
                            <h3 className="text-sm text-ivory-400 uppercase tracking-[0.2em] mb-6 font-light">
                                Estimate your monthly mortgage payment
                            </h3>

                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div>
                                    <p className="text-xs text-ivory-500 mb-2 uppercase tracking-wider">Monthly payment</p>
                                    <p className="text-4xl md:text-5xl font-light text-bronze-400">{formatCurrency(monthlyPayment)} <span className="text-xl text-ivory-400">AED</span></p>
                                </div>
                                <div>
                                    <p className="text-xs text-ivory-500 mb-2 uppercase tracking-wider">With interest rate of</p>
                                    <p className="text-4xl md:text-5xl font-light text-bronze-400">{interestRate.toFixed(2)}<span className="text-xl text-ivory-400">%</span></p>
                                </div>
                            </div>

                            <button className="w-full py-3 border border-bronze-500/30 text-bronze-500 hover:bg-bronze-500/10 transition-all duration-300 text-sm uppercase tracking-wider mb-4">
                                View upfront costs
                            </button>

                            {/* Property Count */}
                            <div className="bg-obsidian-900/60 border border-bronze-500/10 p-6 mt-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <TrendingUp className="w-5 h-5 text-bronze-500" strokeWidth={1.5} />
                                    <p className="text-sm text-ivory-400">We found <span className="text-bronze-400 font-medium">207,720 properties</span> within your budget.</p>
                                </div>
                                <button className="inline-flex items-center gap-2 text-sm text-bronze-500 hover:text-bronze-400 transition-colors">
                                    View properties
                                    <ChevronRight className="w-4 h-4" strokeWidth={2} />
                                </button>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-obsidian-950/60 border border-bronze-500/20 p-8">
                            <h3 className="text-sm text-ivory-400 uppercase tracking-[0.2em] mb-6 font-light">
                                Please enter your details
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-obsidian-900/60 border border-bronze-500/20 px-4 py-3 text-ivory-100 placeholder:text-ivory-600 focus:border-bronze-500/40 focus:outline-none transition-colors"
                                />

                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-obsidian-900/60 border border-bronze-500/20 px-4 py-3 text-ivory-100 placeholder:text-ivory-600 focus:border-bronze-500/40 focus:outline-none transition-colors"
                                />

                                <div className="flex gap-2">
                                    <div className="flex items-center gap-2 bg-obsidian-900/60 border border-bronze-500/20 px-4 py-3">
                                        <div className="w-6 h-4 bg-[#00732F] relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-1/3 bg-[#00732F]"></div>
                                            <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white"></div>
                                            <div className="absolute top-2/3 left-0 w-full h-1/3 bg-black"></div>
                                            <div className="absolute left-0 top-0 h-full w-1/4 bg-[#EE161F]"></div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-bronze-500 rotate-90" strokeWidth={2} />
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="flex-1 bg-obsidian-900/60 border border-bronze-500/20 px-4 py-3 text-ivory-100 placeholder:text-ivory-600 focus:border-bronze-500/40 focus:outline-none transition-colors"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#DC2626] to-[#EF4444] hover:from-[#B91C1C] hover:to-[#DC2626] text-white py-4 text-sm uppercase tracking-wider font-medium transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
                                >
                                    Check your eligibility
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="border-t border-bronze-500/10 bg-obsidian-950/40 px-8 md:px-12 py-6">
                    <p className="text-xs text-ivory-500 text-center font-light">
                        Our advisors will help you find the perfect financing solution. All calculations are estimates and subject to approval.
                    </p>
                </div>
            </div>

            <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #a08968;
          cursor: pointer;
          border: 3px solid #1a1410;
          box-shadow: 0 0 0 1px rgba(160, 137, 104, 0.3);
          transition: all 0.3s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          background: #c09a6b;
          box-shadow: 0 0 0 3px rgba(160, 137, 104, 0.3);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #a08968;
          cursor: pointer;
          border: 3px solid #1a1410;
          box-shadow: 0 0 0 1px rgba(160, 137, 104, 0.3);
          transition: all 0.3s ease;
        }

        .slider::-moz-range-thumb:hover {
          background: #c09a6b;
          box-shadow: 0 0 0 3px rgba(160, 137, 104, 0.3);
        }
      `}</style>
        </div>
    )
}
