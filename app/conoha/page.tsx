import type { Metadata } from "next";
import EvergreenPageShell from "@/components/EvergreenPageShell";
import { SITE } from "@/lib/siteMeta";

const LINKS = {
  conoha: "https://af.moshimo.com/af/c/click?a_id=5400008&p_id=2312&pc_id=4967&pl_id=92340",
  pencil: "https://af.moshimo.com/af/c/click?a_id=5400008&p_id=2312&pc_id=4967&pl_id=89336",
};

export const metadata: Metadata = {
  title: "ConoHa WING（コノハウィング）の特徴と使いどころを整理",
  description:
    "表示速度や運用しやすさの観点から、ConoHa WING を比較候補として整理するページです。比較ポイントと使いどころを短く確認できます。",
  alternates: { canonical: "/conoha" },
  openGraph: {
    title: "ConoHa WING（コノハウィング）の特徴と使いどころを整理",
    description:
      "表示速度や運用しやすさの観点から、ConoHa WING を比較候補として整理するページです。比較ポイントと使いどころを短く確認できます。",
    url: `${SITE.origin}/conoha`,
  },
  twitter: {
    title: "ConoHa WING（コノハウィング）の特徴と使いどころを整理",
    description:
      "表示速度や運用しやすさの観点から、ConoHa WING を比較候補として整理するページです。比較ポイントと使いどころを短く確認できます。",
  },
};

export default function ConoHaDeepDive() {
  return (
    <EvergreenPageShell
      h1="ConoHa WING（コノハウィング）の特徴と使いどころを整理"
      updatedAt="2026-02-24"
      lead={[
        "ウェブサイトの「表示速度」と「安定性」は、ユーザー体験だけでなくSEO（検索順位）にも直結する極めて重要な要素です。",
        "表示速度や運用しやすさの観点から、ConoHa WING を比較候補として整理します。広告・アフィリエイトリンクを含みます。"
      ]}
      sections={[
        {
          type: "div",
          title: "1. 主要3社徹底比較：ConoHa vs エックスサーバー vs さくら",
          body: [
            "国内の主要レンタルサーバーと比較しても、ConoHa WINGのコストパフォーマンスと処理能力は頭一つ抜けています。",
            <div key="comparison-table" className="overflow-x-auto my-6 border border-slate-200 rounded-2xl shadow-sm bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] sm:text-xs">
                    <th className="p-4 font-bold text-slate-700">比較項目</th>
                    <th className="p-4 font-bold text-sky-600 bg-sky-50/50">ConoHa WING</th>
                    <th className="p-4 font-bold text-slate-700">エックスサーバー</th>
                    <th className="p-4 font-bold text-slate-700">さくらのレンタルサーバ</th>
                  </tr>
                </thead>
                <tbody className="text-[10px] sm:text-xs divide-y divide-slate-100">
                  <tr>
                    <td className="p-4 font-bold bg-slate-50/30">表示速度</td>
                    <td className="p-4 font-black text-sky-600 bg-sky-50/50">国内最速No.1</td>
                    <td className="p-4">高速（安定志向）</td>
                    <td className="p-4">標準的</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-slate-50/30">初期費用</td>
                    <td className="p-4 font-bold text-sky-600 bg-sky-50/50">0円</td>
                    <td className="p-4">0円（キャンペーン時）</td>
                    <td className="p-4">0円〜</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-slate-50/30">ドメイン特典</td>
                    <td className="p-4 font-bold text-sky-600 bg-sky-50/50">2個 永久無料</td>
                    <td className="p-4">1個 永久無料</td>
                    <td className="p-4">なし</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-slate-50/30">管理画面</td>
                    <td className="p-4 font-bold text-sky-600 bg-sky-50/50">非常に使いやすい</td>
                    <td className="p-4">やや多機能すぎる</td>
                    <td className="p-4">初心者には複雑</td>
                  </tr>
                </tbody>
              </table>
            </div>,
            "比較の結果、特に「これからブログを始める初心者」や「サイトの表示速度を改善したい中級者」にとって、ConoHa WINGが最も合理的な選択肢となります。"
          ]
        },
        {
          type: "div",
          title: "2. 技術的強み：LiteSpeed LSAPIとHTTP/3への対応",
          body: [
            "ConoHa WINGが「速い」と言われる理由は、単なる広告文句ではありません。サーバー構成に最新技術を投入しているからです。",
            <ul key="tech-list" className="space-y-4 my-6">
              <li className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex-none w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold">01</div>
                <div>
                  <p className="font-bold text-sm">LiteSpeed採用によるApacheの2倍以上の速度</p>
                  <p className="text-xs text-slate-600 leading-relaxed">PHPの実行速度が圧倒的に速いため、WordPressのダッシュボード操作やページ表示が驚くほどスムーズになります。</p>
                </div>
              </li>
              <li className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex-none w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold">02</div>
                <div>
                  <p className="font-bold text-sm">「WINGパック」による独自ドメイン永久無料</p>
                  <p className="text-xs text-slate-600 leading-relaxed">通常、年間数千円かかるドメイン費用が2つまで無料。これにより、サイト運営の固定費を大幅に削減可能です。</p>
                </div>
              </li>
            </ul>
          ]
        },
        {
          type: "div",
          title: "3. 【実践】最大14,000円還元・セルフバックの手順",
          body: [
            "もしもアフィリエイトの「本人申込（セルフバック）」を利用することで、非常にお得に契約が可能です。以下のステップで進めてください。",
            <div key="cashback-steps" className="my-8 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-sky-500 before:to-indigo-500">
              {[
                { step: "Step 01", title: "もしもアフィリエイトに登録・ログイン", detail: "まずは「もしもアフィリエイト」の会員登録を完了させます。" },
                { step: "Step 02", title: "「ConoHa」を検索してセルフバックを確認", detail: "プロモーション検索でConoHaを探し、「本人申込」ボタンから公式サイトへ移動します。" },
                { step: "Step 03", title: "WINGパック（ベーシック以上）を申し込む", detail: "3ヶ月以上の契約でドメイン無料特典が適用されます。12ヶ月以上の契約が最も割引率が高くおすすめです。" },
                { step: "Step 04", title: "成果確定後にキャッシュバック受取", detail: "契約完了から一定期間後、もしもアフィリエイトの管理画面から報酬として現金を受け取れます。" }
              ].map((s, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-start md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-sky-500 text-white shadow shrink-0 md:order-1">
                    <svg className="fill-current w-4 h-4" viewBox="0 0 16 16"><path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm3.5 6.5L7 11l-2.5-2.5L6 7l1 1 3-3z"/></svg>
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-white border border-slate-200 shadow-sm ml-4 md:ml-0">
                    <p className="text-[10px] font-black text-sky-600 mb-1">{s.step}</p>
                    <p className="text-sm font-bold text-slate-900 mb-1">{s.title}</p>
                    <p className="text-xs text-slate-500">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>,
            <div key="final-cta" className="text-center p-8 bg-slate-900 rounded-3xl text-white">
              <h4 className="text-lg font-bold mb-4">今すぐ最速のサイト運営を始める</h4>
              <p className="text-xs opacity-70 mb-6">期間限定：最大53%OFFキャンペーン実施中</p>
              <a href={LINKS.conoha} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-block px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black text-sm transition-all shadow-lg shadow-sky-900/20">
                ConoHa WING 公式サイトを確認する
                <img src="https://i.moshimo.com/af/i/impression?a_id=5400008&p_id=2312&pc_id=4967&pl_id=92340" width="1" height="1" className="hidden" alt="" />
              </a>
            </div>
          ]
        },
        {
          type: "note",
          title: "広告主情報および正確性について",
          body: [
            "広告・アフィリエイトリンクを含みます。",
            "サービス提供元：GMOインターネットグループ株式会社",
            "キャンペーンの詳細条件や還元額は、時期により変動する可能性があるため、必ずリンク先の「もしもアフィリエイト」および「ConoHa公式サイト」にて最新情報をご確認ください。"
          ]
        }
      ]}
    />
  );
}
