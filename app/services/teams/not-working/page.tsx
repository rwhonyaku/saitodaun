import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teamsが使えない・会議に入れない時の対処法｜自分側か確認 | サイトダウン",
  description:
    "Teamsが使えない、会議に入れない、ログインできない、チャットが送れない時に、Microsoft側の障害、SSO、会社VPN・ファイアウォール、アプリ不具合を確認します。",
};

export default function TeamsNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Teamsが使えない・開かない時の対処法</h1>
        <p className="text-base text-neutral-600">
          Teamsが使えない時は、全体障害か、自分の組織・端末・ネットワークだけの問題かを確認します。
        </p>
        <p className="text-sm text-neutral-700">
          会議だけ入れない、チャットだけ送れない、ログインだけ失敗するなど、影響範囲によって見るべき原因が変わります。
        </p>
        <p className="text-sm text-neutral-700">
          <Link className="underline" href="/status/sites/teams">
            Teamsの障害情報・稼働状況ページ
          </Link>
          で全体的な障害か確認してください。Microsoft 365全体も不安定な時は{" "}
          <Link className="underline" href="/status/sites/microsoft-365">
            Microsoft 365の稼働状況
          </Link>
          も確認します。
        </p>
      </header>

      <section className="mt-8 rounded-lg border border-neutral-200 p-4">
        <h2 className="text-lg font-semibold">最初に確認すること</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>社内の複数人で同じ症状が出ているか確認する。</li>
          <li>ブラウザ版とアプリ版のどちらでも失敗するか確認する。</li>
          <li>
            会社VPNや社内Wi-Fiでだけ失敗する場合は{" "}
            <Link className="underline" href="/troubleshooting/site-blocked-by-firewall">
              ファイアウォールや社内ネットワーク制限
            </Link>
            を確認する。
          </li>
          <li>
            サインイン画面で止まる場合は{" "}
            <Link className="underline" href="/troubleshooting/cant-log-in">
              ログインできない時の確認手順
            </Link>
            も見ます。
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">1) 会議だけ入れない</h2>
        <p className="text-sm text-neutral-700">
          チャットや予定表は開くのに会議だけ入れない場合は、Teams全体ではなく通話機能、端末の権限、会社ネットワークの制限を優先して確認します。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">2) ログインできない</h2>
        <p className="text-sm text-neutral-700">
          認証画面で止まる場合は、Microsoft側の障害、SSO、組織アカウント、条件付きアクセスのどこで止まっているかを確認します。
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-xl font-semibold">3) チャットだけ送れない</h2>
        <p className="text-sm text-neutral-700">
          画面は開くのにチャット送信だけ失敗する場合は、Teams側の部分障害、組織ポリシー、アプリの一時不調を確認します。回線全体が怪しい時は{" "}
          <Link className="underline" href="/troubleshooting-dns">
            DNSの確認
          </Link>
          も役立ちます。
        </p>
      </section>
    </main>
  );
}
