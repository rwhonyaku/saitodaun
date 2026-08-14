import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "NET::ERR_CERT_COMMON_NAME_INVALIDとは？原因と対処 | サイトダウン",
  description:
    "NET::ERR_CERT_COMMON_NAME_INVALID の意味、証明書のドメイン不一致が起きる原因、ユーザー側でできる確認し、運営者側の確認ポイントを実用的に解説します。",
};

export default function NetErrCertCommonNameInvalidPage() {
  return (
    <EvergreenPageShell
      h1="NET::ERR_CERT_COMMON_NAME_INVALIDとは？原因と対処"
      updatedAt="2026-04-11"
      lead={[
        "NET::ERR_CERT_COMMON_NAME_INVALID は、アクセスしているドメイン名と、サーバーが返したSSL証明書の対象ドメインが一致していないときに出るエラーです。",
        "簡単に言うと、ブラウザは目的のサイトへつながろうとしているのに、返ってきた証明書が『別のサイト用』に見えている状態です。多くはサイト側の証明書設定やCDN設定に原因があります。",
      ]}
      sections={[
        {
          type: "list",
          title: "まず結論：このエラーで起きていること",
          items: [
            "HTTPS 接続先のドメイン名と、返ってきた証明書の名前が一致していない",
            "サーバー停止ではなく、証明書の割り当てやドメイン設定の不整合で止まっている",
            "多くはサイト側の設定問題だが、社内ネットワークやプロキシの介入で見え方が変わることもある",
          ],
        },
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "別端末や別回線でも同じなら、サイト側の証明書設定不整合を疑う",
            "自分の会社・学校Wi-Fiだけで出るなら、プロキシやHTTPS干渉を疑う",
            "URLの綴り、www あり/なし、サブドメイン違いを確認する",
            "『この接続ではプライバシーが保護されません』系の警告なら、まず証明書名の不一致を確認する",
          ],
        },
        {
          type: "list",
          title: "主な原因（サイト側）",
          items: [
            "証明書が対象ドメインを含んでいない",
            "www あり/なし、サブドメイン、別ドメインに対して誤った証明書を返している",
            "CDN やロードバランサーの設定で別サイト用証明書が出ている",
            "SNI や仮想ホスト設定が崩れて、意図しない証明書が返っている",
            "移設や証明書更新直後で、新旧設定が混在している",
          ],
        },
        {
          type: "list",
          title: "ユーザー側で起こりうるケース",
          items: [
            "会社・学校・公共Wi-Fi のHTTPS干渉で別証明書が見えている",
            "プロキシやセキュリティ製品が通信を中継し、元サイトと違う証明書を返している",
            "ブックマークやURL入力ミスで本来と違うサブドメインへアクセスしている",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "どの端末・どの回線でも同じなら、サイト側の証明書割り当て不整合の可能性が高い",
            "自分の社内回線だけで出るなら、社内プロキシや通信監視の影響を疑いやすい",
            "www 付きでは出ないが、www なしで出るなら、ホストごとの証明書設定差を疑う",
            "特定のサブドメインだけで出るなら、そのサブドメイン単位の証明書漏れや設定抜けが疑わしい",
          ],
        },
        {
          type: "p",
          title: "『読み込み途中で失敗する』SSLエラーとの違い",
          body: [
            "このエラーは、証明書の名前が合っていないことが中心です。HTTPS 接続全体の失敗や、TLS 条件の不整合が原因のエラーとは少し性質が違います。",
            <>
              握手そのものの失敗を見るなら{" "}
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
              も比較すると違いが分かりやすくなります。
            </>,
          ],
        },
        {
          type: "p",
          title: "URLの違いだけで起こることがある",
          body: [
            "このエラーは、サイト自体が完全に壊れていなくても起こります。たとえば `www.example.com` 用の証明書しかないのに `example.com` にアクセスすると、ドメイン不一致で止まることがあります。",
            "また、サブドメインの追加直後や、別ドメインを同じサーバーで運用している環境では、意図しない証明書が返ってしまうことがあります。",
          ],
        },
        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) URLの綴りと www あり/なし、サブドメインを確認する",
            "2) 別端末・別回線で再確認する",
            "3) シークレットモードや別ブラウザで試す",
            "4) 会社・学校・VPN経由なら別回線で比較する",
            "5) 安全性が確認できない限り、警告を無視して進まない",
          ],
        },
        {
          type: "list",
          title: "運営者側の確認ポイント（サイト管理者向け）",
          items: [
            "証明書の SAN に対象ドメインと必要なサブドメインが含まれているか確認する",
            "www あり/なし両方で正しい証明書を返しているか確認する",
            "CDN、ロードバランサー、リバースプロキシで別証明書を返していないか確認する",
            "SNI と仮想ホスト設定が正しいか確認する",
            "移設、証明書更新、DNS切り替え直後なら古い構成が残っていないか確認する",
          ],
        },
        {
          type: "p",
          title: "『自分だけ』なのか『サイト全体』なのかを分ける",
          body: [
            "このエラーはサイト側の設定問題であることが多い一方、社内ネットワークやセキュリティ製品の介入で、自分だけ別証明書を見せられているケースもあります。",
            <>
              まず{" "}
              <Link href="/" className="underline hover:no-underline">
                接続チェックツール
              </Link>{" "}
              で外部からの到達状況を見つつ、SSL全体の確認は{" "}
              <Link
                href="/errors/ssl-handshake-failed"
                className="underline hover:no-underline"
              >
                SSL Handshake Failed
              </Link>{" "}
              や{" "}
              <Link
                href="/errors/your-connection-is-not-private"
                className="underline hover:no-underline"
              >
                この接続ではプライバシーが保護されません
              </Link>{" "}
              のページも参考になります。
            </>,
          ],
        },
        {
          type: "p",
          title: "端末差やWi-Fi差があるとき",
          body: [
            "会社PCだけ、社内Wi-Fiだけ、VPN経由だけで出るなら、元サイトより途中のプロキシや HTTPS 干渉で別証明書を見せられている可能性があります。",
            <>
              端末差が強いなら{" "}
              <Link
                href="/troubleshooting/site-works-on-phone-not-computer"
                className="underline hover:no-underline"
              >
                スマホでは開くのにパソコンで開かない原因
              </Link>{" "}
              も役立ちます。
            </>,
          ],
        },
        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. これはサーバーダウンですか？ → 多くは違います。サーバー停止より、証明書とドメイン名の不一致で止まっています。",
            "Q. 自分だけ出ることはありますか？ → あります。社内プロキシ、VPN、セキュリティ製品、URLの使い分けで局所的に起こることがあります。",
            "Q. すぐ直りますか？ → URL違いならすぐ解消します。サイト側設定が原因なら運営者側の修正が必要です。",
            "Q. 警告を無視して進んでもいいですか？ → 安全性を確認できない限り推奨できません。ログインや決済では特に避けるべきです。",
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks
              key="related"
              currentSlug="net-err-cert-common-name-invalid"
            />,
          ],
        },
      ]}
    />
  );
}
