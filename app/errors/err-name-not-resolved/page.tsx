import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "ERR_NAME_NOT_RESOLVEDとは？原因と対処 | サイトダウン",
  description:
    "ERR_NAME_NOT_RESOLVED の意味、DNS設定やドメインの問題、ユーザー側での切り分け方法、NXDOMAINとの違いを実用的に解説します。",
};

export default function ErrNameNotResolvedPage() {
  return (
    <EvergreenPageShell
      h1="ERR_NAME_NOT_RESOLVEDとは？原因と対処"
      updatedAt="2026-04-11"
      lead={[
        "ERR_NAME_NOT_RESOLVED は、ブラウザがドメイン名をIPアドレスへ変換できなかったときに出るエラーです。",
        "簡単に言うと、サイト名の『住所検索』に失敗している状態です。多くはDNSまわりの問題ですが、URLミスやドメイン失効、ユーザー側のDNS不調など原因はいくつかに分かれます。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "URLの綴りやドメイン名が正しいかを最初に確認する",
            "別端末や別回線でも同じなら、サイト側DNSやドメイン状態を疑う",
            "自分の回線だけで出るなら、ISP DNSや端末・ルーターのDNSキャッシュを疑う",
            "HTTPエラーではなく名前解決エラーなので、サーバーダウンよりDNS側を優先して疑う",
          ],
        },
        {
          type: "list",
          title: "このエラーで起きていること",
          items: [
            "ブラウザがドメイン名から接続先IPアドレスを取得できていない",
            "サーバーに到達する前の段階で止まっている",
            "原因はURLミス、ドメイン失効、DNS設定不備、DNSサーバー不調などが中心",
          ],
        },
        {
          type: "list",
          title: "主な原因",
          items: [
            "ドメイン名の入力ミスやURLの貼り間違い",
            "サイト側のドメイン失効やDNS設定ミス",
            "DNSサーバーの障害や反映遅れ",
            "PCやルーター側の古いDNSキャッシュ",
            "会社・学校・公共Wi-Fiでの名前解決制限やフィルタ",
          ],
        },
        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) URLの綴りとドメイン名を見直す",
            "2) 別回線で試す（Wi-Fi→モバイル回線）",
            "3) ルーターと端末を再起動する",
            "4) DNSをパブリックDNSに切り替える",
            "5) ブラウザやOSのDNSキャッシュを疑う",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "どの端末・どの回線でも同じなら、サイト側のドメインやDNS設定の可能性が高い",
            "自宅Wi-Fiでは出るがモバイル回線では出ないなら、自分の回線やISP DNS側の可能性が高い",
            "新しいドメインや移転直後のサイトだけで出るなら、DNS反映途中や設定不整合の可能性がある",
            "会社・学校の回線だけで出るなら、ネットワーク側の制限やフィルタを疑いやすい",
          ],
        },
        {
          type: "p",
          title: "ERR_NETWORK_CHANGED やブラウザ不調とどう違うか",
          body: [
            "ERR_NAME_NOT_RESOLVED は『最初から接続先の名前が引けない』状態です。読み込み途中で経路が変わるエラーや、ブラウザ拡張が邪魔して開かない症状とは切り分け方が少し違います。",
            <>
              途中で回線条件が変わるなら{" "}
              <Link
                href="/errors/err-network-changed"
                className="underline hover:no-underline"
              >
                ERR_NETWORK_CHANGED
              </Link>{" "}
              が近く、ブラウザ依存なら{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザでサイトが開かない原因
              </Link>{" "}
              のほうが近い症状です。
            </>,
          ],
        },
        {
          type: "p",
          title: "DNS_PROBE_FINISHED_NXDOMAINとの違い",
          body: [
            "ERR_NAME_NOT_RESOLVED と DNS_PROBE_FINISHED_NXDOMAIN は、どちらも名前解決エラーとして近い意味で使われることがあります。",
            "実際の切り分け方もかなり似ていますが、どちらも『HTTPエラーではなく、ドメインを見つけられない段階で止まっている』と考えると理解しやすくなります。",
            <>
              近いエラーとしては{" "}
              <Link
                href="/errors/dns-probe-finished-nxdomain"
                className="underline hover:no-underline"
              >
                DNS_PROBE_FINISHED_NXDOMAIN
              </Link>{" "}
              のページも確認してください。
            </>,
          ],
        },
        {
          type: "p",
          title: "このエラーが『サイト全体』か『自分だけ』か確認する",
          body: [
            "別端末や別回線でも同じなら、ユーザー環境ではなくサイト側のドメインやDNS状態の可能性が高くなります。一方、自分の回線だけならローカルなDNS不調の可能性が高くなります。",
            <>
              DNSまわりを詳しく確認するなら{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNSトラブルシューティング
              </Link>{" "}
              を見てください。外部からの見え方を確認するなら{" "}
              <Link href="/" className="underline hover:no-underline">
                接続チェックツール
              </Link>{" "}
              も役立ちます。
            </>,
          ],
        },
        {
          type: "p",
          title: "スマホでは開くのにPCでだけ出る場合",
          body: [
            "同じURLでも、スマホでは見えるのにPCだけ ERR_NAME_NOT_RESOLVED が出るなら、PC側のDNS設定、社内ネットワーク、ブラウザ保存状態の差を疑いやすくなります。",
            <>
              端末差があるときは{" "}
              <Link
                href="/troubleshooting/site-works-on-phone-not-computer"
                className="underline hover:no-underline"
              >
                スマホでは開くのにパソコンで開かない原因
              </Link>{" "}
              も参考になります。
            </>,
          ],
        },
        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. これはサーバーダウンですか？ → 多くの場合は違います。名前解決の段階で止まっています。",
            "Q. 自分だけ出ることはありますか？ → あります。回線やDNSキャッシュの違いで局所的に発生します。",
            "Q. すぐ直りますか？ → URLミスならすぐ直ります。DNS不調や反映途中なら数分〜数時間かかることがあります。",
            "Q. 新しいサイトだけ出ます。なぜ？ → DNS設定直後や伝播途中の可能性があります。",
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks
              key="related"
              currentSlug="err-name-not-resolved"
            />,
          ],
        },
      ]}
    />
  );
}
