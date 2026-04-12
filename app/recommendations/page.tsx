"use client";

import EvergreenPageShell from "@/components/EvergreenPageShell";
import { SITE } from "@/lib/siteMeta";

const LINKS = {
  // Campaign-specific link (Max conversion)
  conoha: "https://af.moshimo.com/af/c/click?a_id=5400008&p_id=2312&pc_id=4967&pl_id=69093",
  // AI Tool specific link
  conohaPencil: "https://af.moshimo.com/af/c/click?a_id=5400008&p_id=2312&pc_id=4967&pl_id=89336",
  onamae: "https://af.moshimo.com/af/c/click?a_id=5399096&p_id=109&pc_id=109&pl_id=2746",
  millenvpn: "https://millenvpn.jp/",
  rakutenSearch: "https://af.moshimo.com/af/c/click?a_id=5399070&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F%25E3%2582%25B5%25E3%2583%25BC%25E3%2583%2590%25E3%2583%25BC%25E3%2580%2580%25E6%25A7%258B%25E7%25AF%2589%25E3%2580%2580%25E6%259C%25AC%2F",
};

export default function RecommendationsPage() {
  return (
    <EvergreenPageShell
      h1="推奨ツール・サービス"
      updatedAt="2026-02-23"
      lead={[
        `${SITE.name}では、サイトの稼働状況を監視するだけでなく、ダウンタイムをゼロに近づけ、高速なレスポンスを実現するためのインフラ構成を提案しています。`,
        "実際に技術検証を行い、コストパフォーマンスと信頼性のバランスが最も優れたサービスのみを厳選しました。"
      ]}
      sections={[
        {
          type: "div",
          title: "1. サーバーインフラの深掘り（第一推奨：ConoHa WING）",
          body: [
            "サイトの安定性はサーバーの「応答速度」と「同時接続耐性」で決まります。当サイトがConoHa WINGを第一推奨とする理由は、その圧倒的なスペックにあります。",
            <div key="comparison-box" className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-sky-50 border border-sky-100 shadow-sm">
                <p className="text-sky-600 font-bold text-xs mb-2 flex items-center gap-1">
                  <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span> 圧倒的なスピード
                </p>
                <h4 className="font-bold text-slate-900 mb-2">国内最速No.1の処理能力</h4>
                <p className="text-xs text-slate-600 leading-relaxed">最新の高性能サーバーを採用し、従来比約2倍の高速化を実現。サイトの表示速度はSEO評価にも直結します。</p>
              </div>
              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100 shadow-sm">
                <p className="text-rose-600 font-bold text-xs mb-2">🎁 期間限定特典</p>
                <h4 className="font-bold text-slate-900 mb-2">最大53%OFF & ドメイン無料</h4>
                <p className="text-xs text-slate-600 leading-relaxed">初期費用無料に加え、人気ドメインが2個まで永年無料で利用可能。維持コストを最小限に抑えられます。</p>
              </div>
            </div>,
            <div key="main-table" className="overflow-x-auto my-4 border border-slate-200 rounded-lg bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-3 text-[11px] font-bold text-slate-700">サービス名</th>
                    <th className="p-3 text-[11px] font-bold text-slate-700">技術的メリット</th>
                    <th className="p-3 text-[11px] font-bold text-slate-700">詳細リンク</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[11px]">
                  <tr className="bg-sky-50/20">
                    <td className="p-3 font-bold text-sky-600">
                      ConoHa WING
                      <span className="block text-[8px] text-rose-500 font-bold mt-1 uppercase">Recommended</span>
                    </td>
                    <td className="p-3 text-slate-600 leading-relaxed">
                      LiteSpeed採用によりWordPressが極めて高速。コントロールパネルが直感的で、技術者以外でも管理が容易。
                    </td>
                    <td className="p-3">
                      <a href={LINKS.conoha} target="_blank" rel="noopener noreferrer nofollow" className="bg-sky-500 text-white px-3 py-1.5 rounded-full font-bold hover:bg-sky-600 transition-all inline-flex items-center gap-1">
                        公式サイト <span className="text-[8px] opacity-70">PR</span>
                        <img src="https://i.moshimo.com/af/i/impression?a_id=5400008&p_id=2312&pc_id=4967&pl_id=69093" width="1" height="1" className="hidden" alt="" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-600">お名前.com</td>
                    <td className="p-3 text-slate-600 leading-relaxed">国内シェアNo.1。独自ドメインの取得とサーバーの一括管理において抜群の安定感。</td>
                    <td className="p-3">
                      <a href={LINKS.onamae} target="_blank" rel="noopener noreferrer nofollow" className="bg-slate-400 text-white px-3 py-1.5 rounded-full font-bold hover:bg-slate-500 transition-all inline-flex items-center gap-1">
                        詳細を見る <span className="text-[8px] opacity-70">PR</span>
                        <img src="https://i.moshimo.com/af/i/impression?a_id=5399096&p_id=109&pc_id=109&pl_id=2746" width="1" height="1" className="hidden" alt="" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ]
        },
        {
          type: "div",
          title: "2. サイト運営を効率化するAIツール「ConoHa Pencil」",
          body: [
            "ConoHa WINGユーザーなら、最新のAIライティングツール「ConoHa Pencil」を活用できます。キーワード選定から構成案の作成まで、ブログ運営の工数を大幅に削減可能です。",
            <div key="pencil-cta" className="my-6 p-6 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-lg font-bold mb-2">記事作成の悩みをAIで解決</h4>
                <p className="text-xs opacity-70 leading-relaxed">SEOに強いタイトル生成や本文執筆をサポート。ConoHa利用者限定の強力なアドバンテージです。</p>
              </div>
              <a href={LINKS.conohaPencil} target="_blank" rel="noopener noreferrer nofollow" className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-sky-100 transition-colors whitespace-nowrap">
                Pencilを詳しく見る
                <img src="https://i.moshimo.com/af/i/impression?a_id=5400008&p_id=2312&pc_id=4967&pl_id=89336" width="1" height="1" className="hidden" alt="" />
              </a>
            </div>
          ]
        },
        {
          type: "div",
          title: "3. 学習リソース & VPNツール",
          body: [
            "専門的な知識を深めるためのリソースと、ネットワーク障害時のバックアップ手段です。",
            <div key="misc-table" className="overflow-x-auto my-4 border border-slate-200 rounded-lg bg-white">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-slate-100 text-[11px]">
                  <tr>
                    <td className="p-3 font-bold text-sky-600">楽天市場（技術書・機器）</td>
                    <td className="p-3 text-slate-600">「サーバー構築」「ネットワーク」の専門書や周辺機器を検索。</td>
                    <td className="p-3 text-right">
                      <a href={LINKS.rakutenSearch} target="_blank" rel="noopener noreferrer nofollow" className="text-sky-600 underline font-bold">
                        楽天で探す <span className="text-[8px] opacity-70">PR</span>
                        <img src="https://i.moshimo.com/af/i/impression?a_id=5399070&p_id=54&pc_id=54&pl_id=616" width="1" height="1" className="hidden" alt="" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-sky-600">MillenVPN</td>
                    <td className="p-3 text-slate-600">日本企業運営の信頼性。経路障害時の接続テストに最適。</td>
                    <td className="p-3 text-right">
                      <a href={LINKS.millenvpn} target="_blank" rel="noopener noreferrer nofollow" className="text-sky-600 underline font-bold">公式サイト</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ]
        },
        {
          type: "note",
          title: "広告表記（PR）および免責事項",
          body: [
            "本ページにはアフィリエイトリンクが含まれており、リンクを経由した売上に基づき紹介料を得ることがあります。これにより、ユーザー側の利用料金が上がることは一切ございません。収益はサイトの品質維持およびサーバー費用に充てられます。"
          ]
        }
      ]}
    />
  );
}