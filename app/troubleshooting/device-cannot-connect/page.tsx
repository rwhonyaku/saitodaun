import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "端末・ネットワーク差の確認ハブ",
  description:
    "特定の端末だけつながらない、スマホでは開くのにPCで開かない、Wi-Fiではだめだがモバイル回線では開く、といった端末・ネットワーク差を確認するためのハブページです。",
  alternates: { canonical: "/troubleshooting/device-cannot-connect" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="端末・ネットワーク差の確認ハブ"
      lead={[
        "同じサイトや同じ回線でも、ある端末では開くのに別の端末では開かないことがあります。この場合はサイト全体より、端末差・回線差・ブラウザ差を見分けることが重要です。",
        "このページは端末差・回線差を素早く確認するためのハブです。症状に近い項目から、必要な深掘りページへ進んでください。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "スマホでは開くのにPCで開かないなら、PC側ブラウザ、社内ネットワーク、証明書、DNS差を疑う",
            "モバイル回線では開くのにWi-Fiだと開かないなら、Wi-Fi、ルーター、回線、制限の可能性が高い",
            "1台の端末だけどのサイトも開かないなら、その端末の設定やVPN、DNS、接続状態を疑う",
            "家の複数端末で同時にだめなら、端末固有ではなく回線やルーター側を優先して見る",
            "特定サイトだけ差が出るなら、端末より接続先サイト・DNS・制限の可能性もある",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                スマホでは開くのにPCで開かない →{" "}
                <Link
                  href="/troubleshooting/site-works-on-phone-not-computer"
                  className="underline hover:no-underline"
                >
                  スマホでは開くのにパソコンで開かない原因
                </Link>
              </p>
              <p>
                モバイル回線では開くのにWi-Fiだと開かない →{" "}
                <Link
                  href="/troubleshooting/website-loads-on-phone-not-wifi"
                  className="underline hover:no-underline"
                >
                  スマホでは開くのにWi-Fiだと開かない原因
                </Link>
              </p>
              <p>
                1台の端末だけインターネット全体につながらない →{" "}
                <Link
                  href="/troubleshooting/internet-not-working"
                  className="underline hover:no-underline"
                >
                  インターネットにつながらない原因
                </Link>
              </p>
              <p>
                Wi-Fi全体やルーターも怪しい →{" "}
                <Link
                  href="/troubleshooting/router-not-working"
                  className="underline hover:no-underline"
                >
                  ルーターがつながらない原因
                </Link>
              </p>
              <p>
                ブラウザだけで失敗する →{" "}
                <Link
                  href="/troubleshooting/browser-not-loading-sites"
                  className="underline hover:no-underline"
                >
                  ブラウザエラーの確認ハブ
                </Link>
              </p>
              <p>
                特定のサイトだけ差が出る →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
                </Link>
              </p>
              <p>
                DNSや名前解決が怪しい →{" "}
                <Link
                  href="/troubleshooting-dns"
                  className="underline hover:no-underline"
                >
                  DNS・接続エラーの確認ハブ
                </Link>
              </p>
              <p>
                VPNや会社・学校ネットワークの制限が怪しい →{" "}
                <Link
                  href="/troubleshooting/site-blocked-by-firewall"
                  className="underline hover:no-underline"
                >
                  サイトがファイアウォールでブロックされる原因
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "p",
          title: "端末側の問題に近いケース",
          body: [
            "1台だけ失敗する、別端末では正常、同じ回線でも結果が変わるなら、端末設定、保存データ、VPN、セキュリティアプリ、端末の接続状態を優先して見ます。",
            <>
              ブラウザ差が強いなら{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラーの確認ハブ
              </Link>{" "}
              が近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "Wi-Fi・回線差の問題に近いケース",
          body: [
            "Wi-Fiではだめだがモバイル回線では開く、家の中の端末で広く不安定、場所や回線を変えると結果が変わるなら、端末単体より回線差を優先します。",
            <>
              この場合は{" "}
              <Link
                href="/troubleshooting/website-loads-on-phone-not-wifi"
                className="underline hover:no-underline"
              >
                スマホでは開くのにWi-Fiだと開かない原因
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/router-vs-isp-problem"
                className="underline hover:no-underline"
              >
                ルーターが原因か回線障害か見分ける方法
              </Link>{" "}
              が近道です。
            </>,
          ],
        },
        {
          type: "p",
          title: "DNS・名前解決の問題に近いケース",
          body: [
            "同じサイトでも端末や回線で結果が変わる場合、DNS設定差やキャッシュ差が原因のことがあります。特に『サーバーが見つからない』系ならDNS寄りです。",
            <>
              この系統は{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNS・接続エラーの確認ハブ
              </Link>{" "}
              や{" "}
              <Link
                href="/errors/err-name-not-resolved"
                className="underline hover:no-underline"
              >
                ERR_NAME_NOT_RESOLVED
              </Link>{" "}
              を見てください。
            </>,
          ],
        },
        {
          type: "p",
          title: "制限・VPN・社内学校ネットワークの問題に近いケース",
          body: [
            "会社PCだけ、社内Wi-Fiだけ、VPN接続時だけ失敗するなら、サイト全体より接続条件による制限や中継経路の影響が強いです。",
            <>
              この場合は{" "}
              <Link
                href="/troubleshooting/site-blocked-by-firewall"
                className="underline hover:no-underline"
              >
                サイトがファイアウォールでブロックされる原因
              </Link>{" "}
              や{" "}
              <Link
                href="/errors/err-tunnel-connection-failed"
                className="underline hover:no-underline"
              >
                ERR_TUNNEL_CONNECTION_FAILED
              </Link>{" "}
              が近いページです。
            </>,
          ],
        },
        {
          type: "div",
          title: "よくある差から探す",
          body: [
            <div key="messages" className="space-y-3">
              <p>
                PCだけだめ、スマホは開く →{" "}
                <Link
                  href="/troubleshooting/site-works-on-phone-not-computer"
                  className="underline hover:no-underline"
                >
                  スマホでは開くのにパソコンで開かない原因
                </Link>
              </p>
              <p>
                Wi-Fiだけだめ、モバイル回線は開く →{" "}
                <Link
                  href="/troubleshooting/website-loads-on-phone-not-wifi"
                  className="underline hover:no-underline"
                >
                  スマホでは開くのにWi-Fiだと開かない原因
                </Link>
              </p>
              <p>
                ブラウザだけだめ →{" "}
                <Link
                  href="/troubleshooting/browser-not-loading-sites"
                  className="underline hover:no-underline"
                >
                  ブラウザエラーの確認ハブ
                </Link>
              </p>
              <p>
                名前解決エラーが出る →{" "}
                <Link
                  href="/errors/err-name-not-resolved"
                  className="underline hover:no-underline"
                >
                  ERR_NAME_NOT_RESOLVED
                </Link>
              </p>
              <p>
                まず全体障害か確認したい →{" "}
                <Link
                  href="/outages/japan"
                  className="underline hover:no-underline"
                >
                  ネット障害情報
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
