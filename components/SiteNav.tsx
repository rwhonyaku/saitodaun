// components/SiteNav.tsx
import Link from "next/link";

export default function SiteNav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-slate-900">
          サイトダウン
        </Link>

        <nav className="flex items-center gap-4 text-xs">
          <Link href="/status" className="text-slate-600 hover:text-slate-900">
            ステータス
          </Link>
          <Link href="/about" className="text-slate-600 hover:text-slate-900">
            このサイトについて
          </Link>
          <Link href="/privacy" className="text-slate-600 hover:text-slate-900">
            プライバシー
          </Link>
          <Link href="/terms" className="text-slate-600 hover:text-slate-900">
            利用規約
          </Link>
          <Link href="/contact" className="text-slate-600 hover:text-slate-900">
            お問い合わせ
          </Link>

        </nav>
      </div>
    </header>
  );
}
