"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getGuideHrefFromResult } from "@/lib/errorGuideMap";

type CheckResult = {
  online: boolean;
  probeBlocked?: boolean;
  status: number | null;
  responseTime: number | null;
  timestamp: string;
  error?: string;
  checkedUrl?: string;
};

export default function HomeClient() {
  const searchParams = useSearchParams();

  const [url, setUrl] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Allow error articles to deep-link back into the checker:
  // /?url=example.com (or full https://...)
  useEffect(() => {
    const qp = searchParams?.get("url")?.trim();
    if (!qp) return;

    // Don't clobber user typing or post-check normalized url
    setUrl((prev) => (prev.trim().length > 0 ? prev : qp));
  }, [searchParams]);

  const handleCheck = async () => {
    const raw = url.trim();
    if (!raw) {
      alert("チェックしたいサイトのURLを入力してください。");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: raw }),
      });

      const data: CheckResult = await res.json();
      setResult(data);

      if (data.checkedUrl) setUrl(data.checkedUrl);
    } catch {
      setResult({
        online: false,
        status: null,
        responseTime: null,
        timestamp: new Date().toLocaleString("ja-JP", {
          timeZone: "Asia/Tokyo",
        }),
        error:
          "チェック中にエラーが発生しました。時間をおいて再度お試しください。",
      });
    }

    setLoading(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCheck();
  };

  const resultUnconfirmed = Boolean(
    result && (result.probeBlocked || result.error || result.status == null)
  );

  const statusLabel = resultUnconfirmed
    ? "確認不可"
    : result?.probeBlocked
    ? "判定保留"
    : result?.online
    ? "オンライン"
    : "オフライン";

  const guideHref = result
    ? getGuideHrefFromResult({ status: result.status, error: result.error })
    : "/status-codes";

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-xl w-full px-4 pt-2 pb-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center tracking-tight">
          URLを入力して接続状況を確認
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 text-center">
          相手側の障害か、自分の回線・DNS・ブラウザ側の問題かを確認します。
        </p>

        <section aria-labelledby="site-check-section" className="mt-8">
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="例：google.com / https://example.com"
              className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-sky-500 transition-all"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button
              onClick={handleCheck}
              className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-60 shadow-md transition-all active:scale-95"
              disabled={loading}
            >
              {loading ? "確認中..." : "チェック"}
            </button>
          </div>

          <p className="mt-3 text-[11px] text-slate-400 text-center">
            入力例:{" "}
            <span className="font-medium text-slate-500">example.com</span> /{" "}
            <span className="font-medium text-slate-500">
              https://sub.example.com
            </span>
          </p>

          {/* Result Area */}
          <div className="mt-8 min-h-[140px]">
            {!result && !loading && (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center bg-white/50">
                <p className="text-sm text-slate-500">
                  URLを入力して「チェック」を押すと、
                  <br />
                  外部サーバーからの接続可否とHTTP応答を確認します。
                </p>
              </div>
            )}

            {loading && (
              <div className="rounded-xl border border-slate-200 p-8 text-center bg-white animate-pulse">
                <p className="text-sm text-slate-400 font-medium italic">
                  サーバーに接続して応答を確認しています...
                </p>
              </div>
            )}

            {result && (
              <div
                className={`rounded-xl border-2 p-5 transition-all shadow-sm ${
                  resultUnconfirmed
                    ? "border-amber-100 bg-amber-50/30"
                    : result.online
                    ? "border-green-100 bg-green-50/30"
                    : "border-red-100 bg-red-50/30"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="relative flex h-3 w-3">
                        {result.online && !result.probeBlocked && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        )}
                        <span
                          className={`relative inline-flex rounded-full h-3 w-3 ${
                            resultUnconfirmed
                              ? "bg-amber-500"
                              : result.online
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></span>
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">
                        判定：{statusLabel}
                      </h3>
                    </div>
                    {result.checkedUrl && (
                      <p className="text-xs text-slate-500 truncate max-w-[280px] sm:max-w-md font-mono">
                        {result.checkedUrl}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-white rounded-lg px-3 py-2 shadow-sm border border-slate-100 min-w-[96px] text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">
                        HTTP
                      </p>
                      <p
                        className={`text-sm font-mono font-bold ${
                          result.status === 200
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {result.status ?? "ERR"}
                      </p>

                      <Link
                        href={guideHref}
                        className="inline-block mt-1 text-[10px] font-bold text-sky-600 underline underline-offset-2 hover:text-sky-700"
                      >
                        解説 →
                      </Link>
                    </div>

                    <div className="bg-white rounded-lg px-3 py-2 shadow-sm border border-slate-100 min-w-[96px] text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">
                        応答速度
                      </p>
                      <p className="text-sm font-mono font-bold text-slate-700">
                        {result.responseTime ?? "―"}
                        <span className="text-[10px] ml-0.5 font-sans">ms</span>
                      </p>
                    </div>
                  </div>
                </div>

                {result.error && (
                  <div className="mt-4 p-3 bg-red-100/50 rounded-lg text-xs text-red-700 border border-red-200">
                    {result.error}
                  </div>
                )}

                {result.probeBlocked && !result.error && (
                  <div className="mt-4 p-3 bg-amber-100/50 rounded-lg text-xs text-amber-700 border border-amber-200">
                    このサイトは当サイトのチェック環境からの要求を拒否しました。HTTP応答は返っているため、サイト自体が落ちているとは限りません。
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-slate-200/60 flex justify-between items-center text-[10px] text-slate-400 font-medium">
                  <span>チェック時刻: {result.timestamp}</span>
                  {(resultUnconfirmed || !result.online) && (
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        resultUnconfirmed
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {resultUnconfirmed ? "現在の状況を確認できませんでした" : "接続に失敗しました"}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-12 text-sm text-slate-700 bg-slate-100/50 rounded-2xl p-6">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-slate-900 rounded-full"></span>
            このツールで分かること
          </h2>

          <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
            <p>
              サイトダウンは、主要サービスの障害状況とURLの接続チェックをまとめて確認する入口です。
              サービス側の広い障害か、自分の回線・DNS・ブラウザ側の問題かを確認する第一歩として活用してください。
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <li>
                <Link
                  href="/how-it-works"
                  className="block p-3 rounded-xl bg-white border border-slate-200 hover:border-sky-300 transition-all text-sky-600 font-medium"
                >
                  仕組み・見方
                </Link>
              </li>
              <li>
                <Link
                  href="/what-is-website-downtime"
                  className="block p-3 rounded-xl bg-white border border-slate-200 hover:border-sky-300 transition-all text-sky-600 font-medium"
                >
                  落ちるとは？
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="block p-3 rounded-xl bg-white border border-slate-200 hover:border-sky-300 transition-all text-sky-600 font-medium"
                >
                  よくある質問
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}
