"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getProblemOptions,
  isReportingServiceId,
  type ProblemType,
} from "@/lib/outageReports";

type ReportSummary = {
  count: number;
  windowMinutes: number;
  lastReportedAt: string | null;
  topProblem: { type: ProblemType; label: string; count: number } | null;
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

export default function OutageReportPanel({ serviceId }: { serviceId: string }) {
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
      setSummary((await response.json()) as ReportSummary);
    } catch {
      setMessage("利用者報告を読み込めませんでした。接続チェックと公式情報は引き続き利用できます。");
    } finally {
      setLoading(false);
    }
  }, [enabled, serviceId]);

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
      if (data.reports) setSummary(data.reports);
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
