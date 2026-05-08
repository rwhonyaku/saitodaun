import type { Metadata } from "next";
import { SITE } from "@/lib/siteMeta";

export const metadata: Metadata = {
  title: "プライバシーポリシー | サイトダウン",
  description: `${SITE.name}における情報の取り扱い、広告・解析・アフィリエイトに関する方針を掲載しています。`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-sm leading-relaxed text-slate-800">
      <h1 className="mb-6 border-b pb-2 text-2xl font-bold">プライバシーポリシー</h1>

      <p className="mb-6">
        {SITE.name}
        （以下「当サイト」）は、ユーザーのプライバシー保護を重視しています。当サイトが提供する接続チェックサービスにおいて、氏名、住所、電話番号等の直接的な個人情報を取得することはありません。
      </p>

      <h2 className="mb-3 mt-8 text-lg font-semibold">1. 自動的に収集される情報</h2>
      <p className="mb-4">
        当サイトの安定運用、セキュリティ確保、およびサービス品質向上のため、以下の技術的情報が自動的に記録される場合があります。
      </p>
      <ul className="mb-4 list-disc space-y-1 pl-5 text-slate-600">
        <li>IPアドレス</li>
        <li>ブラウザの種類、OS、デバイス情報</li>
        <li>アクセス日時および閲覧状況</li>
        <li>リファラ情報</li>
      </ul>

      <h2 className="mb-3 mt-8 text-lg font-semibold">2. 広告配信と Cookie について</h2>
      <p className="mb-4">
        当サイトでは、第三者配信の広告サービスを利用する場合があります。これらの事業者は、ユーザーの興味に応じた広告配信や配信計測のために Cookie 等を利用することがあります。Cookie により個人を直接特定する情報を取得するものではありません。
      </p>

      <h2 className="mb-3 mt-8 text-lg font-semibold">3. アクセス解析について</h2>
      <p className="mb-4">
        当サイトでは、利用状況の把握のために Google アナリティクスを使用しています。Google アナリティクスは Cookie を利用してデータを収集しますが、収集されるデータは匿名化されており、個人を特定するものではありません。
      </p>

      <h2 className="mb-3 mt-8 text-lg font-semibold">4. アフィリエイトプログラムについて</h2>
      <p className="mb-4">
        当サイトは、もしもアフィリエイト等のアフィリエイトプログラムに参加しています。紹介リンクが掲載される場合は、必要に応じてPR表記や広告・アフィリエイト表記を行います。
      </p>

      <h2 className="mb-3 mt-8 text-lg font-semibold">5. 免責事項</h2>
      <p className="mb-4">
        当サイトでは、可能な限り正確な情報を掲載するよう努めていますが、その正確性や完全性を保証するものではありません。当サイトの情報に基づいて生じた損害等について、一切の責任を負いかねます。
      </p>

      <h2 className="mb-3 mt-8 text-lg font-semibold">6. ポリシーの変更</h2>
      <p className="mb-4">
        本ポリシーは、法令改正や運営方針の変更に応じて、予告なく見直す場合があります。
      </p>

      <footer className="mt-10 border-t pt-6">
        <p className="text-xs text-slate-500">最終更新日: 2026-05-03</p>
      </footer>
    </div>
  );
}
