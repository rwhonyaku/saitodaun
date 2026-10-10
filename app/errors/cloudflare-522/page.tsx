import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "522エラーとは？Connection timed outの原因・対処",
  description:
    "Cloudflare 522 Connection timed out／522 No Reason Phraseの意味を解説。サイト側か自分側かの確認と、閲覧者・管理者が次にすべきことを整理します。",
  alternates: { canonical: "/errors/cloudflare-522" },
};

export default function Cloudflare522Page() {
  return (
    <EvergreenPageShell
      h1="522エラー（Connection timed out）とは？原因と対処"
      updatedAt="2026-10-09"
      lead={[
        "Cloudflare 522（Connection timed out）は、Cloudflareから接続先のWebサーバーへの接続が時間内に成立しなかったことを示します。",
        "ほかのサイトが開き、別回線でも同じ522が出るなら、サイト側の問題である可能性が高く、閲覧者は復旧を待つのが基本です。",
      ]}
      sections={[
        {
          type: "list",
          title: "522エラーの最短判断",
          items: [
            "他のサイトは正常に開けるか確認する",
            "スマホ回線（4G/5G）でも同じ522が出るか試す",
            "両方で同じなら、リロードを繰り返さず時間をおいて再試行する",
          ],
        },
        {
          type: "div",
          title: "外部からも接続できないか確認する",
          body: [
            "別回線でも同じ表示になる場合は、外部から見ても対象サイトへ到達できないか確認すると、サイト側と自分の環境を切り分けやすくなります。",
            <div
              key="cta"
              className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm font-bold text-slate-900">
                対象URLを外部サーバーから確認 →
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
          type: "p",
          title: "「522 No Reason Phrase」と表示される場合",
          body: [
            "ツールやブラウザによっては「522 No Reason Phrase」と表示されます。これは別の障害ではなく、Cloudflare独自の522コードに対する説明文をそのツールが持っていないという表示です。確認手順は通常の522と同じです。",
          ],
        },
        {
          type: "list",
          title: "閲覧者が確認すること",
          items: [
            "他のサイトまで開けないなら自分の回線側を確認する",
            "対象サイトだけなら、何度もリロードせず少し待ってから再試行する",
            "改善しない場合は、対象URL・発生時刻とタイムゾーン・エラー画面のRay IDをサイト管理者へ伝える",
          ],
        },
        {
          type: "list",
          title: "サイト管理者が確認すること",
          items: [
            "オリジンサーバーが稼働し、Cloudflareからの接続を受け付けているか確認する",
            "ファイアウォールやレート制限がCloudflareのIPアドレスを遮断していないか確認する",
            "サーバー負荷、接続数、パケット損失をホスティング事業者のログで確認する",
            "Cloudflare DNSに設定したオリジンIPが現在のサーバーIPと一致しているか確認する",
            "オリジンサーバーでHTTP keepaliveが無効になっていないか確認する",
          ],
        },
        {
          type: "note",
          title: "Cloudflare公式の確認先",
          body: [
            "522は、Cloudflareがオリジンサーバーへの接続または接続後の確認応答を時間内に受け取れないときに発生します。管理者は公式手順とホスティング事業者の調査結果をあわせて確認してください。",
            <a
              key="cloudflare-docs"
              href="https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-522/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-sky-600"
            >
              Cloudflare公式：Error 522（英語） ↗
            </a>,
          ],
        },
        {
          type: "list",
          title: "522と似たエラーとの違い",
          items: [
            "Cloudflare 520：オリジンから想定外の応答が返っているときに出やすい",
            "Cloudflare 521：オリジンサーバーがCloudflareからの接続を拒否している",
            "Cloudflare 523：Cloudflareからオリジンサーバーへ到達できない",
            "Cloudflare 524：接続は成立したが、オリジンからのHTTP応答が時間内に返らない",
            <span key="browser-timeout">ブラウザに「ERR_CONNECTION_TIMED_OUT」と出る場合は <Link href="/errors/err-connection-timed-out" className="underline">接続タイムアウトの切り分け</Link>を確認する</span>,
            "SSL Handshake Failed：タイムアウトではなく、TLSの確立段階で失敗している",
          ],
        },
        {
          type: "note",
          title: "次に見るべき関連ページ",
          body: [
            <div key="routes" className="space-y-2">
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
                複数サービスで障害が疑われるときは{" "}
                <Link
                  href="/outages/japan"
                  className="font-bold underline text-sky-600"
                >
                  日本の障害情報
                </Link>
              </p>
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
