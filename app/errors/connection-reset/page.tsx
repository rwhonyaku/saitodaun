import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "ERR_CONNECTION_RESETとは？接続がリセットされた原因と確認方法 | サイトダウン",
  description:
    "ERR_CONNECTION_RESET（接続がリセットされました）の意味、回線/VPN/プロキシ/ファイアウォール/サーバー側切断の切り分け、最短確認を解説します。",
};

export default function ConnectionResetPage() {
  return (
    <EvergreenPageShell
      h1="ERR_CONNECTION_RESETとは？接続がリセットされた原因と確認方法"
      updatedAt="2026-03-03"
      lead={[
        "ERR_CONNECTION_RESET は、通信中に接続が途中で強制的に切断（リセット）されたことを意味します。",
        "原因は「回線や端末側の干渉（VPN/セキュリティ/プロキシ等）」の場合もあれば、「サーバー側が接続を落としている」場合もあります。まずは“自分だけ”か“サイト側”かを確認するのが最短です。",
      ]}
      sections={[
        {
          type: "list",
          title: "まず結論：ERR_CONNECTION_RESETで起きていること",
          items: [
            "ブラウザはサーバーと通信を開始したが、途中で接続が突然切断された（RST/Reset相当）",
            "「相手サーバー」だけでなく、「途中のネットワーク機器（ルーター/プロキシ/WAF）」が切断している場合もある",
            "ユーザー側で直るケースもあるため、順番に確認するのが重要",
          ],
        },

        {
          type: "list",
          title: "主な原因（ユーザー側・ネットワーク側）",
          items: [
            "VPN/プロキシ/セキュリティソフトが通信を遮断・書き換えして切断している",
            "会社/学校のネットワークやフィルタリング機器が特定ドメインや通信をブロックしている",
            "ルーターやWi-Fiの不安定（瞬断、再接続、パケットロス）",
            "DNSの不整合で意図しない宛先に向かっている（結果として切断されることがある）",
            "ブラウザ拡張機能が通信に干渉している（広告ブロック/セキュリティ系など）",
          ],
        },

        {
          type: "list",
          title: "主な原因（サイト側）",
          items: [
            "サーバー/ロードバランサ/WAFが接続をリセットしている（レート制限、誤検知、設定）",
            "アプリ/バックエンドがクラッシュ・再起動して接続が切れる",
            "TLS/HTTP設定の不整合（プロトコル/暗号スイート/中継設定）で途中終了する",
            "過負荷により一部接続が落ちる（同時接続数上限、ワーカー枯渇）",
            "上流（オリジン）到達性が不安定で、中継が接続を維持できない",
          ],
        },

        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) 別回線で試す：Wi-Fi→モバイル回線（4G/5G）へ（最速の確認）",
            "2) VPN/プロキシをオフにして試す（一時的に無効化）",
            "3) シークレットモードで試す（拡張機能・キャッシュ影響を減らす）",
            "4) ルーター/端末の再起動（瞬断・DHCP再取得）",
            "5) セキュリティソフト/フィルタの一時停止（可能なら）",
            "6) DNS変更（特定サイトだけ不安定な場合）",
          ],
        },

        {
          type: "note",
          title: "DNSが原因っぽい場合",
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
          title: "運営者側の確認ポイント（サイト管理者向け）",
          items: [
            "WAF/CDN/ロードバランサのログでリセット・遮断が発生していないか確認（誤検知、Rate Limit）",
            "アプリ/サーバーログでクラッシュ・再起動・接続上限の兆候がないか確認",
            "TLS/HTTP設定（中継→オリジン）で不整合がないか（プロトコル、証明書、SNI、HTTP/2など）",
            "上流（オリジン）への到達性と安定性（瞬断、パケットロス、ルーティング）",
            "同時接続数やワーカー枯渇（過負荷）を疑い、キャパ/設定/キャッシュを見直す",
          ],
        },

        {
          type: "div",
          title: "このエラーが「サイト全体」か「自分だけ」か確認する",
          body: [
            "ERR_CONNECTION_RESET は手元要因でも起きます。外部地点から到達できるかを確認して、まず確認しましょう。",
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
                こちらで「オンライン」なのに自分だけ見れない場合は、回線/VPN/端末側の可能性が高いです。
              </p>
            </div>,
          ],
        },

        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. これってサーバーダウンですか？ → 必ずしもそうではありません。途中のネットワーク機器や端末側の干渉でも起こります。",
            "Q. リロード連打は有効ですか？ → 不安定な回線や遮断が原因だと悪化することがあります。別回線・VPNオフなどで確認するのが先です。",
            "Q. 特定のサイトだけ起きます。なぜ？ → そのドメインだけがフィルタ対象、または経路/中継設定の相性問題の可能性があります。",
            "Q. 直るまでどれくらい？ → 手元要因なら数分で解消することもあります。サイト側要因なら運営者対応次第です。",
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
