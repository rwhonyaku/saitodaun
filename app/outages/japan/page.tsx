// app/outages/japan/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "日本でネット障害？（広域障害か自分側か）",
  description:
    "「どのサイトも見れない」「ネットが繋がらない」時に、広域障害の可能性と自分側（回線/DNS/端末）の確認を2分で完了できるガイドです。主要サービスの障害確認リンクもまとめています。",
  alternates: { canonical: "/outages/japan" },
};

type ServiceCard = {
  id: string;
  name: string;
  examples: string[];
};

const TOP_SERVICES: ServiceCard[] = [
  { id: "youtube", name: "YouTube", examples: ["youtube 見れない", "動画が再生できない"] },
  { id: "line", name: "LINE", examples: ["line 開かない", "メッセージが送れない"] },
  { id: "x", name: "X（旧Twitter）", examples: ["twitter 開かない", "タイムラインが更新されない"] },
  { id: "instagram", name: "Instagram", examples: ["instagram 読み込めない", "ストーリーが見れない"] },
  { id: "amazon", name: "Amazon", examples: ["amazon ログインできない", "購入できない"] },
  { id: "chatgpt", name: "ChatGPT", examples: ["chatgpt 使えない", "応答しない"] },
  { id: "netflix", name: "Netflix", examples: ["netflix 再生できない", "途中で止まる"] },
  { id: "gmail", name: "Gmail", examples: ["gmail 送れない", "受信できない"] },
  { id: "google", name: "Google", examples: ["google 開けない", "検索できない"] },
  { id: "discord", name: "Discord", examples: ["discord 繋がらない", "通話が途切れる"] },
];

type ErrorLink = { slug: string; label: string };

const COMMON_ERRORS: ErrorLink[] = [
  { slug: "502-bad-gateway", label: "502 Bad Gateway" },
  { slug: "503-service-unavailable", label: "503 Service Unavailable" },
  { slug: "504-gateway-timeout", label: "504 Gateway Timeout" },
  { slug: "cloudflare-520", label: "Cloudflare 520" },
  { slug: "cloudflare-522", label: "Cloudflare 522" },
  { slug: "cloudflare-524", label: "Cloudflare 524" },
  { slug: "dns-probe-finished-nxdomain", label: "DNS_PROBE_FINISHED_NXDOMAIN" },
  { slug: "err-connection-timed-out", label: "ERR_CONNECTION_TIMED_OUT" },
  { slug: "connection-reset", label: "ERR_CONNECTION_RESET" },
  { slug: "err-connection-refused", label: "ERR_CONNECTION_REFUSED" },
  { slug: "ssl-handshake-failed", label: "SSL_HANDSHAKE_FAILED" },
];

const OFFICIAL_SOURCES = [
  { label: "Cloudflare Status", href: "https://www.cloudflarestatus.com/" },
  { label: "Google Workspace Status Dashboard", href: "https://www.google.com/appsstatus/dashboard/" },
  { label: "OpenAI Status", href: "https://status.openai.com/" },
];

export default function OutagesJapanPage() {
  return (
    <EvergreenPageShell
      h1="日本でネット障害？（広域障害か自分側かを2分で確認）"
      lead={[
        "「どのサイトも見れない」「ネットが繋がらない」と感じた時に、広域障害の可能性と自分側（回線/DNS/端末）の問題を最短で確認するためのページです。",
        "このページは日本全体の障害を断定しません。あなたの状況を整理して、次に見るべきページへ迷わず誘導するための“入口”です。",
      ]}
      updatedAt="2026-03-05"
      showDefaultLinks={true}
      sections={[
        {
          type: "div",
          title: "まず最初に：2分で原因を確認する",
          body: [
            <div key="intro" className="space-y-3">
              <p>
                ここでやることは「直す」ではなく、<b>どこに原因があるか</b>を確認することです。
                確認ができれば、次に行くページが一気に絞れます。
              </p>

              <div className="flex flex-wrap gap-2">
                {["広域障害の可能性", "自分側（回線/DNS）", "端末/ブラウザ/アプリ", "特定サービスだけ"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <Link className="text-sm underline" href="/services">
                  特定のサービスだけダメ（YouTube/LINE等）→
                </Link>
                <Link className="text-sm underline" href="/troubleshooting-dns">
                  どのサイトもダメ（DNS/回線を疑う）→
                </Link>
                <Link className="text-sm underline" href="/">
                  URLを直接チェックしたい（メインツール）→
                </Link>
              </div>

              <p className="text-xs text-slate-500">
                ※「日本全体が障害」と断定せず、あなたの状況を最短で分類するためのガイドです。
              </p>
            </div>,
          ],
        },

        {
          type: "list",
          title: "確認手順（上から順番に）",
          items: [
            <>
              <b>Step 1：Wi-Fi ↔ モバイル通信に切り替える</b>
              <div className="mt-1 text-slate-600">
                片方で復旧するなら「Wi-Fi側（ルーター/DNS/VPN/回線）」の可能性が上がります。次は{" "}
                <Link className="underline" href="/troubleshooting-dns">
                  DNSトラブル対処
                </Link>
                へ。
              </div>
            </>,
            <>
              <b>Step 2：別端末で試す（スマホ/PC/タブレット）</b>
              <div className="mt-1 text-slate-600">
                端末で差が出るなら、端末/アプリ/ブラウザ寄り。特定サービスだけなら{" "}
                <Link className="underline" href="/services">
                  サービス別トラブル
                </Link>
                へ。
              </div>
            </>,
            <>
              <b>Step 3：VPN/プロキシをOFF（使っている場合）</b>
              <div className="mt-1 text-slate-600">
                企業ネットワークや一部VPNで不安定化することがあります。OFFで改善するなら経路/フィルタ寄りです。
              </div>
            </>,
            <>
              <b>Step 4：エラー表示が出ているなら、エラーから最短で当てる</b>
              <div className="mt-1 text-slate-600">
                502/503/504、Cloudflare、DNS系の表示が出ているなら分類できます。{" "}
                <Link className="underline" href="/status-codes">
                  ステータスコード一覧
                </Link>{" "}
                /{" "}
                <Link className="underline" href="/troubleshooting-dns">
                  DNSトラブル対処
                </Link>
                へ。
              </div>
            </>,
          ],
        },

        {
          type: "div",
          title: "影響が出やすい主要サービス（すぐ確認）",
          body: [
            <>
              <p>
                「サービスは障害？それとも自分側？」を最短で判定するための入口です。該当するサービスから入ってください。
              </p>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {TOP_SERVICES.map((s) => (
                  <div key={s.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-base font-bold text-slate-900">{s.name}</div>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                          {s.examples.map((ex) => (
                            <li key={ex}>{ex}</li>
                          ))}
                        </ul>
                      </div>
                      <span className="rounded-full border border-slate-200 px-2 py-1 text-[10px] text-slate-600">
                        /{s.id}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-3 text-sm">
                      <Link className="underline" href={`/services/${s.id}/not-working`}>
                        不具合ガイド →
                      </Link>
                      <Link className="underline" href={`/services/${s.id}`}>
                        サービス入口 →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm">
                <Link className="underline" href="/services">
                  すべてのサービス一覧へ →
                </Link>
              </div>
            </>,
          ],
        },

        {
          type: "div",
          title: "障害時によく出るエラー（ここから最短で当てる）",
          body: [
            <>
              <p>
                表示されているエラーが分かるなら、原因特定が一気に早くなります。該当するものだけ開いてください。
              </p>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {COMMON_ERRORS.map((e) => (
                  <Link
                    key={e.slug}
                    href={`/errors/${e.slug}`}
                    className="rounded-xl border border-slate-200 bg-white p-3 text-sm underline hover:bg-slate-50"
                  >
                    {e.label}
                  </Link>
                ))}
              </div>
            </>,
          ],
        },

        {
          type: "list",
          title: "公式情報（参考）",
          items: OFFICIAL_SOURCES.map((s) => (
            <a key={s.href} className="underline" href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          )),
        },

        {
          type: "note",
          title: "次に行くべきページ（最短）",
          body: [
            <>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link className="underline" href="/">
                  URL疎通チェック（メインツール）
                </Link>
                <Link className="underline" href="/services">
                  サービス別トラブル
                </Link>
                <Link className="underline" href="/troubleshooting-dns">
                  DNSトラブル対処
                </Link>
                <Link className="underline" href="/status-codes">
                  ステータスコード一覧
                </Link>
              </div>
            </>,
          ],
        },
      ]}
    />
  );
}
