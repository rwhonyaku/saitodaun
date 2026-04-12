import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { SITE } from "@/lib/siteMeta";
import { Inter, Noto_Sans_JP } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto",
});

const GA_ID = "G-4QCK1BW1VL";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.origin),
  title: {
    default: `${SITE.name}｜接続・障害チェック`,
    template: `%s｜${SITE.name}`,
  },
  description: SITE.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE.name}｜接続・障害チェック`,
    description: SITE.description,
    url: SITE.origin,
    siteName: SITE.name,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${SITE.name}｜接続・障害チェック`,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${inter.variable} ${noto.variable}`}>
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
        {/* Grow Script - Injected as raw HTML to ensure Mediavine verification succeeds */}
        <script
          data-grow-initializer=""
          dangerouslySetInnerHTML={{
            __html: `!(function(){window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));var e=document.createElement("script");(e.type="text/javascript"),(e.src="https://faves.grow.me/main.js"),(e.defer=!0),e.setAttribute("data-grow-faves-site-id","U2l0ZTo4NTg1MGRiOS0yN2VmLTQzNmMtOTE2Ny04ODc1ZDNkMmI5M2U=");var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t);})();`,
          }}
        />
      </head>

      <body className="bg-slate-50 min-h-screen flex flex-col font-sans text-slate-900 antialiased">
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

        <div className="flex-1 flex flex-col overflow-x-hidden">
          {children}
        </div>

        <SiteFooter />
      </body>
    </html>
  );
}
