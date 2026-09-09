import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATE_FILE = resolve(__dirname, "..", "state.json");

const BASE = process.env.API_BASE || "http://localhost:5000/api/v1";
const tokens = new Map();

function load() {
  if (existsSync(STATE_FILE)) {
    try {
      const obj = JSON.parse(readFileSync(STATE_FILE, "utf8"));
      Object.entries(obj).forEach(([k, v]) => tokens.set(k, v));
    } catch (e) {
      /* ignore */
    }
  }
}
load();

function persist() {
  writeFileSync(STATE_FILE, JSON.stringify(Object.fromEntries(tokens), null, 2));
}

export function setToken(label, token) {
  tokens.set(label, token);
  persist();
}

export function getToken(label) {
  return tokens.get(label);
}

export function resetTokens() {
  tokens.clear();
  writeFileSync(STATE_FILE, "{}");
}

export async function api(method, path, { body, token, label, raw } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const t = token !== undefined ? token : tokens.get(label);
  if (t) headers["Authorization"] = `Bearer ${t}`;

  // Hard timeout so a stalled (e.g. DNS/Atlas outage) request can never hang the runner.
  const timeoutMs = Number(process.env.REQ_TIMEOUT || 15000);
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(timeoutMs),
  });

  let data = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    data = { __raw: text };
  }

  if (raw) return { status: res.status, data };
  return data;
}

export { BASE };
