"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type SignalLevel = "normal" | "elevated" | "spike";

type ReportService = {
  serviceId: string;
  label: string;
  level: SignalLevel;
  reports: number;
  reporters: number;
  trend: number[];
  topProblem: { label: string; count: number } | null;
  lastReportedAt: string | null;
};

type HotSummary = {
  hot: ReportService[];
  services: ReportService[];
  monitoredServices: number;
  allNormal: boolean;
  updatedAt: string;
};

const FEATURED_SERVICE_IDS = [
  "twitter",
  "line",
  "youtube",
  "instagram",
  "openai",
  "steam",
  "yahoo-japan",
  "notion",
] as const;

const SERVICE_MARKS: Record<string, { mark: string; className: string }> = {
  twitter: { mark: "X", className: "bg-slate-950 text-white" },
  line: { mark: "L", className: "bg-emerald-500 text-white" },
  youtube: { mark: "▶", className: "bg-red-500 text-white" },
  instagram: { mark: "◎", className: "bg-gradient-to-br from-fuchsia-500 to-orange-400 text-white" },
  openai: { mark: "AI", className: "bg-teal-700 text-white" },
  steam: { mark: "S", className: "bg-sky-950 text-white" },
  "yahoo-japan": { mark: "Y!", className: "bg-red-600 text-white" },
  notion: { mark: "N", className: "border border-slate-300 bg-white text-slate-950" },
};

function formatJstTime(value: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function levelPresentation(level: SignalLevel) {
  if (level === "spike") {
    return { label: "報告が急増", dot: "bg-rose-500", text: "text-rose-700", line: "#f43f5e" };
  }
  if (level === "elevated") {
    return { label: "報告が増加", dot: "bg-amber-500", text: "text-amber-700", line: "#f59e0b" };
  }
  return { label: "通常範囲", dot: "bg-emerald-500", text: "text-emerald-700", line: "#0ea5e9" };
}

function Sparkline({ values, level }: { values: number[]; level: SignalLevel }) {
  const data = values.length > 1 ? values : [0, 0];
  const max = Math.max(1, ...data);
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 27 - (value / max) * 22;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-10 w-full" aria-hidden="true">
      <path d="M0 27 H100" stroke="#e2e8f0" strokeWidth="1" />
      <polyline
        points={points}
        fill="none"
        stroke={levelPresentation(level).line}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function HotOutages() {
  const [summary, setSummary] = useState<HotSummary | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/reports?view=hot", { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to load hot outages");
      setSummary((await response.json()) as HotSummary);
      setUnavailable(false);
    } catch {
      setUnavailable(true);
    }
  }, []);

  useEffect(() => {
    load();
    const timer = window.setInterval(load, 60_000);
    return () => window.clearInterval(timer);
  }, [load]);

  const featuredServices = FEATURED_SERVICE_IDS.map((serviceId) =>
    summary?.services.find((service) => service.serviceId === serviceId)
  ).filter((service): service is ReportService => Boolean(service));

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-4" aria-labelledby="hot-outages-title">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-sky-50/70 px-5 py-5 sm:px-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-50" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-500" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky-700">Live reports</span>
              </div>
              <h2 id="hot-outages-title" className="mt-2 text-xl font-bold tracking-tight text-slate-950">
                現在注目の障害
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                日本の利用者報告を直近の通常水準と比較しています
              </p>
            </div>
            <Link href="/status" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700">
              全サービスを見る →
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-3 divide-x divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="px-3 py-3 text-center sm:px-5">
              <p className="text-lg font-bold text-slate-950">{summary?.monitoredServices ?? "—"}</p>
              <p className="mt-0.5 text-[10px] leading-4 text-slate-500 sm:text-xs">報告対象サービス</p>
            </div>
            <div className="px-3 py-3 text-center sm:px-5">
              <p className={`text-lg font-bold ${summary?.hot.length ? "text-rose-600" : "text-emerald-600"}`}>
                {summary ? summary.hot.length : "—"}
              </p>
              <p className="mt-0.5 text-[10px] leading-4 text-slate-500 sm:text-xs">報告増加を検出</p>
            </div>
            <div className="px-3 py-3 text-center sm:px-5">
              <p className="text-sm font-bold text-slate-950 sm:text-lg">
                {summary?.updatedAt ? formatJstTime(summary.updatedAt) : "—"}
              </p>
              <p className="mt-0.5 text-[10px] leading-4 text-slate-500 sm:text-xs">最終更新（JST）</p>
            </div>
          </div>
        </div>

        <div className="px-5 py-5 sm:px-7">
          {!summary && !unavailable ? (
            <p className="text-sm text-slate-500" role="status">報告状況を確認しています...</p>
          ) : null}

          {unavailable && !summary ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">現在、利用者報告を取得できません。</p>
              <p className="mt-1 text-xs text-slate-500">URLの外部接続チェックは引き続き利用できます。</p>
            </div>
          ) : null}

          {unavailable && summary ? (
            <p className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900" role="status">
              最新情報を更新できないため、最後に取得した状況を表示しています。
            </p>
          ) : null}

          {summary?.allNormal ? (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4" role="status">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">✓</span>
              <div>
                <p className="text-sm font-bold text-emerald-950">現在、報告が急増しているサービスはありません</p>
                <p className="mt-1 text-xs leading-5 text-emerald-800">一部機能や個別環境の問題までは判定できません。</p>
              </div>
            </div>
          ) : null}

          {summary && summary.hot.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {summary.hot.slice(0, 6).map((service) => (
                <Link key={service.serviceId} href={`/status/sites/${service.serviceId}`} className={`rounded-xl border p-4 transition hover:-translate-y-0.5 hover:shadow-sm ${service.level === "spike" ? "border-rose-200 bg-rose-50" : "border-amber-200 bg-amber-50"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-bold text-slate-950">{service.label}</p>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${service.level === "spike" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-900"}`}>
                      {levelPresentation(service.level).label}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-700">直近30分：異なる報告者{service.reporters}人・{service.reports}件</p>
                  {service.topProblem ? <p className="mt-1 text-xs text-slate-600">主な症状：{service.topProblem.label}</p> : null}
                </Link>
              ))}
            </div>
          ) : null}

          <div className="mt-7 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-950">よく確認されるサービス</h3>
              <p className="mt-1 text-xs text-slate-500">過去12時間の利用者報告の推移</p>
            </div>
            <span className="text-[11px] text-slate-400">自動更新：60秒</span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((service) => {
              const presentation = levelPresentation(service.level);
              const mark = SERVICE_MARKS[service.serviceId] ?? { mark: service.label.slice(0, 1), className: "bg-slate-800 text-white" };

              return (
                <Link key={service.serviceId} href={`/status/sites/${service.serviceId}`} className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black shadow-sm ${mark.className}`} aria-hidden="true">{mark.mark}</span>
                    <span className={`flex items-center gap-1.5 text-[11px] font-bold ${presentation.text}`}>
                      <span className={`h-2 w-2 rounded-full ${presentation.dot}`} />
                      {presentation.label}
                    </span>
                  </div>
                  <p className="mt-3 truncate text-sm font-bold text-slate-900 group-hover:text-sky-800">{service.label}</p>
                  <div className="mt-3"><Sparkline values={service.trend} level={service.level} /></div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                    <span>12時間前</span>
                    <span>直近30分 {service.reports}件</span>
                  </div>
                </Link>
              );
            })}

            {!summary && !unavailable
              ? Array.from({ length: 8 }, (_, index) => (
                  <div key={index} className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
                ))
              : null}
          </div>

          {summary?.updatedAt ? (
            <p className="mt-5 text-[11px] text-slate-400">
              {summary.monitoredServices}サービスの報告動向を確認中・更新：{formatJstTime(summary.updatedAt)} JST
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
