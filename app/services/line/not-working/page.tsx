import Link from "next/link";
import type { Metadata } from "next";
import IMobileAd from "@/components/ads/IMobileAd";
import ServiceStatusBridge from "@/components/ServiceStatusBridge";

export const metadata: Metadata = {
  title: "LINEが使えない・送れない時の原因確認｜障害か自分側か",
  description:
    "LINEが開かない、メッセージを送れない、通話できない、通知が来ない時に、広いLINE障害か端末・アプリ・回線側かを確認します。",
  alternates: { canonical: "/services/line/not-working" },
};

export default function LineNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          LINEが使えない・メッセージを送れない時の確認
        </h1>
        <p className="text-base text-neutral-600">
          直近の利用者報告を見たうえで、メッセージ、通話、接続・アプリ起動、通知・ログインのどこで止まっているかを確認します。
        </p>
      </header>

      <div className="mt-6">
        <ServiceStatusBridge
          serviceId="line"
          serviceName="LINE"
          serviceUrl="https://line.me"
          statusHref="/status/sites/line"
          officialLinks={[
            { label: "LINEヘルプセンター", href: "https://help.line.me/line/?lang=ja" },
            { label: "LINE公式（X）", href: "https://x.com/LINEjp_official" },
          ]}
          featureLimitNote="LINE公式サイトへの接続を確認できても、トーク送受信、音声・ビデオ通話、通知、アプリ認証の状態までは判定できません。日本の利用者報告と自分の症状を合わせて判断します。"
          advice={{
            likely:
              "LINE側の広い問題が疑われます。再インストール、ログアウト、アカウント移行や大きな設定変更は急がず、最も多い症状と自分の症状が一致するか確認してください。急ぎの連絡は電話、SMS、メールなど相手と使える別手段へ切り替えます。",
            partial:
              "メッセージや通話など一部機能の問題が疑われます。上の多い症状と一致する場合は端末を大きく変更せず公式情報を確認し、一致しなければ下の症状別確認へ進んでください。",
            normal:
              "広い不具合の兆候は強くありません。下から症状を選び、別の相手、Wi-Fiとモバイル通信、別端末で差が出るか確認すると、機能・回線・アプリ・アカウントのどこに原因があるか絞れます。",
            unknown:
              "まだ状況を断定できません。LINEの詳しい報告推移と公式情報を確認し、報告が増えていなければ当てはまる機能から確認してください。",
          }}
        />
      </div>

      <nav className="mt-6 rounded-xl border border-neutral-200 bg-white p-4" aria-label="LINEの症状を選ぶ">
        <p className="text-sm font-semibold">当てはまる症状から確認</p>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#messaging">メッセージを送受信できない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#calls">LINE通話ができない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#connection">LINEにつながらない・開かない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#account">通知が来ない・ログインできない</a>
        </div>
      </nav>

      <section id="messaging" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">1) メッセージを送れない・受信できない</h2>
        <p className="text-sm text-neutral-700">
          一つのトークだけか、すべての相手・グループで起きるかを最初に確認します。次に文字と画像・動画で差があるかを見ます。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>別の相手にも短い文字メッセージを送り、一つのトーク固有か全体かを確認する。</li>
          <li>文字は送れるが画像・動画・スタンプだけ失敗するなら、添付送信や購入機能の部分不具合、容量、回線品質を確認する。</li>
          <li>送信はできるが受信や既読だけ遅い場合は、通知だけではなくトーク画面を直接開いて状態を確認する。</li>
          <li>Wi-Fiとモバイル通信で差が出るなら、動く回線を一時的に使う。両方で複数人が失敗するならLINE側の可能性が上がります。</li>
        </ul>
        <p className="text-sm text-neutral-600">
          送信結果が不明なときは同じ内容を連続送信せず、トーク上に表示されたか確認してから再試行します。
        </p>
      </section>

      <section id="calls" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">2) LINE通話・ビデオ通話ができない</h2>
        <p className="text-sm text-neutral-700">
          通話を開始できないのか、接続後に音が出ないのか、途中で切れるのかで確認先が変わります。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>別の相手にも発信できないか確認する。一人だけなら相手側の状態も候補です。</li>
          <li>接続するが声が届かない場合は、LINEのマイク権限、消音状態、出力先のイヤホン・スピーカーを確認する。</li>
          <li>通話が途切れる場合はWi-Fiとモバイル通信を切り替える。Web閲覧ができても、遅延や通信の揺れで通話だけ不安定になることがあります。</li>
          <li>複数人が別回線でも通話を開始できない場合は、端末設定を変え続けずLINEの現在状況を確認する。</li>
        </ul>
        <div className="rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">急ぎの通話</p>
          <p className="mt-1">携帯電話の音声通話など、相手と利用できる別の連絡方法へ切り替えます。</p>
        </div>
      </section>

      <IMobileAd slot="notworking_mid" />

      <section id="connection" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">3) LINEにつながらない・アプリが開かない</h2>
        <p className="text-sm text-neutral-700">
          LINEだけ開かないのか、他のアプリも通信できないのか、起動画面で止まるのかを確認します。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>他のアプリやWebサイトも通信できないなら、LINEより先に端末の接続状態を確認する。</li>
          <li>Wi-Fiだけ失敗するならモバイル通信で試し、VPNやプロキシを使っている場合は一時的に外して差を確認する。</li>
          <li>通信は正常なのにLINEだけ起動画面で止まる場合は、アプリを完全終了し、端末再起動とアプリ更新を順に試す。</li>
          <li>同じ回線の別端末ではLINEを使えるなら、その端末やアプリ側の可能性が高くなります。</li>
        </ul>
        <p className="text-sm text-neutral-700">
          他のサービスにもつながらない場合は、
          <Link className="underline" href="/troubleshooting/internet-not-working">インターネット接続の確認</Link>
          へ進みます。
        </p>
      </section>

      <section id="account" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">4) 通知が来ない・ログインできない</h2>
        <div className="space-y-4 text-sm text-neutral-700">
          <div>
            <h3 className="font-semibold text-slate-900">通知だけ来ない</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>トーク画面を開くと新着があるなら、メッセージ受信より通知経路の問題が疑われます。</li>
              <li>LINEとOSの通知許可、集中モード、省電力・バックグラウンド通信制限を確認する。</li>
              <li>一つのトークだけ通知されない場合は、そのトークの通知設定を確認する。</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">ログイン・認証できない</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>広い障害が疑われる間は、ログアウト、再インストール、アカウント移行を急がない。</li>
              <li>機種変更や再認証中なら、登録済みの電話番号・メール・連携アカウントを確認してから操作する。</li>
              <li>個別の認証問題なら、LINE公式ヘルプの案内を優先する。</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-lg font-semibold">再インストールは最後に判断</h2>
        <p className="mt-2 text-sm text-neutral-700">
          再インストール前に、アカウントへ再ログインできることと必要なトーク履歴のバックアップ状況を確認してください。広い障害や回線問題なら、再インストールしても改善しません。
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-5">
        <h2 className="text-lg font-semibold">詳しい報告推移と公式情報</h2>
        <p className="mt-2 text-sm text-neutral-700">
          LINEのステータスページでは、外部接続、日本の利用者報告、直近30分で多い症状、過去24時間の推移を確認できます。LINE Developers向けのプラットフォーム状況は、一般利用者のトーク・通話障害とは対象が異なるため、このページでは一般利用者向けヘルプと公式案内を優先します。
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/status/sites/line">LINEの詳しい状況・報告推移</Link>
          <a className="underline" href="https://help.line.me/line/?lang=ja" target="_blank" rel="noopener noreferrer">LINEヘルプセンター ↗</a>
          <a className="underline" href="https://x.com/LINEjp_official" target="_blank" rel="noopener noreferrer">LINE公式（X） ↗</a>
        </div>
      </section>
    </main>
  );
}
