# Deploy MZ5 Digital to Cloudflare

This project uses **@opennextjs/cloudflare** (not a static `dist` folder). The contact form API (`/api/contact`) needs Workers — static export will not work.

## Cloudflare Pages (GitHub) — recommended settings

In **Workers & Pages** → your project → **Settings** → **Build**:

| Setting | Value |
|---------|--------|
| **Framework preset** | None |
| **Build command** | `npm run pages:build` |
| **Build output directory** | *(leave empty)* |
| **Root directory** | `/` |

> **Important:** Remove `dist` from the output directory. That caused the `Output directory "dist" not found` error.

### Environment variables

Add under **Settings** → **Environment variables** (Production):

| Variable | Required |
|----------|----------|
| `RESEND_API_KEY` | Yes — contact form emails |
| `CONTACT_TO_EMAIL` | Optional — defaults to `muhammad.fahim@mz5digital.com` |
| `CONTACT_FROM_EMAIL` | Optional — e.g. `MZ5 Digital <onboarding@resend.dev>` |
| `NODE_VERSION` | `22` (recommended) |

## Deploy from your machine

```bash
npm install
npm run deploy
```

Log in with Wrangler when prompted (`npx wrangler login`).

## Local preview (Workers runtime)

```bash
npm run preview
```

## Troubleshooting

- **`dist` not found** — Output directory must be empty; use `npm run pages:build`, not `npm run build` alone for Pages deploy.
- **Contact form fails** — Set `RESEND_API_KEY` in Cloudflare environment variables.
- **Node version** — Use Node 22+ locally and in Cloudflare build settings.
