import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "サイトが開かないときの原因と確認",
  description:
    "サイトが開かない・読み込めない時に、特定サイト、DNS、Wi-Fi、ブラウザ、エラー表示のどこから確認すべきかを整理します。",
  alternates: { canonical: "/troubleshooting/website-not-loading" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="サイトが開かないときの原因と確認"
      lead={[
        "サイトが開かないとき、原因は一つではありません。特定のサイトだけなのか、ネット全体なのか、ブラウザだけなのか、Wi-Fiだけなのかで進むべき確認が変わります。",
        "このページは『サイトが開かない』『サイトが読み込めない』といった広い症状を素早く確認するためのハブです。ここで状況を絞って、必要な深掘りページへ進んでください。",
        "最初に結論を急がず、端末・回線・ブラウザ・表示されたエラー文の4つを分けると、無駄な設定変更を避けやすくなります。",
      ]}
      sections={[
        {
          type: "list",
          title: "このページで分けること",
          items: [
            "サイト側が落ちているのか、自分の環境だけで失敗しているのか",
            "DNSや回線の問題なのか、ブラウザ・端末の問題なのか",
            "全ページが開かないのか、ログイン・画像・ボタンなど一部だけ失敗するのか",
            "エラー名から直接エラー解説へ進むべきか、状況別ガイドへ進むべきか"
          ],
        },
        {
          type: "list",
          title: "最短で絞り込むなら",
          items: [
            "1つのサイトだけ開かないなら、まず対象サイト側、DNS、制限の可能性を見る",
            "どのサイトも開かないなら、ブラウザより先に回線、Wi-Fi、ルーター、障害情報を確認する",
            "スマホでは開くのにPCで開かないなら、PC側ブラウザや社内ネットワーク、証明書、設定差を疑う",
            "モバイル回線では開くのにWi-Fiだと失敗するなら、Wi-Fi、ルーター、ISP、制限の可能性が高い",
            "エラー文が出ているなら、まずそのメッセージに対応するエラーページへ進む",
            "開くが真っ白、ずっと読み込み中、ログインだけ失敗するなら、部分障害やフロント側不具合も候補になる",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                1つのサイトだけ開かない →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
                </Link>
              </p>
              <p>
                どのサイトも開かない →{" "}
                <Link
                  href="/troubleshooting/device-cannot-connect"
                  className="underline hover:no-underline"
                >
                  端末・ネットワーク差の確認ハブ
                </Link>
              </p>
              <p>
                スマホでは開くのにPCで開かない →{" "}
                <Link
                  href="/troubleshooting/device-cannot-connect"
                  className="underline hover:no-underline"
                >
                  端末・ネットワーク差の確認ハブ
                </Link>
              </p>
              <p>
                モバイル回線では開くのにWi-Fiだと開かない →{" "}
                <Link
                  href="/troubleshooting/device-cannot-connect"
                  className="underline hover:no-underline"
                >
                  端末・ネットワーク差の確認ハブ
                </Link>
              </p>
              <p>
                ブラウザだけで開かない、別ブラウザでは開く →{" "}
                <Link
                  href="/troubleshooting/browser-not-loading-sites"
                  className="underline hover:no-underline"
                >
                  ブラウザエラーの確認ハブ
                </Link>
              </p>
              <p>
                ずっと読み込み中のまま →{" "}
                <Link
                  href="/troubleshooting/site-loads-forever"
                  className="underline hover:no-underline"
                >
                  サイトがずっと読み込み中のまま終わらない原因
                </Link>
              </p>
              <p>
                開くが真っ白になる →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-is-blank"
                  className="underline hover:no-underline"
                >
                  サイトは開くのに真っ白になる原因
                </Link>
              </p>
              <p>
                エラーメッセージやコードが出ている →{" "}
                <Link
                  href="/errors"
                  className="underline hover:no-underline"
                >
                  エラー解説一覧
                </Link>
              </p>
              <p>
                サイトは開くが、ログイン・画像・ボタン・決済など一部だけ動かない →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
                </Link>
              </p>
              <p>
                主要サービスやアプリだけおかしい →{" "}
                <Link
                  href="/services"
                  className="underline hover:no-underline"
                >
                  サービス別トラブルページ
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "p",
          title: "サイト側の問題",
          body: [
            "複数端末・複数回線でも同じなら、対象サイト側の障害、部分障害、メンテナンス、CDNや上流経路の不安定さを優先して見ます。",
            <>
              まず{" "}
              <Link href="/" className="underline hover:no-underline">
                接続チェックツール
              </Link>{" "}
              で外部からの応答を見て、サイト単位なら{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>
              、配信経路や一部地域だけ不安定なら{" "}
              <Link
                href="/troubleshooting/cdn-or-server-edge-issues"
                className="underline hover:no-underline"
              >
                CDNやサーバー経路の問題
              </Link>{" "}
              を確認してください。
            </>,
          ],
        },
        {
          type: "p",
          title: "ブラウザ・端末側の問題",
          body: [
            "ブラウザや端末が原因なら、同じ回線でもブラウザや端末を変えると結果が変わります。キャッシュ、拡張機能、端末時刻、古いブラウザが代表例です。",
            <>
              この系統はまず{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラーの確認ハブ
              </Link>{" "}
              と{" "}
              <Link
                href="/troubleshooting/device-cannot-connect"
                className="underline hover:no-underline"
              >
                端末・ネットワーク差の確認ハブ
              </Link>{" "}
              から入るのが近道です。
            </>,
          ],
        },
        {
          type: "p",
          title: "DNS・ネットワークの問題",
          body: [
            "名前解決に失敗する、特定の回線だけで引けない、経路が途中で変わるといった場合は、HTTPエラーより前のDNSやネットワーク経路を疑います。",
            <>
              DNSが怪しいならまず{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNS・接続エラーの確認ハブ
              </Link>{" "}
              を見てください。
            </>,
          ],
        },
        {
          type: "p",
          title: "Wi-Fi・ルーター・回線の問題",
          body: [
            "どのサイトも不安定、Wi-Fiではだめだがモバイル回線では開く、家のすべての端末で失敗するなら、ルーターや回線側を先に見ます。",
            <>
              この場合はまず{" "}
              <Link
                href="/troubleshooting/device-cannot-connect"
                className="underline hover:no-underline"
              >
                端末・ネットワーク差の確認ハブ
              </Link>{" "}
              を見て、広域障害確認が必要なら{" "}
              <Link
                href="/outages/japan"
                className="underline hover:no-underline"
              >
                ネット障害情報
              </Link>{" "}
              へ進むのが近道です。
            </>,
          ],
        },
        {
          type: "p",
          title: "アクセス制限・VPN・ファイアウォール・社内学校ネットワークの問題",
          body: [
            "会社や学校、ホテル、公共Wi-Fi、VPN、プロキシが絡むと、サイト自体は正常でも自分の接続条件だけで止められることがあります。403、プロキシ系エラー、公共Wi-Fi認証不足ならこの方向です。",
            <>
              この系統はまず{" "}
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
          type: "list",
          title: "いつ全体障害・自分だけ・特定回線・特定ブラウザを疑うか",
          items: [
            "全体障害の可能性が高い: 複数端末・複数回線でも同じ、5xx系エラーが出る、公式障害情報も出ている",
            "自分の環境だけの可能性が高い: 自分の端末だけ失敗する、別ブラウザや別端末だと開く",
            "特定回線だけの可能性が高い: モバイル回線では開くが自宅Wi-Fiや社内Wi-Fiでは開かない",
            "特定ブラウザ・端末だけの可能性が高い: Chromeだけ失敗、PCだけ失敗、シークレットモードだと開く",
            "部分障害の可能性が高い: トップページは開くが、ログイン、決済、投稿、画像表示など特定機能だけ失敗する",
          ],
        },
        {
          type: "div",
          title: "このメッセージが出るとき",
          body: [
            <div key="messages" className="space-y-3">
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
                プライバシー・証明書の警告 →{" "}
                <Link
                  href="/errors/your-connection-is-not-private"
                  className="underline hover:no-underline"
                >
                  この接続ではプライバシーが保護されません
                </Link>
              </p>
              <p>
                タイムアウトした →{" "}
                <Link
                  href="/errors/err-connection-timed-out"
                  className="underline hover:no-underline"
                >
                  ERR_CONNECTION_TIMED_OUT
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
                一時的に利用できない →{" "}
                <Link
                  href="/errors/503-service-unavailable"
                  className="underline hover:no-underline"
                >
                  503 Service Unavailable
                </Link>
              </p>
              <p>
                長く待ったあと失敗する →{" "}
                <Link
                  href="/errors/504-gateway-timeout"
                  className="underline hover:no-underline"
                >
                  504 Gateway Timeout
                </Link>
              </p>
              <p>
                まずエラー名から探したい →{" "}
                <Link
                  href="/errors"
                  className="underline hover:no-underline"
                >
                  エラー解説一覧
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "list",
          title: "最初に何を確認するか",
          items: [
            "1) 他のサイトも開かないのか、1つのサイトだけなのかを確認する",
            "2) 別端末・別回線で比べて、全体障害か自分の環境だけかを確認する",
            "3) エラー文があるなら、そのメッセージに対応するエラーページへ進む",
          ],
        },
      ]}
      updatedAt="2026-04-11"
    />
  );
}
