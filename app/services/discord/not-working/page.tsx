import Link from "next/link";
import type { Metadata } from "next";
import IMobileAd from "@/components/ads/IMobileAd";
import ServiceStatusBridge from "@/components/ServiceStatusBridge";

export const metadata: Metadata = {
  title: "Discordがつながらない？（障害か自分側か）",
  description: "Discordに接続できない、サーバーに入れない、メッセージを送れない、ボイスチャットが使えない時に、広い障害かサーバー・端末・回線側かを確認します。",
  alternates: { canonical: "/services/discord/not-working" },
};

export default function DiscordNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Discordがつながらない・使えない時の確認</h1>
        <p className="text-base text-neutral-600">まずDiscord全体の障害兆候を確認し、その後で特定サーバー、メッセージ、ボイスチャット、ログインのどこに問題があるかを切り分けます。</p>
      </header>

      <div className="mt-6">
        <ServiceStatusBridge
          serviceId="discord"
          serviceName="Discord"
          serviceUrl="https://discord.com"
          statusHref="/status/sites/discord"
          officialLinks={[
            { label: "Discord公式ステータス", href: "https://discordstatus.com/" },
            { label: "Discordサポート", href: "https://support.discord.com/" },
          ]}
          featureLimitNote="Discordの公開サイトに接続できても、ゲートウェイ、特定サーバー、メッセージ、音声・映像やログインの状態までは判定できません。利用者報告と機能ごとの差を合わせて確認します。"
          advice={{
            likely: "Discord側の広い問題が疑われます。ログアウト、再インストール、ネットワーク設定の変更は急がず、多い症状と公式ステータスの対象機能を確認してください。急ぎの連絡には別の手段を使います。",
            partial: "一部機能または一部利用者に影響する問題が疑われます。多い症状が自分の症状と一致するなら公式情報を確認し、一致しなければ下の機能別確認へ進んでください。",
            normal: "広い障害の兆候は強くありません。複数の無関係なサーバーでも失敗するか、DMは使えるか、ブラウザ版や別回線で差が出るかを確認すると原因を絞れます。",
            unknown: "まだ状況を断定できません。詳しい報告推移とDiscord公式ステータスを確認し、問題が広がっていなければ該当する機能から原因を絞ってください。",
          }}
        />
      </div>

      <nav className="mt-6 rounded-xl border border-neutral-200 bg-white p-4" aria-label="Discordの症状を選ぶ">
        <p className="text-sm font-semibold">当てはまる症状から確認</p>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#connection">Discordに接続できない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#server">特定サーバーに入れない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#messages">メッセージを送れない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#voice">ボイスチャットが使えない</a>
        </div>
      </nav>

      <section id="connection" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">1) Discordに接続できない・読み込みが終わらない</h2>
        <p className="text-sm text-neutral-700">複数の無関係なサーバー、DM、ブラウザ版も同時に失敗するなら、Discord全体または回線経路の問題を疑います。</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>アプリだけ失敗するならブラウザ版を試し、アプリ固有か確認する。</li>
          <li>Wi-Fiとモバイル回線を切り替え、片方だけ失敗するか確認する。</li>
          <li>他のサービスも開かないなら、Discordより先に端末とインターネット接続を確認する。</li>
          <li>接続中のまま進まない場合はアプリを完全終了し、再起動を一度だけ試す。</li>
        </ul>
        <p className="text-sm text-neutral-700">他のサービスにも接続できない場合は、<Link className="underline" href="/troubleshooting/internet-not-working">インターネット接続の確認</Link>へ進みます。</p>
      </section>

      <section id="server" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">2) 特定のDiscordサーバーだけ入れない</h2>
        <p className="text-sm text-neutral-700">他のサーバーやDMが使えるなら、Discord全体のサーバーダウンとは限りません。そのサーバー固有の状態を先に確認します。</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>別のサーバーを開く。正常なら対象サーバーの設定・権限・一時的な問題を疑う。</li>
          <li>招待リンクから入れない場合は、期限切れ、利用上限、参加制限を管理者に確認する。</li>
          <li>チャンネルだけ見えない場合は、障害よりロールや閲覧権限の変更を確認する。</li>
          <li>同じサーバーの他の参加者にも影響があるか、管理者の案内を確認する。</li>
        </ul>
      </section>

      <IMobileAd slot="notworking_mid" />

      <section id="messages" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">3) メッセージを送れない・反映されない</h2>
        <p className="text-sm text-neutral-700">DMと複数サーバーで同時に失敗するか、特定チャンネルだけかで切り分けます。</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>DMまたは別サーバーへ短いテキストを送り、送信機能全体の問題か確認する。</li>
          <li>特定チャンネルだけなら、低速モード、送信権限、認証条件やモデレーションを確認する。</li>
          <li>画像やファイルだけ失敗するなら、テキスト送信と分けて確認する。</li>
          <li>送信待ちが続く時は連打せず、公式ステータスのAPIやメッセージ関連の状況を確認する。</li>
        </ul>
      </section>

      <section id="voice" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">4) ボイスチャットに入れない・声が途切れる</h2>
        <p className="text-sm text-neutral-700">テキストは使えるのに通話だけ失敗する場合、Discord全体の停止ではなく、音声機能、権限、入出力設定または回線品質の問題が考えられます。</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>別のボイスチャンネルでも同じか確認し、チャンネル固有か音声全体かを分ける。</li>
          <li>マイク権限、選択中の入力・出力デバイス、ミュート状態を確認する。</li>
          <li>「RTC接続中」のままなら、別回線またはブラウザ版で通信経路の差を確認する。</li>
          <li>声が途切れる場合は大容量通信を止め、可能なら有線接続や安定した回線を使う。</li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-5">
        <h2 className="text-lg font-semibold">ログインできない場合と安全な回避策</h2>
        <p className="mt-2 text-sm text-neutral-700">ログイン画面だけで失敗する場合は、保存済みセッション、認証、アカウント制限を接続障害と分けます。広い障害中にログアウトすると再ログインできない場合があるため、正常な端末ではログアウトしないでください。</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>アプリが使えなければブラウザ版、PCが使えなければ既にログイン済みのスマホを一時利用する。</li>
          <li>一つのサーバーだけ使えない場合は、DMや別サーバーで管理者・参加者に状況を確認する。</li>
          <li>再インストールや設定初期化は、障害ではないと確認してから最後に判断する。</li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-5">
        <h2 className="text-lg font-semibold">詳しい報告推移とDiscord公式情報</h2>
        <p className="mt-2 text-sm text-neutral-700">Discordのステータスページでは、外部接続、日本の利用者報告、直近30分で多い症状、過去24時間の推移を確認できます。公式ステータスではAPI、接続、メディア、音声など、影響を受けている機能を確認してください。</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/status/sites/discord">Discordの詳しい状況・報告推移</Link>
          <a className="underline" href="https://discordstatus.com/" target="_blank" rel="noopener noreferrer">Discord公式ステータス ↗</a>
          <a className="underline" href="https://support.discord.com/" target="_blank" rel="noopener noreferrer">Discordサポート ↗</a>
        </div>
      </section>
    </main>
  );
}
