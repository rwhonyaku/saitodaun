import Link from "next/link";
import type { Metadata } from "next";
import IMobileAd from "@/components/ads/IMobileAd";
import ServiceStatusBridge from "@/components/ServiceStatusBridge";
export const metadata:Metadata={title:"Notionが開かない・同期できない時の確認｜障害か自分側か",description:"Notionが開かない、保存・同期されない、ログインできない時に、Notion側かワークスペース・アプリ・回線側かを確認します。",alternates:{canonical:"/services/notion/not-working"}};
const S=({title,children}:{title:string;children:React.ReactNode})=><section className="mt-10 space-y-3"><h2 className="text-xl font-semibold">{title}</h2>{children}</section>;
export default function Page(){return <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
 <header className="space-y-3"><h1 className="text-3xl font-semibold">Notionが開かない・同期できない時の確認</h1><p className="text-neutral-600">広い障害兆候を確認し、読み込み、保存・同期、ログイン、特定ページのどこに問題があるかを分けます。</p></header>
 <div className="mt-6"><ServiceStatusBridge serviceId="notion" serviceName="Notion" serviceUrl="https://www.notion.so" statusHref="/status/sites/notion" officialLinks={[{label:"Notion公式ステータス",href:"https://status.notion.so/"},{label:"Notionヘルプ",href:"https://www.notion.so/help"}]} featureLimitNote="公開サイトに接続できても、特定ワークスペース、ページ、データベース、保存・同期の状態までは判定できません。" advice={{likely:"Notion側の広い問題が疑われます。未同期の編集を保ったまま公式情報を確認してください。",partial:"一部機能または一部利用者への影響が疑われます。多い症状を確認してください。",normal:"広い障害の兆候は強くありません。ページ、アプリ、ブラウザ、回線の差を確認してください。",unknown:"まだ断定できません。公式情報と報告推移を確認してください。"}}/></div>
 <S title="ワークスペース・ページが開かない"><p className="text-sm text-neutral-700">アプリとWeb版、一つと全ワークスペースで比較します。他サイトも不安定なら<Link className="underline" href="/troubleshooting/internet-not-working">接続を確認</Link>してください。</p></S>
 <S title="変更が保存・同期されない"><p className="text-sm text-neutral-700">同期遅延だけでデータ消失とは限りません。「保存中」「オフライン」と最終更新時刻を確認し、内容を控え、別端末から重ねて編集しないでください。</p></S>
 <IMobileAd slot="notworking_mid"/>
 <S title="ログイン・SSOで止まる"><p className="text-sm text-neutral-700">登録時と同じログイン方法を確認します。会社SSOだけなら認証サービスとVPN、会社回線だけなら<Link className="underline" href="/troubleshooting/site-blocked-by-firewall">アクセス制限</Link>を確認します。</p></S>
 <S title="一つのページ・データベースだけ使えない"><p className="text-sm text-neutral-700">別ページが開くなら権限、共有リンク、正しいアカウントかを確認します。一つのビューだけ重い場合は別ビューで比較してください。</p></S>
 <S title="詳しい報告推移"><Link className="text-sm font-semibold underline" href="/status/sites/notion">Notionの現在の状況・利用者報告</Link></S>
</main>}
