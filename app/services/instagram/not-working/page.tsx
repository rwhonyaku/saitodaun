import Link from "next/link";
import type { Metadata } from "next";
import IMobileAd from "@/components/ads/IMobileAd";
import ServiceStatusBridge from "@/components/ServiceStatusBridge";

export const metadata: Metadata = {
  title: "Instagramが見れない・投稿できない？（障害か自分側か）",
  description: "Instagram（インスタ）のフィードやストーリーズが見れない、投稿・DM・ログインができない時に、広い障害か機能・アカウント・端末側かを確認します。",
  alternates: { canonical: "/services/instagram/not-working" },
};

export default function InstagramNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Instagramが見れない・投稿できない時の確認</h1>
        <p className="text-base text-neutral-600">まずInstagram全体の障害兆候を確認し、その後でフィード・ストーリーズ・リール、投稿、DM、ログインのどこに問題があるかを切り分けます。</p>
      </header>

      <div className="mt-6">
        <ServiceStatusBridge
          serviceId="instagram"
          serviceName="Instagram"
          serviceUrl="https://www.instagram.com"
          statusHref="/status/sites/instagram"
          officialLinks={[
            { label: "Meta公式ステータス", href: "https://metastatus.com/instagram" },
            { label: "Instagramヘルプセンター", href: "https://help.instagram.com/" },
          ]}
          featureLimitNote="Instagramの公開Webページに接続できても、フィード、ストーリーズ、リール、投稿、DMや個別アカウントの状態までは判定できません。利用者報告と機能ごとの差を合わせて確認します。"
          advice={{
            likely: "Instagram側の広い問題が疑われます。ログアウト、再インストール、パスワード変更は急がず、多い症状とMeta公式ステータスを確認してください。未投稿の下書きがある場合はアプリを削除しないでください。",
            partial: "一部機能または一部利用者に影響する問題が疑われます。多い症状が自分の症状と一致するなら設定を大きく変えず待ち、一致しなければ下の機能別確認へ進んでください。",
            normal: "広い障害の兆候は強くありません。フィード、投稿、DMのどれが失敗するかを分け、ブラウザ版、別アカウント、別端末や別回線で差が出るか確認します。",
            unknown: "自動確認だけでは判断できません。Instagramの詳しい報告推移とMeta公式情報を確認し、広い障害が見つからなければ下の症状別確認へ進んでください。",
          }}
        />
      </div>

      <nav className="mt-6 rounded-xl border border-neutral-200 bg-white p-4" aria-label="Instagramの症状を選ぶ">
        <p className="text-sm font-semibold">当てはまる症状から確認</p>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#viewing">フィード・ストーリーズを見れない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#posting">投稿・リールを公開できない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#dm">DMを送受信できない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#login">ログイン・一アカウントだけ使えない</a>
        </div>
      </nav>

      <section id="viewing" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">1) フィード・ストーリーズ・リールを見れない</h2>
        <p className="text-sm text-neutral-700">複数の表示機能が同時に止まるのか、一つだけ読み込めないのかを最初に確認します。</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>プロフィールやDMは開くか確認し、Instagram全体か表示機能だけかを分ける。</li>
          <li>アプリだけ失敗するならブラウザ版を開き、アプリ固有か確認する。</li>
          <li>Wi-Fiとモバイル回線を切り替え、片方だけ読み込めないか確認する。</li>
          <li>一人の投稿だけ見えない場合は、全体障害より公開範囲、削除、ブロックなど個別条件を疑う。</li>
        </ul>
        <p className="text-sm text-neutral-700">他のサービスにも接続できない場合は、<Link className="underline" href="/troubleshooting/internet-not-working">インターネット接続の確認</Link>へ進みます。</p>
      </section>

      <section id="posting" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">2) 写真・動画・ストーリーズ・リールを投稿できない</h2>
        <p className="text-sm text-neutral-700">閲覧できても投稿だけ失敗する場合、アップロード機能、メディア、アプリ権限またはアカウント側を確認します。</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>短い写真投稿など別形式で試し、動画やリールだけ失敗するか確認する。</li>
          <li>写真・動画へのアクセス権限と端末の空き容量を確認する。</li>
          <li>アップロード中のままなら連打せず、下書きを保持したまま回線を切り替える。</li>
          <li>別アカウントでは投稿できるなら、端末全体より対象アカウントの制限や状態を確認する。</li>
        </ul>
        <p className="text-sm text-neutral-600">アプリを削除すると端末内の下書きを失う可能性があります。再インストールは下書きの扱いを確認してから最後に判断します。</p>
      </section>

      <IMobileAd slot="notworking_mid" />

      <section id="dm" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">3) DMを送れない・届かない</h2>
        <p className="text-sm text-neutral-700">フィードや投稿が使えるのにDMだけ失敗する場合、Instagram全体の停止とは限りません。</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>別の相手へ短いテキストを送り、一つの会話だけかDM全体かを分ける。</li>
          <li>テキストは送れて画像だけ失敗するなら、メディア送信の問題として確認する。</li>
          <li>送信済み表示やリクエスト欄を確認し、同じ内容を繰り返し送らない。</li>
          <li>一人にだけ送れない場合は、相手の受信設定やアカウント状態も候補になります。</li>
        </ul>
      </section>

      <section id="login" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">4) ログインできない・一つのアカウントだけ使えない</h2>
        <p className="text-sm text-neutral-700">別アカウントや別端末では使える場合、広い障害より認証、本人確認、セキュリティ判定または対象アカウント側を確認します。</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>既にログイン済みの別端末があれば、障害確認が終わるまでログアウトしない。</li>
          <li>ブラウザ版でも同じアカウントが失敗するか確認し、アプリ固有かを分ける。</li>
          <li>本人確認や制限の案内が表示される場合は、画面の公式手順とヘルプセンターを使う。</li>
          <li>パスワード変更を連続せず、不審なメールや非公式の復旧案内を利用しない。</li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-5">
        <h2 className="text-lg font-semibold">詳しい報告推移とInstagram公式情報</h2>
        <p className="mt-2 text-sm text-neutral-700">Instagramのステータスページでは、外部接続、日本の利用者報告、直近30分で多い症状、過去24時間の推移を確認できます。公開Webページの応答だけでは、アプリ内の各機能や個別アカウントの状態は分かりません。</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/status/sites/instagram">Instagramの詳しい状況・報告推移</Link>
          <a className="underline" href="https://metastatus.com/instagram" target="_blank" rel="noopener noreferrer">Meta公式ステータス ↗</a>
          <a className="underline" href="https://help.instagram.com/" target="_blank" rel="noopener noreferrer">Instagramヘルプセンター ↗</a>
        </div>
      </section>
    </main>
  );
}
