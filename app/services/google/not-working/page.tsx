import Link from "next/link";
import type { Metadata } from "next";
import IMobileAd from "@/components/ads/IMobileAd";
import ServiceStatusBridge from "@/components/ServiceStatusBridge";

export const metadata: Metadata = { title: "Googleが開かない・検索できない時の確認｜障害か自分側か", description: "Google検索が開かない、検索結果が出ない、ログインできない時に、Google側の問題か端末・ブラウザ・回線側かを確認します。", alternates: { canonical: "/services/google/not-working" } };
const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => <section id={id} className="mt-10 scroll-mt-6 space-y-3"><h2 className="text-xl font-semibold">{title}</h2>{children}</section>;

export default function Page() {
  return <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
    <header className="space-y-3"><h1 className="text-3xl font-semibold tracking-tight">Googleが開かない・検索できない時の確認</h1><p className="text-base text-neutral-600">まず広い障害兆候を確認し、検索、Googleアカウント、個別サービス、利用環境のどこに問題があるかを分けます。</p></header>
    <div className="mt-6"><ServiceStatusBridge serviceId="google" serviceName="Google" serviceUrl="https://www.google.com" statusHref="/status/sites/google" officialLinks={[{ label: "Google Workspace ステータス", href: "https://www.google.com/appsstatus/dashboard/" }, { label: "Google ヘルプ", href: "https://support.google.com/" }]} featureLimitNote="google.comへの接続が正常でも、検索結果、Googleアカウント、Gmail、Googleドライブなど個別機能の状態までは判定できません。" advice={{ likely: "Google側の広い問題が疑われます。設定変更は急がず、報告推移と公式情報を確認してください。", partial: "一部機能または一部利用者への影響が疑われます。多い症状と自分の症状を比較してください。", normal: "広い障害の兆候は強くありません。検索、ログイン、個別サービスのどこで失敗するか確認してください。", unknown: "まだ状況を断定できません。報告推移を確認し、広がりがなければ症状別確認へ進んでください。" }} /></div>
    <Section id="search" title="検索が開かない・結果が出ない"><ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700"><li>検索画面自体か、検索後だけ失敗するかを確認する。</li><li>他サイトも開かないなら<Link className="underline" href="/troubleshooting/internet-not-working">インターネット接続</Link>を確認する。</li><li>別ブラウザと別回線で比較し、拡張機能・VPN・DNSの影響を分ける。</li></ul></Section>
    <Section id="login" title="Googleアカウントに入れない"><p className="text-sm text-neutral-700">ログアウト状態で検索できるなら、認証、確認コード、アカウント側を確認します。広い障害中は正常な端末から不用意にログアウトしないでください。</p></Section>
    <IMobileAd slot="notworking_mid" />
    <Section id="product" title="GmailやGoogleドライブだけ使えない"><p className="text-sm text-neutral-700">検索が正常なら対象サービス固有の状態、権限、容量、同期を確認します。</p><div className="flex flex-wrap gap-3 text-sm"><Link className="underline" href="/status/sites/gmail">Gmailの状況</Link><Link className="underline" href="/status/sites/google-drive">Googleドライブの状況</Link><a className="underline" href="https://www.google.com/appsstatus/dashboard/" target="_blank" rel="noopener noreferrer">Workspace公式状況 ↗</a></div><p className="text-xs text-neutral-500">公式ダッシュボードは主にGoogle Workspace向けで、一般向け検索の全状態を示すものではありません。</p></Section>
    <Section id="details" title="詳しい報告推移"><Link className="text-sm font-semibold underline" href="/status/sites/google">Googleの現在の状況・利用者報告</Link></Section>
  </main>;
}
