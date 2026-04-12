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

type CheckResult = {
  online: boolean;
  status: number | null;
  responseTime: number | null;
  timestamp: string;
  error?: string;
  checkedUrl?: string;
};

const FAVORITES_KEY = "saitodaun_status_favorites";

export default function StatusListClient() {
  const [results, setResults] = useState<Record<string, CheckResult | null>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [checkingAll, setCheckingAll] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

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

  const checkAll = async () => {
    setCheckingAll(true);
    try {
      for (const site of STATUS_SITES) {
        await checkOne(site);
      }
    } finally {
      setCheckingAll(false);
    }
  };

  return (
    <main className="flex-1 bg-slate-50 flex flex-col">
      <div className="mx-auto max-w-4xl w-full px-4 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight sm:text-3xl">
            主要サービスの障害・稼働状況一覧
          </h1>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            「サイト ダウン 確認」「サーバーダウン 確認」などで探している方向けに、主要サービスの稼働状況を簡易チェックできます。個別ページでは公式の確認先リンクも掲載しています。
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <Link
              href="/"
              className="text-sky-600 font-bold underline hover:text-sky-700"
            >
              URL入力で接続チェック →
            </Link>
            <Link
              href="/about"
              className="text-sky-600 font-bold underline hover:text-sky-700"
            >
              このサイトについて →
            </Link>
          </div>
        </header>

        <section className="mb-10">
          <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
            よく確認されるサービス
          </h2>
          <div className="flex flex-wrap gap-2">
            {quickLinks.map((s) => (
              <Link
                key={s.id}
                href={`/status/sites/${s.id}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600 transition-all"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <button
            onClick={checkAll}
            disabled={checkingAll}
            className="w-full sm:w-auto rounded-xl bg-slate-900 px-8 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-60 transition-all shadow-md active:scale-95"
          >
            {checkingAll ? "一括チェック中..." : "全て一括でチェックする"}
          </button>
          <p className="text-[11px] text-slate-400 font-medium">
            ★ を押すと、お気に入りのサービスを上部に固定できます。
          </p>
        </div>

        <div className="mb-8 overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                <tr>
                  <th className="px-4 py-4 w-12 text-center">★</th>
                  <th className="px-4 py-4">サービス</th>
                  <th className="px-4 py-4">状態</th>
                  <th className="px-4 py-4">HTTP</th>
                  <th className="px-4 py-4">応答時間</th>
                  <th className="px-4 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedSites.map((site) => {
                  const result = results[site.id] || null;
                  const isLoading = loading[site.id] || false;
                  const statusLabel = result
                    ? result.online
                      ? "オンライン"
                      : "オフライン"
                    : "未チェック";
                  const statusColor = !result
                    ? "bg-slate-100 text-slate-400"
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
                      <td className="px-4 py-4 text-center">
                        <button
                          type="button"
                          onClick={() => toggleFavorite(site.id)}
                          className={`text-xl transition-transform active:scale-150 ${
                            isFavorite(site.id)
                              ? "text-amber-400"
                              : "text-slate-200 group-hover:text-slate-300"
                          }`}
                        >
                          {isFavorite(site.id) ? "★" : "☆"}
                        </button>
                      </td>

                      <td className="px-4 py-4">
                        <Link
                          href={`/status/sites/${site.id}`}
                          className="font-bold text-slate-900 hover:text-sky-600 underline decoration-slate-200 underline-offset-4"
                        >
                          {site.name}
                        </Link>
                        <div className="text-[10px] text-slate-400 mt-1 font-mono uppercase">
                          {new URL(site.url).hostname}
                        </div>
                      </td>

                      <td className="px-4 py-4">
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

                      <td className="px-4 py-4">
                        <div className="font-mono text-xs text-slate-600">
                          {result?.status ?? "―"}
                        </div>
                        <div className="mt-1">
                          <Link
                            href={guideHref}
                            className="text-[10px] font-bold text-sky-600 underline underline-offset-2 hover:text-sky-700"
                          >
                            解説 →
                          </Link>
                        </div>
                      </td>

                      <td className="px-4 py-4 font-mono text-xs text-slate-500">
                        {result?.responseTime != null
                          ? `${result.responseTime}ms`
                          : "―"}
                      </td>

                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => checkOne(site)}
                          disabled={isLoading || checkingAll}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-600 hover:border-slate-400 shadow-sm transition-all disabled:opacity-50"
                        >
                          {isLoading ? "..." : "再チェック"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
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