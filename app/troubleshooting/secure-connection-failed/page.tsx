import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "「安全な接続ができません」と出るときの切り分け",
  description:
    "Secure connection failed と出るときの切り分けページです。証明書警告、SSL handshake failure、SSL protocol error、端末時刻ずれ、回線や社内ネットワークの干渉など、次に見るべき既存ページへ案内します。",
  alternates: { canonical: "/troubleshooting/secure-connection-failed" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="「安全な接続ができません」と出るときの切り分け"
      updatedAt="2026-04-12"
      lead={[
        "『Secure connection failed』『安全な接続ができません』『この接続は保護されていません』のような表示は、サイトが完全停止しているというより HTTPS や証明書の確認で止まっているケースが多いです。証明書期限、証明書名の不一致、TLS 設定不整合、端末時刻ずれ、社内ネットワークや VPN の干渉でも似た見え方になります。",
        "このページは、そうした broad な SSL/HTTPS 症状を最短で切り分けるための橋渡しページです。警告寄りなのか、handshake failure なのか、protocol error なのか、端末差や回線差があるのかを分けて、必要な既存ページへ進んでください。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "証明書警告が見えているなら、まず証明書名や期限の問題を疑う",
            "handshake failed や protocol error なら、TLS 設定不整合に近い",
            "自分の端末だけなら、時刻ずれ、古いブラウザ、証明書ストア、拡張機能を疑う",
            "会社や学校の回線だけで起きるなら、HTTPS 干渉や中継装置の影響を疑う",
            "どの端末・どの回線でも同じなら、サイト側の証明書や HTTPS 設定不備の可能性が高い",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                「この接続ではプライバシーが保護されません」が出る →{" "}
                <Link
                  href="/errors/your-connection-is-not-private"
                  className="underline hover:no-underline"
                >
                  この接続ではプライバシーが保護されません
                </Link>
              </p>
              <p>
                SSL Handshake Failed と出る →{" "}
                <Link
                  href="/errors/ssl-handshake-failed"
                  className="underline hover:no-underline"
                >
                  SSL Handshake Failed
                </Link>
              </p>
              <p>
                ERR_SSL_PROTOCOL_ERROR が出る →{" "}
                <Link
                  href="/errors/err-ssl-protocol-error"
                  className="underline hover:no-underline"
                >
                  ERR_SSL_PROTOCOL_ERROR
                </Link>
              </p>
              <p>
                証明書名が一致しない表示が見える →{" "}
                <Link
                  href="/errors/net-err-cert-common-name-invalid"
                  className="underline hover:no-underline"
                >
                  NET::ERR_CERT_COMMON_NAME_INVALID
                </Link>
              </p>
              <p>
                古い端末や PC だけで起きる →{" "}
                <Link
                  href="/troubleshooting/site-works-on-phone-not-computer"
                  className="underline hover:no-underline"
                >
                  スマホでは開くのにパソコンで開かない原因
                </Link>
              </p>
              <p>
                会社・学校・VPN 利用時だけ起きる →{" "}
                <Link
                  href="/troubleshooting/site-blocked-by-firewall"
                  className="underline hover:no-underline"
                >
                  ファイアウォールや制限でサイトが開かない原因
                </Link>
              </p>
              <p>
                まず browser 側の広い切り分けから見たい →{" "}
                <Link
                  href="/troubleshooting/browser-not-loading-sites"
                  className="underline hover:no-underline"
                >
                  ブラウザエラーの切り分けハブ
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "p",
          title: "secure connection failed は『サイトダウン』とは限らない",
          body: [
            "この系統の表示は、サーバー停止よりも HTTPS の安全確認で止まっているケースが中心です。ページ本体に届く前に証明書や TLS の確認で止まるため、見た目は『開けない』でもネット断や 5xx とは少し違います。",
            <>
              そのため、まずは{" "}
              <Link
                href="/errors/your-connection-is-not-private"
                className="underline hover:no-underline"
              >
                証明書警告
              </Link>
              、{" "}
              <Link
                href="/errors/ssl-handshake-failed"
                className="underline hover:no-underline"
              >
                handshake failure
              </Link>
              、{" "}
              <Link
                href="/errors/err-ssl-protocol-error"
                className="underline hover:no-underline"
              >
                protocol error
              </Link>{" "}
              のどれに近いかを分けるほうが早いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "警告寄りなのか、handshake failure なのかで見る場所が違う",
          body: [
            "『この接続ではプライバシーが保護されません』のような警告は、証明書名不一致や期限切れ、信頼できない証明書などに近いです。一方で handshake failed や protocol error は、TLS のやり取り自体が成立していないケースに寄ります。",
            <>
              警告寄りなら{" "}
              <Link
                href="/errors/your-connection-is-not-private"
                className="underline hover:no-underline"
              >
                プライバシー警告
              </Link>
              、やり取り失敗寄りなら{" "}
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
              が近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "端末差があるならローカル環境を優先して疑う",
          body: [
            "スマホでは開くのに PC では失敗する、古い端末だけだめ、ブラウザを変えると通るなら、サイト全体障害より端末時刻、ブラウザ、証明書ストア、保存データ、拡張機能の影響が強くなります。SSL 系はこうしたローカル差が出やすい症状です。",
            <>
              この方向では{" "}
              <Link
                href="/troubleshooting/site-works-on-phone-not-computer"
                className="underline hover:no-underline"
              >
                スマホでは開くのにパソコンで開かない原因
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラーの切り分け
              </Link>{" "}
              が近道です。
            </>,
          ],
        },
        {
          type: "p",
          title: "回線差があるなら HTTPS 干渉や社内ネットワーク条件も候補",
          body: [
            "会社や学校の回線、VPN、公共 Wi-Fi でだけ secure connection failed になるなら、サイト設定だけでなく、途中のプロキシや SSL インスペクション、ネットワーク制限が影響している可能性があります。これは証明書の見え方が回線条件で変わるパターンです。",
            <>
              その場合は{" "}
              <Link
                href="/troubleshooting/site-blocked-by-firewall"
                className="underline hover:no-underline"
              >
                ファイアウォールや制限
              </Link>{" "}
              をあわせて見ると切り分けやすくなります。
            </>,
          ],
        },
        {
          type: "p",
          title: "どこでも同じならサイト側の証明書や TLS 設定不備を疑いやすい",
          body: [
            "複数端末、複数回線、複数ブラウザで同じ SSL 系エラーが出るなら、ローカル要因よりサイト側の証明書期限、証明書名不一致、TLS 設定不整合、CDN と origin の設定ずれに近いです。ユーザー側でできることは限られるため、原因の種類を見極めるのが重要です。",
            <>
              近い詳細ページとして{" "}
              <Link
                href="/errors/net-err-cert-common-name-invalid"
                className="underline hover:no-underline"
              >
                証明書名不一致
              </Link>
              、{" "}
              <Link
                href="/errors/ssl-handshake-failed"
                className="underline hover:no-underline"
              >
                handshake failure
              </Link>
              、{" "}
              <Link
                href="/errors/err-ssl-protocol-error"
                className="underline hover:no-underline"
              >
                protocol error
              </Link>{" "}
              があります。
            </>,
          ],
        },
        {
          type: "list",
          title: "このページからつながる主な既存ページ",
          items: [
            "/errors/your-connection-is-not-private",
            "/errors/ssl-handshake-failed",
            "/errors/err-ssl-protocol-error",
            "/errors/net-err-cert-common-name-invalid",
            "/troubleshooting/site-works-on-phone-not-computer",
            "/troubleshooting/site-blocked-by-firewall",
            "/troubleshooting/browser-not-loading-sites",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "SSL 系は見た目が似ていても、証明書警告なのか、TLS のやり取り失敗なのか、端末差や回線差があるのかで次に見るページが変わります。まず症状の種類を分けることが最短です。",
          ],
        },
      ]}
    />
  );
}
