import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";
import SurfsharkAffiliateBlock from "@/components/SurfsharkAffiliateBlock";

export const metadata: Metadata = {
  title: "サイトがブロックされているときの切り分けハブ",
  description:
    "サイトがブロックされた、アクセスを拒否された、確認ループになるときの切り分けハブです。403、429、ファイアウォール、公共 Wi-Fi の制限、特定サイトだけの不調など、症状ごとに次に見るべきページへ案内します。",
  alternates: { canonical: "/troubleshooting/website-blocked" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="サイトがブロックされているときの切り分けハブ"
      updatedAt="2026-04-12"
      lead={[
        "『サイト自体はありそうなのに入れない』『アクセス拒否や確認画面ばかり出る』『会社や学校の回線だとだけ開かない』という症状は、単純な接続断ではなく、制限や判定に引っかかっているケースが多いです。",
        "このページは、ブロック、制限、認証ループ系の症状を最短で切り分けるためのミニハブです。まず何に止められているのかを分けて、必要な深掘りページへ進んでください。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "会社や学校の回線だけで開かないなら、ネットワーク制限やファイアウォールを優先して疑う",
            "403 が出るなら、未認証よりアクセス拒否やポリシー制限に近い",
            "429 やしばらく待って再試行の表示なら、レート制限や Bot 判定に近い",
            "CAPTCHA や本人確認が終わらないなら、Cookie、JavaScript、IP 評価、VPN の影響を疑いやすい",
            "公共 Wi-Fi でだけ変な画面になるなら、ログイン前の captive portal やフィルタリングの可能性がある",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                会社・学校・職場の回線でだけ開かない →{" "}
                <Link
                  href="/troubleshooting/site-blocked-by-firewall"
                  className="underline hover:no-underline"
                >
                  ファイアウォールや制限でサイトが開かない原因
                </Link>
              </p>
              <p>
                403 Forbidden が出る →{" "}
                <Link
                  href="/errors/403-forbidden"
                  className="underline hover:no-underline"
                >
                  403 Forbidden の意味と原因
                </Link>
              </p>
              <p>
                429 Too Many Requests や待機表示が出る →{" "}
                <Link
                  href="/errors/429-too-many-requests"
                  className="underline hover:no-underline"
                >
                  429 Too Many Requests の意味と原因
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
                公共 Wi-Fi でログイン画面が出ず進めない →{" "}
                <Link
                  href="/troubleshooting/public-wifi-login-page-not-showing"
                  className="underline hover:no-underline"
                >
                  公共Wi-Fiでログイン画面が出ない原因
                </Link>
              </p>
              <p>
                1つのサイトだけ blocked っぽい →{" "}
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
            "アクセス拒否、ブロック、利用できませんと表示される",
            "確認や認証が何度も求められて先に進めない",
            "会社や学校の回線だけ特定サイトに入れない",
            "公共 Wi-Fi でログイン前の制限に引っかかる",
            "短時間の再試行で 429 や制限表示になる",
            "特定サイトだけ危険判定やアクセス制御に見える挙動をする",
          ],
        },
        {
          type: "p",
          title: "『サイトが落ちている』のではなく『入る前で止められている』ケース",
          body: [
            "ブロック系の症状は、サーバー停止や DNS 不達とは少し違います。ページ本体に届く前の段階で、ネットワーク制限、Bot 判定、レート制限、認証条件に止められていることがあります。",
            <>
              完全な接続断よりも、{" "}
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
                href="/troubleshooting/captcha-or-verification-loop"
                className="underline hover:no-underline"
              >
                確認ループ
              </Link>{" "}
              に近い挙動なら、この系統で見るほうが早いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "回線差があるなら制限系の手がかりが強い",
          body: [
            "Wi-Fi では入れないのにモバイル回線では入れる、会社ではだめだが自宅では開く、VPN を切ると通る、といった差があるなら、サイト自体の停止より環境依存の制限にかなり寄ります。",
            <>
              この分岐では{" "}
              <Link
                href="/troubleshooting/site-blocked-by-firewall"
                className="underline hover:no-underline"
              >
                ファイアウォールや回線制限
              </Link>{" "}
              と{" "}
              <Link
                href="/troubleshooting/public-wifi-login-page-not-showing"
                className="underline hover:no-underline"
              >
                公共 Wi-Fi のログイン制御
              </Link>{" "}
              が近い確認先です。
            </>,
            <>
              地域制限やネットワーク制限が疑わしいときは{" "}
              <Link href="/vpn" className="underline hover:no-underline">
                VPNガイド
              </Link>{" "}
              を補助的に見ると整理しやすくなります。VPN は制限の切り分けには役立ちますが、実際の障害を直すものではありません。
            </>,
            <SurfsharkAffiliateBlock key="surfshark-block" />,
          ],
        },
        {
          type: "p",
          title: "403、429、確認ループは似て見えて原因が違う",
          body: [
            "同じ『拒否された』ような体験でも、403 は方針上の拒否や権限不足、429 は短時間アクセス過多、確認ループは Cookie やスクリプトや IP 評価の不整合が中心です。ここを分けるだけで次の対応がかなり変わります。",
            <>
              エラー表示が出ているなら{" "}
              <Link
                href="/errors/403-forbidden"
                className="underline hover:no-underline"
              >
                403
              </Link>{" "}
              か{" "}
              <Link
                href="/errors/429-too-many-requests"
                className="underline hover:no-underline"
              >
                429
              </Link>
              、画面遷移だけ繰り返すなら{" "}
              <Link
                href="/troubleshooting/captcha-or-verification-loop"
                className="underline hover:no-underline"
              >
                確認ループ
              </Link>{" "}
              のほうが近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "特定サイトだけ blocked っぽいならサービス側との切り分けも必要",
          body: [
            "1つのサイトやサービスだけで起きているなら、単なる制限だけでなく、そのサービス側の地域制限、Bot 対策、部分障害、ログイン基盤の不調が混ざって見えていることもあります。",
            <>
              その場合は{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定サイトだけ開かない原因
              </Link>{" "}
              や{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別ページ
              </Link>{" "}
              に進むほうが実用的です。
            </>,
          ],
        },
        {
          type: "list",
          title: "このハブ配下として見なせる既存ページ",
          items: [
            "/troubleshooting/site-blocked-by-firewall",
            "/troubleshooting/captcha-or-verification-loop",
            "/errors/403-forbidden",
            "/errors/429-too-many-requests",
            "/troubleshooting/public-wifi-login-page-not-showing",
            "/troubleshooting/specific-site-not-working",
            "/services",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "blocked と感じても、実際には制限の種類が違います。回線差があるか、エラーコードが出ているか、確認ループなのか、特定サイトだけなのかで分けると、次に見るべきページがはっきりします。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "サイトがブロックされているように見えるときは、ファイアウォール、403、429、確認ループ、公共 Wi-Fi 制御、特定サービス側の制限が主な分かれ道です。まずどの止まり方かを分けることが最短です。",
            <>
              回線依存なら{" "}
              <Link
                href="/troubleshooting/site-blocked-by-firewall"
                className="underline hover:no-underline"
              >
                ファイアウォールや制限
              </Link>
              、コード表示なら{" "}
              <Link
                href="/errors/403-forbidden"
                className="underline hover:no-underline"
              >
                403
              </Link>{" "}
              または{" "}
              <Link
                href="/errors/429-too-many-requests"
                className="underline hover:no-underline"
              >
                429
              </Link>
              、確認が終わらないなら{" "}
              <Link
                href="/troubleshooting/captcha-or-verification-loop"
                className="underline hover:no-underline"
              >
                確認ループ
              </Link>{" "}
              へ進むのが実用的です。
            </>,
          ],
        },
      ]}
    />
  );
}
