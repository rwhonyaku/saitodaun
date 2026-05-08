import Link from "next/link";
import type { Metadata } from "next";
import IMobileAd from "@/components/ads/IMobileAd";

export const metadata: Metadata = {
  title: "プライムビデオが見れない・再生できない時の対処法｜接続・不具合 | サイトダウン",
  description:
    "プライムビデオが今日見れない・再生できない時に、接続できない・エラーが出る症状を短く切り分けるためのページです。",
};

export default function PrimeVideoNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">プライムビデオが見れない・再生できない時の対処法</h1>
        <p className="text-base text-neutral-600">
          プライムビデオが今日見れないときは、全体障害か、再生や接続の個別問題かを先に切り分けます。
        </p>
        <p className="text-sm text-neutral-700">
          <Link className="underline" href="/status/sites/prime-video">
            プライムビデオの障害・不具合ページ
          </Link>
          で全体的な障害かどうかを確認してください。
        </p>
        <p className="text-sm text-neutral-700">
          再生できない・見れない・接続できない・エラーが出るなどの症状別に確認できます。
        </p>
      </header>

      <IMobileAd slot="notworking_mid" />

      <section className="mt-6 space-y-2">
        <h2 className="text-base font-semibold">見れない症状の例</h2>
        <p className="text-sm text-neutral-700">
          プライムビデオが見れない原因は、再生できない、接続できない、エラーが出る、アプリが開かない、テレビで見れない、画面が真っ黒になる、音が出ないなど、症状によって確認点が変わります。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 再生できない</h2>
        <p className="text-sm text-neutral-700">
          作品一覧は開けても再生だけ失敗するなら、広い側の再生障害か、端末やアプリ側の再生処理かを見ます。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">2) 接続できない</h2>
        <p className="text-sm text-neutral-700">
          ログイン前後でつながらないときは、回線切り替えとアプリ再起動で接続経路の問題を先に切り分けます。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">3) エラーが出る</h2>
        <p className="text-sm text-neutral-700">
          エラー表示が続くときは、同じ作品だけか、全体で起きているかを見て、不具合範囲を先に絞ります。
        </p>
      </section>
    </main>
  );
}
