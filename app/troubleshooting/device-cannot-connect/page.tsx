import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "端末だけインターネットにつながらない原因と対処法",
  description:
    "スマホやパソコンなど特定の端末だけインターネットにつながらないときの原因と対処法を解説します。Wi-Fi設定、DNS、VPN、端末側の不具合を切り分ける方法を紹介します。",
  alternates: { canonical: "/troubleshooting/device-cannot-connect" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="端末だけインターネットにつながらない原因と対処法"
      lead={[
        "家のWi-Fiや回線自体は動いているのに、自分のスマホやパソコンだけインターネットにつながらないことがあります。この場合は回線全体ではなく、端末側の設定や一時的な不具合を疑うべきです。",
        "同じネットワークでも別の端末では使えるなら、ルーターやプロバイダ障害よりも、その端末固有の問題である可能性が高くなります。",
        "このページでは、特定の端末だけ通信できないときに確認したい原因と対処法を順番に整理しています。",
      ]}
      sections={[
        {
          type: "p",
          title: "まず本当に端末だけの問題か確認する",
          body: [
            "最初に確認したいのは、ほかの端末では正常に通信できるかどうかです。家族のスマホ、別のノートPC、タブレットなどで同じWi-Fiに接続してみると、問題の範囲が見えやすくなります。",
            "ほかの端末でも同時に通信できない場合は、端末ではなくルーターや回線全体の問題かもしれません。",
            <>
              複数端末で同時に通信できない場合は{" "}
              <Link
                href="/troubleshooting/internet-not-working"
                className="underline hover:no-underline"
              >
                インターネットにつながらない原因
              </Link>{" "}
              も確認してください。
            </>,
          ],
        },
        {
          type: "list",
          title: "端末だけつながらない主な原因",
          items: [
            "Wi-Fi設定の不具合",
            "機内モードや通信設定の誤り",
            "VPNやセキュリティアプリの影響",
            "端末側のDNS設定やキャッシュの問題",
            "IPアドレス取得の失敗",
            "OSやネットワーク設定の一時的不具合",
          ],
        },
        {
          type: "p",
          title: "Wi-Fiの再接続を試す",
          body: [
            "端末だけ接続できない場合は、まずWi-Fiを一度オフにして再接続してみてください。保存済みネットワークを削除して、再度パスワードを入力し直すと直ることもあります。",
            "特にスマホでは、見た目上は接続済みでも内部的には通信できていない状態になることがあります。",
            <>
              Wi-Fi全体のトラブルが疑われる場合は{" "}
              <Link
                href="/troubleshooting/wifi-not-working"
                className="underline hover:no-underline"
              >
                Wi-Fiがつながらない原因
              </Link>{" "}
              も参考になります。
            </>,
          ],
        },
        {
          type: "p",
          title: "モバイル回線でも試してみる",
          body: [
            "スマホであれば、Wi-Fiを切ってモバイル通信で同じサイトやアプリを試してみてください。モバイル回線では正常なら、その端末のWi-Fi設定か自宅ネットワークとの相性が原因の可能性が高くなります。",
            "逆にWi-Fiでもモバイルでも同じ症状が出る場合は、端末のDNS設定、VPN、アプリ設定などを疑った方が自然です。",
          ],
        },
        {
          type: "p",
          title: "VPNやセキュリティアプリの影響を確認する",
          body: [
            "VPN、広告ブロッカー、セキュリティアプリが原因で通信が止まることがあります。特に海外VPNや企業向けセキュリティ設定を入れている端末では起こりやすいです。",
            "一時的にVPNや関連アプリをオフにして試すと、原因の切り分けがしやすくなります。",
          ],
        },
        {
          type: "p",
          title: "DNSやネットワーク設定の問題",
          body: [
            "端末に手動DNS設定を入れている場合、それが古い設定や不安定なDNSサーバーになっている可能性があります。DNSキャッシュが壊れているケースもあります。",
            <>
              DNSの仕組みや切り分け方法については{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNSトラブルシューティング
              </Link>{" "}
              を確認してください。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "ほかの端末では正常か確認する",
            "Wi-Fiをオフにして再接続する",
            "保存済みWi-Fiを削除して再設定する",
            "スマホならモバイル通信でも試す",
            "VPNやセキュリティアプリを一時的に無効にする",
            "端末を再起動する",
            "DNSやネットワーク設定を見直す",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "同じWi-Fiでほかの端末は正常なら、ルーターや回線全体よりも、その端末の設定やアプリが原因である可能性が高くなります。問題の範囲を狭く見ると対処しやすくなります。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "特定の端末だけインターネットにつながらないときは、Wi-Fi設定、VPN、DNS、端末側の一時的不具合などが主な原因です。",
            "回線全体の問題か端末だけの問題かを先に切り分けることで、無駄な設定変更を減らしながら原因を特定しやすくなります。",
            <>
              特定のサイトだけ開かない場合は{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              も役立ちます。
            </>,
          ],
        },
      ]}
      updatedAt="2026-03-06"
    />
  );
}