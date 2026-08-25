import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "ERR_SSL_PROTOCOL_ERRORとは？原因と対処",
  description:
    "ERR_SSL_PROTOCOL_ERROR の意味、TLS設定不整合や証明書問題、ブラウザ・ネットワーク側の影響、ユーザー側での見分け方を実用的に解説します。",
  alternates: { canonical: "/errors/err-ssl-protocol-error" }
};

export default function ErrSslProtocolErrorPage() {
  return (
    <EvergreenPageShell
      h1="ERR_SSL_PROTOCOL_ERRORとは？原因と対処"
      updatedAt="2026-04-11"
      lead={[
        "ERR_SSL_PROTOCOL_ERROR は、ブラウザが HTTPS 通信を始めようとした段階で、SSL/TLS のやり取りに失敗したときに出るエラーです。",
        "単なる表示不具合ではなく、証明書、TLS設定、ブラウザ環境、ネットワーク干渉のどこかで HTTPS 接続が成立していない状態です。サイト側の設定問題が多い一方で、自分の端末や回線条件でだけ起きることもあります。",
      ]}
      sections={[
        {
          type: "list",
          title: "まず結論：このエラーで起きていること",
          items: [
            "HTTP の前段で HTTPS 接続の確立に失敗している",
            "証明書、TLS バージョン、暗号スイート、プロキシ干渉などが原因候補になる",
            "多くはサイト側の HTTPS 設定だが、社内ネットワークや古い環境でも局所的に起きる",
          ],
        },
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "別端末や別回線でも同じなら、サイト側の SSL/TLS 設定を疑う",
            "自分の会社・学校・VPN環境だけで出るなら、ネットワーク干渉やプロキシを疑う",
            "ブラウザを変えて結果が変わるなら、ブラウザ保存データや拡張機能の影響を疑う",
            "証明書警告も同時に出るなら、証明書名不一致や失効も合わせて疑う",
          ],
        },
        {
          type: "list",
          title: "主な原因（サイト側）",
          items: [
            "TLS設定の不整合や古い/厳しすぎる暗号設定",
            "SSL証明書の設定不備や更新漏れ",
            "CDN、リバースプロキシ、ロードバランサー配下での HTTPS 設定ずれ",
            "HTTP→HTTPS リダイレクトや仮想ホスト設定の不整合",
            "一部ホスト名やサブドメインだけ設定が崩れている",
          ],
        },
        {
          type: "list",
          title: "主な原因（ユーザー側）",
          items: [
            "ブラウザキャッシュや保存済みSSL状態の不整合",
            "VPN、プロキシ、セキュリティ製品による HTTPS 干渉",
            "会社・学校ネットワークでの SSL インスペクション",
            "古いブラウザや古い OS による TLS 非対応",
            "端末の時刻ずれや証明書ストアの問題",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "どの端末・どの回線でも同じなら、サイト側設定不備の可能性が高い",
            "自分の PC だけなら、ブラウザ環境や端末側の証明書処理を疑いやすい",
            "社内 Wi-Fi だけなら、社内プロキシやセキュリティ製品の影響が疑わしい",
            "特定サブドメインだけなら、そのホスト単位の HTTPS 設定抜けを疑う",
          ],
        },
        {
          type: "p",
          title: "ネットワーク切り替えやWi-Fi差で悪化することもある",
          body: [
            "このエラー自体は TLS の問題ですが、VPN のオンオフや社内Wi-Fi、公共Wi-Fiのように経路条件が変わる環境では、途中のプロキシや検査装置の影響で見え方が変わることがあります。",
            <>
              回線条件の差が大きいときは{" "}
              <Link
                href="/troubleshooting/website-loads-on-phone-not-wifi"
                className="underline hover:no-underline"
              >
                スマホでは開くのにWi-Fiだと開かない原因
              </Link>{" "}
              もあわせて確認すると見分けやすくなります。
            </>,
          ],
        },
        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) 別ブラウザ、シークレットモード、別端末で試す",
            "2) Wi-Fi とモバイル回線の両方で試す",
            "3) VPN、プロキシ、セキュリティ製品を一時的に見直す",
            "4) 端末の日時設定を確認する",
            "5) 会社・学校回線なら別回線で比較して局所問題か確認する",
          ],
        },
        {
          type: "p",
          title: "『自分だけ』なのか『サイト全体』なのかを先に分ける",
          body: [
            "このエラーはサイト側で起きていることが多いですが、ブラウザや回線条件で見え方が変わることがあります。最初に別端末と別回線で比較すると、運営者側の問題か自分の環境かをかなり絞れます。",
            <>
              まず{" "}
              <Link href="/" className="underline hover:no-underline">
                接続チェックツール
              </Link>{" "}
              で外部からの見え方を確認し、DNS も怪しいなら{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNSトラブルシューティング
              </Link>{" "}
              も確認してください。
            </>,
          ],
        },
        {
          type: "p",
          title: "SSL Handshake Failed やプライバシー警告との違い",
          body: [
            "ERR_SSL_PROTOCOL_ERROR は広めの TLS/SSL 接続失敗を表すブラウザ側メッセージです。証明書の問題だけでなく、TLS のやり取り自体の不整合や途中干渉でも出ます。",
            <>
              証明書名不一致や警告寄りの表示なら{" "}
              <Link
                href="/errors/net-err-cert-common-name-invalid"
                className="underline hover:no-underline"
              >
                NET::ERR_CERT_COMMON_NAME_INVALID
              </Link>{" "}
              や{" "}
              <Link
                href="/errors/your-connection-is-not-private"
                className="underline hover:no-underline"
              >
                この接続ではプライバシーが保護されません
              </Link>{" "}
              が近く、握手そのものの失敗を見たいなら{" "}
              <Link
                href="/errors/ssl-handshake-failed"
                className="underline hover:no-underline"
              >
                SSL Handshake Failed
              </Link>{" "}
              が近い症状です。
            </>,
          ],
        },
        {
          type: "p",
          title: "証明書名の不一致が見える場合",
          body: [
            "TLS のやり取り全体が失敗しているのではなく、返ってきた証明書の名前が違うことが中心なら、もう少し原因を絞れます。",
            <>
              その場合は{" "}
              <Link
                href="/errors/net-err-cert-common-name-invalid"
                className="underline hover:no-underline"
              >
                NET::ERR_CERT_COMMON_NAME_INVALID
              </Link>{" "}
              のページが特に近いです。
            </>,
          ],
        },
        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. これはサーバーダウンですか？ → 多くは違います。HTTPS の確立に失敗しているので、サイト自体は動いていても起こります。",
            "Q. 自分だけ出ることはありますか？ → あります。社内プロキシ、VPN、古いブラウザ、端末の証明書環境で局所的に起きます。",
            "Q. すぐ直りますか？ → ブラウザや回線側なら比較的すぐ原因を確認できます。サイト側設定不備なら運営者側修正が必要です。",
            "Q. 警告を無視して進んでもいいですか？ → 安全性を確認できない限り推奨できません。ログインや決済では特に避けるべきです。",
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [<ErrorRelatedLinks key="related" currentSlug="err-ssl-protocol-error" />],
        },
      ]}
    />
  );
}
