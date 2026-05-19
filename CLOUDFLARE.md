# Deploy MZ5 Digital to Cloudflare

## Why you see a 404 on `*.pages.dev`

`npm run pages:build` **only compiles** the app into `.open-next/` — it does **not** publish anything to Cloudflare.  
With an empty output directory, Pages has **no files to serve** → 404.

You must run the **deploy** step (`opennextjs-cloudflare deploy`) so the Worker goes live.

---

## Fix in Cloudflare dashboard (GitHub deploy)

Open **Workers & Pages** → **mz5-digital-site** → **Settings** → **Build**

### Option A — One command (easiest)

| Setting | Value |
|---------|--------|
| **Build command** | `npm run deploy` |
| **Deploy command** | *(leave empty if not shown)* |
| **Build output directory** | *(empty — delete `dist`)* |
| **Root directory** | `/` |

### Option B — Build + deploy (Workers Builds)

| Setting | Value |
|---------|--------|
| **Build command** | `npm run pages:build` |
| **Deploy command** | `npm run cf:deploy` |
| **Build output directory** | *(empty)* |

Then click **Retry deployment** on the latest build.

---

## Environment variables

**Settings** → **Variables and secrets** (runtime) and/or **Build variables**:

| Variable | Required |
|----------|----------|
| `RESEND_API_KEY` | Yes — contact form |
| `CONTACT_TO_EMAIL` | Optional |
| `CONTACT_FROM_EMAIL` | Optional |
| `NODE_VERSION` | `22` |

---

## Deploy from your computer

```bash
npm install
npx wrangler login
npm run deploy
```

After deploy, Cloudflare shows the live URL (often `https://mz5-digital-site.<your-subdomain>.workers.dev`).  
You can attach **Custom domains** or your `pages.dev` subdomain in the dashboard under **Domains**.

---

## Local preview (Workers runtime)

```bash
npm run preview
```

---

## Checklist if still 404

1. Latest deployment status is **Success** (not just “build finished”).
2. Build log includes `Worker deployed` / `Published`.
3. You open the URL shown in the deployment details (not an old preview URL).
4. `RESEND_API_KEY` is set for production if testing the contact form.
