"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdSenseBlock } from "@/components/AdSenseBlock";
import { SITE } from "@/lib/siteMeta";
import { STATUS_SITES } from "@/lib/statusSites";


type CheckResult = {
  online: boolean;
  status: number | null;
  responseTime: number | null;
  timestamp: string;
  error?: string;
  checkedUrl?: string;
};

export default function HomeClient() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);

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

      if (data.checkedUrl) {
        setUrl(data.checkedUrl);
      }
    } catch {
      setResult({
        online: false,
        status: null,
        responseTime: null,
        timestamp: new Date().toLocaleString("ja-JP", {
          timeZone: "Asia/Tokyo",
        }),
        error: "チェック中にエラーが発生しました。時間をおいて再度お試しください。",
      });
    }

    setLoading(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCheck();
  };

  const statusLabel = result?.online ? "オンライン" : "オフライン";

  return (
    <main className="flex-1 bg-slate-50 flex flex-col">
      <div className="mx-auto max-w-xl w-full px-4 py-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center">
          このサイト、今見れますか？（接続チェック）
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 text-center">
          {SITE.tagline}
        </p>

        <section aria-labelledby="site-check-section" className="mt-8">
          <h2
            id="site-check-section"
            className="text-sm font-semibold text-slate-900 mb-3"
          >
            URLを入力してチェック
          </h2>

          <div className="flex gap-2">
            <input
              type="text"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="例：google.com / https://example.com"
              className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-sky-500"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button
              onClick={handleCheck}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "確認中..." : "チェックする"}
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            入力例： <span className="font-medium">example.com</span> /{" "}
            <span className="font-medium">https://example.com</span> /{" "}
            <span className="font-medium">https://sub.example.com</span>
          </p>

          <div className="mt-6 rounded-xl bg-white p-4 shadow-sm text-sm text-slate-700 min-h-[110px]">
            {!result && (
              <div className="space-y-2">
                <p className="text-slate-500">
                  まだ結果がありません。上の入力欄にURLを入力して「チェックする」を押してください。
                </p>
                <p className="text-xs text-slate-500">
                  「自分だけ見れないのか」「相手側が落ちているのか」を切り分ける目安になります。
                </p>
              </div>
            )}

            {result && (
              <div className="space-y-2">
                {result.checkedUrl && (
                  <p className="text-xs text-slate-500 break-all">
                    チェックしたURL：{result.checkedUrl}
                  </p>
                )}

                {result.error && (
                  <p className="text-xs text-red-500">{result.error}</p>
                )}

                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold text-slate-900">
                    結果：
                    <span
                      className={
                        result.online ? "text-green-600" : "text-red-600"
                      }
                    >
                      {" "}
                      {statusLabel}
                    </span>
                  </p>
                </div>

                <div className="text-sm text-slate-700 space-y-1">
                  <p>HTTPステータス：{result.status ?? "―"}</p>
                  <p>応答時間：{result.responseTime ?? "―"} ms</p>
                  <p>最終チェック：{result.timestamp}</p>
                </div>

                {!result.online && !result.error && (
                  <p className="text-xs text-slate-500">
                    オフライン表示でも、地域や回線により一時的に失敗する場合があります。数十秒おいて再チェックしてください。
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 text-xs text-slate-500 space-y-1">
            <p>※ 本ツールは、サーバー側から指定URLへの接続を試み、応答状況を簡易表示します。</p>
            <p>※ 結果は目安です。継続監視や通知が必要な場合は、専門の監視サービスをご利用ください。</p>
          </div>
        </section>

        <div className="mt-6">
          <AdSenseBlock />
        </div>

        <section className="mt-10">
          <h2 className="mb-4 text-sm font-semibold text-slate-900">
            人気の障害チェック
          </h2>

          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:grid-cols-3">
            {STATUS_SITES.slice(0, 18).map((s) => (
              <li key={s.id}>
                <Link href={`/status/${s.id}`} className="text-sky-600 underline">
                  {s.name} 障害
                </Link>
              </li>
            ))}
          </ul>

        </section>

        <div className="mt-10 text-center">
          <Link
            href="/status"
            className="text-sky-600 text-sm underline hover:text-sky-700"
          >
            人気サービスの障害・稼働状況一覧を見る →
          </Link>
        </div>

        {/* Added: content layer for AdSense + SEO (non-invasive) */}
        <section className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-700">
          <h2 className="text-base font-semibold text-slate-900 mb-4">
            このツールで分かること
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700">
            <p>
              {SITE.name}は、指定したURLに対して「いま接続できるか」を確認するための簡易チェックです。
              まずは“自分の環境だけの問題か、相手側の障害っぽいか”を切り分ける第一歩として使えます。
            </p>
            <p>
              ただし、地域差・回線状況・DNS・CDN/WAFの制限などにより、実際の体感と一致しない場合があります。
              詳しく知りたい方は、以下もあわせてご覧ください。
            </p>

            <ul className="list-disc list-inside space-y-1">
              <li>
                <Link href="/how-it-works" className="text-sky-600 underline">
                  仕組み（何を確認しているか／結果の見方）
                </Link>
              </li>
              <li>
                <Link
                  href="/what-is-website-downtime"
                  className="text-sky-600 underline"
                >
                  サイトが落ちるとは（原因・基本の確認手順）
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sky-600 underline">
                  FAQ（よくある質問）
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
