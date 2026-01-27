# Quick Start Guide

Get the Dubai Luxury Apartments landing page up and running in 5 minutes!

## 🚀 Installation

### 1. Install Dependencies

```bash
cd dubai-luxury-apartments
npm install
```

This will install:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- GSAP (animations)
- Framer Motion
- Lenis (smooth scroll)
- Lucide React (icons)

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result!

## 📂 Project Overview

```
dubai-luxury-apartments/
├── app/
│   ├── page.tsx          # 🏠 Main landing page
│   ├── layout.tsx        # Layout with fonts & metadata
│   └── globals.css       # 🎨 Global styles
├── components/           # 🧩 All UI components
├── lib/                  # 🛠️ Utilities & animations
└── public/               # 🖼️ Images
```

## 🎨 Customize Your Landing Page

### 1. Update Company Name & Logo

**File:** `components/Header.tsx` and `components/Footer.tsx`

```typescript
// Change the logo text
<span className="font-display">D</span>
// Change company name
<span className="font-heading">Dubai</span>
<span className="text-xs">Luxury Apartments</span>
```

### 2. Update Properties

**File:** `components/FeaturedProperties.tsx`

```typescript
const properties = [
  {
    title: 'Your Property Name',
    location: 'Your Location',
    price: 8500000,
    image: 'https://your-image-url.com',
    bedrooms: 4,
    bathrooms: 5,
    area: 4500,
  },
  // Add more properties...
]
```

### 3. Update Amenities

**File:** `components/Amenities.tsx`

```typescript
const amenities = [
  {
    icon: Waves,
    title: 'Your Amenity',
    description: 'Description here',
  },
  // Add more amenities...
]
```

### 4. Update Colors (Branding)

**File:** `tailwind.config.ts`

```typescript
colors: {
  navy: { /* Your primary color */ },
  gold: { /* Your accent color */ },
}
```

### 5. Update SEO & Metadata

**File:** `app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: 'Your Company Name',
  description: 'Your description',
  keywords: 'your, keywords, here',
}
```

### 6. Connect Contact Form

**File:** `components/ViewingForm.tsx`

Replace the simulated API call with your actual endpoint:

```typescript
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()

  // Replace with your API endpoint
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  })
}
```

## 🗺️ Add Google Maps API

**File:** `components/Location.tsx`

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Replace the iframe `src` with your embedded map URL

```typescript
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_API_KEY_HERE"
  // ... rest of props
/>
```

## 📱 Test Responsive Design

Open Chrome DevTools (F12) and test on:
- Mobile: iPhone 12 Pro, Galaxy S21
- Tablet: iPad Pro
- Desktop: 1920x1080, 2560x1440

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🚢 Deploy

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload the .next folder
```

### Manual Server

```bash
npm run build
npm start
# Server runs on port 3000
```

## 🎯 Performance Tips

1. **Replace Unsplash URLs** with your own optimized images
2. **Add real Google Maps API** instead of embedded iframe
3. **Enable Image Optimization** in `next.config.js`
4. **Set up API routes** for form submissions
5. **Add analytics** (Google Analytics, Vercel Analytics)

## ❓ Common Issues

### Animations not working?

Make sure GSAP and Lenis are installed:
```bash
npm install gsap @studio-freight/lenis
```

### Images not loading?

Check `next.config.js` image domains:
```typescript
images: {
  domains: ['your-domain.com'],
}
```

### Build errors?

Clear cache and reinstall:
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [GSAP Docs](https://greensock.com/docs/)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 💡 Tips

- Use **WebP images** for better performance
- Test on **real devices** for mobile experience
- Check **accessibility** with Lighthouse
- Monitor **Core Web Vitals** in production

---

**Need help?** Check the README.md for detailed documentation.

**Ready to launch?** Make sure to:
- [ ] Update all content
- [ ] Replace placeholder images
- [ ] Add Google Maps API
- [ ] Connect contact form
- [ ] Test on all devices
- [ ] Run Lighthouse audit
- [ ] Deploy!

🚀 **Built by a 10-year expert. Now it's yours to customize!**
