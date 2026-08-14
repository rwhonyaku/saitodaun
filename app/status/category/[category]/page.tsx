import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/siteMeta";
import {
  SITE_CATEGORIES,
  getSitesByCategory,
  type SiteCategory,
} from "@/lib/statusSites";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(SITE_CATEGORIES).map((category) => ({ category }));
}

// New Next.js 14 pattern
type PageProps = {
  params: Promise<{ category: string }>;
};

const normalize = (s: string): string => {
  if (!s) return "";
  
  let normalized = s;
  try {
    normalized = decodeURIComponent(s);
  } catch {
    // ignore decode failures
  }
  
  return normalized.trim().toLowerCase().replace(/-/g, "_");
};

const isSiteCategory = (key: string): key is SiteCategory => {
  return Object.prototype.hasOwnProperty.call(SITE_CATEGORIES, key);
};

export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const params = await props.params;
  const base = SITE.origin;
  const key = normalize(params.category);

  if (!isSiteCategory(key)) {
    return {
      title: `カテゴリが見つかりません｜${SITE.name}`,
      description: "指定されたカテゴリは見つかりませんでした。",
      alternates: { canonical: `${base}/status` },
      robots: { index: false, follow: false },
    };
  }

  const label = SITE_CATEGORIES[key];
  const title = `${label}の障害・稼働状況｜${SITE.name}`;
  const description = `${label}に分類される主要サービスの障害・稼働状況を一覧で確認できます。`;

  return {
    title,
    description,
    alternates: { canonical: `${base}/status/category/${key}` },
    openGraph: {
      title,
      description,
      url: `${base}/status/category/${key}`,
      siteName: SITE.name,
      locale: "ja_JP",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function CategoryPage(props: PageProps) {
  const params = await props.params;
  const key = normalize(params.category);

  // Keep invalid category handling explicit.
  if (!isSiteCategory(key)) {
    if (process.env.NODE_ENV !== "production") {
      const validKeys = Object.keys(SITE_CATEGORIES);

      return (
        <main className="flex-1 bg-slate-50">
          <div className="mx-auto max-w-3xl px-4 py-10 text-sm text-slate-800">
            <h1 className="text-xl font-bold mb-3">[DEV] カテゴリ解決に失敗</h1>

            <div className="rounded-xl bg-white p-4 shadow-sm space-y-2">
              <p>
                <span className="font-semibold">params.category:</span>{" "}
                <code className="break-all">{params.category || "(empty)"}</code>
              </p>
              <p>
                <span className="font-semibold">normalize(key):</span>{" "}
                <code className="break-all">{key || "(empty)"}</code>
              </p>
              <p className="text-xs text-slate-600">
                期待されるキー（SITE_CATEGORIES）:
              </p>
              <ul className="list-disc pl-5 text-xs text-slate-700">
                {validKeys.map((k) => (
                  <li key={k}>
                    <code>{k}</code>（{SITE_CATEGORIES[k as SiteCategory]}）
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-600 mt-2">
                例: <code>/status/category/search_portal</code>
              </p>
            </div>

            <div className="mt-6 flex gap-4 text-xs">
              <Link href="/status" prefetch={false} className="text-sky-600 underline">
                ← ステータス一覧へ
              </Link>
              <Link href="/status/index" prefetch={false} className="text-sky-600 underline">
                ← カテゴリ一覧へ
              </Link>
            </div>
          </div>
        </main>
      );
    }

    notFound();
  }

  const map = getSitesByCategory();
  const sites = map[key];
  const label = SITE_CATEGORIES[key];

  return (
    <main className="flex-1 bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link
          href="/status"
          prefetch={false}
          className="text-xs text-sky-600 underline hover:text-sky-700"
        >
          ← ステータス一覧に戻る
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          {label}の障害・稼働状況
        </h1>

        {sites.length === 0 ? (
          <div className="mt-6 rounded-xl bg-white p-4 shadow-sm text-sm text-slate-700">
            このカテゴリに該当するサービスがまだありません。
          </div>
        ) : (
          <ul className="mt-6 divide-y divide-slate-200 rounded-xl bg-white shadow-sm">
            {sites.map((s) => (
              <li key={s.id} className="p-4">
                <Link
                  href={`/status/sites/${s.id}`}
                  prefetch={false}
                  className="text-sky-600 underline hover:text-sky-700"
                >
                  {s.name}
                </Link>
                <p className="mt-1 text-xs text-slate-600">{s.serviceNote}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6">
          <Link
            href="/status/index"
            prefetch={false}
            className="text-xs text-sky-600 underline hover:text-sky-700"
          >
            カテゴリ一覧へ →
          </Link>
        </div>
      </div>
    </main>
  );
}
