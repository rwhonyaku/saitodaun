import type { Metadata } from "next";
import { SITE } from "@/lib/siteMeta";

export const metadata: Metadata = {
  title: "利用規約",
  description: `${SITE.name}の利用条件（免責・禁止事項等）を定めています。`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-slate-800 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-6 border-b pb-2">利用規約</h1>

      <p className="mb-6">
        この利用規約（以下「本規約」）は、{SITE.name}（以下「当サイト」）が提供するウェブサイト接続確認サービスの利用条件を定めるものです。ユーザーが当サイトを利用することで、本規約に完全に同意したものとみなされます。
      </p>

      <h2 className="font-semibold text-lg mt-8 mb-3">1. サービスの目的と性質</h2>
      <p className="mb-4">
        当サイトは、インターネット上の特定サービスへの到達性を第三者視点から簡易的に判定するツールです。結果はリクエスト時点の通信状態に基づく「目安」であり、当該サービスの公式な稼働状況や品質を保証するものではありません。
      </p>

      <h2 className="font-semibold text-lg mt-8 mb-3">2. 禁止事項</h2>
      <p className="mb-4">ユーザーは、当サイトの利用にあたり以下の行為を行ってはなりません。</p>
      <ul className="list-disc list-inside mb-6 space-y-2 pl-2">
        <li>自動化スクリプトやボット等を用いた過度なリクエスト送信。</li>
        <li>当サイトのサーバーまたはネットワークの機能を破壊・妨害する行為。</li>
        <li>当サイトの運営を妨げ、またはその恐れのある行為。</li>
        <li>当サイトの結果を悪用し、特定のサービスに対して虚偽の情報を流布する行為。</li>
      </ul>

      <h2 className="font-semibold text-lg mt-8 mb-3">3. 免責事項</h2>
      <p className="mb-4">
        当サイトは、システムの保守、通信回線の障害、火災、停電、天災、その他運用上または技術上の理由により、予告なく本サービスの提供を中断または停止することがあります。これによりユーザーに生じた損害について、当サイトは一切の責任を負いません。
      </p>

      <h2 className="font-semibold text-lg mt-8 mb-3">4. 知的財産権</h2>
      <p className="mb-4">
        当サイトに含まれる文章、画像、デザイン等の知的財産権は、当サイトまたは正当な権利者に帰属します。許可なく無断転載・複製・改変することを禁じます。
      </p>

      <h2 className="font-semibold text-lg mt-8 mb-3">5. 準拠法および裁判管轄</h2>
      <p className="mb-4">
        本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当サイト運営者の所在地を管轄する裁判所を専属的合意管轄とします。
      </p>

      <footer className="mt-10 pt-6 border-t">
        <p className="text-xs text-slate-500">最終更新日：2026-02-20</p>
      </footer>
    </div>
  );
}