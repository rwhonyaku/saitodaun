"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { STATUS_SITES, type SiteConfig } from "@/lib/statusSites";
import {
  SITE_CATEGORIES,
  CATEGORY_ORDER,
  getCategoryCounts,
} from "@/lib/statusSites";
import { getGuideHrefFromResult } from "@/lib/errorGuideMap";
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

const FAVORITES_KEY = "saitodaun_status_favorites";

const QUICK_SERVICE_MARKS: Record<string, string> = {
  google: "G",
  "amazon-jp": "A",
  "yahoo-japan": "Y!",
  youtube: "▶",
  twitter: "X",
  instagram: "IG",
  line: "L",
  rakuten: "楽",
  mercari: "メ",
  paypay: "P",
  discord: "D",
  "playstation-network": "PS",
  nintendo: "N",
  apple: "A",
  mynaportal: "マ",
};

const SEARCH_ALIASES: Record<string, string[]> = {
  "amazon-jp": [
    "Amazon",
    "amazon",
    "amazon jp",
    "Amazon JP",
    "amazon.co.jp",
    "amazon japan",
    "アマゾン",
  ],
  ana: ["ANA", "ana", "全日空"],
  docomo: ["Docomo", "docomo", "ドコモ", "ntt docomo"],
  discord: ["Discord", "discord", "ディスコード"],
  ekinet: ["えきねっと", "ekinet", "駅ネット", "えきネット"],
  github: ["GitHub", "github", "git hub"],
  gmail: ["Gmail", "gmail", "google mail"],
  google: ["Google", "google search", "google検索"],
  "google-analytics": [
    "Google Analytics",
    "ga4",
    "analytics",
    "google analytics",
  ],
  "google-drive": ["Google Drive", "drive", "google drive"],
  "google-maps": ["Google Maps", "maps", "google maps", "グーグルマップ"],
  "google-search-console": [
    "Google Search Console",
    "search console",
    "gsc",
    "google search console",
  ],
  jal: ["JAL", "jal", "日本航空"],
  line: ["LINE", "line", "ライン"],
  "line-works": ["LINE WORKS", "lineworks", "line works"],
  mercari: ["Mercari", "mercari", "メルカリ"],
  "microsoft-365": [
    "Microsoft 365",
    "office365",
    "office 365",
    "microsoft365",
    "m365",
  ],
  "playstation-network": ["PlayStation Network", "psn", "playstation network"],
  "pokemon-home": ["Pokémon HOME", "pokemon home", "ポケモンhome", "ポケモンホーム"],
  "prime-video": [
    "Prime Video",
    "prime video",
    "primevideo",
    "プライムビデオ",
    "アマプラ",
    "amazon prime video",
    "Amazon Prime Video",
    "Amazonプライムビデオ",
    "amazonプライムビデオ",
  ],
  rakuten: ["Rakuten", "rakuten", "楽天"],
  "rakuten-mobile": ["Rakuten Mobile", "楽天モバイル", "rakuten mobile"],
  shopify: ["Shopify", "shopify", "ショッピファイ"],
  teams: ["Microsoft Teams", "teams", "microsoft teams", "ms teams"],
  twitter: [
    "Twitter",
    "x",
    "twitter",
    "ツイッター",
    "X（旧Twitter）",
  ],
  "xbox-live": ["Xbox Live", "xbox", "xbox live"],
  "yahoo-auctions": [
    "Yahoo Auctions",
    "ヤフオク",
    "yahoo auctions",
    "yahooオークション",
  ],
  "yahoo-japan": [
    "Yahoo Japan",
    "yahoo",
    "ヤフー",
    "yahoo japan",
    "yahoo! japan",
  ],
  "yahoo-shopping": ["Yahoo Shopping", "yahoo shopping", "ヤフーショッピング"],
};

type ReportSignal = "normal" | "elevated" | "spike";

type HotReportsResponse = {
  services: Array<{ serviceId: string; level: ReportSignal }>;
};

function normalizeSearchText(value: string) {
  return value.toLocaleLowerCase("ja-JP").replace(/\s+/g, "");
}

function getSearchText(site: SiteConfig) {
  return normalizeSearchText(
    [
      site.id,
      site.name,
      new URL(site.url).hostname,
      ...(site.aliases ?? []),
      ...(SEARCH_ALIASES[site.id] ?? []),
    ].join(" ")
  );
}

export default function StatusListClient() {
  const [results, setResults] = useState<Record<string, CheckResult | null>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [reportSignals, setReportSignals] = useState<Record<string, ReportSignal>>({});

  const categoryCounts = getCategoryCounts();

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setFavorites(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/reports?view=hot", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load reports");
        return response.json() as Promise<HotReportsResponse>;
      })
      .then((data) => {
        if (!active) return;
        setReportSignals(
          Object.fromEntries(data.services.map((service) => [service.serviceId, service.level]))
        );
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const saveFavorites = (next: string[]) => {
    setFavorites(next);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
      }
    } catch {}
  };

  const toggleFavorite = (id: string) => {
    saveFavorites(
      favorites.includes(id)
        ? favorites.filter((f) => f !== id)
        : [...favorites, id]
    );
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const sortedSites = useMemo(() => {
    return [...STATUS_SITES].sort((a, b) => {
      const af = favorites.includes(a.id) ? 1 : 0;
      const bf = favorites.includes(b.id) ? 1 : 0;
      if (af !== bf) return bf - af;
      return a.name.localeCompare(b.name, "ja");
    });
  }, [favorites]);

  const filteredSites = useMemo(() => {
    const query = normalizeSearchText(searchQuery);
    if (!query) return sortedSites;
    return sortedSites.filter((site) => getSearchText(site).includes(query));
  }, [searchQuery, sortedSites]);

  const quickLinks = useMemo(() => {
    const ids = [
      "google",
      "amazon-jp",
      "yahoo-japan",
      "youtube",
      "twitter",
      "instagram",
      "line",
      "rakuten",
      "mercari",
      "paypay",
      "discord",
      "playstation-network",
      "nintendo",
      "apple",
      "mynaportal",
    ];
    const map = new Map(STATUS_SITES.map((s) => [s.id, s]));
    return ids.map((id) => map.get(id)).filter(Boolean) as SiteConfig[];
  }, []);

  const setLoadingFor = (id: string, value: boolean) => {
    setLoading((prev) => ({ ...prev, [id]: value }));
  };

  const checkOne = async (site: SiteConfig) => {
    setLoadingFor(site.id, true);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: site.url }),
      });

      const data = (await res.json()) as CheckResult;
      setResults((prev) => ({ ...prev, [site.id]: data }));
    } catch {
      setResults((prev) => ({
        ...prev,
        [site.id]: {
          online: false,
          status: null,
          responseTime: null,
          timestamp: new Date().toLocaleString("ja-JP", {
            timeZone: "Asia/Tokyo",
          }),
          error:
            "チェック中にエラーが発生しました。時間をおいて再度お試しください。",
          checkedUrl: site.url,
        },
      }));
    } finally {
      setLoadingFor(site.id, false);
    }
  };

  return (
    <main className="flex-1 bg-slate-50 flex flex-col">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
        <header className="relative mb-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-lg sm:p-8">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(14,165,233,0.26),transparent_38%)]" />
          <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-sky-200">
            <span className="h-2 w-2 rounded-full bg-sky-400" /> Service directory
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl">
            主要サービスの障害・稼働状況一覧
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            サービス名から個別の接続チェック、利用者報告、公式の確認先へ進めます。必要なサービスだけ確認できます。
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <Link
              href="/"
              prefetch={false}
              className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 font-bold text-sky-200 hover:bg-white/10"
            >
              URL入力で接続チェック →
            </Link>
            <Link
              href="/about"
              prefetch={false}
              className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 font-bold text-sky-200 hover:bg-white/10"
            >
              このサイトについて →
            </Link>
          </div>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="mb-4 text-base font-bold text-slate-950">
            よく確認されるサービス
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {quickLinks.map((s, index) => {
              const signal = reportSignals[s.id];
              return (
                <Link
                  key={s.id}
                  href={`/status/sites/${s.id}`}
                  prefetch={false}
                  className={`group rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md sm:p-4 ${index >= 10 ? "hidden sm:block" : ""}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xs font-black text-white">{QUICK_SERVICE_MARKS[s.id] ?? s.name.slice(0, 1)}</span>
                    {signal ? (
                      <span className={`flex items-center gap-1 text-[10px] font-bold ${signal === "spike" ? "text-rose-700" : signal === "elevated" ? "text-amber-700" : "text-emerald-700"}`}>
                        <span className={`h-2 w-2 rounded-full ${signal === "spike" ? "bg-rose-500" : signal === "elevated" ? "bg-amber-500" : "bg-emerald-500"}`} />
                        {signal === "spike" ? "報告急増" : signal === "elevated" ? "報告増加" : "通常範囲"}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 line-clamp-2 text-xs font-bold leading-5 text-slate-900 group-hover:text-sky-700">{s.name}</p>
                  <p className="mt-1 text-[10px] text-slate-400">{SITE_CATEGORIES[s.category]}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <p className="text-xs text-slate-500">
            接続確認は必要なサービスだけ実行できます。
          </p>
          <p className="text-[11px] text-slate-400 font-medium">
            ★ を押すと、お気に入りのサービスを上部に固定できます。
          </p>
        </div>

        <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <label
            htmlFor="status-service-search"
            className="block text-xs font-bold text-slate-700"
          >
            サービス名で検索
          </label>
          <input
            id="status-service-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="例：Discord、アマプラ、Teams"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
          />
          <p className="mt-2 text-[11px] font-medium text-slate-500">
            {searchQuery
              ? `${filteredSites.length}件のサービスが一致しています。`
              : "サービス名・別名・URLの一部で絞り込めます。"}
          </p>
        </section>

        <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200">
          <div>
            <table className="w-full table-fixed text-left text-sm md:table-auto">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                <tr>
                  <th className="w-12 px-3 py-4 text-center sm:px-4">★</th>
                  <th className="px-4 py-4">サービス</th>
                  <th className="hidden px-4 py-4 md:table-cell">状態</th>
                  <th className="hidden px-4 py-4 md:table-cell">HTTP</th>
                  <th className="hidden px-4 py-4 md:table-cell">応答時間</th>
                  <th className="w-24 px-3 py-4 text-right sm:px-4">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSites.map((site) => {
                  const result = results[site.id] || null;
                  const isLoading = loading[site.id] || false;
                  const statusLabel = result
                    ? result.probeBlocked
                      ? "判定保留"
                      : result.online
                      ? "オンライン"
                      : "オフライン"
                    : "未チェック";
                  const statusColor = !result
                    ? "bg-slate-100 text-slate-400"
                    : result.probeBlocked
                    ? "bg-amber-100 text-amber-700"
                    : result.online
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700";

                  const guideHref = result
                    ? getGuideHrefFromResult({
                        status: result.status,
                        error: result.error,
                      })
                    : "/status-codes";

                  return (
                    <tr
                      key={site.id}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="px-3 py-4 text-center sm:px-4">
                        <button
                          type="button"
                          onClick={() => toggleFavorite(site.id)}
                          aria-label={`${site.name}をお気に入り${isFavorite(site.id) ? "から削除" : "に追加"}`}
                          className={`text-xl transition-transform active:scale-150 ${
                            isFavorite(site.id)
                              ? "text-amber-400"
                              : "text-slate-200 group-hover:text-slate-300"
                          }`}
                        >
                          {isFavorite(site.id) ? "★" : "☆"}
                        </button>
                      </td>

                      <td className="min-w-0 px-2 py-4 sm:px-4">
                        <Link
                          href={`/status/sites/${site.id}`}
                          prefetch={false}
                          className="font-bold text-slate-900 hover:text-sky-600 underline decoration-slate-200 underline-offset-4"
                        >
                          {site.name}
                        </Link>
                        <div className="mt-1 truncate font-mono text-[10px] uppercase text-slate-400">
                          {new URL(site.url).hostname}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5 md:hidden">
                          <span className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold ${statusColor}`}>
                            {isLoading ? "確認中..." : statusLabel}
                          </span>
                          {isReportingServiceId(site.id) ? (
                            <span className="rounded-md bg-sky-50 px-2 py-1 text-[10px] font-bold text-sky-700">利用者報告対応</span>
                          ) : null}
                        </div>
                      </td>

                      <td className="hidden px-4 py-4 md:table-cell">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-tight ${statusColor}`}
                        >
                          {isLoading ? "確認中..." : statusLabel}
                        </span>
                        {result?.error && (
                          <div className="text-[10px] text-red-500 mt-1">
                            {result.error}
                          </div>
                        )}
                      </td>

                      <td className="hidden px-4 py-4 md:table-cell">
                        <div className="font-mono text-xs text-slate-600">
                          {result?.status ?? "―"}
                        </div>
                        <div className="mt-1">
                          <Link
                            href={guideHref}
                            prefetch={false}
                            className="text-[10px] font-bold text-sky-600 underline underline-offset-2 hover:text-sky-700"
                          >
                            解説 →
                          </Link>
                        </div>
                      </td>

                      <td className="hidden px-4 py-4 font-mono text-xs text-slate-500 md:table-cell">
                        {result?.responseTime != null
                          ? `${result.responseTime}ms`
                          : "―"}
                      </td>

                      <td className="px-3 py-4 text-right sm:px-4">
                        <button
                          onClick={() => checkOne(site)}
                          disabled={isLoading}
                          className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-[10px] font-bold text-slate-600 shadow-sm transition-all hover:border-slate-400 disabled:opacity-50 sm:px-3"
                        >
                          {isLoading ? "..." : "再チェック"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredSites.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-10 text-center text-sm font-bold text-slate-500"
                    >
                      一致するサービスがありません。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <section className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">
            カテゴリ別に探す
          </h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORY_ORDER.map((cat) => {
              const count = (categoryCounts as any)[cat];
              return (
                <Link
                  key={String(cat)}
                  href={`/status/category/${cat}`}
                  prefetch={false}
                  className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-3 text-xs font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-all flex items-center gap-3"
                >
                  {(SITE_CATEGORIES as any)[cat]}
                  <span className="bg-white border border-slate-200 px-2 py-0.5 rounded-full text-[10px] text-slate-400 font-mono">
                    {count ?? 0}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="border-t border-slate-200 pt-10">
          <h2 className="text-sm font-bold text-slate-900 mb-6">
            よくある質問
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-700">
            <div className="bg-white p-5 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900">
                Q. 公式ステータスと違うことがありますか？
              </p>
              <p className="mt-2 text-slate-600 leading-relaxed">
                あります。公式は「全体の障害状況」、本ページは「このサーバーから接続できるか」を確認しています。地域差や一時的な通信エラーで結果が異なる場合があります。
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900">
                Q. どれを見ればいいか分かりません。
              </p>
              <p className="mt-2 text-slate-600 leading-relaxed">
                まずは「よく確認されるサービス」から選び、該当がなければ一覧検索や、お気に入り（★）固定機能を活用して最短で確認するのがおすすめです。
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
