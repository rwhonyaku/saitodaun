import type { Metadata } from "next";
import { SITE } from "@/lib/siteMeta";

export const metadata: Metadata = {
  title: "このサイトについて | サイトダウン",
  description: `${SITE.name}の運営方針、接続チェックの仕組み、および情報の正確性に関するガイドラインを掲載しています。`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-sm leading-relaxed text-slate-800">
      <h1 className="mb-6 border-b pb-2 text-2xl font-bold">このサイトについて</h1>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">運営目的とミッション</h2>
        <p className="mb-4">
          {SITE.name}
          は、インターネット利用者が直面する「つながらない」という不安を切り分けるための接続確認サイトです。急なサービス停止やアクセス不能が起きた際に、それがサービス側の障害なのか、利用者自身の環境要因なのかを見分けるための参考情報を提供します。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">接続チェックの技術的な仕組み</h2>
        <p className="mb-3">
          当サイトのチェック機能は、ユーザーのブラウザからではなく、当サイトが管理する外部サーバーから対象URLへリクエストを送信して確認します。
        </p>
        <div className="mb-4 rounded-md border border-slate-100 bg-slate-50 p-4">
          <p className="mb-2 font-medium">検証プロセス:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>対象URLへの HTTP / HTTPS リクエスト</li>
            <li>返却された HTTP ステータスコードの確認</li>
            <li>応答時間の計測</li>
          </ul>
        </div>
        <p>
          これにより、個別の端末設定や一部回線条件の影響を受けにくい形で、外部から見た到達性を確認できます。
        </p>
      </section>

      <section className="mb-8 border-l-4 border-sky-500 bg-sky-50/30 py-1 pl-4">
        <h2 className="mb-3 text-lg font-semibold">広告配信と収益について（PR表記）</h2>
        <p className="mb-4">
          {SITE.name}
          は、すべての機能を無料で提供しています。サイトの維持管理費をまかなうため、第三者配信の広告サービスおよびアフィリエイトプログラムを利用する場合があります。
        </p>
        <p className="mb-4">
          記事内や一部ページで商品・サービスを紹介する場合がありますが、必要に応じてPR表記や広告・アフィリエイト表記を付けています。
        </p>
        <p className="text-xs italic text-slate-500">
          クッキーの利用や広告配信に関する詳細は、<a href="/privacy" className="text-blue-600 underline">プライバシーポリシー</a>をご確認ください。
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">情報の正確性と運営方針</h2>
        <p className="mb-4">
          公式発表と当サイトの結果が一致しない場合があります。これは確認地点や時刻、アクセス制限、部分障害などの差によるもので、必ずしも誤りを意味するものではありません。
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>ネットワーク経路:</strong> CDN や経由地点によって見え方が変わることがあります。</li>
          <li><strong>アクセス制限:</strong> WAF やレート制限で外部チェックが遮断されることがあります。</li>
          <li><strong>部分障害:</strong> ログインや投稿だけが失敗するような症状は、外形監視だけでは検知できない場合があります。</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">ご利用にあたって</h2>
        <p className="mb-4">
          本サイトは、状況確認と初期切り分けを素早く行うための参考ツールです。正式な稼働状況や障害情報は、各サービスの公式案内もあわせてご確認ください。
        </p>
      </section>

      <footer className="mt-10 border-t pt-6">
        <p className="text-xs text-slate-500">運営: {SITE.name} 運営チーム</p>
        <p className="mt-1 text-xs text-slate-500">最終更新日: 2026-05-03</p>
      </footer>
    </div>
  );
}
