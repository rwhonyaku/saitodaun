"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getProblemOptions,
  isReportingServiceId,
  type ProblemType,
} from "@/lib/outageReports";

export type ReportSummary = {
  count: number;
  windowMinutes: number;
  lastReportedAt: string | null;
  topProblem: { type: ProblemType; label: string; count: number } | null;
  signal: {
    level: "normal" | "elevated" | "spike";
    currentReporters: number;
    baselinePer30Minutes: number;
    elevatedThreshold: number;
    spikeThreshold: number;
  };
  timeline: Array<{
    startAt: string;
    endAt: string;
    reports: number;
    reporters: number;
    level: "normal" | "elevated" | "spike";
  }>;
  updatedAt: string;
};

const CLIENT_ID_KEY = "saitodaun_report_client_id";

function getClientId() {
  const existing = window.localStorage.getItem(CLIENT_ID_KEY);
  if (existing) return existing;
  const created = window.crypto.randomUUID();
  window.localStorage.setItem(CLIENT_ID_KEY, created);
  return created;
}

function formatJstTime(value: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function ReportTimeline({ summary }: { summary: ReportSummary }) {
  const maximum = Math.max(
    1,
    summary.signal.spikeThreshold,
    ...summary.timeline.map((bucket) => bucket.reporters)
  );
  const hasReports = summary.timeline.some((bucket) => bucket.reports > 0);
  const firstTime = summary.timeline[0]?.startAt;
  const middleTime = summary.timeline[Math.floor(summary.timeline.length / 2)]?.startAt;
  const lastTime = summary.timeline.at(-1)?.endAt;

  return (
    <div className="mt-5 border-t border-slate-200 pt-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-xs font-bold text-slate-900">過去24時間の報告推移</h3>
          <p className="mt-1 text-[11px] text-slate-500">30分ごとの異なる報告者数（日本）</p>
        </div>
        <div className="flex gap-3 text-[10px] text-slate-500" aria-hidden="true">
          <span><span className="mr-1 inline-block h-2 w-2 rounded-sm bg-sky-400" />通常</span>
          <span><span className="mr-1 inline-block h-2 w-2 rounded-sm bg-amber-400" />増加</span>
          <span><span className="mr-1 inline-block h-2 w-2 rounded-sm bg-rose-500" />急増</span>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto pb-1">
        <div className="relative h-36 min-w-[640px] rounded-lg border border-slate-200 bg-slate-50 px-3 pb-6 pt-3">
          {!hasReports ? (
            <p className="absolute inset-x-3 top-1/2 -translate-y-1/2 text-center text-xs text-slate-500">
              まだ報告履歴はありません。データを蓄積しています。
            </p>
          ) : null}
          <div className="flex h-full items-end gap-1" role="img" aria-label="過去24時間の利用者報告数の棒グラフ">
            {summary.timeline.map((bucket) => {
              const height = bucket.reporters === 0 ? 2 : Math.max(6, (bucket.reporters / maximum) * 100);
              const label = `${formatJstTime(bucket.startAt)}から${formatJstTime(bucket.endAt)}、異なる報告者${bucket.reporters}人、報告${bucket.reports}件`;
              return (
                <div
                  key={bucket.startAt}
                  className={`min-w-0 flex-1 rounded-t-sm ${
                    bucket.level === "spike"
                      ? "bg-rose-500"
                      : bucket.level === "elevated"
                        ? "bg-amber-400"
                        : "bg-sky-400"
                  } ${bucket.reporters === 0 ? "opacity-20" : ""}`}
                  style={{ height: `${height}%` }}
                  aria-label={label}
                  title={label}
                />
              );
            })}
          </div>
          <div className="absolute inset-x-3 bottom-1 flex justify-between text-[10px] text-slate-400">
            <span>{firstTime ? formatJstTime(firstTime) : ""}</span>
            <span>{middleTime ? formatJstTime(middleTime) : ""}</span>
            <span>{lastTime ? formatJstTime(lastTime) : ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OutageReportPanel({
  serviceId,
  onSummaryChange,
}: {
  serviceId: string;
  onSummaryChange?: (summary: ReportSummary) => void;
}) {
  const enabled = isReportingServiceId(serviceId);
  const options = useMemo(() => (enabled ? getProblemOptions(serviceId) : []), [enabled, serviceId]);
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(enabled);
  const [submitting, setSubmitting] = useState<ProblemType | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadSummary = useCallback(async () => {
    if (!enabled) return;
    try {
      const response = await fetch(`/api/reports?serviceId=${encodeURIComponent(serviceId)}`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Unable to load reports");
      const nextSummary = (await response.json()) as ReportSummary;
      setSummary(nextSummary);
      onSummaryChange?.(nextSummary);
    } catch {
      setMessage("利用者報告を読み込めませんでした。接続チェックと公式情報は引き続き利用できます。");
    } finally {
      setLoading(false);
    }
  }, [enabled, onSummaryChange, serviceId]);

  useEffect(() => {
    loadSummary();
    const timer = window.setInterval(loadSummary, 60_000);
    return () => window.clearInterval(timer);
  }, [loadSummary]);

  if (!enabled) return null;

  const submitReport = async (problemType: ProblemType) => {
    setSubmitting(problemType);
    setMessage(null);
    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId, problemType, clientId: getClientId() }),
      });
      const data = (await response.json()) as { error?: string; reports?: ReportSummary };
      if (!response.ok) throw new Error(data.error || "報告を送信できませんでした。");
      if (data.reports) {
        setSummary(data.reports);
        onSummaryChange?.(data.reports);
      }
      setShowOptions(false);
      setMessage("報告ありがとうございました。日本の利用者向け状況に反映しました。");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "報告を送信できませんでした。");
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <section className="mt-6 rounded-xl border border-sky-200 bg-white p-4 shadow-sm" aria-labelledby="community-reports-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="community-reports-title" className="text-sm font-semibold text-slate-900">
            日本の利用者からの障害報告
          </h2>
          {loading ? (
            <p className="mt-2 text-xs text-slate-500">直近30分の報告を確認しています...</p>
          ) : summary?.count ? (
            <>
              <p className="mt-2 text-lg font-bold text-slate-950">
                直近30分に{summary.count}件の報告があります
              </p>
              {summary.topProblem ? (
                <p className="mt-1 text-xs text-slate-600">
                  最も多い症状：{summary.topProblem.label}（{summary.topProblem.count}件）
                </p>
              ) : null}
            </>
          ) : (
            <p className="mt-2 text-sm font-medium text-slate-700">直近30分の報告はありません</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowOptions((value) => !value)}
          className="rounded-lg bg-sky-600 px-4 py-2 text-xs font-bold text-white hover:bg-sky-700"
        >
          問題が起きています
        </button>
      </div>

      {!loading && summary ? (
        <div
          className={`mt-4 rounded-lg border px-3 py-2 text-xs leading-relaxed ${
            summary.signal.level === "spike"
              ? "border-rose-300 bg-rose-50 text-rose-900"
              : summary.signal.level === "elevated"
                ? "border-amber-300 bg-amber-50 text-amber-900"
                : "border-emerald-200 bg-emerald-50 text-emerald-900"
          }`}
          role="status"
        >
          <p className="font-bold">
            {summary.signal.level === "spike"
              ? "障害報告が急増しています"
              : summary.signal.level === "elevated"
                ? "通常より報告が増えています"
                : "現在、報告の急増は検出されていません"}
          </p>
          {summary.signal.level !== "normal" ? (
            <p className="mt-1">
              直近30分の異なる報告者は{summary.signal.currentReporters}人です。接続チェックと公式情報もあわせて確認してください。
            </p>
          ) : null}
        </div>
      ) : null}

      {!loading && summary ? <ReportTimeline summary={summary} /> : null}

      {showOptions ? (
        <div className="mt-4 border-t border-slate-200 pt-4">
          <p className="text-xs font-semibold text-slate-900">当てはまる症状を1つ選んでください</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {options.map((option) => (
              <button
                key={option.type}
                type="button"
                disabled={submitting !== null}
                onClick={() => submitReport(option.type)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-medium text-slate-700 hover:border-sky-300 hover:bg-sky-50 disabled:opacity-60"
              >
                {submitting === option.type ? "送信中..." : option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {message ? <p className="mt-3 text-xs leading-relaxed text-slate-600" role="status">{message}</p> : null}

      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
        <span>利用者報告はHTTP接続チェックや公式発表とは別の参考情報です。</span>
        {summary?.updatedAt ? <span>更新：{formatJstTime(summary.updatedAt)} JST</span> : null}
      </div>
    </section>
  );
}
