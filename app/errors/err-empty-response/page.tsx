import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "ERR_EMPTY_RESPONSEとは？原因と対処 | サイトダウン",
  description:
    "ERR_EMPTY_RESPONSE の意味、サーバーが応答を返さない原因、ブラウザ・回線・サーバー側の見分け方を実用的に解説します。",
};

export default function ErrEmptyResponsePage() {
  return (
    <EvergreenPageShell
      h1="ERR_EMPTY_RESPONSEとは？原因と対処"
      updatedAt="2026-04-11"
      lead={[
        "ERR_EMPTY_RESPONSE は、ブラウザが接続自体は試みたものの、サーバーから中身のある応答を受け取れなかったときに出るエラーです。",
        "完全なタイムアウトとも、明確なHTTPエラーとも少し違い、『つながりかけたが何も返ってこない』『途中で空のまま終わる』ような場面で出やすいのが特徴です。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "別ブラウザや別回線でも同じなら、サイト側や経路側の問題を疑う",
            "特定サイトだけなら、そのサイトの部分障害やサーバー応答不良の可能性が高い",
            "複数サイトで出るなら、ブラウザ環境やネットワーク干渉を疑う",
            "タイムアウトより早く失敗し、HTTPコードも出ないなら、この系統の可能性が高い",
          ],
        },
        {
          type: "list",
          title: "このエラーで起きていること",
          items: [
            "ブラウザは接続を試みている",
            "しかしHTTPレスポンスとして使える内容が返ってきていない",
            "サーバーが空の応答で切れた、途中で接続が閉じた、経路上で応答が失われた可能性がある",
          ],
        },
        {
          type: "list",
          title: "主な原因",
          items: [
            "サーバーやアプリが応答を返す前に落ちている",
            "リバースプロキシやCDNの途中で接続が切れている",
            "ブラウザ拡張機能やセキュリティ製品が応答を妨げている",
            "VPN、プロキシ、社内ネットワークの干渉",
            "一時的な回線不安定や接続リセット",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "特定サイトだけなら、サイト側の部分障害やサーバー応答不良を疑いやすい",
            "別ブラウザでは開くなら、ブラウザ保存データや拡張機能の影響が濃い",
            "Wi-Fiでは出るがモバイル回線では出ないなら、回線経路やローカルネットワーク差を疑いやすい",
            "白い画面や読み込み途中停止に近いなら、フロント側や配信経路の不安定さも候補になる",
          ],
        },
        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) ページを再読み込みし、別ブラウザでも試す",
            "2) シークレットモードで開いて拡張機能影響を減らす",
            "3) Wi-Fiとモバイル回線の両方で比較する",
            "4) VPN、プロキシ、セキュリティ系アプリを一時的に見直す",
            "5) 特定サイトだけなら時間を置いて再試行する",
          ],
        },
        {
          type: "p",
          title: "ERR_CONNECTION_TIMED_OUT や Connection Reset との違い",
          body: [
            "ERR_EMPTY_RESPONSE は、長く待って応答がないというより、『返ってくるはずの応答が空のまま終わった』場面で出やすいエラーです。",
            <>
              長時間待たされるなら{" "}
              <Link
                href="/errors/err-connection-timed-out"
                className="underline hover:no-underline"
              >
                ERR_CONNECTION_TIMED_OUT
              </Link>{" "}
              が近く、途中で接続自体が切れた感じなら{" "}
              <Link
                href="/errors/connection-reset"
                className="underline hover:no-underline"
              >
                Connection Reset
              </Link>{" "}
              も近い症状です。
            </>,
          ],
        },
        {
          type: "p",
          title: "サイト側の部分障害で出ることがある",
          body: [
            "トップページは見えるのに一部URLだけ空のまま失敗する、ログイン後だけだめ、特定機能だけ反応しないといった場合は、サイト側の部分障害や上流サーバーの不安定さも候補です。",
            <>
              その場合は{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/cdn-or-server-edge-issues"
                className="underline hover:no-underline"
              >
                CDNやサーバー経路の問題でサイトが不安定なとき
              </Link>{" "}
              も近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "白い画面や読み込み中のままと混同しやすい",
          body: [
            "利用者から見ると、ERR_EMPTY_RESPONSE は『真っ白のまま』『読み込みが終わらないように見える』症状と混同されやすいです。ただし内部では、何も返せずに失敗しているケースがあります。",
            <>
              症状ベースで近いページとしては{" "}
              <Link
                href="/troubleshooting/site-opens-but-is-blank"
                className="underline hover:no-underline"
              >
                サイトは開くのに真っ白になる原因
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/site-loads-forever"
                className="underline hover:no-underline"
              >
                サイトがずっと読み込み中のまま終わらない原因
              </Link>{" "}
              があります。
            </>,
          ],
        },
        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. これはサーバーダウンですか？ → その可能性はありますが、ブラウザや回線干渉でも起きます。",
            "Q. 自分だけ出ることはありますか？ → あります。拡張機能、VPN、社内回線、ローカルセキュリティ製品でも起きます。",
            "Q. HTTPエラーとは何が違いますか？ → HTTPコードが返る前に空のまま失敗している点が違います。",
            "Q. すぐ直りますか？ → 一時的なサーバー不安定や回線不調なら戻ることがありますが、繰り返すなら確認が必要です。",
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks key="related" currentSlug="err-empty-response" />,
          ],
        },
      ]}
    />
  );
}
