import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "429 Too Many Requestsとは？原因と直し方 | サイトダウン",
  description:
    "429 Too Many Requests の意味、アクセス制限（Rate Limit）の仕組み、Bot対策やWAFの影響、ユーザー側/運営者側の対処を解説します。",
};

export default function Error429TooManyRequestsPage() {
  return (
    <EvergreenPageShell
      h1="429 Too Many Requestsとは？原因と直し方"
      updatedAt="2026-03-03"
      lead={[
        "429 Too Many Requests は「短時間にリクエストが多すぎるため、一時的に制限している」ことを示すエラーです。",
        "サイトが落ちているわけではなく、セキュリティや負荷対策として“意図的に抑制”されているケースがほとんどです。まずは“待つ”と“回線/IPを変える”で切り分けるのが最短です。",
      ]}
      sections={[
        {
          type: "list",
          title: "まず結論：429で起きていること",
          items: [
            "サーバーは動いているが、一定時間あたりのアクセス回数が上限を超えたため制限されている",
            "原因は「あなたのIP/端末のアクセスが多い」か「共有回線で誰かが使いすぎ」か「WAF/Rate Limitの誤設定」が中心",
            "リロード連打は悪化要因になりやすい（制限が延長されることがある）",
          ],
        },

        {
          type: "list",
          title: "よくある原因",
          items: [
            "ページ更新や操作を短時間に繰り返した（連打、連続リロード）",
            "アプリや拡張機能が自動で大量アクセスしている（監視系/自動更新系）",
            "Bot対策/WAF/Rate Limit が作動した（Cloudflare等）",
            "同一IPからのアクセスが多い（共有回線/会社ネットワーク/公共Wi-Fiなど）",
            "APIやログイン/検索など“重いエンドポイント”で上限に当たりやすい",
          ],
        },

        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) しばらく待つ（数分〜。まずこれ）",
            "2) リロード連打を止める（制限が延長されることがある）",
            "3) 別回線で試す（Wi-Fi→モバイル回線。IPが変わる）",
            "4) VPNで接続元IPを変える（誤制限/共有回線の回避）",
            "5) 自動アクセス系の拡張機能・アプリを一時停止（原因の切り分け）",
            "6) ログインが関係しそうなら、一度ログアウト→再ログイン（セッション不整合の切り分け）",
          ],
        },

        {
          type: "list",
          title: "運営者側の改善ポイント（サイト管理者向け）",
          items: [
            "Rate Limitのしきい値（回数/時間）を現実的に設定する（通常ユーザーを弾かない）",
            "ログイン/購入など重要導線は、誤検知しにくいルールにする（例外/緩和）",
            "CDN/WAFのチャレンジ（CAPTCHA）や例外ルールで救済する（完全ブロックを避ける）",
            "429の対象エンドポイントを把握し、キャッシュ/ページング/バックオフで負荷を下げる",
            "APIはキー認証・トークン・クォータで“負荷”と“悪用”を分離する",
          ],
        },

        {
          type: "div",
          title: "このエラーが「サイト全体」か「自分だけ」か確認する",
          body: [
            "429は“あなたのアクセス”が制限対象になっていることが多いですが、設定ミスで広範囲に出ることもあります。外部地点から疎通確認して状況を整理しましょう。",
            <div
              key="cta"
              className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm font-bold text-slate-900">
                外部から到達できるかをチェック →
              </p>
              <Link
                href="/"
                className="mt-2 inline-block text-sky-600 font-bold underline"
              >
                サイトダウンで接続チェックする
              </Link>
              <p className="mt-2 text-xs text-slate-600">
                外部では正常なら、あなたの回線/IPだけが制限されている可能性が高いです。
              </p>
            </div>,
          ],
        },

        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. 429はサーバーダウンですか？ → いいえ。多くの場合サーバーは稼働しており、制限（レート制限）で弾かれています。",
            "Q. どれくらい待てば解除されますか？ → サイトの設定次第ですが、数分〜しばらくで解除されることが多いです。連打すると延長される場合があります。",
            "Q. モバイル回線に切り替えると直るのはなぜ？ → IP（接続元）が変わり、制限対象から外れることがあるためです。",
            "Q. 403と何が違う？ → 403は“アクセス禁止（権限/ブロック）”、429は“短時間に多すぎるため一時制限”です。",
          ],
        },

        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks
              key="related"
              currentSlug="429-too-many-requests"
            />,
          ],
        },
      ]}
    />
  );
}