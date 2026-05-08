import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "サイトは開くのに画像が表示されない原因と対処法",
  description:
    "サイト本文は開くのに画像だけ表示されないときの原因と対処法を解説します。CDNや画像配信失敗、拡張機能、Wi-Fi差、部分障害、ブラウザ側不整合の切り分け方をまとめています。",
  alternates: { canonical: "/troubleshooting/site-loads-without-images" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="サイトは開くのに画像が表示されない原因と対処法"
      updatedAt="2026-04-12"
      lead={[
        "サイトの本文やボタンは見えるのに、画像だけ読み込まれないことがあります。完全な接続失敗ではなく、画像だけ別の配信先や別の読み込み条件に依存しているときに起きやすい症状です。",
        "重要なのは、ページ全体が壊れているのか、画像配信だけ失敗しているのか、ブラウザや回線差で変わるのかを分けることです。画像だけ出ない場合は、CDN、ブラウザ拡張、Wi-Fi差、部分障害を優先して疑うほうが早いです。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "別ブラウザで画像が出るなら、元のブラウザ拡張や保存データを疑う",
            "モバイル回線では出るのに Wi-Fi だと出ないなら、回線差や画像配信先の制限を疑う",
            "テキストは正常で画像だけ失敗するなら、サイト全体停止より画像 CDN やアセット配信失敗を疑う",
            "特定ページや特定サービスだけ画像が欠けるなら、部分障害の可能性が高い",
            "画像だけでなくレイアウト全体が崩れるなら、CSS や他アセットも巻き込んだ配信失敗を疑う",
          ],
        },
        {
          type: "list",
          title: "主な原因",
          items: [
            "画像を配信している CDN や別ドメイン側が不安定",
            "ブラウザ拡張や広告ブロッカーが画像読み込みを止めている",
            "Wi-Fi や社内ネットワークが一部画像ドメインだけ遮断している",
            "ブラウザのキャッシュや保存データが壊れている",
            "サイト側の画像パス切れや一部ページだけの部分障害",
            "画像だけ別の地域・経路から配信されていて回線差が出ている",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "本文は読めるのに画像だけ空欄なら、画像配信や画像ドメイン寄りの問題",
            "別端末でも同じなら、サイト側や配信側の問題に近い",
            "自分のブラウザだけなら、拡張機能やキャッシュ不整合に近い",
            "一部画像だけだめなら、特定ページや特定CDNパスの問題に近い",
            "画像と一緒にレイアウトも崩れるなら、CSS や JS を含むアセット配信失敗の可能性が高い",
          ],
        },
        {
          type: "p",
          title: "サイト全体停止ではなく画像配信だけ失敗していることがある",
          body: [
            "画像は本文 HTML と同じ場所から配信されるとは限りません。画像 CDN、別サブドメイン、外部ストレージ、最適化サーバーなどから読み込まれていると、本文は見えるのに画像だけ欠けることがあります。",
            <>
              この方向は{" "}
              <Link
                href="/troubleshooting/cdn-or-server-edge-issues"
                className="underline hover:no-underline"
              >
                CDNやサーバー経路の問題
              </Link>{" "}
              に近いケースです。
            </>,
          ],
        },
        {
          type: "p",
          title: "ブラウザ拡張や保存データで画像だけ止まることがある",
          body: [
            "広告ブロッカー、プライバシー保護拡張、セキュリティ系拡張が画像リクエストだけ止めることがあります。特に追跡防止や外部ドメイン遮断が強い環境では、画像ホストだけブロックされることがあります。",
            <>
              別ブラウザやシークレットモードで画像が出るなら、{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラーの切り分けハブ
              </Link>{" "}
              の方向が近いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "Wi-Fi とモバイル回線で差が出るなら配信先や制限を疑う",
          body: [
            "本文は出るのに画像だけ Wi-Fi で失敗し、モバイル回線では出るなら、画像ドメインだけ社内ネットワークやルーター設定で止められていることがあります。DNS やフィルタリング、途中の中継条件が画像配信だけに影響することもあります。",
            <>
              この見え方なら{" "}
              <Link
                href="/troubleshooting/website-loads-on-phone-not-wifi"
                className="underline hover:no-underline"
              >
                スマホでは開くのにWi-Fiだと開かない原因
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/wifi-not-working"
                className="underline hover:no-underline"
              >
                Wi-Fiがつながらない原因
              </Link>{" "}
              も近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "特定ページだけ画像が欠けるなら部分障害を疑う",
          body: [
            "トップページの画像は出るのに、商品ページ、投稿一覧、ログイン後画面だけ画像が欠けるなら、サイト全体ではなく一部ページだけが壊れている可能性があります。画像 URL の生成失敗、API 応答不整合、特定パスの CDN キャッシュ異常などが候補です。",
            <>
              その場合は{" "}
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
              のほうが近いケースもあります。
            </>,
          ],
        },
        {
          type: "p",
          title: "真っ白や読み込み中のままとは少し違う",
          body: [
            "画像だけ出ない症状は、ページ全体が真っ白になるケースや、読み込み中のまま終わらないケースとは少し違います。HTML 自体は描画されているので、失敗箇所が限定されていることが多いです。",
            <>
              画面全体が崩れるなら{" "}
              <Link
                href="/troubleshooting/site-opens-but-is-blank"
                className="underline hover:no-underline"
              >
                サイトは開くのに真っ白になる原因
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/site-loads-forever"
                className="underline hover:no-underline"
              >
                サイトが読み込み中のまま終わらない原因
              </Link>{" "}
              のほうが近くなります。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい対処法",
          items: [
            "1) 別ブラウザやシークレットモードで画像が出るか比べる",
            "2) 別端末で同じページを開いて再現範囲を確認する",
            "3) Wi-Fi とモバイル回線で結果を比べる",
            "4) 画像だけ欠けるのか、特定ページだけなのかを分ける",
            "5) 拡張機能、VPN、セキュリティ系機能を一時的に見直す",
            "6) 特定サービスならサービス別ページや障害情報も確認する",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "画像だけ出ないときは、ページ本体と画像配信先が別であることを前提に見ると整理しやすくなります。本文が見えているなら、まず画像ホスト、ブラウザ差、回線差、部分障害の順で疑うのが近道です。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "サイトは開くのに画像が表示されないときは、サイト全体停止より、画像 CDN やアセット配信、ブラウザ拡張、回線差、ページ限定の部分障害を優先して切り分けるほうが実用的です。",
            <>
              まずブラウザ差と回線差を確認し、必要に応じて{" "}
              <Link
                href="/troubleshooting/cdn-or-server-edge-issues"
                className="underline hover:no-underline"
              >
                CDNや経路
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
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定サイトの切り分け
              </Link>{" "}
              へ進むのが早いです。
            </>,
          ],
        },
      ]}
    />
  );
}
