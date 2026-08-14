import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "Cloudflare 526エラーとは？原因と直し方 | サイトダウン",
  description:
    "Cloudflare 526（Invalid SSL certificate）の意味、Cloudflare とオリジンサーバー間の証明書不整合、525 や一般的な証明書警告との違い、見分け方を解説します。",
};

export default function Cloudflare526Page() {
  return (
    <EvergreenPageShell
      h1="Cloudflare 526エラーとは？原因と直し方"
      updatedAt="2026-04-12"
      lead={[
        "Cloudflare 526 は、Cloudflare 自体には到達できているものの、その先のオリジンサーバーが返す SSL 証明書を Cloudflare が有効と判断できないときに出るエラーです。",
        "単なるブラウザの証明書警告とは違い、失敗しているのは『利用者のブラウザとサイト』ではなく『Cloudflare とオリジンサーバー』の HTTPS 接続です。多くはオリジン証明書の期限切れ、対象ドメイン不一致、自己署名証明書、Cloudflare の Strict 設定との不整合が原因です。",
      ]}
      sections={[
        {
          type: "list",
          title: "まず結論",
          items: [
            "Cloudflare 526 は Cloudflare がオリジン証明書を信頼できないときに出る",
            "Cloudflare 側の障害より、オリジン証明書や TLS 設定の不整合が中心",
            "利用者側で直接直せることは少なく、主に運営側修正が必要になりやすい",
          ],
        },
        {
          type: "list",
          title: "よくある原因",
          items: [
            "オリジンサーバーの証明書が期限切れになっている",
            "証明書の対象ドメインが実際のホスト名と一致していない",
            "自己署名証明書や信頼されない証明書をオリジンが返している",
            "Cloudflare の Full (strict) とオリジン証明書の条件が噛み合っていない",
            "中間証明書の設定漏れで証明書チェーンが不完全になっている",
            "オリジン切り替え後に古い証明書や別ドメイン用証明書を返している",
          ],
        },
        {
          type: "p",
          title: "ブラウザの証明書警告との違い",
          body: [
            "Cloudflare 526 は、利用者のブラウザが直接証明書を拒否しているわけではありません。Cloudflare がオリジンサーバーへ HTTPS 接続する段階で証明書を検証できず、そこで止まっています。",
            <>
              ブラウザ側で直接『この接続ではプライバシーが保護されません』のような表示が出るケースは{" "}
              <Link
                href="/errors/your-connection-is-not-private"
                className="underline hover:no-underline"
              >
                この接続ではプライバシーが保護されません
              </Link>{" "}
              のほうが近いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "525 や SSL Handshake Failed との違い",
          body: [
            "525 は Cloudflare とオリジンの TLS ハンドシェイク自体が成立しない場面に近く、526 はハンドシェイク以前ではなく、返ってきた証明書を Cloudflare が有効と認められない場面に近い整理です。つまり 526 は『つながったが証明書がだめ』側のエラーです。",
            <>
              より広い TLS 失敗の整理は{" "}
              <Link
                href="/errors/ssl-handshake-failed"
                className="underline hover:no-underline"
              >
                SSL Handshake Failed
              </Link>{" "}
              や{" "}
              <Link
                href="/errors/err-ssl-protocol-error"
                className="underline hover:no-underline"
              >
                ERR_SSL_PROTOCOL_ERROR
              </Link>{" "}
              も見比べると分かりやすくなります。
            </>,
          ],
        },
        {
          type: "p",
          title: "起きやすい場面",
          body: [
            "Cloudflare 導入直後、サーバー移設直後、証明書更新直後、またはオリジン切り替え直後に出やすいエラーです。Cloudflare の設定は更新したが、オリジン側の証明書が古いまま、別ドメインのまま、あるいは中間証明書が不足していると 526 になりやすくなります。",
            <>
              同じ Cloudflare 系でも、証明書ではなく到達性の問題に見えるなら{" "}
              <Link
                href="/errors/cloudflare-523"
                className="underline hover:no-underline"
              >
                Cloudflare 523
              </Link>{" "}
              のほうが近いことがあります。
            </>,
          ],
        },
        {
          type: "p",
          title: "利用者側でできることは限られる",
          body: [
            "526 はオリジン証明書の問題であることが多いため、利用者側で直接修正するのは難しいです。別回線や別端末で同じなら、手元環境よりサイト側証明書不整合の可能性が高くなります。時間を置いて再試行し、公式障害情報があるかを見るのが現実的です。",
            <>
              特定サービスで起きているなら{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別トラブルページ
              </Link>{" "}
              や{" "}
              <Link
                href="/outages/japan"
                className="underline hover:no-underline"
              >
                ネット障害情報
              </Link>{" "}
              も確認候補です。
            </>,
          ],
        },
        {
          type: "list",
          title: "ユーザー側で試せる確認",
          items: [
            "1) 別端末や別回線でも同じ Cloudflare 526 か確認する",
            "2) 少し時間を置いて再試行し、一時的な切り替え直後か見る",
            "3) 公式の障害情報やサービス別ページを確認する",
            "4) ブラウザ固有の証明書警告なのか Cloudflare 画面なのか見分ける",
          ],
        },
        {
          type: "list",
          title: "運営側の確認ポイント（サイト管理者向け）",
          items: [
            "オリジンサーバーの証明書が期限切れでないか確認する",
            "証明書の対象ドメイン名が現在のオリジン名と一致しているか確認する",
            "中間証明書を含めた証明書チェーンが正しく設定されているか確認する",
            "Cloudflare の SSL/TLS モードとオリジン証明書条件が噛み合っているか確認する",
            "移設直後なら、古いオリジンや別ホスト名を返していないか確認する",
            "Cloudflare を通さないオリジン直アクセスで返る証明書を確認する",
          ],
        },
        {
          type: "div",
          title: "このエラーが『サイト全体』か『自分だけ』か確認する",
          body: [
            "526 はサイト側要因がかなり強いエラーですが、まず外部からも同じかを確認すると判断が早くなります。",
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
                こちらでも同様なら、オリジン証明書や Cloudflare 設定の問題がより濃くなります。
              </p>
            </div>,
          ],
        },
        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. 526 は Cloudflare 障害ですか？ → 多くは違います。Cloudflare 自体より、オリジンサーバー証明書の不整合が中心です。",
            "Q. 525 と同じですか？ → 違います。525 は握手失敗寄り、526 は返ってきた証明書を Cloudflare が有効と認められない側です。",
            "Q. 自分だけ起きることはありますか？ → 可能性は低めで、まずは別端末や別回線で比較すると見分けやすいです。",
            "Q. すぐ直りますか？ → 一時的な切り替え直後なら戻ることもありますが、多くは運営側の証明書修正が必要です。",
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [<ErrorRelatedLinks key="related" currentSlug="cloudflare-526" />],
        },
      ]}
    />
  );
}
