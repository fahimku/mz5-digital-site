# Deploy MZ5 Digital to Cloudflare

## Current error: `CLOUDFLARE_API_TOKEN` required

Your build log shows OpenNext **built successfully**, then **deploy failed** because Wrangler needs an API token in CI.

Cloudflare Pages does **not** auto-inject this token when `npm run deploy` runs as the build command. You must add it manually (one-time setup).

---

## Step 1 — Create an API token

1. Open [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. **Create Token** → use template **Edit Cloudflare Workers**
3. Continue → **Create Token** → copy the token (shown once)

## Step 2 — Get your Account ID

1. Open [Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Copy **Account ID** from the right sidebar

## Step 3 — Add environment variables in Cloudflare

**Workers & Pages** → **mz5-digital-site** → **Settings** → **Variables and secrets**

Add for **Production** and **Preview**:

| Variable | Value |
|----------|--------|
| `CLOUDFLARE_API_TOKEN` | Your API token from Step 1 |
| `CLOUDFLARE_ACCOUNT_ID` | Your account ID from Step 2 |
| `RESEND_API_KEY` | Your Resend key (contact form) |
| `CONTACT_TO_EMAIL` | `muhammad.fahim@mz5digital.com` (optional) |

Mark `CLOUDFLARE_API_TOKEN` and `RESEND_API_KEY` as **encrypted**.

## Step 4 — Build settings

**Settings** → **Build**:

| Setting | Value |
|---------|--------|
| **Build command** | `npm run deploy` |
| **Build output directory** | *(empty — no `dist`)* |
| **Node version** | `22` |

## Step 5 — Redeploy

**Deployments** → **Retry deployment** on the latest build.

Success looks like:
- `Worker saved in .open-next/worker.js`
- `Published mz5-digital-site` (or similar)
- No `CLOUDFLARE_API_TOKEN` error

---

## Deploy from your computer

```bash
npm install
npx wrangler login
npm run deploy
```

(`wrangler login` stores credentials locally — no token env var needed.)

---

## Why `wrangler.jsonc` was “skipped”

Pages CI expects `pages_build_output_dir` for **static-only** Pages. This app is a **Worker** (Next.js + `/api/contact`), so we use `main` + `assets` and deploy via `opennextjs-cloudflare deploy` — that is correct.

---

## Local preview

```bash
npm run preview
```
