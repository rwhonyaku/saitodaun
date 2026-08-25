import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "CDNやサーバー経路の問題でサイトが不安定なとき",
  description:
    "CDNやサーバー経路の問題でサイトが一部の地域や時間帯だけ不安定になる場合の原因を解説します。502、503、504などとの関係も紹介します。",
  alternates: { canonical: "/troubleshooting/cdn-or-server-edge-issues" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="CDNやサーバー経路の問題でサイトが不安定なとき"
      lead={[
        "サイトが完全に停止しているわけではないのに、ある時間帯だけ重い、一部ユーザーだけ開けない、ページによって表示できたりできなかったりすることがあります。",
        "こうした症状では、元のサーバーそのものよりも、CDN、キャッシュ、配信経路、地域ごとの通信経路が関係していることがあります。",
        "このページでは、CDNやサーバー経路の問題で起こりやすい不安定さを整理して解説します。",
      ]}
      sections={[
        {
          type: "p",
          title: "CDNや経路の問題とは",
          body: [
            "CDNは、サイトの表示を高速化するために各地の配信拠点からコンテンツを届ける仕組みです。便利ですが、特定拠点の不具合やキャッシュ異常があると、一部ユーザーだけ不安定になることがあります。",
            "そのため、管理者側ではサイトは動いているように見えても、利用者側では開けないというズレが起こります。",
          ],
        },
        {
          type: "list",
          title: "よくある症状",
          items: [
            "ある地域だけサイトが重い",
            "時間帯によって開けたり開けなかったりする",
            "トップページは見えるが一部ページだけ不安定",
            "502、503、504系のエラーが断続的に出る",
          ],
        },
        {
          type: "p",
          title: "完全停止との違い",
          body: [
            "サーバーが完全停止している場合は、多くの環境で一貫して失敗しやすくなります。一方、CDNや経路の問題では、環境によって結果が変わることがあります。",
            "スマホでは開くのに自宅PCでは開かない、地域を変えると見えるといった場合は、経路や配信側を疑う余地があります。",
          ],
        },
        {
          type: "p",
          title: "『ずっと読み込み中』や『白いまま』になりやすい",
          body: [
            "CDNや配信経路の不安定さは、完全なエラー画面ではなく、読み込みが終わらない、白い画面のまま固まる、一部アセットだけ失敗するといった形で見えることがあります。",
            <>
              症状ベースでは{" "}
              <Link
                href="/troubleshooting/site-loads-forever"
                className="underline hover:no-underline"
              >
                サイトがずっと読み込み中のまま終わらない原因
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/site-opens-but-is-blank"
                className="underline hover:no-underline"
              >
                サイトは開くのに真っ白になる原因
              </Link>{" "}
              も近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "関連しやすいエラー",
          body: [
            "CDNや経路の不安定さは、タイムアウトやゲートウェイ系のエラーと結びつくことがあります。",
            <>
              関連する説明として{" "}
              <Link
                href="/errors/502-bad-gateway"
                className="underline hover:no-underline"
              >
                502 Bad Gateway
              </Link>
              、{" "}
              <Link
                href="/errors/503-service-unavailable"
                className="underline hover:no-underline"
              >
                503 Service Unavailable
              </Link>
              、{" "}
              <Link href="/errors/504-gateway-timeout" className="underline hover:no-underline">
                504 Gateway Timeout
              </Link>{" "}
              も参考になります。
            </>,
          ],
        },
        {
          type: "p",
          title: "利用者側でできる確認",
          body: [
            "まずは別回線、別端末、別ブラウザで試して、症状が特定環境に偏っているか確認してください。自宅Wi-Fiではだめでもスマホ回線では見えるなら、全体停止ではない可能性が高くなります。",
            <>
              特定サイトの確認には{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              も役立ちます。
            </>,
          ],
        },
        {
          type: "p",
          title: "回線や地域差が強いとき",
          body: [
            "同じサイトでも、スマホ回線では見えるのに自宅Wi-Fiでは重い、あるいはその逆という差が出るなら、CDN拠点差や経路差を疑う価値があります。",
            <>
              回線差を先に整理したい場合は{" "}
              <Link
                href="/troubleshooting/website-loads-on-phone-not-wifi"
                className="underline hover:no-underline"
              >
                スマホでは開くのにWi-Fiだと開かない原因
              </Link>{" "}
              も参考になります。
            </>,
          ],
        },
        {
          type: "p",
          title: "管理者側なら確認したいこと",
          body: [
            "サイト運営者であれば、CDN設定、キャッシュ削除、オリジンサーバーの応答、地域別監視、WAF設定などを確認する必要があります。",
            "特に変更直後にだけ不安定になったなら、キャッシュや配信設定の影響を強く疑った方がよいです。",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "環境によって開けたり開けなかったりするなら、単純なサイト停止ではなく、CDNや通信経路のばらつきが関係している可能性があります。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "CDNやサーバー経路の問題では、サイトが完全に落ちていないのに、一部ユーザーだけ不安定になることがあります。",
            "複数環境で結果を比べると、全体停止なのか、経路や配信の問題なのかを見分けやすくなります。",
            <>
              まず応答の有無を確認したい場合は{" "}
              <Link href="/" className="underline hover:no-underline">
                接続チェックツール
              </Link>{" "}
              が役立ちます。
            </>,
          ],
        },
      ]}
      updatedAt="2026-03-06"
    />
  );
}
