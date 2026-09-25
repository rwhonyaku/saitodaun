import Link from "next/link";
import type { Metadata } from "next";
import IMobileAd from "@/components/ads/IMobileAd";
import ServiceStatusBridge from "@/components/ServiceStatusBridge";

export const metadata: Metadata = {
  title: "Steamが使えない・開かない時の対処法｜ログイン・接続・重い",
  description:
    "Steamが使えない・開かない時に、ログインできない・接続できない・ストアが重い症状を短く確認するためのページです。",
  alternates: { canonical: "/services/steam/not-working" },
};

export default function SteamNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Steamが使えない・開かない時の対処法</h1>
        <p className="text-base text-neutral-600">
          まずSteam全体の障害兆候を確認し、その後でクライアント、ログイン、ダウンロード、ストア、個別ゲームのどこに問題があるかを切り分けます。
        </p>
      </header>

      <div className="mt-6">
        <ServiceStatusBridge
          serviceId="steam"
          serviceName="Steam"
          serviceUrl="https://store.steampowered.com"
          statusHref="/status/sites/steam"
          officialLinks={[
            { label: "Steamサポート", href: "https://help.steampowered.com/ja/" },
            {
              label: "Steam公式の接続確認",
              href: "https://help.steampowered.com/ja/faqs/view/669A-2F68-D1D1-A5EC",
            },
          ]}
          featureLimitNote="Steamストアに接続できても、クライアントのログイン、ダウンロード、フレンド・チャットや個別ゲームのサーバー状態までは判定できません。利用者報告と機能ごとの差を合わせて確認します。"
          advice={{
            likely:
              "Steam側の広い問題が疑われます。ログアウト、再インストール、ダウンロードキャッシュの消去やネットワーク設定の変更は急がず、多い症状とSteamサポートを確認してください。",
            partial:
              "一部機能または一部利用者に影響する問題が疑われます。多い症状が自分の症状と一致するなら設定を大きく変えず、一致しなければ下の機能別確認へ進んでください。",
            normal:
              "広い障害の兆候は強くありません。クライアントとブラウザ、複数のSteam機能、別回線で差が出るか確認すると原因を絞れます。",
            unknown:
              "まだ状況を断定できません。詳しい報告推移を確認し、問題が広がっていなければ該当する機能から原因を絞ってください。",
          }}
        />
      </div>

      <nav className="mt-6 rounded-xl border border-neutral-200 bg-white p-4" aria-label="Steamの症状を選ぶ">
        <p className="text-sm font-semibold">当てはまる症状から確認</p>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#connection">Steamに接続できない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#login">ログインできない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#downloads">ダウンロード・更新が進まない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#partial">ストア・ゲーム・フレンドだけ使えない</a>
        </div>
      </nav>

      <section id="connection" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">1) Steamクライアントに接続できない</h2>
        <p className="text-sm text-neutral-700">
          ブラウザでSteamストアが開くのにクライアントだけオフラインになるなら、Steam全体の停止ではなく、クライアントや通信経路の問題を優先して確認します。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>ブラウザでSteamストアを開き、公開サイトとクライアントの両方が失敗するか確認する。</li>
          <li>クライアントを完全終了して一度だけ再起動し、接続状態が変わるか確認する。</li>
          <li>Wi-Fiと別回線で差が出るか確認する。片方だけ失敗するなら回線やルーター側を疑う。</li>
          <li>他のサービスにも接続できない場合は、Steamより先に端末とインターネット接続を確認する。</li>
        </ul>
        <p className="text-sm text-neutral-700">
          他のサービスも開かない場合は、<Link className="underline" href="/troubleshooting/internet-not-working">インターネット接続の確認</Link>へ進みます。
        </p>
      </section>

      <section id="login" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">2) Steamにログインできない</h2>
        <p className="text-sm text-neutral-700">
          ストアは開くのにサインインだけ失敗する場合は、広い接続障害と、認証・Steam Guard・アカウント固有の問題を分けます。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>ブラウザとクライアントの両方で失敗するか確認し、クライアント固有か認証全体かを分ける。</li>
          <li>表示されたエラーを控え、Steam Guardコードが届かない問題や資格情報の問題と接続失敗を区別する。</li>
          <li>既に使えている別端末がある場合、広い障害中はその端末からログアウトしない。</li>
          <li>一つのアカウントだけ失敗するなら、再インストールより先にSteamのログインサポートを確認する。</li>
        </ul>
        <a
          className="text-sm font-semibold text-sky-700 underline underline-offset-2"
          href="https://help.steampowered.com/ja/wizard/HelpWithLogin"
          target="_blank"
          rel="noopener noreferrer"
        >
          Steam公式のログインサポートを見る ↗
        </a>
      </section>

      <IMobileAd slot="notworking_mid" />

      <section id="downloads" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">3) ダウンロード・ゲーム更新が進まない</h2>
        <p className="text-sm text-neutral-700">
          ストアやフレンド機能が使えるのにダウンロードだけ止まる場合は、Steam全体よりコンテンツサーバー、選択地域、ストレージやゲーム固有の問題を確認します。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>別のゲームでもダウンロードが止まるか確認し、一作品固有かダウンロード全体かを分ける。</li>
          <li>ダウンロード画面のエラー、空き容量、保留・一時停止状態を確認する。</li>
          <li>特定地域の混雑が疑われる場合だけ、Steam公式手順に沿って近隣のダウンロード地域を試す。</li>
          <li>キャッシュ消去、ライブラリ修復、再インストールは、広い障害ではないと確認してから公式手順に沿って行う。</li>
        </ul>
        <a
          className="text-sm font-semibold text-sky-700 underline underline-offset-2"
          href="https://help.steampowered.com/ja/faqs/view/21F5-8D5D-0141-7A5E"
          target="_blank"
          rel="noopener noreferrer"
        >
          Steam公式の更新・インストール問題の手順を見る ↗
        </a>
      </section>

      <section id="partial" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">4) ストア・個別ゲーム・フレンド機能だけ使えない</h2>
        <p className="text-sm text-neutral-700">
          Steamは機能ごとに経路が異なるため、一部だけ失敗してもSteam全体が停止しているとは限りません。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>ストアだけ重い場合は、クライアント内ストアとブラウザ版で差が出るか確認する。</li>
          <li>一つのゲームだけ接続できない場合は、他のオンラインゲームを試し、対象ゲームの公式サーバー情報を確認する。</li>
          <li>フレンド・チャットだけ使えない場合は、ストア、ライブラリ、ダウンロードが正常か比較する。</li>
          <li>購入・決済だけ失敗する場合は連打せず、購入履歴とSteamサポートを確認する。</li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-5">
        <h2 className="text-lg font-semibold">障害時に安全な回避策</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>クライアント内ストアだけ開かない場合は、ブラウザ版で情報を確認する。</li>
          <li>一つのゲームだけ使えない場合は、Steam全体ではなくゲーム運営の案内を確認する。</li>
          <li>事前に設定済みで対応ゲームが準備できている場合に限り、Steamのオフラインモードを利用する。</li>
          <li>広い障害中はログアウト、再インストール、設定初期化を避け、復旧情報を待つ。</li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-5">
        <h2 className="text-lg font-semibold">詳しい報告推移とSteam公式情報</h2>
        <p className="mt-2 text-sm text-neutral-700">
          Steamのステータスページでは、ストアへの外部接続、日本の利用者報告、直近30分で多い症状、過去24時間の推移を確認できます。個別ゲームのサーバー状態は、そのゲームの公式案内も確認してください。
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/status/sites/steam">Steamの詳しい状況・報告推移</Link>
          <a className="underline" href="https://help.steampowered.com/ja/" target="_blank" rel="noopener noreferrer">Steamサポート ↗</a>
        </div>
      </section>
    </main>
  );
}
