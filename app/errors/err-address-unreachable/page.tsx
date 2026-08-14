import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "ERR_ADDRESS_UNREACHABLEとは？原因と対処 | サイトダウン",
  description:
    "ERR_ADDRESS_UNREACHABLE の意味、接続先IPに到達できない原因、ルーター・回線・ローカルネットワークの見分け方を実用的に解説します。",
};

export default function ErrAddressUnreachablePage() {
  return (
    <EvergreenPageShell
      h1="ERR_ADDRESS_UNREACHABLEとは？原因と対処"
      updatedAt="2026-04-11"
      lead={[
        "ERR_ADDRESS_UNREACHABLE は、ブラウザが接続先アドレスまでは把握しているのに、その先へ実際に到達できないときに出るエラーです。",
        "DNSで名前を引けていない状態ではなく、『行き先は分かったが届かない』タイプのエラーなので、ルーター、ローカルネットワーク、回線経路、接続先の到達性を確認することが重要です。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "同じサイトが別回線で開くなら、自分のWi-Fiや回線経路側を優先して疑う",
            "複数サイトで同じように出るなら、サイト個別よりネットワーク全体の問題に近い",
            "名前解決エラーではないので、まずDNSよりルーターや到達経路を疑う",
            "社内回線やVPNだけで出るなら、経路制限やネットワーク設定差の可能性が高い",
          ],
        },
        {
          type: "list",
          title: "このエラーで起きていること",
          items: [
            "ブラウザは接続先IPアドレスを把握している",
            "しかしその接続先へネットワーク上で到達できていない",
            "DNSより後、HTTP応答より前の段階で止まっている",
          ],
        },
        {
          type: "list",
          title: "主な原因",
          items: [
            "ルーターやローカルネットワークの不調",
            "回線経路の問題や一時的な到達性低下",
            "VPN、プロキシ、社内ネットワークの制限",
            "接続先サーバーや上流ネットワークの到達不能",
            "IP変更直後や経路切り替え直後の不整合",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "モバイル回線では開くのに自宅Wi-Fiで開かないなら、ローカル回線やルーター側を疑いやすい",
            "会社・学校・VPN経由だけで出るなら、経路制限やプロキシ影響が疑わしい",
            "複数サイトで同じように出るなら、個別サイト障害より接続側の問題に近い",
            "特定サイトだけで、他では出ないなら接続先側の経路問題や部分障害も候補になる",
          ],
        },
        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) Wi-Fiとモバイル回線の両方で比較する",
            "2) ルーターと端末を再起動する",
            "3) VPN、プロキシ、セキュリティ製品を一時的に見直す",
            "4) 同じサイトが他の端末でもだめか確認する",
            "5) 広域障害や回線障害情報を確認する",
          ],
        },
        {
          type: "p",
          title: "ERR_NAME_NOT_RESOLVED や ERR_CONNECTION_TIMED_OUT との違い",
          body: [
            "ERR_ADDRESS_UNREACHABLE は、接続先の名前が分からないエラーではありません。名前は引けているのに、その先へ届かない点が違います。",
            <>
              名前解決段階なら{" "}
              <Link
                href="/errors/err-name-not-resolved"
                className="underline hover:no-underline"
              >
                ERR_NAME_NOT_RESOLVED
              </Link>{" "}
              が近く、届くかどうか以前に長時間待たされるなら{" "}
              <Link
                href="/errors/err-connection-timed-out"
                className="underline hover:no-underline"
              >
                ERR_CONNECTION_TIMED_OUT
              </Link>{" "}
              のほうが近い症状です。
            </>,
          ],
        },
        {
          type: "p",
          title: "自宅ネットワーク側を先に見るべきケース",
          body: [
            "スマホのモバイル回線では開くのに、自宅Wi-FiやPCだけで出るなら、サイト全体の障害よりローカルネットワーク側の可能性が高くなります。",
            <>
              その場合は{" "}
              <Link
                href="/troubleshooting/router-not-working"
                className="underline hover:no-underline"
              >
                ルーターがつながらない原因
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/wifi-not-working"
                className="underline hover:no-underline"
              >
                Wi-Fiがつながらない原因
              </Link>{" "}
              を先に確認すると確認が早いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "サイト側の部分障害や経路問題のこともある",
          body: [
            "自分の回線だけでなく、複数の環境でも特定サイトだけに出るなら、接続先サーバーまでの経路やCDN/上流ネットワーク側の問題も候補になります。",
            <>
              その場合は{" "}
              <Link
                href="/troubleshooting/cdn-or-server-edge-issues"
                className="underline hover:no-underline"
              >
                CDNやサーバー経路の問題でサイトが不安定なとき
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              も近いページです。
            </>,
          ],
        },
        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. これはDNSエラーですか？ → いいえ。名前解決より後の段階で届かない状態です。",
            "Q. サイトが落ちているだけですか？ → その可能性もありますが、自分の回線や経路条件の問題でも起きます。",
            "Q. 自分だけ出ることはありますか？ → あります。Wi-Fi、VPN、社内回線、ルーター差で局所的に起きます。",
            "Q. すぐ直りますか？ → 一時的な経路不調なら戻ることもありますが、繰り返すならローカル回線や接続経路の確認が必要です。",
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks
              key="related"
              currentSlug="err-address-unreachable"
            />,
          ],
        },
      ]}
    />
  );
}
