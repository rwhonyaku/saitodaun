"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { STATUS_SITES, type SiteConfig } from "@/lib/statusSites";
import { AdSenseBlock } from "@/components/AdSenseBlock";

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
          error: "チェック中にエラーが発生しました。時間をおいて再度お試しください。",
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
      <div className="mx-auto max-w-3xl w-full px-4 py-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              主要サービスの障害・稼働状況（ステータス）一覧
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              「落ちてる？障害？」を素早く切り分けるための簡易チェックです。
              まずは気になるサービスを選ぶか、一覧を一括チェックできます。
            </p>
          </div>

          <Link
            href="/"
            className="shrink-0 text-xs text-sky-600 underline hover:text-sky-700"
          >
            トップに戻る →
          </Link>
        </div>

        <section className="mt-6">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">
            よく確認されるサービス
          </h2>
          <div className="flex flex-wrap gap-2">
            {quickLinks.map((s) => (
              <Link
                key={s.id}
                href={`/status/${s.id}`}
                className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
              >
                {s.name} →
              </Link>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            個別ページでは、そのサービス専用のステータス確認（説明・リンク）をまとめています。
          </p>
        </section>

        <div className="mt-6 flex gap-3 flex-wrap items-center">
          <button
            onClick={checkAll}
            disabled={checkingAll}
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {checkingAll ? "一括チェック中..." : "全て一括でチェックする"}
          </button>
          <p className="text-[11px] text-slate-500">
            ★ を押すと、お気に入りのサービスを上部に固定できます。
          </p>
        </div>

        <div className="mt-6">
          <AdSenseBlock />
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="min-w-full text-sm text-left text-slate-700">
            <thead className="bg-slate-100 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-2 w-10 text-center">★</th>
                <th className="px-4 py-2">サービス</th>
                <th className="px-4 py-2">URL</th>
                <th className="px-4 py-2">状態</th>
                <th className="px-4 py-2">HTTP</th>
                <th className="px-4 py-2">応答時間</th>
                <th className="px-4 py-2 text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {sortedSites.map((site) => {
                const result = results[site.id] || null;
                const isLoading = loading[site.id] || false;

                const statusLabel = result
                  ? result.online
                    ? "オンライン"
                    : "オフライン"
                  : "未チェック";

                const statusColor = !result
                  ? "text-slate-400"
                  : result.online
                  ? "text-green-600"
                  : "text-red-600";

                return (
                  <tr key={site.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 text-center align-middle">
                      <button
                        type="button"
                        onClick={() => toggleFavorite(site.id)}
                        className="text-lg leading-none"
                        aria-label="お気に入りに追加"
                      >
                        {isFavorite(site.id) ? "★" : "☆"}
                      </button>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <Link
                        href={`/status/${site.id}`}
                        className="text-sky-600 hover:text-sky-700 underline"
                      >
                        {site.name}
                      </Link>
                      <div className="text-[11px] text-slate-500 mt-1">
                        専用ページで詳細を見る
                      </div>
                    </td>

                    <td className="px-4 py-3 text-xs text-slate-500 break-all">
                      {site.url}
                    </td>

                    <td className="px-4 py-3">
                      <span className={statusColor}>{statusLabel}</span>
                      {result?.error && (
                        <div className="text-[11px] text-red-500 mt-1">
                          {result.error}
                        </div>
                      )}
                      {result?.timestamp && (
                        <div className="text-[11px] text-slate-500 mt-1">
                          最終チェック：{result.timestamp}
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3 text-xs">{result?.status ?? "―"}</td>

                    <td className="px-4 py-3 text-xs">
                      {result?.responseTime != null
                        ? `${result.responseTime} ms`
                        : "―"}
                    </td>

                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => checkOne(site)}
                        disabled={isLoading || checkingAll}
                        className="rounded-md border border-slate-300 px-3 py-1 text-xs hover:bg-slate-50 disabled:opacity-60"
                      >
                        {isLoading ? "チェック中..." : "チェック"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-[11px] text-slate-500">
          ※ 結果はサーバー側からの簡易的な接続チェックです。地域差、回線状況、アクセス制限などにより、
          実際の体感と異なる場合があります。
        </p>

        <section className="mt-10 border-t border-slate-200 pt-6">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">
            よくある質問
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div>
              <p className="font-semibold">Q. 公式ステータスと違うことがありますか？</p>
              <p className="mt-1 text-slate-600">
                あります。公式は「全体の障害状況」、本ページは「このサーバーから接続できるか」の確認です。
                地域差や一時的な通信エラーで結果が異なる場合があります。
              </p>
            </div>
            <div>
              <p className="font-semibold">Q. どれを見ればいいか分かりません。</p>
              <p className="mt-1 text-slate-600">
                まずは「よく確認されるサービス」から選び、該当がなければ一覧検索（ブラウザの検索機能）や
                お気に入り固定を使うのが最短です。
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
