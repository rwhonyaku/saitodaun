import Link from "next/link";
import type { Metadata } from "next";
import IMobileAd from "@/components/ads/IMobileAd";

export const metadata: Metadata = {
  title: "Gmailが送れない・受信できない時の確認｜障害か自分側か",
  description:
    "Gmailが送れない、受信できない、開かない時に、Google側の障害かメール設定・同期・容量・アカウント側かを症状別に確認します。",
  alternates: { canonical: "/services/gmail/not-working" },
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-10 scroll-mt-6 space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default function GmailNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Gmailが送れない・受信できない時の確認
        </h1>
        <p className="text-base text-neutral-600">
          まずGmail側の状況を確認し、送信、受信・同期、ログイン、会社や学校のGoogle Workspaceのどこに問題があるかを分けます。
        </p>
      </header>

      <section className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-5">
        <h2 className="text-lg font-semibold">最初にGmailの現在状況を確認</h2>
        <p className="mt-2 text-sm text-neutral-700">
          Gmailは自動接続チェックを制限することがあります。「確認不可」でも障害とは限らないため、Google Workspace公式ステータスと合わせて判断してください。
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
          <Link className="underline underline-offset-2" href="/status/sites/gmail">
            Gmailの現在状況を見る
          </Link>
          <a
            className="underline underline-offset-2"
            href="https://www.google.com/appsstatus/dashboard/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Workspace公式ステータス ↗
          </a>
        </div>
        <p className="mt-3 text-xs text-neutral-600">
          Gmailは現在、サイト内の利用者報告受付対象外です。公式情報と、自分の症状がWeb版・アプリ版の両方で起きるかを優先します。
        </p>
      </section>

      <nav className="mt-6 rounded-xl border border-neutral-200 p-4" aria-label="Gmailの症状を選ぶ">
        <p className="text-sm font-semibold">当てはまる症状から確認</p>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#send">メールを送れない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#receive">受信・同期されない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#open">Gmailが開かない・ログインできない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#workspace">会社・学校のGmailだけ使えない</a>
        </div>
      </nav>

      <Section id="send" title="1) メールを送れない">
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>送信トレイに残るのか、送信直後にエラーが出るのか、配信不能メールが戻るのかを確認する。</li>
          <li>Web版では送れる場合、メールアプリの認証・同期設定を確認する。</li>
          <li>添付ありだけ失敗する場合は、ファイルサイズと種類を確認する。</li>
          <li>同じメールを連打せず、送信済みと送信トレイを確認してから再試行する。</li>
        </ul>
      </Section>

      <Section id="receive" title="2) メールを受信できない・同期されない">
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>Web版に届いているなら、Gmail全体ではなくアプリの同期・省電力設定を確認する。</li>
          <li>迷惑メール、フィルタ、転送設定、受信トレイ以外のカテゴリを確認する。</li>
          <li>Googleストレージの空き容量を確認する。容量不足では新しいメールを受信できないことがある。</li>
          <li>特定の送信者だけ届かない場合は、その送信元とフィルタ・ブロック設定を確認する。</li>
        </ul>
      </Section>

      <IMobileAd slot="notworking_mid" />

      <Section id="open" title="3) Gmailが開かない・ログインできない">
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>Google検索などログアウト状態のサービスが使えるか確認し、Google全体とアカウント問題を分ける。</li>
          <li>別ブラウザやシークレットウィンドウで開ける場合は、拡張機能、Cookie、ブラウザ設定を確認する。</li>
          <li>他サイトも開かない場合は、<Link className="underline" href="/troubleshooting/internet-not-working">インターネット接続</Link>を先に確認する。</li>
          <li>確認コードや本人確認で止まる場合は、設定初期化ではなくGoogleのアカウント復旧案内を使う。</li>
        </ul>
      </Section>

      <Section id="workspace" title="4) 会社・学校のGmailだけ使えない">
        <p className="text-sm text-neutral-700">
          個人Gmailが使えるのに組織アカウントだけ失敗する場合は、Google全体より管理者設定、SSO、ライセンス、組織側のメール経路を確認します。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>同僚にも同じ症状があるか確認し、組織全体か一つのアカウントだけかを分ける。</li>
          <li>SSOや会社VPNで止まる場合は、組織の管理者・社内障害情報を確認する。</li>
          <li>管理者には発生時刻、エラー表示、送信・受信のどちらか、Web版とアプリ版の差を伝える。</li>
        </ul>
      </Section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-5">
        <h2 className="text-lg font-semibold">関連するGoogleサービスも確認</h2>
        <p className="mt-2 text-sm text-neutral-700">
          Gmail以外にも影響がある場合は、Google全体またはGoogleドライブの状況と比較できます。
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/status/sites/gmail">Gmailの現在状況</Link>
          <Link className="underline" href="/status/sites/google">Google全体の状況</Link>
          <Link className="underline" href="/status/sites/google-drive">Googleドライブの状況</Link>
          <a className="underline" href="https://support.google.com/mail/" target="_blank" rel="noopener noreferrer">Gmail公式ヘルプ ↗</a>
        </div>
      </section>
    </main>
  );
}
