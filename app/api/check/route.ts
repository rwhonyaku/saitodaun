import { NextResponse } from "next/server";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 2_048;
const MAX_URL_LENGTH = 2_048;
const MAX_REDIRECTS = 3;
const PROBE_TIMEOUT_MS = 8_000;

function isBlockedProbeStatus(status: number) {
  return status === 401 || status === 403 || status === 405 || status === 429;
}

const PROBE_URL_OVERRIDES: Record<string, string> = {
  "canva.com": "https://www.canva.com/robots.txt",
  "www.canva.com": "https://www.canva.com/robots.txt",
  "chatwork.com": "https://go.chatwork.com/ja/",
  "www.chatwork.com": "https://go.chatwork.com/ja/",
  "myna.go.jp": "https://myna.go.jp/help",
  "service.smt.docomo.ne.jp":
    "https://service.smt.docomo.ne.jp/keitai_payment/robots.txt",
};

function normalizeInputUrl(input: string) {
  const trimmed = input.trim();
  if (trimmed.length > MAX_URL_LENGTH) throw new Error("URL too long");
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(withProtocol);

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Unsupported protocol");
  }

  const overrideUrl = PROBE_URL_OVERRIDES[parsed.hostname.toLowerCase()];
  if (overrideUrl && (parsed.pathname === "/" || parsed.pathname === "")) {
    return overrideUrl;
  }

  return parsed.toString();
}

function isPrivateAddress(address: string) {
  if (isIP(address) === 4) {
    const [a, b] = address.split(".").map(Number);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a >= 224
    );
  }

  const normalized = address.toLowerCase();
  if (normalized.startsWith("::ffff:")) {
    return isPrivateAddress(normalized.slice(7));
  }
  return (
    normalized === "::" ||
    normalized === "::1" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    /^fe[89ab]/.test(normalized)
  );
}

async function assertPublicDestination(url: URL) {
  const hostname = url.hostname.toLowerCase();
  if (hostname === "localhost" || hostname.endsWith(".localhost")) {
    throw new Error("Private destination");
  }

  const addresses = isIP(hostname)
    ? [{ address: hostname }]
    : await lookup(hostname, { all: true, verbatim: true });

  if (addresses.length === 0 || addresses.some(({ address }) => isPrivateAddress(address))) {
    throw new Error("Private destination");
  }
}

async function probeUrl(initialUrl: string) {
  let currentUrl = new URL(initialUrl);
  const signal = AbortSignal.timeout(PROBE_TIMEOUT_MS);

  for (let redirects = 0; redirects <= MAX_REDIRECTS; redirects += 1) {
    await assertPublicDestination(currentUrl);
    const response = await fetch(currentUrl, {
      method: "GET",
      redirect: "manual",
      signal,
      headers: { "User-Agent": "Saitodaun-Availability-Check/1.0" },
    });

    if (response.status < 300 || response.status >= 400) return response;

    const location = response.headers.get("location");
    await response.body?.cancel();
    if (!location || redirects === MAX_REDIRECTS) {
      throw new Error("Too many redirects");
    }
    currentUrl = new URL(location, currentUrl);
  }

  throw new Error("Too many redirects");
}

export async function POST(req: Request) {
  try {
    const contentLength = Number(req.headers.get("content-length") ?? "0");
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "リクエストが大きすぎます。" }, { status: 413 });
    }

    const { url } = (await req.json()) as { url?: string };
    if (!url) {
      return NextResponse.json(
        {
          online: false,
          probeBlocked: false,
          status: null,
          responseTime: null,
          timestamp: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
          error: "URLが指定されていません。",
        },
        { status: 400 }
      );
    }

    const normalizedUrl = normalizeInputUrl(url);
    const start = Date.now();
    const res = await probeUrl(normalizedUrl);
    const ms = Date.now() - start;
    const probeBlocked = isBlockedProbeStatus(res.status);

    await res.body?.cancel();

    return NextResponse.json({
      online: res.ok,
      probeBlocked,
      status: res.status,
      responseTime: ms,
      timestamp: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
      checkedUrl: normalizedUrl,
    });
  } catch (e) {
    return NextResponse.json(
      {
        online: false,
        probeBlocked: false,
        status: null,
        responseTime: null,
        timestamp: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
        error: "チェック中にエラーが発生しました。",
      },
      { status: 200 }
    );
  }
}
