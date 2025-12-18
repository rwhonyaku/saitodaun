import type { Metadata } from "next";
import { SITE } from "@/lib/siteMeta";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: `${SITE.name}へのお問い合わせ方法（連絡先）をまとめています。`,
  alternates: { canonical: "/contact" },
};

const EMAIL_DISPLAY = "admin@サイトダウン.com";
const EMAIL_PUNYCODE = "admin@xn--ecke7b4bzb0s.com"; // fallback (most compatible)

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-slate-800 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">お問い合わせ</h1>

      <p className="mb-4">
        {SITE.name}へのご連絡は、下記メールアドレスまでお願いします。
      </p>

      <h2 className="font-semibold mt-6 mb-2">連絡先</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>
          メール：
          <a
            className="text-sky-600 underline hover:text-sky-700 break-all"
            href={`mailto:${EMAIL_PUNYCODE}`}
          >
            {EMAIL_DISPLAY}
          </a>
          <div className="text-xs text-slate-500 mt-1">
            ※ 受信環境によっては国際化ドメイン（日本語ドメイン）のメールが送れない場合があります。
            その場合は{" "}
            <a
              className="text-sky-600 underline hover:text-sky-700 break-all"
              href={`mailto:${EMAIL_PUNYCODE}`}
            >
              {EMAIL_PUNYCODE}
            </a>{" "}
            宛てにお送りください。
          </div>
        </li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">お問い合わせ内容の例</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>不具合の報告（画面・操作手順・URLなど）</li>
        <li>追加してほしいサービス（ステータス一覧）のリクエスト</li>
        <li>掲載内容の修正依頼（リンク切れ等）</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">ご注意</h2>
      <p className="mb-4">
        返信は保証できませんが、内容を確認のうえ可能な範囲で対応します。緊急の障害については、
        各サービスの公式ステータスや公式サポートも併せてご確認ください。
      </p>

      <p className="text-xs text-slate-500 mt-6">最終更新日：2025-12-17</p>
    </div>
  );
}
