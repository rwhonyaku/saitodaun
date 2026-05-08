import Link from "next/link";

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="font-bold text-slate-900 transition-opacity hover:opacity-80"
        >
          サイトダウン
        </Link>

        <nav className="flex items-center gap-3 text-[10px] sm:gap-4 sm:text-xs">
          <Link
            href="/status"
            className="font-medium text-slate-600 hover:text-slate-900"
          >
            ステータス
          </Link>
          <Link
            href="/faq"
            className="font-medium text-slate-600 hover:text-slate-900"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            className="font-medium text-slate-600 hover:text-slate-900"
          >
            サイトについて
          </Link>
          <Link
            href="/contact"
            className="hidden border-l pl-4 font-medium text-slate-600 hover:text-slate-900 sm:block"
          >
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
}
