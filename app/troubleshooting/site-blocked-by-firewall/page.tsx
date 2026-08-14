import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";
import SurfsharkAffiliateBlock from "@/components/SurfsharkAffiliateBlock";

export const metadata: Metadata = {
  title: "ファイアウォールや制限でサイトが開かないときの原因",
  description:
    "会社や学校のネットワーク、セキュリティ設定、ファイアウォールなどが原因でサイトにアクセスできない場合の確認方法を解説します。",
  alternates: { canonical: "/troubleshooting/site-blocked-by-firewall" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="ファイアウォールや制限でサイトが開かないときの原因"
      lead={[
        "インターネット自体は使えるのに、特定のサイトだけ開かない場合、回線障害やサイト停止ではなく、ネットワーク制限やセキュリティ設定が原因になっていることがあります。",
        "特に会社、学校、ホテル、公共 Wi-Fi では、特定カテゴリのサイトや一部サービスが制限されていることがあります。",
        "このページでは、ファイアウォールやアクセス制限が原因でサイトが開かないときの見分け方を整理します。",
      ]}
      sections={[
        {
          type: "p",
          title: "まず他の回線で試してみる",
          body: [
            "もっとも簡単な確認は、別の回線で同じサイトを開いてみることです。会社の Wi-Fi では開かないのにスマホのモバイル通信では開くなら、そのネットワーク側の制限が疑われます。",
            "逆にどの回線でも同じように開かない場合は、サイト側の障害や DNS の問題も候補に入ります。",
          ],
        },
        {
          type: "list",
          title: "制限が疑われる典型的なパターン",
          items: [
            "会社や学校の Wi-Fi でだけ開かない",
            "ホテルや公共 Wi-Fi で特定サービスだけ使えない",
            "VPN 接続中だけアクセスできない",
            "セキュリティソフト導入後に開けなくなった",
          ],
        },
        {
          type: "p",
          title: "会社や学校のネットワーク制限",
          body: [
            "企業や教育機関では、セキュリティや業務上の理由から、一部サイトやサービスへのアクセスが制限されていることがあります。",
            "動画、SNS、ファイル共有、外部通信が多いサービスなどは、特に制限対象になりやすいです。",
          ],
        },
        {
          type: "p",
          title: "VPN やセキュリティソフトの影響",
          body: [
            "VPN、ウイルス対策ソフト、フィルタリングアプリが通信を遮断しているケースもあります。設定変更直後やアプリ導入後に症状が出た場合は、この可能性を考えてください。",
            "一時的に VPN やセキュリティ機能をオフにすると、原因の確認がしやすくなります。",
          ],
        },
        {
          type: "p",
          title: "サイト停止との見分け方",
          body: [
            "自分のネットワークだけの制限なのか、本当にサイトが落ちているのかを見分けることが重要です。",
            <>
              特定サイトの障害確認には{" "}
              <Link href="/" className="underline hover:no-underline">
                接続チェックツール
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              のページが役立ちます。
            </>,
          ],
        },
        {
          type: "p",
          title: "DNS やブラウザ側の可能性もある",
          body: [
            "制限に見えても、実際には DNS 設定やブラウザ拡張機能の影響で開かないこともあります。特に自宅回線で発生している場合は、ネットワーク制限と決めつけない方が安全です。",
            <>
              DNS に心当たりがある場合は{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNS トラブルシューティング
              </Link>{" "}
              も確認してください。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "別の回線やモバイル通信で試す",
            "VPN をオフにしてみる",
            "セキュリティソフトやフィルタリング設定を確認する",
            "別のブラウザでも試す",
            "そのサイトが本当に停止していないか確認する",
          ],
        },
        {
          type: "note",
          title: "VPN で比較するのが向く場面",
          body: [
            "会社、学校、ISP、地域制限の可能性が高く、別回線で症状が変わるなら VPN で経路を変えて比較するとネットワーク依存かを確認しやすくなります。まずは確認目的で使い、サイト側障害の代わりと考えないのが大切です。",
            <>
              地域制限やネットワーク制限が疑わしい場合は{" "}
              <Link href="/vpn" className="underline hover:no-underline">
                VPNが役立つケース
              </Link>{" "}
              も確認できます。ただし、サービス側の障害は VPN では解決できません。
            </>,
            <SurfsharkAffiliateBlock key="surfshark-block" />,
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "特定のサイトだけ開かないときは、サイト停止だけでなく、会社や学校の制限、VPN、セキュリティソフトなども原因になります。",
            "まずは別回線で試し、問題がネットワーク依存なのかどうかを見極めることが大切です。",
          ],
        },
      ]}
      updatedAt="2026-04-13"
    />
  );
}
