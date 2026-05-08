import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "ERR_TUNNEL_CONNECTION_FAILEDとは？原因と対処 | サイトダウン",
  description:
    "ERR_TUNNEL_CONNECTION_FAILED の意味、プロキシやVPN、社内ネットワーク、ブラウザ設定の不整合で起きる原因と切り分け方を実用的に解説します。",
};

export default function ErrTunnelConnectionFailedPage() {
  return (
    <EvergreenPageShell
      h1="ERR_TUNNEL_CONNECTION_FAILEDとは？原因と対処"
      updatedAt="2026-04-11"
      lead={[
        "ERR_TUNNEL_CONNECTION_FAILED は、ブラウザがプロキシやVPNなどの中継経路を使って接続しようとしたものの、そのトンネル接続を確立できなかったときに出るエラーです。",
        "サイト自体の障害というより、途中の接続経路やネットワーク設定の問題で起きやすいのが特徴です。特に会社・学校・公共Wi-Fi・VPN利用時に出やすいエラーです。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "VPNやプロキシを使っているなら、まず一時的にオフにして比較する",
            "会社・学校・公共Wi-Fiだけで出るなら、ネットワーク側の制限や認証不良を疑う",
            "モバイル回線では開くなら、サイト側より中継経路の問題に近い",
            "DNSやHTTPエラーより先に、プロキシ設定と接続経路差を確認するのが早い",
          ],
        },
        {
          type: "list",
          title: "このエラーで起きていること",
          items: [
            "ブラウザが、直接ではなく中継経路を使って接続しようとしている",
            "その中継経路との接続確立に失敗している",
            "サイト本体ではなく、プロキシ、VPN、社内ネットワーク、認証付き回線が原因になりやすい",
          ],
        },
        {
          type: "list",
          title: "主な原因",
          items: [
            "VPNやプロキシサーバーの不調",
            "ブラウザやOSに古いプロキシ設定が残っている",
            "会社・学校ネットワークの制限や認証不整合",
            "公共Wi-Fiのログイン未完了やセッション切れ",
            "セキュリティ製品や通信監視ツールの干渉",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "VPN接続時だけ出るなら、VPN経路や設定不良の可能性が高い",
            "社内PCや社内Wi-Fiだけで出るなら、社内プロキシやネットワーク制限を疑いやすい",
            "モバイル回線では正常なら、サイト障害より中継経路側の問題に近い",
            "複数サイトで同じように出るなら、個別サイトではなくローカル設定や経路の問題を疑うべきです",
          ],
        },
        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) VPNやプロキシを一時的にオフにして再試行する",
            "2) 別回線で試し、回線依存かどうか確認する",
            "3) ブラウザやOSのプロキシ設定を見直す",
            "4) 公共Wi-Fiならログイン画面や認証状態を確認する",
            "5) 会社・学校回線なら管理されたネットワーク制限も疑う",
          ],
        },
        {
          type: "p",
          title: "ERR_NETWORK_CHANGED や ERR_INTERNET_DISCONNECTED との違い",
          body: [
            "ERR_TUNNEL_CONNECTION_FAILED は、単純な回線切断ではなく『中継経路がうまく作れない』タイプのエラーです。ネットワークが切れたのか、プロキシ経路だけが失敗しているのかで切り分け方が変わります。",
            <>
              回線条件が途中で変わるなら{" "}
              <Link
                href="/errors/err-network-changed"
                className="underline hover:no-underline"
              >
                ERR_NETWORK_CHANGED
              </Link>{" "}
              が近く、接続そのものが失われているなら{" "}
              <Link
                href="/errors/err-internet-disconnected"
                className="underline hover:no-underline"
              >
                ERR_INTERNET_DISCONNECTED
              </Link>{" "}
              のほうが近い症状です。
            </>,
          ],
        },
        {
          type: "p",
          title: "公共Wi-Fiや会社ネットワークで出やすい理由",
          body: [
            "公共Wi-Fiや社内ネットワークでは、認証付きプロキシや通信制御が入っていることがあります。その途中の仕組みがうまく動かないと、このエラーが出やすくなります。",
            <>
              公共Wi-Fiでログイン画面が出ない場合は{" "}
              <Link
                href="/troubleshooting/public-wifi-login-page-not-showing"
                className="underline hover:no-underline"
              >
                公共Wi-Fiでログイン画面が出ない原因
              </Link>{" "}
              も確認してください。
            </>,
          ],
        },
        {
          type: "p",
          title: "ブラウザだけの問題に見えることもある",
          body: [
            "同じPCでも、あるブラウザだけ出て別ブラウザでは開くなら、ブラウザ保存設定や拡張機能、ブラウザ単位のプロキシ利用が影響していることがあります。",
            <>
              その場合は{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザでサイトが開かない原因
              </Link>{" "}
              も近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "スマホでは開くのにPCだけ失敗するなら",
          body: [
            "このパターンは、サイト側の障害より PC 側の VPN、社内設定、プロキシ、証明書監視の影響であることが多めです。",
            <>
              端末差の切り分けでは{" "}
              <Link
                href="/troubleshooting/site-works-on-phone-not-computer"
                className="underline hover:no-underline"
              >
                スマホでは開くのにパソコンで開かない原因
              </Link>{" "}
              も参考になります。
            </>,
          ],
        },
        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. これはサイトが落ちているエラーですか？ → 多くは違います。途中のプロキシやVPN経路の問題です。",
            "Q. 自分だけ出ることはありますか？ → あります。会社PC、VPN利用、特定Wi-Fiだけで局所的に起きやすいです。",
            "Q. DNSエラーとは違いますか？ → はい。これは名前解決より、接続経路の中継失敗に近いエラーです。",
            "Q. すぐ直りますか？ → VPNやプロキシ設定を外すとすぐ解消することもありますが、社内ネットワーク側なら管理者対応が必要なことがあります。",
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks
              key="related"
              currentSlug="err-tunnel-connection-failed"
            />,
          ],
        },
      ]}
    />
  );
}
