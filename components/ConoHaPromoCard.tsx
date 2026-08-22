"use client";

import React from "react";
import Link from "next/link";
import AffiliateLink from "@/components/AffiliateLink";
import { AFFILIATE_LINKS } from "@/lib/affiliateLinks";

type ConoHaPromoCardProps = {
  context: "site-owner-overload" | "site-owner-downtime";
};

export default function ConoHaPromoCard({
  context,
}: ConoHaPromoCardProps) {
  const offer = AFFILIATE_LINKS.conoha;
  const body =
    context === "site-owner-overload"
      ? "自分が運営するWordPressサイトで、アクセス集中時の503や遅延が繰り返される場合は、現在のサーバー制限を確認したうえで移転先を比較できます。ConoHa WINGはその候補の一つです。"
      : "自分が運営するWordPressサイトだけが繰り返し停止し、画像・プラグイン・DNSを確認してもサーバー性能が原因として残る場合は、ConoHa WINGを移転候補として比較できます。";

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-800">
      <p className="text-xs font-bold text-slate-500">サイト運営者向け</p>
      <p className="mt-2 text-sm leading-relaxed">{body}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <AffiliateLink
          href={offer.url}
          product="conoha_wing"
          placement={`promo_card_${context}`}
          className="font-bold text-sky-700 underline underline-offset-4"
        >
          契約期間ごとの料金を確認する
        </AffiliateLink>
        <Link
          href="/conoha"
          className="font-bold text-slate-600 underline underline-offset-4"
        >
          解説ページを見る
        </Link>
      </div>
      <p className="mt-3 text-xs text-slate-500">広告・アフィリエイトリンクを含みます。</p>
      <img
        src={offer.impressionUrl}
        width="1"
        height="1"
        style={{ border: "none", display: "none" }}
        loading="lazy"
        alt=""
      />
    </div>
  );
}
