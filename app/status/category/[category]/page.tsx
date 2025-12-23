import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SITE_CATEGORIES,
  getSitesByCategory,
  type SiteCategory,
} from "@/lib/statusSites";

type MetaProps = { params: { category: string } };
type PageProps = { params: { category: string } };

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
  const { category } = params;
  const label = SITE_CATEGORIES[category as SiteCategory];
  if (!label) return {};

  return {
    title: `${label}の障害・稼働状況`,
    description: `${label}に分類される主要サービスの障害・稼働状況を一覧で確認できます。`,
    alternates: { canonical: `/status/category/${category}` },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: raw } = params;
  const category = raw as SiteCategory;

  const label = SITE_CATEGORIES[category];
  if (!label) notFound();

  const sites = getSitesByCategory()[category];
  if (!sites || sites.length === 0) notFound();

  return (
    <main className="flex-1 bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link
          href="/status"
          className="text-xs text-sky-600 underline hover:text-sky-700"
        >
          ← ステータス一覧に戻る
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          {label}の障害・稼働状況
        </h1>

        <ul className="mt-6 divide-y divide-slate-200 rounded-xl bg-white shadow-sm">
          {sites.map((s) => (
            <li key={s.id} className="p-4">
              <Link
                href={`/status/${s.id}`}
                className="text-sky-600 underline hover:text-sky-700"
              >
                {s.name}
              </Link>
              <p className="mt-1 text-xs text-slate-600">{s.serviceNote}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
