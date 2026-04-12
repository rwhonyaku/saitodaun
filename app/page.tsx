// app/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import HomeClient from "@/components/HomeClient";
import { SITE } from "@/lib/siteMeta";

export const metadata: Metadata = {
  title: "接続チェック",
  description: SITE.description,
  alternates: { canonical: "/" },
};

const popularServices = [
  { href: "/services/youtube", label: "YouTube" },
  { href: "/services/line", label: "LINE" },
  { href: "/services/instagram", label: "Instagram" },
  { href: "/services/amazon", label: "Amazon" },
  { href: "/services/chatgpt", label: "ChatGPT" },
  { href: "/services/x", label: "X" },
  { href: "/services/netflix", label: "Netflix" },
  { href: "/services/discord", label: "Discord" },
];

const commonCauses = [
  { href: "/outages/japan", label: "サービス側の障害" },
  { href: "/troubleshooting-dns", label: "DNSエラー" },
  { href: "/troubleshooting-guide", label: "インターネット接続の問題" },
  { href: "/troubleshooting-guide", label: "ブラウザや端末の問題" },
  { href: "/errors", label: "HTTPステータスコードエラー" },
];

const troubleshootingLinks = [
  { href: "/troubleshooting-guide", label: "サイトが見れないときの確認手順" },
  { href: "/troubleshooting-dns", label: "DNSエラーの原因と対処法" },
  { href: "/errors", label: "HTTPエラー一覧" },
  { href: "/outages/japan", label: "ネット障害かどうかの切り分け" },
  { href: "/faq", label: "よくある質問" },
];

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="flex-1 bg-slate-50 flex flex-col">
          <div className="mx-auto max-w-xl w-full px-4 py-10">
            <div className="rounded-xl border border-slate-200 p-8 text-center bg-white">
              <p className="text-sm text-slate-500 font-medium">読み込み中...</p>
            </div>
          </div>
        </main>
      }
    >
      <main className="flex-1 bg-slate-50 flex flex-col">
        <div className="mx-auto max-w-xl w-full px-4 pt-8 pb-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="space-y-3">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  サイトがダウンしているか確認（接続チェックツール）
                </h1>
                <p className="text-sm leading-7 text-slate-700">
                  URLを入力すると、そのサイト自体で障害が起きているのか、それとも自分のネットワーク環境やDNS、ブラウザ、端末側の問題なのかを確認しやすくなります。
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-slate-800">
                    よくある接続トラブル
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/outages/japan"
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm underline hover:bg-slate-50"
                    >
                      ネット障害？（2分で切り分け） →
                    </Link>
                    <Link
                      href="/services"
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm underline hover:bg-slate-50"
                    >
                      サービス別トラブル（YouTube/LINE等） →
                    </Link>
                    <Link
                      href="/troubleshooting-dns"
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm underline hover:bg-slate-50"
                    >
                      DNSトラブルの確認方法 →
                    </Link>
                    <Link
                      href="/errors"
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm underline hover:bg-slate-50"
                    >
                      HTTPエラーの原因 →
                    </Link>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                リアルタイムの接続チェックと、トラブル原因の解説を組み合わせて確認できます。
              </p>
            </div>
          </div>
        </div>

        <HomeClient />

        <div className="mx-auto max-w-xl w-full px-4 py-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              よく確認されるサービス
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {popularServices.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm underline hover:bg-slate-50"
                >
                  {service.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-xl w-full px-4 pb-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              サイトが見れない主な原因
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              {commonCauses.map((cause) => (
                <li key={`${cause.href}-${cause.label}`} className="flex gap-2">
                  <span className="text-slate-400">•</span>
                  <Link href={cause.href} className="underline hover:text-slate-900">
                    {cause.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-xl w-full px-4 pb-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              サイトダウンについて
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <p>
                サイトダウンは、ウェブサイトやオンラインサービスの接続トラブルを調べるための診断サイトです。URLの接続チェックを通じて、そのサイト自体で障害が起きているのか、それとも自分の回線・DNS・ブラウザ・端末側の問題なのかを切り分けやすくしています。
              </p>
              <p>
                「サイトが見れない」「サイトが開かない」「ネットはあるのに特定のサイトだけ接続できない」といった状況の原因を調べたいときに、確認の入口として使いやすい構成にしています。
              </p>
              <p>
                YouTube、LINE、Instagram、Amazon、ChatGPTなど主要サービスの障害状況や、「開かない」「使えない」「読み込めない」といった症状別の確認ポイントも案内しています。
              </p>
              <p>
                さらに、DNSエラーやHTTPステータスコード、各種接続エラーの原因と対処法もわかりやすく整理し、次に何を確認すべきかを判断しやすい構成にしています。サイトが見れないときの切り分けや、サービスごとの不具合確認にご活用ください。
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-xl w-full px-4 pb-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              接続トラブルの調べ方
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {troubleshootingLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm underline hover:bg-slate-50"
                >
                  {item.label} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  );
}