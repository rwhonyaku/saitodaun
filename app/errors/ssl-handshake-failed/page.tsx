import ConoHaPromoCard from "@/components/ConoHaPromoCard";
import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "SSL Handshake Failedとは？原因・直し方・確認方法 | サイトダウン",
  description:
    "SSL Handshake Failed の意味、最短の確認手順、サーバー側・ネットワーク側・端末側の原因の見分け方、関連するSSLエラーへの進み方を簡潔に整理します。",
};

export default function SSLHandshakePage() {
  return (
    <EvergreenPageShell
      h1="SSL Handshake Failedとは？原因と直し方"
      updatedAt="2026-04-16"
      lead={[
        "「SSL Handshake Failed」は、ブラウザとサーバー間で安全な通信（SSL/TLS）の確立に失敗したときに表示されます。",
        "原因は大きく分けて、サーバー側の設定や証明書の問題、ネットワークやISPによる干渉・ブロック、ブラウザや端末側の問題の3つです。",
        "まずは他の回線・端末でも同じかを確認すると、原因を確認できます。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短の確認（1〜2分）",
          items: [
            "別のサイトでも同じSSLエラーが出るか確認する",
            "スマホ回線（4G/5G）や別のWi-Fiで同じURLを開いてみる",
            "別ブラウザ、または別端末で試す",
            "回線を変えると直るならネットワーク側、どの環境でも同じならサーバー側の可能性が高い",
          ],
        },
        {
          type: "note",
          title: "次に見るべき関連ページ",
          body: [
            <div key="routes" className="space-y-2">
              <p>
                DNS の問題が疑わしいときは{" "}
                <Link
                  href="/troubleshooting-dns"
                  className="font-bold underline text-sky-600"
                >
                  DNSトラブルシューティング
                </Link>
              </p>
              <p>
                インターネット接続全体が不安定なら{" "}
                <Link
                  href="/troubleshooting/internet-not-working"
                  className="font-bold underline text-sky-600"
                >
                  インターネットが使えないときの確認
                </Link>
              </p>
              <p>
                SSL系の近いエラーは{" "}
                <Link
                  href="/errors/err-ssl-protocol-error"
                  className="font-bold underline text-sky-600"
                >
                  ERR_SSL_PROTOCOL_ERROR
                </Link>{" "}
                と{" "}
                <Link
                  href="/errors/your-connection-is-not-private"
                  className="font-bold underline text-sky-600"
                >
                  この接続ではプライバシーが保護されません
                </Link>
              </p>
              <p>
                会社・学校・公共Wi-Fiでだけ起きるなら{" "}
                <Link
                  href="/troubleshooting/site-blocked-by-firewall"
                  className="font-bold underline text-sky-600"
                >
                  制限やブロックが原因のケース
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "list",
          title: "主な原因の分け方",
          items: [
            "サーバー側の問題：証明書の期限切れ、中間証明書の不足、TLS設定の不整合、CDNとオリジンの設定不一致",
            "ネットワーク側の問題：会社や学校のネットワーク、ISP、セキュリティ製品、プロキシがSSL通信に干渉している",
            "端末側の問題：ブラウザ拡張、古いOSやブラウザ、端末の時刻ズレ、端末固有の証明書ストア不整合",
          ],
        },
        {
          type: "p",
          title: "見分け方のコツ",
          body: [
            "多くの場合、このエラーはユーザー側ではなくサーバー側の設定に起因します。",
            "ただし、スマホ回線では開けるのに会社Wi-Fiだけ失敗する、別ブラウザでは開ける、といった差があるなら、ネットワークや端末側の影響を疑った方が早いです。",
          ],
        },
        {
          type: "note",
          title: "ネットワークやISPが原因の場合",
          body: [
            "会社や学校のネットワーク、または一部のISPでは、SSL通信が制限・干渉される場合があります。",
            "この場合、別回線で試すか、ネットワーク経由の影響かを確認する手段としてVPNを使うと原因を確認できます。",
            <a
              key="nordvpn"
              href="https://go.nordvpn.net/aff_c?offer_id=15&aff_id=145604&url_id=880"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-bold underline text-sky-600"
            >
              → NordVPNで別経路から接続して確認する
            </a>,
          ],
        },
        {
          type: "list",
          title: "ユーザー側で先に確認したいこと",
          items: [
            "スマホ回線や別Wi-Fiで同じURLを開いて差が出るか",
            "Chrome以外のブラウザでも同じか",
            "端末の日時設定が自動になっているか",
            "VPN、プロキシ、セキュリティソフトを一時的に外すと変わるか",
            "他のHTTPSサイトも同じように失敗するか",
          ],
        },
        {
          type: "list",
          title: "サイト管理者側で確認すべきこと",
          items: [
            "証明書の期限切れや対象ドメイン不一致がないか",
            "中間証明書を含む証明書チェーンが正しく返っているか",
            "CDN利用時はTLSモードとオリジン証明書が噛み合っているか",
            "HTTPSリダイレクトやSNI設定で別証明書が返っていないか",
          ],
        },
        {
          type: "div",
          title: "この問題がサイト全体か、自分だけかを確認する",
          body: [
            "SSL/TLSエラーでも、実際には自分の回線や端末だけで失敗していることがあります。外部から見てもサイトが応答しているか確認しておくと、無駄な確認を減らせます。",
            <div
              key="cta"
              className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm font-bold text-slate-900">
                外部から到達できるかをチェック →
              </p>
              <Link
                href="/"
                className="mt-2 inline-block font-bold underline text-sky-600"
              >
                サイトダウンで接続チェックする
              </Link>
            </div>,
            <ConoHaPromoCard key="conoha-ssl" variant="dns" />,
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks key="related" currentSlug="ssl-handshake-failed" />,
          ],
        },
      ]}
    />
  );
}
