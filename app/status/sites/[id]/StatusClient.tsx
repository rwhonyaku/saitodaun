"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getSiteById } from "@/lib/statusSites";
import { getEditorialById } from "@/lib/statusEditorial";

type CheckResult = {
  online: boolean;
  probeBlocked?: boolean;
  status: number | null;
  responseTime: number | null;
  timestamp: string;
  error?: string;
  checkedUrl?: string;
};

function getGuideHrefFromResult(result: CheckResult | null): string | null {
  if (!result) return null;
  if (result.probeBlocked) return null;

  const status = result.status;

  // Known HTTP error guides
  if (status === 403) return "/errors/403-forbidden";
  if (status === 404) return "/errors/404-not-found";
  if (status === 429) return "/errors/429-too-many-requests";
  if (status === 500) return "/errors/500-internal-server-error";
  if (status === 502) return "/errors/502-bad-gateway";
  if (status === 503) return "/errors/503-service-unavailable";
  if (status === 504) return "/errors/504-gateway-timeout";

  // If we can't get a code, route by common error signatures
  const e = (result.error ?? "").toLowerCase();

  // DNS-ish: users will most commonly fix by DNS guide
  if (
    status == null &&
    (e.includes("dns") ||
      e.includes("nxdomain") ||
      e.includes("name resolution") ||
      e.includes("resolve") ||
      e.includes("名前解決") ||
      e.includes("host") ||
      e.includes("ホスト"))
  ) {
    return "/troubleshooting-dns";
  }

  // Generic fallback hub
  if (status != null) return "/status-codes";

  // If totally unknown but error exists, send to the general troubleshooting guide if you have it,
  // otherwise fall back to status code hub.
  return "/status-codes";
}

export default function StatusClient({ id: propId }: { id: string }) {
  const params = useParams();

  const id = useMemo(() => {
    if (propId) return propId;

    const raw = (params as Record<string, string | string[] | undefined>)?.id;
    if (typeof raw === "string") return raw;
    if (Array.isArray(raw)) return raw[0] ?? "";
    return "";
  }, [params, propId]);

  const site = useMemo(() => (id ? getSiteById(id) : undefined), [id]);
  const editorial = useMemo(() => (id ? getEditorialById(id) : null), [id]);

  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);

  const runCheck = useCallback(async () => {
    if (!site) return;

    setLoading(true);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: site.url }),
      });

      const data = (await res.json()) as CheckResult;
      setResult(data);
    } catch {
      setResult({
        online: false,
        probeBlocked: false,
        status: null,
        responseTime: null,
        timestamp: new Date().toLocaleString("ja-JP", {
          timeZone: "Asia/Tokyo",
        }),
        error: "チェック中にエラーが発生しました。時間をおいて再度お試しください。",
        checkedUrl: site.url,
      });
    } finally {
      setLoading(false);
    }
  }, [site]);

  useEffect(() => {
    if (!site) return;
    runCheck();
  }, [site, runCheck]);

  if (!site) {
    return (
      <main className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-xl px-4 py-10 text-sm text-slate-700">
          <p className="mb-4">指定されたサービスは見つかりませんでした。</p>
          <div className="flex gap-3">
            <Link href="/status" className="text-sky-600 underline text-xs">
              ステータス一覧に戻る →
            </Link>
            <Link href="/" className="text-sky-600 underline text-xs">
              サイト接続チェック（URL入力）へ →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const statusLabel = !result
    ? "未判定"
    : result.probeBlocked
    ? "判定保留"
    : result.online
    ? "オンライン"
    : "オフライン";
  const statusColor = !result
    ? "text-slate-400"
    : result.probeBlocked
    ? "text-amber-600"
    : result.online
    ? "text-green-600"
    : "text-red-600";

  const hasOfficialLinks = Boolean(site.officialStatusUrl || site.supportUrl || site.xUrl);
  const guideHref = getGuideHrefFromResult(result);
  const isTwitterStatus = site.id === "twitter";
  const isLineStatus = site.id === "line";
  const isNotionStatus = site.id === "notion";
  const isLeanRouter = isTwitterStatus || isLineStatus || isNotionStatus;
  const serviceLabel = isTwitterStatus ? "X（旧Twitter）" : site.name;

  return (
    <main className="flex-1 bg-slate-50">
      <div className="mx-auto max-w-xl px-4 py-10 text-sm text-slate-700">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {isLineStatus
                ? "LINE 障害？今つながらない？"
                : isNotionStatus
                ? "Notion 障害？今開かない？"
                : `${serviceLabel} は今落ちてる？（障害・稼働状況チェック）`}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              {isLineStatus
                ? "このページは、LINE が今広く落ちているかの目安を見るためのものです。広く落ちていないなら、次は自分側か一部機能だけの不具合かを分けます。"
                : isNotionStatus
                ? "このページは、Notion が今広く落ちているかの目安を見るためのものです。広く落ちていないなら、次は自分側か一部機能だけの不具合かを分けます。"
                : `「${serviceLabel} が見れない」「障害が出てる？」という時に、いま接続できるかを簡易チェックします。`}
            </p>
          </div>

          <Link
            href="/status"
            className="shrink-0 text-xs text-sky-600 underline hover:text-sky-700"
          >
            一覧に戻る →
          </Link>
        </div>

        <p className="mb-4 text-xs text-slate-500 break-all">チェック対象URL：{site.url}</p>

        {/* Result box */}
        <div className="rounded-xl bg-white p-4 shadow-sm min-h-[120px]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-base font-semibold text-slate-900">
              結果：<span className={statusColor}> {statusLabel}</span>
            </p>

            <button
              onClick={runCheck}
              disabled={loading}
              className="rounded-md border border-slate-300 px-3 py-1 text-xs hover:bg-slate-50 disabled:opacity-60"
            >
              {loading ? "チェック中..." : "再チェック"}
            </button>
          </div>

          {loading && <p className="mt-2 text-xs text-slate-500">チェック中です...</p>}

          {!loading && !result && (
            <p className="mt-2 text-xs text-slate-500">まだ結果がありません。しばらくお待ちください。</p>
          )}

          {result && (
            <div className="mt-3 space-y-1">
              {result.error && <p className="text-xs text-red-500">{result.error}</p>}
              {result.probeBlocked && !result.error && (
                <p className="text-xs text-amber-700">
                  このサイトは当サイトのチェック環境から確認できませんでした。実際には利用できる場合があります。
                </p>
              )}
              {result.checkedUrl && (
                <p className="text-[11px] text-slate-500 break-all">
                  実際にチェックしたURL：{result.checkedUrl}
                </p>
              )}

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs">
                  {isNotionStatus ? "現在の接続状態" : "HTTPステータス"}：{result.status ?? "―"}
                </p>
                {guideHref && (
                  <Link
                    href={guideHref}
                    className="text-xs text-sky-600 underline hover:text-sky-700 whitespace-nowrap"
                  >
                    解説 →
                  </Link>
                )}
              </div>

              <p className="text-xs">
                応答時間：
                {result.responseTime != null ? ` ${result.responseTime} ms` : " ―"}
              </p>
              <p className="text-[11px] text-slate-500">最終チェック：{result.timestamp}</p>

              {!result.online && !result.probeBlocked && !result.error && (
                <p className="mt-2 text-[11px] text-slate-500">
                  オフライン表示でも、一時的な通信エラーや地域差で失敗することがあります。数十秒おいて再チェックしてください。
                </p>
              )}
              {result.probeBlocked && !result.error && (
                <p className="mt-2 text-[11px] text-slate-500">
                  ブラウザで開ける場合は、障害ではなくチェック制限の可能性があります。公式情報もあわせて確認してください。
                </p>
              )}
            </div>
          )}
        </div>

        {isTwitterStatus && (
          <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              まず切り分ける
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  全体障害かもしれない
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  複数端末や別回線でも同じなら、まずこのページの結果と公式案内を優先します。
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  自分だけの不具合かもしれない
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  広く落ちていないのに使えないなら、端末・回線・ログイン状態の切り分けに進みます。
                </p>
                <Link
                  href="/services/x/not-working"
                  className="mt-2 inline-block text-xs font-semibold text-sky-600 underline hover:text-sky-700"
                >
                  X（旧Twitter）が使えないときの切り分け →
                </Link>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  一部機能だけおかしい可能性
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  タイムラインは見えるのに投稿、通知、DMだけ不安定なら、部分不具合の可能性があります。
                </p>
              </div>
            </div>
          </section>
        )}

        {isLineStatus && (
          <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              まず切り分ける
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  全体障害の可能性
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  複数端末や別回線でも同じなら、まずこのページの結果と公式案内を優先します。
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  自分だけの不具合
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  広く落ちていないのに使えないなら、端末・回線・アプリ側の切り分けに進みます。
                </p>
                <Link
                  href="/services/line/not-working"
                  className="mt-2 inline-block text-xs font-semibold text-sky-600 underline hover:text-sky-700"
                >
                  LINE が使えないときの切り分け →
                </Link>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  一部機能の問題
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  メッセージ、通話、通知のどれだけが不安定なのかで切り分けが変わります。
                </p>
              </div>
            </div>
          </section>
        )}

        {isNotionStatus && (
          <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              まず切り分ける
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  全体障害の可能性
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  複数端末や別回線でも同じなら、まずこのページの結果と公式案内を優先します。
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  自分だけの不具合
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  広く落ちていないのに開かない、重い、ログインできないなら、自分側の切り分けに進みます。
                </p>
                <Link
                  href="/services/notion/not-working"
                  className="mt-2 inline-block text-xs font-semibold text-sky-600 underline hover:text-sky-700"
                >
                  Notion が使えないときの切り分け →
                </Link>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  一部機能の問題
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  同期、検索、表示内容だけが不安定なら、部分不具合の可能性があります。
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Editorial blocks (AdSense-safe depth) */}
        {editorial && (
          <>
            {/* What it means if down */}
            <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">
                「{serviceLabel} が落ちている」とは何を意味しますか
              </h2>
              <ul className="mt-3 space-y-2 text-xs text-slate-600 list-disc pl-5">
                {(
                  Array.isArray(editorial.whatItMeansIfDown)
                    ? editorial.whatItMeansIfDown
                    : editorial.whatItMeansIfDown.split("\n").filter(Boolean)
                ).map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </section>

            {!isLeanRouter ? (
              <>
                <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
                  <h2 className="text-sm font-semibold text-slate-900">このページが役立つ場面／役立たない場面</h2>

                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-900">役立つ場面</p>
                      <ul className="mt-2 space-y-2 text-xs text-slate-600 list-disc pl-5">
                        {editorial.usefulWhen.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">役立たない場面</p>
                      <ul className="mt-2 space-y-2 text-xs text-slate-600 list-disc pl-5">
                        {editorial.notUsefulWhen.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
                  <h2 className="text-sm font-semibold text-slate-900">このサービスで起きやすいパターン（サービス別）</h2>

                  <div className="mt-3 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-900">よくある障害の出方</p>
                      <ul className="mt-2 space-y-2 text-xs text-slate-600 list-disc pl-5">
                        {editorial.serviceSpecific.commonPatterns.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>

                    {editorial.serviceSpecific.tendsToBreakFirst && (
                      <div>
                        <p className="text-xs font-semibold text-slate-900">影響が出やすい領域</p>
                        <ul className="mt-2 space-y-2 text-xs text-slate-600 list-disc pl-5">
                          {editorial.serviceSpecific.tendsToBreakFirst.map((t, i) => (
                            <li key={i}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {editorial.serviceSpecific.siteUpButFeatureBrokenExamples && (
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          「サイトは開くが機能だけ壊れる」例
                        </p>
                        <ul className="mt-2 space-y-2 text-xs text-slate-600 list-disc pl-5">
                          {editorial.serviceSpecific.siteUpButFeatureBrokenExamples.map((t, i) => (
                            <li key={i}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>

                <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
                  <h2 className="text-sm font-semibold text-slate-900">次に確認できること（情報整理・切り分け）</h2>
                  <ul className="mt-3 space-y-2 text-xs text-slate-600 list-disc pl-5">
                    {editorial.whatToCheckNext.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>

                  {editorial.internalLinks && editorial.internalLinks.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {editorial.internalLinks.map((l, i) => (
                        <div key={i} className="text-xs">
                          <Link href={l.href} className="text-sky-600 underline hover:text-sky-700">
                            {l.label} →
                          </Link>
                          <p className="mt-1 text-[11px] text-slate-500">{l.reason}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {editorial.relatedServices && editorial.relatedServices.length > 0 && (
                  <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-900">関連サービス（切り分けに使える）</h2>
                    <div className="mt-3 space-y-3">
                      {editorial.relatedServices.map((s, i) => (
                        <div key={i}>
                          <Link href={s.href} className="text-xs text-sky-600 underline hover:text-sky-700">
                            {s.label} →
                          </Link>
                          <p className="mt-1 text-[11px] text-slate-500">{s.note}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            ) : null}
          </>
        )}

        {/* Official links (optional) */}
        {hasOfficialLinks && (
          <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">公式情報（確認先）</h2>

            {editorial?.officialConfirmation.linksNote && (
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                {editorial.officialConfirmation.linksNote}
              </p>
            )}

            {editorial?.officialConfirmation.whyItMatters && (
              <ul className="mt-3 space-y-2 text-xs text-slate-600 list-disc pl-5">
                {editorial.officialConfirmation.whyItMatters.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            )}

            {!editorial && (
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                障害の詳細や復旧状況は、公式のステータスページ・サポート・公式Xでも確認できます。
              </p>
            )}

            <ul className="mt-3 space-y-2 text-xs">
              {site.officialStatusUrl && (
                <li>
                  <a
                    href={site.officialStatusUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 underline hover:text-sky-700"
                  >
                    公式ステータスページ
                  </a>
                </li>
              )}
              {site.supportUrl && (
                <li>
                  <a
                    href={site.supportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 underline hover:text-sky-700"
                  >
                    公式サポート
                  </a>
                </li>
              )}
              {site.xUrl && (
                <li>
                  <a
                    href={site.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 underline hover:text-sky-700"
                  >
                    公式X（旧Twitter）
                  </a>
                </li>
              )}
            </ul>
          </section>
        )}

        {!isLeanRouter ? (
          <>
            <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">このサービスでよくある影響</h2>

              <p className="mt-3 text-xs text-slate-600 leading-relaxed">{site.serviceNote}</p>

              <p className="mt-3 text-[11px] text-slate-500">
                目立つ障害がなくても、ログインのみ／読み込みのみ等の「部分的な不具合」として現れることがあります。
              </p>
            </section>

            <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-900">まず確認すること（切り分け）</h2>
              <ul className="mt-3 space-y-2 text-xs text-slate-600 list-disc pl-5">
                <li>数十秒おいて再チェック（瞬間的な混雑・一時エラーのことがあります）</li>
                <li>別回線（Wi-Fi / 4G / 5G）でも確認</li>
                <li>別の端末・別ブラウザ（拡張機能の影響を切り分け）</li>
                <li>公式発表（公式情報の確認先）を確認</li>
                <li>DNS / CDN / アクセス制限の影響で、地域や回線によって結果が異なる場合があります</li>
              </ul>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/" className="text-xs text-sky-600 underline hover:text-sky-700">
                  URL入力でサイト接続チェック →
                </Link>
                <Link href="/status" className="text-xs text-sky-600 underline hover:text-sky-700">
                  他サービスの一覧へ →
                </Link>
              </div>
            </section>

            <section className="mt-8 border-t border-slate-200 pt-6">
              <h2 className="text-sm font-semibold text-slate-900 mb-3">よくある質問</h2>
              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <p className="font-semibold">
                    Q. 「{site.name} 障害」「{site.name} 落ちてる」で検索したら、このページで分かりますか？
                  </p>
                  <p className="mt-1 text-slate-600">
                    本ページは「このサーバーから接続できるか」を簡易チェックします。公式が障害を発表していなくても、地域差や一時的な障害で接続できないケースがあります。
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Q. 公式ステータスと違う結果になることがありますか？</p>
                  <p className="mt-1 text-slate-600">
                    あります。公式は全体状況、本ページは接続可否の確認です。時間をおいて再チェックしてください。
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Q. 結果はどれくらい正確ですか？</p>
                  <p className="mt-1 text-slate-600">
                    目安です。回線状況やアクセス制限（WAF/レート制限）等で失敗する場合があります。
                  </p>
                </div>
              </div>
            </section>
          </>
        ) : null}

        <p className="mt-6 text-[11px] text-slate-500">
          ※ このページは {site.name} の稼働状況を確認するための簡易チェックです。継続監視・通知を保証するものではありません。
        </p>
      </div>
    </main>
  );
}
