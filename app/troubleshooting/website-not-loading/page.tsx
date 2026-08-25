import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "サイトが開かないときの原因と確認",
  description:
    "サイトが開かない時に、一つのサイトだけか、全サイトか、特定の回線・端末・ブラウザだけかを切り分け、適切な確認手順へ案内します。",
  alternates: { canonical: "/troubleshooting/website-not-loading" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="サイトが開かないときの原因と確認"
      lead={[
        "サイトが開かない原因は、サイト側の障害、回線・DNS、端末、ブラウザ、アクセス制限に分かれます。",
        "このページは広い症状の入口です。下の結果に最も近い項目から、専用の確認ページへ進んでください。",
      ]}
      sections={[
        {
          type: "list",
          title: "最初に確認する4点",
          items: [
            "ほかのサイトは開くか",
            "同じURLがモバイル回線では開くか",
            "同じURLが別端末・別ブラウザでは開くか",
            "画面にHTTP番号や英語のエラー名が出ているか",
          ],
        },
        {
          type: "div",
          title: "症状から確認ページを選ぶ",
          body: [
            <div key="routes" className="grid gap-3 sm:grid-cols-2">
              <Link href="/troubleshooting/specific-site-not-working" className="rounded-xl border border-slate-200 p-4 hover:bg-sky-50"><strong>一つのサイトだけ開かない</strong><span className="mt-1 block text-sm">サイト障害・DNS・制限を切り分ける</span></Link>
              <Link href="/troubleshooting/internet-not-working" className="rounded-xl border border-slate-200 p-4 hover:bg-sky-50"><strong>どのサイトも開かない</strong><span className="mt-1 block text-sm">回線・Wi-Fi・ルーターを確認する</span></Link>
              <Link href="/troubleshooting/website-loads-on-phone-not-wifi" className="rounded-xl border border-slate-200 p-4 hover:bg-sky-50"><strong>モバイル回線なら開く</strong><span className="mt-1 block text-sm">Wi-Fi・DNS・回線制限を確認する</span></Link>
              <Link href="/troubleshooting/site-works-on-phone-not-computer" className="rounded-xl border border-slate-200 p-4 hover:bg-sky-50"><strong>スマホでは開くがPCでは開かない</strong><span className="mt-1 block text-sm">端末・ブラウザ差を確認する</span></Link>
              <Link href="/troubleshooting/browser-not-loading-sites" className="rounded-xl border border-slate-200 p-4 hover:bg-sky-50"><strong>特定ブラウザだけ開かない</strong><span className="mt-1 block text-sm">保存データ・拡張機能を確認する</span></Link>
              <Link href="/errors" className="rounded-xl border border-slate-200 p-4 hover:bg-sky-50"><strong>エラー番号・エラー名が出る</strong><span className="mt-1 block text-sm">表示されたコードから原因を探す</span></Link>
            </div>,
          ],
        },
        {
          type: "div",
          title: "ページは表示されるが使えない場合",
          body: [
            <div key="partial" className="space-y-3">
              <p>読み込み中のまま → <Link href="/troubleshooting/site-loads-forever" className="underline">読み込みが終わらない原因</Link></p>
              <p>画面が真っ白 → <Link href="/troubleshooting/site-opens-but-is-blank" className="underline">真っ白になる原因</Link></p>
              <p>ログインだけ失敗 → <Link href="/troubleshooting/site-opens-but-login-fails" className="underline">ログインできない原因</Link></p>
              <p>ボタンや送信だけ失敗 → <Link href="/troubleshooting/site-opens-but-buttons-do-not-work" className="underline">ボタンが反応しない原因</Link></p>
              <p>画像だけ出ない → <Link href="/troubleshooting/site-loads-without-images" className="underline">画像が表示されない原因</Link></p>
            </div>,
          ],
        },
        {
          type: "list",
          title: "判断の目安",
          items: [
            "複数端末・複数回線で同じなら、サイト側の障害やメンテナンスを優先する",
            "回線を変えると開くなら、元の回線・DNS・アクセス制限を優先する",
            "端末やブラウザを変えると開くなら、元の環境の保存データ・拡張機能・設定を優先する",
            "5xxはサイト側、403・429は制限、DNS・SSL名は名前解決や証明書が主な手がかりになる",
          ],
        },
        {
          type: "note",
          title: "最初から設定を変えすぎない",
          body: [
            <span key="check">まず <Link href="/" className="font-bold text-sky-600 underline">URLの接続チェック</Link>、別回線、別端末の順で比較してください。原因が絞れる前にDNSやセキュリティ設定を一度に変えると、何が効いたのか分からなくなります。</span>,
          ],
        },
      ]}
      updatedAt="2026-08-25"
    />
  );
}
