import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "ログイン後だけサイトが使えない原因と対処法",
  description:
    "ログインはできるのに会員ページ、設定画面、購入画面だけ動かないときの原因と対処法を解説します。部分障害、セッション不整合、ボタン無反応、真っ白画面の切り分け方をまとめています。",
  alternates: { canonical: "/troubleshooting/signed-in-but-site-not-working" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="ログイン後だけサイトが使えない原因と対処法"
      updatedAt="2026-04-13"
      lead={[
        "ログイン自体は成功するのに、会員ページ、設定画面、購入画面、投稿画面だけ使えないことがあります。これはサイト全体が落ちているというより、ログイン後の機能だけが壊れている部分障害で起きやすい見え方です。",
        "重要なのは『ログインできない』のではなく『ログイン後だけ壊れる』と分けて見ることです。認証そのものより、セッション維持、会員API、アカウント画面用のスクリプト、特定導線だけの不具合が候補になります。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "ログイン前は正常でログイン後だけ壊れるなら、全体障害より会員機能の部分障害を優先して疑う",
            "ログイン後にボタンが効かないなら、会員画面用の JavaScript や画面干渉に近い",
            "ログイン後に真っ白になるなら、会員ページ側の描画失敗や API 不整合が候補になる",
            "別ブラウザでは使えるなら、元のブラウザの Cookie や保存セッションの影響が強い",
            "特定サービスだけで起きるなら、そのサービス側の会員機能障害も見たほうが早い",
          ],
        },
        {
          type: "div",
          title: "症状から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                ログイン自体が通らない、サインインで止まる →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-login-fails"
                  className="underline hover:no-underline"
                >
                  サイトは開くのにログインできない原因
                </Link>
              </p>
              <p>
                ログイン後のボタンやメニューだけ動かない →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-buttons-do-not-work"
                  className="underline hover:no-underline"
                >
                  サイトは開くのにボタンが反応しない原因
                </Link>
              </p>
              <p>
                ログイン後の画面だけ真っ白になる →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-is-blank"
                  className="underline hover:no-underline"
                >
                  サイトは開くのに真っ白になる原因
                </Link>
              </p>
              <p>
                特定サービスの会員ページだけ使えない →{" "}
                <Link href="/services" className="underline hover:no-underline">
                  サービス別トラブルページ
                </Link>
              </p>
              <p>
                一つのサイトだけ会員機能が壊れている →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
                </Link>
              </p>
              <p>
                まずブラウザ側の影響か整理したい →{" "}
                <Link
                  href="/troubleshooting/browser-not-loading-sites"
                  className="underline hover:no-underline"
                >
                  ブラウザエラーの切り分けハブ
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "list",
          title: "よくある見え方",
          items: [
            "ログイン成功後に会員ページだけ動かない",
            "トップは開くが設定変更や購入だけ進まない",
            "ログイン後に真っ白になる",
            "プロフィール画面だけ保存できない",
            "スマホアプリでは使えるのにブラウザ版の会員画面だけ壊れる",
            "特定のメニューや導線だけ反応しない",
          ],
        },
        {
          type: "p",
          title: "ログイン成功とログイン後の動作は別の問題",
          body: [
            "サインインが通ったことと、その後の会員ページや設定画面が正常に動くことは別です。認証だけ成功しても、その先で使う会員API、保存処理、在庫確認、支払い導線、プロフィール取得が壊れていれば『ログインはできるのに使えない』見え方になります。",
            <>
              サインイン自体で止まるなら{" "}
              <Link
                href="/troubleshooting/site-opens-but-login-fails"
                className="underline hover:no-underline"
              >
                ログイン失敗ページ
              </Link>
              のほうが近く、ログイン後だけ壊れるならこのページの切り分けが合っています。
            </>,
          ],
        },
        {
          type: "p",
          title: "会員画面だけ壊れるなら部分障害を疑う",
          body: [
            "トップページや公開ページは問題ないのに、マイページ、注文履歴、設定、投稿、購入確認だけ失敗するなら、サイト全体ダウンより機能単位の部分障害に近いです。会員機能は公開ページとは別の API やスクリプトに依存していることが多く、この差で症状が分かれます。",
            <>
              一つのサービスだけなら{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別トラブルページ
              </Link>
              や{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定サイトの切り分け
              </Link>
              が近い案内です。
            </>,
          ],
        },
        {
          type: "p",
          title: "ボタン無反応か真っ白かで次の分岐が変わる",
          body: [
            "ログイン後に『押しても何も起きない』なら、会員画面の JavaScript や画面側の干渉を疑いやすくなります。一方で『開くが真っ白になる』『途中まで見えるが止まる』なら、描画失敗や会員ページ用データ取得の失敗に近づきます。",
            <>
              無反応なら{" "}
              <Link
                href="/troubleshooting/site-opens-but-buttons-do-not-work"
                className="underline hover:no-underline"
              >
                ボタンが反応しないケース
              </Link>
              、真っ白なら{" "}
              <Link
                href="/troubleshooting/site-opens-but-is-blank"
                className="underline hover:no-underline"
              >
                真っ白になるケース
              </Link>
              が近いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "別ブラウザで使えるなら Cookie や保存セッションを優先する",
          body: [
            "同じアカウントでも別ブラウザやシークレットモードでは会員画面が正常なら、サイト全体より元のブラウザの Cookie、保存セッション、拡張機能、翻訳やセキュリティ機能の干渉を優先して見たほうが早いです。ログイン後だけ壊れる症状は、保存状態のずれで起きやすいです。",
            <>
              ブラウザ起点で整理したいなら{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラーの切り分けハブ
              </Link>
              から進むのが実用的です。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "1) ログイン前は正常で、ログイン後のどの画面から壊れるかを分ける",
            "2) 無反応か、真っ白か、読み込み停止かを見分ける",
            "3) 別ブラウザやシークレットモードで同じアカウントを試す",
            "4) スマホと PC で会員画面の挙動が変わるか比べる",
            "5) 特定サービスならサービス別ページや障害情報を確認する",
            "6) 症状の型が決まったら専用ページへ移る",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "『ログインできるのに使えない』は、認証成功後の世界だけが壊れているサインです。ログイン前後で症状が切り替わるなら、全体障害より会員機能側の失敗として見ると整理しやすくなります。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "ログイン後だけサイトが使えないときは、認証失敗より会員機能の部分障害、会員画面用スクリプト、保存セッション不整合を優先して見るほうが早いです。どの会員画面で、どう壊れるかを分けると次に見るべきページがはっきりします。",
            <>
              必要に応じて{" "}
              <Link
                href="/troubleshooting/site-opens-but-login-fails"
                className="underline hover:no-underline"
              >
                ログイン失敗
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-opens-but-buttons-do-not-work"
                className="underline hover:no-underline"
              >
                ボタン無反応
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-opens-but-is-blank"
                className="underline hover:no-underline"
              >
                真っ白
              </Link>
              、{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別ページ
              </Link>
              へ進むのが実用的です。
            </>,
          ],
        },
      ]}
    />
  );
}
