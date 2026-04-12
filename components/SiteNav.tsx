// components/SiteNav.tsx
import Link from "next/link";

export default function SiteNav() {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-slate-900 hover:opacity-80 transition-opacity">
          サイトダウン
        </Link>

        <nav className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs">
          <Link href="/status" className="text-slate-600 hover:text-slate-900 font-medium">
            ステータス
          </Link>
          <Link href="/faq" className="text-slate-600 hover:text-slate-900 font-medium">
            FAQ
          </Link>
          <Link href="/about" className="text-slate-600 hover:text-slate-900 font-medium">
            サイトについて
          </Link>
          {/* Simplified Header: Terms/Privacy usually belong in Footer, but keep Contact for trust */}
          <Link href="/contact" className="hidden sm:block text-slate-600 hover:text-slate-900 font-medium border-l pl-4">
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
}