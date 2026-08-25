import type { Metadata } from "next";
import Link from "next/link";

const GROUPS = [
  {
    title: "まず状況を切り分ける",
    items: [
      ["website-not-loading", "サイトが開かない"],
      ["this-site-cant-be-reached", "このサイトにアクセスできませんと表示される"],
      ["specific-site-not-working", "特定のサイトだけ開かない"],
      ["how-to-check-if-a-website-is-down", "サイトが落ちているか確認したい"],
      ["internet-not-working", "インターネット全体につながらない"],
      ["device-cannot-connect", "端末・回線によって結果が違う"],
    ],
  },
  {
    title: "Wi-Fi・ルーター・回線",
    items: [
      ["wifi-not-working", "Wi-Fiがつながらない"],
      ["router-not-working", "ルーターがつながらない"],
      ["router-vs-isp-problem", "ルーターか回線障害か見分ける"],
      ["isp-outage", "インターネット回線の障害を確認する"],
      ["slow-internet", "インターネットが遅い"],
      ["website-slow-but-internet-is-fine", "特定のサイトだけ遅い"],
      ["website-loads-on-phone-not-wifi", "モバイル回線では開くがWi-Fiでは開かない"],
      ["website-works-on-wifi-not-mobile-data", "Wi-Fiでは開くがモバイル回線では開かない"],
      ["site-works-on-phone-not-computer", "スマホでは開くがパソコンでは開かない"],
      ["public-wifi-login-page-not-showing", "公共Wi-Fiのログイン画面が出ない"],
    ],
  },
  {
    title: "ページは開くが表示・操作がおかしい",
    items: [
      ["browser-not-loading-sites", "特定のブラウザで開かない"],
      ["site-loads-forever", "読み込み中のまま終わらない"],
      ["site-opens-but-is-blank", "ページが真っ白になる"],
      ["site-loads-without-images", "画像だけ表示されない"],
      ["site-opens-but-buttons-do-not-work", "ボタンが反応しない"],
      ["site-opens-but-does-not-work", "表示されるが機能しない"],
      ["form-submit-not-working", "フォームを送信できない"],
      ["website-keeps-reloading", "再読み込みを繰り返す"],
    ],
  },
  {
    title: "ログイン・認証・アクセス制限",
    items: [
      ["cant-log-in", "ログインできない症状から選ぶ"],
      ["site-opens-but-login-fails", "サイトは開くがログインできない"],
      ["signed-in-but-site-not-working", "ログイン後だけ使えない"],
      ["website-keeps-logging-me-out", "何度もログアウトされる"],
      ["captcha-or-verification-loop", "CAPTCHA・本人確認がループする"],
      ["website-keeps-asking-are-you-human", "Are you human? が何度も出る"],
      ["access-denied", "アクセスが拒否される"],
      ["website-blocked", "サイトがブロックされている"],
      ["site-blocked-by-firewall", "ファイアウォールや組織の制限を疑う"],
    ],
  },
  {
    title: "DNS・安全な接続・アプリ",
    items: [
      ["server-not-found", "サーバーが見つからない"],
      ["secure-connection-failed", "安全な接続を確立できない"],
      ["dns-propagation", "DNS変更が反映されない"],
      ["cdn-or-server-edge-issues", "CDN・地域経路で結果が違う"],
      ["app-not-working", "アプリが使えない症状から選ぶ"],
      ["internet-working-but-apps-not-loading", "ネットは使えるがアプリだけ開かない"],
    ],
  },
] as const;

export const metadata: Metadata = {
  title: "サイト・接続トラブル解決ガイド一覧",
  description:
    "サイトが開かない、Wi-FiやDNS、ログイン、表示・操作、アクセス制限など、現在の症状から適切な確認手順を選べるトラブルシューティング一覧です。",
  alternates: { canonical: "/troubleshooting-guide" },
};

export default function TroubleshootingGuidePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 text-slate-900">
      <header className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">サイト・接続トラブル解決ガイド</h1>
        <p className="text-neutral-600">
          原因を推測する前に、今の症状に最も近い項目を選んでください。エラー番号や英語のエラー名が表示されている場合は、エラー解説から探す方が早く確認できます。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="inline-flex min-h-11 items-center rounded-xl bg-sky-600 px-5 text-sm font-bold text-white hover:bg-sky-700">URLを接続チェック</Link>
          <Link href="/errors" className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold hover:bg-slate-50">エラー名から探す</Link>
        </div>
      </header>

      <div className="mt-10 space-y-10">
        {GROUPS.map((group) => (
          <section key={group.title}>
            <h2 className="text-xl font-bold">{group.title}</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map(([slug, label]) => (
                <Link key={slug} href={`/troubleshooting/${slug}`} className="flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-sky-200 hover:bg-sky-50">
                  <span className="text-sm font-semibold">{label}</span>
                  <span aria-hidden="true" className="text-sky-600">→</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-12 text-sm text-slate-600">
        YouTube、LINE、X、Discordなど特定サービスの状況は <Link href="/services" className="font-semibold underline">サービス別トラブル一覧</Link> から確認できます。
      </p>
    </main>
  );
}
