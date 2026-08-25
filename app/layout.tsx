import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import DocumentLanguage from "@/components/DocumentLanguage";
import { SITE } from "@/lib/siteMeta";

const GA_ID = "G-4QCK1BW1VL";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: `${SITE.name}｜接続・障害チェック`,
    template: `%s｜${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    siteName: SITE.name,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE.name,
              url: SITE.origin,
              inLanguage: "ja-JP",
              description: SITE.description,
            }),
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2711217631458410"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body className="bg-slate-50 min-h-screen flex flex-col font-sans text-slate-900 antialiased">
        <DocumentLanguage />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>

        <div className="fixed top-0 left-0 right-0 h-1 bg-sky-500 z-[60] opacity-20"></div>

        <SiteNav />

        <div className="flex-1 flex flex-col overflow-x-hidden">{children}</div>

        <SiteFooter />
      </body>
    </html>
  );
}
