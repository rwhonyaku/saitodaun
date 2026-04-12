import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "サイトは開くのに真っ白になる原因と対処法",
  description:
    "サイトは開くのに真っ白なまま表示されるときの原因と対処法を解説します。ブラウザ拡張、JavaScript失敗、CDN資産不達、部分障害、端末側設定の切り分け方をまとめています。",
  alternates: { canonical: "/troubleshooting/site-opens-but-is-blank" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="サイトは開くのに真っ白になる原因と対処法"
      updatedAt="2026-04-11"
      lead={[
        "サイトにアクセスするとURLは開くのに、画面が真っ白なまま何も表示されないことがあります。完全な接続失敗とは違い、ページの土台は開いているのに中身が描画できていない状態です。",
        "この症状は、ブラウザ拡張、JavaScript エラー、画像やスクリプトの配信失敗、部分障害、キャッシュ不整合などで起こります。『真っ白』は見た目が同じでも原因はかなり分かれます。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "別ブラウザで表示されるなら、元ブラウザの拡張機能や保存データを疑う",
            "スマホでは表示されるのに PC だけ真っ白なら、PC ブラウザ環境を優先して疑う",
            "トップだけ出るがログイン後や特定機能で真っ白なら、部分障害や JavaScript 失敗を疑う",
            "時間を置くと直るなら、CDN 資産不達やサイト側の一時的不安定さも疑える",
          ],
        },
        {
          type: "list",
          title: "主な原因",
          items: [
            "ブラウザ拡張や広告ブロッカーが必要なスクリプトを止めている",
            "サイト側の JavaScript エラーやフロントエンド不具合",
            "CDN から読み込む CSS や JavaScript が失敗している",
            "キャッシュや Cookie の不整合で描画が壊れている",
            "ログイン後画面や特定ページだけ落ちる部分障害",
            "社内ネットワークやセキュリティ製品が一部リソースを遮断している",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "別ブラウザで表示されるなら、サイト全体よりブラウザ環境の問題に近い",
            "トップページは出るが遷移後だけ真っ白なら、特定画面や機能の障害を疑う",
            "画像やレイアウトも出ず真っ白なら、主要資産の配信失敗や JS 初期化失敗を疑う",
            "スマホ・PC の両方で同じなら、サイト側や CDN 側の問題の可能性が高い",
          ],
        },
        {
          type: "p",
          title: "『開かない』のではなく『描画できていない』状態",
          body: [
            "真っ白になるケースでは、サーバーやURL自体は生きていることがあります。ただし、表示に必要な JavaScript、CSS、API 応答のどれかが壊れると、中身だけ描画できず白いままになることがあります。",
            <>
              そのため、単純なタイムアウトや 404 とは違い、ページの一部は開いているように見えても実際にはフロントエンド側で止まっていることがあります。真っ白ではなく読み込み中のまま止まる見え方に近いなら{" "}
              <Link
                href="/troubleshooting/site-loads-forever"
                className="underline hover:no-underline"
              >
                サイトが読み込み中のまま終わらないケース
              </Link>{" "}
              も近い症状です。
            </>,
          ],
        },
        {
          type: "p",
          title: "ブラウザ拡張や保存データが原因のことが多い",
          body: [
            "真っ白表示は、広告ブロッカー、セキュリティ拡張、翻訳拡張、ユーザースクリプトなどがサイトの初期化処理を壊したときによく起こります。また、古いキャッシュや Cookie の不整合で描画が破綻することもあります。",
            <>
              そのため、まずは{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザでサイトが開かない原因
              </Link>{" "}
              と同じ考え方で、別ブラウザやシークレットモードで比較するのが有効です。
            </>,
          ],
        },
        {
          type: "p",
          title: "サイト側のフロントエンド障害や部分障害",
          body: [
            "トップページは見えるのに、ログイン後、検索結果、投稿画面、設定画面だけ真っ白になるなら、サイト全体の停止ではなく特定画面や特定 API に依存する部分障害の可能性があります。",
            <>
              その場合は{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              や{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別トラブル一覧
              </Link>{" "}
              のほうが近いケースもあります。
            </>,
          ],
        },
        {
          type: "p",
          title: "CDN や資産配信失敗でも真っ白になる",
          body: [
            "JavaScript や CSS が CDN から読めないと、HTML だけ受け取っても画面がほぼ何も出ないことがあります。地域差や時間帯差があるときは、CDN や配信経路の問題も疑えます。",
            <>
              そうした症状は{" "}
              <Link
                href="/troubleshooting/cdn-or-server-edge-issues"
                className="underline hover:no-underline"
              >
                CDNやサーバー経路の問題
              </Link>{" "}
              に近いです。時間切れの表示や極端な待ち時間が目立つなら{" "}
              <Link
                href="/errors/504-gateway-timeout"
                className="underline hover:no-underline"
              >
                504 Gateway Timeout
              </Link>{" "}
              もあわせて確認してください。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい対処法",
          items: [
            "1) シークレットモードで開く",
            "2) 別ブラウザ・別端末で比較する",
            "3) キャッシュと Cookie を見直す",
            "4) 拡張機能や VPN を一時的に見直す",
            "5) Wi-Fi とモバイル回線で比較する",
            "6) トップだけか、特定画面だけかを確認する",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "真っ白表示は『接続できない』よりも『表示に必要な一部だけ壊れている』ことが多い症状です。ページ全体ではなく、どの画面・どの操作で白くなるかを見ると原因に近づきやすくなります。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "サイトは開くのに真っ白になるときは、ブラウザ拡張、キャッシュ不整合、フロントエンド障害、CDN 資産失敗、部分障害などが主な原因です。",
            <>
              まず別ブラウザと別端末で比較し、必要に応じて{" "}
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
              へ進むのが実用的です。
            </>,
          ],
        },
      ]}
    />
  );
}
