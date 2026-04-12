import type { Metadata } from "next";
import { SITE } from "@/lib/siteMeta";

export const metadata: Metadata = {
  title: "プライバシーポリシー | サイトダウン",
  description: `${SITE.name}における情報の取り扱い（収集範囲・利用目的・第三者サービス）を定めています。`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-slate-800 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-6 border-b pb-2">プライバシーポリシー</h1>

      <p className="mb-6">
        {SITE.name}（以下「当サイト」）は、ユーザーのプライバシー保護を重要視しています。当サイトが提供する接続チェックサービスにおいて、氏名、住所、電話番号等の直接的な個人情報を取得することはありません。
      </p>

      <h2 className="font-semibold text-lg mt-8 mb-3">1. 自動的に収集される情報</h2>
      <p className="mb-4">
        当サイトの安定運用、セキュリティの確保、およびサービス品質の向上のため、以下の技術的情報が自動的にログとして保存される場合があります。
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1 pl-2 text-slate-600">
        <li>IPアドレス（セキュリティ保護およびスパム防止目的）</li>
        <li>ブラウザの種類、OS、デバイスの識別情報</li>
        <li>アクセス日時および滞在時間</li>
        <li>リファラ（どのサイトから訪問したか）</li>
      </ul>

      <h2 className="font-semibold text-lg mt-8 mb-3">2. 広告配信とCookieについて</h2>
      <p className="mb-4">
        当サイトでは、第三者配信による広告サービス（Googleアドセンス等）を利用しています。これらの広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報「Cookie」（個人を特定する情報は含まれません）を使用することがあります。
      </p>

      <h2 className="font-semibold text-lg mt-8 mb-3">3. アクセス解析ツールについて</h2>
      <p className="mb-4">
        当サイトでは、サイト利用状況の把握のためにGoogleアナリティクスを使用しています。Googleアナリティクスはデータの収集のためにCookieを使用しますが、データは匿名で収集されており、個人を特定するものではありません。
      </p>

      <h2 className="font-semibold text-lg mt-8 mb-3">4. アフィリエイトプログラムについて</h2>
      <p className="mb-4">
        当サイトは、もしもアフィリエイトなどのアフィリエイトプログラムに参加しています。
      </p>
      <p className="mb-4">
        第三者がコンテンツおよび宣伝を提供し、訪問者から直接情報を収集し、訪問者のブラウザにCookieを設定したりこれを認識したりする場合があります。
      </p>

      <h2 className="font-semibold text-lg mt-8 mb-3">5. 免責事項</h2>
      <p className="mb-4">
        当サイトのコンテンツ・情報について、可能な限り正確な情報を掲載するよう努めておりますが、情報の正確性や安全性を保証するものではありません。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
      </p>

      <h2 className="font-semibold text-lg mt-8 mb-3">6. プライバシーポリシーの変更</h2>
      <p className="mb-4">
        当サイトは、法令の制定、改正等により本ポリシーを適宜見直し、予告なく変更する場合があります。
      </p>

      <footer className="mt-10 pt-6 border-t">
        <p className="text-xs text-slate-500">最終更新日：2026-02-22</p>
      </footer>
    </div>
  );
}