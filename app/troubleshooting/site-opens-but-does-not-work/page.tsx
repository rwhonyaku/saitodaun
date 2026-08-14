import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "サイトは開くのに動かない原因と対処法",
  description:
    "サイトは表示されるのに操作できない、途中から壊れる、ログイン後だけ使えないときの原因と対処法を解説します。部分障害、ブラウザ不整合、CDN配信不良、機能別の見分け方をまとめています。",
  alternates: { canonical: "/troubleshooting/site-opens-but-does-not-work" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="サイトは開くのに動かない原因と対処法"
      updatedAt="2026-04-12"
      lead={[
        "サイトのトップや画面自体は表示されるのに、押しても進まない、ログイン後だけ使えない、画像や一部機能だけ壊れているという状態は珍しくありません。これは完全に落ちているというより、サイトの一部だけが止まっているときに起きやすい症状です。",
        "重要なのは『開くかどうか』ではなく『どこまで正常に使えるか』を見ることです。表示だけの問題なのか、操作だけ止まるのか、特定ページだけ壊れるのかで、次に見るべき場所がかなり変わります。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "見た目は出るのに操作できないなら、サイト全体停止より部分障害やブラウザ側不整合を優先して疑う",
            "ログイン、購入、設定変更など特定の操作だけ止まるなら、機能単位の障害に近い",
            "別ブラウザでは使えるなら、元のブラウザの拡張機能や保存データの影響が強い",
            "Wi-Fi と別回線で結果が変わるなら、ローカル回線や経路条件も候補になる",
            "特定サービスだけ再現するなら、サービス側の障害や限定的な不具合も見たほうが早い",
          ],
        },
        {
          type: "div",
          title: "症状から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                ボタンやメニューを押しても反応しない →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-buttons-do-not-work"
                  className="underline hover:no-underline"
                >
                  サイトは開くのにボタンが反応しない原因
                </Link>
              </p>
              <p>
                ログイン画面は出るのにサインインだけ進まない →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-login-fails"
                  className="underline hover:no-underline"
                >
                  サイトは開くのにログインできない原因
                </Link>
              </p>
              <p>
                開いたあと画面が真っ白になる →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-is-blank"
                  className="underline hover:no-underline"
                >
                  サイトは開くのに真っ白になる原因
                </Link>
              </p>
              <p>
                本文は見えるのに画像だけ出ない →{" "}
                <Link
                  href="/troubleshooting/site-loads-without-images"
                  className="underline hover:no-underline"
                >
                  サイトは開くのに画像が表示されない原因
                </Link>
              </p>
              <p>
                開くがずっと読み込み中のまま終わらない →{" "}
                <Link
                  href="/troubleshooting/site-loads-forever"
                  className="underline hover:no-underline"
                >
                  サイトが読み込み中のまま終わらない原因
                </Link>
              </p>
              <p>
                特定サイトだけ同じ症状が出る →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
                </Link>
              </p>
              <p>
                まずブラウザ側かどうか見たい →{" "}
                <Link
                  href="/troubleshooting/browser-not-loading-sites"
                  className="underline hover:no-underline"
                >
                  ブラウザエラーの確認ハブ
                </Link>
              </p>
              <p>
                サービス障害か確認したい →{" "}
                <Link href="/services" className="underline hover:no-underline">
                  サービス別トラブルページ
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "list",
          title: "この症状で多い壊れ方",
          items: [
            "ページは見えるがボタン、タブ、メニューが動かない",
            "ログイン前は見えるが、ログイン後の画面だけ使えない",
            "本文は表示されるが画像や一部アセットだけ欠ける",
            "押したあと読み込み中のまま止まり、完了しない",
            "スマホでは使えるのに PC のいつものブラウザだけ壊れる",
            "トップページは正常だが、設定画面や購入画面だけ失敗する",
          ],
        },
        {
          type: "p",
          title: "『表示できる』と『使える』は別の問題",
          body: [
            "HTML や見た目だけなら表示できても、操作に必要な JavaScript、認証、API、画像配信、保存処理のどれかが壊れると、サイトは開くのに使えない状態になります。見えているから正常とは限らず、むしろ部分障害ではこの見え方のほうが多いです。",
            <>
              画面は出るのに何かが壊れているときは、まず{" "}
              <Link
                href="/troubleshooting/site-opens-but-buttons-do-not-work"
                className="underline hover:no-underline"
              >
                操作不能
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-opens-but-login-fails"
                className="underline hover:no-underline"
              >
                ログイン失敗
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-loads-without-images"
                className="underline hover:no-underline"
              >
                画像欠落
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-opens-but-is-blank"
                className="underline hover:no-underline"
              >
                真っ白
              </Link>
              のどれに近いかで分けると進めやすくなります。
            </>,
          ],
        },
        {
          type: "p",
          title: "特定の操作だけ止まるなら機能単位の障害を疑う",
          body: [
            "トップページや公開ページは普通に見えるのに、ログイン、検索、購入、保存、設定変更などの操作だけ止まるなら、サイト全体が落ちているより、その機能の裏側だけが不安定になっている可能性が高いです。こうしたケースは『開くけれど使えない』の典型です。",
            <>
              ログイン送信や認証周りなら{" "}
              <Link
                href="/troubleshooting/site-opens-but-login-fails"
                className="underline hover:no-underline"
              >
                ログインできないケース
              </Link>
              、特定サービスで起きているなら{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別トラブルページ
              </Link>
              が近い案内です。
            </>,
          ],
        },
        {
          type: "p",
          title: "別ブラウザで通るならローカル環境の影響が強い",
          body: [
            "同じURL、同じアカウントでも、別ブラウザやシークレットモードでは使えるなら、サイト側より元のブラウザの拡張機能、古いキャッシュ、保存済み Cookie、翻訳やセキュリティ系の干渉を優先して見たほうが早いです。『見えるけれど動かない』はこのタイプでもよく起きます。",
            <>
              まずブラウザ起点で整理したいなら{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラーの確認ハブ
              </Link>
              から進むのが実用的です。
            </>,
          ],
        },
        {
          type: "p",
          title: "ページ単位で壊れ方が違うなら部分障害に近い",
          body: [
            "トップは正常だが設定画面だけ真っ白、商品ページだけ画像が出ない、投稿画面だけ送信できないというように、特定ページや特定導線だけ壊れるなら、全体障害より部分障害の見え方に近いです。サイトや CDN、API の一部だけが不安定でもこうなります。",
            <>
              読み込み経路や配信条件が怪しいなら{" "}
              <Link
                href="/troubleshooting/cdn-or-server-edge-issues"
                className="underline hover:no-underline"
              >
                CDNやサーバー経路の問題
              </Link>
              、一つのサービスだけなら{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定サイトの確認
              </Link>
              が近いです。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "1) どの操作から壊れるかを言葉で分ける。押せないのか、押した先で止まるのかを確認する",
            "2) 別ブラウザやシークレットモードで同じ操作を試す",
            "3) スマホと PC、Wi-Fi と別回線で結果が変わるか比べる",
            "4) トップページだけでなく、ログイン後や設定画面など別ページでも再現するか見る",
            "5) 特定サービスだけならサービス別ページや障害情報も確認する",
            "6) 症状が絞れたら、その専用ページに移って深掘りする",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "『サイトは開くのに動かない』は広い症状ですが、実際には無反応、ログイン失敗、画像欠落、真っ白、読み込み停止のどれかに寄ることが多いです。最初に壊れ方の型を決めると、遠回りしにくくなります。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "サイトは開くのに動かないときは、完全停止より部分障害、ブラウザ環境の不整合、特定機能だけの失敗を優先して見るほうが早いです。表示と操作を分けて考えると、次に進むべきページが見えやすくなります。",
            <>
              まず症状の型を見分けて、必要に応じて{" "}
              <Link
                href="/troubleshooting/site-opens-but-buttons-do-not-work"
                className="underline hover:no-underline"
              >
                操作不能
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
                href="/troubleshooting/site-opens-but-is-blank"
                className="underline hover:no-underline"
              >
                真っ白
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-loads-without-images"
                className="underline hover:no-underline"
              >
                画像欠落
              </Link>
              、{" "}
              <Link
                href="/services"
                className="underline hover:no-underline"
              >
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
