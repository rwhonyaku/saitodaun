import Link from "next/link";
import type { Metadata } from "next";
import IMobileAd from "@/components/ads/IMobileAd";
import ServiceStatusBridge from "@/components/ServiceStatusBridge";

export const metadata: Metadata = {
  title: "プライムビデオが見れない・再生できない時の原因確認｜障害か自分側か",
  description: "プライムビデオが今日見れない、再生できない、エラーが出る、テレビだけ見れない時に、Amazon側の障害か端末・アプリ・回線側かを確認します。",
  alternates: { canonical: "/services/prime-video/not-working" },
};

export default function PrimeVideoNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">プライムビデオが見れない・再生できない時の対処法</h1>
        <p className="text-base text-neutral-600">まず広いPrime Video不具合の兆候を確認し、その後で再生、作品、テレビ・アプリ、アカウントのどこに問題があるかを切り分けます。</p>
      </header>

      <div className="mt-6">
        <ServiceStatusBridge
          serviceId="prime-video"
          serviceName="Prime Video"
          serviceUrl="https://www.amazon.co.jp/gp/video/storefront"
          statusHref="/status/sites/prime-video"
          officialLinks={[{ label: "Amazon公式ヘルプ", href: "https://www.amazon.co.jp/gp/help/customer/display.html" }]}
          featureLimitNote="Prime Videoのストア画面に接続できても、動画配信、特定作品、テレビアプリ、端末登録やアカウントの視聴状態までは判定できません。利用者報告と再生条件の比較で判断します。"
          advice={{
            likely: "Prime Video側の広い問題が疑われます。アプリの再インストール、ログアウト、テレビやネットワーク設定の初期化は急がず、多い症状とAmazon公式ヘルプを確認してください。急ぎの場合は別の動画サービスを利用します。",
            partial: "再生や接続など一部機能の問題が疑われます。多い症状と一致する場合は設定を大きく変えず情報を確認し、一致しなければ下の症状別確認へ進んでください。",
            normal: "広い不具合の兆候は強くありません。別作品、別端末、アプリとブラウザ、別回線で差が出るか確認すると、作品・端末・アプリ・回線のどこに原因があるか絞れます。",
            unknown: "自動確認だけでは判断できません。Prime Videoの詳しい報告推移を確認し、広い不具合が見つからなければ下の症状別確認へ進んでください。",
          }}
        />
      </div>

      <nav className="mt-6 rounded-xl border border-neutral-200 bg-white p-4" aria-label="Prime Videoの症状を選ぶ">
        <p className="text-sm font-semibold">当てはまる症状から確認</p>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#playback">作品を再生できない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#buffering">途中で止まる・エラーになる</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#device">テレビ・アプリだけ見れない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#account-title">ログイン後・一作品だけ見れない</a>
        </div>
      </nav>

      <section id="playback" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">1) 作品一覧は開くが再生できない</h2>
        <p className="text-sm text-neutral-700">ストアや作品詳細が開くなら、Amazon全体の停止ではなく、動画配信、作品、端末またはアプリ側を切り分けます。</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>別作品を再生する。別作品が動けば、最初の作品固有の可能性があります。</li>
          <li>同じ作品を別端末で試す。別端末で動けば、元の端末やアプリ側を優先する。</li>
          <li>アプリで失敗する場合は対応ブラウザで試し、再生経路の差を確認する。</li>
          <li>エラーコードが表示される場合は、コードをそのままAmazon公式ヘルプで確認する。</li>
        </ul>
      </section>

      <section id="buffering" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">2) 再生が途中で止まる・読み込みやエラーが続く</h2>
        <p className="text-sm text-neutral-700">途中停止はPrime Video側の配信だけでなく、通信の安定性や端末の受信状態でも起きます。</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>同じ回線で別の動画サービスも止まるなら、Prime Video固有より回線側を疑う。</li>
          <li>画質を一時的に下げて安定するなら、利用中の回線品質を優先して確認する。</li>
          <li>別回線・別端末でも複数作品が同時に止まるなら、広い再生不具合の可能性が上がります。</li>
          <li>再生を連打せず、アプリの完全終了と端末再起動を一度だけ試す。</li>
        </ul>
        <p className="text-sm text-neutral-700">他のサービスにも接続できない場合は、<Link className="underline" href="/troubleshooting/internet-not-working">インターネット接続の確認</Link>へ進みます。</p>
      </section>

      <IMobileAd slot="notworking_mid" />

      <section id="device" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">3) テレビ・Fire TV・アプリだけ見れない</h2>
        <p className="text-sm text-neutral-700">ブラウザやスマホでは見られるのにテレビだけ失敗するなら、Prime Video全体より対象端末のアプリ、登録状態またはネットワークを確認します。</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>同じWi-Fiのスマホまたはブラウザで再生し、回線全体かテレビだけか確認する。</li>
          <li>Prime Videoアプリを完全終了し、テレビまたはFire TVを再起動する。</li>
          <li>アプリと端末ソフトウェアの更新が保留されていないか確認する。</li>
          <li>テレビだけ途切れるならWi-Fi受信状態を確認し、可能なら有線接続で差を見る。</li>
        </ul>
        <p className="text-sm text-neutral-600">再インストールや端末登録の解除は、障害ではないと確認し、Amazon公式の機種別手順を読んでから最後に判断します。</p>
      </section>

      <section id="account-title" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">4) ログイン後に止まる・一つの作品だけ見れない</h2>
        <div className="space-y-4 text-sm text-neutral-700">
          <div>
            <h3 className="font-semibold text-slate-900">ログインはできるが視聴を開始できない</h3>
            <p className="mt-2">同じアカウントを別端末で試し、端末固有か、支払い・会員資格・端末登録などアカウント側かを分けます。広い障害中は正常な端末からログアウトしないでください。</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">一つの作品だけ見れない</h3>
            <p className="mt-2">同じ端末で別作品が動けば、Prime Video全体の障害ではありません。配信期間、購入・レンタル状態、地域や作品固有の条件を作品画面と公式ヘルプで確認します。</p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-5">
        <h2 className="text-lg font-semibold">詳しい報告推移とAmazon公式情報</h2>
        <p className="mt-2 text-sm text-neutral-700">Prime Videoのステータスページでは、外部接続、日本の利用者報告、直近30分で多い症状、過去24時間の推移を確認できます。公開ストアの応答だけでは、動画配信経路やテレビアプリの状態は分かりません。</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/status/sites/prime-video">Prime Videoの詳しい状況・報告推移</Link>
          <a className="underline" href="https://www.amazon.co.jp/gp/help/customer/display.html" target="_blank" rel="noopener noreferrer">Amazon公式ヘルプ ↗</a>
        </div>
      </section>
    </main>
  );
}
