import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teamsが使えない・開かない時の対処法｜ログイン・接続エラー | サイトダウン",
  description:
    "Teamsが使えない・開かない時に、ログインできない・接続できない症状を短く切り分けるためのページです。",
};

export default function TeamsNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Teamsが使えない・開かない時の対処法</h1>
        <p className="text-base text-neutral-600">
          Teamsで使えない症状が出るときは、全体障害か、ログインや接続の局所的な問題かを先に分けます。
        </p>
        <p className="text-sm text-neutral-700">
          <Link className="underline" href="/status/sites/teams">
            Teamsの障害情報・稼働状況ページ
          </Link>
          で全体的な障害かどうかを確認してください。
        </p>
        <p className="text-sm text-neutral-700">
          ログインできない・接続できないなどの症状別に確認できます。
        </p>
      </header>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) ログインできない</h2>
        <p className="text-sm text-neutral-700">
          認証画面で止まる場合は、Microsoft側の障害か、組織アカウントや認証経路の問題かを先に見ます。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">2) 接続できない</h2>
        <p className="text-sm text-neutral-700">
          会議やチャットだけつながらないときは、回線切り替え、アプリ再起動、組織ネットワーク制限を優先します。
        </p>
      </section>
    </main>
  );
}
