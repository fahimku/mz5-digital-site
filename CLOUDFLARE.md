# Deploy MZ5 Digital to Cloudflare

## Your dashboard is wrong — fix these first

Your build log shows **Node 18** and **`npx @cloudflare/next-on-pages@1`**. That preset is deprecated and does **not** work with Next.js 16.

### Change Build settings to this

| Setting | ❌ Wrong | ✅ Correct |
|---------|----------|------------|
| Framework preset | **Next.js** (forces Node 18) | **None** |
| Build command | `npx @cloudflare/next-on-pages@1` | **`npm run deploy`** |
| Build output directory | `/` or `.vercel/output/static` | **(completely empty)** |
| `NODE_VERSION` env var | missing | **`22`** |

Save, then **Retry deployment**.

---

## Environment variables

**Settings** → **Variables and secrets** → add for **Production** and **Preview**:

| Variable | Value |
|----------|--------|
| `NODE_VERSION` | **`22`** ← **required** (fixes Node 18 error) |
| `CLOUDFLARE_API_TOKEN` | API token (see below) — **Encrypt** |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |
Contact form uses [Web3Forms](https://web3forms.com) from the browser. Add:

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | From [web3forms.com](https://web3forms.com) (register with `muhammad.fahim@mz5digital.com`) |

### Create `CLOUDFLARE_API_TOKEN` (fixes error 9109 / 10000)

Your build **succeeded** — only deploy auth failed (`Invalid access token`).

Do **not** use a random `cfk_...` key unless Cloudflare generated it for Workers Builds. Create a proper token:

1. Open [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
2. **Create Token** → **Edit Cloudflare Workers** (template)
3. **Account resources:** include your account
4. **Create Token** → copy the value (shown once — long string, not necessarily `cfk_`)
5. In project **Variables** → edit `CLOUDFLARE_API_TOKEN` → paste the **new** token → **Encrypt**
6. Confirm `CLOUDFLARE_ACCOUNT_ID` matches the account in the sidebar (`e4cbbb75294032c27c0dce16fa5792e4`)

If you exposed the old token in a screenshot, **revoke it** and use the new one.

**Retry deployment** after saving variables.

### Account ID

**Workers & Pages** → right sidebar → copy **Account ID**

---

## What `npm run deploy` does

1. Builds Next.js with **OpenNext** (`@opennextjs/cloudflare`)
2. Deploys the Worker to Cloudflare (contact form uses Web3Forms in the browser)

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

## Build succeeded but `pages.dev` shows 404

This is expected with the current setup.

Your log says:
```text
wrangler.jsonc ... does not contain pages_build_output_dir. Skipping file
```

So Cloudflare **Pages** only uploaded static `/_next/static/...` files.  
Your **Next.js app** (HTML + client routes) lives on the **Worker** from `opennextjs-cloudflare deploy`.

`https://mz5-digital-site.pages.dev` → static Pages (no app router) → **404**  
Worker URL → full app → **works**

### Fix A — Use the Worker URL (fastest)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages**
2. Open **mz5-digital-site** under **Workers** (or the Worker with that name)
3. Click **Visit** — URL looks like:
   `https://mz5-digital-site.<your-account>.workers.dev`

Use that URL to test the site.

### Fix B — Attach `pages.dev` to the Worker

1. Same Worker → **Settings** → **Domains & Routes** / **Triggers**
2. **Add custom domain** → `mz5-digital-site.pages.dev`
3. Save and wait a few minutes

### Fix C — Best long-term: Worker project (not Pages static)

1. **Workers & Pages** → **Create** → **Worker** → **Connect Git**
2. Same repo, build command: `npm run deploy`
3. Variables: `NODE_VERSION=22`, Cloudflare API token (for deploy only)
4. Cloudflare auto-handles deploy auth; `pages.dev` / `workers.dev` route correctly

You can delete the old Pages-only project after the Worker works.

### Also check

| Setting | Must be |
|---------|---------|
| Build output directory | **empty** (not `/`) |
| Framework preset | **None** |
| Preview URL `93e2050b....pages.dev` | If this also 404s, Worker is not linked — use Fix A/B |

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| Node.js 18 / `>=20.9.0` required | Set `NODE_VERSION` = `22` in env vars |
| `CLOUDFLARE_API_TOKEN` missing / 9109 | Create new API token (Edit Cloudflare Workers) |
| `next-on-pages` / Vercel build failed | Build command `npm run deploy`, preset **None** |
| Build OK, pages.dev 404 | Use Worker URL or add custom domain (see above) |
| `wrangler.jsonc` skipped | Normal — OpenNext uses Worker `main`, not Pages static |

---

## Local preview

```bash
npm run preview
```
