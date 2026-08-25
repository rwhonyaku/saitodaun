import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "「この接続ではプライバシーが保護されません」とは？原因と対処",
  description:
    "「この接続ではプライバシーが保護されません」の意味、証明書エラーや時刻ずれ、社内ネットワーク干渉などの原因、ユーザー側での確認方法を解説します。",
  alternates: { canonical: "/errors/your-connection-is-not-private" }
};

export default function YourConnectionIsNotPrivatePage() {
  return (
    <EvergreenPageShell
      h1="「この接続ではプライバシーが保護されません」とは？原因と対処"
      updatedAt="2026-04-11"
      lead={[
        "「この接続ではプライバシーが保護されません」は、ブラウザがHTTPS接続を安全と判断できなかったときに出る警告です。",
        "多くは証明書やHTTPS設定の問題ですが、端末の時刻ずれ、古いブラウザ、会社や学校のネットワーク干渉など、手元側の要因でも発生します。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "別端末や別回線でも同じなら、サイト側の証明書やHTTPS設定を疑う",
            "自分の端末だけなら、時刻ずれ、ブラウザ環境、証明書ストア、セキュリティ製品を疑う",
            "会社・学校・公共Wi-Fiだけで出るなら、ネットワーク側のHTTPS干渉や中継装置を疑う",
            "「詳細設定」から先に進める場合でも、安全性が確認できない限り安易に続行しない",
          ],
        },
        {
          type: "list",
          title: "この警告で起きていること",
          items: [
            "ブラウザが、接続先サイトの証明書やHTTPS接続を信頼できないと判断している",
            "サイト自体が完全停止しているとは限らず、HTTPSの安全確認で止まっている",
            "原因はサイト側の証明書不備か、端末・回線側の環境差に分かれる",
          ],
        },
        {
          type: "list",
          title: "主な原因（サイト側）",
          items: [
            "SSL証明書の期限切れ、更新漏れ",
            "証明書の対象ドメインが一致していない",
            "中間証明書や証明書チェーンの設定不備",
            "HTTPSリダイレクトやTLS設定の不整合",
            "CDNやプロキシ配下で正しい証明書が返っていない",
          ],
        },
        {
          type: "list",
          title: "主な原因（ユーザー側）",
          items: [
            "端末の日時が大きくずれている",
            "古いOSや古いブラウザで証明書やTLS方式に対応できていない",
            "会社・学校・公共Wi-Fiの中継装置やHTTPSインスペクションの影響",
            "VPN、セキュリティソフト、プロキシの干渉",
            "ブラウザプロファイルや証明書ストアの問題",
          ],
        },
        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) 端末の日時を確認し、自動設定をオンにする",
            "2) 別ブラウザや別端末で試す",
            "3) シークレットモードで試し、拡張機能の影響を減らす",
            "4) VPNやセキュリティソフト、プロキシを一時的に見直す",
            "5) 別回線で試して、ネットワーク干渉かどうかを確認する",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "どの端末・どの回線でも同じなら、サイト側の証明書やHTTPS設定の可能性が高い",
            "自分のPCだけで出るなら、時刻ずれ、ブラウザ設定、証明書ストアの可能性が高い",
            "会社・学校Wi-Fiだけで出るなら、ネットワーク側の通信干渉を疑いやすい",
            "スマホでは開けるがPCでだけ出るなら、PC側のブラウザ環境や証明書処理の差を疑う",
          ],
        },
        {
          type: "p",
          title: "安易に『詳細設定』から進まないほうがいい理由",
          body: [
            "この警告は、単なる表示エラーではなく、接続の安全性をブラウザが保証できないときに出ます。サイト運営者が想定した一時的な証明書更新中である場合もありますが、本当に危険な中間者攻撃や偽サイトの可能性を完全に否定できないケースもあります。",
            "業務サイト、ログインページ、決済ページでは特に注意が必要です。原因が不明なまま進むより、まず別端末・別回線で再確認した方が安全です。",
          ],
        },
        {
          type: "p",
          title: "この警告が『サイト全体』か『自分だけ』か確認する",
          body: [
            "サイト側の証明書不備なら、多くの端末や回線で同じ警告が出ます。一方、自分の端末や会社ネットワークだけなら、ローカル環境の可能性が高くなります。",
            <>
              まず{" "}
              <Link href="/" className="underline hover:no-underline">
                接続チェックツール
              </Link>{" "}
              で外部からの到達状況を確認し、DNSも怪しい場合は{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNSトラブルシューティング
              </Link>{" "}
              も確認してください。スマホでは開くのに PC だけ警告が出るなら{" "}
              <Link
                href="/troubleshooting/site-works-on-phone-not-computer"
                className="underline hover:no-underline"
              >
                スマホでは開くのにパソコンでは開かないケース
              </Link>{" "}
              も近い確認です。
            </>,
          ],
        },
        {
          type: "p",
          title: "SSL Handshake Failedとの違い",
          body: [
            "「この接続ではプライバシーが保護されません」は、ブラウザがユーザーに見せる警告文です。一方、SSL Handshake Failed はHTTPSの確立自体に失敗している技術的なエラー名です。",
            <>
              近い問題としては{" "}
              <Link
                href="/errors/ssl-handshake-failed"
                className="underline hover:no-underline"
              >
                SSL Handshake Failed
              </Link>{" "}
              のページも参考になります。証明書の対象ドメインが食い違っている表示なら{" "}
              <Link
                href="/errors/net-err-cert-common-name-invalid"
                className="underline hover:no-underline"
              >
                NET::ERR_CERT_COMMON_NAME_INVALID
              </Link>{" "}
              もかなり近い症状です。
            </>,
          ],
        },
        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. これはサーバーダウンですか？ → 多くの場合は違います。HTTPSの信頼確認で止まっています。",
            "Q. 自分だけ出ることはありますか？ → あります。日時ずれ、古いブラウザ、社内ネットワーク、VPNなどで局所的に出ることがあります。",
            "Q. スマホでは出ないのにPCで出ます。なぜ？ → PC側の時刻、ブラウザ、証明書ストア、ネットワーク設定の違いが原因になりやすいです。",
            "Q. すぐ直りますか？ → 端末側要因ならすぐ直ることもあります。サイト側の証明書問題なら運営者対応が必要です。",
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks
              key="related"
              currentSlug="your-connection-is-not-private"
            />,
          ],
        },
      ]}
    />
  );
}
