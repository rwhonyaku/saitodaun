import type { Metadata } from "next";
import Link from "next/link";
import EnglishStatusDashboard from "@/components/EnglishStatusDashboard";
import { SITE } from "@/lib/siteMeta";

export const metadata: Metadata = {
  title: { absolute: "Service Outages Right Now | Live Website & App Status" },
  applicationName: "SiteDown",
  description: "Check whether a website responds right now, then review user reports, official status pages, and independent outage sources for major services.",
  alternates: {
    canonical: "/en",
    languages: {
      "en-US": "/en",
      "ja-JP": "/",
      "x-default": "/",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Service Outages Right Now | Live Website & App Status",
    description: "Check whether a website responds right now, then compare user reports with official and independent outage sources.",
    url: "/en",
    siteName: "SiteDown",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Service Outages Right Now | Live Website & App Status",
    description: "Check whether a website responds right now, then compare user reports with official and independent outage sources.",
  },
};

const faq = [
  {
    question: "Does a successful check mean the whole service is working?",
    answer: "No. It confirms that the checked web address responded to our external server. Login, messaging, payments, streaming, apps, and region-specific features can still have partial failures.",
  },
  {
    question: "Are user reports worldwide?",
    answer: "Not currently. The live report feed reflects reports submitted from Japan. It is useful as an additional regional signal, not a measure of worldwide impact.",
  },
  {
    question: "Why can a site work here but not for me?",
    answer: "The problem may be limited to your ISP, DNS resolver, Wi-Fi, device, browser, account, app, or location. Try another connection and device before concluding that the whole service is down.",
  },
];

export default function EnglishPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE.origin}/en#webpage`,
        name: "Service Outages Right Now — Live Website & App Status",
        url: `${SITE.origin}/en`,
        inLanguage: "en-US",
        description: "Check whether a website responds, then compare user reports with official and independent outage sources.",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.origin}/en#faq`,
        inLanguage: "en-US",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <main lang="en" data-english-page className="flex-1 bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-4 px-4">
          <Link href="/" aria-label="SiteDown homepage" className="flex items-center gap-2.5 font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-sky-400" /></span>
            SiteDown
          </Link>
          <Link href="/" className="inline-flex min-h-11 items-center text-xs font-semibold text-slate-300 hover:text-white">日本語版 →</Link>
        </div>
      </header>
      <EnglishStatusDashboard />

      <section className="mx-auto grid w-full max-w-5xl gap-4 px-4 pb-10 md:grid-cols-3" aria-label="How to interpret the result">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-700">1 · Website check</p>
          <h2 className="mt-2 font-bold text-slate-950">Test external reachability</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">A normal HTTP response shows that the site answered our server. It does not test your own connection or every feature.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-700">2 · Report signal</p>
          <h2 className="mt-2 font-bold text-slate-950">Look for unusual activity</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">A spike means more people in Japan are reporting problems than the service&apos;s recent normal level—not automatic proof of an outage.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-700">3 · Compare</p>
          <h2 className="mt-2 font-bold text-slate-950">Rule out a local problem</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">If reports are normal, compare Wi-Fi with mobile data, try another device, and disable a VPN or proxy temporarily.</p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Japan-specific context</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Checking a Japanese service from abroad or while in Japan?</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">Japanese services can fail only at login, checkout, verification, or inside their mobile apps even when the public website is reachable. Some access problems also depend on region, local mobile carriers, DNS, or account requirements. Use the report trend as one signal and check the service&apos;s official support channel before taking action involving an account or payment.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-10" aria-labelledby="english-faq-heading">
        <h2 id="english-faq-heading" className="text-2xl font-bold tracking-tight text-slate-950">What the status signals mean</h2>
        <div className="mt-5 grid gap-3">
          {faq.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer list-none font-bold text-slate-950">{item.question}</summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-3 text-sm">
          <Link href="/status" className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 underline underline-offset-2 hover:border-sky-200 hover:text-sky-700">Browse every monitored service (Japanese) →</Link>
          <Link href="/" className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 underline underline-offset-2 hover:border-sky-200 hover:text-sky-700">Japanese homepage →</Link>
        </div>
      </section>
      <footer className="border-t border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-xs leading-5 text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} <Link href="/" className="underline underline-offset-2 hover:text-white">SiteDown</Link></p>
          <p>Independent reference data—not an official service announcement.</p>
        </div>
      </footer>
    </main>
  );
}
