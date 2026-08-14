"use client";

import Link from "next/link";
import { SITE } from "@/lib/siteMeta";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="mb-2 text-sm font-bold text-slate-900">{SITE.name}</div>
            <p className="text-xs leading-relaxed text-slate-600">
              {SITE.tagline}
              <br />
              外部サーバーからの視点でウェブサイトの稼働状況をリアルタイムに確認します。
            </p>
          </div>

          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              対処法・関連ガイド
            </div>

            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" prefetch={false} className="font-bold text-slate-700 hover:text-sky-600">
                  サービス別トラブル確認
                </Link>
              </li>
              <li>
                <Link href="/outages/japan" prefetch={false} className="font-bold text-slate-700 hover:text-sky-600">
                  ネット障害情報
                </Link>
              </li>
              <li>
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  prefetch={false}
                  className="font-bold text-slate-700 hover:text-sky-600"
                >
                  特定サイトが開かないとき
                </Link>
              </li>
              <li>
                <Link href="/troubleshooting-guide" prefetch={false} className="text-slate-600 hover:text-sky-600">
                  サイトが見れない時の解消ガイド
                </Link>
              </li>
              <li>
                <Link href="/troubleshooting-dns" prefetch={false} className="text-slate-600 hover:text-sky-600">
                  DNSエラーの直し方
                </Link>
              </li>
              <li>
                <Link href="/status-codes" prefetch={false} className="text-slate-600 hover:text-sky-600">
                  HTTPエラーコード解説
                </Link>
              </li>
              <li>
                <Link href="/site-performance" prefetch={false} className="text-slate-600 hover:text-sky-600">
                  サイトが重い時の対策
                </Link>
              </li>
              <li>
                <Link href="/what-is-website-downtime" prefetch={false} className="text-slate-600 hover:text-sky-600">
                  サイトが落ちているとは？
                </Link>
              </li>
              <li>
                <Link href="/glossary" prefetch={false} className="text-slate-600 hover:text-sky-600">
                  ウェブ用語集
                </Link>
              </li>
              <li>
                <Link href="/faq" prefetch={false} className="text-slate-600 hover:text-sky-600">
                  よくある質問（FAQ）
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/recommendations"
                  prefetch={false}
                  className="font-bold text-sky-600 hover:text-sky-700"
                >
                  推奨ツール・サービス
                </Link>
              </li>
              <li>
                <Link
                  href="/conoha"
                  prefetch={false}
                  className="flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-700"
                >
                  <span className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] text-indigo-700">
                    特集
                  </span>
                  ConoHa WING 徹底解説
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              運営情報
            </div>

            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" prefetch={false} className="text-slate-600 hover:text-sky-600">
                  このサイトについて
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" prefetch={false} className="text-slate-600 hover:text-sky-600">
                  チェックの仕組み
                </Link>
              </li>
              <li>
                <Link href="/privacy" prefetch={false} className="text-slate-600 hover:text-sky-600">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/terms" prefetch={false} className="text-slate-600 hover:text-sky-600">
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/contact" prefetch={false} className="text-slate-600 hover:text-sky-600">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 md:flex-row">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} {SITE.name}
          </div>
        </div>
      </div>
    </footer>
  );
}
