import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "『Are you human?』が何度も出る原因と対処法",
  description:
    "『Are you human?』『私はロボットではありません』が何度も出て先に進めないときの原因と対処法を解説します。CAPTCHAループ、403、429、VPNや共有IP、ブラウザ不整合の切り分け方をまとめています。",
  alternates: { canonical: "/troubleshooting/website-keeps-asking-are-you-human" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="『Are you human?』が何度も出る原因と対処法"
      updatedAt="2026-04-13"
      lead={[
        "『Are you human?』『私はロボットではありません』が何度も表示されて先へ進めないことがあります。これはサイト全体が落ちているというより、Bot 判定、Cookie 保持、JavaScript、IP 評価、回数制限のどこかで通過判定が維持できていないときに起きやすい症状です。",
        "重要なのは、人間判定に落ちているのか、確認後の保存や遷移が壊れているのか、試行回数が増えて 429 側に寄っているのかを分けることです。見え方は似ていても次に疑う場所が変わります。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "シークレットモードで通るなら、Cookie や保存データ、拡張機能の影響が強い",
            "VPN や共有 Wi-Fi を切ると通るなら、IP 評価や制限条件に近い",
            "何度も試したあと悪化したなら、429 の回数制限も候補になる",
            "特定サービスだけで起きるなら、そのサービス側の認証基盤や部分障害も見る",
            "403 や待機表示が出るなら、単なる確認ループより該当エラーページを優先したほうが早い",
          ],
        },
        {
          type: "div",
          title: "症状から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                CAPTCHA や本人確認が終わらず同じ画面に戻る →{" "}
                <Link
                  href="/troubleshooting/captcha-or-verification-loop"
                  className="underline hover:no-underline"
                >
                  CAPTCHAや本人確認がループするときの原因
                </Link>
              </p>
              <p>
                403 が出て弾かれる →{" "}
                <Link
                  href="/errors/403-forbidden"
                  className="underline hover:no-underline"
                >
                  403 Forbidden
                </Link>
              </p>
              <p>
                試行を繰り返したあと待機や制限表示になる →{" "}
                <Link
                  href="/errors/429-too-many-requests"
                  className="underline hover:no-underline"
                >
                  429 Too Many Requests
                </Link>
              </p>
              <p>
                会社・学校・VPN 利用時だけ出る →{" "}
                <Link
                  href="/troubleshooting/site-blocked-by-firewall"
                  className="underline hover:no-underline"
                >
                  サイトがファイアウォールでブロックされる原因
                </Link>
              </p>
              <p>
                原因がまだ広く blocked 系かもしれない →{" "}
                <Link
                  href="/troubleshooting/website-blocked"
                  className="underline hover:no-underline"
                >
                  サイトがブロックされているときの切り分けハブ
                </Link>
              </p>
              <p>
                特定サイトやサービスだけで起きる →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
                </Link>
                {" / "}
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
            "『私はロボットではありません』を通してもまた同じ確認が出る",
            "『Are you human?』のあと先へ進まず同じページに戻る",
            "会社や学校の回線でだけ確認が何度も出る",
            "スマホアプリでは使えるのにブラウザだけ確認が続く",
            "何度も試したあと待機や制限表示に変わる",
            "一つのサービスだけ本人確認が終わらない",
          ],
        },
        {
          type: "p",
          title: "確認自体ではなく通過後の保存が壊れていることがある",
          body: [
            "人間確認を通したはずなのにまた同じ画面へ戻るときは、判定そのものより、その結果を保持する Cookie やセッションが維持できていないケースがあります。見た目は『認証に失敗している』でも、実際には確認後の保存や画面遷移が壊れていることがあります。",
            <>
              この見え方なら{" "}
              <Link
                href="/troubleshooting/captcha-or-verification-loop"
                className="underline hover:no-underline"
              >
                CAPTCHAや本人確認がループするケース
              </Link>
              が最も近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "VPN や共有 IP なら Bot 判定が厳しくなりやすい",
          body: [
            "VPN、ホテル Wi-Fi、会社や学校の共有回線、公共 Wi-Fi、共有モバイル回線では、他の利用者の影響も含めて IP 評価が厳しくなることがあります。この場合、正しく操作していても『Are you human?』が繰り返し表示されやすくなります。",
            <>
              回線条件が強く関係しそうなら{" "}
              <Link
                href="/troubleshooting/site-blocked-by-firewall"
                className="underline hover:no-underline"
              >
                制限系の切り分け
              </Link>
              や{" "}
              <Link
                href="/troubleshooting/website-blocked"
                className="underline hover:no-underline"
              >
                website blocked ハブ
              </Link>
              が近いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "何度も試すと 429 に寄ることがある",
          body: [
            "確認ループが続くと焦って何度も再試行しがちですが、それによって今度は回数制限に入ってしまい、さらに通りにくくなることがあります。最初は Cookie や JavaScript の問題でも、連続試行で 429 側に寄るケースがあります。",
            <>
              『少し待って再試行』や制限表示が見えるなら{" "}
              <Link
                href="/errors/429-too-many-requests"
                className="underline hover:no-underline"
              >
                429 Too Many Requests
              </Link>
              を優先して見たほうが早いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "特定サービスだけなら認証基盤の部分障害も候補",
          body: [
            "一つのサービスだけ『Are you human?』が終わらないなら、あなたの環境だけでなく、そのサービス側の認証基盤や Bot 対策部分だけが不安定になっている可能性もあります。トップは開くのに確認だけ通らないときは、この種の部分障害もよくあります。",
            <>
              その場合は{" "}
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
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "1) シークレットモードか別ブラウザで同じ確認を試す",
            "2) VPN、プロキシ、広告ブロック、保護機能を一時的に見直す",
            "3) Wi-Fi とモバイル回線で結果が変わるか確認する",
            "4) 403 や 429 の表示がないか確認する",
            "5) 特定サービスだけか、他サイトでも同様かを分ける",
            "6) 連続試行を止めて少し時間を置いてから再試行する",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "『Are you human?』が何度も出るときは、単なる bot 判定だけとは限りません。Cookie 保持、JavaScript 停止、IP 評価、回数制限のどれで悪化しているかを、ブラウザ差・回線差・エラー表示の有無で分けると進めやすくなります。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "『Are you human?』が何度も出て進めないときは、Cookie、JavaScript、共有 IP、VPN、回数制限、サービス側の認証部分障害を優先して切り分けるほうが早いです。見た目は同じでも、どこで判定が崩れているかで次に見るべきページが変わります。",
            <>
              必要に応じて{" "}
              <Link
                href="/troubleshooting/captcha-or-verification-loop"
                className="underline hover:no-underline"
              >
                確認ループ
              </Link>
              、{" "}
              <Link
                href="/errors/403-forbidden"
                className="underline hover:no-underline"
              >
                403
              </Link>
              、{" "}
              <Link
                href="/errors/429-too-many-requests"
                className="underline hover:no-underline"
              >
                429
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-blocked-by-firewall"
                className="underline hover:no-underline"
              >
                制限系ページ
              </Link>
              へ進むのが実用的です。
            </>,
          ],
        },
      ]}
    />
  );
}
