import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "フォーム送信ができない原因と対処法",
  description:
    "問い合わせフォーム、ログイン送信、購入確定、投稿送信が進まないときの原因と対処法を解説します。無反応、送信後に止まる、429制限、ブラウザ不整合、部分障害の切り分け方をまとめています。",
  alternates: { canonical: "/troubleshooting/form-submit-not-working" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="フォーム送信ができない原因と対処法"
      updatedAt="2026-04-13"
      lead={[
        "問い合わせフォーム、ログイン送信、購入確定、投稿ボタンなどで『送信だけ進まない』ことがあります。ページ自体は開いていても、送信処理に必要な JavaScript、API、認証、制限判定のどれかが止まるとこの見え方になります。",
        "重要なのは『押しても何も起きない』のか『押したあと止まる』のかを分けることです。前者はブラウザや画面側、後者は送信先 API や制限、部分障害に寄りやすくなります。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "押しても完全に無反応なら、JavaScript や画面上の干渉を優先して疑う",
            "送信後に読み込み中のまま止まるなら、API や部分障害に近い",
            "何度も試したあと弾かれるなら、429 の回数制限も候補になる",
            "ログインフォームだけ進まないなら、一般フォームより認証系ページを優先して見る",
            "別ブラウザでは通るなら、元のブラウザの保存データや拡張機能の影響が強い",
          ],
        },
        {
          type: "div",
          title: "症状から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                ボタン自体が反応しない、他の操作も押せない →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-buttons-do-not-work"
                  className="underline hover:no-underline"
                >
                  サイトは開くのにボタンが反応しない原因
                </Link>
              </p>
              <p>
                ログイン送信だけ進まない →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-login-fails"
                  className="underline hover:no-underline"
                >
                  サイトは開くのにログインできない原因
                </Link>
              </p>
              <p>
                試行を繰り返したあと送信できなくなった →{" "}
                <Link
                  href="/errors/429-too-many-requests"
                  className="underline hover:no-underline"
                >
                  429 Too Many Requests
                </Link>
              </p>
              <p>
                特定サービスのフォームだけ失敗する →{" "}
                <Link href="/services" className="underline hover:no-underline">
                  サービス別トラブルページ
                </Link>
              </p>
              <p>
                特定サイトだけ送信に失敗する →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
                </Link>
              </p>
              <p>
                まずブラウザ側の問題か見たい →{" "}
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
            "送信ボタンを押しても何も起きない",
            "押したあと読み込み中のまま止まる",
            "一瞬反応するが元の画面に戻る",
            "入力内容は合っているのに送信だけ進まない",
            "スマホでは送れるのに PC ブラウザだけ送れない",
            "何度も送信を試したあと急に弾かれる",
          ],
        },
        {
          type: "p",
          title: "無反応ならブラウザや画面側の問題に寄りやすい",
          body: [
            "送信ボタンを押しても読み込み表示すら出ないなら、送信先より前の段階で止まっている可能性が高いです。JavaScript が止まっている、透明な要素が重なってクリックを奪っている、ブラウザ拡張がフォーム動作を壊しているといったケースが候補になります。",
            <>
              この見え方なら{" "}
              <Link
                href="/troubleshooting/site-opens-but-buttons-do-not-work"
                className="underline hover:no-underline"
              >
                ボタンが反応しないケース
              </Link>
              や{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラーの切り分け
              </Link>
              が近いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "送信後に止まるなら API や部分障害を疑う",
          body: [
            "押した直後にローディングや送信中表示が出るのに完了しないなら、クリック自体は通っています。この場合は、問い合わせ送信 API、決済処理、投稿保存、在庫確認、認証後処理など、送信先の処理が詰まっている可能性が高くなります。",
            <>
              特定サービスだけで起きているなら{" "}
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
          title: "何度も試したあと送れないなら回数制限も見る",
          body: [
            "ログイン、問い合わせ、投稿、検索フォームなどでは、短時間に繰り返し送信すると一時的な回数制限に当たることがあります。見た目は『送信できない』でも、実際にはサイトが意図的に送信を抑えているケースです。",
            <>
              その場合は{" "}
              <Link
                href="/errors/429-too-many-requests"
                className="underline hover:no-underline"
              >
                429 Too Many Requests
              </Link>
              を見たほうが早いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "ログインフォームなら一般フォームより認証系ページが近い",
          body: [
            "送信できない対象がログインフォームなら、単なるフォーム不具合ではなく、Cookie、セッション、アクセス制限、認証後の戻り先処理が関係していることがあります。見た目は同じ『送信できない』でも、ログインだけは原因の層が少し違います。",
            <>
              その場合は{" "}
              <Link
                href="/troubleshooting/site-opens-but-login-fails"
                className="underline hover:no-underline"
              >
                ログインできないケース
              </Link>
              へ進んだほうが切り分けしやすくなります。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "1) 押して無反応か、押したあと止まるかを分ける",
            "2) 別ブラウザやシークレットモードで同じ送信を試す",
            "3) ログイン、問い合わせ、購入などどのフォームで起きるかを整理する",
            "4) 連続送信のあとなら回数制限の表示がないか確認する",
            "5) スマホと PC、Wi-Fi と別回線で結果が変わるか比べる",
            "6) 特定サービスだけならサービス別ページへ進む",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "フォーム送信系は、『押せていない』のか『押した先で失敗している』のかを見るだけでかなり整理できます。ログインフォームかどうか、連続試行の後かどうかも大きな分かれ目です。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "フォーム送信ができないときは、ボタン無反応、送信先停止、回数制限、認証系不具合のどれに近いかを最初に分けると進めやすくなります。見た目は同じでも、止まる場所で次に見るべきページはかなり変わります。",
            <>
              必要に応じて{" "}
              <Link
                href="/troubleshooting/site-opens-but-buttons-do-not-work"
                className="underline hover:no-underline"
              >
                ボタン無反応
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-opens-but-login-fails"
                className="underline hover:no-underline"
              >
                ログイン送信
              </Link>
              、{" "}
              <Link
                href="/errors/429-too-many-requests"
                className="underline hover:no-underline"
              >
                回数制限
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
