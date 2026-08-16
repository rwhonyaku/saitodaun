import Link from "next/link";

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          prefetch={false}
          className="flex items-center gap-2 font-bold text-slate-950 transition-opacity hover:opacity-80"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 shadow-sm" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
          </span>
          サイトダウン
        </Link>

        <nav aria-label="主要ナビゲーション" className="flex items-center gap-3 text-[10px] sm:gap-4 sm:text-xs">
          <Link
            href="/status"
            prefetch={false}
            className="font-medium text-slate-600 hover:text-slate-900"
          >
            障害一覧
          </Link>
          <Link
            href="/faq"
            prefetch={false}
            className="font-medium text-slate-600 hover:text-slate-900"
          >
            FAQ
          </Link>
          <Link
            href="/about"
            prefetch={false}
            className="font-medium text-slate-600 hover:text-slate-900"
          >
            サイトについて
          </Link>
          <Link
            href="/contact"
            prefetch={false}
            className="hidden border-l pl-4 font-medium text-slate-600 hover:text-slate-900 sm:block"
          >
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
}
