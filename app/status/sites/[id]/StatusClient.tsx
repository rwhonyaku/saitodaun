"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getSiteById } from "@/lib/statusSites";
import { getEditorialById } from "@/lib/statusEditorial";
import OutageReportPanel, { type ReportSummary } from "@/components/OutageReportPanel";
import { getStatusVerdict } from "@/lib/statusVerdict";
import { isReportingServiceId } from "@/lib/outageReports";
import { getStatusRelatedServices } from "@/lib/statusRelatedServices";

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

function getCurrentReportIncreaseStart(summary: ReportSummary | null): string | null {
  if (!summary || summary.signal.level === "normal") return null;

  let latestAbnormalIndex = -1;
  for (let index = summary.timeline.length - 1; index >= 0; index -= 1) {
    if (summary.timeline[index].level !== "normal") {
      latestAbnormalIndex = index;
      break;
    }
  }

  if (latestAbnormalIndex === -1) return null;

  let startAt = summary.timeline[latestAbnormalIndex].startAt;
  for (let index = latestAbnormalIndex - 1; index >= 0; index -= 1) {
    if (summary.timeline[index].level === "normal") break;
    startAt = summary.timeline[index].startAt;
  }

  return startAt;
}

function formatJstDateTime(value: string) {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function StatusClient({
  id: propId,
  selfCheckHref,
  selfCheckLabel,
}: {
  id: string;
  selfCheckHref?: string;
  selfCheckLabel?: string;
}) {
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
  const isNetflixStatus = site.id === "netflix";
  const isNotionStatus = site.id === "notion";
  const isTeamsStatus = site.id === "teams";
  const isDiscordStatus = site.id === "discord";
  const isLeanRouter = isTwitterStatus || isLineStatus || isNotionStatus;
  const serviceLabel = isTwitterStatus ? "X（旧Twitter）" : site.name;
  const assessment = getStatusVerdict(result, loading, communitySummary);
  const officialVerdictUrl = site.officialStatusUrl || site.supportUrl || site.xUrl;
  const reportingEnabled = isReportingServiceId(site.id);
  const fallbackRelatedServices = editorial?.relatedServices?.length
    ? []
    : getStatusRelatedServices(site.id);
  const verdictUpdatedAt = communitySummary?.updatedAt
    ? new Intl.DateTimeFormat("ja-JP", {
        timeZone: "Asia/Tokyo",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(communitySummary.updatedAt))
    : result?.timestamp;
  const reportIncreaseStartedAt = getCurrentReportIncreaseStart(communitySummary);
  const reportSummaryLabel = communitySummary
    ? communitySummary.signal.level === "spike"
      ? `急増（${communitySummary.signal.currentReporters}人）`
      : communitySummary.signal.level === "elevated"
        ? `増加（${communitySummary.signal.currentReporters}人）`
        : communitySummary.count > 0
          ? `通常範囲（${communitySummary.count}件）`
          : "直近30分は0件"
    : reportingEnabled
      ? "取得中"
      : "報告受付対象外";
  const reachabilityLabel = loading || !result
    ? "確認中"
    : resultUnconfirmed
      ? "確認不可"
      : result.online
        ? `応答あり${result.status ? `（HTTP ${result.status}）` : ""}`
        : `応答なし${result.status ? `（HTTP ${result.status}）` : ""}`;
  const teamsFreshness = communitySummary?.updatedAt
    ? formatJstDateTime(communitySummary.updatedAt)
    : result?.timestamp ?? null;
  const teamsMeetingReports =
    isTeamsStatus && communitySummary?.topProblem?.type === "meeting"
      ? communitySummary.topProblem.count
      : 0;
  const teamsSituation = !isTeamsStatus
    ? null
    : loading || !result
      ? {
          title: "Teamsの現在状況を確認中",
          detail: "外部からの接続結果と日本の利用者報告を取得しています。",
        }
      : !communitySummary
        ? {
            title: result.online
              ? "Teamsサイトへの外部接続は確認できました"
              : "Teamsサイトへの外部接続を確認できませんでした",
            detail: "日本の利用者報告を取得中です。接続結果だけでは、会議やチャットなど一部機能の状態は判断できません。",
          }
      : assessment.level === "likely"
        ? {
            title: "広いTeams障害の可能性があります",
            detail: "接続結果または利用者報告に異常があります。Microsoft側の案内と影響範囲も確認してください。",
          }
        : teamsMeetingReports > 0
          ? {
              title: "会議に関する報告があります",
              detail: `直近30分に会議関連の報告が${teamsMeetingReports}件あります。Teams全体ではなく、会議機能だけの問題も確認してください。`,
            }
          : assessment.level === "normal"
            ? {
                title: "現在、広いTeams障害の兆候は確認されていません",
                detail: "自分だけつながらない場合は、組織アカウント、アプリ、VPN、社内ネットワーク側を確認してください。",
              }
            : {
                title: "一部問題またはMicrosoft側の影響を確認してください",
                detail: "Teams単体か、Microsoft 365側の障害か、自分の組織・接続環境だけの問題かを切り分ける必要があります。",
              };
  const lineFreshness = communitySummary?.updatedAt
    ? formatJstDateTime(communitySummary.updatedAt)
    : result?.timestamp ?? null;
  const lineTopProblemDetail = !isLineStatus || !communitySummary?.topProblem
    ? null
    : communitySummary.topProblem.type === "messaging"
      ? "メッセージの送受信に関する報告が最も多くなっています。"
      : communitySummary.topProblem.type === "audio_video"
        ? "音声・ビデオ通話に関する報告が最も多くなっています。"
        : communitySummary.topProblem.type === "notification"
          ? "通知が来ない・遅いという報告が最も多くなっています。"
          : communitySummary.topProblem.type === "login"
            ? "ログイン・認証に関する報告が最も多くなっています。"
            : communitySummary.topProblem.type === "loading"
              ? "アプリが開かない・遅いという報告が最も多くなっています。"
              : "その他のLINE機能に関する報告があります。";
  const lineSituation = !isLineStatus
    ? null
    : loading || !result
      ? {
          title: "LINEの現在状況を確認中",
          detail: "外部からの接続結果と日本の利用者報告を取得しています。",
        }
      : !communitySummary
        ? {
            title: result.online
              ? "LINEサイトへの外部接続は確認できました"
              : "LINEサイトへの外部接続を確認できませんでした",
            detail: "日本の利用者報告を取得中です。接続結果だけでは、トークや通話などアプリ内機能の状態は判断できません。",
          }
        : assessment.level === "likely"
          ? {
              title: "広いLINE不具合の可能性があります",
              detail: communitySummary.signal.level === "spike" && lineTopProblemDetail
                ? lineTopProblemDetail
                : "接続結果に異常があります。利用者報告とLINE公式のお知らせも合わせて確認してください。",
            }
          : communitySummary.signal.level === "elevated"
            ? {
                title: "LINEの不具合報告が通常より増えています",
                detail: lineTopProblemDetail ?? "一部機能の問題か、利用環境による接続問題かを確認してください。",
              }
            : assessment.level === "partial"
              ? {
                  title: "LINEへの接続に一部問題がある可能性があります",
                  detail: "利用者報告は通常範囲です。別回線や別端末でも同じか確認してください。",
                }
            : communitySummary.topProblem
              ? {
                  title: "広い障害の兆候はなく、報告は通常範囲です",
                  detail: lineTopProblemDetail ?? "一部の利用者から問題が報告されています。",
                }
              : {
                  title: "現在、広いLINE不具合の兆候は確認されていません",
                  detail: "自分だけ使えない場合は、アプリ、端末、回線、ログイン状態を確認してください。",
                };
  const netflixFreshness = communitySummary?.updatedAt
    ? formatJstDateTime(communitySummary.updatedAt)
    : result?.timestamp ?? null;
  const netflixTopProblemDetail = !isNetflixStatus || !communitySummary?.topProblem
    ? null
    : communitySummary.topProblem.type === "streaming"
      ? "動画の再生に関する報告が最も多くなっています。"
      : communitySummary.topProblem.type === "connection"
        ? "Netflixへの接続に関する報告が最も多くなっています。"
        : communitySummary.topProblem.type === "login"
          ? "ログイン・アカウントに関する報告が最も多くなっています。"
          : communitySummary.topProblem.type === "loading"
            ? "アプリや画面の読み込みに関する報告が最も多くなっています。"
            : communitySummary.topProblem.type === "audio_video"
              ? "音声・映像に関する報告が最も多くなっています。"
              : "その他のNetflix機能に関する報告があります。";
  const netflixSituation = !isNetflixStatus
    ? null
    : loading || !result
      ? {
          title: "Netflixの現在状況を確認中",
          detail: "外部からの接続結果と日本の利用者報告を取得しています。",
        }
      : !communitySummary
        ? {
            title: result.online
              ? "Netflixサイトへの外部接続は確認できました"
              : "Netflixサイトへの外部接続を確認できませんでした",
            detail: "日本の利用者報告を取得中です。接続結果だけでは、ログイン後の再生やアプリ内機能の状態は判断できません。",
          }
        : assessment.level === "likely"
          ? {
              title: "広いNetflix不具合の可能性があります",
              detail: communitySummary.signal.level === "spike" && netflixTopProblemDetail
                ? netflixTopProblemDetail
                : "接続結果に異常があります。利用者報告とNetflix公式のサービス状況も確認してください。",
            }
          : communitySummary.signal.level === "elevated"
            ? {
                title: "Netflixの不具合報告が通常より増えています",
                detail: netflixTopProblemDetail ?? "複数の端末や回線でも同じ症状か確認してください。",
              }
            : assessment.level === "partial"
              ? {
                  title: "Netflixへの接続に一部問題がある可能性があります",
                  detail: "利用者報告は通常範囲です。別回線や別端末でも同じか確認してください。",
                }
              : communitySummary.topProblem
                ? {
                    title: "広い障害の兆候はなく、報告は通常範囲です",
                    detail: netflixTopProblemDetail ?? "一部の利用者から問題が報告されています。",
                  }
                : {
                    title: "現在、広いNetflix不具合の兆候は確認されていません",
                    detail: "自分だけ見れない場合は、作品、端末、アプリ、回線、アカウントの違いを確認してください。",
                  };

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
                {isTeamsStatus ? (
                  <span className="flex flex-wrap justify-end gap-x-3 gap-y-1 text-[11px] font-semibold">
                    {site.officialStatusUrl ? (
                      <a href={site.officialStatusUrl} target="_blank" rel="noopener noreferrer" className="text-sky-700 underline underline-offset-2">
                        Microsoft 365サービス正常性（管理者向け）↗
                      </a>
                    ) : null}
                    {site.xUrl ? (
                      <a href={site.xUrl} target="_blank" rel="noopener noreferrer" className="text-sky-700 underline underline-offset-2">
                        Microsoft 365 Status（X）↗
                      </a>
                    ) : null}
                  </span>
                ) : isLineStatus ? (
                  <span className="flex flex-wrap justify-end gap-x-3 gap-y-1 text-[11px] font-semibold">
                    {site.officialStatusUrl ? (
                      <a href={site.officialStatusUrl} target="_blank" rel="noopener noreferrer" className="text-sky-700 underline underline-offset-2">
                        LINEヘルプのお知らせ ↗
                      </a>
                    ) : null}
                  </span>
                ) : isNetflixStatus ? (
                  <span className="flex flex-wrap justify-end gap-x-3 gap-y-1 text-[11px] font-semibold">
                    {site.officialStatusUrl ? (
                      <a href={site.officialStatusUrl} target="_blank" rel="noopener noreferrer" className="text-sky-700 underline underline-offset-2">
                        Netflix公式のサービス状況 ↗
                      </a>
                    ) : null}
                    {site.supportUrl ? (
                      <a href={site.supportUrl} target="_blank" rel="noopener noreferrer" className="text-sky-700 underline underline-offset-2">
                        Netflixヘルプ ↗
                      </a>
                    ) : null}
                  </span>
                ) : officialVerdictUrl ? (
                  <a href={officialVerdictUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold text-sky-700 underline underline-offset-2">
                    公式情報 ↗
                  </a>
                ) : null}
              </div>
              <p className="mt-2 text-xl font-bold leading-snug tracking-normal text-slate-950 sm:text-2xl">
                {assessment.main}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{assessment.detail}</p>
              {teamsSituation ? (
                <section className="mt-4 rounded-xl border border-black/10 bg-white/75 p-3" aria-labelledby="teams-current-status">
                  <h2 id="teams-current-status" className="text-xs font-bold text-slate-900">Teamsの現在状況</h2>
                  <p className="mt-1 text-sm font-bold leading-snug text-slate-950">{teamsSituation.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{teamsSituation.detail}</p>
                  <p className="mt-2 text-[10px] text-slate-500">
                    {teamsFreshness ? `更新：${teamsFreshness} JST` : "更新時刻を取得中"} ・ 利用者報告は直近30分、推移は過去24時間
                  </p>
                </section>
              ) : null}
              {lineSituation ? (
                <section className="mt-4 rounded-xl border border-black/10 bg-white/75 p-3" aria-labelledby="line-current-status">
                  <h2 id="line-current-status" className="text-xs font-bold text-slate-900">LINEの現在状況</h2>
                  <p className="mt-1 text-sm font-bold leading-snug text-slate-950">{lineSituation.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{lineSituation.detail}</p>
                  <p className="mt-2 text-[10px] text-slate-500">
                    {lineFreshness ? `更新：${lineFreshness} JST` : "更新時刻を取得中"} ・ 利用者報告は直近30分、推移は過去24時間
                  </p>
                </section>
              ) : null}
              {netflixSituation ? (
                <section className="mt-4 rounded-xl border border-black/10 bg-white/75 p-3" aria-labelledby="netflix-current-status">
                  <h2 id="netflix-current-status" className="text-xs font-bold text-slate-900">Netflixの現在状況</h2>
                  <p className="mt-1 text-sm font-bold leading-snug text-slate-950">{netflixSituation.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{netflixSituation.detail}</p>
                  <p className="mt-2 text-[10px] text-slate-500">
                    {netflixFreshness ? `更新：${netflixFreshness} JST` : "更新時刻を取得中"} ・ 利用者報告は直近30分、推移は過去24時間
                  </p>
                </section>
              ) : null}
              <div className="mt-4 border-t border-black/10 pt-4">
                <h2 className="text-xs font-bold text-slate-900">{isTeamsStatus || isLineStatus || isNetflixStatus ? "判断に使った情報" : "現在の調査サマリー"}</h2>
                <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-black/5 bg-white/70 px-3 py-2.5">
                  <dt className="text-[10px] font-semibold tracking-wide text-slate-500">現在の判定</dt>
                  <dd className="mt-1 text-xs font-bold text-slate-800">{assessment.badge}</dd>
                </div>
                <div className="rounded-xl border border-black/5 bg-white/70 px-3 py-2.5">
                  <dt className="text-[10px] font-semibold tracking-wide text-slate-500">日本の利用者報告</dt>
                  <dd className="mt-1 text-xs font-bold text-slate-800">{reportSummaryLabel}</dd>
                </div>
                <div className="rounded-xl border border-black/5 bg-white/70 px-3 py-2.5">
                  <dt className="text-[10px] font-semibold tracking-wide text-slate-500">主な症状</dt>
                  <dd className="mt-1 text-xs font-bold text-slate-800">
                    {communitySummary?.topProblem
                      ? `${communitySummary.topProblem.label}（${communitySummary.topProblem.count}件）`
                      : reportingEnabled
                        ? communitySummary ? "報告なし" : "取得中"
                        : "データなし"}
                  </dd>
                </div>
                <div className="rounded-xl border border-black/5 bg-white/70 px-3 py-2.5">
                  <dt className="text-[10px] font-semibold tracking-wide text-slate-500">報告増加の検出開始</dt>
                  <dd className="mt-1 text-xs font-bold text-slate-800">
                    {reportIncreaseStartedAt ? `${formatJstDateTime(reportIncreaseStartedAt)}頃` : communitySummary ? "増加なし" : reportingEnabled ? "取得中" : "対象外"}
                  </dd>
                </div>
                <div className="rounded-xl border border-black/5 bg-white/70 px-3 py-2.5">
                  <dt className="text-[10px] font-semibold tracking-wide text-slate-500">サイト到達性</dt>
                  <dd className="mt-1 text-xs font-bold text-slate-800">{reachabilityLabel}</dd>
                </div>
                <div className="rounded-xl border border-black/5 bg-white/70 px-3 py-2.5">
                  <dt className="text-[10px] font-semibold tracking-wide text-slate-500">確認先</dt>
                  <dd className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs font-bold">
                    {isTeamsStatus && site.officialStatusUrl ? (
                      <a href={site.officialStatusUrl} target="_blank" rel="noopener noreferrer" className="text-sky-700 underline underline-offset-2">
                        Microsoft公式のサービス正常性（管理者向け）↗
                      </a>
                    ) : isLineStatus && site.officialStatusUrl ? (
                      <a href={site.officialStatusUrl} target="_blank" rel="noopener noreferrer" className="text-sky-700 underline underline-offset-2">
                        LINEヘルプのお知らせ ↗
                      </a>
                    ) : isNetflixStatus && site.officialStatusUrl ? (
                      <a href={site.officialStatusUrl} target="_blank" rel="noopener noreferrer" className="text-sky-700 underline underline-offset-2">
                        Netflix公式のサービス状況 ↗
                      </a>
                    ) : officialVerdictUrl ? (
                      <a href={officialVerdictUrl} target="_blank" rel="noopener noreferrer" className="text-sky-700 underline underline-offset-2">
                        公式情報 ↗
                      </a>
                    ) : (
                      <span className="text-slate-600">公式リンク未登録</span>
                    )}
                    {selfCheckHref ? (
                      <Link href={selfCheckHref} prefetch={false} className="text-sky-700 underline underline-offset-2">
                        {selfCheckLabel || "自分側を確認"} →
                      </Link>
                    ) : (
                      <Link href="/troubleshooting/specific-site-not-working" prefetch={false} className="text-sky-700 underline underline-offset-2">
                        自分側を確認 →
                      </Link>
                    )}
                  </dd>
                </div>
                </dl>
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

        {isNetflixStatus && (
          <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Netflixが見れない時の見分け方</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">広いNetflix障害</p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  利用者報告が増え、別端末・別回線でも接続や再生が失敗する場合は、Netflix側の広い不具合が疑われます。現在状況と公式情報を確認します。
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">再生だけできない</p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  作品一覧は開くのに動画だけ始まらない場合は、Netflix全体ではなく、作品、端末、アプリ、映像配信経路の問題も考えられます。
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">接続・ログインだけ失敗する</p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  サイトやアプリを開けない、または一つのアカウントだけ失敗する場合は、回線、アプリ、端末、アカウント側を切り分けます。
                </p>
              </div>
            </div>
            {!loading && communitySummary && assessment.level === "normal" ? (
              <div className="mt-3 rounded-lg border border-sky-100 bg-sky-50 p-3">
                <p className="text-xs font-semibold text-slate-900">広い障害が見つからない場合</p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                  別作品、別端末、Wi-Fiとモバイル回線を順に比較し、アプリを再起動します。違いが出た箇所が自分側の原因候補です。
                </p>
                <Link href="/services/netflix/not-working" prefetch={false} className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-800">
                  Netflixが見れない時の確認 →
                </Link>
              </div>
            ) : null}
          </section>
        )}

        {isTeamsStatus && (
          <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Teamsに繋がらない・会議に入れない時の見分け方</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">1. 広いTeams障害</p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  利用者報告が増え、別端末・別回線でも会議やチャットが失敗する場合は、広い障害が疑われます。上の現在状況とMicrosoft公式情報を確認します。
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">2. Teamsは正常だが自分だけつながらない</p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  報告が通常範囲で別端末やブラウザ版では使える場合は、アプリ、会社VPN、社内ネットワーク、組織アカウントを確認します。
                </p>
                <Link href="/services/teams/not-working" prefetch={false} className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold text-sky-600 underline underline-offset-2 hover:text-sky-700">
                  Teamsが使えない時の確認 →
                </Link>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">3. 会議だけ入れない</p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  チャットは使えるのに会議だけ失敗する場合は、会議URL、参加中の組織、ゲスト参加、ロビー、主催者設定、音声・映像権限を確認します。
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">4. Microsoft側の障害</p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  OutlookやOneDriveも同時に不安定なら、Teams単体ではなくMicrosoft 365側の影響が疑われます。管理者はサービス正常性で組織への影響を確認できます。
                </p>
                <Link href="/status/sites/microsoft-365" prefetch={false} className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold text-sky-600 underline underline-offset-2 hover:text-sky-700">
                  Microsoft 365の現在状況 →
                </Link>
              </div>
            </div>
          </section>
        )}

        {isDiscordStatus && (
          <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">Discordの障害・不具合を見分ける目安</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">広い障害が疑われる</p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  日本の利用者報告が増え、別端末・別回線でもログインやサーバー接続が失敗する場合は、Discord側の広い障害が疑われます。
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">一部機能だけの不具合</p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  メッセージは送れるがボイスチャットだけ接続できないなど、ログイン・通話・通知・特定サーバーだけの問題もあります。
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">自分側の可能性</p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  別回線やブラウザ版では使える場合は、アプリ・回線・DNS・VPN・端末側を順に確認します。
                </p>
                <Link href="/services/discord/not-working" prefetch={false} className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold text-sky-600 underline underline-offset-2 hover:text-sky-700">
                  Discordがつながらない時の確認 →
                </Link>
              </div>
            </div>
          </section>
        )}

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
              LINEの症状を見分ける
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  1. 広いLINE不具合
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  利用者報告が増え、別端末・別回線でもトークや通話が失敗する場合は、広い不具合が疑われます。上の現在状況とLINE公式のお知らせを確認します。
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  2. メッセージが送れない
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  通話や他の機能は使えるのに送受信だけ失敗する場合は、トーク機能だけの不具合、通信状態、送信先や添付内容を確認します。
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-semibold text-slate-900">
                  3. 通話だけできない
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                  トークは使えるのに音声・ビデオ通話だけ失敗する場合は、通話機能、マイク権限、Wi-Fiやモバイル回線の違いを確認します。
                </p>
              </div>
              {!loading && communitySummary && assessment.level === "normal" ? (
                <div className="rounded-lg border border-sky-100 bg-sky-50 p-3">
                  <p className="text-xs font-semibold text-slate-900">
                    4. 広い不具合が見つからない
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                    報告が通常範囲なら、ログイン・認証、通知、アプリ起動、端末設定、回線のどこで止まるかを確認します。
                  </p>
                  <Link
                    href="/services/line/not-working"
                    prefetch={false}
                    className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold text-sky-600 underline underline-offset-2 hover:text-sky-700"
                  >
                    LINEが使えない時の確認 →
                  </Link>
                </div>
              ) : null}
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

        {fallbackRelatedServices.length > 0 && (
          <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">関連サービスと比較する</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              同じ種類のサービスも確認すると、個別サービスの障害か、自分の回線・端末側の問題かを切り分けやすくなります。
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {fallbackRelatedServices.map((related) => (
                <div key={related.href} className="rounded-lg border border-slate-200 p-3">
                  <Link href={related.href} prefetch={false} className="text-xs font-semibold text-sky-600 underline hover:text-sky-700">
                    {related.label}の現在状況 →
                  </Link>
                  <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{related.note}</p>
                </div>
              ))}
            </div>
          </section>
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

        {!isLeanRouter && !isNetflixStatus ? (
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
