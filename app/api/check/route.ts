import { NextResponse } from "next/server";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { classifyHttpResponse, classifyProbeError, errorMessage } from "@/lib/checkOutcome.mjs";
import type { CheckErrorType, CheckOutcome, CheckResult } from "@/lib/checkTypes";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 2_048;
const MAX_URL_LENGTH = 2_048;
const MAX_REDIRECTS = 3;
const PROBE_TIMEOUT_MS = 8_000;
const CACHE_TTL_MS = 30_000;
const CACHE_MAX_ENTRIES = 200;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 30;

type CachedProbe = { expiresAt: number; result: CheckResult };
const probeCache = new Map<string, CachedProbe>();
const inFlight = new Map<string, Promise<CheckResult>>();
const requestWindows = new Map<string, { startedAt: number; count: number }>();

const PROBE_URL_OVERRIDES: Record<string, string> = {
  "canva.com": "https://www.canva.com/robots.txt",
  "www.canva.com": "https://www.canva.com/robots.txt",
  "chatwork.com": "https://go.chatwork.com/ja/",
  "www.chatwork.com": "https://go.chatwork.com/ja/",
  "myna.go.jp": "https://myna.go.jp/help",
  "service.smt.docomo.ne.jp": "https://service.smt.docomo.ne.jp/keitai_payment/robots.txt",
};

function timestamp() {
  return new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
}

function normalizeInput(input: string) {
  const trimmed = input.trim();
  if (trimmed.length > MAX_URL_LENGTH) throw new Error("URL too long");
  const inferredScheme = !/^https?:\/\//i.test(trimmed);
  const parsed = new URL(inferredScheme ? `https://${trimmed}` : trimmed);
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new Error("Unsupported protocol");
  const requestedUrl = parsed.toString();
  const override = PROBE_URL_OVERRIDES[parsed.hostname.toLowerCase()];
  const checkedUrl = override && (parsed.pathname === "/" || parsed.pathname === "") ? override : requestedUrl;
  return { requestedUrl, checkedUrl, inferredScheme, overridden: checkedUrl !== requestedUrl };
}

function isPrivateAddress(address: string) {
  if (isIP(address) === 4) {
    const [a, b] = address.split(".").map(Number);
    return a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || a >= 224;
  }
  const normalized = address.toLowerCase();
  if (normalized.startsWith("::ffff:")) return isPrivateAddress(normalized.slice(7));
  return normalized === "::" || normalized === "::1" || normalized.startsWith("fc") || normalized.startsWith("fd") || /^fe[89ab]/.test(normalized);
}

async function assertPublicDestination(url: URL) {
  const hostname = url.hostname.toLowerCase();
  if (hostname === "localhost" || hostname.endsWith(".localhost")) throw new Error("Private destination");
  const addresses = isIP(hostname) ? [{ address: hostname }] : await lookup(hostname, { all: true, verbatim: true });
  if (addresses.length === 0 || addresses.some(({ address }) => isPrivateAddress(address))) throw new Error("Private destination");
}

async function probeUrl(initialUrl: string) {
  let currentUrl = new URL(initialUrl);
  const signal = AbortSignal.timeout(PROBE_TIMEOUT_MS);
  for (let redirects = 0; redirects <= MAX_REDIRECTS; redirects += 1) {
    await assertPublicDestination(currentUrl);
    const response = await fetch(currentUrl, { method: "GET", redirect: "manual", signal, headers: { "User-Agent": "Saitodaun-Availability-Check/1.0" } });
    if (response.status < 300 || response.status >= 400) return { response, finalUrl: currentUrl.toString() };
    const location = response.headers.get("location");
    await response.body?.cancel();
    if (!location || redirects === MAX_REDIRECTS) throw new Error("Too many redirects");
    currentUrl = new URL(location, currentUrl);
  }
  throw new Error("Too many redirects");
}

function shouldTryHttpFallback(errorType: CheckErrorType) {
  return errorType === "connection_refused" || errorType === "connection_reset" || errorType === "timeout";
}

async function runProbe(input: ReturnType<typeof normalizeInput>): Promise<CheckResult> {
  const start = Date.now();
  let checkedUrl = input.checkedUrl;
  try {
    let probe;
    try {
      probe = await probeUrl(checkedUrl);
    } catch (error) {
      const errorType = classifyProbeError(error) as CheckErrorType;
      if (!input.inferredScheme || input.overridden || !shouldTryHttpFallback(errorType)) throw error;
      const fallback = new URL(input.requestedUrl);
      fallback.protocol = "http:";
      checkedUrl = fallback.toString();
      probe = await probeUrl(checkedUrl);
    }
    const classification = classifyHttpResponse(probe.response.status) as { outcome: CheckOutcome; reachable: boolean; online: boolean; probeBlocked: boolean };
    await probe.response.body?.cancel();
    return { ...classification, status: probe.response.status, responseTime: Date.now() - start, timestamp: timestamp(), requestedUrl: input.requestedUrl, checkedUrl: probe.finalUrl };
  } catch (error) {
    const errorType = classifyProbeError(error) as CheckErrorType;
    return {
      online: false,
      reachable: false,
      outcome: errorType === "blocked_destination" || errorType === "invalid_url" ? "inconclusive" : "connection_error",
      errorType,
      probeBlocked: false,
      status: null,
      responseTime: Date.now() - start,
      timestamp: timestamp(),
      error: errorMessage(errorType),
      requestedUrl: input.requestedUrl,
      checkedUrl,
    };
  }
}

function clientKey(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function rateLimited(req: Request) {
  const now = Date.now();
  if (requestWindows.size > 2_000) {
    for (const [storedKey, window] of requestWindows) {
      if (now - window.startedAt >= RATE_WINDOW_MS) requestWindows.delete(storedKey);
    }
  }
  const key = clientKey(req);
  const current = requestWindows.get(key);
  if (!current || now - current.startedAt >= RATE_WINDOW_MS) {
    requestWindows.set(key, { startedAt: now, count: 1 });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT;
}

function errorResult(errorType: CheckErrorType): CheckResult {
  return { online: false, reachable: false, outcome: "inconclusive", errorType, probeBlocked: false, status: null, responseTime: null, timestamp: timestamp(), error: errorMessage(errorType) };
}

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) return NextResponse.json(errorResult("invalid_url"), { status: 413 });
  if (rateLimited(req)) return NextResponse.json(errorResult("rate_limited"), { status: 429, headers: { "Retry-After": "60" } });
  try {
    const { url } = (await req.json()) as { url?: string };
    if (!url) return NextResponse.json(errorResult("invalid_url"), { status: 400 });
    const input = normalizeInput(url);
    const cached = probeCache.get(input.requestedUrl);
    if (cached && cached.expiresAt > Date.now()) return NextResponse.json(cached.result);
    if (cached) probeCache.delete(input.requestedUrl);
    let pending = inFlight.get(input.requestedUrl);
    if (!pending) {
      pending = runProbe(input);
      inFlight.set(input.requestedUrl, pending);
    }
    const result = await pending;
    inFlight.delete(input.requestedUrl);
    probeCache.set(input.requestedUrl, { expiresAt: Date.now() + CACHE_TTL_MS, result });
    while (probeCache.size > CACHE_MAX_ENTRIES) probeCache.delete(probeCache.keys().next().value!);
    return NextResponse.json(result);
  } catch (error) {
    const errorType = classifyProbeError(error) as CheckErrorType;
    return NextResponse.json(errorResult(errorType), { status: errorType === "invalid_url" ? 400 : 200 });
  }
}
