# Deploy MZ5 Digital to Cloudflare

## Your dashboard is wrong — fix these first

Your build log shows **Node 18** and **`npx @cloudflare/next-on-pages@1`**. That preset is deprecated and does **not** work with Next.js 16.

### Change Build settings to this

| Setting | ❌ Wrong (current) | ✅ Correct |
|---------|-------------------|------------|
| Framework preset | Next.js | **None** |
| Build command | `npx @cloudflare/next-on-pages@1` | **`npm run deploy`** |
| Build output directory | `.vercel/output/static` | **(leave empty)** |
| Node version | 18 (default) | **`22`** |

Save, then **Retry deployment**.

---

## Environment variables

**Settings** → **Variables and secrets** → add for **Production** and **Preview**:

| Variable | Value |
|----------|--------|
| `NODE_VERSION` | `22` |
| `CLOUDFLARE_API_TOKEN` | API token (see below) — **Encrypt** |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
| `RESEND_API_KEY` | Your Resend key — **Encrypt** |
| `CONTACT_TO_EMAIL` | `muhammad.fahim@mz5digital.com` |
| `CONTACT_FROM_EMAIL` | `MZ5 Digital <onboarding@resend.dev>` |

### Create `CLOUDFLARE_API_TOKEN`

1. [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
2. **Create Token** → template **Edit Cloudflare Workers**
3. Copy token → paste into Cloudflare project variables

### Account ID

**Workers & Pages** → right sidebar → copy **Account ID**

---

## What `npm run deploy` does

1. Builds Next.js with **OpenNext** (`@opennextjs/cloudflare`)
2. Deploys the Worker to Cloudflare (supports `/api/contact`)

This is **not** static `dist` or `.vercel/output/static`.

---

## Successful build log should show

```
OpenNext — Cloudflare build
Worker saved in `.open-next/worker.js`
OpenNext — Cloudflare deploy
Published mz5-digital-site
```

**Not:**
- `npx @cloudflare/next-on-pages`
- `You are using Node.js 18`
- `Output directory "dist" not found`

---

## Deploy from your PC (no API token needed)

```bash
npm install
npx wrangler login
npm run deploy
```

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| Node.js 18 / `>=20.9.0` required | Set `NODE_VERSION` = `22` in env vars |
| `CLOUDFLARE_API_TOKEN` missing | Add token + account ID (see above) |
| `next-on-pages` / Vercel build failed | Change build command to `npm run deploy`, preset **None** |
| 404 on pages.dev | Deploy step never ran — use `npm run deploy` + API token |
| `wrangler.jsonc` skipped | Normal for Worker deploy — ignore |

---

## Local preview

```bash
npm run preview
```
