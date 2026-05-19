#!/usr/bin/env node
/**
 * Build + deploy for Cloudflare CI.
 * Maps common Cloudflare env vars to CLOUDFLARE_API_TOKEN for wrangler.
 */
import { spawnSync } from "node:child_process";

function resolveApiToken() {
  if (process.env.CLOUDFLARE_API_TOKEN) return process.env.CLOUDFLARE_API_TOKEN;
  if (process.env.CF_API_TOKEN) return process.env.CF_API_TOKEN;
  if (process.env.CLOUDFLARE_AUTH_TOKEN) return process.env.CLOUDFLARE_AUTH_TOKEN;
  return null;
}

const token = resolveApiToken();

if (!token) {
  console.error(`
ERROR: CLOUDFLARE_API_TOKEN is not set.

Cloudflare Pages does not inject this automatically when you run "npm run deploy"
inside the build step. Add it in the dashboard:

  Workers & Pages → mz5-digital-site → Settings → Environment variables

Create a token: https://dash.cloudflare.com/profile/api-tokens
  → Create Token → "Edit Cloudflare Workers" template

Add these variables (Production + Preview):
  CLOUDFLARE_API_TOKEN = <your token>
  CLOUDFLARE_ACCOUNT_ID = <your account id>

Account ID: Cloudflare dashboard → Workers & Pages → right sidebar.

Then set Build command to: npm run deploy
`);
  process.exit(1);
}

process.env.CLOUDFLARE_API_TOKEN = token;

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log("OpenNext — building...");
run("npx", ["opennextjs-cloudflare", "build"]);

console.log("OpenNext — deploying...");
run("npx", ["opennextjs-cloudflare", "deploy"]);

console.log("Deploy complete.");
