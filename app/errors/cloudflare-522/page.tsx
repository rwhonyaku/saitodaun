import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "Cloudflare 522 Connection timed outとは？原因と確認方法 | サイトダウン",
  description:
    "Cloudflare 522 Connection timed out の意味、サイト側か自分側かの最短確認、待つべきケース、520/524など関連エラーとの違いを整理します。",
};

export default function Cloudflare522Page() {
  return (
    <EvergreenPageShell
      h1="Cloudflare 522 Connection timed outとは？原因と確認方法"
      updatedAt="2026-04-16"
      lead={[
        "Cloudflareエラー522（Connection timed out）は、Cloudflareがオリジンサーバーに接続できず、タイムアウトしたときに発生します。",
        "多くの場合、これはサーバー側の問題であり、ユーザー側では解決できないケースがほとんどです。",
        "まずは他の回線や端末でも同じかを確認し、状況を確認しましょう。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短の確認",
          items: [
            "他のサイトは正常に開けるか確認する",
            "スマホ回線（4G/5G）でも同じ522が出るか試す",
            "しばらく時間をおいてから再試行する",
          ],
        },
        {
          type: "p",
          title: "まず知っておきたいこと",
          body: [
            "522は、ブラウザとCloudflareの間ではなく、Cloudflareとオリジンサーバーの間で詰まっているときに出やすいエラーです。",
            "そのため、他のサイトが普通に開けていて、このサイトだけで522が出るなら、ユーザー側よりサイト側の問題を優先して考えるのが自然です。",
          ],
        },
        {
          type: "note",
          title: "次に見るべき関連ページ",
          body: [
            <div key="routes" className="space-y-2">
              <p>
                サイト全体の障害か確認したいときは{" "}
                <Link
                  href="/outages/japan"
                  className="font-bold underline text-sky-600"
                >
                  障害情報の確認
                </Link>
              </p>
              <p>
                自分の回線全体も不安定なら{" "}
                <Link
                  href="/troubleshooting/internet-not-working"
                  className="font-bold underline text-sky-600"
                >
                  インターネットが使えないときの確認
                </Link>
              </p>
              <p>
                近いCloudflareエラーは{" "}
                <Link
                  href="/errors/cloudflare-520"
                  className="font-bold underline text-sky-600"
                >
                  Cloudflare 520
                </Link>{" "}
                と{" "}
                <Link
                  href="/errors/cloudflare-524"
                  className="font-bold underline text-sky-600"
                >
                  Cloudflare 524
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "list",
          title: "ユーザー側でやることは多くない",
          items: [
            "他のサイトまで開けないなら自分の回線側を確認する",
            "このサイトだけなら何度も連打せず、少し待ってから再試行する",
            "公式ステータスやサービス側の告知があればそちらを優先して確認する",
          ],
        },
        {
          type: "p",
          title: "待つのが最善なことが多い",
          body: [
            "多くの場合、サーバー側の問題は時間の経過で解消されるため、しばらく待ってから再試行するのが最も確実です。",
          ],
        },
        {
          type: "note",
          title: "別経路で確認したいとき",
          body: [
            "一部のネットワーク環境では、接続経路の問題によりタイムアウトが発生する場合があります。",
            "別回線や別経路での接続を確認する方法の一つとして、VPNを使って接続経路を切り替えて試すこともできます。",
            <Link
              key="vpn-guide"
              href="/vpn"
              className="font-bold underline text-sky-600"
            >
              → VPNが役立つ条件と注意点を確認する
            </Link>,
          ],
        },
        {
          type: "list",
          title: "522と似たエラーとの違い",
          items: [
            "Cloudflare 520：オリジンから想定外の応答が返っているときに出やすい",
            "Cloudflare 524：接続自体はできているが、応答待ちが長すぎるときに出やすい",
            "SSL Handshake Failed：タイムアウトではなく、TLSの確立段階で失敗している",
          ],
        },
        {
          type: "div",
          title: "この問題がサイト全体か、自分だけかを確認する",
          body: [
            "522はサイト側の問題であることが多いものの、回線や経路差がゼロとは限りません。外部から見ても応答できないか確認しておくと確認が早くなります。",
            <div
              key="cta"
              className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm font-bold text-slate-900">
                外部から到達できるかをチェック →
              </p>
              <Link
                href="/"
                className="mt-2 inline-block font-bold underline text-sky-600"
              >
                サイトダウンで接続チェックする
              </Link>
            </div>,
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [<ErrorRelatedLinks key="related" currentSlug="cloudflare-522" />],
        },
      ]}
    />
  );
}
