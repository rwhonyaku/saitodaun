import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "サイトが読み込み中のまま終わらない原因と対処法",
  description:
    "サイトがずっと読み込み中のまま終わらないときの原因と対処法を解説します。回線不安定、CDNやサーバー遅延、ブラウザ拡張、DNS、部分障害の切り分け方をまとめています。",
  alternates: { canonical: "/troubleshooting/site-loads-forever" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="サイトが読み込み中のまま終わらない原因と対処法"
      updatedAt="2026-04-11"
      lead={[
        "サイトが完全にエラーになるわけではないのに、読み込み中のまま止まって進まないことがあります。スピナーが回り続ける、白いまま長く待たされる、途中まで見えるのに終わらない、といった症状です。",
        "この状態は『完全に落ちている』ケースだけでなく、回線不安定、サーバー遅延、CDN 経路の詰まり、ブラウザ拡張、重い JavaScript、部分障害などでも起こります。重要なのは、どこで止まっているかを切り分けることです。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "別端末・別回線でも同じなら、サイト側の遅延や部分障害を疑う",
            "モバイル回線では開くなら、自宅Wi-FiやDNS、経路側を疑う",
            "シークレットモードや別ブラウザで改善するなら、拡張機能や保存データの影響を疑う",
            "トップは開くがログイン後や特定操作だけ終わらないなら、部分障害を疑う",
          ],
        },
        {
          type: "list",
          title: "主な原因",
          items: [
            "サイト側の高負荷やバックエンド遅延",
            "CDN や配信経路の一時的不安定",
            "Wi-Fi や回線の不安定さによる途中停滞",
            "ブラウザ拡張、広告ブロッカー、セキュリティ機能の干渉",
            "重い JavaScript や一部APIだけ止まる部分障害",
            "DNS や HTTPS 周辺の不安定な名前解決・接続確立失敗",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "どの端末でも遅いなら、サイト側や経路全体の問題に近い",
            "自分の端末だけなら、ブラウザ環境や拡張機能を疑いやすい",
            "特定ページだけ終わらないなら、その機能や API だけの部分障害が疑わしい",
            "時間帯によってだけ重いなら、混雑や負荷の可能性が高い",
          ],
        },
        {
          type: "p",
          title: "『完全に開かない』のか『終わらない』のかは別問題",
          body: [
            "タイムアウトや接続拒否のように完全に止まるケースと、ページ自体は見え始めるのに読み込みだけ終わらないケースでは、原因の傾向が少し違います。",
            <>
              後者では、HTML は返ってきているのに、画像、スクリプト、API、広告、解析タグなど一部リソースが詰まって全体が終わらないことがあります。ページが真っ白のままに近い場合は{" "}
              <Link
                href="/troubleshooting/site-opens-but-is-blank"
                className="underline hover:no-underline"
              >
                サイトは開くのに真っ白なケース
              </Link>{" "}
              の整理も近い症状です。
            </>,
          ],
        },
        {
          type: "p",
          title: "サイト側の遅延や部分障害を疑うケース",
          body: [
            "サイト全体が落ちていなくても、ログイン、検索、決済、投稿、コメント、画像読み込みなど、ある機能だけが遅くなってページ全体が終わらないことがあります。",
            <>
              そうした部分障害は{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/cdn-or-server-edge-issues"
                className="underline hover:no-underline"
              >
                CDNやサーバー経路の問題
              </Link>{" "}
              のほうが近いケースもあります。明確に時間切れの表示が出るなら{" "}
              <Link
                href="/errors/504-gateway-timeout"
                className="underline hover:no-underline"
              >
                504 Gateway Timeout
              </Link>{" "}
              も近い見え方です。
            </>,
          ],
        },
        {
          type: "p",
          title: "ブラウザ側の干渉で終わらないこともある",
          body: [
            "広告ブロッカー、セキュリティ拡張、翻訳拡張、VPN 関連機能などが、必要なスクリプトや通信を途中で止めることがあります。その場合、ページ自体は表示されているのに読み込みが完了しないように見えます。",
            <>
              ブラウザ寄りの問題を詳しく見るなら{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザでサイトが開かない原因
              </Link>{" "}
              も確認してください。
            </>,
          ],
        },
        {
          type: "p",
          title: "回線や DNS が不安定なときの見え方",
          body: [
            "回線が完全に切れていなくても、不安定だと一部リソースだけ遅れ続け、ページ全体が終わらないことがあります。Wi-Fi が弱い、VPN が不安定、DNS が揺れている、といったときにも似た見え方になります。",
            <>
              回線全体が怪しいときは{" "}
              <Link
                href="/troubleshooting/internet-not-working"
                className="underline hover:no-underline"
              >
                インターネットにつながらない原因
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNSトラブルシューティング
              </Link>{" "}
              も役立ちます。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい対処法",
          items: [
            "1) 別端末・別回線で同じページを試す",
            "2) シークレットモードや別ブラウザで試す",
            "3) Wi-Fi とモバイル回線で比較する",
            "4) ブラウザ拡張や VPN を一時的に見直す",
            "5) 時間を置いて再試行し、負荷由来か確認する",
            "6) サイト全体か特定機能だけかを見分ける",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "『表示は始まるが終わらない』ときは、完全停止よりも部分遅延や一部リソース失敗を疑うと整理しやすくなります。トップ、ログイン後、画像、検索など、どこで止まるかを見ると原因に近づけます。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "サイトが読み込み中のまま終わらないときは、単純なダウンだけでなく、サイト側の遅延、部分障害、回線不安定、ブラウザ干渉など複数の原因が考えられます。",
            <>
              まず{" "}
              <Link href="/" className="underline hover:no-underline">
                接続チェックツール
              </Link>{" "}
              で外部からの応答を見つつ、必要に応じて{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザ
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/cdn-or-server-edge-issues"
                className="underline hover:no-underline"
              >
                CDNや経路
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定サイトの切り分け
              </Link>{" "}
              へ進むのが基本です。
            </>,
          ],
        },
      ]}
    />
  );
}
