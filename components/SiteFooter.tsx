"use client";

import Link from "next/link";
import { SITE } from "@/lib/siteMeta";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Column 1: Brand */}
          <div>
            <div className="text-sm font-bold text-slate-900 mb-2">{SITE.name}</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {SITE.tagline}
              <br />
              外部サーバーからの視点でウェブサイトの稼働状況をリアルタイムに判定します。
            </p>
          </div>

          {/* Column 2: Troubleshooting & Guides */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              対処法・関連ガイド
            </div>

            <ul className="space-y-2 text-sm">

              {/* Core sections */}
              <li>
                <Link href="/services" className="text-slate-700 hover:text-sky-600 font-bold">
                  サービス別トラブル確認
                </Link>
              </li>

              <li>
                <Link href="/outages/japan" className="text-slate-700 hover:text-sky-600 font-bold">
                  ネット障害情報
                </Link>
              </li>

              <li>
                <Link href="/troubleshooting/specific-site-not-working" className="text-slate-700 hover:text-sky-600 font-bold">
                  特定サイトが開かないとき
                </Link>
              </li>

              {/* Main troubleshooting pillar */}
              <li>
                <Link href="/troubleshooting-guide" className="text-slate-600 hover:text-sky-600">
                  サイトが見れない時の解消ガイド
                </Link>
              </li>

              <li>
                <Link href="/troubleshooting-dns" className="text-slate-600 hover:text-sky-600">
                  DNSエラーの直し方
                </Link>
              </li>

              <li>
                <Link href="/status-codes" className="text-slate-600 hover:text-sky-600">
                  HTTPエラーコード解説
                </Link>
              </li>

              <li>
                <Link href="/site-performance" className="text-slate-600 hover:text-sky-600">
                  サイトが重い時の対策
                </Link>
              </li>

              <li>
                <Link href="/what-is-website-downtime" className="text-slate-600 hover:text-sky-600">
                  サイトが落ちているとは？
                </Link>
              </li>

              <li>
                <Link href="/glossary" className="text-slate-600 hover:text-sky-600">
                  ウェブ用語集
                </Link>
              </li>

              <li>
                <Link href="/faq" className="text-slate-600 hover:text-sky-600">
                  よくある質問（FAQ）
                </Link>
              </li>

              {/* Monetization section */}
              <li className="pt-2">
                <Link
                  href="/recommendations"
                  className="text-sky-600 hover:text-sky-700 font-bold"
                >
                  推奨ツール・サービス
                </Link>
              </li>

              <li>
                <Link
                  href="/conoha"
                  className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1"
                >
                  <span className="text-[10px] bg-indigo-100 px-1.5 py-0.5 rounded text-indigo-700">
                    特集
                  </span>
                  ConoHa WING 徹底解説
                </Link>
              </li>

            </ul>
          </div>

          {/* Column 3: Site Links & Legal */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              運営情報
            </div>

            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-sky-600">
                  このサイトについて
                </Link>
              </li>

              <li>
                <Link href="/how-it-works" className="text-slate-600 hover:text-sky-600">
                  チェックの仕組み
                </Link>
              </li>

              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-sky-600">
                  プライバシーポリシー
                </Link>
              </li>

              <li>
                <Link href="/terms" className="text-slate-600 hover:text-sky-600">
                  利用規約
                </Link>
              </li>

              <li>
                <Link href="/contact" className="text-slate-600 hover:text-sky-600">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} {SITE.name}
          </div>
        </div>
      </div>
    </footer>
  );
}