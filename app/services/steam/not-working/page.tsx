import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steamが使えない・開かない時の対処法｜ログイン・接続・重い | サイトダウン",
  description:
    "Steamが使えない・開かない時に、ログインできない・接続できない・ストアが重い症状を短く確認するためのページです。",
};

export default function SteamNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Steamが使えない・開かない時の対処法</h1>
        <p className="text-base text-neutral-600">
          Steamで使えない症状が出るときは、全体障害か、自分の接続や端末側かを先に確認します。
        </p>
        <p className="text-sm text-neutral-700">
          <Link className="underline" href="/status/sites/steam">
            Steamの障害・サーバー状況ページ
          </Link>
          で全体的な障害かどうかを確認してください。
        </p>
        <p className="text-sm text-neutral-700">
          ログインできない・接続できない・ストアが重いなどの症状別に確認できます。
        </p>
      </header>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) ログインできない</h2>
        <p className="text-sm text-neutral-700">
          サーバー障害でなければ、認証画面の失敗、アカウント確認し、端末側の時刻ずれを先に見ます。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">2) 接続できない</h2>
        <p className="text-sm text-neutral-700">
          Steamだけつながらないなら、回線切り替え、VPNやDNS設定、クライアント再起動を優先して確認します。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">3) 重い</h2>
        <p className="text-sm text-neutral-700">
          ストアやログインはできても極端に重いときは、広い側の混雑か、地域的な接続遅延かを確認します。
        </p>
      </section>
    </main>
  );
}
