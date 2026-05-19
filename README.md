# MZ5 Digital — Marketing Site

Modern dark-theme agency site built with **Next.js**, **Tailwind CSS**, and **Framer Motion**.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- Framer Motion
- Space Grotesk + Instrument Serif (accent italics)
- Lucide icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Cloudflare

See **[CLOUDFLARE.md](./CLOUDFLARE.md)** for Pages/Workers setup. Use `npm run pages:build` (not `dist`) and add `RESEND_API_KEY` in the dashboard.

## Project structure

```
src/
├── app/
│   ├── page.tsx                 # Home
│   └── services/
│       ├── branding/
│       ├── web-development/
│       ├── seo/
│       └── ppc/
├── components/
│   ├── layout/                  # Header, Footer, dropdown, mobile nav
│   ├── sections/                # Hero, Services, Process, About, Contact
│   ├── services/                # Service page template
│   ├── ui/                      # Button, Logo, cards, headings
│   └── motion/                  # Scroll reveal animations
└── lib/site.ts                  # Content & navigation data
```

## Contact form emails

Submissions are sent via [Resend](https://resend.com) to `muhammad.fahim@mz5digital.com`, with a branded confirmation email to the visitor.

1. Copy `.env.example` to `.env.local`
2. Add your `RESEND_API_KEY` from [resend.com/api-keys](https://resend.com/api-keys)
3. Until `mz5digital.com` is verified in Resend, use `onboarding@resend.dev` as the sender

```bash
cp .env.example .env.local
```

## Customize

- **Copy & stats:** `src/lib/site.ts`
- **Logo:** replace `public/logo.png`
- **Colors:** CSS variables in `src/app/globals.css`
