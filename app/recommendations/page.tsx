"use client";

import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";
import { AFFILIATE_LINKS } from "@/lib/affiliateLinks";
import { SITE } from "@/lib/siteMeta";

const LINKS = {
  conoha: "https://af.moshimo.com/af/c/click?a_id=5400008&p_id=2312&pc_id=4967&pl_id=92340",
  conohaPencil: "https://af.moshimo.com/af/c/click?a_id=5400008&p_id=2312&pc_id=4967&pl_id=89336",
  onamae: "https://af.moshimo.com/af/c/click?a_id=5399096&p_id=109&pc_id=109&pl_id=2746",
  nordvpn: AFFILIATE_LINKS.nordvpn.url,
  surfshark: AFFILIATE_LINKS.surfshark.url,
  expressvpn: AFFILIATE_LINKS.expressvpn.url,
  nordpass: "https://go.nordpass.io/aff_c?offer_id=488&aff_id=145604&url_id=9356",
  millenvpn: "https://millenvpn.jp/",
  rakutenSearch:
    "https://af.moshimo.com/af/c/click?a_id=5399070&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F%25E3%2582%25B5%25E3%2583%25BC%25E3%2583%2590%25E3%2583%25BC%25E3%2580%2580%25E6%25A7%258B%25E7%25AF%2589%25E3%2580%2580%25E6%259C%25AC%2F",
};

export default function RecommendationsPage() {
  return (
    <EvergreenPageShell
      h1="推奨ツール・サービス"
      updatedAt="2026-04-13"
      lead={[
        `${SITE.name}では、サイトの稼働状況を確認するだけでなく、表示速度、運用基盤、ネットワーク切り分けに役立つ候補を必要最小限で案内しています。`,
        "ここで紹介するのは、実際に診断や運用の次の一手として意味があるものだけです。万能な解決策としてではなく、状況に応じた選択肢として見てください。",
      ]}
      sections={[
        {
          type: "div",
          title: "1. サーバーインフラの比較候補（ConoHa WING を含む）",
          body: [
            "サイトの安定性は、サーバーの応答速度と同時接続耐性で大きく変わります。ConoHa WING は、表示速度と扱いやすさのバランスを見たいときに比較候補へ入れやすい国内向けサーバーです。",
            <div key="comparison-box" className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-sky-50 border border-sky-100 shadow-sm">
                <p className="text-sky-600 font-bold text-xs mb-2 flex items-center gap-1">
                  <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span> 速度面の強さ
                </p>
                <h4 className="font-bold text-slate-900 mb-2">WordPress 運用で扱いやすい高速基盤</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  表示速度は SEO と離脱率の両方に影響します。重いテーマや画像が多い構成でも、初期段階から速度面で不利になりにくいのが利点です。
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100 shadow-sm">
                <p className="text-rose-600 font-bold text-xs mb-2">費用対効果</p>
                <h4 className="font-bold text-slate-900 mb-2">初期導入の負担を抑えやすい</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  初めてのサイト運用でも比較的始めやすく、国内向けの情報も多いため、構築と保守の両方で判断しやすい選択肢です。
                </p>
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
                      <span className="block text-[8px] text-rose-500 font-bold mt-1 uppercase">PR</span>
                    </td>
                    <td className="p-3 text-slate-600 leading-relaxed">
                      表示速度と管理のしやすさのバランスが良く、WordPress 運用の初期構築で選びやすい国内向けサーバーです。
                    </td>
                    <td className="p-3">
                      <a
                        href={LINKS.conoha}
                        target="_blank"
                        rel="noopener noreferrer nofollow sponsored"
                        className="bg-sky-500 text-white px-3 py-1.5 rounded-full font-bold hover:bg-sky-600 transition-all inline-flex items-center gap-1"
                      >
                        公式サイト <span className="text-[8px] opacity-70">PR</span>
                        <img
                          src="https://i.moshimo.com/af/i/impression?a_id=5400008&p_id=2312&pc_id=4967&pl_id=92340"
                          width="1"
                          height="1"
                          className="hidden"
                          alt=""
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-600">お名前.com</td>
                    <td className="p-3 text-slate-600 leading-relaxed">
                      ドメイン取得と初期構築をまとめて進めやすい定番候補です。国内向け情報が多く、比較対象として見やすいのが強みです。
                    </td>
                    <td className="p-3">
                      <a
                        href={LINKS.onamae}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="bg-slate-400 text-white px-3 py-1.5 rounded-full font-bold hover:bg-slate-500 transition-all inline-flex items-center gap-1"
                      >
                        詳細を見る <span className="text-[8px] opacity-70">PR</span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>,
          ],
        },
        {
          type: "div",
          title: "2. サイト運営を効率化する AI ツール「ConoHa Pencil」",
          body: [
            "ConoHa WING ユーザーなら、AI ライティング支援ツールの ConoHa Pencil も選択肢に入ります。キーワード整理や下書き作成の工数を減らしたい場面で役立ちます。",
            <div key="pencil-cta" className="my-6 p-6 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-lg font-bold mb-2">記事作成の初動を軽くしたい人向け</h4>
                <p className="text-xs opacity-70 leading-relaxed">
                  構成案や見出し整理を早く進めたいときの補助として向いています。技術解説や比較記事の下書き作成にも使いやすいタイプです。
                </p>
              </div>
              <a
                href={LINKS.conohaPencil}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-sky-100 transition-colors whitespace-nowrap"
              >
                Pencil を詳しく見る
                <img
                  src="https://i.moshimo.com/af/i/impression?a_id=5400008&p_id=2312&pc_id=4967&pl_id=89336"
                  width="1"
                  height="1"
                  className="hidden"
                  alt=""
                />
              </a>
            </div>,
          ],
        },
        {
          type: "div",
          title: "3. 制限系トラブルに役立つ VPN / セキュリティツール",
          body: [
            "回線制限や地域制限が疑わしいときは、まず別回線で比較し、そのうえで VPN で経路を変えるとネットワーク依存かどうかを確認しやすくなります。NordVPN や Surfshark はこの用途で見やすく、NordPass はログイン情報の整理が必要なときにだけ候補になります。",
            <>
              地域制限やネットワーク制限が疑われる場面での考え方は{" "}
              <Link href="/vpn" className="underline hover:no-underline">
                VPNガイド
              </Link>{" "}
              でも短く整理しています。VPN はサービス全体の障害を直すものではなく、回線や地域差の切り分けに使う選択肢です。
            </>,
            <div key="misc-table" className="overflow-x-auto my-4 border border-slate-200 rounded-lg bg-white">
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-slate-100 text-[11px]">
                  <tr className="bg-sky-50/20">
                    <td className="p-3 font-bold text-sky-600">
                      NordVPN
                      <span className="block text-[8px] text-rose-500 font-bold mt-1 uppercase">PR</span>
                    </td>
                    <td className="p-3 text-slate-600">
                      会社・学校・ISP・地域制限が絡むときに、別経路で比較してネットワーク依存かどうかを確認しやすい候補です。
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={LINKS.nordvpn}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-sky-600 underline font-bold"
                      >
                        公式サイト <span className="text-[8px] opacity-70">PR</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-sky-600">
                      Surfshark
                      <span className="block text-[8px] text-rose-500 font-bold mt-1 uppercase">PR</span>
                    </td>
                    <td className="p-3 text-slate-600">
                      複数端末で使いやすく、公共 Wi-Fi や日常利用も含めて比較しやすい候補です。地域制限や回線制限の切り分けが必要な場合のみ検討しやすい選択肢です。
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={LINKS.surfshark}
                        target="_blank"
                        rel="noopener noreferrer nofollow sponsored"
                        className="text-sky-600 underline font-bold"
                      >
                        公式サイト <span className="text-[8px] opacity-70">PR</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-sky-600">
                      ExpressVPN
                      <span className="block text-[8px] text-rose-500 font-bold mt-1 uppercase">PR</span>
                    </td>
                    <td className="p-3 text-slate-600">
                      公共 Wi-Fi や地域制限の切り分けで、設定をできるだけ簡単に進めたいときの比較候補です。回線依存かどうかを見たい場面での選択肢に入れやすいタイプです。
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={LINKS.expressvpn}
                        target="_blank"
                        rel="noopener noreferrer nofollow sponsored"
                        className="text-sky-600 underline font-bold"
                      >
                        公式サイト <span className="text-[8px] opacity-70">PR</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-sky-600">楽天市場（技術書・機器）</td>
                    <td className="p-3 text-slate-600">「サーバー構築」「ネットワーク」の専門書や周辺機器を検索。</td>
                    <td className="p-3 text-right">
                      <a
                        href={LINKS.rakutenSearch}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-sky-600 underline font-bold"
                      >
                        楽天で探す <span className="text-[8px] opacity-70">PR</span>
                        <img
                          src="https://i.moshimo.com/af/i/impression?a_id=5399070&p_id=54&pc_id=54&pl_id=616"
                          width="1"
                          height="1"
                          className="hidden"
                          alt=""
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-sky-600">MillenVPN</td>
                    <td className="p-3 text-slate-600">日本企業運営の代替候補。経路障害時の接続テストに向いています。</td>
                    <td className="p-3 text-right">
                      <a
                        href={LINKS.millenvpn}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-sky-600 underline font-bold"
                      >
                        公式サイト
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-sky-600">NordPass</td>
                    <td className="p-3 text-slate-600">
                      ログイン情報の管理や使い回しの見直しが必要なときの候補です。認証まわりの整理に限って検討するのが自然です。
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={LINKS.nordpass}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-sky-600 underline font-bold"
                      >
                        公式サイト <span className="text-[8px] opacity-70">PR</span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>,
          ],
        },
        {
          type: "note",
          title: "広告表記（PR）および免責事項",
          body: [
            "本ページにはアフィリエイトリンクが含まれており、リンク経由の申込や購入により紹介料を受けることがあります。ユーザー側の料金が上がることはありません。紹介の有無にかかわらず、当サイトでは切り分けや運用の文脈で意味があるものだけを掲載しています。",
          ],
        },
      ]}
    />
  );
}
