// app/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "サイトダウン確認ツール｜障害・接続エラーをチェック",
  description:
    "URLを入力してサイトが落ちているか、接続エラー・DNS・HTTPエラーかを確認。主要サービスの障害状況も見ながら、自分側の問題か整理できます。",
  alternates: { canonical: "/" },
};

const popularStatusLinks = [
  { href: "/status/sites/twitter", label: "X（Twitter）障害", detail: "通信障害・落ちた・繋がらない" },
  { href: "/status/sites/abema", label: "ABEMA障害", detail: "今繋がらない・今日見れない" },
  { href: "/status/sites/chatwork", label: "Chatwork障害", detail: "落ちてる・メッセージ送信" },
  { href: "/status/sites/prime-video", label: "Prime Video障害", detail: "見れない・再生できない" },
  { href: "/status/sites/instagram", label: "Instagram障害", detail: "見れない・投稿できない" },
  { href: "/status/sites/steam", label: "Steam障害", detail: "ログイン・接続できない" },
  { href: "/status/sites/yahoo-japan", label: "Yahoo! JAPAN障害", detail: "繋がらない・一部サービス" },
  { href: "/status/sites/notion", label: "Notion障害", detail: "落ちてる・DB不具合" },
];

const primaryNavLinks = [
  { href: "/status", label: "サービス障害を見る" },
  { href: "/outages/japan", label: "国内の障害を見る" },
  { href: "/services", label: "サービス別に確認" },
  { href: "/troubleshooting-dns", label: "DNSを確認" },
  { href: "/errors", label: "HTTPエラーを見る" },
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
  { href: "/outages/japan", label: "ネット障害かどうかの確認" },
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
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              サイトダウン確認ツール
            </h1>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              サイトやサービスが今使えない時に、広い障害か、自分の回線・DNS・ブラウザ側の接続エラーかを確認できます。
            </p>
          </div>
        </div>

        <HomeClient />

        <div className="mx-auto max-w-xl w-full px-4 py-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              よく確認される障害・不具合
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {popularStatusLinks.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                >
                  <span className="font-semibold underline underline-offset-2">
                    {service.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    {service.detail}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-xl w-full px-4 pb-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              確認したい内容を選ぶ
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {primaryNavLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 underline underline-offset-2 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                >
                  {item.label} →
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
                サイトダウンは、ウェブサイトやオンラインサービスの接続トラブルを調べるための診断サイトです。URLの接続チェックを通じて、そのサイト自体で障害が起きているのか、それとも自分の回線・DNS・ブラウザ・端末側の問題なのかを見分けやすくしています。
              </p>
              <p>
                「サイトが見れない」「サイトが開かない」「ネットはあるのに特定のサイトだけ接続できない」といった状況の原因を調べたいときに、確認の入口として使いやすい構成にしています。
              </p>
              <p>
                YouTube、LINE、Instagram、Amazon、ChatGPTなど主要サービスの障害状況や、「開かない」「使えない」「読み込めない」といった症状別の確認ポイントも案内しています。
              </p>
              <p>
                さらに、DNSエラーやHTTPステータスコード、各種接続エラーの原因と対処法もわかりやすく整理し、次に何を確認すべきかを判断しやすい構成にしています。サイトが見れないときの確認や、サービスごとの不具合確認にご活用ください。
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
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 underline underline-offset-2 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
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
