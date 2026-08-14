import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "ERR_TOO_MANY_REDIRECTSとは？原因と対処 | サイトダウン",
  description:
    "ERR_TOO_MANY_REDIRECTS の意味、リダイレクトループが起きる原因、Cookieやログイン状態の不整合、HTTPSやWWWの転送設定ミス、ユーザー側での見分け方を実用的に解説します。",
};

export default function ErrTooManyRedirectsPage() {
  return (
    <EvergreenPageShell
      h1="ERR_TOO_MANY_REDIRECTSとは？原因と対処"
      updatedAt="2026-04-12"
      lead={[
        "ERR_TOO_MANY_REDIRECTS は、ブラウザがページを開こうとして別のURLへ何度も転送され、終点にたどり着けなくなったときに出るエラーです。",
        "完全な接続失敗ではなく、ページ同士が行き来し続けている状態なので、サイト側の転送設定ミスだけでなく、ログイン状態や Cookie の不整合、HTTPS 化まわりのずれでも起きます。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "シークレットモードで開けるなら、Cookie や保存済みログイン状態の不整合を疑う",
            "別端末や別ブラウザでも同じなら、サイト側のリダイレクト設定ミスの可能性が高い",
            "ログイン後だけ起きるなら、認証後の戻り先やセッション処理のループを疑う",
            "HTTP と HTTPS、www ありなしで行き来しているなら、転送設定の食い違いを疑う",
            "会社・学校・VPN 利用時だけ起きるなら、途中のプロキシや制限条件も候補になる",
          ],
        },
        {
          type: "list",
          title: "このエラーで起きていること",
          items: [
            "ブラウザはページを開こうとしている",
            "しかし転送先がまた別の転送を返し、同じ流れが繰り返されている",
            "結果として『どこへ行けばよいか決まらない』状態になり、ブラウザが安全のため停止している",
          ],
        },
        {
          type: "list",
          title: "主な原因",
          items: [
            "HTTP → HTTPS と HTTPS → HTTP の両方が設定されていてループしている",
            "www ありなしの正規化設定が重複している",
            "ログイン後に必要な Cookie が壊れていて認証画面へ戻され続ける",
            "CDN、リバースプロキシ、アプリ本体の転送設定が食い違っている",
            "ログイン後の戻り先 URL や言語切替、地域判定が循環している",
            "ブラウザ拡張やプロキシが途中の挙動を変えている",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "シークレットモードだと開くなら、自分のブラウザ保存データ寄り",
            "どの端末でも同じなら、サイト側の設定ループ寄り",
            "トップは開くがログイン後だけループするなら、認証やセッション寄り",
            "特定回線や VPN 利用時だけ起きるなら、経路条件や中継設定も疑う",
          ],
        },
        {
          type: "p",
          title: "Cookie やログイン状態の不整合で起きることが多い",
          body: [
            "ERR_TOO_MANY_REDIRECTS は、サイト側設定ミスだけでなく、古い Cookie や壊れたログイン状態でも起きます。ログイン済みとして扱いたいのに認証情報が一致せず、ログインページと戻り先の画面を往復し続ける形です。",
            <>
              ログイン画面は出るのに認証後だけ失敗するなら{" "}
              <Link
                href="/troubleshooting/site-opens-but-login-fails"
                className="underline hover:no-underline"
              >
                サイトは開くのにログインできない原因
              </Link>{" "}
              も近い症状です。
            </>,
          ],
        },
        {
          type: "p",
          title: "サイト側の HTTPS・www 転送設定ミス",
          body: [
            "サイト運営側で、アプリ本体、CDN、リバースプロキシ、ロードバランサーの複数箇所に転送設定があると、意図せずループが起きることがあります。たとえば HTTPS に寄せたい設定と、別の層の HTTP へ戻す設定がぶつかると、利用者側では ERR_TOO_MANY_REDIRECTS に見えます。",
            <>
              CDN や中継経路の設定ずれが疑わしいときは{" "}
              <Link
                href="/troubleshooting/cdn-or-server-edge-issues"
                className="underline hover:no-underline"
              >
                CDNやサーバー経路の問題
              </Link>{" "}
              も近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "ログイン後だけ起きるなら部分障害に近い",
          body: [
            "トップページや公開ページは見えるのに、サインイン後だけループするなら、サイト全体停止ではなく認証まわりの部分障害や戻り先処理の不具合に近いです。特定の画面、特定のアカウント状態、特定の地域だけで起きることもあります。",
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
                href="/services"
                className="underline hover:no-underline"
              >
                サービス別トラブルページ
              </Link>{" "}
              のほうが近いケースもあります。
            </>,
          ],
        },
        {
          type: "p",
          title: "会社・学校・VPN 利用時だけ起きるケース",
          body: [
            "通常回線では開くのに、会社や学校のネットワーク、VPN、プロキシ経由だとだけループするなら、途中の中継やアクセス条件がリダイレクト挙動を変えている可能性があります。地域判定、認証プロキシ、HTTPS 検査、フィルタリングが関係することがあります。",
            <>
              この方向なら{" "}
              <Link
                href="/troubleshooting/site-blocked-by-firewall"
                className="underline hover:no-underline"
              >
                ファイアウォールや制限でサイトが開かないとき
              </Link>{" "}
              も確認すると見分けやすいです。
            </>,
          ],
        },
        {
          type: "list",
          title: "ユーザー側で試せる対処",
          items: [
            "1) シークレットモードで開いて Cookie や保存状態の影響を切る",
            "2) 該当サイトの Cookie とサイトデータを見直す",
            "3) 別ブラウザ、別端末で再現するか比べる",
            "4) Wi-Fi とモバイル回線で比べる",
            "5) VPN、プロキシ、拡張機能を一時的に見直す",
            "6) ログイン後だけ起きるのか、トップから起きるのかを分けて確認する",
          ],
        },
        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. これはサイトダウンですか？ → 必ずしもそうではありません。ループ設定や Cookie 不整合でも起きます。",
            "Q. 自分だけ起きることはありますか？ → あります。ブラウザ保存データ、VPN、社内ネットワーク条件で局所的に起きます。",
            "Q. すぐ直りますか？ → Cookie 不整合なら比較的すぐ原因を確認できますが、サイト側設定ループなら運営側修正が必要です。",
            "Q. 403 や 404 と何が違いますか？ → 403 や 404 は応答内容が決まっていますが、こちらは転送が終わらず止められている点が違います。",
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [<ErrorRelatedLinks key="related" currentSlug="err-too-many-redirects" />],
        },
      ]}
    />
  );
}
