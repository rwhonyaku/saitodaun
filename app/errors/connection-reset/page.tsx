import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "ERR_CONNECTION_RESETとは？接続がリセットされた原因と確認方法",
  description:
    "ERR_CONNECTION_RESET（接続がリセットされました）の意味、回線/VPN/プロキシ/ファイアウォール/サーバー側切断の切り分け、最短確認を解説します。",
  alternates: { canonical: "/errors/connection-reset" },
};

export default function ConnectionResetPage() {
  return (
    <EvergreenPageShell
      h1="ERR_CONNECTION_RESETとは？接続がリセットされた原因と確認方法"
      updatedAt="2026-10-09"
      lead={[
        "ERR_CONNECTION_RESET は、通信中に接続が途中で強制的に切断（リセット）されたことを意味します。",
        "原因は「回線や端末側の干渉（VPN/セキュリティ/プロキシ等）」の場合もあれば、「サーバー側が接続を落としている」場合もあります。まずは“自分だけ”か“サイト側”かを確認するのが最短です。",
      ]}
      sections={[
        {
          type: "list",
          title: "まず結論：ERR_CONNECTION_RESETで起きていること",
          items: [
            "ブラウザと接続先の通信が始まった後、途中で強制的に切断された状態",
            "接続先だけでなく、ルーター、プロキシ、VPN、WAFなどが通信を切断している場合もある",
            "別回線と外部からの接続結果を比べると、自分側かサイト側かを早く切り分けられる",
          ],
        },

        {
          type: "div",
          title: "外部からも接続できないか確認する",
          body: [
            "対象サイトだけでエラーが出る場合は、外部サーバーから同じURLへ到達できるか確認します。外部からも失敗するなら、サイト側や接続経路の問題を優先して疑えます。",
            <div
              key="cta"
              className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm font-bold text-slate-900">
                対象URLを外部サーバーから確認 →
              </p>
              <Link
                href="/"
                className="mt-2 inline-block text-sky-600 font-bold underline"
              >
                サイトダウンで接続チェックする
              </Link>
            </div>,
          ],
        },

        {
          type: "list",
          title: "結果別の最短確認",
          items: [
            <span key="all-sites">他のサイトも開けない：<Link href="/troubleshooting/internet-not-working" className="underline">回線やWi-Fiの状態</Link>を先に確認する</span>,
            "このサイトだけ開けない：Wi-Fiとモバイル回線を切り替え、結果が変わるか確認する",
            "回線を変えると開く：VPN、プロキシ、会社・学校のフィルター、ルーター側の干渉を疑う",
            "別回線でも外部チェックでも失敗する：サイト側のサーバー、WAF、ロードバランサの問題を疑う",
          ],
        },

        {
          type: "list",
          title: "自分の環境だけで起きる場合",
          items: [
            "VPNやプロキシを一時的にオフにし、同じURLを再確認する",
            "シークレットモードで開き、ブラウザ拡張機能の影響を切り分ける",
            "Wi-Fiが不安定なら、ルーターと端末を再起動してから再確認する",
            "セキュリティソフトを確認する場合は、保護を長時間解除せず、短い確認後すぐ元の設定へ戻す",
          ],
        },

        {
          type: "note",
          title: "DNSを確認する条件",
          body: [
            "DNS変更は通常の最初の対処ではありません。接続先が回線によって変わる、名前解決エラーも出る、古いサーバーへ接続している疑いがある場合に確認します。",
            <Link
              key="dns"
              href="/troubleshooting-dns"
              className="text-sky-600 font-bold underline"
            >
              DNSの確認手順を見る →
            </Link>,
          ],
        },

        {
          type: "list",
          title: "サイト管理者が確認すること",
          items: [
            "WAF、CDN、ロードバランサのログで遮断やレート制限が発生していないか確認する",
            "アプリとサーバーのログでクラッシュ、再起動、接続数上限の兆候を確認する",
            "CDNやロードバランサからオリジンまでのTLS、SNI、HTTP設定を確認する",
            "オリジンまでの経路で瞬断、パケット損失、ルーティング異常がないか確認する",
            "発生時刻、対象URL、利用回線ごとにログを比較し、特定条件だけで切断されていないか確認する",
          ],
        },

        {
          type: "list",
          title: "似た接続エラーとの違い",
          items: [
            <span key="refused"><Link href="/errors/err-connection-refused" className="underline">ERR_CONNECTION_REFUSED</Link>：接続先が接続要求を拒否した</span>,
            <span key="timed-out"><Link href="/errors/err-connection-timed-out" className="underline">ERR_CONNECTION_TIMED_OUT</Link>：時間内に接続または応答が得られなかった</span>,
            "ERR_CONNECTION_RESET：始まった通信が途中で強制的に切断された",
            <span key="empty"><Link href="/errors/err-empty-response" className="underline">ERR_EMPTY_RESPONSE</Link>：接続先から応答データを受け取れなかった</span>,
          ],
        },

        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks key="related" currentSlug="connection-reset" />,
          ],
        },
      ]}
    />
  );
}
