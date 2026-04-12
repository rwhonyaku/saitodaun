// app/services/x/page.tsx

import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "@/lib/services/registry";

const service = SERVICES.x;

export const metadata: Metadata = {
  title: "Xのトラブル解決 | サイトダウン",
  description:
    "X（旧Twitter）が開かない・読み込めない・ログインできない時に、障害か自分側かを切り分けて最短で対処します。",
};

export default function XHubPage() {
  const issue = service.issues["not-working"];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">{service.name}のトラブル解決</h1>
        <p className="text-base text-neutral-600">
          X（旧Twitter）が開かない、タイムラインが読み込めない、ログインできない時は、まず「障害か自分側か」を切り分けるのが最短です。
          下のガイドから始めてください。
        </p>
      </header>

      <section className="mt-8 grid grid-cols-1 gap-4">
        <Link
          href={`/services/${service.id}/${issue.id}`}
          className="rounded-2xl border border-neutral-200 p-6 shadow-sm transition hover:shadow-md"
        >
          <h2 className="text-lg font-semibold">{issue.title}</h2>
          <p className="mt-2 text-sm text-neutral-600">{issue.description}</p>
          <div className="mt-4 text-sm underline">ガイドを開く →</div>
        </Link>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold">関連ツール</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link className="underline" href={issue.statusPageHref}>
              Xのステータスチェック
            </Link>
          </li>
          <li>
            <Link className="underline" href={issue.mainToolHref}>
              URL疎通チェック（メインツール）
            </Link>
          </li>
          <li>
            <Link className="underline" href="/troubleshooting-dns">
              DNSトラブル対処
            </Link>
          </li>
          <li>
            <Link className="underline" href="/status-codes">
              ステータスコード一覧
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}