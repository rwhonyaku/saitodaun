import Link from "next/link";
import type { Metadata } from "next";
import ServiceStatusBridge from "@/components/ServiceStatusBridge";

export const metadata: Metadata = {
  title: "Teamsが使えない・会議に入れない時の対処法｜自分側か確認",
  description:
    "Teamsが使えない、会議に入れない、ログインできない、チャットが送れない時に、Microsoft側の障害、SSO、会社VPN・ファイアウォール、アプリ不具合を確認します。",
  alternates: { canonical: "/services/teams/not-working" }
};

export default function TeamsNotWorkingPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Teamsが使えない・開かない時の対処法</h1>
        <p className="text-base text-neutral-600">
          まず広い障害の兆候を確認し、その後で会議、接続、ログイン、チャットのどこに問題があるかを切り分けます。
        </p>
      </header>

      <div className="mt-6">
        <ServiceStatusBridge
          serviceId="teams"
          serviceName="Microsoft Teams"
          serviceUrl="https://www.microsoft.com/ja-jp/microsoft-teams"
          statusHref="/status/sites/teams"
          officialLinks={[
            {
              label: "Microsoft 365サービス正常性（管理者向け）",
              href: "https://admin.microsoft.com/Adminportal/Home#/servicehealth",
            },
            { label: "Microsoft 365 Status（X）", href: "https://x.com/MSFT365Status" },
          ]}
          featureLimitNote="外部からの接続確認だけでは、Teams会議、チャット、ログイン認証や特定組織内の状態までは判定できません。利用者報告と公式情報を合わせて判断します。"
          advice={{
            likely:
              "Microsoft側の問題の可能性があります。再インストール、ログアウト、アカウントや組織設定の変更は急がず、公式情報と影響している機能を確認してください。急ぎの場合はブラウザ版、別端末、会議のダイヤルイン、または組織で承認された連絡手段を使います。",
            partial:
              "一部機能の問題が疑われます。上に表示された多い症状と自分の症状が一致するか確認し、同じなら端末設定を大きく変えず公式情報を待ちます。一致しない場合は下の該当する症状から切り分けてください。",
            normal:
              "広い障害の兆候は強くありません。下から自分の症状を選び、ブラウザ版、別端末、別の利用者との差を確認すると、アプリ・組織・端末・ネットワークのどこに原因があるか絞れます。",
            unknown:
              "自動確認だけでは判断できません。詳しいTeams状況とMicrosoft公式情報を確認し、広い障害が見つからなければ下の症状別確認へ進んでください。",
          }}
        />
      </div>

      <nav className="mt-6 rounded-xl border border-neutral-200 bg-white p-4" aria-label="Teamsの症状を選ぶ">
        <p className="text-sm font-semibold">当てはまる症状から確認</p>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#meeting">会議に参加できない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#connection">Teamsにつながらない・開かない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#login">ログインできない</a>
          <a className="rounded-lg bg-slate-50 px-3 py-2 font-medium underline" href="#chat">チャットだけ送れない</a>
        </div>
      </nav>

      <section id="meeting" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">1) Teams会議に参加できない</h2>
        <p className="text-sm text-neutral-700">
          チャットや予定表が使えるなら、Teams全体ではなく会議参加の経路、組織設定、ロビー、または音声・映像だけの問題かを確認します。
        </p>
        <ol className="list-decimal space-y-3 pl-5 text-sm text-neutral-700">
          <li>
            <b>会議URLが開くか：</b>リンク自体が無効、期限切れ、別組織向けの場合は、主催者に正しい招待URLを確認します。
          </li>
          <li>
            <b>ブラウザから参加できるか：</b>ブラウザでは入れる場合、デスクトップアプリ側の問題が濃厚です。急ぎならブラウザ版を使います。
          </li>
          <li>
            <b>認証のどこで止まるか：</b>サインインを求められる、別アカウントが選ばれる、ゲスト参加を拒否される場合は、参加先組織と使用アカウントを確認します。
          </li>
          <li>
            <b>ロビーで待っているか：</b>「参加を要求しました」から進まない場合は接続障害とは限りません。主催者に入室許可を確認します。
          </li>
          <li>
            <b>他の参加者も入れないか：</b>複数の参加者が別端末・別回線でも失敗するなら、会議設定またはMicrosoft側の問題が疑われます。
          </li>
        </ol>
        <div className="rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">参加後に音声・映像だけ使えない場合</p>
          <p className="mt-1">
            会議への接続は成功しています。Teamsで選択中のマイク・カメラ・スピーカーと、OSの権限を確認します。会議案内に電話番号がある場合は、急ぎの音声参加にダイヤルインを使えます。
          </p>
        </div>
      </section>

      <section id="connection" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">2) Teamsにつながらない・開かない</h2>
        <p className="text-sm text-neutral-700">
          まずブラウザ版とアプリ版を比較します。ブラウザだけ使えるならアプリ側、両方だめなら組織アカウントやネットワーク、Microsoft側の問題を優先します。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>社内の別の利用者にも同じ症状があるか確認する。</li>
          <li>会社VPNや社内Wi-Fiだけで失敗するなら、別の許可された回線で差を確認する。</li>
          <li>OutlookやOneDriveも同時に使えないなら、Teams単体ではなくMicrosoft 365全体の状態を確認する。</li>
        </ul>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/status/sites/microsoft-365">Microsoft 365の現在状況</Link>
          <Link className="underline" href="/troubleshooting/site-blocked-by-firewall">社内ネットワーク制限の確認</Link>
        </div>
      </section>

      <section id="login" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">3) Teamsにログインできない</h2>
        <p className="text-sm text-neutral-700">
          Microsoftのサインイン画面自体が開かないのか、認証後にTeamsへ戻れないのか、会社の確認画面で拒否されるのかを見ます。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>ブラウザのプライベートウィンドウで正しい会社・学校アカウントを選ぶ。</li>
          <li>他のMicrosoft 365サービスにもログインできないなら、認証またはMicrosoft 365側の問題として確認する。</li>
          <li>会社端末やVPN接続時だけ拒否される場合は、SSO、条件付きアクセス、端末登録を管理者に確認する。</li>
        </ul>
        <p className="text-sm text-neutral-700">
          広い障害が疑われる間は、ログアウトやパスワード変更を急ぐ必要はありません。個別の認証問題なら{" "}
          <Link className="underline" href="/troubleshooting/cant-log-in">ログインできない時の確認手順</Link>
          へ進みます。
        </p>
      </section>

      <section id="chat" className="mt-10 scroll-mt-6 space-y-4">
        <h2 className="text-xl font-semibold">4) チャット・メッセージだけ送れない</h2>
        <p className="text-sm text-neutral-700">
          履歴や予定表は開くのに送信だけ失敗する場合は、チャット機能の部分障害、相手・チャンネル固有の制限、またはアプリ側を確認します。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          <li>別の相手やチャンネルにも送れないか確認する。一か所だけなら、その会話や権限の問題が疑われます。</li>
          <li>短いテキストは送れるがファイルだけ失敗するなら、Teams全体ではなくファイル共有や組織ポリシー側を確認する。</li>
          <li>ブラウザ版では送れるなら、急ぎの連絡はブラウザ版を使い、後でアプリを再起動・更新する。</li>
          <li>複数人で送信や受信が遅れているなら、端末を大きく変更せずMicrosoft側の情報を確認する。</li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-5">
        <h2 className="text-lg font-semibold">公式情報と詳しい報告推移</h2>
        <p className="mt-2 text-sm text-neutral-700">
          サイトダウン.comのTeamsステータスページでは、外部接続、日本の利用者報告、直近30分の症状、過去24時間の推移をまとめて確認できます。Microsoft 365サービス正常性は組織管理者向けで、テナント固有の影響確認に役立ちます。
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link className="underline" href="/status/sites/teams">Teamsの詳しい状況・報告推移</Link>
          <a className="underline" href="https://support.microsoft.com/ja-jp/teams" target="_blank" rel="noopener noreferrer">Microsoft Teamsサポート ↗</a>
          <a className="underline" href="https://admin.microsoft.com/Adminportal/Home#/servicehealth" target="_blank" rel="noopener noreferrer">Microsoft 365サービス正常性 ↗</a>
        </div>
      </section>
    </main>
  );
}
