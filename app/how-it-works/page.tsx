import type { Metadata } from "next";
import { SITE } from "@/lib/siteMeta";

export const metadata: Metadata = {
  title: "仕組み・チェック内容について",
  description: `${SITE.name}がどのようにサイトの接続可否を確認しているかを説明します。`,
};

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-slate-800 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">仕組み・チェック内容について</h1>

      <p className="mb-4">
        {SITE.name}は、指定されたURLに対してサーバー側から接続を試み、
        「いま接続できるかどうか」を簡易的に確認するツールです。
      </p>

      <h2 className="font-semibold mt-6 mb-2">どのようにチェックしているか</h2>
      <p className="mb-4">
        入力されたURLに対し、当サイトのサーバーからHTTPリクエストを送信し、
        応答が返ってくるかどうか、またHTTPステータスが取得できるかを確認します。
      </p>

      <h2 className="font-semibold mt-6 mb-2">表示される情報について</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>オンライン／オフラインの目安表示</li>
        <li>HTTPステータスコード（取得できた場合）</li>
        <li>応答時間（参考値）</li>
        <li>チェックを行った日時</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">結果が実際と異なる場合</h2>
      <p className="mb-4">
        本ツールは「このサーバーから接続できるか」を確認するものです。
        地域差、回線、DNS、WAF/CDNの制限、ログイン状態などにより、
        実際の体感と結果が一致しない場合があります。
      </p>

      <h2 className="font-semibold mt-6 mb-2">おすすめの使い方</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>まず一次切り分けとして確認する</li>
        <li>オフラインの場合は時間をおいて再チェックする</li>
        <li>公式ステータスやSNSの情報と併せて判断する</li>
      </ul>

      <p className="text-xs text-slate-500 mt-6">最終更新日：2025-12-17</p>
    </div>
  );
}
