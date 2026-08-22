import Link from "next/link";
import type { Metadata } from "next";
import AffiliateLink from "@/components/AffiliateLink";
import EvergreenPageShell from "@/components/EvergreenPageShell";
import { AFFILIATE_LINKS } from "@/lib/affiliateLinks";
import { SITE } from "@/lib/siteMeta";

const conoha = AFFILIATE_LINKS.conoha;

export const metadata: Metadata = {
  title: "症状から選ぶ推奨ツール・サービス",
  description:
    "自分のサイトのサーバーを見直す場合と、回線・地域制限を確認する場合に分けて、必要なツールだけを選ぶためのページです。",
  alternates: { canonical: "/recommendations" },
};

export default function RecommendationsPage() {
  return (
    <EvergreenPageShell
      h1="症状から選ぶ推奨ツール・サービス"
      updatedAt="2026-08-21"
      lead={[
        "最初に自分の症状を選んでください。サービス自体が障害中の場合、サーバー契約やVPNを追加しても復旧しません。",
        "このページには広告・アフィリエイトリンクが含まれます。必要な場面と役立たない場面を分けて案内します。",
      ]}
      sections={[
        {
          type: "div",
          title: "最初に目的を選ぶ",
          body: [
            <div key="paths" className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5">
                <p className="text-xs font-bold text-sky-700">サイト運営者向け</p>
                <h3 className="mt-2 text-base font-bold text-slate-950">自分のWordPressサイトが遅い・不安定</h3>
                <p className="mt-2 text-xs leading-6 text-slate-600">
                  現在のサーバー制限や管理負担が原因なら、国内レンタルサーバーの比較に進みます。
                </p>
                <Link href="/conoha" className="mt-4 inline-flex min-h-11 items-center font-bold text-sky-700 underline underline-offset-4">
                  サーバー選びの確認点を見る →
                </Link>
              </div>
              <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5">
                <p className="text-xs font-bold text-violet-700">接続環境の確認向け</p>
                <h3 className="mt-2 text-base font-bold text-slate-950">特定回線・地域・公共Wi-Fiだけで開かない</h3>
                <p className="mt-2 text-xs leading-6 text-slate-600">
                  別回線では開ける場合に限り、VPNを比較材料として検討できます。
                </p>
                <Link href="/vpn" className="mt-4 inline-flex min-h-11 items-center font-bold text-violet-700 underline underline-offset-4">
                  VPNが役立つ条件を見る →
                </Link>
              </div>
            </div>,
          ],
        },
        {
          type: "div",
          title: "自分のサイトのサーバーを見直す場合",
          body: [
            "ConoHa WINGは、WordPressを新しく始める場合や、現在の共有サーバーの管理・契約条件を見直したい場合の比較候補です。第三者サービスの障害や、画像・プラグインが原因の遅さはサーバー変更だけでは解決しません。",
            <div key="hosting-offer" className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-base font-bold text-slate-950">ConoHa WING</p>
                  <p className="mt-1 text-xs leading-6 text-slate-600">契約期間、更新料金、無料ドメインの条件を公式画面で比較してください。</p>
                </div>
                <AffiliateLink
                  href={conoha.url}
                  product="conoha_wing"
                  placement="recommendations_hosting"
                  className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white hover:bg-sky-700"
                >
                  料金・条件を確認する
                </AffiliateLink>
              </div>
              <p className="mt-3 text-[11px] text-slate-500">PR</p>
              <img src={conoha.impressionUrl} width="1" height="1" className="hidden" alt="" />
            </div>,
          ],
        },
        {
          type: "div",
          title: "回線・地域条件を確認する場合",
          body: [
            "Wi-Fiでは開けずモバイル通信では開ける、公共Wi-Fiや会社回線だけ制限されるなど、接続経路によって差が出る場合に限ってVPNを検討します。サービス全体の障害、アカウント停止、端末故障はVPNでは直りません。",
            <div key="vpn-options" className="grid gap-3 sm:grid-cols-3">
              {[
                ["Surfshark", AFFILIATE_LINKS.surfshark.url, "surfshark"],
                ["NordVPN", AFFILIATE_LINKS.nordvpn.url, "nordvpn"],
                ["ExpressVPN", AFFILIATE_LINKS.expressvpn.url, "expressvpn"],
              ].map(([name, href, product], index) => (
                <div key={name} className={`rounded-2xl border p-4 ${index === 0 ? "border-sky-200 bg-sky-50" : "border-slate-200 bg-white"}`}>
                  <p className="text-sm font-bold text-slate-950">{name}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    {index === 0
                      ? "複数端末での利用条件を比較したい場合の第一候補。"
                      : "料金、対応地域、利用条件を比較するための代替候補。"}
                  </p>
                  <AffiliateLink
                    href={href}
                    product={product}
                    placement={`recommendations_vpn_${index === 0 ? "primary" : "alternative"}`}
                    className="mt-4 inline-flex min-h-11 items-center text-xs font-bold text-sky-700 underline underline-offset-4"
                  >
                    公式サイトで条件を確認する
                  </AffiliateLink>
                  <p className="mt-2 text-[10px] text-slate-500">PR</p>
                </div>
              ))}
            </div>,
          ],
        },
        {
          type: "note",
          title: "紹介方針",
          body: [
            `リンク経由の申込により${SITE.name}が紹介料を受け取る場合があります。ツールを追加する前に、現在の障害状況と無料でできる回線切り替え・再起動・DNS確認を優先してください。`,
          ],
        },
      ]}
    />
  );
}
