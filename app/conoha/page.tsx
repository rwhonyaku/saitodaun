import type { Metadata } from "next";
import AffiliateLink from "@/components/AffiliateLink";
import EvergreenPageShell from "@/components/EvergreenPageShell";
import { AFFILIATE_LINKS } from "@/lib/affiliateLinks";
import { SITE } from "@/lib/siteMeta";

const offer = AFFILIATE_LINKS.conoha;

export const metadata: Metadata = {
  title: "ConoHa WINGはどんなサイトに向く？契約前の確認ポイント",
  description:
    "ConoHa WINGが向いているケース、向いていないケース、WINGパックの契約前に確認したい条件をサイト運営者向けに整理します。",
  alternates: { canonical: "/conoha" },
  openGraph: {
    title: "ConoHa WINGはどんなサイトに向く？契約前の確認ポイント",
    description:
      "ConoHa WINGが向いているケース、向いていないケース、WINGパックの契約前に確認したい条件をサイト運営者向けに整理します。",
    url: `${SITE.origin}/conoha`,
  },
};

export default function ConoHaPage() {
  return (
    <EvergreenPageShell
      h1="ConoHa WINGはどんなサイトに向く？契約前の確認ポイント"
      updatedAt="2026-08-21"
      lead={[
        "自分が運営するWordPressサイトで、表示速度、管理のしやすさ、サーバー移転を見直したい場合の比較候補としてConoHa WINGを整理します。",
        "第三者サービスの障害や、自分のブラウザ・回線だけの問題はレンタルサーバーを変更しても直りません。先に原因を切り分けたうえで、サーバー環境が原因と考えられる場合だけ検討してください。",
        "このページには広告・アフィリエイトリンクが含まれます。",
      ]}
      sections={[
        {
          type: "list",
          title: "ConoHa WINGを比較しやすいケース",
          items: [
            "自分でWordPressサイトを新しく開設したい",
            "現在の共有サーバーで管理画面やページ表示の遅さが続いている",
            "サーバーと独自ドメインを一つの管理画面で扱いたい",
            "長期契約を前提に、WINGパックの料金と通常料金を比較できる",
          ],
        },
        {
          type: "list",
          title: "契約しても解決しないケース",
          items: [
            "X、Discord、YouTubeなど第三者サービスが障害中",
            "自分の端末、ブラウザ、Wi-Fi、DNSだけで不具合が起きている",
            "WordPressの重い画像、テーマ、プラグインが主な原因になっている",
            "現在のサーバーに原因があるか確認していない",
          ],
        },
        {
          type: "div",
          title: "申し込む前に確認する4項目",
          body: [
            <div key="checks" className="grid gap-3 sm:grid-cols-2">
              {[
                ["契約期間", "WINGパックは長期契約です。3・6・12・24・36か月から、無理なく継続できる期間を確認します。"],
                ["更新時の料金", "初回表示だけでなく、契約更新時の料金と自動更新の条件も公式画面で確認します。"],
                ["無料ドメインの条件", "WINGパック契約中は対象の独自ドメインを最大2つ利用できます。対象拡張子と解約時の扱いを確認します。"],
                ["移行作業", "既存サイトの場合は、バックアップ、メール、DNS切り替え、動作確認に必要な作業を先に整理します。"],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h3 className="text-sm font-bold text-slate-950">{title}</h3>
                  <p className="mt-2 text-xs leading-6 text-slate-600">{detail}</p>
                </div>
              ))}
            </div>,
          ],
        },
        {
          type: "div",
          title: "現在の料金と条件を公式画面で確認する",
          body: [
            "料金やキャンペーンは契約期間や時期で変わります。このページでは固定価格を断定せず、申込画面に表示される総額、更新条件、対象特典を確認することをおすすめします。",
            <div key="primary-cta" className="rounded-3xl border border-sky-200 bg-sky-50 p-6 text-center">
              <p className="text-sm font-bold text-slate-950">自分のサイトに合うか条件を確認する</p>
              <p className="mx-auto mt-2 max-w-xl text-xs leading-6 text-slate-600">
                ベーシックを含む各プラン、契約期間ごとの総額、無料ドメインの対象を公式サイトで比較できます。
              </p>
              <AffiliateLink
                href={offer.url}
                product="conoha_wing"
                placement="conoha_page_primary"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-sky-700"
              >
                ConoHa WINGの料金・条件を確認する
              </AffiliateLink>
              <p className="mt-3 text-[11px] text-slate-500">PR・リンク先はConoHa WING公式サイトです。</p>
              <img src={offer.impressionUrl} width="1" height="1" className="hidden" alt="" />
            </div>,
          ],
        },
        {
          type: "note",
          title: "広告表記と判断方針",
          body: [
            "リンク経由の申込により当サイトが紹介料を受け取る場合があります。紹介料の有無にかかわらず、サーバー変更が症状の解決につながらないケースも明記しています。最終的な料金、特典、契約条件は申込前に公式サイトで確認してください。",
          ],
        },
      ]}
    />
  );
}
