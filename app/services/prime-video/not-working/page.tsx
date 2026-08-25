import Link from "next/link";
import type { Metadata } from "next";
import IMobileAd from "@/components/ads/IMobileAd";

export const metadata: Metadata = {
  title: "プライムビデオが見れない・再生できない時の原因確認｜障害か自分側か",
  description:
    "プライムビデオが今日見れない、再生できない、エラーが出る、テレビだけ見れない時に、Amazon側の障害か端末・アプリ・回線側かを確認します。",
  alternates: { canonical: "/services/prime-video/not-working" }
};

export default function PrimeVideoNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">プライムビデオが見れない・再生できない時の対処法</h1>
        <p className="text-base text-neutral-600">
          プライムビデオが見れない時は、全体障害か、作品・端末・アプリ・回線だけの問題かを先に確認します。
        </p>
        <p className="text-sm text-neutral-700">
          作品一覧は開くのに再生だけ失敗する、テレビアプリだけ見れない、ログインはできるが視聴開始で止まる場合は、サイト全体の停止とは限りません。
        </p>
        <p className="text-sm text-neutral-700">
          <Link className="underline" href="/status/sites/prime-video">
            プライムビデオの障害・不具合ページ
          </Link>
          で広い障害が出ていないか確認してください。
        </p>
      </header>


      <section className="mt-6 space-y-2">
        <h2 className="text-base font-semibold">最初に確認すること</h2>
        <p className="text-sm text-neutral-700">
          同じ作品だけ失敗するのか、すべての作品で再生できないのかを先に見ます。テレビ、スマホ、ブラウザのうち一部だけ失敗するなら端末やアプリ側の可能性が上がります。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 再生できない</h2>
        <p className="text-sm text-neutral-700">
          作品一覧は開けても再生だけ失敗するなら、Prime Video側の再生障害、作品単位の制限、端末やアプリ側の再生処理を確認します。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">2) テレビやアプリだけ見れない</h2>
        <p className="text-sm text-neutral-700">
          ブラウザでは見れるのにテレビアプリだけ止まる場合は、アプリ更新、端末再起動、テレビ側のネットワーク接続を確認します。回線全体が不安定なら{" "}
          <Link className="underline" href="/troubleshooting/internet-not-working">
            インターネット接続
          </Link>
          や{" "}
          <Link className="underline" href="/troubleshooting-dns">
            DNS
          </Link>
          も確認します。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">3) エラーが出る</h2>
        <p className="text-sm text-neutral-700">
          エラー表示が続くときは、同じ作品だけか、全体で起きているかを見て、影響範囲を確認します。503や504が出る場合は一時的な混雑やサーバー側の不調も候補になります。
        </p>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/errors/503-service-unavailable">
            503エラーの確認
          </Link>
          <Link className="underline" href="/errors/504-gateway-timeout">
            504エラーの確認
          </Link>
          <Link className="underline" href="/errors/403-forbidden">
            403エラーの確認
          </Link>
        </div>
      </section>

      <IMobileAd slot="notworking_mid" />

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">4) ログインはできるが視聴開始で止まる</h2>
        <p className="text-sm text-neutral-700">
          アカウント画面や作品詳細は開くのに再生開始だけ止まる場合は、アカウント全体ではなく再生機能、地域・権利制限、端末認証、アプリの一時不調を確認します。
        </p>
      </section>
    </main>
  );
}
