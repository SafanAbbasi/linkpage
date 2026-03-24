# LinkPage

A personal link-in-bio page for **Safan Abbasi** — a clean, responsive single-page site to share important links in one place.

**Live at [linktree.safanabbasi.com](https://linktree.safanabbasi.com/)**

![Screenshot](docs/Screenshot%202026-03-24%20011234.png)

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Lucide React** for icons

## Features

- Profile header with avatar, name, and bio
- Colored link buttons with brand-matched backgrounds and hover effects
- Mobile-first responsive layout
- Statically generated for fast page loads
- Ready for Vercel deployment

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout, fonts, metadata
│   ├── page.tsx          # Main link page
│   └── globals.css       # Tailwind v4 theme config
├── components/
│   ├── ProfileHeader.tsx # Avatar + name + bio
│   ├── LinkButton.tsx    # Colored link button with icon
│   └── Footer.tsx        # Copyright footer
└── data/
    └── links.ts          # Link data and profile info
```

## Customization

Edit `src/data/links.ts` to update your profile info and links:

```typescript
export const profile = {
  name: "Your Name",
  title: "Your Title",
  bio: "Your tagline.",
  avatarUrl: "/avatar.jpeg",
};
```

Add or remove links in the `links` array. Each link has a label, URL, background color, hover color, and icon.

## Deployment

Deploy to [Vercel](https://vercel.com) by importing this repo. Vercel auto-detects Next.js and handles everything.

## Roadmap

- **Phase 2** — Click tracking with Supabase
- **Phase 3** — Admin dashboard with analytics and link management
- **Phase 4** — Animations, dark mode, OG images, QR codes

See [docs/linktree-clone-implementation-plan.md](docs/linktree-clone-implementation-plan.md) for the full plan.

## License

MIT
