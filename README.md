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

See **[CLOUDFLARE.md](./CLOUDFLARE.md)** for Pages/Workers setup. Live site: `https://mz5-digital-site.fahimku.workers.dev`

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

Submissions are sent via [Web3Forms](https://web3forms.com) from the browser (required on the free plan).

1. Sign up at [web3forms.com](https://web3forms.com) with **muhammad.fahim@mz5digital.com**
2. Add your access key to `.env` as **`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`** (restart `npm run dev` after changing `.env`)
3. Add the same variable in Cloudflare **Variables** for production deploys

## Customize

- **Copy & stats:** `src/lib/site.ts`
- **Logo:** replace `public/logo.png`
- **Colors:** CSS variables in `src/app/globals.css`
