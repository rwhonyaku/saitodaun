import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "ブラウザでサイトが開かない原因",
  description:
    "ChromeやSafariなどブラウザでサイトが開かない場合の原因と対処法を解説します。キャッシュ、拡張機能、DNSなどの問題を確認する方法を紹介します。",
  alternates: { canonical: "/troubleshooting/browser-not-loading-sites" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="ブラウザでサイトが開かない原因"
      lead={[
        "インターネット接続は正常なのに、ブラウザでサイトが開かないことがあります。",
        "この場合、回線そのものより、ブラウザ設定、キャッシュ、拡張機能、DNS、証明書まわりの問題である可能性があります。",
        "ここでは、ブラウザが原因なのか、ネットワーク側なのか、特定サイト側なのかを切り分ける方法を整理します。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "別ブラウザで開けるなら、回線全体ではなく元のブラウザ環境を優先して疑う",
            "スマホでは開くのにPCブラウザで開かないなら、DNS、拡張機能、社内ネットワーク、PC側設定を疑う",
            "どのブラウザでもだめなら、ブラウザ単体より回線、DNS、サイト側障害の可能性が高い",
            "特定サイトだけだめなら、ブラウザ全体より接続先サイト側やURL個別の問題を疑う",
          ],
        },
        {
          type: "list",
          title: "主な原因",
          items: [
            "ブラウザキャッシュの問題",
            "拡張機能の干渉",
            "DNSキャッシュの問題",
            "セキュリティ設定",
            "HTTPS証明書や時刻設定の問題",
            "ブラウザのプロファイル破損や保存済みデータの不整合",
            "会社・学校・公共Wi-Fiなどのアクセス制限",
          ],
        },
        {
          type: "p",
          title: "別のブラウザで試す",
          body: [
            "Chromeで開けない場合でも、SafariやEdgeでは正常に表示できることがあります。ここで結果が分かれるなら、ネット全体ではなくブラウザ固有の問題をかなり強く疑えます。",
            "とくに、拡張機能、キャッシュ、Cookie、ログイン状態、保存済みサイトデータの違いで結果が変わることはよくあります。",
          ],
        },
        {
          type: "p",
          title: "ブラウザのキャッシュや拡張機能を疑う",
          body: [
            "もっとも多いのは、ブラウザのキャッシュやCookie、拡張機能の干渉です。広告ブロッカー、セキュリティ系拡張、翻訳系拡張、社内向け拡張などが特定サイトだけを壊すことがあります。",
            "まずはシークレットモードで試し、それでもだめなら拡張機能を一時的に無効にして確認すると、影響元を切り分けやすくなります。",
          ],
        },
        {
          type: "p",
          title: "一部のサイトだけ開かない場合",
          body: [
            "ブラウザ全体が壊れているのではなく、特定のサイトだけ開かない場合は、接続先サイト側の障害、URLの問題、ログイン制限、証明書エラーなどの可能性があります。",
            <>
              特定のサイトだけ症状が出るなら{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              も確認してください。
            </>,
          ],
        },
        {
          type: "p",
          title: "DNSの問題",
          body: [
            "ブラウザでサイトが開かない原因が、実際にはDNSの名前解決失敗であることもあります。ブラウザだけの問題に見えても、接続先の変換に失敗していれば表示できません。",
            <>
              DNSの問題が疑われる場合は{" "}
              <Link href="/troubleshooting-dns" className="underline hover:no-underline">
                DNSトラブルシューティング
              </Link>{" "}
              を確認してください。ブラウザ上で「サーバーが見つからない」「名前解決できない」に近い表示が出るなら{" "}
              <Link
                href="/errors/err-name-not-resolved"
                className="underline hover:no-underline"
              >
                ERR_NAME_NOT_RESOLVED
              </Link>{" "}
              も近い症状です。
            </>,
          ],
        },
        {
          type: "p",
          title: "HTTPS警告や証明書エラーが出る場合",
          body: [
            "『保護されていない接続』『安全ではありません』『証明書が無効』のような表示が出る場合は、単純な表示不具合ではなく、HTTPSや証明書の問題が関係していることがあります。",
            <>
              サイト側の証明書不備だけでなく、端末の時刻ずれ、古いブラウザ、社内ネットワークの中継装置などが原因になることもあります。『この接続ではプライバシーが保護されません』のような警告なら{" "}
              <Link
                href="/errors/your-connection-is-not-private"
                className="underline hover:no-underline"
              >
                この接続ではプライバシーが保護されません
              </Link>{" "}
              のページが近い整理です。
            </>,
          ],
        },
        {
          type: "list",
          title: "症状ごとの見分け方",
          items: [
            "ChromeだけだめでEdgeでは開くなら、Chrome側のキャッシュ、拡張機能、プロファイル問題を疑う",
            "PCではだめでスマホでは開くなら、PC側のDNS、VPN、セキュリティ設定、ネットワーク制限を疑う",
            "ブラウザではだめだがアプリでは使えるなら、ブラウザ固有の保存データや証明書処理の問題を疑う",
            "すべてのブラウザでだめなら、ブラウザ設定より回線、DNS、サイト側障害を優先して疑う",
          ],
        },
        {
          type: "p",
          title: "スマホでは開くのにPCブラウザでだけだめな場合",
          body: [
            <>
              このパターンでは、サイト全体の停止よりも PC 側のブラウザ環境、社内ネットワーク、Wi-Fi 経路、証明書処理の差を疑いやすくなります。特に『スマホ回線では開くが Wi-Fi や PC ではだめ』という見え方なら{" "}
              <Link
                href="/troubleshooting/site-works-on-phone-not-computer"
                className="underline hover:no-underline"
              >
                スマホでは開くのにパソコンでは開かないケース
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/website-loads-on-phone-not-wifi"
                className="underline hover:no-underline"
              >
                スマホでは開くのにWi-Fiでは開かないケース
              </Link>{" "}
              も近い症状です。
            </>,
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "ブラウザが原因のトラブルでは、キャッシュ削除、拡張機能の確認、別ブラウザ比較で解決の糸口が見つかることがあります。",
            "重要なのは、ブラウザ固有の問題なのか、DNSや証明書を含むネットワーク側の問題なのか、特定サイトだけの問題なのかを分けて考えることです。",
          ],
        },
      ]}
      updatedAt="2026-03-06"
    />
  );
}
