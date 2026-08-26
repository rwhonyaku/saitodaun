// app/services/page.tsx

import Link from "next/link";
import type { Metadata } from "next";
import { listServices } from "@/lib/services/registry";
import { STATUS_SITES } from "@/lib/statusSites";

export const metadata: Metadata = {
  title: "サービス別・使えない時の対処ガイド",
  description:
    "YouTube、LINE、X、Amazon、PayPayなど、主要サービスが使えない時に、サービス側の障害か回線・端末・ブラウザ・DNS側かを切り分ける対処ガイド集です。",
  alternates: { canonical: "/services" }
};

export default function ServicesIndexPage() {
  const services = listServices();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-slate-900">
      <header className="space-y-3">
        <p className="text-sm font-medium text-sky-700">詳しい対処ガイドがあるサービス</p>
        <h1 className="text-3xl font-semibold tracking-tight">サービス別・使えない時の対処ガイド</h1>
        <p className="text-base text-neutral-600">
          ここでは、症状別の詳しい対処ガイドを用意している{services.length}サービスを掲載しています。
          「サービス側の障害」か「自分の環境（回線・端末・ブラウザ・DNS）」かを切り分けたい時に選んでください。
        </p>
      </header>

      <section className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-5">
        <h2 className="font-semibold text-slate-900">障害状況だけを確認したい場合</h2>
        <p className="mt-1 text-sm text-slate-700">
          このページは全サービスの一覧ではありません。監視中の{STATUS_SITES.length}サービスは、障害・稼働状況一覧から検索できます。
        </p>
        <Link
          href="/status"
          className="mt-3 inline-flex min-h-11 items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          全サービスの障害・稼働状況を見る →
        </Link>
      </section>

      <section className="mt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.id}/${s.issues["not-working"].id}`}
              className="group rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{s.name}</h2>
                <span className="text-sm font-medium text-sky-700 group-hover:underline">対処を見る →</span>
              </div>
              <p className="mt-2 text-sm text-neutral-600">{s.shortBlurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-semibold">サービスが見つからない場合</h2>
        <p className="mt-2 text-sm text-neutral-600">
          障害が起きているか知りたい場合は全サービスの一覧へ、画面にエラーコードが表示されている場合はエラー別ガイドへ進んでください。
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link className="text-sm font-medium text-sky-700 underline" href="/status">
            障害・稼働状況一覧
          </Link>
          <Link className="text-sm font-medium text-sky-700 underline" href="/errors">
            エラー別ガイド
          </Link>
          <Link className="text-sm font-medium text-sky-700 underline" href="/troubleshooting-guide">
            症状別トラブル対処
          </Link>
        </div>
      </section>
    </main>
  );
}
