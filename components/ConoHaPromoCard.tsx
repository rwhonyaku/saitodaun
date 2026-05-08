"use client";

import React from "react";
import Link from "next/link";

type ConoHaPromoCardProps = {
  variant?: "general" | "dns";
};

export default function ConoHaPromoCard({
  variant = "general",
}: ConoHaPromoCardProps) {
  const clickUrl =
    "https://af.moshimo.com/af/c/click?a_id=5400008&p_id=2312&pc_id=4967&pl_id=92340";
  const pixelUrl =
    "https://i.moshimo.com/af/i/impression?a_id=5400008&p_id=2312&pc_id=4967&pl_id=92340";
  const body =
    variant === "dns"
      ? "DNS設定・SSL設定・サーバー応答の問題が続く場合は、サーバー環境や管理画面の使いやすさも見直しポイントになります。国内レンタルサーバーの選択肢としてConoHa WINGがあります。"
      : "サイトが見れない原因がサーバー側にある場合もあります。表示速度や安定性を重視するなら、国内サーバーの選択肢としてConoHa WINGも検討できます。";

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-800">
      <p className="text-xs font-bold text-slate-500">サイト運営者向け</p>
      <p className="mt-2 text-sm leading-relaxed">{body}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <a
          href={clickUrl}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="font-bold text-sky-700 underline underline-offset-4"
        >
          ConoHa WING を確認する
        </a>
        <Link
          href="/conoha"
          className="font-bold text-slate-600 underline underline-offset-4"
        >
          解説ページを見る
        </Link>
      </div>
      <p className="mt-3 text-xs text-slate-500">広告・アフィリエイトリンクを含みます。</p>
      <img
        src={pixelUrl}
        width="1"
        height="1"
        style={{ border: "none", display: "none" }}
        loading="lazy"
        alt=""
      />
    </div>
  );
}
