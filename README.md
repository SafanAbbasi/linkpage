# Safan Abbasi — Portfolio

A full-stack portfolio website with interactive animations, click analytics, and an admin dashboard.

**Live at [www.safanabbasi.com](https://www.safanabbasi.com)**

## Tech Stack

- **Next.js 16** (App Router, ISR, Server Components)
- **React 19** with TypeScript
- **Tailwind CSS 4** (CSS-first config, class-based dark mode)
- **Motion 12** (scroll animations, entrance effects, infinite loops)
- **Supabase** (PostgreSQL — links, click tracking, contact form)
- **Vercel** (hosting, analytics, speed insights)

## Features

### Portfolio
- Animated hero with typewriter text, floating avatar with glowing ring, and gradient mesh background
- Floating tech icons (Python, Docker, Azure, React, etc.) with brand colors via devicons-react
- Card flip link buttons with hover glow and click particle effects
- About section with animated stats
- Projects showcase with hover effects and tech stack tags
- Skills & Technologies with colored brand icons grouped by category
- Contact form with honeypot spam protection (stored in Supabase)
- Floating scroll navigation with active section indicator
- Dark/light mode toggle
- Cursor spotlight effect (desktop only)

### Admin Dashboard (`/admin`)
- Supabase auth (email/password)
- Click analytics with charts (Recharts)
- Link management with drag-to-reorder (dnd-kit), inline editing, active/inactive toggle
- Short links management (safanabbasi.com/github, etc.)
- Contact form message viewer
- QR code generator
- CSV export

### Infrastructure
- ISR with 60s revalidation for dynamic link data
- Click tracking API (fire-and-forget, non-blocking)
- Short link redirects with click tracking
- Dynamic OG image and favicon generation (Edge runtime)
- Proxy-based auth middleware (Next.js 16 pattern)

## Getting Started

```bash
npm install
npm run dev
```

Requires a `.env.local` with Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-key
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Main portfolio page (server component)
│   ├── layout.tsx               # Root layout, fonts, metadata, providers
│   ├── globals.css              # Tailwind v4 theme config
│   ├── icon.tsx                 # Dynamic favicon (Edge)
│   ├── opengraph-image.tsx      # Dynamic OG image (Edge)
│   ├── not-found.tsx            # Custom 404
│   ├── admin/                   # Admin dashboard + login
│   ├── api/
│   │   ├── click/route.ts       # Click tracking endpoint
│   │   ├── contact/route.ts     # Contact form endpoint
│   │   └── analytics/           # Analytics + CSV export
│   └── [slug]/route.ts          # Short link redirects
├── components/
│   ├── InteractivePage.tsx      # Main wrapper (background, floating icons, spotlight)
│   ├── ProfileHeader.tsx        # Avatar, typewriter greeting, title, skills
│   ├── AnimatedLinks.tsx        # Staggered link entrance animations
│   ├── LinkButton.tsx           # Card flip, glow, particles
│   ├── ScrollNav.tsx            # Floating navigation bar
│   ├── AboutSection.tsx         # About me + stats
│   ├── ProjectsGrid.tsx         # Project showcase cards
│   ├── SkillsSection.tsx        # Grouped tech tags with brand icons
│   ├── ContactSection.tsx       # Contact form + social links
│   ├── SectionDivider.tsx       # Visual section separator
│   ├── ThemeToggle.tsx          # Dark/light mode toggle
│   └── ...                      # Admin components (charts, sortable items, QR)
├── data/
│   └── links.ts                 # Link types and profile data
├── lib/
│   └── supabase/                # Server + browser Supabase clients
└── proxy.ts                     # Auth middleware (Next.js 16)
```

## Deployment

Push to GitHub and import into [Vercel](https://vercel.com). Add your Supabase env vars in the Vercel dashboard. Vercel auto-detects Next.js and deploys on every push.

## License

MIT
