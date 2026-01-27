# Dubai Luxury Apartments - Premium Real Estate Landing Page

A stunning, Awwwards-level landing page built for luxury apartment retailers in Dubai. Features smooth animations, premium design, and best practices throughout.

## 🎨 Design Features

- **Ultra-Premium Design**: Champagne gold accents, deep navy theme, luxury typography
- **Smooth Animations**: GSAP ScrollTrigger, Framer Motion, Lenis smooth scrolling
- **Fully Responsive**: Mobile-first design, perfect on all devices
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance Optimized**: Next.js 14, optimized images, code splitting

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**:
  - GSAP with ScrollTrigger (scroll animations, parallax)
  - Framer Motion (page transitions, interactions)
  - Lenis (butter-smooth scrolling)
- **Icons**: Lucide React
- **Fonts**: Playfair Display, Sora, Inter (Google Fonts)

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
dubai-luxury-apartments/
├── app/
│   ├── page.tsx              # Main landing page
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles & utilities
├── components/
│   ├── Header.tsx            # Sticky navigation
│   ├── Hero.tsx              # Full-screen hero section
│   ├── PropertyCard.tsx      # Property showcase card
│   ├── FeaturedProperties.tsx # Properties grid
│   ├── Amenities.tsx         # Amenities grid
│   ├── Location.tsx          # Location with map
│   ├── Investment.tsx        # Investment benefits
│   ├── Testimonials.tsx      # Client testimonials carousel
│   ├── FAQ.tsx               # FAQ accordion
│   ├── ViewingForm.tsx       # Contact form with validation
│   └── Footer.tsx            # Footer with links
├── lib/
│   ├── utils.ts              # Utility functions
│   └── animations.ts         # GSAP animation helpers
└── public/
    └── images/               # Optimized images
```

## ✨ Sections

1. **Hero** - Full-screen with Dubai skyline, animated headline, CTAs
2. **Featured Properties** - Grid of 6 luxury properties with details
3. **Amenities** - 8 world-class amenities with icons
4. **Location** - Interactive map + proximity highlights
5. **Investment** - ROI stats, benefits, market data
6. **Testimonials** - Client reviews carousel
7. **FAQ** - 6 common questions with expandable answers
8. **Viewing Form** - Multi-field form with validation
9. **Footer** - Contact info, quick links, social media

## 🎯 Key Features

### Design
- Luxury color palette (Deep Navy + Champagne Gold)
- Premium typography scale
- Glassmorphism effects
- Smooth gradient backgrounds
- Gold glow hover effects

### Animations
- Fade in on scroll
- Stagger animations for grids
- Parallax effects on images
- Smooth page scrolling
- Hover interactions on all interactive elements

### Best Practices
- ✅ Semantic HTML5
- ✅ ARIA labels for accessibility
- ✅ Optimized images (WebP, lazy loading)
- ✅ Mobile-first responsive design
- ✅ SEO optimized (meta tags, structured data)
- ✅ Fast loading (Core Web Vitals optimized)
- ✅ Clean, maintainable code
- ✅ TypeScript for type safety

## 🚀 Production Build

```bash
npm run build
npm start
```

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 768px
- Desktop: 1024px
- Large: 1280px+

## 🎨 Color Palette

```css
Primary Navy: #0A1628
Champagne Gold: #D4AF37
Rose Gold: #B76E79
Neutrals: Gray 50-950
```

## 🔧 Customization

### Update Content
- Property data: `components/FeaturedProperties.tsx`
- Amenities: `components/Amenities.tsx`
- Testimonials: `components/Testimonials.tsx`
- FAQ: `components/FAQ.tsx`

### Update Branding
- Colors: `tailwind.config.ts`
- Logo: `components/Header.tsx` and `components/Footer.tsx`
- Fonts: `app/layout.tsx`

### Add Google Maps API
Replace the embedded map in `components/Location.tsx` with your Google Maps API key.

## 📄 License

Created by Dubai Luxury Apartments. All rights reserved.

---

**Built with expertise by a 10-year frontend developer & designer.**
