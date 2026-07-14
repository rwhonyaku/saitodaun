import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "「アクセスが拒否されました」と出るときの確認",
  description:
    "Access denied と出るときの確認ページです。403、429、ファイアウォール、VPN や共有 IP の制限、確認ループ、特定サイトだけの制御など、次に見るべき既存ページへ案内します。",
  alternates: { canonical: "/troubleshooting/access-denied" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="「アクセスが拒否されました」と出るときの確認"
      updatedAt="2026-04-12"
      lead={[
        "『Access denied』『アクセスが拒否されました』『このページを表示する権限がありません』のような表示は、サイト全体の停止よりも、あなたの接続条件や権限条件が原因で止められているケースが多いです。回線、IP、地域、ログイン状態、Bot 判定、会社や学校の制限などで同じような見え方になります。",
        "このページは、拒否系メッセージを最短で確認するための橋渡しページです。コード表示があるか、回線差があるか、確認ループなのか、特定サイトだけなのかを分けて、必要な既存ページへ進んでください。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "403 が見えているなら、まず 403 の意味から確認する",
            "429 や待機表示があるなら、権限拒否より回数制限や Bot 判定に近い",
            "会社や学校の回線だけで起きるなら、ファイアウォールやネットワーク制限を優先して疑う",
            "VPN や共有 Wi-Fi を切ると通るなら、IP 評価や地域制限の可能性が高い",
            "特定サイトだけの症状なら、そのサービス側の制御や部分障害も候補になる",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
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
                会社・学校・職場の回線でだけ拒否される →{" "}
                <Link
                  href="/troubleshooting/site-blocked-by-firewall"
                  className="underline hover:no-underline"
                >
                  ファイアウォールや制限でサイトが開かない原因
                </Link>
              </p>
              <p>
                ブロックされているように見えるが原因がまだ広い →{" "}
                <Link
                  href="/troubleshooting/website-blocked"
                  className="underline hover:no-underline"
                >
                  サイトがブロックされているときの確認ハブ
                </Link>
              </p>
              <p>
                1つのサイトだけアクセス拒否っぽい →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
                </Link>
              </p>
              <p>
                まずサービス別の症状を見たい →{" "}
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
          type: "p",
          title: "Access denied は『落ちている』より『止められている』に近い",
          body: [
            "この表示は、サーバー停止や DNS 不達より、接続自体は届いているが条件に合わず拒否されているときに出やすいです。だから『サイトが落ちた』と考えるより、何の条件で止められているかを先に分けるほうが速くなります。",
            <>
              コードが見えているなら{" "}
              <Link
                href="/errors/403-forbidden"
                className="underline hover:no-underline"
              >
                403
              </Link>{" "}
              や{" "}
              <Link
                href="/errors/429-too-many-requests"
                className="underline hover:no-underline"
              >
                429
              </Link>{" "}
              に寄せて考えるのが近道です。
            </>,
          ],
        },
        {
          type: "p",
          title: "403、429、確認ループは似て見えて分岐が違う",
          body: [
            "同じアクセス拒否系でも、403 は方針上の拒否や権限不足、429 は短時間アクセス過多やレート制限、確認ループは Cookie や JavaScript や IP 評価の不整合が中心です。見た目が似ていても次に疑う場所はかなり違います。",
            <>
              画面にコードがあるなら{" "}
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
              、確認だけ繰り返すなら{" "}
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
          title: "回線差があるなら環境依存の制限を優先する",
          body: [
            "自宅では通るが会社では拒否される、モバイル回線では通るが Wi-Fi では拒否される、VPN を切ると入れる、という差があるなら、サイト全体障害より環境依存の制限にかなり寄ります。これはアクセス権というより、接続元条件で止められているパターンです。",
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
                href="/troubleshooting/website-blocked"
                className="underline hover:no-underline"
              >
                サイトがブロックされているときの確認
              </Link>{" "}
              が近い確認先です。
            </>,
          ],
        },
        {
          type: "p",
          title: "特定サイトだけならサービス側の制御と確認する",
          body: [
            "1つのサイトやサービスだけアクセス拒否になるなら、あなたの環境だけでなく、そのサービス側の地域制限、Bot 対策、ログイン基盤、部分障害が混ざって見えていることがあります。特にログイン前後や支払い・投稿・生成など一部機能だけで起きるときはこの傾向が強いです。",
            <>
              その場合は{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定サイトだけ開かない原因
              </Link>
              、主要サービスなら{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別ページ
              </Link>{" "}
              へ進むほうが実用的です。
            </>,
          ],
        },
        {
          type: "list",
          title: "このページからつながる主な既存ページ",
          items: [
            "/errors/403-forbidden",
            "/errors/429-too-many-requests",
            "/troubleshooting/captcha-or-verification-loop",
            "/troubleshooting/site-blocked-by-firewall",
            "/troubleshooting/website-blocked",
            "/troubleshooting/specific-site-not-working",
            "/services",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "アクセス拒否は幅の広い症状名です。コードがあるか、確認ループなのか、回線差があるか、特定サイトだけかで分けると、次に見るべきページがかなり明確になります。",
          ],
        },
      ]}
    />
  );
}
