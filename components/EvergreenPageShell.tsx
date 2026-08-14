// components/EvergreenPageShell.tsx

"use client";

import React from "react";
import Link from "next/link";
import { SITE } from "@/lib/siteMeta";
import Breadcrumbs from "./Breadcrumbs";

// "div" is supported for custom section bodies.
type Section =
  | { type: "p"; title: string; body: (string | React.ReactNode)[] }
  | { type: "div"; title: string; body: (string | React.ReactNode)[] }
  | { type: "list"; title: string; items: (string | React.ReactNode)[] }
  | { type: "note"; title: string; body: (string | React.ReactNode)[] };

export default function EvergreenPageShell({
  h1,
  lead,
  sections,
  updatedAt,
  showDefaultLinks = true,
}: {
  h1: string;
  lead: string[];
  sections: Section[];
  updatedAt: string;
  showDefaultLinks?: boolean;
}) {
  const getSlug = (title: string) => encodeURIComponent(title.toLowerCase());

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* SEO-Friendly Breadcrumbs */}
        <Breadcrumbs />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <main className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/60">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
              {h1}
            </h1>

            <div className="space-y-4 mb-10 text-slate-600 leading-relaxed sm:text-base text-sm border-l-4 border-sky-500 pl-4 bg-sky-50/30 py-2">
              {lead.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>

            {/* Mobile Table of Contents */}
            <div className="lg:hidden mb-10 bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <p className="text-xs font-bold text-slate-900 mb-3 uppercase tracking-widest">
                目次
              </p>
              <ul className="space-y-2 text-sm text-sky-600 font-medium underline underline-offset-4">
                {sections.map((s, i) => (
                  <li key={i}>
                    <a href={`#${getSlug(s.title)}`}>{s.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <article className="space-y-12">
              {sections.map((s, i) => {
                const sectionId = getSlug(s.title);

                return (
                  <section key={i} id={sectionId} className="scroll-mt-10">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                      <span className="flex-none w-1 h-6 bg-sky-500 rounded-full"></span>
                      {s.title}
                    </h2>

                    {(s.type === "p" || s.type === "div") && (
                      <div className="space-y-4 text-slate-700 leading-loose sm:text-[15px] text-sm">
                        {s.body.map((t, j) => (
                          <div key={j}>{t}</div>
                        ))}
                      </div>
                    )}

                    {s.type === "list" && (
                      <ul className="space-y-3">
                        {s.items.map((t, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-slate-700 sm:text-[15px] text-sm"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}

                    {s.type === "note" && (
                      <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5 text-slate-700 sm:text-[15px] text-sm leading-relaxed">
                        <p className="text-xs font-bold text-amber-700 mb-2 tracking-tighter">
                          補足
                        </p>
                        {s.body.map((t, j) => (
                          <div key={j} className="mb-2 last:mb-0">
                            {t}
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              })}
            </article>

            {/* GLOBAL NAV */}
            {showDefaultLinks && (
              <div className="mt-16 pt-8 border-t border-slate-100">
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                  <p className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-3">
                    次にやること（最短）
                  </p>

                  <div className="flex flex-wrap gap-2 text-[11px] font-bold">
                    <Link
                      href="/"
                      prefetch={false}
                      className="px-3 py-1 rounded-full bg-white border border-slate-200 hover:bg-sky-100 hover:border-sky-200 transition-colors text-sky-700"
                    >
                      URL入力で接続チェック →
                    </Link>

                    <Link
                      href="/status-codes"
                      prefetch={false}
                      className="px-3 py-1 rounded-full bg-white border border-slate-200 hover:bg-sky-100 hover:border-sky-200 transition-colors text-sky-700"
                    >
                      HTTPコードの読み方（概要） →
                    </Link>

                    <Link
                      href="/troubleshooting-guide"
                      prefetch={false}
                      className="px-3 py-1 rounded-full bg-white border border-slate-200 hover:bg-sky-100 hover:border-sky-200 transition-colors text-sky-700"
                    >
                      見れない時の解消手順 →
                    </Link>

                    <Link
                      href="/troubleshooting-dns"
                      prefetch={false}
                      className="px-3 py-1 rounded-full bg-white border border-slate-200 hover:bg-sky-100 hover:border-sky-200 transition-colors text-sky-700"
                    >
                      DNSエラーの直し方 →
                    </Link>

                    <Link
                      href="/status"
                      prefetch={false}
                      className="px-3 py-1 rounded-full bg-white border border-slate-200 hover:bg-sky-100 hover:border-sky-200 transition-colors text-sky-700"
                    >
                      主要サービス稼働状況 →
                    </Link>

                    <Link
                      href="/faq"
                      prefetch={false}
                      className="px-3 py-1 rounded-full bg-white border border-slate-200 hover:bg-sky-100 hover:border-sky-200 transition-colors text-sky-700"
                    >
                      FAQ →
                    </Link>
                  </div>

                  <p className="mt-3 text-[11px] text-slate-500 leading-relaxed">
                    目安：HTTPが4xxなら「制限・URL・権限」、5xxなら「サイト側の障害」、数値が出ないなら「DNS/SSL/経路」を疑うと確認が早いです。
                  </p>
                </div>
              </div>
            )}

            <div className="mt-10 text-[10px] text-slate-400 font-medium">
              最終更新日：{updatedAt} | {SITE.name} 編集部
            </div>
          </main>

          <aside className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="sticky top-10 space-y-6">
              {/* 目次 */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/60">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-4">
                  目次
                </p>
                <ul className="space-y-4">
                  {sections.map((s, i) => (
                    <li key={i}>
                      <a
                        href={`#${getSlug(s.title)}`}
                        className="text-sm font-bold text-slate-600 hover:text-sky-600 transition-colors block leading-tight border-l-2 border-transparent hover:border-sky-300 pl-3"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {false ? (
                <>
              {/* FEATURED AD CARD */}
              <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-3xl p-6 text-white shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-white/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Editor&apos;s Choice
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 leading-tight">ConoHa WING</h3>
                <p className="text-[11px] opacity-90 mb-4 leading-relaxed font-medium">
                  国内最速No.1サーバー。今なら最大53%OFFキャンペーン実施中。
                </p>
                <div className="space-y-2">
                  <a
                    href="https://af.moshimo.com/af/c/click?a_id=5400008&p_id=2312&pc_id=4967&pl_id=92340"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="block w-full text-center py-2.5 bg-white text-sky-600 rounded-xl text-xs font-bold hover:bg-sky-50 transition-colors shadow-sm"
                  >
                    公式サイトを見る
                  </a>
                  <Link
                    href="/conoha"
                    prefetch={false}
                    className="block w-full text-center py-2 text-white/90 underline underline-offset-2 text-[10px] font-bold hover:text-white transition-colors"
                  >
                    14,000円還元の受け取り方を確認 →
                  </Link>
                </div>
                <img
                  src="https://i.moshimo.com/af/i/impression?a_id=5400008&p_id=2312&pc_id=4967&pl_id=92340"
                  width="1"
                  height="1"
                  style={{ border: "none" }}
                  className="hidden"
                  alt=""
                />
              </div>
                </>
              ) : null}

              {/* クイックチェック */}
              <div className="rounded-3xl bg-slate-900 p-6 text-white">
                <p className="text-xs font-bold opacity-60 mb-2">クイックチェック</p>
                <p className="text-sm font-bold mb-4 leading-snug">
                  他のサイトの稼働状況もリアルタイムで確認できます。
                </p>
                <Link
                  href="/"
                  prefetch={false}
                  className="inline-block w-full text-center py-2 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-sky-100 transition-colors"
                >
                  今すぐチェックする
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
