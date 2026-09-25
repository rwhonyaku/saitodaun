import Link from "next/link";
import type { Metadata } from "next";
import IMobileAd from "@/components/ads/IMobileAd";
export const metadata:Metadata={title:"TikTokが見れない・開かない時の確認｜障害か自分側か",description:"TikTokの動画が見れない、アプリが開かない、投稿できない時に、TikTok側かアプリ・端末・回線側かを確認します。",alternates:{canonical:"/services/tiktok/not-working"}};
const S=({title,children}:{title:string;children:React.ReactNode})=><section className="mt-10 space-y-3"><h2 className="text-xl font-semibold">{title}</h2>{children}</section>;
export default function Page(){return <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
 <header className="space-y-3"><h1 className="text-3xl font-semibold">TikTokが見れない・開かない時の確認</h1><p className="text-neutral-600">動画、アプリ、投稿、ログインの症状を分け、TikTok側か利用環境側かを確認します。</p></header>
 <section className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-5"><h2 className="text-lg font-semibold">最初に現在の状況を確認</h2><p className="mt-2 text-sm text-neutral-700">TikTokへの外部接続結果と確認時刻を見ます。正常でも動画配信、投稿、ログインなど個別機能までは判定できません。</p><Link className="mt-3 inline-block text-sm font-semibold underline" href="/status/sites/tiktok">TikTokの現在の状況を見る</Link></section>
 <S title="フィード・動画が見れない"><ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700"><li>全動画か一つの投稿だけかを確認する。</li><li>Wi-Fiとモバイル回線を比較し、通信制限とデータセーバーを確認する。</li><li>他アプリも止まるなら<Link className="underline" href="/troubleshooting/internet-not-working">接続を確認</Link>する。</li></ul></S>
 <S title="アプリが開かない・落ちる"><p className="text-sm text-neutral-700">ブラウザ版と比較し、アプリ更新と空き容量を確認します。下書きがある場合は再インストール前に消失リスクを確認してください。</p></S>
 <IMobileAd slot="notworking_mid"/>
 <S title="投稿・アップロードできない"><p className="text-sm text-neutral-700">視聴はできるか、写真・マイク権限と上り通信を確認します。処理中の投稿を繰り返さず、反映を確認してから再試行してください。</p></S>
 <S title="ログイン・アカウントの問題"><p className="text-sm text-neutral-700">登録時と同じログイン方法を使います。制限や本人確認の表示がある場合は公式案内に従ってください。</p><a className="text-sm font-semibold underline" href="https://support.tiktok.com/" target="_blank" rel="noopener noreferrer">TikTok公式サポート ↗</a></S>
</main>}
