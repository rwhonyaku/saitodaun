import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "サイトはWi-Fiで開くのにモバイルデータだと開かない原因と対処法",
  description:
    "サイトが Wi-Fi では開くのにモバイルデータでは開かないときの原因と対処法を解説します。通信キャリア側の制限、モバイル DNS、VPN、データ節約機能、特定サイトだけの遮断の見分け方をまとめています。",
  alternates: {
    canonical: "/troubleshooting/website-works-on-wifi-not-mobile-data",
  },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="サイトはWi-Fiで開くのにモバイルデータだと開かない原因と対処法"
      updatedAt="2026-04-12"
      lead={[
        "同じスマホや同じサイトでも、Wi-Fi では問題なく開くのに、4G や 5G のモバイルデータに切り替えると開かないことがあります。この場合、サイト全体が落ちているというより、モバイル回線側の経路、制限、名前解決、通信設定を優先して疑うほうが自然です。",
        "回線を切り替えるだけで結果が変わるなら、原因の重心はかなり絞れます。重要なのは『モバイルデータで全部だめなのか』『特定サイトだけだめなのか』『特定キャリアや VPN 利用時だけだめなのか』を分けて見ることです。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "Wi-Fi で開くなら、まずサイト全体障害よりモバイル回線側を疑う",
            "モバイルデータで全部のサイトやアプリが不安定なら、サイト別より回線や端末設定に近い",
            "特定サイトだけモバイルデータでだめなら、キャリア側制限や経路差、サイト別ブロックも候補になる",
            "VPN を切ると開くなら、モバイル回線そのものより中継経路の影響が強い",
            "会社用端末や見守り設定端末なら、通信制限やフィルタリングも見たほうが早い",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                Wi-Fi だと開かないがモバイルデータでは開く →{" "}
                <Link
                  href="/troubleshooting/website-loads-on-phone-not-wifi"
                  className="underline hover:no-underline"
                >
                  スマホでは開くのにWi-Fiだと開かない原因
                </Link>
              </p>
              <p>
                モバイルデータで特定サイトだけ開かない →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
                </Link>
              </p>
              <p>
                ブラウザだけ失敗してアプリでは開く →{" "}
                <Link
                  href="/troubleshooting/browser-not-loading-sites"
                  className="underline hover:no-underline"
                >
                  ブラウザエラーの確認ハブ
                </Link>
              </p>
              <p>
                会社・学校・制限環境が関係していそう →{" "}
                <Link
                  href="/troubleshooting/site-blocked-by-firewall"
                  className="underline hover:no-underline"
                >
                  サイトがファイアウォールでブロックされる原因
                </Link>
              </p>
              <p>
                まずサービス側障害か確認したい →{" "}
                <Link
                  href="/services"
                  className="underline hover:no-underline"
                >
                  サービス別トラブルページ
                </Link>
              </p>
              <p>
                まず広域障害か見たい →{" "}
                <Link
                  href="/outages/japan"
                  className="underline hover:no-underline"
                >
                  ネット障害情報
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "list",
          title: "主な原因",
          items: [
            "通信キャリア側の DNS や経路の不安定さ",
            "モバイルデータ時だけ有効になる VPN やセキュリティ機能",
            "データ節約、プライベート DNS、フィルタリング設定",
            "特定サイトやカテゴリに対するキャリア側制限",
            "モバイル回線の一時的な地域障害や混雑",
            "ブラウザやアプリごとの通信許可設定の差",
          ],
        },
        {
          type: "p",
          title: "Wi-Fi で開くならサイト全体停止の可能性は下がる",
          body: [
            "同じ時間に Wi-Fi では正常に開けるなら、その時点でサイト自体が完全停止している可能性はかなり下がります。つまり、モバイルデータ側の名前解決、接続経路、キャリア制限、端末設定のほうに原因が寄っていることが多いです。",
            <>
              まずはサイト全体ではなく『モバイルデータ時だけの条件差』を見て、必要なら{" "}
              <Link
                href="/outages/japan"
                className="underline hover:no-underline"
              >
                ネット障害情報
              </Link>{" "}
              も確認すると整理しやすくなります。
            </>,
          ],
        },
        {
          type: "p",
          title: "特定サイトだけだめならキャリア側制限や経路差も候補",
          body: [
            "モバイルデータで複数サービスは正常なのに、あるサイトだけ開かないなら、端末全体の通信断よりも、特定ドメインへの経路差やキャリア側の制限、サイト側のモバイル回線に対する防御条件を疑いやすくなります。",
            <>
              この形なら{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              や{" "}
              <Link
                href="/services"
                className="underline hover:no-underline"
              >
                サービス別トラブルページ
              </Link>{" "}
              へ進むほうが近道です。
            </>,
          ],
        },
        {
          type: "p",
          title: "モバイルデータで全部不安定なら回線や端末設定を優先する",
          body: [
            "モバイルデータ時に複数のサイトやアプリが重い、開かない、途中で止まるなら、そのサイト固有の問題ではなく、キャリア側の混雑や障害、機内モードの切り替え後の不整合、端末の DNS や通信設定の問題に近くなります。",
            "この場合は『そのサイトが悪いか』より『モバイル回線で他も同じか』を先に見るほうが無駄が少なくなります。",
          ],
        },
        {
          type: "p",
          title: "VPN や保護機能がモバイル時だけ効いていることがある",
          body: [
            "セキュリティアプリ、広告ブロック、見守り設定、プライベート DNS、社用端末の保護機能は、モバイルデータ利用時だけ強く効くことがあります。見た目は『回線を変えたら開かない』でも、実際にはその上に乗っている保護経路が止めているケースがあります。",
            <>
              制限や遮断が疑わしいなら{" "}
              <Link
                href="/troubleshooting/site-blocked-by-firewall"
                className="underline hover:no-underline"
              >
                制限系の確認
              </Link>{" "}
              が近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "ブラウザだけだめならモバイル回線そのものとは限らない",
          body: [
            "アプリでは正常なのにブラウザだけ開けないなら、モバイル回線全体よりブラウザ側の保存データや証明書警告、拡張ブラウザ機能、DNS over HTTPS のような設定差が候補になります。モバイルデータで失敗していても、原因が完全に回線とは限りません。",
            <>
              この方向なら{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラーの確認ハブ
              </Link>{" "}
              から見ると整理しやすいです。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "1) Wi-Fi とモバイルデータで同じ URL の結果を比べる",
            "2) モバイルデータで他のサイトやアプリも不安定か確認する",
            "3) 特定サイトだけか、特定ブラウザだけかを分ける",
            "4) VPN、プライベート DNS、保護機能、データ節約設定を見直す",
            "5) 家族や別端末の同じキャリア回線でも再現するか確認する",
            "6) 特定サービスならサービス別ページや障害情報も確認する",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "Wi-Fi では開くという事実は強い手がかりです。まずサイト全体を疑うより、モバイル回線で『全部だめか』『特定サイトだけか』『特定条件だけか』を分けると、キャリア障害、制限、端末設定のどこを見るべきか絞りやすくなります。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "サイトが Wi-Fi では開くのにモバイルデータだと開かないときは、サイト全体障害より、キャリア側の経路や制限、モバイル設定、VPN や保護機能の影響を優先して確認するほうが早いです。",
            <>
              まずは特定サイトだけの症状かどうかを確認して、必要に応じて{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定サイト
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザ
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-blocked-by-firewall"
                className="underline hover:no-underline"
              >
                制限系
              </Link>
              、{" "}
              <Link
                href="/services"
                className="underline hover:no-underline"
              >
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
