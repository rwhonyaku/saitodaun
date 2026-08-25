import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "401 Unauthorizedとは？原因と対処",
  description:
    "401 Unauthorized の意味、未ログインや認証失敗で起きる原因、403との違い、セッション切れや認証情報不整合、ユーザー側と運営側の見分け方を実用的に解説します。",
  alternates: { canonical: "/errors/401-unauthorized" }
};

export default function Error401UnauthorizedPage() {
  return (
    <EvergreenPageShell
      h1="401 Unauthorizedとは？原因と対処"
      updatedAt="2026-04-12"
      lead={[
        "401 Unauthorized は、サーバーが『このページやAPIを見るには認証が必要だが、その認証が通っていない』と判断したときに返すエラーです。",
        "サイト全体が落ちているとは限らず、未ログイン、セッション切れ、認証トークン不整合、Basic 認証失敗、ログイン状態の破損などで起きます。重要なのは、403 のような『禁止』ではなく、『認証が足りない・認証が通っていない』状態として見ることです。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "未ログイン状態なら、まず認証が必要なページかを確認する",
            "昨日まで入れていて急に 401 なら、セッション切れやログイン状態の不整合を疑う",
            "アプリでは入れるのにブラウザだけ 401 なら、Cookie や保存済み認証状態を疑う",
            "特定回線や VPN 利用時だけ 401 なら、認証前段の制限や経路条件も候補になる",
            "ログインしてもすぐ 401 に戻るなら、サイト側の認証系部分障害も疑う",
          ],
        },
        {
          type: "list",
          title: "このエラーで起きていること",
          items: [
            "サーバーは要求されたページや機能を理解している",
            "しかし利用者が必要な認証条件を満たしていないと判断している",
            "そのため『ログインし直す』『認証情報を出し直す』ことを前提に応答している",
          ],
        },
        {
          type: "list",
          title: "主な原因",
          items: [
            "未ログインのまま認証必須ページや API にアクセスしている",
            "ログイン状態が切れている、または Cookie が壊れている",
            "保存された認証トークンやセッションが古い状態のまま残っている",
            "Basic 認証や API キー認証が失敗している",
            "ログイン後の認証連携やトークン更新処理だけが壊れている",
            "サイト側で認証まわりの部分障害が起きている",
          ],
        },
        {
          type: "list",
          title: "401 と 403 の違い",
          items: [
            "401 は『認証が足りない・認証が通っていない』状態",
            "403 は『認証されていてもアクセスを許可しない』状態",
            "401 は再ログインや認証し直しで改善することがある",
            "403 は権限不足、地域制限、WAF、IP 制限などで止められていることが多い",
          ],
        },
        {
          type: "p",
          title: "セッション切れや Cookie 不整合で起きやすい",
          body: [
            "401 は、ID やパスワードが完全に間違っているときだけでなく、いったんログインしていたセッションが切れたのにブラウザが古い状態を持ち続けているときにも起きます。ログイン画面へ戻される、何度もサインインを求められる、認証後にまた 401 になるといった見え方です。",
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
          title: "ブラウザだけ失敗するなら保存状態を疑う",
          body: [
            "スマホアプリでは使えるのにブラウザ版だけ 401 になるなら、アカウント全体停止よりブラウザの保存データや認証状態を疑いやすくなります。Cookie、セッションストレージ、古いログイン情報、拡張機能の干渉で認証が壊れることがあります。",
            <>
              この方向は{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラーの確認ハブ
              </Link>{" "}
              とあわせて見ると見分けやすいです。
            </>,
          ],
        },
        {
          type: "p",
          title: "認証後だけ 401 が続くなら部分障害のこともある",
          body: [
            "トップページや公開ページは開くのに、ログイン後の画面や特定機能だけ 401 になるなら、サイト全体停止ではなく認証 API、セッション保存、トークン更新、SSO 連携など一部機能だけが壊れている可能性があります。",
            <>
              特定サービスで起きているなら{" "}
              <Link
                href="/services"
                className="underline hover:no-underline"
              >
                サービス別トラブルページ
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              のほうが近いケースもあります。
            </>,
          ],
        },
        {
          type: "p",
          title: "403 に見える制限系とは分けて考える",
          body: [
            "401 は認証不足が中心ですが、実際の現場では 403 や 429 と見え方が近く、利用者が混同しやすいです。ログインし直しで改善する余地があるなら 401 寄り、正しい操作でも明確に拒否されるなら 403 寄り、短時間の連続試行後に止められるなら 429 寄りです。",
            <>
              そのため表示コードがあるなら{" "}
              <Link
                href="/errors/403-forbidden"
                className="underline hover:no-underline"
              >
                403 Forbidden
              </Link>{" "}
              や{" "}
              <Link
                href="/errors/429-too-many-requests"
                className="underline hover:no-underline"
              >
                429 Too Many Requests
              </Link>{" "}
              と見比べると整理しやすくなります。
            </>,
          ],
        },
        {
          type: "list",
          title: "ユーザー側で試せる対処",
          items: [
            "1) いったんログアウトして再ログインする",
            "2) シークレットモードや別ブラウザで認証結果を比べる",
            "3) 該当サイトの Cookie や保存データを見直す",
            "4) アプリ版とブラウザ版で差が出るか確認する",
            "5) VPN や会社・学校回線利用時だけ失敗しないか確認する",
            "6) 特定サービスなら障害情報やサービス別ページも確認する",
          ],
        },
        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. 401 はパスワード間違いだけですか？ → いいえ。未ログイン、セッション切れ、トークン不整合でも起きます。",
            "Q. 401 はサイトダウンですか？ → 必ずしも違います。認証まわりだけの問題でも発生します。",
            "Q. 自分だけ起きることはありますか？ → あります。ブラウザ保存データや局所的な認証状態の破損で起きます。",
            "Q. 403 と同じですか？ → 違います。401 は認証不足、403 は認証されても禁止されている状態です。",
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [<ErrorRelatedLinks key="related" currentSlug="401-unauthorized" />],
        },
      ]}
    />
  );
}
