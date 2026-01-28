'use client'

import ViewingFormCard from './ViewingFormCard'

export default function ViewingForm() {
  return (
    <section className="section bg-obsidian-950 relative overflow-hidden" id="contact">
      {/* Full-bleed dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-teal-900/10" />

      <div className="container-custom px-4 md:px-6 lg:px-8 relative z-10">
        <ViewingFormCard />
      </div>
    </section>
  )
}
