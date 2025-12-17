import Link from "next/link"
import { NAV_LINKS, SITE } from "@/lib/siteMeta"

export default function SiteFooter() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="text-sm text-gray-600">{SITE.name} — {SITE.tagline}</div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-gray-700 hover:text-black">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="mt-6 text-xs text-gray-500">© {new Date().getFullYear()} {SITE.name}</div>
      </div>
    </footer>
  )
}
