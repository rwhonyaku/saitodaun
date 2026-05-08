import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "サイトが勝手に再読み込みされ続ける原因と対処法",
  description:
    "サイトが何度も再読み込みされる、同じ画面に戻る、ログイン後にループするときの原因と対処法を解説します。リダイレクトループ、ログイン状態不整合、ブラウザ保存データ、部分障害の切り分け方をまとめています。",
  alternates: { canonical: "/troubleshooting/website-keeps-reloading" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="サイトが勝手に再読み込みされ続ける原因と対処法"
      updatedAt="2026-04-13"
      lead={[
        "サイトを開くたびに何度も読み直される、同じページに戻される、ログイン後に別画面へ進まず再表示されるときは、単純な読み込み遅延ではなくループ系の不具合が起きていることがあります。",
        "重要なのは『読み込みが遅い』のか『同じ処理を繰り返している』のかを分けることです。再読み込みループは、リダイレクト設定、ログイン状態、Cookie 不整合、ブラウザ拡張、特定ページだけの部分障害で起きやすい症状です。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "画面が切り替わり続けるなら、単純な重さよりリダイレクトループを優先して疑う",
            "ログイン後だけ再読み込みされるなら、認証状態や戻り先処理の不整合に近い",
            "シークレットモードだと止まるなら、Cookie や保存済みログイン状態の影響が強い",
            "別ブラウザでは正常なら、元のブラウザの拡張機能や保存データを優先して見る",
            "特定サイトだけで起きるなら、サイト側の部分障害や設定ループの可能性が高い",
          ],
        },
        {
          type: "div",
          title: "症状から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                エラーメッセージでリダイレクトが多すぎると出る →{" "}
                <Link
                  href="/errors/err-too-many-redirects"
                  className="underline hover:no-underline"
                >
                  ERR_TOO_MANY_REDIRECTS
                </Link>
              </p>
              <p>
                ログイン後だけ同じ画面に戻される →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-login-fails"
                  className="underline hover:no-underline"
                >
                  サイトは開くのにログインできない原因
                </Link>
              </p>
              <p>
                読み込み中表示のまま終わらず何度もやり直すように見える →{" "}
                <Link
                  href="/troubleshooting/site-loads-forever"
                  className="underline hover:no-underline"
                >
                  サイトが読み込み中のまま終わらない原因
                </Link>
              </p>
              <p>
                特定サイトだけ繰り返し再読み込みされる →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
                </Link>
              </p>
              <p>
                まずブラウザ側の問題か切り分けたい →{" "}
                <Link
                  href="/troubleshooting/browser-not-loading-sites"
                  className="underline hover:no-underline"
                >
                  ブラウザエラーの切り分けハブ
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
          title: "よくある見え方",
          items: [
            "ページが開いた直後に何度も更新される",
            "ログインすると同じログイン画面に戻る",
            "一瞬別URLへ移動してすぐ元に戻る",
            "スマホアプリでは使えるのにブラウザだけ再読み込みされる",
            "トップは見えるが設定画面や会員画面だけループする",
            "特定回線や VPN 利用時だけ同じ症状が出る",
          ],
        },
        {
          type: "p",
          title: "単なる『重い』のではなく同じ処理を繰り返していることがある",
          body: [
            "サイトが遅いだけなら待てば進むことがありますが、再読み込みループは同じ画面遷移や認証処理を繰り返している状態です。見た目は読み込み中でも、実際には正常な完了地点へ進めていないことがあります。",
            <>
              エラーとして止まるなら{" "}
              <Link
                href="/errors/err-too-many-redirects"
                className="underline hover:no-underline"
              >
                ERR_TOO_MANY_REDIRECTS
              </Link>
              、単に止まらず待ち続ける見え方なら{" "}
              <Link
                href="/troubleshooting/site-loads-forever"
                className="underline hover:no-underline"
              >
                読み込み中のまま終わらないケース
              </Link>
              が近いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "ログイン後だけ再読み込みされるなら認証や Cookie の不整合を疑う",
          body: [
            "トップやログイン画面は見えるのに、サインイン後だけ同じ画面へ戻る、会員ページへ入れない、認証後に再読込を繰り返すなら、セッション保存や Cookie の不整合、認証後の戻り先設定、ログイン状態判定のずれが候補になります。",
            <>
              その見え方なら{" "}
              <Link
                href="/troubleshooting/site-opens-but-login-fails"
                className="underline hover:no-underline"
              >
                サイトは開くのにログインできない原因
              </Link>
              が最も近い案内です。
            </>,
          ],
        },
        {
          type: "p",
          title: "別ブラウザで止まるならローカル環境の影響が強い",
          body: [
            "同じURLでも別ブラウザやシークレットモードでは正常なら、サイト全体の障害より元のブラウザの保存データ、古い Cookie、拡張機能、翻訳やセキュリティ機能の干渉を優先して見るほうが早いです。再読み込み系はこの影響で悪化しやすい症状です。",
            <>
              まずブラウザ起点で整理したいなら{" "}
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
          type: "p",
          title: "特定サイトだけ繰り返すなら部分障害や設定ループに近い",
          body: [
            "どのサイトでも起きるわけではなく、あるサービスや特定ページだけ再読み込みされるなら、サイト側の部分障害、会員導線だけの不具合、または URL 正規化や認証処理の設定ループが疑われます。特定ページだけ壊れているときは『開くけれど使えない』系の部分障害として見たほうが整理しやすいです。",
            <>
              一つのサービスだけなら{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定サイトの切り分け
              </Link>
              や{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別トラブルページ
              </Link>
              が近いです。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "1) 再読み込みが全ページか、ログイン後や特定ページだけかを分ける",
            "2) シークレットモードや別ブラウザで同じURLを試す",
            "3) エラー表示が出るならリダイレクト系エラー名を確認する",
            "4) スマホと PC、Wi-Fi と別回線で結果が変わるか比べる",
            "5) 特定サービスだけならそのサービスの障害ページも確認する",
            "6) 症状が絞れたら、ログイン系かブラウザ系かリダイレクト系の専用ページに移る",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "再読み込みが続くときは、『遅い』ではなく『戻されている』『同じ処理を繰り返している』かを見ると進めやすくなります。特にログイン後だけ起きるかどうかで、次に疑う場所がかなり変わります。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "サイトが勝手に再読み込みされ続けるときは、単純な表示遅延よりリダイレクトループ、ログイン状態の不整合、ブラウザ保存データ、特定ページだけの部分障害を優先して見るほうが早いです。どの場面で繰り返すかを分けると、次に見るべきページがはっきりします。",
            <>
              まず症状の型を分けて、必要に応じて{" "}
              <Link
                href="/errors/err-too-many-redirects"
                className="underline hover:no-underline"
              >
                リダイレクトループ
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
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザ起点の切り分け
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
