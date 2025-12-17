import type { Metadata } from "next";
import { SITE } from "@/lib/siteMeta";

export const metadata: Metadata = {
  title: "サイトが落ちているとは？",
  description: "Webサイトが「落ちている」状態の意味や主な原因について説明します。",
};

export default function WhatIsDowntimePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-slate-800 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">サイトが落ちているとは？</h1>

      <p className="mb-4">
        「サイトが落ちている」とは、Webサイトにアクセスできない、
        または一部の機能が正常に動作しない状態を指します。
      </p>

      <h2 className="font-semibold mt-6 mb-2">よくある症状</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>ページが表示されない（真っ白・エラー表示）</li>
        <li>一部のページや機能だけ使えない</li>
        <li>表示が極端に遅い</li>
        <li>ログインや決済だけ失敗する</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">主な原因</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>サーバー障害・メンテナンス</li>
        <li>アクセス集中による負荷</li>
        <li>DNSやネットワークの問題</li>
        <li>WAF・CDNによる一時的なブロック</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">確認の手順</h2>
      <p className="mb-4">
        まずは自分だけの問題か、サービス全体の障害かを切り分けることが重要です。
        {SITE.name}の接続チェックは、その第一歩として利用できます。
      </p>

      <h2 className="font-semibold mt-6 mb-2">注意点</h2>
      <p className="mb-4">
        本ツールの結果はあくまで目安です。公式発表や複数の情報源を併せて確認してください。
      </p>

      <p className="text-xs text-slate-500 mt-6">最終更新日：2025-12-17</p>
    </div>
  );
}
