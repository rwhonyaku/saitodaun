import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "404 Not Foundとは？原因と対処 | サイトダウン",
  description:
    "404 Not Found の意味、URL間違い・ページ削除・リンク切れなどの原因、ユーザー側でできる対処、運営者側の改善（リダイレクト/404設計）を解説します。",
};

export default function Error404NotFoundPage() {
  return (
    <EvergreenPageShell
      h1="404 Not Foundとは？原因と対処"
      updatedAt="2026-03-03"
      lead={[
        "404 Not Found は「サーバーには到達したが、指定したURLのページが存在しない」ことを示すエラーです。",
        "サイトが落ちているわけではなく、“そのページが見つからない”状態なので、URLやリンクの問題であることが多いです。",
      ]}
      sections={[
        {
          type: "list",
          title: "よくある原因",
          items: [
            "URLの入力ミス（スペル、スラッシュ、全角半角など）",
            "ページが削除・移動された（古いブックマーク/検索結果）",
            "リンク切れ（他サイトやSNSの古いリンク）",
            "一時的な公開停止、または権限が必要なURL",
          ],
        },
        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) URLを見直す（末尾のスラッシュ、余計な文字）",
            "2) トップページから探す（メニュー/検索）",
            "3) 直前の階層に戻る（/aaa/bbb が404なら /aaa/ を試す）",
            "4) 少し待って再試行（反映中に一時的に404になることもある）",
          ],
        },
        {
          type: "p",
          title: "運営者側の改善ポイント（サイト管理者向け）",
          body: [
            "404は放置するとユーザー離脱とSEOの損失につながります。基本は次の対応です。",
            "・移転/削除したページは、適切なURLへ 301 リダイレクトを設定する。",
            "・404ページに、検索/カテゴリ/人気ページなど“戻り道”を用意する。",
            "・内部リンク切れを定期的に点検し、古いURLを修正する。",
          ],
        },
        {
          type: "div",
          title: "「サイトが落ちている」のか不安な場合",
          body: [
            "404は基本的に“ページがない”だけですが、サイト全体の状況も確認したい場合は外部から疎通確認できます。",
            <div
              key="cta"
              className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <Link href="/" className="text-sky-600 font-bold underline">
                サイトダウンで接続チェックする →
              </Link>
            </div>,
          ],
        },
        {
          type: "div",
          title: "関連リンク",
          body: [
            <div key="related-links" className="space-y-3">
              <div>
                <Link href="/status-codes" className="text-sky-600 font-bold underline">
                  HTTPエラーコードの全体像（ハブ）
                </Link>
              </div>
              <div>
                <Link href="/errors" className="text-sky-600 font-bold underline">
                  エラー解説一覧
                </Link>
              </div>
              <div>
                <Link
                  href="/what-is-website-downtime"
                  className="text-sky-600 font-bold underline"
                >
                  サイトが落ちているとは？
                </Link>
              </div>
              <ErrorRelatedLinks currentSlug="404-not-found" className="mt-4" />
            </div>,
          ],
        },
      ]}
    />
  );
}
