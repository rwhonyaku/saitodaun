import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { SITE } from "@/lib/siteMeta";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name}｜接続チェック`,
    template: `%s｜${SITE.name}`,
  },
  description: SITE.description,

  metadataBase: new URL(SITE.origin),
  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: `${SITE.name}｜接続チェック`,
    description: SITE.description,
    url: SITE.origin,
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
        {/* Google AdSense script */}
        <Script
          id="adsbygoogle-js"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2711217631458410"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* FAQ structured data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "この結果はどのくらい正確ですか？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "クラウド上のサーバーから指定されたURLへの接続を試み、そのときの応答コードやレスポンス時間を表示しています。ただし、一時的なネットワーク障害や地域ごとの回線状況により、実際の体感と異なる場合があります。あくまで今の状態の目安としてご利用ください。",
                  },
                },
                {
                  "@type": "Question",
                  name: "自分のネット回線が遅い場合はどうなりますか？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "サイト接続チェックはサーバー側からアクセスしているため、ご自宅や職場の回線速度が遅くても判定結果そのものには大きな影響はありません。ただし、ご利用中のブラウザーでページの表示が遅く感じることはあります。",
                  },
                },
                {
                  "@type": "Question",
                  name: "完全な監視サービスとして使えますか？",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "サイトダウンは今つながるかどうかを手軽に確認するための簡易ツールです。24時間365日の監視やメール・アラート通知、履歴レポートなどが必要な場合は、専門のサイト監視サービスやステータスページサービスの併用をご検討ください。",
                  },
                },
              ],
            }),
          }}
        />
      </head>

      <body className="bg-slate-50 min-h-screen flex flex-col">
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
          </div>
        </footer>
      </body>
    </html>
  );
}
