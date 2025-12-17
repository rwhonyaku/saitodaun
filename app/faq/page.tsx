import type { Metadata } from "next";
import { SITE } from "@/lib/siteMeta";
import Link from "next/link";

export const metadata: Metadata = {
  title: "よくある質問（FAQ）",
  description: `${SITE.name}のよくある質問（結果の見方、違いが出る理由、対処手順）をまとめています。`,
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-slate-800 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">よくある質問（FAQ）</h1>

      <p className="mb-4">
        {SITE.name}の使い方や、結果の見方、うまく判定できない場合の対処をまとめました。
      </p>

      <h2 className="font-semibold mt-6 mb-2">Q. 「オンライン」と表示されれば完全に正常ですか？</h2>
      <p className="mb-4">
        いいえ。{SITE.name}は簡易チェックです。「このサーバーから接続できた」ことは確認できますが、
        画面表示の崩れ、ログイン後の不具合、特定機能（検索・決済・投稿など）の障害までは判断できません。
      </p>

      <h2 className="font-semibold mt-6 mb-2">Q. 「オフライン」でも実際は見れることがあります</h2>
      <p className="mb-4">
        あります。地域差・回線状況・DNS・一時的なネットワークエラー・WAF/CDNの制限などで、
        当サイトのサーバーからは接続できないが、あなたの環境では表示できる（またはその逆）ということが起こります。
        数十秒〜数分おいて再チェックし、別回線（Wi-Fi/4G/5G）でも確認してください。
      </p>

      <h2 className="font-semibold mt-6 mb-2">Q. HTTPステータスコードは何を意味しますか？</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li><strong>200</strong>：正常応答の可能性が高い</li>
        <li><strong>301/302</strong>：リダイレクト（転送）</li>
        <li><strong>403</strong>：拒否（アクセス制限、WAF、地域制限など）</li>
        <li><strong>404</strong>：ページが見つからない</li>
        <li><strong>500/502/503</strong>：サーバー側の問題の可能性</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">Q. 応答時間（ms）は正確ですか？</h2>
      <p className="mb-4">
        参考値です。回線や混雑、相手サーバーの負荷などで変動します。継続監視や厳密な性能測定が必要な場合は、
        専門の監視・計測サービスの利用をおすすめします。
      </p>

      <h2 className="font-semibold mt-6 mb-2">Q. チェックできないURLがあります</h2>
      <p className="mb-4">
        ボット対策、レート制限、アクセス制限（WAF）、ログインが必須のページなどは、
        正しく判定できない場合があります。その場合は公式ステータスやサポート情報も確認してください。
      </p>

      <h2 className="font-semibold mt-6 mb-2">Q. どこを見れば最新の障害情報が分かりますか？</h2>
      <p className="mb-4">
        サービスによって異なりますが、一般的には「公式ステータスページ」「公式サポート」「公式X（旧Twitter）」が最も確実です。
        {SITE.name}のステータスページには、可能な範囲で公式リンクを掲載しています。
      </p>

      <h2 className="font-semibold mt-6 mb-2">Q. 通知や継続監視はできますか？</h2>
      <p className="mb-4">
        現時点では「いますぐ確認」の簡易チェックを中心にしています。通知や継続監視が必要な場合は、
        監視サービスの利用をご検討ください。
      </p>

      <h2 className="font-semibold mt-6 mb-2">関連ページ</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>
          <Link href="/how-it-works" className="text-sky-600 underline hover:text-sky-700">
            仕組み・チェック内容について
          </Link>
        </li>
        <li>
          <Link
            href="/what-is-website-downtime"
            className="text-sky-600 underline hover:text-sky-700"
          >
            サイトが落ちているとは？
          </Link>
        </li>
        <li>
          <Link href="/status" className="text-sky-600 underline hover:text-sky-700">
            ステータス一覧
          </Link>
        </li>
      </ul>

      <p className="text-xs text-slate-500 mt-6">最終更新日：2025-12-17</p>
    </div>
  );
}
