import Link from "next/link";
import { SITE } from "@/lib/siteMeta";

type Section =
  | { type: "p"; title: string; body: string[] }
  | { type: "list"; title: string; items: string[] }
  | { type: "note"; title: string; body: string[] };

export default function EvergreenPageShell({
  h1,
  lead,
  sections,
  updatedAt,
  showDefaultLinks = true,
}: {
  h1: string;
  lead: string[];
  sections: Section[];
  updatedAt: string; // fixed date string (recommended)
  showDefaultLinks?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-slate-800 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">{h1}</h1>

      {lead.map((t, i) => (
        <p key={i} className="mb-4">
          {t}
        </p>
      ))}

      {sections.map((s, i) => {
        if (s.type === "p") {
          return (
            <section key={i}>
              <h2 className="font-semibold mt-6 mb-2">{s.title}</h2>
              {s.body.map((t, j) => (
                <p key={j} className="mb-4">
                  {t}
                </p>
              ))}
            </section>
          );
        }

        if (s.type === "list") {
          return (
            <section key={i}>
              <h2 className="font-semibold mt-6 mb-2">{s.title}</h2>
              <ul className="list-disc list-inside mb-4 space-y-1">
                {s.items.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            </section>
          );
        }

        // note
        return (
          <section key={i}>
            <h2 className="font-semibold mt-6 mb-2">{s.title}</h2>
            <div className="rounded-lg border border-slate-200 bg-white p-4 mb-4">
              {s.body.map((t, j) => (
                <p key={j} className="mb-2 last:mb-0 text-slate-700">
                  {t}
                </p>
              ))}
            </div>
          </section>
        );
      })}

      {showDefaultLinks && (
        <div className="mt-8 flex flex-wrap gap-3 text-xs">
          <Link href="/" className="text-sky-600 underline hover:text-sky-700">
            トップ →
          </Link>
          <Link
            href="/status"
            className="text-sky-600 underline hover:text-sky-700"
          >
            ステータス一覧 →
          </Link>
          <Link
            href="/about"
            className="text-sky-600 underline hover:text-sky-700"
          >
            このサイトについて →
          </Link>
          <Link
            href="/privacy"
            className="text-sky-600 underline hover:text-sky-700"
          >
            プライバシー →
          </Link>
          <Link
            href="/terms"
            className="text-sky-600 underline hover:text-sky-700"
          >
            利用規約 →
          </Link>
        </div>
      )}

      <p className="text-xs text-slate-500 mt-6">
        最終更新日：{updatedAt}（{SITE.name}）
      </p>
    </div>
  );
}
