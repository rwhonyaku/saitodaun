"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type HotService = {
  serviceId: string;
  label: string;
  level: "elevated" | "spike";
  reports: number;
  reporters: number;
  topProblem: { label: string; count: number } | null;
  lastReportedAt: string | null;
};

type HotSummary = {
  hot: HotService[];
  monitoredServices: number;
  allNormal: boolean;
  updatedAt: string;
};

function formatJstTime(value: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
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

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-4" aria-labelledby="hot-outages-title">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 id="hot-outages-title" className="text-base font-semibold text-slate-900">
              現在注目の障害
            </h2>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              日本の利用者報告が通常より増えているサービス
            </p>
          </div>
          <Link href="/status" className="text-xs font-semibold text-sky-700 underline">
            全サービスを見る →
          </Link>
        </div>

        {!summary && !unavailable ? (
          <p className="mt-4 text-sm text-slate-500" role="status">報告状況を確認しています...</p>
        ) : null}

        {unavailable && !summary ? (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-700">現在、利用者報告を取得できません。</p>
            <p className="mt-1 text-xs text-slate-500">個別サービスの接続チェックは引き続き利用できます。</p>
          </div>
        ) : null}

        {unavailable && summary ? (
          <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900" role="status">
            最新情報を更新できないため、最後に取得した状況を表示しています。
          </p>
        ) : null}

        {summary?.allNormal ? (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4" role="status">
            <p className="text-sm font-bold text-emerald-900">現在、報告が急増しているサービスはありません</p>
            <p className="mt-1 text-xs leading-5 text-emerald-800">
              {summary.monitoredServices}サービスの直近30分を確認しています。一部機能や個別環境の問題までは判定できません。
            </p>
          </div>
        ) : null}

        {summary && summary.hot.length > 0 ? (
          <>
            <div className="mt-4 grid gap-3">
              {summary.hot.slice(0, 6).map((service) => (
              <Link
                key={service.serviceId}
                href={`/status/sites/${service.serviceId}`}
                className={`rounded-xl border p-4 transition hover:-translate-y-0.5 hover:shadow-sm ${
                  service.level === "spike"
                    ? "border-rose-200 bg-rose-50"
                    : "border-amber-200 bg-amber-50"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-slate-950">{service.label}</p>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      service.level === "spike"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {service.level === "spike" ? "報告が急増" : "報告が増加"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-700">
                  直近30分：異なる報告者{service.reporters}人・{service.reports}件
                </p>
                {service.topProblem ? (
                  <p className="mt-1 text-xs text-slate-600">主な症状：{service.topProblem.label}</p>
                ) : null}
              </Link>
              ))}
            </div>
            {summary.hot.length > 6 ? (
              <p className="mt-3 text-xs font-medium text-slate-600">
                ほか{summary.hot.length - 6}サービスでも報告が増えています。{" "}
                <Link href="/status" className="text-sky-700 underline">
                  一覧で確認 →
                </Link>
              </p>
            ) : null}
          </>
        ) : null}

        {summary?.updatedAt ? (
          <p className="mt-3 text-[11px] text-slate-400">
            {summary.monitoredServices}サービスを監視・更新：{formatJstTime(summary.updatedAt)} JST
          </p>
        ) : null}
      </div>
    </section>
  );
}
