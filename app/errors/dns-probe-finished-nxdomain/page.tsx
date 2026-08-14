import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "DNS_PROBE_FINISHED_NXDOMAINとは？原因と直し方 | サイトダウン",
  description:
    "DNS_PROBE_FINISHED_NXDOMAIN の意味、DNSの仕組み、原因、最短で直す方法（DNS変更・キャッシュ削除など）を解説します。",
};

export default function DnsProbeFinishedPage() {
  return (
    <EvergreenPageShell
      h1="DNS_PROBE_FINISHED_NXDOMAINとは？原因と直し方"
      updatedAt="2026-03-03"
      lead={[
        "DNS_PROBE_FINISHED_NXDOMAIN は「そのドメイン名が存在しない、またはDNSで見つからない」ことを意味するエラーです。",
        "簡単に言うと、ブラウザが『そのサイトの住所（IP）をDNSで見つけられなかった』状態です。まずは“入力ミス”“ドメイン自体の問題”“自分のDNS環境の不調”を確認するのが最短です。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "URLの綴り、www有無、余計な記号がないかを最初に確認する",
            "別端末や別回線でも同じなら、サイト側のドメイン失効やDNS設定不備を疑う",
            "自分の回線だけで出るなら、ISP DNS不調や端末・ルーターのDNSキャッシュ不整合を疑う",
            "このエラーはHTTP前の段階なので、サーバーダウンよりDNS・ドメイン側の問題であることが多い",
          ],
        },

        {
          type: "list",
          title: "まず結論：NXDOMAINで起きていること",
          items: [
            "DNSが「そのドメインは存在しない（見つからない）」と判断している",
            "サーバーに到達する前に止まっている（HTTPの前段の問題）",
            "原因は「URLミス」か「ドメイン/ DNS設定」か「DNSサーバー不調」が中心",
          ],
        },

        {
          type: "list",
          title: "よくある原因",
          items: [
            "ドメイン名の入力ミス（typo、wwwの有無、全角混在など）",
            "サイト側がドメインを失効/停止している（更新切れ、解約など）",
            "DNSレコードの設定ミス（A/AAAA/CNAMEの誤り、反映途中）",
            "DNSサーバーの障害（ISPのDNS不具合、キャッシュ不整合）",
            "PCやルーター側のDNSキャッシュが壊れている/古い",
            "会社/学校ネットワークで特定ドメインがフィルタされている",
          ],
        },

        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) URLスペルを確認（コピペ推奨。www有無、余計な記号、全角混在に注意）",
            "2) 別回線で試す（Wi-Fi→モバイル回線。ISP側DNS不調の確認）",
            "3) ルーター再起動（DNSキャッシュ/回線状態のリセット）",
            "4) DNSをパブリックDNSに変更（Google/Cloudflare等）",
            "5) OSのDNSキャッシュ削除（Windows/macOS）",
          ],
        },

        {
          type: "list",
          title: "原因の見分け方",
          items: [
            "URLを打ち直したら直るなら、単純な入力ミスの可能性が高い",
            "どの端末・どの回線でも同じなら、ドメイン失効やサイト側DNS設定ミスの可能性が高い",
            "自宅Wi-Fiでは出るがモバイル回線では出ないなら、自分の回線やISP DNS側の可能性が高い",
            "サイト移転やDNS変更の直後なら、設定ミスではなく伝播待ちの可能性もある",
          ],
        },

        {
          type: "p",
          title: "似たDNSエラーとの違い",
          body: [
            <>
              NXDOMAIN は『そのドメインが見つからない』系の代表的な表示ですが、ブラウザによっては{" "}
              <Link
                href="/errors/err-name-not-resolved"
                className="underline hover:no-underline"
              >
                ERR_NAME_NOT_RESOLVED
              </Link>{" "}
              のような文言で出ることもあります。どちらも名前解決の失敗を示しますが、見えている文言よりも「URLミス・サイト側DNS・自分のDNS環境のどこで止まっているか」を確認する方が重要です。
            </>,
          ],
        },

        {
          type: "list",
          title: "パブリックDNSの代表例",
          items: [
            "Google Public DNS：8.8.8.8 / 8.8.4.4",
            "Cloudflare DNS：1.1.1.1 / 1.0.0.1",
          ],
        },

        {
          type: "note",
          title: "DNS設定の具体手順はこちら",
          body: [
            "端末やルーターでの設定手順をまとめています。",
            <Link
              key="dns"
              href="/troubleshooting-dns"
              className="text-sky-600 font-bold underline"
            >
              → DNSエラーの直し方（パブリックDNS設定ガイド）
            </Link>,
            <>
              サイト移転やネームサーバー変更の直後であれば、{" "}
              <Link
                href="/troubleshooting/dns-propagation"
                className="underline hover:no-underline"
              >
                DNS伝播
              </Link>{" "}
              の整理もあわせて見ると、待つべきケースか設定ミスを疑うべきケースかを判断しやすくなります。
            </>,
          ],
        },

        {
          type: "list",
          title: "運営者側の確認ポイント（サイト管理者向け）",
          items: [
            "ドメインの有効期限（失効していないか）と、DNS管理画面のネームサーバー設定",
            "A/AAAA/CNAMEの設定ミスや削除がないか（直近の変更履歴も確認）",
            "DNSの反映待ち（変更直後は伝播に時間がかかることがある）",
            "CDNやホスティング移行時の向き先不整合（旧レコードや誤ったCNAMEが残っていないか）",
          ],
        },

        {
          type: "div",
          title: "このエラーが「サイト全体」か「自分だけ」か確認する",
          body: [
            "NXDOMAINは多くの場合DNSの問題ですが、外部地点からも同じ状態かを確認しておくと、自分だけの問題かサイト全体の問題かを早く確認られます。",
            <div
              key="cta"
              className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm font-bold text-slate-900">
                外部から到達できるかをチェック →
              </p>
              <Link
                href="/"
                className="mt-2 inline-block text-sky-600 font-bold underline"
              >
                サイトダウンで接続チェックする
              </Link>
              <p className="mt-2 text-xs text-slate-600">
                こちらでも到達できないなら、URLミス、ドメイン失効、DNS設定問題の可能性が高くなります。
              </p>
            </div>,
            <>
              ほかのサイトは開くのに対象ドメインだけ失敗する症状として整理したいときは{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かないときの確認
              </Link>{" "}
              も近い入口です。
            </>,
          ],
        },

        {
          type: "p",
          title: "こんなケースはNXDOMAINと相性がいい",
          body: [
            "『昨日まで開いていたのに今日だけ突然見つからない』『特定の新しいドメインだけ失敗する』『引っ越しやサーバー移転後から開かない』といった症状は、NXDOMAINでよく見られます。",
            "特にサイト移行直後は、旧設定の消し忘れ、ネームサーバー変更ミス、伝播途中の不整合が原因になりやすく、ユーザー側では待つしかないケースもあります。",
          ],
        },

        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. これはサーバーダウンですか？ → 多くの場合は違います。HTTPの前段（DNS）で止まっています。",
            "Q. さっきまで見れていたのに突然NXDOMAINになりました。 → DNS障害、キャッシュ不整合、ドメイン失効/設定変更などが考えられます。別回線とパブリックDNSで確認が有効です。",
            "Q. DNSを変えるのは安全ですか？ → 一般的に問題ありません。信頼できるパブリックDNS（Google/Cloudflareなど）を使い、戻し方も把握しておくと安心です。",
            "Q. どれくらいで直りますか？ → URLミスなら即時。DNS障害/設定変更なら数分〜数時間かかることもあります。ドメイン失効なら運営者対応が必要です。",
          ],
        },

        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks
              key="related"
              currentSlug="dns-probe-finished-nxdomain"
            />,
          ],
        },
      ]}
    />
  );
}
