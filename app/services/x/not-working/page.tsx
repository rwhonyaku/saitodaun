import Link from "next/link";
import type { Metadata } from "next";
import IMobileAd from "@/components/ads/IMobileAd";
import ServiceStatusBridge from "@/components/ServiceStatusBridge";

export const metadata: Metadata = {
  title: "X（旧Twitter）が開かない・読み込めない時の原因確認",
  description:
    "X（旧Twitter）のタイムラインが読み込めない、投稿できない、DMや画像だけ使えない、ログインできない時に、広い障害か自分側かを確認します。",
  alternates: { canonical: "/services/x/not-working" },
};

export default function XNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          X（旧Twitter）が開かない・読み込めない時の確認
        </h1>
        <p className="text-base text-neutral-600">
          直近の報告状況を確認してから、タイムライン、投稿、DM・画像、ログインのどこで問題が起きているかを調べます。
        </p>
      </header>

      <div className="mt-6">
        <ServiceStatusBridge
          serviceId="twitter"
          serviceName="X（旧Twitter）"
          serviceUrl="https://twitter.com"
          statusHref="/status/sites/twitter"
          officialLinks={[
            { label: "Xサポート", href: "https://help.x.com/ja" },
            { label: "X Support（公式アカウント）", href: "https://x.com/Support" },
          ]}
          featureLimitNote="外部からXへの接続を確認できても、タイムライン更新、投稿、DM、画像・動画、特定アカウントの状態までは判定できません。利用者報告と自分の症状を合わせて判断します。"
          advice={{
            likely:
              "X側の広い問題が疑われます。アプリの再インストール、ログアウト、パスワード変更は急がず、最も多い症状と自分の症状が一致するか確認してください。急ぎの連絡は別の連絡手段を使い、送信状態が不明な投稿は連続して再送しない方が安全です。",
            partial:
              "一部機能の問題が疑われます。上の多い症状がタイムライン、投稿、DMなど自分の症状と一致する場合は、端末設定を大きく変えず公式情報を確認します。一致しなければ下の症状別確認へ進んでください。",
            normal:
              "広い障害の兆候は強くありません。下から症状を選び、アプリとブラウザ、別回線、別アカウントで差が出るか確認すると、X側の部分不具合か自分側かを絞れます。",
            unknown:
              "まだ状況を断定できません。Xの詳しい報告推移と公式情報を確認し、報告が増えていなければ該当する機能から原因を絞ってください。",
          }}
        />
      </div>

      <nav className="mt-6 rounded-xl border border-neutral-200 bg-white p-4" aria-label="Xの症状を選ぶ">
        <p className="text-sm font-semibold">当てはまる症状から確認</p>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#timeline">タイムラインが読み込めない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#posting">投稿・更新できない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#partial">DM・画像など一部だけ使えない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#login">ログインできない</a>
        </div>
      </nav>

      <section id="timeline" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">1) タイムラインが読み込めない・更新されない</h2>
        <p className="text-sm text-neutral-700">
          画面全体が開かないのか、古い投稿は見えるが新しい投稿だけ取得できないのかを最初に確認します。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>検索、プロフィール、通知も開かないなら、広いX障害または接続問題の可能性が上がります。</li>
          <li>ブラウザでは更新できるのにアプリだけ止まるなら、アプリを完全終了し、更新の有無を確認します。</li>
          <li>Wi-Fiとモバイル通信で差が出るなら、動く回線を一時的に使い、VPNや回線側の影響を確認します。</li>
          <li>一つのアカウントだけ更新できないなら、サービス全体よりアカウントやセッション側の可能性があります。</li>
        </ul>
      </section>

      <section id="posting" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">2) 投稿・返信・更新ができない</h2>
        <p className="text-sm text-neutral-700">
          タイムラインを読めるのに投稿だけ失敗する場合は、X全体の停止ではなく投稿機能の部分障害、添付メディア、またはアカウント固有の制限を確認します。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>短いテキストだけで投稿し、画像・動画のアップロードだけが原因か確認する。</li>
          <li>アプリで失敗する場合はブラウザ版を試す。ブラウザで送れるなら急ぎの投稿はそちらを使います。</li>
          <li>投稿後の状態が不明な場合はプロフィールを確認し、同じ内容を繰り返し送信しない。</li>
          <li>別アカウントでは投稿できる場合、広い障害ではなく対象アカウントの状態をX側で確認する。</li>
        </ul>
        <p className="text-sm text-neutral-600">長い下書きや添付前の文章は、再試行前に端末側へ保存しておくと安全です。</p>
      </section>

      <IMobileAd slot="notworking_mid" />

      <section id="partial" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">3) DM・通知・画像や動画だけ使えない</h2>
        <p className="text-sm text-neutral-700">
          一部機能だけ失敗する場合、Xのサイトが応答していても部分的な問題は残ります。使えない機能を分けて確認してください。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>DMだけ送れないなら、別の相手にも送れないか、受信も止まっているかを確認する。</li>
          <li>画像・動画だけ表示されないなら、文字中心の画面やブラウザ版では動くか確認する。</li>
          <li>通知だけ来ないなら、アプリ内では通知を読めるか確認し、端末の通知権限とバックグラウンド制限を見ます。</li>
          <li>急ぎの連絡はDMの復旧を待たず、相手と合意済みの別手段を使います。</li>
        </ul>
      </section>

      <section id="login" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">4) Xにログインできない</h2>
        <p className="text-sm text-neutral-700">
          ログイン画面が開かない、認証後に戻される、特定アカウントだけ拒否される、のどこで止まるかを確認します。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>ブラウザのプライベートウィンドウでログイン画面が正常に開くか確認する。</li>
          <li>別回線・別端末でも同じアカウントだけ失敗するなら、接続よりアカウント側の可能性が高くなります。</li>
          <li>複数の利用者が同時にログインできない場合は、パスワード変更を急がず現在状況を確認する。</li>
        </ul>
        <p className="text-sm text-neutral-700">
          広い障害が見つからず個別の認証だけ失敗する場合は、{" "}
          <Link className="underline" href="/troubleshooting/cant-log-in">ログインできない時の確認手順</Link>
          へ進みます。
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-5">
        <h2 className="text-lg font-semibold">詳しい報告推移と公式情報</h2>
        <p className="mt-2 text-sm text-neutral-700">
          Xのステータスページでは、外部接続、日本の利用者報告、直近30分で多い症状、過去24時間の推移を確認できます。X Supportは公式案内の確認先ですが、案内がないことだけで正常とは断定できません。
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/status/sites/twitter">Xの詳しい状況・報告推移</Link>
          <a className="underline" href="https://help.x.com/ja" target="_blank" rel="noopener noreferrer">Xヘルプセンター ↗</a>
          <a className="underline" href="https://x.com/Support" target="_blank" rel="noopener noreferrer">X Support ↗</a>
        </div>
      </section>
    </main>
  );
}
