import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "サイトが落ちているか確認する方法",
  description:
    "サイトが本当にダウンしているのか、自分の回線や端末だけの問題なのかを確認する方法を解説します。切り分けの基本手順を分かりやすく紹介します。",
  alternates: { canonical: "/troubleshooting/how-to-check-if-a-website-is-down" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="サイトが落ちているか確認する方法"
      lead={[
        "サイトが急に開かなくなると、まず『そのサイトが落ちているのか、それとも自分の環境の問題なのか』が分からなくなりやすいものです。",
        "ここを最初に切り分けられるかどうかで、その後の対応がかなり変わります。サイト側の障害なら待つしかないこともありますが、自分の回線や端末の問題なら対処できる可能性があります。",
        "このページでは、サイトが本当にダウンしているのか確認するための基本的な見方を整理しています。",
      ]}
      sections={[
        {
          type: "p",
          title: "最初にやるべきこと",
          body: [
            "まず、そのURLが外部から応答しているかを確認します。もっとも分かりやすいのは、接続チェックツールでHTTPステータスや応答時間を見てみることです。",
            <>
              まずは{" "}
              <Link href="/" className="underline hover:no-underline">
                接続チェックツール
              </Link>{" "}
              で確認してください。
            </>,
          ],
        },
        {
          type: "list",
          title: "サイト停止を疑いやすいサイン",
          items: [
            "複数の端末や回線で同じように開かない",
            "エラーが一時的ではなく継続している",
            "公式ステータスやSNSでも障害情報が出ている",
            "特定の自分だけでなく広く報告が出ている",
          ],
        },
        {
          type: "p",
          title: "自分の環境の問題を疑うべきケース",
          body: [
            "スマホ回線では見えるのに自宅Wi-Fiでは開かない、別の端末では使える、自分だけ特定のブラウザで失敗する、といった場合はサイト全体の障害ではない可能性が高くなります。",
            "この場合はDNS、Wi-Fi、ブラウザ、VPN、端末設定などを見直す方が有効です。",
          ],
        },
        {
          type: "p",
          title: "別回線・別端末で比べる",
          body: [
            "もっとも手早い確認方法は、回線と端末を変えて比較することです。PCのWi-Fiで開かないなら、スマホのモバイル回線でも同じURLを試してみてください。",
            "環境を変えるだけで結果が変わるなら、サイト停止よりも自分側の問題を優先して考えるべきです。",
          ],
        },
        {
          type: "p",
          title: "関連する原因を確認する",
          body: [
            <>
              サイト全体ではなく自分側の可能性がある場合は{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/internet-not-working"
                className="underline hover:no-underline"
              >
                インターネットにつながらない原因
              </Link>
              、{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNSトラブルシューティング
              </Link>{" "}
              のページも参考になります。
            </>,
          ],
        },
        {
          type: "p",
          title: "サービス側の公式情報も見る",
          body: [
            "大きなサービスなら、公式ステータスページや公式SNSで障害情報を出していることがあります。特にログイン不能、API障害、アプリ障害などは、サイト本体とは別に発表されることもあります。",
            "ただし、公式情報が出る前に利用者側で症状が先に出ることもあるため、公式発表だけで判断しない方が安全です。",
          ],
        },
        {
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "接続チェックツールでURLを確認する",
            "別の端末で試す",
            "別の回線で試す",
            "公式ステータスや障害情報を確認する",
            "自分のDNS、Wi-Fi、ブラウザ設定を疑う",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "一つの環境だけで判断しないことが大切です。端末、回線、ブラウザを変えても同じならサイト側、変えると直るなら自分側の問題の可能性が高くなります。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "サイトが落ちているか確認するときは、まず外部からの応答を見て、そのうえで別端末・別回線で比較するのが基本です。",
            "最初の切り分けができるだけで、待つべきか、自分で直せるかの判断がかなりしやすくなります。",
          ],
        },
      ]}
      updatedAt="2026-03-06"
    />
  );
}