import type { Metadata } from "next";
import { SITE } from "@/lib/siteMeta";

export const metadata: Metadata = {
  title: "このサイトについて",
  description: `${SITE.name}の目的、仕組み、できること・できないことをまとめています。`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-slate-800 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">このサイトについて</h1>

      <p className="mb-4">
        {SITE.name} は、「今このサイトにつながるのか？」をすばやく確認したい方向けの、
        シンプルな接続チェック用ユーティリティサイトです。
      </p>

      <p className="mb-4">
        ウェブサイトのURL（例：google.com など）を入力すると、このサーバーから
        対象URLへの接続を試み、その結果を「オンライン／オフライン」の目安として表示します。
      </p>

      <h2 className="font-semibold mt-6 mb-2">このサイトで確認していること</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>HTTP通信が成立するかどうか（接続可否）</li>
        <li>取得できた場合のHTTPステータスコード</li>
        <li>応答が返るまでのおおよその時間</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">できること</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>サイトやサービスに今アクセスできるかの一次確認</li>
        <li>障害や不具合が起きている可能性の切り分けの第一歩</li>
        <li>「自分の環境だけかどうか」を判断するための参考情報</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">できないこと（重要）</h2>
      <p className="mb-4">
        本サイトは、公式の障害情報や稼働状況を保証するものではありません。
        また、継続監視・通知・将来予測・原因特定などは行っていません。
      </p>
      <p className="mb-4">
        地域差、回線の違い、DNS設定、WAF / CDN の制限、ログイン後のみ発生する不具合などにより、
        実際の利用状況と本サイトの結果が一致しない場合があります。
      </p>

      <h2 className="font-semibold mt-6 mb-2">公式情報との違いについて</h2>
      <p className="mb-4">
        公式ステータスページは「全体としての状況」を示すものが多く、
        本サイトは「このサーバーから見た接続可否」を確認しています。
        そのため、両者の結果が異なることがあります。
      </p>

      <h2 className="font-semibold mt-6 mb-2">想定している利用シーン</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>特定のサイトやサービスに突然アクセスできなくなったとき</li>
        <li>障害が出ているのか、自分の環境の問題かを切り分けたいとき</li>
        <li>まずは事実ベースで状況だけを確認したいとき</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">プライバシーについて</h2>
      <p className="mb-4">
        入力されたURLは接続チェックの目的のみに使用され、
        ユーザーを特定する情報の収集や保存は行っていません。
        詳細はプライバシーポリシーをご確認ください。
      </p>

      <p className="text-xs text-slate-500 mt-6">
        最終更新日：2025-12-17
      </p>
    </div>
  );
}
