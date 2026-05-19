#!/usr/bin/env node
/**
 * Build + deploy for Cloudflare CI.
 * Maps common Cloudflare env vars to CLOUDFLARE_API_TOKEN for wrangler.
 */
import { spawnSync } from "node:child_process";

const MIN_NODE = 22;
const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);

if (nodeMajor < MIN_NODE) {
  console.error(`
ERROR: Node.js ${process.version} is too old (need ${MIN_NODE}+).

Cloudflare is running Node 18 because either:
  1. Framework preset is still "Next.js" — change it to "None"
  2. NODE_VERSION is not set — add environment variable NODE_VERSION = 22

Fix in dashboard → Settings → Build:
  Framework preset:  None
  Build command:     npm run deploy
  Output directory:  (empty — delete "/")

Fix in dashboard → Settings → Variables:
  NODE_VERSION = 22

Then Retry deployment.
`);
  process.exit(1);
}

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

Add in dashboard → Settings → Variables and secrets (Production + Preview):
  CLOUDFLARE_API_TOKEN = <API token from dash.cloudflare.com/profile/api-tokens>
  CLOUDFLARE_ACCOUNT_ID = <account id>
  NODE_VERSION = 22
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

console.log(`OpenNext — building (Node ${process.version})...`);
run("npx", ["opennextjs-cloudflare", "build"]);

console.log("OpenNext — deploying...");
run("npx", ["opennextjs-cloudflare", "deploy"]);

console.log("Deploy complete.");
