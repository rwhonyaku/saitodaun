// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import SiteNav from "@/components/SiteNav";
import { SITE } from "@/lib/siteMeta";

export const metadata: Metadata = {
  metadataBase: new URL("https://サイトダウン.com"),
  title: {
    default: `${SITE.name}｜接続チェック`,
    template: `%s｜${SITE.name}`,
  },
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE.name}｜接続チェック`,
    description: SITE.description,
    url: "https://サイトダウン.com",
    siteName: SITE.name,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${SITE.name}｜接続チェック`,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* Global JSON-LD (safe site-wide) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE.name,
              url: "https://サイトダウン.com",
              inLanguage: "ja-JP",
              description: SITE.description,
            }),
          }}
        />
      </head>

      <body className="bg-slate-50 min-h-screen flex flex-col">
        <SiteNav />

        <div className="flex-1 flex flex-col pb-16">{children}</div>

        <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-slate-50">
          <div className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-3 px-4 py-3 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} サイトダウン</p>
            <span className="h-3 w-px bg-slate-300" />
            <a href="/privacy" className="hover:text-slate-600">
              プライバシーポリシー
            </a>
            <span className="h-3 w-px bg-slate-300" />
            <a href="/terms" className="hover:text-slate-600">
              利用規約
            </a>
            <span className="h-3 w-px bg-slate-300" />
            <a href="/about" className="hover:text-slate-600">
              このサイトについて
            </a>
            <span className="h-3 w-px bg-slate-300" />
            <a href="/contact" className="hover:text-slate-600">
              お問い合わせ
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
