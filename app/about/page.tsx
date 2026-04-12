import type { Metadata } from "next";
import { SITE } from "@/lib/siteMeta";

export const metadata: Metadata = {
  title: "このサイトについて | サイトダウン",
  description: `${SITE.name}の運営方針、接続チェックの仕組み、および情報の正確性に関するガイドラインを掲載しています。`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-slate-800 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-6 border-b pb-2">このサイトについて</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">運営目的とミッション</h2>
        <p className="mb-4">
          {SITE.name} は、インターネット利用者が直面する「つながらない」という不安を解消するために構築された、中立的な接続検証ツールです。
          急なサービス停止やアクセス不能が発生した際、それが「サービス側の障害」なのか「利用者自身の環境問題」なのかを第三者視点で切り分けるための客観的なデータを提供することを目的としています。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">接続チェックの技術的仕組み</h2>
        <p className="mb-3">
          当サイトのチェック機能は、ユーザーのブラウザからではなく、**当サイトが管理する外部サーバー**から対象URLに対して直接リクエストを送信します。
        </p>
        <div className="bg-slate-50 p-4 rounded-md mb-4 border border-slate-100">
          <p className="font-medium mb-2">検証プロセス：</p>
          <ul className="list-disc list-inside space-y-1">
            <li>対象URLへのHTTP/HTTPSプロトコルによる疎通確認</li>
            <li>サーバーから返却される「HTTPステータスコード」の解析</li>
            <li>リクエスト送信からレスポンス受領までの応答速度（レイテンシ）の計測</li>
          </ul>
        </div>
        <p>
          これにより、ユーザー個人の端末設定や地域プロバイダーの影響を排除した、「外部からの到達可能性」を可視化します。
        </p>
      </section>

      <section className="mb-8 border-l-4 border-sky-500 pl-4 py-1 bg-sky-50/30">
        <h2 className="text-lg font-semibold mb-3">広告配信と収益について（PR表記）</h2>
        <p className="mb-4">
          {SITE.name} は、すべての機能を無料で提供しています。サイトの維持管理費（サーバー費用・開発費）を賄うため、Googleアドセンスによる広告配信および、もしもアフィリエイト等のアフィリエイトプログラムを利用しています。
        </p>
        <p className="mb-4">
          記事内やツール結果画面にて商品・サービスの紹介を行う場合がありますが、これらはアフィリエイトリンクとなっており、購入や成約時に当サイトに紹介料が支払われる仕組みとなっています。
        </p>
        <p className="text-xs text-slate-500 italic">
          ※アフィリエイトプログラムの利用により、ユーザー側に発生する費用は一切ございません。また、特定のサービスを不当に高く評価することなく、客観的なデータに基づいた運営を徹底しています。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">情報の正確性とE-A-Tへの取り組み</h2>
        <p className="mb-4">
          私たちは、提供する情報の透明性を重視しています。公式発表（ステータスページ等）と当サイトの結果が異なる場合がありますが、これは以下の要因による「事実の差異」であり、誤報ではありません。
        </p>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li><strong>ネットワーク経路：</strong> 特定のデータセンターやCDN（Contents Delivery Network）の経由地点による差異。</li>
          <li><strong>制限事項：</strong> サイト側のセキュリティ設定（WAFやレートリミット）による外部自動チェックの遮断。</li>
          <li><strong>部分的障害：</strong> 「ログインはできるが投稿ができない」といった機能単位の不具合は、外形監視では検知できない場合があります。</li>
        </ul>
        <p>
          当サイトの結果は、あくまで「特定の時点・特定の地点」からの接続可否を示すひとつの参考指標としてご利用ください。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">ご利用にあたっての指針</h2>
        <p className="mb-4">
          本ツールは、簡易的な切り分けを迅速に行うためのユーティリティです。ビジネス上の重要な意思決定や、継続的なインフラ監視を目的としたものではありません。
          公式なサービス稼働状況については、各サービス運営者が提供する公式ステータスページを併せて参照されることを強く推奨します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">プライバシーと安全性</h2>
        <p className="mb-4">
          ユーザーのプライバシー保護を第一に考えています。入力されたURLはリアルタイムの接続チェックにのみ使用され、特定の個人と結びつける形での保存や、第三者への販売は一切行いません。
          クッキーの利用や広告配信に関する詳細は、<a href="/privacy" className="text-blue-600 underline">プライバシーポリシー</a>をご確認ください。
        </p>
      </section>

      <footer className="border-t pt-6 mt-10">
        <p className="text-xs text-slate-500">
          運営：{SITE.name} 運営チーム
        </p>
        <p className="text-xs text-slate-500 mt-1">
          最終更新日：2026-02-22
        </p>
      </footer>
    </div>
  );
}