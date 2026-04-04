# Safan Abbasi — Personal Portfolio

A full-stack portfolio website with interactive animations, click analytics, email replies, and an admin dashboard.

**Live at [www.safanabbasi.com](https://www.safanabbasi.com)**

## Tech Stack

- **Next.js 16** (App Router, ISR, Server Components)
- **React 19** with TypeScript
- **Tailwind CSS 4** (CSS-first config, class-based dark mode)
- **Motion 12** (scroll animations, parallax, entrance effects, infinite loops)
- **Supabase** (PostgreSQL — links, click tracking, contact form, messages)
- **Resend** (email replies from admin dashboard)
- **Vercel** (hosting, analytics, speed insights)

## Features

### Portfolio
- Animated hero with typewriter text, floating avatar with glowing ring, and gradient mesh background
- Floating tech icons (Python, Docker, Azure, React, etc.) with brand colors via devicons-react
- Card flip link buttons with hover glow and click particle effects
- About section with animated stats and clickable experience timeline
- Experience drawer with full work history, projects, patent, and education
- Projects showcase with hover effects and tech stack tags
- Skills & Technologies with colored brand icons grouped by category
- Contact form with honeypot spam protection, rate limiting, and confetti success animation
- Parallax scroll effects on sections with animated dividers
- Floating scroll navigation with active section indicator
- Back-to-top button
- Dark/light mode toggle
- Cursor spotlight effect (desktop only)

### Admin Dashboard (`/admin`)
- Supabase auth (email/password)
- Click analytics with charts (Recharts)
- Link management with drag-to-reorder (dnd-kit), inline editing, active/inactive toggle
- Short links management (safanabbasi.com/github, etc.)
- Contact form message viewer with email reply via Resend
- Reply status tracking (replied/unreplied indicators)
- QR code generator
- CSV export

### Infrastructure
- ISR with 60s revalidation for dynamic link data
- Click tracking API (fire-and-forget, non-blocking)
- Short link redirects with click tracking
- Dynamic OG image and favicon generation (Edge runtime)
- Proxy-based auth middleware (Next.js 16 pattern)
- IP-based rate limiting on contact form (3 per 15 min via Supabase)
- JSON-LD structured data (Person + WebSite schemas)
- Sitemap and robots.txt for SEO
- Google Search Console integration

## Getting Started

```bash
npm install
npm run dev
```

Requires a `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-key
RESEND_API_KEY=your-resend-key
RESEND_FROM_EMAIL=Your Name <email@yourdomain.com>
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Main portfolio page (server component)
│   ├── layout.tsx               # Root layout, fonts, metadata, structured data
│   ├── globals.css              # Tailwind v4 theme config
│   ├── sitemap.ts               # Dynamic sitemap generation
│   ├── robots.ts                # Robots.txt generation
│   ├── icon.tsx                 # Dynamic favicon (Edge)
│   ├── opengraph-image.tsx      # Dynamic OG image (Edge)
│   ├── not-found.tsx            # Custom 404
│   ├── admin/                   # Admin dashboard + login
│   ├── api/
│   │   ├── click/route.ts       # Click tracking endpoint
│   │   ├── contact/route.ts     # Contact form with rate limiting
│   │   ├── messages/[id]/reply/ # Email reply endpoint (Resend)
│   │   └── analytics/           # Analytics + CSV export
│   └── [slug]/route.ts          # Short link redirects
├── components/
│   ├── InteractivePage.tsx      # Main wrapper (background, floating icons, parallax)
│   ├── ProfileHeader.tsx        # Avatar, typewriter greeting, title, skills
│   ├── AnimatedLinks.tsx        # Staggered link entrance animations
│   ├── LinkButton.tsx           # Card flip, glow, particles
│   ├── ScrollNav.tsx            # Floating navigation bar
│   ├── AboutSection.tsx         # About me + stats + timeline graphic
│   ├── ExperienceDrawer.tsx     # Slide-in drawer with full timeline
│   ├── ProjectsGrid.tsx         # Project showcase cards
│   ├── SkillsSection.tsx        # Grouped tech tags with brand icons
│   ├── ContactSection.tsx       # Contact form with success animation
│   ├── SectionDivider.tsx       # Animated section separator
│   ├── ThemeToggle.tsx          # Dark/light mode toggle
│   └── ...                      # Admin components (charts, sortable items, QR)
├── data/
│   └── links.ts                 # Link types and profile data
├── lib/
│   └── supabase/                # Server + browser Supabase clients
└── proxy.ts                     # Auth middleware (Next.js 16)
```

## Deployment

Push to GitHub and import into [Vercel](https://vercel.com). Add your env vars (Supabase + Resend) in the Vercel dashboard. Vercel auto-detects Next.js and deploys on every push.

## License

MIT
