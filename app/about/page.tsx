import type { Metadata } from "next"
import { SITE } from "@/lib/siteMeta"

export const metadata: Metadata = {
  title: "このサイトについて",
  description: `${SITE.name}の目的、できること、できないこと、利用シーンをまとめています。`,
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-slate-800 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">このサイトについて</h1>

      <p className="mb-4">
        {SITE.name}は、「今このサイトにつながるのか？」をすばやく確認したい方向けのシンプルな接続チェックツールです。
      </p>

      <p className="mb-4">
        ウェブサイトのアドレス（例：google.com など）を入力すると、サーバーへの接続を試み、その結果を「オンライン」「オフライン」としてわかりやすく表示します。
      </p>

      <h2 className="font-semibold mt-6 mb-2">できること</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>いま接続できるかどうかの一次確認（オンライン／オフラインの目安）</li>
        <li>障害の切り分けの第一歩としての簡易チェック</li>
        <li>HTTPステータス（例：200/403/404/5xx など）が取得できる場合は参考表示</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">できないこと（重要）</h2>
      <p className="mb-4">
        本ツールはあくまで簡易チェックです。すべての環境・ネットワークでの状態を保証するものではありません。
        たとえば、ログイン後だけ不具合が出るケース、地域や回線によって見え方が違うケース、WAF/CDNの制限によってブロックされるケースなどは、
        ここでの結果と実際の体感が一致しないことがあります。
      </p>

      <h2 className="font-semibold mt-6 mb-2">想定している利用シーン</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>自分の運営しているサイトが落ちていないか気になるとき</li>
        <li>特定のサービスにアクセスできない原因が、自分だけか確認したいとき</li>
        <li>まずは素早く状況だけ把握したいとき（一次切り分け）</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">プライバシーについて</h2>
      <p className="mb-4">
        入力されたURLの取り扱いは最小限に留める方針です。詳しくは「プライバシー」ページをご確認ください。
      </p>

      <p className="text-xs text-slate-500 mt-6">最終更新日：2025-12-17</p>
    </div>
  )
}
