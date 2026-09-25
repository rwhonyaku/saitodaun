import Link from "next/link";
import type { Metadata } from "next";
import IMobileAd from "@/components/ads/IMobileAd";
import ServiceStatusBridge from "@/components/ServiceStatusBridge";
export const metadata: Metadata = { title: "Slackが使えない・送れない時の確認｜障害か自分側か", description: "Slackが開かない、送れない、ログインできない時に、Slack側かワークスペース・アプリ・ネットワーク側かを確認します。", alternates: { canonical: "/services/slack/not-working" } };
const S=({id,title,children}:{id:string;title:string;children:React.ReactNode})=><section id={id} className="mt-10 scroll-mt-6 space-y-3"><h2 className="text-xl font-semibold">{title}</h2>{children}</section>;
export default function Page(){return <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
  <header className="space-y-3"><h1 className="text-3xl font-semibold">Slackが使えない・送れない時の確認</h1><p className="text-neutral-600">広い障害兆候を先に確認し、読み込み、メッセージ、ログイン、ハドルや通知のどこで問題が起きているかを分けます。</p></header>
  <div className="mt-6"><ServiceStatusBridge serviceId="slack" serviceName="Slack" serviceUrl="https://slack.com" statusHref="/status/sites/slack" officialLinks={[{label:"Slack公式ステータス",href:"https://status.slack.com/"},{label:"Slackヘルプ",href:"https://slack.com/help"}]} featureLimitNote="公開サイトに接続できても、特定ワークスペースのメッセージ、SSO、ハドル、通知、検索の状態までは判定できません。" advice={{likely:"Slack側の広い問題が疑われます。再ログインや再インストールは急がず公式情報を確認してください。",partial:"一部機能または一部利用者への影響が疑われます。多い症状と自分の症状を比較してください。",normal:"広い障害の兆候は強くありません。アプリ、ブラウザ、ワークスペース、社内ネットワークの差を確認してください。",unknown:"まだ断定できません。公式情報と報告推移を確認してください。"}}/></div>
  <S id="load" title="ワークスペースが開かない"><ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700"><li>アプリとWeb版、一つと全ワークスペースで比較する。</li><li>他サイトも不安定なら<Link className="underline" href="/troubleshooting/internet-not-working">接続を確認</Link>する。</li></ul></S>
  <S id="message" title="メッセージを送れない・更新されない"><p className="text-sm text-neutral-700">送信中、エラー、受信停止のどれかを確認します。同じ投稿を連打せず、再接続後の重複送信を確認してください。</p></S>
  <IMobileAd slot="notworking_mid"/>
  <S id="login" title="ログイン・SSOで止まる"><p className="text-sm text-neutral-700">正しいワークスペースURLと会社指定の認証方法を確認します。会社回線だけ失敗するなら<Link className="underline" href="/troubleshooting/site-blocked-by-firewall">アクセス制限</Link>も確認してください。</p></S>
  <S id="feature" title="ハドル・通知・検索だけ使えない"><p className="text-sm text-neutral-700">ハドルはマイク権限とネットワーク、通知はSlackとOS両方の許可、検索は送受信が正常かを確認します。</p></S>
  <S id="details" title="詳しい報告推移"><Link className="text-sm font-semibold underline" href="/status/sites/slack">Slackの現在の状況・利用者報告</Link></S>
</main>}
