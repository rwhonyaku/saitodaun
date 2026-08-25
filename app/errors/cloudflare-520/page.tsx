import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "Web server is returning an unknown error（520）とは？原因・対処",
  description:
    "Web server is returning an unknown error（Cloudflare 520）の意味と原因を解説。閲覧者が待つべきケースと、サイト管理者が確認する項目を切り分けます。",
  alternates: { canonical: "/errors/cloudflare-520" },
};

export default function Cloudflare520Page() {
  return (
    <EvergreenPageShell
      h1="Web server is returning an unknown error（Cloudflare 520）とは？"
      updatedAt="2026-08-25"
      lead={[
        "「Web server is returning an unknown error」はCloudflareのエラーコード520です。Cloudflareが接続先のWebサーバーから空・不正・想定外の応答を受けたことを示します。",
        "ほかのサイトが開くなら、まずサイト側の問題を疑います。閲覧者は別回線で一度だけ確認し、同じなら待つのが基本です。",
      ]}
      sections={[
        {
          type: "list",
          title: "520エラーの意味と最短判断",
          items: [
            "ブラウザ → Cloudflare までは到達している",
            "Cloudflare → 接続先サーバー間で、空・不正・想定外の応答が返っている",
            "別回線でも同じ520なら、サイト側の復旧を待つ",
          ],
        },

        // Convert pseudo-bullets into real list for readability/quality
        {
          type: "list",
          title: "よくある原因（サイト側）",
          items: [
            "オリジンサーバーで一時的な内部エラーが発生している（500系相当）",
            "Webサーバーが不安定で、接続が途中で切れる／異常なヘッダを返している",
            "WAF/セキュリティ設定がCloudflareの通信を誤ブロックしている",
            "オリジン側の過負荷で応答が壊れる（タイムアウト寸前の異常応答など）",
            "直近のデプロイや設定変更で、特定パス/特定条件だけ壊れている",
          ],
        },

        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) 少し待って再試行（短時間で戻ることがある）",
            "2) 別回線で試す（Wi-Fi→モバイル回線）",
            "3) シークレットモードで試す（キャッシュ/拡張機能の影響を減らす）",
            "4) 公式ステータスやSNSで障害情報を確認",
          ],
        },

        {
          type: "list",
          title: "運営者側の確認ポイント（サイト管理者向け）",
          items: [
            "オリジンサーバーのエラーログ（Web/アプリ/DB）を確認（まずここ）",
            "CloudflareのFirewall/WAFイベントでブロックやチャレンジがないか確認（誤検知）",
            "オリジンの応答ヘッダが壊れていないか（サイズ過大、不正形式、二重ヘッダ等）",
            "サーバー負荷（CPU/メモリ/ディスクI/O）と同時接続の急増",
            "直近のデプロイ、プラグイン更新、設定変更の影響（切り戻しで改善するか）",
            "オリジンへの到達性（CloudflareのIPレンジを許可、オリジンFWで遮断していないか）",
          ],
        },

        {
          type: "div",
          title: "このエラーが「サイト全体」か「自分だけ」か確認する",
          body: [
            "520はサイト側要因が多いですが、回線差や一時的な経路不調もあり得ます。外部地点から疎通確認して確認しましょう。",
            <div
              key="cta"
              className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm font-bold text-slate-900">
                外部から到達できるかをチェック →
              </p>
              <Link
                href="/"
                className="mt-2 inline-block text-sky-600 font-bold underline"
              >
                サイトダウンで接続チェックする
              </Link>
              <p className="mt-2 text-xs text-slate-600">
                「オンライン」判定なのに520が出る場合は、キャッシュ/回線/一時的な経路問題の可能性もあります。
              </p>
            </div>,
          ],
        },

        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. Cloudflareが落ちているってこと？ → 多くの場合は違います。Cloudflareは表示しているだけで、原因はオリジン（背後のサーバー）側にあることが多いです。",
            "Q. 520と502/504の違いは？ → 520はCloudflareが“想定外の応答”を受け取った系、502は“上流から正しい応答が返らない”、504は“待ち時間切れ（タイムアウト）”が中心です。",
            "Q. 自分だけ520の可能性は？ → あります。回線差、キャッシュ、社内ネットワークの干渉などで局所的に起きることがあります。",
            "Q. どれくらい待てば直る？ → 一時的な不調なら短時間で戻ることもありますが、長時間続く場合は運営側の対応が必要です。",
          ],
        },

        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [<ErrorRelatedLinks key="related" currentSlug="cloudflare-520" />],
        },
      ]}
    />
  );
}
