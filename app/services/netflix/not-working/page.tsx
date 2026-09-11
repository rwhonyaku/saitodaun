import Link from "next/link";
import type { Metadata } from "next";
import IMobileAd from "@/components/ads/IMobileAd";
import ServiceStatusBridge from "@/components/ServiceStatusBridge";

export const metadata: Metadata = {
  title: "Netflixが見れない・再生できない？（障害か自分側か）",
  description:
    "Netflixにつながらない、再生が始まらない、途中で止まる、テレビだけ見れない時に、広い障害か作品・端末・アプリ・回線側かを確認します。",
  alternates: { canonical: "/services/netflix/not-working" },
};

export default function NetflixNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Netflixが見れない・再生できない時の確認
        </h1>
        <p className="text-base text-neutral-600">
          現在の利用者報告を確認してから、接続、再生開始、バッファリング、作品・端末固有のどこで止まっているかを調べます。
        </p>
      </header>

      <div className="mt-6">
        <ServiceStatusBridge
          serviceId="netflix"
          serviceName="Netflix"
          serviceUrl="https://www.netflix.com/jp/"
          statusHref="/status/sites/netflix"
          officialLinks={[
            { label: "Netflix公式サービス状況", href: "https://help.netflix.com/ja/node/13243" },
            { label: "Netflixヘルプセンター", href: "https://help.netflix.com/ja/" },
          ]}
          featureLimitNote="Netflixサイトへの接続を確認できても、動画配信、特定作品、テレビアプリ、端末認証やアカウントの状態までは判定できません。利用者報告と再生条件の比較で判断します。"
          advice={{
            likely:
              "Netflix側で多くの利用者に影響する問題が疑われます。アプリの再インストール、ログアウト、テレビやネットワーク設定の初期化は急がず、最も多い症状と公式サービス状況を確認してください。視聴を続ける必要があれば、まず別の対応端末で再生できるか確認します。",
            partial:
              "再生や接続など一部機能の問題が疑われます。上の多い症状と一致する場合は端末設定を大きく変えず公式情報を確認し、一致しなければ下の症状別確認へ進んでください。",
            normal:
              "広い障害の兆候は強くありません。下から症状を選び、別作品、別端末、アプリとブラウザ、別回線で差が出るか確認すると、作品・端末・アプリ・回線のどこに原因があるか絞れます。",
            unknown:
              "まだ状況を断定できません。Netflixの詳しい報告推移と公式サービス状況を確認し、問題が広がっていなければ当てはまる再生症状を確認してください。",
          }}
        />
      </div>

      <nav className="mt-6 rounded-xl border border-neutral-200 bg-white p-4" aria-label="Netflixの症状を選ぶ">
        <p className="text-sm font-semibold">当てはまる症状から確認</p>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#connection">Netflixにつながらない・開かない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#playback">作品を再生できない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#buffering">途中で止まる・読み込みが続く</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#device-title">一つの作品・端末だけ見れない</a>
        </div>
      </nav>

      <section id="connection" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">1) Netflixにつながらない・アプリが開かない</h2>
        <p className="text-sm text-neutral-700">
          Netflixだけ開かないのか、他のサイトや動画サービスも使えないのかを最初に確認します。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>他のサービスも開かないなら、Netflixより先に端末とインターネット接続を確認する。</li>
          <li>テレビアプリだけ開かない場合は、スマホまたはブラウザでNetflixを開き、アカウント全体の問題かを確認する。</li>
          <li>Wi-Fiだけ失敗するなら別回線で試し、VPNやプロキシを利用中なら一時的に外して差を確認する。</li>
          <li>ログイン画面まで進めるが一つのアカウントだけ失敗する場合は、広い接続障害よりアカウント側を確認する。</li>
        </ul>
        <p className="text-sm text-neutral-700">
          他のサービスにも接続できない場合は、
          <Link className="underline" href="/troubleshooting/internet-not-working">インターネット接続の確認</Link>
          へ進みます。
        </p>
      </section>

      <section id="playback" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">2) 作品を選べるが再生が始まらない</h2>
        <p className="text-sm text-neutral-700">
          ホーム画面や作品詳細が開くなら、サイト全体ではなく動画配信、作品、端末、アプリ側の問題を切り分けます。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>別の作品を再生する。別作品が動けば、最初の作品固有の可能性があります。</li>
          <li>同じ作品を別端末で試す。別端末で動けば、元の端末やアプリ側を優先します。</li>
          <li>アプリで失敗する場合は対応ブラウザで試す。ブラウザで動けば、急ぎの視聴はそちらを使います。</li>
          <li>Netflixのエラーコードが表示される場合は、コードをそのままNetflix公式ヘルプで確認する。</li>
        </ul>
        <p className="text-sm text-neutral-600">再生を繰り返す前に、アプリの完全終了と端末再起動を一度だけ試します。</p>
      </section>

      <IMobileAd slot="notworking_mid" />

      <section id="buffering" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">3) 再生が途中で止まる・読み込みが続く</h2>
        <p className="text-sm text-neutral-700">
          バッファリングは回線速度だけでなく、通信の安定性、Wi-Fiの混雑、端末の受信状態にも影響されます。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>同じ回線で別の動画サービスも止まるなら、Netflix固有より回線側の可能性が上がります。</li>
          <li>画質を一時的に下げて安定するなら、利用中の回線品質が再生条件に追いついていない可能性があります。</li>
          <li>テレビだけ止まるなら、ルーターとの距離、Wi-Fi受信状態、可能なら有線接続で差を確認する。</li>
          <li>別回線・別端末でも同じ時間に複数作品が止まるなら、Netflix側の再生問題も確認する。</li>
        </ul>
      </section>

      <section id="device-title" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">4) 一つの作品・テレビ・端末だけ見れない</h2>
        <div className="space-y-4 text-sm text-neutral-700">
          <div>
            <h3 className="font-semibold text-slate-900">一つの作品だけ再生できない</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>同じ端末で別作品が動けば、Netflix全体の障害ではありません。</li>
              <li>同じ作品を別端末でも試し、作品固有か端末固有かを確認する。</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">テレビやストリーミング端末だけ見れない</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>スマホやブラウザで視聴できるなら、テレビ側のアプリ更新と端末再起動を優先する。</li>
              <li>同じWi-Fiでも端末ごとに受信状態が違うため、テレビのネットワーク接続を確認する。</li>
              <li>アプリ再インストールや機器初期化は、公式の機種別手順を確認してから最後に判断する。</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-5">
        <h2 className="text-lg font-semibold">詳しい報告推移とNetflix公式情報</h2>
        <p className="mt-2 text-sm text-neutral-700">
          Netflixのステータスページでは、外部接続、日本の利用者報告、直近30分で多い症状、過去24時間の推移を確認できます。公開Webページの応答だけでは、動画再生用の配信経路やテレビアプリの状態は分かりません。
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/status/sites/netflix">Netflixの詳しい状況・報告推移</Link>
          <a className="underline" href="https://help.netflix.com/ja/node/13243" target="_blank" rel="noopener noreferrer">Netflix公式サービス状況 ↗</a>
          <a className="underline" href="https://help.netflix.com/ja/" target="_blank" rel="noopener noreferrer">Netflixヘルプセンター ↗</a>
        </div>
      </section>
    </main>
  );
}
