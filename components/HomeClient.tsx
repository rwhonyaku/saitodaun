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

function getUrlInputError(raw: string) {
  if (!raw) return "チェックしたいサイトのURLを入力してください。";

  try {
    const explicitScheme = raw.match(/^([a-z][a-z\d+.-]*):\/\//i)?.[1];
    if (explicitScheme && !/^https?$/i.test(explicitScheme)) {
      throw new Error("unsupported protocol");
    }

    const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const parsed = new URL(candidate);

    if (
      !parsed.hostname ||
      /\s/.test(raw) ||
      (!parsed.hostname.includes(".") && !parsed.hostname.includes(":"))
    ) {
      throw new Error("invalid URL");
    }
  } catch {
    return "有効なURLまたはドメインを入力してください。例：example.com";
  }

  return null;
}

export default function HomeClient() {
  const searchParams = useSearchParams();

  const [url, setUrl] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);

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
    const validationError = getUrlInputError(raw);
    if (validationError) {
      setInputError(validationError);
      setResult(null);
      return;
    }

    setInputError(null);
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
    <section className="bg-slate-50 px-4 pt-8 pb-4">
      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 px-5 py-8 shadow-xl shadow-slate-900/10 sm:px-10 sm:py-12">
        <div aria-hidden="true" className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.28),transparent_32%),radial-gradient(circle_at_12%_90%,rgba(37,99,235,0.18),transparent_30%)]" />
        <svg aria-hidden="true" viewBox="0 0 1000 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full opacity-25">
          <path d="M0 94 L85 83 L145 90 L230 55 L300 72 L390 43 L480 74 L565 63 L650 86 L735 50 L815 59 L890 31 L1000 43" fill="none" stroke="#38bdf8" strokeWidth="3" />
        </svg>

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
            </span>
            日本向け障害・接続確認
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            サイトやサービスの障害を確認
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            利用者報告と外部サーバーからの接続確認を組み合わせ、広い障害か自分の回線・DNS・ブラウザ側の問題かを切り分けます。
          </p>
        </div>

        <section aria-labelledby="site-check-section" className="relative mx-auto mt-8 max-w-3xl">
          <h2 id="site-check-section" className="sr-only">URLを入力して接続状況を確認</h2>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              aria-label="接続状況を確認するURL"
              aria-invalid={Boolean(inputError)}
              aria-describedby={inputError ? "site-check-input-error" : undefined}
              placeholder="例：google.com"
              className={`min-w-0 flex-1 rounded-xl border bg-white px-4 py-3.5 text-sm text-slate-900 shadow-lg outline-none transition-all focus:ring-2 ${
                inputError
                  ? "border-red-400 focus:ring-red-300"
                  : "border-white/20 focus:ring-sky-400"
              }`}
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (inputError) setInputError(null);
              }}
              onKeyDown={onKeyDown}
            />
            <button
              onClick={handleCheck}
              className="rounded-xl bg-sky-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-sky-400 disabled:opacity-60 active:scale-95 sm:px-7"
              disabled={loading}
            >
              {loading ? "確認中..." : "チェック"}
            </button>
          </div>

          {inputError && (
            <p
              id="site-check-input-error"
              role="alert"
              className="mt-2 text-sm font-medium text-red-200"
            >
              {inputError}
            </p>
          )}

          <p className="mt-3 text-center text-[11px] text-slate-400">
            入力例:{" "}
            <span className="font-medium text-slate-300">example.com</span> /{" "}
            <span className="font-medium text-slate-300">
              https://sub.example.com
            </span>
          </p>

          {/* Result Area */}
          <div className="mt-6 min-h-[116px]">
            {!result && !loading && (
              <div className="grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-4 text-center backdrop-blur-sm">
                <div><p className="text-xs font-semibold text-white">外部接続</p><p className="mt-1 text-[10px] text-slate-400">サーバーから確認</p></div>
                <div><p className="text-xs font-semibold text-white">HTTP応答</p><p className="mt-1 text-[10px] text-slate-400">状態コードを確認</p></div>
                <div><p className="text-xs font-semibold text-white">応答速度</p><p className="mt-1 text-[10px] text-slate-400">接続時間を計測</p></div>
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
                      <p className="max-w-[280px] text-xs text-slate-500 [overflow-wrap:anywhere] sm:max-w-md font-mono">
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

        <section className="relative mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-sm text-slate-200 backdrop-blur-sm">
          <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-white">
            <span className="h-6 w-1.5 rounded-full bg-sky-400"></span>
            このツールで分かること
          </h2>

          <div className="space-y-4 text-xs leading-relaxed sm:text-sm">
            <p>
              サイトダウンは、主要サービスの障害状況とURLの接続チェックをまとめて確認する入口です。
              サービス側の広い障害か、自分の回線・DNS・ブラウザ側の問題かを確認する第一歩として活用してください。
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <li>
                <Link
                  href="/how-it-works"
                  className="block rounded-xl border border-white/10 bg-white/[0.06] p-3 font-medium text-sky-200 transition-all hover:border-sky-300/50 hover:bg-white/10"
                >
                  仕組み・見方
                </Link>
              </li>
              <li>
                <Link
                  href="/what-is-website-downtime"
                  className="block rounded-xl border border-white/10 bg-white/[0.06] p-3 font-medium text-sky-200 transition-all hover:border-sky-300/50 hover:bg-white/10"
                >
                  落ちるとは？
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="block rounded-xl border border-white/10 bg-white/[0.06] p-3 font-medium text-sky-200 transition-all hover:border-sky-300/50 hover:bg-white/10"
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
