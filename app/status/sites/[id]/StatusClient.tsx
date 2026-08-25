"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getSiteById } from "@/lib/statusSites";
import { getEditorialById } from "@/lib/statusEditorial";
import OutageReportPanel, { type ReportSummary } from "@/components/OutageReportPanel";
import { getStatusVerdict } from "@/lib/statusVerdict";
import { isReportingServiceId } from "@/lib/outageReports";

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
  const [communitySummary, setCommunitySummary] = useState<ReportSummary | null>(null);

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
            <Link href="/status" prefetch={false} className="text-sky-600 underline text-xs">
              ステータス一覧に戻る →
            </Link>
            <Link href="/" prefetch={false} className="text-sky-600 underline text-xs">
              サイト接続チェック（URL入力）へ →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const resultUnconfirmed = Boolean(
    result && (result.probeBlocked || result.error || result.status == null)
  );

  const statusLabel = !result
    ? "未判定"
    : resultUnconfirmed
    ? "確認不可"
    : result.online
    ? "オンライン"
    : "オフライン";
  const statusColor = !result
    ? "text-slate-400"
    : resultUnconfirmed
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
  const assessment = getStatusVerdict(result, loading, communitySummary);
  const officialVerdictUrl = site.officialStatusUrl || site.supportUrl || site.xUrl;
  const reportingEnabled = isReportingServiceId(site.id);
  const verdictUpdatedAt = communitySummary?.updatedAt
    ? new Intl.DateTimeFormat("ja-JP", {
        timeZone: "Asia/Tokyo",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(communitySummary.updatedAt))
    : result?.timestamp;

  return (
    <main className="flex-1 bg-slate-50">
      <div className="px-0 py-0 text-sm text-slate-700">
        <div
          role="status"
          aria-live="polite"
          className={`mb-4 rounded-2xl border p-5 shadow-sm sm:p-6 ${assessment.cardClassName}`}
        >
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${assessment.iconClassName}`}
            >
              {assessment.icon}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${assessment.badgeClassName}`}
                >
                  {assessment.badge}
                </span>
                {officialVerdictUrl ? (
                  <a href={officialVerdictUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold text-sky-700 underline underline-offset-2">
                    公式情報 ↗
                  </a>
                ) : null}
              </div>
              <p className="mt-2 text-xl font-bold leading-snug tracking-normal text-slate-950 sm:text-2xl">
                {assessment.main}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{assessment.detail}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:max-w-xl">
                <div className="rounded-xl border border-black/5 bg-white/70 px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">外部接続チェック</p>
                  <p className="mt-1 text-xs font-bold text-slate-800">{loading || !result ? "確認中" : resultUnconfirmed ? "確認不可" : result.online ? "応答あり" : "応答なし"}</p>
                </div>
                <div className="rounded-xl border border-black/5 bg-white/70 px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">日本の利用者報告</p>
                  <p className="mt-1 text-xs font-bold text-slate-800">{communitySummary
                    ? communitySummary.signal.level === "spike"
                      ? "急増"
                      : communitySummary.signal.level === "elevated"
                        ? "増加"
                        : "通常範囲"
                    : reportingEnabled ? "取得中" : "対象外"}</p>
                </div>
              </div>
              {verdictUpdatedAt ? (
                <p className="mt-2 text-[10px] text-slate-500">判定更新：{verdictUpdatedAt} JST</p>
              ) : null}
              <p className="mt-3 text-[10px] leading-relaxed text-slate-500">
                この判定は公式発表ではありません。接続結果と利用者報告を組み合わせた参考情報です。
              </p>
            </div>
          </div>
        </div>

        <p className="mb-4 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">外部サーバーから確認</span>
          <span className="min-w-0 [overflow-wrap:anywhere]">チェック対象：{site.url}</span>
        </p>

        {/* Result box */}
        <div className="min-h-[120px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-base font-semibold text-slate-900">
              結果：<span className={statusColor}> {statusLabel}</span>
            </p>

            <button
              onClick={runCheck}
              disabled={loading}
              className="min-h-11 min-w-[88px] rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold hover:bg-slate-50 disabled:opacity-60"
            >
              {loading ? "チェック中..." : "再チェック"}
            </button>
          </div>

          {loading && <p className="mt-2 text-xs text-slate-500">チェック中です...</p>}

          {!loading && !result && (
            <p className="mt-2 text-xs text-slate-500">
              必要なときだけ接続確認を実行します。「再チェック」を押すと現在の応答を確認できます。
            </p>
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
                <p className="text-[11px] text-slate-500 [overflow-wrap:anywhere]">
                  実際にチェックしたURL：{result.checkedUrl}
                </p>
              )}

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 px-3 py-3">
                  <p className="text-[10px] font-semibold text-slate-500">{isNotionStatus ? "現在の接続状態" : "HTTPステータス"}</p>
                  <p className="mt-1 font-mono text-base font-bold text-slate-900">{result.status ?? "―"}</p>
                </div>
                <div className="rounded-xl bg-slate-50 px-3 py-3">
                  <p className="text-[10px] font-semibold text-slate-500">応答時間</p>
                  <p className="mt-1 font-mono text-base font-bold text-slate-900">{result.responseTime != null ? `${result.responseTime} ms` : "―"}</p>
                </div>
                <div className="col-span-2 rounded-xl bg-slate-50 px-3 py-3 sm:col-span-1">
                  <p className="text-[10px] font-semibold text-slate-500">確認地点</p>
                  <p className="mt-1 text-xs font-bold text-slate-900">外部サーバー</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-[11px] text-slate-500">最終チェック：{result.timestamp}</p>
                {guideHref && (
                  <Link
                    href={guideHref}
                    prefetch={false}
                    className="text-xs text-sky-600 underline hover:text-sky-700 whitespace-nowrap"
                  >
                    解説 →
                  </Link>
                )}
              </div>

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

        <OutageReportPanel serviceId={site.id} onSummaryChange={setCommunitySummary} />

        {isTwitterStatus && (
          <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              Xが落ちた・鯖落ちか判断する目安
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  広い障害の可能性
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  複数端末と別回線の両方でタイムラインを更新できず、このページでも利用者報告が急増している場合は、X側の障害が疑われます。
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  一部機能だけの不具合
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  タイムラインは見えるのに投稿、検索、通知、DM、画像の一部だけ失敗する場合は、全体の鯖落ちではなく部分障害の可能性があります。
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  自分側の可能性
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  別端末や別回線では使える、または一つのアカウントだけ失敗する場合は、アプリ・回線・ログイン状態を先に確認します。
                </p>
                <Link
                  href="/services/x/not-working"
                  prefetch={false}
                  className="mt-2 inline-block text-xs font-semibold text-sky-600 underline hover:text-sky-700"
                >
                  自分だけ使えない時の確認 →
                </Link>
              </div>
            </div>
          </section>
        )}

        {isLineStatus && (
          <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              まず確認する
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
                  広く落ちていないのに使えないなら、端末・回線・アプリ側の確認に進みます。
                </p>
                <Link
                  href="/services/line/not-working"
                  prefetch={false}
                  className="mt-2 inline-block text-xs font-semibold text-sky-600 underline hover:text-sky-700"
                >
                  LINE が使えないときの確認 →
                </Link>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  一部機能の問題
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  メッセージ、通話、通知のどれだけが不安定なのかで確認が変わります。
                </p>
              </div>
            </div>
          </section>
        )}

        {isNotionStatus && (
          <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              まず確認する
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
                  広く落ちていないのに開かない、重い、ログインできないなら、自分側の確認に進みます。
                </p>
                <Link
                  href="/services/notion/not-working"
                  prefetch={false}
                  className="mt-2 inline-block text-xs font-semibold text-sky-600 underline hover:text-sky-700"
                >
                  Notion が使えないときの確認 →
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
                  <h2 className="text-sm font-semibold text-slate-900">次に確認できること（情報整理・確認）</h2>
                  <ul className="mt-3 space-y-2 text-xs text-slate-600 list-disc pl-5">
                    {editorial.whatToCheckNext.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>

                  {editorial.internalLinks && editorial.internalLinks.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {editorial.internalLinks.map((l, i) => (
                        <div key={i} className="text-xs">
                          <Link href={l.href} prefetch={false} className="text-sky-600 underline hover:text-sky-700">
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
                    <h2 className="text-sm font-semibold text-slate-900">関連サービス（確認に使える）</h2>
                    <div className="mt-3 space-y-3">
                      {editorial.relatedServices.map((s, i) => (
                        <div key={i}>
                          <Link href={s.href} prefetch={false} className="text-xs text-sky-600 underline hover:text-sky-700">
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
                    公式障害・メンテ情報
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
              <h2 className="text-sm font-semibold text-slate-900">今やること</h2>
              <ul className="mt-3 space-y-2 text-xs text-slate-600 list-disc pl-5">
                <li>数十秒後に再チェックし、一時的な失敗か確認する</li>
                <li>Wi-Fiとモバイル回線を切り替え、回線差があるか確認する</li>
                <li>複数環境でも同じなら、このページの公式情報を確認する</li>
              </ul>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/" prefetch={false} className="text-xs text-sky-600 underline hover:text-sky-700">
                  URL入力でサイト接続チェック →
                </Link>
                <Link href="/status" prefetch={false} className="text-xs text-sky-600 underline hover:text-sky-700">
                  他サービスの一覧へ →
                </Link>
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
