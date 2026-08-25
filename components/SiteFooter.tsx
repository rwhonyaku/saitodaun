import Link from "next/link";
import { SITE } from "@/lib/siteMeta";

const diagnoseLinks = [
  { href: "/status", label: "障害・稼働状況一覧" },
  { href: "/services", label: "サービス別トラブル確認" },
  { href: "/outages/japan", label: "日本のネット障害情報" },
  { href: "/errors", label: "HTTP・接続エラー" },
  { href: "/troubleshooting-dns", label: "DNSエラーの確認" },
  { href: "/troubleshooting/specific-site-not-working", label: "特定サイトだけ開かない" },
];

const guideLinks = [
  { href: "/troubleshooting-guide", label: "接続トラブルの確認手順" },
  { href: "/site-performance", label: "サイトが重い時の対策" },
  { href: "/what-is-website-downtime", label: "サイトが落ちているとは？" },
  { href: "/glossary", label: "ウェブ用語集" },
  { href: "/faq", label: "よくある質問" },
  { href: "/recommendations", label: "推奨ツール・サービス" },
  { href: "/conoha", label: "ConoHa WING 徹底解説" },
];

const trustLinks = [
  { href: "/en", label: "English status checker" },
  { href: "/about", label: "このサイトについて" },
  { href: "/how-it-works", label: "判定の仕組み" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/terms", label: "利用規約" },
  { href: "/contact", label: "お問い合わせ" },
];

function FooterLinks({ title, links }: { title: string; links: Array<{ href: string; label: string }> }) {
  return (
    <div>
      <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} prefetch={false} className="text-slate-300 transition hover:text-sky-300">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 font-bold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
              </span>
              {SITE.name}
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-400">
              外部接続チェックと日本の利用者報告を分けて確認し、次に取るべき行動を案内します。
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-semibold text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1">外部サーバーから確認</span>
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1">日本の利用者報告</span>
            </div>
          </div>

          <FooterLinks title="障害を調べる" links={diagnoseLinks} />
          <FooterLinks title="対処法・ガイド" links={guideLinks} />
          <FooterLinks title="透明性・運営情報" links={trustLinks} />
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <p>判定は公式発表ではなく、接続結果と利用者報告に基づく参考情報です。</p>
        </div>
      </div>
    </footer>
  );
}
