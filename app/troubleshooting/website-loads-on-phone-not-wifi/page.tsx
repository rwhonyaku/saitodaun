import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "サイトはスマホ回線で開くのにWi-Fiだと開かない原因と対処法",
  description:
    "サイトがスマホのモバイル回線では開くのに Wi-Fi だと開かないときの原因と対処法を解説します。DNS、Wi-Fi制限、ルーター不調、VPN、公共Wi-Fi認証の切り分け方をまとめています。",
  alternates: { canonical: "/troubleshooting/website-loads-on-phone-not-wifi" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="サイトはスマホ回線で開くのにWi-Fiだと開かない原因と対処法"
      updatedAt="2026-04-11"
      lead={[
        "同じサイトなのに、スマホのモバイル回線では開くのに Wi-Fi へ切り替えると開かないことがあります。",
        "この場合、サイト自体が完全に落ちている可能性は低く、Wi-Fi 側の DNS、アクセス制限、ルーター不調、VPN、公共Wi-Fi認証などを優先して疑うほうが自然です。『回線差』がはっきり出ているので、切り分けしやすい症状でもあります。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "モバイル回線では開くなら、まずサイト全体障害より Wi-Fi 側を疑う",
            "Wi-Fi でどのサイトもだめなのか、そのサイトだけだめなのかを分ける",
            "自宅Wi-Fi だけか、公共Wi-Fi や会社Wi-Fi でも同じかを確認する",
            "DNS、Wi-Fi 制限、ルーター不安定、VPN の順で見ると絞りやすい",
          ],
        },
        {
          type: "list",
          title: "主な原因",
          items: [
            "Wi-Fi 側の DNS 不調や名前解決の差",
            "自宅・会社・学校・公共Wi-Fi のアクセス制限",
            "ルーターやモデムの一時的不具合",
            "公共Wi-Fi のログイン未完了や再認証切れ",
            "Wi-Fi 接続時だけ有効になる VPN やセキュリティ機能",
            "特定サイトだけが Wi-Fi 経路でブロック・不安定になっている",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "そのサイトだけ Wi-Fi でだめなら、DNS やサイト別制限を疑いやすい",
            "Wi-Fi でどのサイトも不安定なら、ルーターや回線側の問題に近い",
            "公共Wi-Fi だけで起きるなら、認証や利用制限を疑いやすい",
            "自宅Wi-Fi だけで起きるなら、ルーター、DNS、ネットワーク機能の影響が濃い",
          ],
        },
        {
          type: "p",
          title: "モバイル回線で開くならサイト全体障害の可能性は下がる",
          body: [
            "スマホのモバイル回線で問題なく開けるなら、その時点でサイト自体が完全に落ちている可能性はかなり下がります。つまり、問題は Wi-Fi 側の経路や設定に寄っていることが多いです。",
            <>
              ここで大切なのは『Wi-Fi で全部だめなのか』『Wi-Fi でも特定サイトだけだめなのか』を最初に分けることです。Wi-Fi でも複数サービスやアプリ全体が不安定なら{" "}
              <Link
                href="/troubleshooting/internet-not-working"
                className="underline hover:no-underline"
              >
                インターネットにつながらない原因
              </Link>{" "}
              のほうが近い整理になることもあります。
            </>,
          ],
        },
        {
          type: "p",
          title: "特定サイトだけ Wi-Fi で開かないとき",
          body: [
            "この場合は、Wi-Fi 側 DNS、アクセス制限、証明書干渉、共有 IP の評価などが原因候補になります。会社や学校の Wi-Fi では、特定カテゴリのサイトだけ止められていることもあります。",
            <>
              特定サイトだけの症状なら{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              も確認すると整理しやすくなります。ブラウザ警告や証明書表示が出るなら{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザでサイトが開かない原因
              </Link>{" "}
              も近い入口です。
            </>,
          ],
        },
        {
          type: "p",
          title: "Wi-Fi で全体的に不安定ならルーターや DNS を見る",
          body: [
            "Wi-Fi にした瞬間に複数サイトが重い、開かない、途中で止まるなら、サイト別問題よりルーターや DNS の可能性が高くなります。特に再起動していないルーターや、古い DNS キャッシュが残っている環境では起こりやすいです。",
            <>
              Wi-Fi 全体が怪しいときは{" "}
              <Link
                href="/troubleshooting/wifi-not-working"
                className="underline hover:no-underline"
              >
                Wi-Fiがつながらない原因
              </Link>
              、ルーター寄りなら{" "}
              <Link
                href="/troubleshooting/router-not-working"
                className="underline hover:no-underline"
              >
                ルーターがつながらない原因
              </Link>
              、DNS 寄りなら{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNSトラブルシューティング
              </Link>{" "}
              が近いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "公共Wi-Fiでは認証未完了でも似た症状になる",
          body: [
            "ホテル、空港、カフェ、商業施設の Wi-Fi では、接続後にログインや同意画面が必要なことがあります。これが出ていないと、Wi-Fi にはつながっているように見えてもサイトが開かないことがあります。",
            <>
              そのケースは{" "}
              <Link
                href="/troubleshooting/public-wifi-login-page-not-showing"
                className="underline hover:no-underline"
              >
                公共Wi-Fiでログイン画面が出ない原因
              </Link>{" "}
              に近い症状です。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい対処法",
          items: [
            "1) モバイル回線と Wi-Fi で同じ URL を比較する",
            "2) Wi-Fi で全部だめか、そのサイトだけだめかを確認する",
            "3) ルーターや端末を再接続・再起動する",
            "4) Wi-Fi 環境の DNS や VPN を見直す",
            "5) 公共Wi-Fi なら認証画面や利用制限を確認する",
            "6) 会社・学校 Wi-Fi なら制限の可能性を考える",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "モバイル回線では開くという事実はかなり強い手がかりです。問題の重心はサイト全体ではなく Wi-Fi 側にあることが多いので、DNS、制限、ルーター、公共Wi-Fi 認証の順で見ると無駄が少なくなります。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "サイトがスマホ回線では開くのに Wi-Fi だと開かないときは、サイト自体より Wi-Fi 側の DNS、アクセス制限、ルーター不調、公共Wi-Fi認証などが主な原因です。",
            <>
              まず Wi-Fi でそのサイトだけだめなのか、全体が不安定なのかを見て、必要に応じて{" "}
              <Link
                href="/troubleshooting/wifi-not-working"
                className="underline hover:no-underline"
              >
                Wi-Fi
              </Link>
              、{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNS
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定サイト
              </Link>{" "}
              のページへ進むのが実用的です。
            </>,
          ],
        },
      ]}
    />
  );
}
