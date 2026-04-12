import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/siteMeta";
import { SITE_CATEGORIES, type SiteCategory } from "@/lib/statusSites";

export const metadata: Metadata = {
  title: `カテゴリ別ステータス一覧｜${SITE.name}`,
  description: "カテゴリ別に主要サービスの障害・稼働状況ページを探せます。",
  alternates: { canonical: "/status/index" },
};

export default function StatusIndexPage() {
  const entries = Object.entries(SITE_CATEGORIES) as Array<[SiteCategory, string]>;

  return (
    <main className="flex-1 bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link href="/status" className="text-xs text-sky-600 underline">
          ← ステータス一覧に戻る
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          カテゴリ別ステータス一覧
        </h1>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {entries.map(([key, label]) => (
            <li key={key} className="rounded-xl bg-white p-4 shadow-sm">
              <Link
                href={`/status/category/${key}`}
                className="text-sky-600 underline hover:text-sky-700"
              >
                {label} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
