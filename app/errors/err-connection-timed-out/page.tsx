import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "ERR_CONNECTION_TIMED_OUTとは？原因と直し方 | サイトダウン",
  description:
    "ERR_CONNECTION_TIMED_OUT の意味、タイムアウトの典型原因（サイト側過負荷/回線/遮断/DNS）、ユーザー側でできる確認し、運営者側の改善ポイントを解説します。",
};

export default function TimeoutPage() {
  return (
    <EvergreenPageShell
      h1="ERR_CONNECTION_TIMED_OUTとは？原因と直し方"
      updatedAt="2026-03-03"
      lead={[
        "ERR_CONNECTION_TIMED_OUT は、サーバーに接続しようとしたが、一定時間内に応答（接続確立/通信）が返ってこなかったときに表示されるエラーです。",
        "サイト側の遅延・停止だけでなく、回線や途中の遮断でも起こります。まずは“自分だけ”か“サイト全体”かを確認するのが最短です。",
      ]}
      sections={[
        {
          type: "list",
          title: "まず結論：タイムアウトで起きていること",
          items: [
            "通信は開始したが、決められた時間内に接続/応答が完了しなかった（時間切れ）",
            "原因は「サイト側が遅い/落ちている」か「途中で届かない（回線/遮断/DNS）」のどちらかが多い",
            "ユーザー側で改善できるケースもあるため、順番に確認するのが重要",
          ],
        },

        {
          type: "list",
          title: "主な原因（サイト側）",
          items: [
            "サーバー停止・障害（応答できない）",
            "過負荷で遅延（同時アクセス増、ワーカー枯渇、DB遅延）",
            "バックエンド/外部API待ちで処理が詰まっている",
            "CDN/ロードバランサ/プロキシのタイムアウト設定と上流の遅延が噛み合っていない",
          ],
        },

        {
          type: "list",
          title: "主な原因（ユーザー側・ネットワーク側）",
          items: [
            "回線不調（Wi-Fi不安定、パケットロス、瞬断）",
            "会社/学校ネットワークやセキュリティ製品が通信を遮断している",
            "DNS不調で到達先が安定しない（特定サイトだけ起きる場合）",
            "VPN/プロキシの経路が遅い/不安定でタイムアウトする",
          ],
        },

        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) 別回線で試す：Wi-Fi→モバイル回線（4G/5G）へ（最速の確認）",
            "2) しばらく待って再試行（サイト側過負荷なら通ることがある）",
            "3) VPN/プロキシをオフ（または逆にVPNで経路を変える）",
            "4) ルーター/端末を再起動（Wi-Fiの詰まり・瞬断対策）",
            "5) シークレットモードで試す（拡張機能の影響を減らす）",
            "6) DNSをパブリックDNSに変更（特定サイトだけ不安定な場合）",
          ],
        },

        {
          type: "note",
          title: "DNSが怪しい場合はこちら",
          body: [
            "「特定のサイトだけ」開けない／回線で結果が変わる場合はDNSが原因のことがあります。",
            <Link
              key="dns"
              href="/troubleshooting-dns"
              className="text-sky-600 font-bold underline"
            >
              → DNSエラーの直し方（パブリックDNS設定ガイド）
            </Link>,
          ],
        },

        {
          type: "list",
          title: "運営者側の改善ポイント（サイト管理者向け）",
          items: [
            "どのURL/処理が遅いか特定（APM/ログ。特定ページだけならボトルネックがそこにある）",
            "DBの遅延（スロークエリ、インデックス、ロック、接続数）を確認",
            "外部API待ちを非同期化（キュー/バックグラウンド処理）し、タイムアウト設計を見直す",
            "キャッシュ導入（ページ/データ）で“同じ重い処理”の繰り返しを避ける",
            "タイムアウト設定の整合（CDN/LB/Proxyとアプリ側のタイムアウトを揃える）",
          ],
        },

        {
          type: "div",
          title: "このエラーが「サイト全体」か「自分だけ」か確認する",
          body: [
            "タイムアウトはサイト側要因でも、回線側要因でも起きます。外部地点から到達できるかを確認して、まず確認しましょう。",
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
                こちらで「オフライン」ならサイト側停止/遅延の可能性が高く、「オンライン」なのに見れない場合は回線/VPN/DNS/端末側の可能性が高いです。
              </p>
            </div>,
          ],
        },

        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. 504（Gateway Timeout）と同じですか？ → 近いですが違います。ERR_CONNECTION_TIMED_OUTはブラウザ側の表現、504はゲートウェイ/プロキシが上流の応答待ちで時間切れになったHTTPステータスです。",
            "Q. リロード連打は有効？ → 混雑/遅延時は逆効果になりやすいです。時間を置いて再試行し、別回線で確認するのが安全です。",
            "Q. 特定のサイトだけタイムアウトします。なぜ？ → DNS/回線経路差、社内ネットワークの遮断、またはそのサイト側の遅延が考えられます。別回線とDNS変更で確認が有効です。",
            "Q. どれくらい待てば直る？ → 一時的な過負荷なら数分〜数十分で戻ることもあります。長時間続く場合は運営者対応が必要な可能性が高いです。",
          ],
        },

        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks
              key="related"
              currentSlug="err-connection-timed-out"
            />,
          ],
        },
      ]}
    />
  );
}