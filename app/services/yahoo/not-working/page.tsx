import Link from "next/link";
import type { Metadata } from "next";
import IMobileAd from "@/components/ads/IMobileAd";
import ServiceStatusBridge from "@/components/ServiceStatusBridge";

export const metadata: Metadata = {
  title: "Yahoo! JAPANが開かない・検索できない？（障害か自分側か）",
  description:
    "Yahoo! JAPANが開かない、検索できない、ログインできない時に、Yahoo全体の問題か、メール・ショッピングなど一部サービスの問題かを確認します。",
  alternates: { canonical: "/services/yahoo/not-working" },
};

export default function YahooNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Yahoo! JAPANが開かない・使えない時の確認</h1>
        <p className="text-base text-neutral-600">
          まずYahoo! JAPAN全体の障害兆候を確認し、トップページ、検索、ログイン、Yahoo!メール、ショッピング・ヤフオクのどこに問題があるかを分けます。
        </p>
      </header>

      <div className="mt-6">
        <ServiceStatusBridge
          serviceId="yahoo-japan"
          serviceName="Yahoo! JAPAN"
          serviceUrl="https://www.yahoo.co.jp"
          statusHref="/status/sites/yahoo-japan"
          officialLinks={[{ label: "Yahoo! JAPANサポート", href: "https://support.yahoo-net.jp/" }]}
          featureLimitNote="Yahoo! JAPANのトップページに接続できても、Yahoo!メール、ログイン、ショッピング、ヤフオクなど各サービスの状態までは判定できません。利用者報告と、使えない機能の範囲を合わせて確認します。"
          advice={{
            likely:
              "Yahoo! JAPAN側の広い問題が疑われます。ログアウト、アプリの再インストール、ブラウザやネットワーク設定の初期化は急がず、多い症状とYahoo! JAPANの案内を確認してください。",
            partial:
              "一部のYahooサービスまたは一部利用者に影響する問題が疑われます。多い症状と自分の症状が一致するか確認し、一致しなければ下のサービス別確認へ進んでください。",
            normal:
              "広い障害の兆候は強くありません。トップページと検索、ログイン、メールなどを比較し、Yahoo全体か一つの機能だけかを確認してください。",
            unknown:
              "まだ状況を断定できません。詳しい報告推移とYahoo! JAPANサポートを確認し、問題が広がっていなければ該当する機能から原因を絞ってください。",
          }}
        />
      </div>

      <nav className="mt-6 rounded-xl border border-neutral-200 bg-white p-4" aria-label="Yahoo! JAPANの症状を選ぶ">
        <p className="text-sm font-semibold">当てはまる症状から確認</p>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#portal">トップページ・検索が使えない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#login">ログインできない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#mail">Yahoo!メールだけ使えない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#services">ショッピング・ヤフオクなど一部だけ</a>
        </div>
      </nav>

      <section id="portal" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">1) Yahoo! JAPANのトップページ・検索が使えない</h2>
        <p className="text-sm text-neutral-700">
          トップページと検索の両方が複数の端末や回線で開かない場合は、Yahoo側または広い通信経路の問題が疑われます。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>Yahoo以外のサイトが開くか確認し、インターネット全体の問題と分ける。</li>
          <li>トップページは開くが検索結果だけ出ない場合は、検索機能に限定した問題として確認する。</li>
          <li>ブラウザとYahooアプリで差が出るか確認し、一方だけならアプリ・ブラウザ側を優先する。</li>
          <li>Wi-Fiとモバイル回線で差が出る場合は、利用中の回線やネットワーク設定を確認する。</li>
        </ul>
        <p className="text-sm text-neutral-700">
          他のサイトも開かない場合は、<Link className="underline" href="/troubleshooting/internet-not-working">インターネット接続の確認</Link>へ進みます。
        </p>
      </section>

      <section id="login" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">2) Yahoo! JAPAN IDでログインできない</h2>
        <p className="text-sm text-neutral-700">
          ログアウト状態でもYahooのページを閲覧できるなら、サイト全体より認証、確認コード、アカウントまたはブラウザの問題を疑います。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>閲覧だけはできるか確認し、ログイン機能だけの問題かを分ける。</li>
          <li>表示されたエラーを控え、パスワード失敗と確認コード・本人確認の問題を区別する。</li>
          <li>別ブラウザやアプリで差が出るか確認する。広い障害中は正常な端末からログアウトしない。</li>
          <li>一つのIDだけ失敗する場合は、設定初期化よりYahoo! JAPANサポートのアカウント案内を優先する。</li>
        </ul>
      </section>

      <IMobileAd slot="notworking_mid" />

      <section id="mail" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">3) Yahoo!メールだけ送受信できない</h2>
        <p className="text-sm text-neutral-700">
          Yahooのトップページや検索が使えるのにメールだけ失敗する場合は、Yahoo全体の停止ではなく、メール機能、アカウントまたはメールアプリ側を確認します。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>Web版Yahoo!メールとメールアプリの両方で同じか確認する。</li>
          <li>受信だけ、送信だけ、添付ファイルだけのどこで失敗するかを分ける。</li>
          <li>Web版は使える場合、メールアプリの同期・認証状態を確認する。</li>
          <li>送信を繰り返さず、下書きや送信済みへの反映を確認してから再試行する。</li>
        </ul>
        <a className="text-sm font-semibold text-sky-700 underline underline-offset-2" href="https://support.yahoo-net.jp/PccMail/s/" target="_blank" rel="noopener noreferrer">
          Yahoo!メール公式サポートを見る ↗
        </a>
      </section>

      <section id="services" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">4) ショッピング・ヤフオクなど一部サービスだけ使えない</h2>
        <p className="text-sm text-neutral-700">
          検索やメールが正常なら、Yahoo! JAPAN全体ではなく対象サービスの機能、ログイン状態または取引処理の問題を確認します。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>Yahoo!ショッピングで注文確定だけ失敗する場合は、商品閲覧、カート、決済のどこで止まるかを確認する。</li>
          <li>ヤフオクで入札・取引だけ失敗する場合は、公式のお知らせと取引画面のエラーを確認する。</li>
          <li>ニュースだけ更新されない場合は、別記事やトップページが開くか確認する。</li>
          <li>注文・入札・決済操作を連打せず、履歴に反映されていないことを確認してから再試行する。</li>
        </ul>
        <a className="text-sm font-semibold text-sky-700 underline underline-offset-2" href="https://auctions.yahoo.co.jp/topic/notice/troubleRepo/" target="_blank" rel="noopener noreferrer">
          ヤフオク公式の障害情報を見る ↗
        </a>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-5">
        <h2 className="text-lg font-semibold">詳しい報告推移とYahoo! JAPAN公式情報</h2>
        <p className="mt-2 text-sm text-neutral-700">
          Yahoo! JAPANのステータスページでは、トップページへの外部接続、日本の利用者報告、直近30分で多い症状、過去24時間の推移を確認できます。
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/status/sites/yahoo-japan">Yahoo! JAPANの詳しい状況・報告推移</Link>
          <a className="underline" href="https://support.yahoo-net.jp/" target="_blank" rel="noopener noreferrer">Yahoo! JAPANサポート ↗</a>
        </div>
      </section>
    </main>
  );
}
