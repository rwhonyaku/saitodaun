import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";

export const metadata = {
  title: "DNS・接続エラーの確認ハブ",
  description:
    "DNSや接続エラーを素早く切り分けるハブです。名前解決エラー、Wi-Fi差、回線差、ブラウザ差、特定サイトだけ開かない時の確認先へ案内します。",
  alternates: { canonical: "/troubleshooting-dns" }
};

export default function DnsGuidePage() {
  return (
    <EvergreenPageShell
      h1="DNS・接続エラーの確認ハブ"
      updatedAt="2026-04-12"
      lead={[
        "サイトが開かないときでも、原因がDNSなのか、回線なのか、ブラウザなのかで確認すべき場所は変わります。",
        "このページはDNSと接続系トラブルを素早く振り分けるためのハブです。症状に近い項目から、必要な深掘りページへ進んでください。",
        "DNS設定を変える前に、まず別回線・別端末で再現するかを見ておくと、不要な設定変更を避けやすくなります。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "ドメインが見つからない、「サーバーが見つかりません」系ならDNSを優先して疑う",
            "モバイル回線では開くのにWi-Fiだと失敗するなら、DNSだけでなくWi-Fiや回線差も疑う",
            "どのサイトも開かないなら、DNSより先に回線・ルーター・障害情報を確認する",
            "ブラウザだけで失敗するなら、DNSよりブラウザや端末設定差の可能性が高い",
            "エラー名が出ているなら、そのエラーページから入るほうが早い",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                ドメインが見つからない、サイト名を引けない →{" "}
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
                特定のサイトだけ開かない →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
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
                どのサイトも開かない →{" "}
                <Link
                  href="/troubleshooting/device-cannot-connect"
                  className="underline hover:no-underline"
                >
                  端末・ネットワーク差の確認ハブ
                </Link>
              </p>
              <p>
                Wi-Fi全体が怪しい、ルーターも疑わしい →{" "}
                <Link
                  href="/troubleshooting/device-cannot-connect"
                  className="underline hover:no-underline"
                >
                  端末・ネットワーク差の確認ハブ
                </Link>
              </p>
              <p>
                読み込み途中で経路が変わる、回線切り替えで失敗する →{" "}
                <Link
                  href="/errors/err-network-changed"
                  className="underline hover:no-underline"
                >
                  ERR_NETWORK_CHANGED
                </Link>
              </p>
              <p>
                まずサイト側障害か確認したい →{" "}
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
        {
          type: "p",
          title: "DNSが原因のことが多いケース",
          body: [
            "名前解決エラー、特定サイトだけの失敗、回線を変えると開くといった症状ならDNSが有力です。",
            "ただし、DNSを変更してもログイン後の機能不良やアカウント制限は直りません。トップページは開くのに操作だけ失敗する場合は、サービス側の部分障害やブラウザ保存データも合わせて確認します。",
            <>
              まず{" "}
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
                DNS_PROBE_FINISHED_NXDOMAIN
              </Link>{" "}
              を確認してください。
            </>,
          ],
        },
        {
          type: "p",
          title: "回線や経路の問題に近いケース",
          body: [
            "名前は引けていそうなのに届かない、回線を変えると結果が変わる、途中で接続条件が変わるなら経路側も候補です。",
            <>
              この系統は{" "}
              <Link
                href="/errors/err-address-unreachable"
                className="underline hover:no-underline"
              >
                ERR_ADDRESS_UNREACHABLE
              </Link>{" "}
              や{" "}
              <Link
                href="/errors/err-network-changed"
                className="underline hover:no-underline"
              >
                ERR_NETWORK_CHANGED
              </Link>{" "}
              が近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "Wi-Fi・ルーター・ISP側を先に見るべきケース",
          body: [
            "どのサイトも開かない、家のすべての端末でだめ、モバイル回線だと正常なら、DNS単体よりWi-Fiや回線側を優先して見ます。",
            <>
              この場合は{" "}
              <Link
                href="/troubleshooting/device-cannot-connect"
                className="underline hover:no-underline"
              >
                端末・ネットワーク差の確認ハブ
              </Link>{" "}
              へ進むのが早いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "ブラウザ・端末差の問題に近いケース",
          body: [
            "同じ回線でもブラウザや端末で結果が変わるなら、DNSだけでなくブラウザ保存データ、拡張機能、端末設定差も候補です。",
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
          type: "note",
          title: "設定を変える前の注意",
          body: [
            "DNS変更は有効な確認手段ですが、会社・学校・管理された端末では変更できない、または変更しないほうがよい場合があります。まず別回線で開くか、別ブラウザで再現するかを確認し、問題がDNS寄りだと分かってから進めるのが安全です。",
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
                DNS_PROBE_FINISHED_NXDOMAIN →{" "}
                <Link
                  href="/errors/dns-probe-finished-nxdomain"
                  className="underline hover:no-underline"
                >
                  DNS_PROBE_FINISHED_NXDOMAIN
                </Link>
              </p>
              <p>
                届かない、到達できない →{" "}
                <Link
                  href="/errors/err-address-unreachable"
                  className="underline hover:no-underline"
                >
                  ERR_ADDRESS_UNREACHABLE
                </Link>
              </p>
              <p>
                回線切り替えや経路変化で失敗する →{" "}
                <Link
                  href="/errors/err-network-changed"
                  className="underline hover:no-underline"
                >
                  ERR_NETWORK_CHANGED
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
    />
  );
}
