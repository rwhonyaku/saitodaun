import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "Cloudflare 522エラーとは？原因・直し方・切り分け方法 | サイトダウン",
  description:
    "Cloudflare 522（Connection timed out）の意味、オリジン到達性、ファイアウォールや高負荷による原因、ユーザー側/運営者側の対処、切り分け方法を解説します。",
};

export default function Cloudflare522Page() {
  return (
    <EvergreenPageShell
      h1="Cloudflare 522エラーとは？原因と直し方"
      updatedAt="2026-03-03"
      lead={[
        "Cloudflare 522 は「Cloudflareがオリジンサーバーへ接続しようとしたが、時間内に接続を確立できなかった」ことを示すエラーです。",
        "つまり、Cloudflareは生きていますが、背後のオリジンが遅い／落ちている／接続が遮断されている可能性が高いです。まずは“自分だけ”か“サイト全体”かを切り分けるのが最短です。",
      ]}
      sections={[
        {
          type: "list",
          title: "まず結論：522で起きていること",
          items: [
            "ブラウザ → Cloudflare は到達できている",
            "Cloudflare → オリジンの接続がタイムアウトしている（接続確立できない）",
            "原因はオリジン側の停止・過負荷・遮断が中心",
          ],
        },

        {
          type: "list",
          title: "よくある原因（サイト側）",
          items: [
            "オリジンサーバーが停止している、または過負荷で応答できない",
            "オリジン側のファイアウォール/セキュリティグループがCloudflareのIPをブロックしている",
            "オリジンのネットワーク障害（データセンター側の回線問題など）",
            "オリジン側の接続上限に達している（同時接続/ワーカー不足）",
            "直近の設定変更でオリジンの公開ポート（80/443）やTLS設定が壊れている",
          ],
        },

        {
          type: "list",
          title: "Cloudflare 522で起きやすい具体パターン",
          items: [
            "Cloudflareまでは正常に見えるが、オリジンサーバーだけが高負荷で接続を返せない",
            "オリジン側のFWやWAFがCloudflareのIPレンジを誤って遮断している",
            "サーバー自体は稼働していても、Nginx/Apacheの前段または背後アプリが詰まっており接続確立が遅れている",
            "一時的な負荷増大や同時接続の集中で、Cloudflareからの新規接続を受け付けきれない",
            "直近のサーバー移設、DNS変更、セキュリティ設定変更のあとに到達性が壊れている",
          ],
        },

        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) しばらく待って再試行（負荷や障害が収束すれば復旧する）",
            "2) 別回線で試す（Wi-Fi→モバイル回線）",
            "3) 公式ステータスやSNSで障害情報を確認",
            "4) 何度も連打しない（負荷が高い時は悪化要因になり得る）",
          ],
        },

        {
          type: "list",
          title: "発生パターン別の見分け方",
          items: [
            "自分だけでなく複数端末・複数回線でも同時に起きる → オリジン側停止や遮断の可能性が高い",
            "特定の時間帯だけ発生する → 一時的な高負荷、接続上限、バッチ処理やアクセス集中の影響が疑われる",
            "Cloudflareの画面は出るがサイト本文まで進まない → Cloudflare自体ではなく、背後オリジンへの接続で詰まっている可能性が高い",
            "自分の回線だけで起きるように見える → 可能性は低いが、経路差や一時的な通信不調もゼロではないため別回線で確認する",
          ],
        },

        {
          type: "list",
          title: "ユーザー側で見える症状",
          items: [
            "ブラウザにCloudflare由来のエラーページが表示される",
            "リロードしても改善せず、時間をおいて再試行すると戻ることがある",
            "サイトの一部ページだけでなく、サイト全体で開けないことが多い",
            "Wi-Fiでもモバイル回線でも同様なら、ユーザー側よりサイト側要因の可能性が高い",
          ],
        },

        {
          type: "list",
          title: "運営者側の確認ポイント（サイト管理者向け）",
          items: [
            "サーバーが稼働しているか（Webサーバー/アプリ/DB）と、直近の再起動・クラッシュ有無を確認",
            "FW/セキュリティグループで 80/443 が開いているか（到達性の基本）",
            "CloudflareのIPレンジをブロックしていないか（WAF/Fail2ban/Rate Limitの誤検知含む）",
            "オリジンの負荷（CPU/メモリ/ディスクI/O）と接続上限（同時接続/ワーカー数）",
            "オリジンへの直接アクセス（オリジンIP + Host指定）で再現するか確認",
            "Cloudflare側の設定確認（オリジン接続方式、TLSモード、オリジン証明書など）",
          ],
        },

        {
          type: "div",
          title: "このエラーが「サイト全体」か「自分だけ」か確認する",
          body: [
            "522はサイト側要因が多いですが、回線や一時的な経路差もゼロではありません。外部地点から疎通確認して切り分けましょう。",
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
                こちらでも到達できないなら、サイト側（オリジン停止/遮断）の可能性が高いです。
              </p>
            </div>,
          ],
        },

        {
          type: "list",
          title: "よく一緒に比較される関連エラー",
          items: [
            "Cloudflare 524：接続自体はできているが、オリジンからの応答待ちが長すぎて時間切れになっている",
            "504 Gateway Timeout：ゲートウェイやプロキシが背後サーバーからの応答待ちでタイムアウトしている",
            "ERR_CONNECTION_TIMED_OUT：ブラウザ側から見た接続タイムアウトで、Cloudflareを使っていないサイトでも起きる",
            "Cloudflare 520：Cloudflareはオリジンに接続できたが、想定外または不正な応答を受け取っている",
            "SSL Handshake Failed：接続以前にTLSの握手で失敗しており、522とは失敗箇所が異なる",
          ],
        },

        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. 522はCloudflare障害ですか？ → 多くの場合は違います。Cloudflareは到達できており、Cloudflare→オリジン間の接続が成立していないケースが中心です。",
            "Q. 522と504の違いは？ → 522は「Cloudflareがオリジンに接続できない（接続確立の時間切れ）」、504は「接続はできたが“応答待ち”が時間切れ」が中心です。",
            "Q. 自分だけ522の可能性はありますか？ → 可能性は低めですが、回線/経路差や一時的な通信不調で起きることがあります。別回線で切り分けが有効です。",
            "Q. 522はサーバーダウンと同じですか？ → 完全な意味で同じとは限りませんが、オリジン停止・過負荷・遮断など、サイト側要因で起きることが多いです。",
            "Q. 復旧までどれくらい？ → オリジンの停止/遮断が原因なら運営者対応次第です。短時間の過負荷ならしばらく待つと戻ることもあります。",
          ],
        },

        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [<ErrorRelatedLinks key="related" currentSlug="cloudflare-522" />],
        },
      ]}
    />
  );
}