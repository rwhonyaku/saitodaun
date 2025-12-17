"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getSiteById } from "@/lib/statusSites";

type CheckResult = {
  online: boolean;
  status: number | null;
  responseTime: number | null;
  timestamp: string;
  error?: string;
  checkedUrl?: string;
};

export default function StatusClient() {
  const params = useParams();

  // Next's useParams can be string | string[] depending on route usage.
  const id = useMemo(() => {
    const raw = (params as Record<string, string | string[] | undefined>)?.id;
    if (typeof raw === "string") return raw;
    if (Array.isArray(raw)) return raw[0] ?? "";
    return "";
  }, [params]);

  const site = useMemo(() => (id ? getSiteById(id) : undefined), [id]);

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

  // サイトが見つからない場合
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
    : result.online
    ? "オンライン"
    : "オフライン";

  const statusColor = !result
    ? "text-slate-400"
    : result.online
    ? "text-green-600"
    : "text-red-600";

  return (
    <main className="flex-1 bg-slate-50">
      <div className="mx-auto max-w-xl px-4 py-10 text-sm text-slate-700">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {site.name} は今落ちてる？（障害・稼働状況チェック）
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              「{site.name} が見れない」「障害が出てる？」という時に、いま接続できるかを簡易チェックします。
            </p>
          </div>

          <Link
            href="/status"
            className="shrink-0 text-xs text-sky-600 underline hover:text-sky-700"
          >
            一覧に戻る →
          </Link>
        </div>

        <p className="mb-4 text-xs text-slate-500 break-all">
          チェック対象URL：{site.url}
        </p>

        {/* Result box */}
        <div className="rounded-xl bg-white p-4 shadow-sm min-h-[120px]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-base font-semibold text-slate-900">
              結果：
              <span className={statusColor}> {statusLabel}</span>
            </p>

            <button
              onClick={runCheck}
              disabled={loading}
              className="rounded-md border border-slate-300 px-3 py-1 text-xs hover:bg-slate-50 disabled:opacity-60"
            >
              {loading ? "チェック中..." : "再チェック"}
            </button>
          </div>

          {loading && (
            <p className="mt-2 text-xs text-slate-500">チェック中です...</p>
          )}

          {!loading && !result && (
            <p className="mt-2 text-xs text-slate-500">
              まだ結果がありません。しばらくお待ちください。
            </p>
          )}

          {result && (
            <div className="mt-3 space-y-1">
              {result.error && (
                <p className="text-xs text-red-500">{result.error}</p>
              )}
              {result.checkedUrl && (
                <p className="text-[11px] text-slate-500 break-all">
                  実際にチェックしたURL：{result.checkedUrl}
                </p>
              )}
              <p className="text-xs">HTTPステータス：{result.status ?? "―"}</p>
              <p className="text-xs">
                応答時間：
                {result.responseTime != null ? ` ${result.responseTime} ms` : " ―"}
              </p>
              <p className="text-[11px] text-slate-500">
                最終チェック：{result.timestamp}
              </p>

              {!result.online && !result.error && (
                <p className="mt-2 text-[11px] text-slate-500">
                  オフライン表示でも、一時的な通信エラーや地域差で失敗することがあります。
                  数十秒おいて再チェックしてください。
                </p>
              )}
            </div>
          )}
        </div>

        {/* Next steps */}
        <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            次に何をすればいい？
          </h2>
          <ul className="mt-3 space-y-2 text-xs text-slate-600 list-disc pl-5">
            <li>
              <span className="font-medium text-slate-700">オフラインの場合：</span>
              数十秒おいて再チェック → 別回線（Wi-Fi/4G）でも確認 → 公式ステータスやSNSも確認。
            </li>
            <li>
              <span className="font-medium text-slate-700">オンラインの場合：</span>
              自分の回線、DNS、ブラウザ拡張、社内ネットワーク制限（FW/WAF）などの可能性があります。
            </li>
            <li>
              自分のサイトや別URLも確認したい場合は、URL入力の接続チェックも使えます。
            </li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="text-xs text-sky-600 underline hover:text-sky-700"
            >
              URL入力でサイト接続チェック →
            </Link>
            <Link
              href="/status"
              className="text-xs text-sky-600 underline hover:text-sky-700"
            >
              他サービスの一覧へ →
            </Link>
          </div>
        </section>

        {/* Service info (NEW) */}
        <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            このサービスについて
          </h2>

          <p className="mt-3 text-xs text-slate-600 leading-relaxed">
            {site.serviceNote}
          </p>

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

        {/* Mini FAQ */}
        <section className="mt-8 border-t border-slate-200 pt-6">
          <h2 className="text-sm font-semibold text-slate-900 mb-3">
            よくある質問
          </h2>
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <p className="font-semibold">
                Q. 「{site.name} 障害」「{site.name} 落ちてる」で検索したら、このページで分かりますか？
              </p>
              <p className="mt-1 text-slate-600">
                本ページは「このサーバーから接続できるか」を簡易チェックします。
                公式が障害を発表していなくても、地域差や一時的な障害で接続できないケースがあります。
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

        <p className="mt-6 text-[11px] text-slate-500">
          ※ このページは {site.name} の稼働状況を確認するための簡易チェックです。継続監視・通知を保証するものではありません。
        </p>
      </div>
    </main>
  );
}
