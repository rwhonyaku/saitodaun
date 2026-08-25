// app/services/page.tsx

import Link from "next/link";
import type { Metadata } from "next";
import { listServices } from "@/lib/services/registry";

export const metadata: Metadata = {
  title: "サービス別トラブル解決",
  description:
    "YouTube、LINE、X、Amazon、PayPay、楽天、Yahoo! JAPAN、TikTok、Zoomなど、サービスが使えない時に「障害か自分側か」を最短で確認して対処するガイド集です。",
  alternates: { canonical: "/services" }
};

export default function ServicesIndexPage() {
  const services = listServices();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">サービス別トラブル解決</h1>
        <p className="text-base text-neutral-600">
          「サービス側の障害」か「自分の環境（回線/端末/ブラウザ/DNS）」かを短時間で確認し、最短の対処に誘導します。
          まずは該当サービスを選んでください。
        </p>
      </header>

      <section className="mt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.id}
              href={s.hubHref}
              className="rounded-2xl border border-neutral-200 p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{s.name}</h2>
                <span className="text-sm text-neutral-500">見る</span>
              </div>
              <p className="mt-2 text-sm text-neutral-600">{s.shortBlurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold">このページ群のつながり</h2>
        <p className="mt-2 text-sm text-neutral-600">
          各サービスページは、(1) ステータスチェック、(2) エラー解説、(3) DNS対処に内部リンクでつながっています。
          「読むだけ」で終わらず、次に取るべき行動へ迷わず進める設計です。
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="text-sm underline" href="/status-codes">
            ステータスコード一覧
          </Link>
          <Link className="text-sm underline" href="/troubleshooting-dns">
            DNSトラブル対処
          </Link>
        </div>
      </section>
    </main>
  );
}