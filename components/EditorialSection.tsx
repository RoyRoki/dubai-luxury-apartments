'use client'

import React from 'react'

interface EditorialSectionProps {
    title: string
    subtitle: string
    description: string
    align?: 'left' | 'center' | 'right'
}

export default function EditorialSection({
    title,
    subtitle,
    description,
    align = 'center'
}: EditorialSectionProps) {
    const alignClass = {
        left: 'text-left',
        center: 'text-center mx-auto',
        right: 'text-right ml-auto'
    }[align]

    return (
        <section className="section bg-obsidian-950 px-4 md:px-6 lg:px-8 py-24 lg:py-40">
            <div className={`container-editorial max-w-4xl ${alignClass}`}>
                <p className="text-bronze-500 text-xs md:text-sm uppercase tracking-[0.3em] font-light mb-6">
                    {subtitle}
                </p>
                <h2 className="heading-xl mb-8 text-ivory-100">
                    {title}
                </h2>
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-bronze-500 to-transparent mb-8 opacity-50" />
                <p className="text-base md:text-xl text-ivory-400 font-light leading-relaxed tracking-wide">
                    {description}
                </p>
            </div>
        </section>
    )
}
