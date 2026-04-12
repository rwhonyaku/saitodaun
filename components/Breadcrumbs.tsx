"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/siteMeta";

function formatLabel(segment: string) {
  const map: Record<string, string> = {
    services: "サービス別トラブル",
    errors: "エラー解説",
    "not-working": "不具合",
    youtube: "YouTube",
    amazon: "Amazon",
    instagram: "Instagram",
    chatgpt: "ChatGPT",
    netflix: "Netflix",
    gmail: "Gmail",
    discord: "Discord",
    google: "Google",
    line: "LINE",
    x: "X",
  };

  if (map[segment]) return map[segment];

  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  if (paths.length === 0) return null;

  const breadcrumbs = paths.map((segment, index) => {
    const href = "/" + paths.slice(0, index + 1).join("/");

    return {
      label: formatLabel(segment),
      href,
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: SITE.origin,
      },
      ...breadcrumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: crumb.label,
        item: `${SITE.origin}${crumb.href}`,
      })),
    ],
  };

  return (
    <nav className="mb-6 flex text-xs text-slate-500" aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-sky-600">
            ホーム
          </Link>
        </li>

        {breadcrumbs.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center space-x-2">
            <span>/</span>

            {i === breadcrumbs.length - 1 ? (
              <span className="font-bold text-slate-900">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-sky-600">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
