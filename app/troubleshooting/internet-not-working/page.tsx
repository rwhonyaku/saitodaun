import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "インターネットにつながらない原因と対処法",
  description:
    "インターネットにつながらないときの原因と対処法を解説します。回線障害、Wi-Fi、DNS、ルーター、端末設定などを順番に確認する方法を紹介します。",
  alternates: { canonical: "/troubleshooting/internet-not-working" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="インターネットにつながらない原因と対処法"
      lead={[
        "突然インターネットにつながらなくなることはよくあります。どのサイトも開かない、アプリが通信できない、検索ができないなどの症状が出る場合、原因は回線障害、Wi-Fi、DNS、ルーター、端末設定などさまざまです。",
        "重要なのは、ネット全体の問題なのか、自分の環境の問題なのかを順番に確認することです。慌てて設定を変える前に、まず状況を整理すると原因が見えやすくなります。",
        "このページでは、インターネットにつながらないときに確認したい原因と対処法を、実際のトラブルでよくある順番にまとめています。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "家のすべての端末で同時にだめなら、回線障害かルーター側を優先して疑う",
            "自分の端末だけだめなら、端末設定、Wi-Fi設定、VPN、セキュリティソフトを優先して疑う",
            "Wi-Fiではだめでもモバイル回線なら使えるなら、自宅ネットワークやDNS側の問題に絞りやすい",
            "どの回線でも特定サイトだけだめなら、インターネット全体ではなく接続先サイト側の問題を疑う",
          ],
        },
        {
          type: "p",
          title: "まず状況を整理する",
          body: [
            "最初に確認したいのは、どこまで通信できているのかです。Wi-Fiには接続できているのか、モバイル通信では使えるのか、ほかの端末では正常なのかを確認すると原因の候補がかなり絞れます。",
            "例えば、スマホのモバイル通信では使えるのに自宅Wi-Fiでは使えない場合、回線やルーター側の問題の可能性が高くなります。逆に、どの回線でも同じサイトだけ開かない場合は、そのサイト側の問題かもしれません。",
            <>
              特定のサイトだけ開かない場合は{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              のページも参考になります。
            </>,
          ],
        },
        {
          type: "list",
          title: "インターネットにつながらない主な原因",
          items: [
            "回線事業者やプロバイダの障害",
            "ルーターやモデムの一時的な不具合",
            "Wi-Fi接続の問題",
            "DNSの設定やキャッシュの問題",
            "端末設定やネットワーク設定の不具合",
            "VPNやセキュリティソフトの影響",
            "公共Wi-Fiのログイン制限",
          ],
        },
        {
          type: "list",
          title: "症状ごとの見分け方",
          items: [
            "どのサイトも開かず、アプリも通信できないなら、回線・ルーター・DNSを優先して疑う",
            "Wi-Fiだけだめでモバイル回線は使えるなら、自宅ネットワークやWi-Fi設定の問題を疑う",
            "自分のPCやスマホだけだめなら、端末設定や保存済みネットワーク情報を疑う",
            "一部サイトだけだめなら、インターネット全体ではなく接続先やブラウザ側の問題を疑う",
          ],
        },
        {
          type: "p",
          title: "回線障害の可能性を確認する",
          body: [
            "急にすべてのサイトやサービスが使えなくなった場合、回線事業者やプロバイダ側で障害が起きている可能性があります。",
            "特に家のすべての端末で同時に通信できない場合は、個別設定ではなく回線側の問題であることが多いです。",
            <>
              日本国内で広域障害が起きているかどうかは{" "}
              <Link href="/outages/japan" className="underline hover:no-underline">
                ネット障害の確認ページ
              </Link>{" "}
              で確認できます。
            </>,
          ],
        },
        {
          type: "p",
          title: "ルーターやモデムの問題",
          body: [
            "家庭用ネットワークでは、ルーターやモデムの一時的な不具合で通信が止まることがあります。長時間稼働している機器では特に起こりやすいです。",
            "ルーターとモデムを再起動するだけで復旧するケースも多くあります。電源を切って数十秒待ってから再起動すると通信が回復することがあります。",
            <>
              ルーター寄りの問題を詳しく見たい場合は{" "}
              <Link
                href="/troubleshooting/router-not-working"
                className="underline hover:no-underline"
              >
                ルーターがつながらない原因
              </Link>{" "}
              も確認してください。
            </>,
          ],
        },
        {
          type: "p",
          title: "Wi-Fi接続の問題",
          body: [
            "インターネットにつながらないように見えても、実際にはWi-Fi接続の問題であることもあります。端末がルーターに正しく接続できていない場合、通信ができません。",
            <>
              Wi-Fiに問題がある場合は{" "}
              <Link
                href="/troubleshooting/wifi-not-working"
                className="underline hover:no-underline"
              >
                Wi-Fiがつながらない原因
              </Link>{" "}
              を確認してください。スマホ回線では使えるのに Wi-Fi だけだめなら{" "}
              <Link
                href="/troubleshooting/website-loads-on-phone-not-wifi"
                className="underline hover:no-underline"
              >
                スマホ回線では開くのにWi-Fiでは開かないケース
              </Link>{" "}
              も近い症状です。
            </>,
          ],
        },
        {
          type: "p",
          title: "DNSの問題",
          body: [
            "DNSはドメイン名をIPアドレスに変換する仕組みです。この名前解決が失敗すると、インターネット自体が使えないように見えることがあります。",
            "DNSキャッシュの問題やDNSサーバーのトラブルで、特定サイトや全体通信に影響が出ることがあります。Wi-Fiにはつながっているのにサイトが開かない場合は、DNSが原因であることも少なくありません。",
            <>
              DNSのトラブルが疑われる場合は{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNSトラブルシューティング
              </Link>{" "}
              を確認してください。アプリはだめでもブラウザは使える、またはその逆という見え方なら{" "}
              <Link
                href="/troubleshooting/internet-working-but-apps-not-loading"
                className="underline hover:no-underline"
              >
                インターネットは使えるのにアプリが読み込めないケース
              </Link>{" "}
              の整理も役立ちます。
            </>,
          ],
        },
        {
          type: "p",
          title: "公共Wi-Fiやログイン制限",
          body: [
            "カフェ、ホテル、空港などの公共Wi-Fiでは、接続後にログイン画面や利用規約画面を表示しないと通信できない場合があります。",
            <>
              この画面が表示されないと、Wi-Fiには接続されているのにインターネットが使えない状態になります。ネット全体が落ちているように見えても、実際はログイン未完了だけということもあります。公共Wi-Fi でログイン画面が出ないときは{" "}
              <Link
                href="/troubleshooting/public-wifi-login-page-not-showing"
                className="underline hover:no-underline"
              >
                公共Wi-Fiでログイン画面が出ない原因
              </Link>{" "}
              も確認してください。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "ほかの端末でもインターネットが使えないか確認する",
            "Wi-Fiとモバイル回線の両方で試す",
            "ルーターとモデムを再起動する",
            "Wi-Fi設定を一度オフにして再接続する",
            "VPNやセキュリティアプリを確認する",
            "DNS設定を確認する",
            "ネット障害が発生していないか確認する",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "自分の端末だけ通信できない場合は端末設定の可能性が高く、家のすべての端末で同時に通信できない場合は回線やルーターの問題の可能性が高くなります。大切なのは『ネット全体がだめなのか』『Wi-Fiだけだめなのか』『自分の端末だけだめなのか』を分けて考えることです。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "インターネットにつながらないときは、回線障害、Wi-Fi、DNS、ルーター、端末設定など複数の原因が考えられます。",
            "最初に状況を整理し、どの端末・どの回線で問題が起きているかを確認すると、原因を効率よく確認することができます。",
            <>
              サイト単位の確認には{" "}
              <Link href="/" className="underline hover:no-underline">
                接続チェックツール
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
