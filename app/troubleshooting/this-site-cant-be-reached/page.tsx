import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "「このサイトにアクセスできません」と出るときの切り分け",
  description:
    "This site can't be reached と出るときの切り分けページです。DNS、タイムアウト、到達不能、接続拒否、回線差、特定サイトだけの不調など、次に見るべき既存ページへ案内します。",
  alternates: { canonical: "/troubleshooting/this-site-cant-be-reached" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="「このサイトにアクセスできません」と出るときの切り分け"
      updatedAt="2026-04-12"
      lead={[
        "ブラウザの『This site can't be reached』『このサイトにアクセスできません』は、1つの原因を指す表示ではありません。DNS で名前が引けない、接続先に届かない、応答が遅すぎる、ブラウザや回線条件が原因、特定サイトだけが不安定といった複数のケースで出ます。",
        "このページは、その broad なブラウザ表示を最短で分けるための橋渡しページです。表示されたエラー文や、どの回線・どの端末で起きるかを手がかりに、必要な既存ページへ進んでください。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "ドメイン名が見つからない、server not found に近いなら DNS を優先して疑う",
            "長く待ったあと失敗するなら、タイムアウトや経路遅延に近い",
            "他のサイトは開くのに1つだけだめなら、対象サイト側やそのサイト向けの DNS・制限を疑う",
            "Wi-Fi ではだめでモバイル回線では開くなら、回線差やローカル環境の影響が強い",
            "ブラウザを変えると開くなら、ブラウザ保存データや拡張機能の影響が強い",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                ドメイン名が見つからない、名前解決エラーが出る →{" "}
                <Link
                  href="/errors/err-name-not-resolved"
                  className="underline hover:no-underline"
                >
                  ERR_NAME_NOT_RESOLVED
                </Link>
              </p>
              <p>
                DNS_PROBE_FINISHED_NXDOMAIN が出る →{" "}
                <Link
                  href="/errors/dns-probe-finished-nxdomain"
                  className="underline hover:no-underline"
                >
                  DNS_PROBE_FINISHED_NXDOMAIN
                </Link>
              </p>
              <p>
                長く待ったあと失敗する →{" "}
                <Link
                  href="/errors/err-connection-timed-out"
                  className="underline hover:no-underline"
                >
                  ERR_CONNECTION_TIMED_OUT
                </Link>
              </p>
              <p>
                到達できない、接続先に届かない感じが強い →{" "}
                <Link
                  href="/errors/err-address-unreachable"
                  className="underline hover:no-underline"
                >
                  ERR_ADDRESS_UNREACHABLE
                </Link>
              </p>
              <p>
                接続が途中で切れる、リセットされる →{" "}
                <Link
                  href="/errors/connection-reset"
                  className="underline hover:no-underline"
                >
                  Connection Reset
                </Link>
              </p>
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
                Wi-Fi ではだめだがモバイル回線では開く →{" "}
                <Link
                  href="/troubleshooting/device-cannot-connect"
                  className="underline hover:no-underline"
                >
                  端末・ネットワーク差の切り分けハブ
                </Link>
              </p>
              <p>
                まず広くブラウザ系エラーから見たい →{" "}
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
          title: "この表示は『原因名』ではなく『届かなかった結果』",
          body: [
            "『This site can't be reached』は、404 や 403 のように原因が絞られた表示ではありません。名前解決の前で止まることもあれば、接続途中で落ちることもあり、単にサイト側が重くてタイムアウトしただけのこともあります。",
            <>
              まずは DNS 系か、接続経路系か、特定サイトだけの症状かを分けるために{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNS・接続エラーの切り分けハブ
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              につなぐのが早いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "名前が引けないなら DNS 側が近い",
          body: [
            "ドメイン名が見つからない、サーバーが見つからない、URL を入れてもすぐ失敗するようなときは、接続先まで行く前の DNS で止まっている可能性が高いです。これはサイト本体が完全停止していなくても起こります。",
            <>
              その場合は{" "}
              <Link
                href="/errors/err-name-not-resolved"
                className="underline hover:no-underline"
              >
                ERR_NAME_NOT_RESOLVED
              </Link>
              、{" "}
              <Link
                href="/errors/dns-probe-finished-nxdomain"
                className="underline hover:no-underline"
              >
                DNS_PROBE_FINISHED_NXDOMAIN
              </Link>
              、{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNS ハブ
              </Link>{" "}
              の順で見ると整理しやすいです。
            </>,
          ],
        },
        {
          type: "p",
          title: "長く待ってから失敗するならタイムアウトや経路の問題に近い",
          body: [
            "エラーが出るまでに時間がかかる、読み込み中のまま止まる、たまにだけ開くなら、名前解決よりも接続途中の遅延やサイト側の応答遅れが疑わしくなります。これはブラウザ表示が同じでも、DNS 失敗とは切り分けるべき症状です。",
            <>
              この方向なら{" "}
              <Link
                href="/errors/err-connection-timed-out"
                className="underline hover:no-underline"
              >
                ERR_CONNECTION_TIMED_OUT
              </Link>
              、{" "}
              <Link
                href="/errors/408-request-timeout"
                className="underline hover:no-underline"
              >
                408 Request Timeout
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-loads-forever"
                className="underline hover:no-underline"
              >
                読み込みが終わらない原因
              </Link>{" "}
              が近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "1つのサイトだけなら『自分の回線全体』より対象サイト単位で見る",
          body: [
            "Google や他のサイトは普通に開くのに、1つのサイトだけ『アクセスできません』になるなら、回線全体よりそのサイト向けの問題です。サイト側の部分障害、DNS 反映差、制限、CDN 経路差などが候補になります。",
            <>
              その場合は{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>
              、主要サービスなら{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別トラブルページ
              </Link>{" "}
              へ進むのが実用的です。
            </>,
          ],
        },
        {
          type: "p",
          title: "回線差や端末差があるならブラウザ表示より環境差が手がかり",
          body: [
            "Wi-Fi では失敗するがモバイル回線では開く、PC ではだめだがスマホでは開く、ブラウザを変えると開く、という差があるなら、同じ表示でも原因はかなり絞れます。サイト全体障害より、DNS、Wi-Fi、ブラウザ保存データ、端末設定差、ネットワーク制限の可能性が高いです。",
            <>
              この分岐では{" "}
              <Link
                href="/troubleshooting/device-cannot-connect"
                className="underline hover:no-underline"
              >
                端末・ネットワーク差の切り分けハブ
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-blocked-by-firewall"
                className="underline hover:no-underline"
              >
                ファイアウォールや制限
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラーの切り分け
              </Link>{" "}
              が近い確認先です。
            </>,
          ],
        },
        {
          type: "list",
          title: "このページからつながる主な既存ページ",
          items: [
            "/troubleshooting-dns",
            "/troubleshooting/browser-not-loading-sites",
            "/troubleshooting/device-cannot-connect",
            "/troubleshooting/specific-site-not-working",
            "/troubleshooting/site-loads-forever",
            "/troubleshooting/site-blocked-by-firewall",
            "/errors/err-name-not-resolved",
            "/errors/dns-probe-finished-nxdomain",
            "/errors/err-connection-timed-out",
            "/errors/err-address-unreachable",
            "/errors/connection-reset",
            "/errors/408-request-timeout",
            "/services",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "この表示だけで原因を決めないことが重要です。失敗までの時間、1つのサイトだけかどうか、回線差や端末差があるか、名前解決エラーが出ているかで分けると、次に見るべきページがかなりはっきりします。",
          ],
        },
      ]}
    />
  );
}
