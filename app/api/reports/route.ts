import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import {
  getProblemLabel,
  isProblemType,
  isReportingServiceId,
  type ProblemType,
  type ReportingServiceId,
} from "@/lib/outageReports";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REPORT_WINDOW_MS = 30 * 60 * 1000;
const BASELINE_WINDOW_MS = 24 * 60 * 60 * 1000;
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY_BYTES = 2_048;

type ReportRow = {
  problem_type: ProblemType;
  created_at: string;
  client_hash: string;
};

type SignalLevel = "normal" | "elevated" | "spike";

function getConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  const hashSecret = process.env.REPORT_HASH_SECRET;

  if (!url || !secretKey || !hashSecret) {
    throw new Error("Reporting configuration is incomplete");
  }

  return { url, secretKey, hashSecret };
}

function databaseHeaders(secretKey: string, prefer?: string) {
  return {
    apikey: secretKey,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function makeClientHash(request: Request, clientId: string, secret: string) {
  const fingerprint = [
    getClientIp(request),
    request.headers.get("user-agent") || "unknown",
    clientId,
  ].join("|");

  return createHmac("sha256", secret).update(fingerprint).digest("hex");
}

function isValidClientId(value: unknown): value is string {
  return typeof value === "string" && /^[a-zA-Z0-9-]{16,80}$/.test(value);
}

function getJapanCountry(request: Request) {
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  return !country || country === "JP";
}

async function getRecentReports(serviceId: ReportingServiceId) {
  const { url, secretKey } = getConfig();
  const now = Date.now();
  const currentWindowStart = now - REPORT_WINDOW_MS;
  const since = new Date(currentWindowStart - BASELINE_WINDOW_MS).toISOString();
  const query = new URLSearchParams({
    select: "problem_type,created_at,client_hash",
    service_id: `eq.${serviceId}`,
    country_code: "eq.JP",
    moderation_status: "eq.visible",
    created_at: `gte.${since}`,
    order: "created_at.desc",
  });

  const response = await fetch(`${url}/rest/v1/outage_reports?${query}`, {
    headers: databaseHeaders(secretKey, "count=exact"),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Report query failed: ${response.status}`);

  const allRows = (await response.json()) as ReportRow[];
  const rows = allRows.filter((row) => Date.parse(row.created_at) >= currentWindowStart);
  const contentRange = response.headers.get("content-range");
  const queriedCount = contentRange ? Number(contentRange.split("/")[1]) : allRows.length;
  const count = rows.length;

  const breakdown = rows.reduce<Partial<Record<ProblemType, number>>>((totals, row) => {
    totals[row.problem_type] = (totals[row.problem_type] ?? 0) + 1;
    return totals;
  }, {});

  const topType = Object.entries(breakdown).sort((a, b) => b[1] - a[1])[0]?.[0] as
    | ProblemType
    | undefined;

  const currentReporters = new Set(rows.map((row) => row.client_hash)).size;
  const baselineRows = allRows.filter((row) => Date.parse(row.created_at) < currentWindowStart);
  const baselineBucketCount = BASELINE_WINDOW_MS / REPORT_WINDOW_MS;
  const baselineBuckets = Array.from({ length: baselineBucketCount }, () => new Set<string>());

  for (const row of baselineRows) {
    const ageFromCurrentWindow = currentWindowStart - Date.parse(row.created_at);
    const bucketIndex = Math.floor(ageFromCurrentWindow / REPORT_WINDOW_MS);
    if (bucketIndex >= 0 && bucketIndex < baselineBuckets.length) {
      baselineBuckets[bucketIndex].add(row.client_hash);
    }
  }

  const bucketCounts = baselineBuckets.map((bucket) => bucket.size);
  const baselineAverage = bucketCounts.reduce((sum, value) => sum + value, 0) / baselineBucketCount;
  const variance = bucketCounts.reduce(
    (sum, value) => sum + Math.pow(value - baselineAverage, 2),
    0
  ) / baselineBucketCount;
  const standardDeviation = Math.sqrt(variance);
  const elevatedThreshold = Math.max(3, Math.ceil(baselineAverage * 2), Math.ceil(baselineAverage + 2));
  const spikeThreshold = Math.max(
    6,
    Math.ceil(baselineAverage * 3),
    Math.ceil(baselineAverage + standardDeviation * 3)
  );
  const level: SignalLevel =
    currentReporters >= spikeThreshold
      ? "spike"
      : currentReporters >= elevatedThreshold
        ? "elevated"
        : "normal";

  return {
    count,
    windowMinutes: 30,
    lastReportedAt: rows[0]?.created_at ?? null,
    topProblem: topType
      ? { type: topType, label: getProblemLabel(serviceId, topType), count: breakdown[topType] ?? 0 }
      : null,
    breakdown,
    signal: {
      level,
      currentReporters,
      baselinePer30Minutes: Number(baselineAverage.toFixed(2)),
      elevatedThreshold,
      spikeThreshold,
    },
    updatedAt: new Date().toISOString(),
    ...(Number.isFinite(queriedCount) && queriedCount > allRows.length
      ? { historyTruncated: true }
      : {}),
  };
}

export async function GET(request: Request) {
  const serviceId = new URL(request.url).searchParams.get("serviceId") ?? "";
  if (!isReportingServiceId(serviceId)) {
    return NextResponse.json({ error: "対象サービスが正しくありません。" }, { status: 400 });
  }

  try {
    return NextResponse.json(await getRecentReports(serviceId), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "利用者報告を取得できませんでした。" },
      { status: 503 }
    );
  }
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "リクエストが大きすぎます。" }, { status: 413 });
  }

  if (!getJapanCountry(request)) {
    return NextResponse.json(
      { error: "現在、利用者報告は日本からのアクセスを対象にしています。" },
      { status: 403 }
    );
  }

  try {
    const body = (await request.json()) as {
      serviceId?: unknown;
      problemType?: unknown;
      clientId?: unknown;
    };
    const serviceId = typeof body.serviceId === "string" ? body.serviceId : "";
    const problemType = typeof body.problemType === "string" ? body.problemType : "";

    if (
      !isReportingServiceId(serviceId) ||
      !isProblemType(problemType) ||
      !isValidClientId(body.clientId)
    ) {
      return NextResponse.json({ error: "報告内容が正しくありません。" }, { status: 400 });
    }

    const { url, secretKey, hashSecret } = getConfig();
    const clientHash = makeClientHash(request, body.clientId, hashSecret);
    const duplicateSince = new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString();
    const duplicateQuery = new URLSearchParams({
      select: "id",
      service_id: `eq.${serviceId}`,
      client_hash: `eq.${clientHash}`,
      created_at: `gte.${duplicateSince}`,
      limit: "1",
    });

    const duplicateResponse = await fetch(`${url}/rest/v1/outage_reports?${duplicateQuery}`, {
      headers: databaseHeaders(secretKey),
      cache: "no-store",
    });
    if (!duplicateResponse.ok) throw new Error("Duplicate query failed");

    const duplicateRows = (await duplicateResponse.json()) as Array<{ id: string }>;
    if (duplicateRows.length > 0) {
      return NextResponse.json(
        { error: "このサービスにはすでに報告済みです。しばらくしてから再度お試しください。" },
        { status: 429 }
      );
    }

    const insertResponse = await fetch(`${url}/rest/v1/outage_reports`, {
      method: "POST",
      headers: databaseHeaders(secretKey, "return=minimal"),
      body: JSON.stringify({
        service_id: serviceId,
        problem_type: problemType,
        client_hash: clientHash,
        country_code: "JP",
      }),
    });
    if (!insertResponse.ok) throw new Error("Report insert failed");

    return NextResponse.json({ ok: true, reports: await getRecentReports(serviceId) });
  } catch {
    return NextResponse.json(
      { error: "報告を送信できませんでした。時間をおいて再度お試しください。" },
      { status: 503 }
    );
  }
}
