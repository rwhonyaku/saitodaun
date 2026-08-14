import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "ブラウザエラーの確認ハブ",
  description:
    "ブラウザでサイトが開かないときの確認ハブです。ブラウザ固有の問題、証明書警告、DNS、Wi-Fi差、特定サイトだけの症状ごとに次に見るべきページへ案内します。",
  alternates: { canonical: "/troubleshooting/browser-not-loading-sites" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="ブラウザエラーの確認ハブ"
      lead={[
        "ブラウザでサイトが開かないときでも、原因はブラウザ固有の問題とは限りません。DNS、証明書、Wi-Fi差、特定サイト側の障害でも似た見え方になります。",
        "このページはブラウザ系トラブルを素早く振り分けるためのハブです。症状に近い項目から、必要な深掘りページへ進んでください。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "別ブラウザで開けるなら、回線全体より元のブラウザ環境を優先して疑う",
            "スマホでは開くのにPCブラウザでだめなら、ブラウザ設定、証明書、社内ネットワーク差を疑う",
            "どのブラウザでもだめなら、ブラウザ単体よりDNS、Wi-Fi、ルーター、サイト側障害を疑う",
            "エラーメッセージが出ているなら、そのエラーページから入るほうが早い",
            "真っ白、読み込み中のまま、ログインだけ失敗するなら部分障害やフロント側不具合も候補になる",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                Chromeだけだめで別ブラウザでは開く →{" "}
                <Link
                  href="/troubleshooting/device-cannot-connect"
                  className="underline hover:no-underline"
                >
                  端末・ネットワーク差の確認ハブ
                </Link>
              </p>
              <p>
                特定のサイトだけブラウザで開かない →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
                </Link>
              </p>
              <p>
                モバイル回線では開くのにWi-Fiだとだめ →{" "}
                <Link
                  href="/troubleshooting/device-cannot-connect"
                  className="underline hover:no-underline"
                >
                  端末・ネットワーク差の確認ハブ
                </Link>
              </p>
              <p>
                ドメインが見つからない、サーバーが見つからない →{" "}
                <Link
                  href="/errors/err-name-not-resolved"
                  className="underline hover:no-underline"
                >
                  ERR_NAME_NOT_RESOLVED
                </Link>
              </p>
              <p>
                証明書やプライバシーの警告が出る →{" "}
                <Link
                  href="/errors/your-connection-is-not-private"
                  className="underline hover:no-underline"
                >
                  この接続ではプライバシーが保護されません
                </Link>
              </p>
              <p>
                タイムアウトや空の応答で止まる →{" "}
                <Link
                  href="/errors/err-empty-response"
                  className="underline hover:no-underline"
                >
                  ERR_EMPTY_RESPONSE
                </Link>
              </p>
              <p>
                真っ白になる、読み込み中のまま終わらない →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-is-blank"
                  className="underline hover:no-underline"
                >
                  サイトは開くのに真っ白になる原因
                </Link>
              </p>
              <p>
                まずエラー名から探したい →{" "}
                <Link href="/errors" className="underline hover:no-underline">
                  エラー解説一覧
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "p",
          title: "ブラウザ固有の問題に近いケース",
          body: [
            "別ブラウザだと開く、シークレットモードだと開く、同じ回線でも端末を変えると変わるなら、ブラウザ保存データや拡張機能の可能性が高いです。",
            <>
              端末差や回線差も絡むなら{" "}
              <Link
                href="/troubleshooting/device-cannot-connect"
                className="underline hover:no-underline"
              >
                端末・ネットワーク差の確認ハブ
              </Link>{" "}
              も見てください。
            </>,
          ],
        },
        {
          type: "p",
          title: "DNS・ネットワークの問題に近いケース",
          body: [
            "ブラウザだけの不具合に見えても、実際には名前解決失敗や経路変化が原因のことがあります。特に『サーバーが見つからない』『名前を解決できない』系ならDNS寄りです。",
            <>
              この場合は{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNS・接続エラーの確認ハブ
              </Link>{" "}
              へ進むのが近道です。
            </>,
          ],
        },
        {
          type: "p",
          title: "Wi-Fi・ルーター・回線差を疑うケース",
          body: [
            "Wi-Fiではだめだがモバイル回線では開く、どのブラウザでも不安定、家の端末全体で失敗するなら、ブラウザより回線側を優先して見ます。",
            <>
              この場合は{" "}
              <Link
                href="/troubleshooting/device-cannot-connect"
                className="underline hover:no-underline"
              >
                端末・ネットワーク差の確認ハブ
              </Link>{" "}
              へ進むのが近道です。
            </>,
          ],
        },
        {
          type: "p",
          title: "サイト側や部分障害を疑うケース",
          body: [
            "特定のURLだけだめ、ログインや画像だけ失敗する、読み込みが長く止まるなら、接続先サイトの部分障害や配信経路の不安定さも候補です。",
            <>
              この場合は{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-loads-forever"
                className="underline hover:no-underline"
              >
                サイトがずっと読み込み中のまま終わらない原因
              </Link>{" "}
              を見てください。
            </>,
          ],
        },
        {
          type: "div",
          title: "エラー名から探す",
          body: [
            <div key="messages" className="space-y-3">
              <p>
                ドメインが見つからない →{" "}
                <Link
                  href="/errors/err-name-not-resolved"
                  className="underline hover:no-underline"
                >
                  ERR_NAME_NOT_RESOLVED
                </Link>
              </p>
              <p>
                証明書・プライバシー警告 →{" "}
                <Link
                  href="/errors/your-connection-is-not-private"
                  className="underline hover:no-underline"
                >
                  この接続ではプライバシーが保護されません
                </Link>
              </p>
              <p>
                SSL/TLSのやり取りで失敗する →{" "}
                <Link
                  href="/errors/err-ssl-protocol-error"
                  className="underline hover:no-underline"
                >
                  ERR_SSL_PROTOCOL_ERROR
                </Link>
              </p>
              <p>
                応答が空のまま失敗する →{" "}
                <Link
                  href="/errors/err-empty-response"
                  className="underline hover:no-underline"
                >
                  ERR_EMPTY_RESPONSE
                </Link>
              </p>
              <p>
                まず一覧から探したい →{" "}
                <Link href="/errors" className="underline hover:no-underline">
                  エラー解説一覧
                </Link>
              </p>
            </div>,
          ],
        },
      ]}
      updatedAt="2026-04-12"
    />
  );
}
