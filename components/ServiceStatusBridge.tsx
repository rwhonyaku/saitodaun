"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { ReportSummary } from "@/components/OutageReportPanel";
import { getStatusVerdict, type VerdictCheck } from "@/lib/statusVerdict";

type StatusAdvice = {
  likely: string;
  partial: string;
  normal: string;
  unknown: string;
};

type OfficialLink = {
  href: string;
  label: string;
};

function formatJstDateTime(value: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function ServiceStatusBridge({
  serviceId,
  serviceName,
  serviceUrl,
  statusHref,
  advice,
  officialLinks,
  featureLimitNote,
}: {
  serviceId: string;
  serviceName: string;
  serviceUrl: string;
  statusHref: string;
  advice: StatusAdvice;
  officialLinks: OfficialLink[];
  featureLimitNote: string;
}) {
  const [check, setCheck] = useState<VerdictCheck | null>(null);
  const [reports, setReports] = useState<ReportSummary | null>(null);
  const [checkLoading, setCheckLoading] = useState(true);
  const [reportsLoading, setReportsLoading] = useState(true);

  const loadCheck = useCallback(async () => {
    setCheckLoading(true);
    try {
      const response = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: serviceUrl }),
      });
      if (!response.ok) throw new Error("check failed");
      setCheck((await response.json()) as VerdictCheck);
    } catch {
      setCheck({
        online: false,
        probeBlocked: true,
        status: null,
        error: "接続チェックを取得できませんでした。",
      });
    } finally {
      setCheckLoading(false);
    }
  }, [serviceUrl]);

  const loadReports = useCallback(async () => {
    try {
      const response = await fetch(`/api/reports?serviceId=${encodeURIComponent(serviceId)}`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("reports failed");
      setReports((await response.json()) as ReportSummary);
    } catch {
      setReports(null);
    } finally {
      setReportsLoading(false);
    }
  }, [serviceId]);

  useEffect(() => {
    loadCheck();
    loadReports();
    const reportTimer = window.setInterval(loadReports, 60_000);
    return () => window.clearInterval(reportTimer);
  }, [loadCheck, loadReports]);

  const verdict = getStatusVerdict(check, checkLoading, reports);
  const adviceText =
    verdict.level === "likely"
      ? advice.likely
      : verdict.level === "partial"
        ? advice.partial
        : verdict.level === "normal"
          ? advice.normal
          : advice.unknown;
  const updatedAt = reports?.updatedAt ? formatJstDateTime(reports.updatedAt) : null;
  const reportLabel = reportsLoading
    ? "利用者報告を取得中"
    : !reports
      ? "利用者報告を取得できませんでした"
      : reports.signal.level === "spike"
        ? `急増：直近30分に${reports.signal.currentReporters}人から${reports.count}件`
        : reports.signal.level === "elevated"
          ? `増加：直近30分に${reports.signal.currentReporters}人から${reports.count}件`
          : reports.count > 0
            ? `通常範囲・直近30分に${reports.count}件`
            : "通常範囲・直近30分は0件";

  return (
    <section
      className={`rounded-2xl border p-4 shadow-sm sm:p-5 ${verdict.cardClassName}`}
      aria-labelledby={`${serviceId}-live-diagnostic-title`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${verdict.iconClassName}`}
          aria-hidden="true"
        >
          {verdict.icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 id={`${serviceId}-live-diagnostic-title`} className="text-base font-bold text-slate-950">
              {serviceName}の現在状況
            </h2>
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${verdict.badgeClassName}`}>
              {verdict.badge}
            </span>
          </div>
          <p className="mt-2 text-sm font-semibold text-slate-900" role="status" aria-live="polite">
            {verdict.main}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-700">{verdict.detail}</p>
        </div>
      </div>

      <dl className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
        <div className="rounded-lg border border-black/5 bg-white/70 px-3 py-2">
          <dt className="text-slate-500">日本の利用者報告</dt>
          <dd className="mt-1 font-semibold text-slate-900">{reportLabel}</dd>
        </div>
        <div className="rounded-lg border border-black/5 bg-white/70 px-3 py-2">
          <dt className="text-slate-500">多い症状</dt>
          <dd className="mt-1 font-semibold text-slate-900">
            {reportsLoading ? "確認中" : reports?.topProblem?.label ?? "特定の症状への集中なし"}
          </dd>
        </div>
      </dl>

      <div className="mt-4 rounded-lg border border-black/5 bg-white/70 px-3 py-3">
        <p className="text-xs font-bold text-slate-900">次に確認すること</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-700">{adviceText}</p>
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-slate-600">{featureLimitNote}</p>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs">
        <Link className="font-semibold text-sky-700 underline underline-offset-2" href={statusHref}>
          詳しい状況・過去24時間の報告推移を見る →
        </Link>
        {officialLinks.map((link) => (
          <a
            key={link.href}
            className="font-semibold text-sky-700 underline underline-offset-2"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label} ↗
          </a>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-slate-500">
        {updatedAt
          ? `利用者報告の更新：${updatedAt} JST`
          : reportsLoading
            ? "利用者報告を取得中です。"
            : "利用者報告は取得できませんでした。自動的に再試行します。"}
      </p>
    </section>
  );
}
