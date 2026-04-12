import EvergreenPageShell from "@/components/EvergreenPageShell";
import { SITE } from "@/lib/siteMeta";

export const metadata = {
  title: "仕組み・チェック内容について | サイトダウン",
  description: `${SITE.name}が採用している外形監視技術と、接続判定のプロセスを専門的に解説します。`,
};

export default function HowItWorksPage() {
  return (
    <EvergreenPageShell
      h1="仕組み・チェック内容について"
      updatedAt="2026-02-22"
      lead={[
        `${SITE.name} は、ユーザーの代わりに「当サイトのバックエンドシステム」が対象ウェブサイトへ直接アクセスを試み、その応答をリアルタイムで解析する外形監視ユーティリティです。`
      ]}
      sections={[
        {
          type: "p",
          title: "接続検証の技術的フロー",
          body: [
            <div key="steps" className="space-y-6 my-4">
              <div className="flex gap-4 items-start">
                <div className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-1 rounded border border-slate-200 uppercase">Step 1</div>
                <div>
                  <p className="font-bold text-sm">HTTPリクエストの生成</p>
                  <p className="text-slate-600 text-xs">当サイトのサーバーから標準的なWebブラウザに近いヘッダー情報（User-Agent）を伴ったリクエストを送信します。</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-1 rounded border border-slate-200 uppercase">Step 2</div>
                <div>
                  <p className="font-bold text-sm">ネットワーク疎通の確認</p>
                  <p className="text-slate-600 text-xs">TCP/IPハンドシェイクおよびSSL/TLSプロトコルが正常に完了し、データ通信路が確立されるかを計測します。</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-1 rounded border border-slate-200 uppercase">Step 3</div>
                <div>
                  <p className="font-bold text-sm">レスポンス解析</p>
                  <p className="text-slate-600 text-xs">返却されたHTTPステータスコードを読み取ります。200なら正常、503なら過負荷といった形式で判断します。</p>
                </div>
              </div>
            </div>
          ]
        },
        {
          type: "list",
          title: "表示データについて",
          items: [
            "オンライン／オフライン: 最終的な到達可能性に基づいた総合判定。",
            "HTTPステータスコード: 相手サーバーからの正式な応答ステータス。",
            "応答時間 (Latency): リクエスト送信から最初の1バイトを受信するまでの時間。",
            "判定時刻: 日本標準時（JST）での最終チェック時刻。"
          ]
        },
        {
          type: "list",
          title: "判定の対象外となる要素",
          items: [
            "ログイン後のマイページ内でのエラー",
            "データベースの遅延による特定検索の不具合",
            "JavaScriptによる画面表示の崩れ",
            "特定の国やIPアドレスからのアクセス制限"
          ]
        },
        {
          type: "note",
          title: "ご利用上の注意",
          body: [
            "本ツールは一次判断を迅速に行うためのものです。ミッションクリティカルな業務における監視には、専門のSaaS型監視ソリューションの併用を推奨いたします。"
          ]
        }
      ]}
    />
  );
}