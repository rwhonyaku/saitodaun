import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "サイトは開くのにボタンが反応しない原因と対処法",
  description:
    "サイトは表示されるのにボタンやメニュー、フォーム送信だけ反応しないときの原因と対処法を解説します。JavaScript失敗、拡張機能、重なり要素、部分障害、CDN配信不良の切り分け方をまとめています。",
  alternates: { canonical: "/troubleshooting/site-opens-but-buttons-do-not-work" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="サイトは開くのにボタンが反応しない原因と対処法"
      updatedAt="2026-04-12"
      lead={[
        "ページ自体は表示されるのに、ログインボタン、送信ボタン、メニュー、タブ切り替えだけ反応しないことがあります。これはサイト全体が落ちているというより、操作に必要な JavaScript や API、画面上の一部要素だけが壊れているときに出やすい症状です。",
        "重要なのは『開くかどうか』ではなく『どこまで操作できるか』を見ることです。見た目は表示されていても、押した瞬間に何も起きないのか、読み込みだけ続くのか、特定ページだけ止まるのかで次に疑う場所が変わります。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "別ブラウザで同じ操作が通るなら、元のブラウザの拡張機能や保存データを優先して疑う",
            "ボタンを押した瞬間に何も起きないなら、JavaScript 側か重なり要素の干渉に近い",
            "押すと読み込みのまま止まるなら、API 側や部分障害、CDN 配信不良も候補になる",
            "トップは動くのにログイン後や設定画面だけ反応しないなら、サイト全体停止より機能単位の障害に近い",
            "会社・学校・VPN 利用時だけ反応しないなら、接続条件や制限も見たほうが早い",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                ログイン送信ボタンだけ進まない →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-login-fails"
                  className="underline hover:no-underline"
                >
                  サイトは開くのにログインできない原因
                </Link>
              </p>
              <p>
                押したあと画面が真っ白になる →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-is-blank"
                  className="underline hover:no-underline"
                >
                  サイトは開くのに真っ白になる原因
                </Link>
              </p>
              <p>
                特定サイトだけボタンや操作だけ壊れる →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
                </Link>
              </p>
              <p>
                開くけれど動作が途中で止まる、読み込みが終わらない →{" "}
                <Link
                  href="/troubleshooting/cdn-or-server-edge-issues"
                  className="underline hover:no-underline"
                >
                  CDNやサーバー経路の問題
                </Link>
              </p>
              <p>
                まずブラウザ側の切り分けをしたい →{" "}
                <Link
                  href="/troubleshooting/browser-not-loading-sites"
                  className="underline hover:no-underline"
                >
                  ブラウザエラーの切り分けハブ
                </Link>
              </p>
              <p>
                特定サービスの障害か確認したい →{" "}
                <Link
                  href="/services"
                  className="underline hover:no-underline"
                >
                  サービス別トラブルページ
                </Link>
              </p>
              <p>
                まず広域障害か見たい →{" "}
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
          type: "list",
          title: "よくある症状",
          items: [
            "押しても何も起きない",
            "押すと一瞬反応するが元の画面に戻る",
            "メニューだけ開かない、閉じない",
            "フォーム送信だけ進まない",
            "スマホでは押せるのに PC だと押せない",
            "特定ページの操作だけ止まる",
          ],
        },
        {
          type: "p",
          title: "『表示できる』と『操作できる』は別の問題",
          body: [
            "HTML や見た目の部分だけ読み込めていても、操作に必要な JavaScript や送信先 API が失敗すると、ボタンだけ動かない状態になります。見えているから正常とは限らず、実際には操作部分だけ壊れていることがあります。",
            <>
              真っ白になるわけではないが、見た目だけ残って操作不能なら{" "}
              <Link
                href="/troubleshooting/site-opens-but-is-blank"
                className="underline hover:no-underline"
              >
                真っ白ページ系の切り分け
              </Link>{" "}
              と近い原因を持つこともあります。
            </>,
          ],
        },
        {
          type: "p",
          title: "何も起きないなら JavaScript 失敗や重なり要素を疑う",
          body: [
            "押しても読み込み表示すら出ず、メニューやタブも一緒に反応しないなら、サイトの JavaScript が途中で止まっている可能性があります。また、Cookie 同意バナーやモーダル、透明な重なり要素が上に乗っていて、実際にはクリックが届いていないこともあります。",
            <>
              ブラウザ差があるなら{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラーの切り分けハブ
              </Link>{" "}
              から見たほうが早いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "押したあと止まるなら API や部分障害に近い",
          body: [
            "ボタンを押した瞬間にローディングが出るのに完了しないなら、クリック自体は認識されています。この場合はフロント側より、その先で呼ぶ API、認証、検索、保存処理、CDN 経由のスクリプト配信などが止まっている候補が強くなります。",
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
              が近い案内です。
            </>,
          ],
        },
        {
          type: "p",
          title: "ログイン・設定・購入だけ止まるなら機能単位の障害を考える",
          body: [
            "トップページや公開ページは動くのに、ログイン、設定変更、購入、投稿などの操作だけ失敗するなら、サイト全体停止ではなく会員機能やバックエンド連携だけの障害かもしれません。『ページは開くのに押せない』はこの種の部分障害でよく見える形です。",
            <>
              ログイン送信まわりなら{" "}
              <Link
                href="/troubleshooting/site-opens-but-login-fails"
                className="underline hover:no-underline"
              >
                ログインできないケース
              </Link>{" "}
              に寄せて見ると整理しやすくなります。
            </>,
          ],
        },
        {
          type: "p",
          title: "別端末では押せるならブラウザ保存データや拡張機能を優先する",
          body: [
            "同じアカウント、同じサイトでも、スマホでは押せるのに PC では押せないなら、資格情報そのものよりブラウザ状態の問題に近づきます。拡張機能、古いキャッシュ、保存済み Cookie、翻訳や広告ブロック系の干渉で操作だけ壊れることは珍しくありません。",
            "特に『PC のいつものブラウザだけだめ』『シークレットでは通る』なら、サイト全体よりローカル環境を優先して切り分けるのが実用的です。",
          ],
        },
        {
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "1) 同じ操作を別ブラウザかシークレットモードで試す",
            "2) メニューや他のボタンも一緒に反応しないか確認する",
            "3) 押したあとに読み込み停止になるか、完全に無反応かを見分ける",
            "4) スマホと PC、Wi-Fi と別回線で結果が変わるか比べる",
            "5) ログイン後や設定画面など特定ページだけか確認する",
            "6) 特定サービスならサービス別ページや障害情報も確認する",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "ボタンが効かないときは『押せていない』のか『押した先で止まっている』のかを最初に分けると進めやすくなります。前者はブラウザや画面側、後者は API や部分障害の可能性が高くなります。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "サイトは開くのにボタンが反応しないときは、サイト全体停止より JavaScript 失敗、拡張機能や保存データの干渉、重なり要素、機能単位の部分障害を優先して見るほうが早いです。",
            <>
              まずはブラウザ差と症状の出方を確認し、必要に応じて{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザ
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-opens-but-login-fails"
                className="underline hover:no-underline"
              >
                ログイン
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/cdn-or-server-edge-issues"
                className="underline hover:no-underline"
              >
                CDNや経路
              </Link>
              、{" "}
              <Link
                href="/services"
                className="underline hover:no-underline"
              >
                サービス別ページ
              </Link>{" "}
              へ進むのが実用的です。
            </>,
          ],
        },
      ]}
    />
  );
}
