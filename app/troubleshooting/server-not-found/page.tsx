import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "「サーバーが見つかりません」と出るときの切り分け",
  description:
    "Server not found と出るときの切り分けページです。DNS、ドメイン名の入力ミス、回線ごとの差、特定サイトだけの不調など、次に見るべき既存ページへ案内します。",
  alternates: { canonical: "/troubleshooting/server-not-found" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="「サーバーが見つかりません」と出るときの切り分け"
      updatedAt="2026-04-12"
      lead={[
        "『Server not found』『サーバーが見つかりません』は、多くの場合サーバー本体の停止ではなく、ドメイン名から接続先を見つけられていない状態です。つまり HTTP エラーより前の、DNS やドメイン解決の段階で止まっていることがよくあります。",
        "このページは、そうした broad な browser wording から DNS 系の原因へ最短で入るための橋渡しページです。URL ミス、ドメイン失効、DNS 不調、回線差、特定サイトだけの症状を分けて、必要な既存ページへ進んでください。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "URL の綴りや www の有無が違っていないかを最初に確認する",
            "他のサイトは開くなら、回線全体より対象ドメインや DNS を優先して疑う",
            "Wi-Fi では失敗するがモバイル回線では開くなら、自分の DNS 環境や回線差が強い",
            "どの端末・どの回線でも同じなら、サイト側のドメイン失効や DNS 設定不整合の可能性が高い",
            "HTTP 403 や 404 ではなく server not found なら、まず errors より DNS 側から入るほうが早い",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                ドメイン名を解決できない表示が出る →{" "}
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
                新しいドメインや移転直後のサイトで起きている →{" "}
                <Link
                  href="/troubleshooting/dns-propagation"
                  className="underline hover:no-underline"
                >
                  DNS 伝播の確認
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
                Wi-Fi ではだめだが別回線では開く →{" "}
                <Link
                  href="/troubleshooting/device-cannot-connect"
                  className="underline hover:no-underline"
                >
                  端末・ネットワーク差の切り分けハブ
                </Link>
              </p>
              <p>
                まず DNS 系全体から見たい →{" "}
                <Link
                  href="/troubleshooting-dns"
                  className="underline hover:no-underline"
                >
                  DNS・接続エラーの切り分けハブ
                </Link>
              </p>
              <p>
                ブラウザ系の広い入口から見たい →{" "}
                <Link
                  href="/troubleshooting/this-site-cant-be-reached"
                  className="underline hover:no-underline"
                >
                  このサイトにアクセスできませんの切り分け
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "p",
          title: "server not found は『サーバー停止』とは限らない",
          body: [
            "この表示は『接続先のサーバーが落ちている』というより、『そのサーバーの場所を見つけられない』ときに出やすい wording です。ドメイン名から IP を引けない時点で止まるので、404 や 500 よりかなり前の段階です。",
            <>
              そのため、まずは{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNS ハブ
              </Link>
              、具体的な表示があるなら{" "}
              <Link
                href="/errors/err-name-not-resolved"
                className="underline hover:no-underline"
              >
                ERR_NAME_NOT_RESOLVED
              </Link>{" "}
              や{" "}
              <Link
                href="/errors/dns-probe-finished-nxdomain"
                className="underline hover:no-underline"
              >
                NXDOMAIN
              </Link>{" "}
              に進むのが近道です。
            </>,
          ],
        },
        {
          type: "p",
          title: "URL ミスか DNS 失敗かを最初に分ける",
          body: [
            "server not found は、単純な URL の打ち間違いでも出ます。www の有無、末尾の余計な文字、コピペ時の記号混入、ドメインの綴り違いだけで同じ見え方になることがあります。",
            <>
              入力が正しいのに失敗するなら、次は{" "}
              <Link
                href="/errors/err-name-not-resolved"
                className="underline hover:no-underline"
              >
                名前解決エラー
              </Link>{" "}
              として扱うほうが実用的です。
            </>,
          ],
        },
        {
          type: "p",
          title: "1つのサイトだけなら対象ドメインやサイト単位で見る",
          body: [
            "他のサイトは普通に開くのに、あるドメインだけ server not found になるなら、回線全体よりそのドメインに近い問題です。ドメイン失効、DNS 設定不整合、移転直後の反映差、地域ごとの差などが候補になります。",
            <>
              この方向では{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>
              、サービス名が明確なら{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別トラブルページ
              </Link>{" "}
              が近い確認先です。
            </>,
          ],
        },
        {
          type: "p",
          title: "回線差があるなら自分の DNS 環境を疑いやすい",
          body: [
            "自宅 Wi-Fi では失敗するがスマホ回線では開く、会社回線でだけだめ、1台の端末だけ失敗する、といった差があるなら、サイト全体障害よりローカル DNS や回線条件の影響が強くなります。",
            <>
              その場合は{" "}
              <Link
                href="/troubleshooting/device-cannot-connect"
                className="underline hover:no-underline"
              >
                端末・ネットワーク差の切り分け
              </Link>
              、DNS 設定変更の流れは{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNS ハブ
              </Link>{" "}
              から進むと整理しやすいです。
            </>,
          ],
        },
        {
          type: "p",
          title: "新しいドメインや変更直後なら伝播待ちも候補になる",
          body: [
            "最近公開したサイト、ネームサーバーを変えたサイト、移転したサイトで server not found が出るなら、単純な故障ではなく DNS 伝播や設定変更直後の不整合も考えるべきです。これはすぐには安定しないことがあります。",
            <>
              そのケースでは{" "}
              <Link
                href="/troubleshooting/dns-propagation"
                className="underline hover:no-underline"
              >
                DNS 伝播
              </Link>{" "}
              のページが近いです。
            </>,
          ],
        },
        {
          type: "list",
          title: "このページからつながる主な既存ページ",
          items: [
            "/troubleshooting-dns",
            "/troubleshooting/dns-propagation",
            "/troubleshooting/device-cannot-connect",
            "/troubleshooting/specific-site-not-working",
            "/troubleshooting/this-site-cant-be-reached",
            "/errors/err-name-not-resolved",
            "/errors/dns-probe-finished-nxdomain",
            "/services",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "server not found は、HTTP エラーより DNS 側に寄った症状です。URL が正しいか、1つのサイトだけか、回線差があるか、新しいドメインかを分けると、原因の当たりをかなり絞れます。",
          ],
        },
      ]}
    />
  );
}
