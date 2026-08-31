// app/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import HomeClient from "@/components/HomeClient";
import HotOutages from "@/components/HotOutages";

export const metadata: Metadata = {
  title: "サイトダウン確認ツール｜障害・接続エラーをチェック",
  description:
    "URLを入力してサイトが落ちているか、接続エラー・DNS・HTTPエラーかを確認。主要サービスの障害状況も見ながら、自分側の問題か整理できます。",
  alternates: {
    canonical: "/",
    languages: {
      "ja-JP": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
};

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
          <div className="mx-auto w-full max-w-5xl px-4 py-8">
            <div className="h-[420px] animate-pulse rounded-3xl border border-slate-800 bg-slate-950 p-8" role="status" aria-label="接続確認ツールを読み込んでいます">
              <div className="mx-auto mt-12 h-6 w-40 rounded-full bg-white/10" />
              <div className="mx-auto mt-6 h-12 max-w-xl rounded-xl bg-white/10" />
              <div className="mx-auto mt-8 h-14 max-w-3xl rounded-xl bg-white/10" />
            </div>
          </div>
        </main>
      }
    >
      <main className="flex-1 bg-slate-50 flex flex-col">
        <HomeClient />

        <HotOutages />

        <div className="mx-auto w-full max-w-5xl px-4 pb-4">
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

        <div className="mx-auto w-full max-w-5xl px-4 pb-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              サイトが見れない主な原因
            </h2>
            <ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-700 sm:grid-cols-2">
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

        <div className="mx-auto w-full max-w-5xl px-4 pb-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              サイトダウンについて
            </h2>
            <div className="mt-4 max-w-3xl space-y-3 text-sm leading-7 text-slate-700">
              <p>
                サイトダウンは、ウェブサイトやオンラインサービスの接続トラブルを調べるための診断サイトです。URLの接続チェックを通じて、そのサイト自体で障害が起きているのか、それとも自分の回線・DNS・ブラウザ・端末側の問題なのかを見分けやすくしています。
              </p>
              <p>
                YouTube、LINE、Instagram、Amazon、ChatGPTなどの状況に加え、DNS・HTTP・端末別の確認手順へ案内します。「特定サイトだけ開かない」「一部機能だけ使えない」ときも、次に確認する項目を選べます。
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-5xl px-4 pb-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              接続トラブルの調べ方
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
