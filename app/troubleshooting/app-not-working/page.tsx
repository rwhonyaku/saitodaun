import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "アプリが使えないときの確認ハブ",
  description:
    "アプリや一部サービスだけ使えないときの確認ハブです。ログイン失敗、ボタンが効かない、確認ループ、ブラウザとの差、特定サービス障害など、症状ごとに次に見るべきページへ案内します。",
  alternates: { canonical: "/troubleshooting/app-not-working" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="アプリが使えないときの確認ハブ"
      updatedAt="2026-04-12"
      lead={[
        "『ネットは使えるのにアプリだけだめ』『サイトは開くのに一部操作だけできない』『ログインや認証だけ進まない』といった症状は、回線全体の障害というより、アプリ固有の不具合、サービス側の部分障害、認証まわり、ブラウザ差、制限環境で起きやすいです。",
        "このページは、アプリやサービスの選択的な失敗を振り分けるためのミニハブです。まず『何が使えないのか』を分けて、必要な深掘りページへ進んでください。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "ブラウザ版では使えるなら、アプリ固有の不具合や保存データを優先して疑う",
            "サイトでもアプリでも同じサービスがだめなら、サービス側の障害や部分障害に近い",
            "ログインだけ失敗するなら、認証やセッション問題を優先して見る",
            "ボタンや送信だけ動かないなら、UI や JavaScript 側の失敗も候補になる",
            "CAPTCHA や本人確認が終わらないなら、Bot 判定や制限条件を疑いやすい",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                インターネットは使えるのにアプリだけ開かない →{" "}
                <Link
                  href="/troubleshooting/internet-working-but-apps-not-loading"
                  className="underline hover:no-underline"
                >
                  インターネットは使えるのにアプリだけ開かない原因
                </Link>
              </p>
              <p>
                ログインだけ失敗する →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-login-fails"
                  className="underline hover:no-underline"
                >
                  サイトは開くのにログインできない原因
                </Link>
              </p>
              <p>
                ボタンや送信だけ反応しない →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-buttons-do-not-work"
                  className="underline hover:no-underline"
                >
                  サイトは開くのにボタンが反応しない原因
                </Link>
              </p>
              <p>
                CAPTCHA や本人確認が終わらない →{" "}
                <Link
                  href="/troubleshooting/captcha-or-verification-loop"
                  className="underline hover:no-underline"
                >
                  CAPTCHAや本人確認がループするときの原因
                </Link>
              </p>
              <p>
                ブラウザだけだめでアプリでは使える →{" "}
                <Link
                  href="/troubleshooting/browser-not-loading-sites"
                  className="underline hover:no-underline"
                >
                  ブラウザエラーの確認ハブ
                </Link>
              </p>
              <p>
                特定のサービスやサイトだけおかしい →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
                </Link>
              </p>
              <p>
                まずサービス側障害を見たい →{" "}
                <Link
                  href="/services"
                  className="underline hover:no-underline"
                >
                  サービス別トラブルページ
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "list",
          title: "このハブが扱う主な症状",
          items: [
            "アプリだけ開かない",
            "ログインだけ通らない",
            "送信、投稿、購入、更新だけ失敗する",
            "ボタンやメニューが効かない",
            "確認ループや認証ループになる",
            "同じサービスでもアプリ版とブラウザ版で結果が違う",
          ],
        },
        {
          type: "p",
          title: "『ネット全体がだめ』ではなく『一部だけだめ』を扱うハブ",
          body: [
            "このハブは、回線全体が落ちているケースではなく、アプリやサービスの一部だけが使えないケースを振り分けるためのものです。検索や他サイトは普通に使えるのに、特定アプリや特定操作だけ失敗するなら、この系統に近づきます。",
            <>
              ネット全体の不調を疑うなら{" "}
              <Link
                href="/troubleshooting/internet-not-working"
                className="underline hover:no-underline"
              >
                インターネットにつながらない原因
              </Link>{" "}
              のほうが近いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "ブラウザ版とアプリ版の差が強い手がかりになる",
          body: [
            "同じサービスでも、ブラウザ版は使えるのにアプリ版だけだめなら、サービス全体停止より、アプリ固有の保存データ、更新不整合、権限設定、バックグラウンド通信制限を疑いやすくなります。逆に両方だめならサービス側や認証基盤の不調に近づきます。",
            <>
              この分岐の入口としては{" "}
              <Link
                href="/troubleshooting/internet-working-but-apps-not-loading"
                className="underline hover:no-underline"
              >
                アプリだけ開かないケース
              </Link>{" "}
              と{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラーの確認
              </Link>{" "}
              が近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "ログイン・認証・UI操作は別々に見ると早い",
          body: [
            "アプリが使えないと感じても、実際にはログインだけ失敗している、認証ループだけ起きている、ボタンや送信だけ動かない、といった分かれ方をしていることが多いです。ここを分けるだけで、見るべきページがかなり明確になります。",
            <>
              ログインなら{" "}
              <Link
                href="/troubleshooting/site-opens-but-login-fails"
                className="underline hover:no-underline"
              >
                ログイン失敗
              </Link>
              、操作不能なら{" "}
              <Link
                href="/troubleshooting/site-opens-but-buttons-do-not-work"
                className="underline hover:no-underline"
              >
                ボタンが効かない
              </Link>
              、確認ループなら{" "}
              <Link
                href="/troubleshooting/captcha-or-verification-loop"
                className="underline hover:no-underline"
              >
                CAPTCHAループ
              </Link>{" "}
              のほうが近いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "サービス固有の障害と混同しやすい",
          body: [
            "SNS、EC、決済、生成 AI、メッセージ系のアプリでは、トップ画面は見えるのに投稿、送信、支払い、生成、通知だけ落ちることがあります。こうしたケースは『アプリが壊れた』より、サービス側の部分障害として起きることも多いです。",
            <>
              主要サービスなら{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別トラブルページ
              </Link>{" "}
              から入ると整理しやすくなります。
            </>,
          ],
        },
        {
          type: "list",
          title: "このハブ配下として見なせる既存ページ",
          items: [
            "/troubleshooting/internet-working-but-apps-not-loading",
            "/troubleshooting/site-opens-but-login-fails",
            "/troubleshooting/site-opens-but-buttons-do-not-work",
            "/troubleshooting/captcha-or-verification-loop",
            "/troubleshooting/browser-not-loading-sites",
            "/troubleshooting/specific-site-not-working",
            "/services",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "『アプリが使えない』は広い症状ですが、実際にはアプリ固有不具合、サービス側部分障害、認証失敗、操作失敗、制限環境に分かれます。ブラウザとの差、失敗する機能、特定サービスだけかどうかで分けると進めやすくなります。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "アプリが使えないときは、回線全体より、選択的な失敗の種類を先に分けるほうが早いです。アプリだけだめか、ログインだけだめか、操作だけだめか、サービス側障害かで次に行くべきページが変わります。",
            <>
              まずは{" "}
              <Link
                href="/troubleshooting/internet-working-but-apps-not-loading"
                className="underline hover:no-underline"
              >
                アプリだけ開かない
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
                href="/troubleshooting/site-opens-but-buttons-do-not-work"
                className="underline hover:no-underline"
              >
                操作失敗
              </Link>
              、{" "}
              <Link href="/services" className="underline hover:no-underline">
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
