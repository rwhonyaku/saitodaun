import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "ログインできないときの確認ハブ",
  description:
    "Can't log in ときの確認ハブです。401、403、429、確認ループ、ブラウザ差、回線差、特定サービスだけのログイン不調など、次に見るべき既存ページへ案内します。",
  alternates: { canonical: "/troubleshooting/cant-log-in" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="ログインできないときの確認ハブ"
      updatedAt="2026-04-12"
      lead={[
        "『ログインできない』『サインインできない』『認証だけ通らない』という症状は、単純なパスワード違いだけではありません。未認証、セッション切れ、アクセス制限、回数制限、確認ループ、ブラウザ保存データ、特定サービス側の部分障害などで似た見え方になります。",
        "このページは、ログイン失敗の症状を最短で確認するためのミニハブです。エラーコードがあるか、確認ループか、ブラウザ差や回線差があるか、特定サービスだけかを分けて、必要な既存ページへ進んでください。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "401 が見えているなら、まず未認証やセッション切れを優先して疑う",
            "403 が見えているなら、認証失敗よりアクセス条件や制限に近い",
            "429 や待機表示があるなら、短時間の再試行や共有 IP による回数制限を疑う",
            "確認や CAPTCHA が終わらないなら、Cookie、JavaScript、IP 評価、VPN の影響が強い",
            "特定サービスだけなら、そのサービス側の認証部分障害も候補になる",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                ログイン画面は開くが送信後に進めない →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-login-fails"
                  className="underline hover:no-underline"
                >
                  サイトは開くのにログインできない原因
                </Link>
              </p>
              <p>
                401 Unauthorized が出る →{" "}
                <Link
                  href="/errors/401-unauthorized"
                  className="underline hover:no-underline"
                >
                  401 Unauthorized の意味と原因
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
                確認や CAPTCHA が終わらない →{" "}
                <Link
                  href="/troubleshooting/captcha-or-verification-loop"
                  className="underline hover:no-underline"
                >
                  CAPTCHAや本人確認がループするときの原因
                </Link>
              </p>
              <p>
                アプリでは入れるのにブラウザでだけ入れない →{" "}
                <Link
                  href="/troubleshooting/browser-not-loading-sites"
                  className="underline hover:no-underline"
                >
                  ブラウザエラーの確認ハブ
                </Link>
              </p>
              <p>
                特定のサービスだけログインできない →{" "}
                <Link
                  href="/services"
                  className="underline hover:no-underline"
                >
                  サービス別トラブルページ
                </Link>
              </p>
              <p>
                アプリやサービス全体の選択的失敗として見たい →{" "}
                <Link
                  href="/troubleshooting/app-not-working"
                  className="underline hover:no-underline"
                >
                  アプリが使えないときの確認ハブ
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "list",
          title: "このハブが扱う主な症状",
          items: [
            "ログイン画面は出るがサインインだけ通らない",
            "認証後に同じ画面へ戻される",
            "ログインのたびに確認や認証をやり直しになる",
            "アプリ版では入れるがブラウザ版で入れない",
            "会社や学校の回線だとだけログインできない",
            "特定サービスだけ急にサインインできなくなった",
          ],
        },
        {
          type: "p",
          title: "ログイン失敗は『認証不足』と『拒否』と『制限』を分けると早い",
          body: [
            "同じ『ログインできない』でも、まだ認証できていないのか、認証しても拒否されているのか、何度も試して制限に入っているのかで次に見る場所が変わります。ここを分けないと、同じ操作を繰り返して逆に状況を悪化させやすくなります。",
            <>
              そのため、まず{" "}
              <Link
                href="/errors/401-unauthorized"
                className="underline hover:no-underline"
              >
                401
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
              </Link>{" "}
              のどれに近いかを最初に見るのが実用的です。
            </>,
          ],
        },
        {
          type: "p",
          title: "エラーコードがなくても確認ループやブラウザ差が大きな手がかりになる",
          body: [
            "コードが出ていなくても、ログインのたびに本人確認へ戻る、ブラウザを変えると入れる、アプリ版では通る、といった差があれば原因はかなり絞れます。これはアカウント情報そのものより、Cookie、セッション、保存データ、JavaScript、IP 評価の問題で起きやすい見え方です。",
            <>
              その場合は{" "}
              <Link
                href="/troubleshooting/captcha-or-verification-loop"
                className="underline hover:no-underline"
              >
                確認ループ
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラー
              </Link>{" "}
              のページが近いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "回線差があるならログイン画面より接続条件を疑う",
          body: [
            "自宅ではログインできるが会社や学校ではできない、VPN を切ると入れる、共有 Wi-Fi だとだけ失敗するなら、認証フォーム自体ではなく接続元条件で止められている可能性があります。ログイン系は特に IP 評価や企業ネットワーク制限の影響を受けやすいです。",
            <>
              この方向では{" "}
              <Link
                href="/troubleshooting/site-blocked-by-firewall"
                className="underline hover:no-underline"
              >
                ファイアウォールや制限
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/access-denied"
                className="underline hover:no-underline"
              >
                アクセス拒否の確認
              </Link>{" "}
              が近い確認先です。
            </>,
          ],
        },
        {
          type: "p",
          title: "特定サービスだけなら認証部分障害も候補になる",
          body: [
            "1つのサービスだけで急にログインできなくなったなら、アカウント個別問題だけでなく、そのサービス側のログイン基盤、SSO、セッション保存、Bot 対策、二段階認証まわりの部分障害が混ざって見えていることがあります。トップページは正常でもログインだけ失敗することは珍しくありません。",
            <>
              サービスがはっきりしている場合は{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別ページ
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/site-opens-but-login-fails"
                className="underline hover:no-underline"
              >
                ログイン失敗ページ
              </Link>{" "}
              へ進むのが実用的です。
            </>,
          ],
        },
        {
          type: "list",
          title: "このハブ配下として見なせる既存ページ",
          items: [
            "/troubleshooting/site-opens-but-login-fails",
            "/errors/401-unauthorized",
            "/errors/403-forbidden",
            "/errors/429-too-many-requests",
            "/troubleshooting/captcha-or-verification-loop",
            "/troubleshooting/browser-not-loading-sites",
            "/troubleshooting/access-denied",
            "/troubleshooting/app-not-working",
            "/services",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "ログインできないときは、コードがあるか、確認ループなのか、ブラウザ差があるか、回線差があるか、特定サービスだけかで分けると、次に見るべきページがかなり明確になります。",
          ],
        },
      ]}
    />
  );
}
