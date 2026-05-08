import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "サイトが何度もログアウトされる原因と対処法",
  description:
    "サイトに何度もログアウトされる、ログイン状態が維持されないときの原因と対処法を解説します。Cookie不整合、セッション切れ、ブラウザ保存データ、リダイレクトループ、会員機能の部分障害を切り分けます。",
  alternates: { canonical: "/troubleshooting/website-keeps-logging-me-out" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="サイトが何度もログアウトされる原因と対処法"
      updatedAt="2026-04-13"
      lead={[
        "ログインしたはずなのにすぐログアウトされる、会員ページを開くたびにサインイン画面へ戻る、ログイン状態が維持されないことがあります。これは単なるパスワード問題というより、Cookie、セッション保存、ブラウザ状態、リダイレクト処理のどこかで認証状態を保持できていないときに起きやすい症状です。",
        "重要なのは『ログインできない』のか『ログインは通るが状態を保てない』のかを分けることです。後者なら、認証自体より保存セッションやログイン後の遷移処理を優先して見るほうが早くなります。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "シークレットモードでは維持されるなら、Cookie や保存データの不整合を優先して疑う",
            "ログイン後すぐ同じ画面に戻るなら、リダイレクトループや戻り先処理も候補になる",
            "別ブラウザでだけ維持されるなら、元のブラウザ拡張や保存セッションの影響が強い",
            "特定サービスだけ何度も切れるなら、そのサービス側の認証部分障害も見る",
            "ログイン自体が通らないなら、この症状より login failure ページのほうが近い",
          ],
        },
        {
          type: "div",
          title: "症状から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                ログイン送信の時点で通らない →{" "}
                <Link
                  href="/troubleshooting/cant-log-in"
                  className="underline hover:no-underline"
                >
                  ログインできないときの切り分けハブ
                </Link>
              </p>
              <p>
                ログイン後に会員画面だけ壊れる →{" "}
                <Link
                  href="/troubleshooting/signed-in-but-site-not-working"
                  className="underline hover:no-underline"
                >
                  ログイン後だけサイトが使えない原因
                </Link>
              </p>
              <p>
                ログイン後に同じ画面へ戻され続ける →{" "}
                <Link
                  href="/errors/err-too-many-redirects"
                  className="underline hover:no-underline"
                >
                  ERR_TOO_MANY_REDIRECTS
                </Link>
              </p>
              <p>
                ブラウザ版だけログイン状態が続かない →{" "}
                <Link
                  href="/troubleshooting/browser-not-loading-sites"
                  className="underline hover:no-underline"
                >
                  ブラウザエラーの切り分けハブ
                </Link>
              </p>
              <p>
                特定サービスだけ何度もログアウトされる →{" "}
                <Link href="/services" className="underline hover:no-underline">
                  サービス別トラブルページ
                </Link>
              </p>
              <p>
                一つのサイトだけログイン維持が壊れている →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-login-fails"
                  className="underline hover:no-underline"
                >
                  サイトは開くのにログインできない原因
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "list",
          title: "よくある見え方",
          items: [
            "ログイン成功後すぐにまたサインイン画面へ戻る",
            "ページを移動するたびにログアウト扱いになる",
            "マイページだけ開くと未ログインに戻る",
            "スマホアプリでは続くのにブラウザ版だけ切れる",
            "ブラウザを閉じていないのにすぐセッションが切れる",
            "特定サービスだけ何度も再認証を求められる",
          ],
        },
        {
          type: "p",
          title: "認証成功とログイン状態の維持は別の問題",
          body: [
            "サインインが成功することと、その後のログイン状態を維持できることは別です。認証自体は通っても、その結果を保持する Cookie やセッション保存が壊れていれば、次の画面で未ログイン扱いに戻されます。",
            <>
              ログインの入口自体で止まるなら{" "}
              <Link
                href="/troubleshooting/cant-log-in"
                className="underline hover:no-underline"
              >
                ログインできないときの切り分け
              </Link>
              のほうが近く、このページは『通るけれど維持できない』ときに合っています。
            </>,
          ],
        },
        {
          type: "p",
          title: "Cookie や保存セッションの不整合で起きやすい",
          body: [
            "この症状は、古い Cookie、壊れた保存セッション、ブラウザ拡張、翻訳やセキュリティ機能の干渉で起きやすいです。同じアカウントでも別ブラウザでは維持できるなら、サイト全体より元のブラウザ状態を優先して見たほうが早いです。",
            <>
              ブラウザ起点で整理したいなら{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラーの切り分けハブ
              </Link>
              が近いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "戻され続けるならリダイレクトループに近いこともある",
          body: [
            "ログイン後に会員画面へ進まず同じ画面へ戻る、URL が切り替わり続ける、ログイン済みなのに未ログイン扱いを繰り返すなら、Cookie 不整合だけでなく戻り先や認証後遷移のループが起きていることもあります。見た目は『ログアウトされる』でも、実際にはリダイレクト処理が循環しているケースです。",
            <>
              その見え方なら{" "}
              <Link
                href="/errors/err-too-many-redirects"
                className="underline hover:no-underline"
              >
                ERR_TOO_MANY_REDIRECTS
              </Link>
              が近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "特定サービスだけなら認証基盤の部分障害も候補",
          body: [
            "一つのサービスだけ何度もログアウトされるなら、あなたの環境だけでなく、そのサービス側の認証基盤、セッション保存、会員API、SSO 連携部分だけが不安定になっている可能性もあります。トップは開くのに会員状態だけ維持できないときは、この種の部分障害もよくあります。",
            <>
              その場合は{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別トラブルページ
              </Link>
              や{" "}
              <Link
                href="/troubleshooting/signed-in-but-site-not-working"
                className="underline hover:no-underline"
              >
                ログイン後だけサイトが使えない原因
              </Link>
              が近い案内です。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "1) ログイン自体は成功しているのか、維持だけ失敗しているのかを分ける",
            "2) シークレットモードや別ブラウザでログイン状態が続くか試す",
            "3) ログイン後に同じ画面へ戻るか、別ページで切れるかを見分ける",
            "4) スマホと PC で同じアカウントの維持状況を比べる",
            "5) 特定サービスだけならサービス別ページや障害情報を確認する",
            "6) ループっぽいなら redirect 系ページへ移る",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "『何度もログアウトされる』ときは、認証失敗より保存失敗や戻り先ループとして見ると整理しやすくなります。ログイン後のどのタイミングで切れるかを見るだけで、原因の当たりがかなり絞れます。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "サイトが何度もログアウトされるときは、パスワード問題より Cookie、保存セッション、ブラウザ状態、ログイン後遷移のループ、サービス側の認証部分障害を優先して見るほうが早いです。『通らない』ではなく『維持できない』と分けると、次に見るべきページがはっきりします。",
            <>
              必要に応じて{" "}
              <Link
                href="/troubleshooting/cant-log-in"
                className="underline hover:no-underline"
              >
                ログインできない
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/signed-in-but-site-not-working"
                className="underline hover:no-underline"
              >
                ログイン後だけ壊れる
              </Link>
              、{" "}
              <Link
                href="/errors/err-too-many-redirects"
                className="underline hover:no-underline"
              >
                リダイレクトループ
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
