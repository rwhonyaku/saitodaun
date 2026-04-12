"use client";

import React from 'react';
import Link from 'next/link';

export default function ConoHaPromoCard() {
  // Campaign-specific link (Max conversion / pl_id=69093)
  const CLICK_URL = "https://af.moshimo.com/af/c/click?a_id=5400008&p_id=2312&pc_id=4967&pl_id=69093";
  // Essential Tracking Pixel
  const PIXEL_URL = "https://i.moshimo.com/af/i/impression?a_id=5400008&p_id=2312&pc_id=4967&pl_id=69093";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-sky-600 to-indigo-700 p-6 text-white shadow-xl border border-white/10 group">
      {/* Decorative Blur Background Effect */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <span className="bg-rose-500 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter animate-pulse shadow-lg">
            Limited Campaign
          </span>
          <span className="text-[10px] font-bold opacity-80 border-b border-white/30">
            PR / 広告
          </span>
        </div>
        
        <h3 className="text-2xl font-black mb-1 leading-tight tracking-tight">
          ConoHa WING
        </h3>
        <p className="text-[11px] font-bold text-sky-100 mb-5 uppercase tracking-[0.15em] opacity-90">
          国内最速No.1・高性能レンタルサーバー
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/5">
            <span className="flex-none flex items-center justify-center w-6 h-6 bg-white text-sky-600 rounded-lg text-xs font-bold">得</span>
            <div>
              <p className="text-[11px] font-bold">最大53%OFF & ドメイン2本無料</p>
              <p className="text-[9px] opacity-70">月額652円〜 業界最安級の維持費</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/5">
            <span className="flex-none flex items-center justify-center w-6 h-6 bg-white text-sky-600 rounded-lg text-xs font-bold">速</span>
            <div>
              <p className="text-[11px] font-bold">WordPress表示速度 国内1位</p>
              <p className="text-[9px] opacity-70">独自技術のキャッシュ機能で爆速化</p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="space-y-4 text-center">
          {/* Primary CTA: Official Site */}
          <a 
            href={CLICK_URL} 
            target="_blank" 
            rel="noopener noreferrer nofollow"
            className="block w-full py-3.5 bg-white text-sky-700 rounded-2xl text-sm font-black hover:bg-sky-50 transition-all transform hover:-translate-y-1 active:scale-95 shadow-[0_8px_20px_-5px_rgba(0,0,0,0.3)]"
          >
            特典付きで公式サイトを見る
          </a>

          {/* Secondary CTA: Internal Technical Guide */}
          <div className="flex flex-col gap-2">
            <Link 
              href="/conoha" 
              className="text-[11px] font-bold text-sky-100 underline underline-offset-4 hover:text-white transition-colors opacity-90"
            >
              技術解説・14,000円還元の受け取り方 →
            </Link>
          </div>
          
          {/* Footer Info */}
          <div className="flex flex-col gap-1 pt-2 border-t border-white/10">
            <p className="text-[10px] font-bold text-sky-100/80">
              ※セルフバック利用で最大14,000円還元対象
            </p>
            <p className="text-[9px] opacity-60">
              最短10分・初期費用0円で利用可能
            </p>
          </div>
        </div>

        {/* Hidden Tracking Pixel for Impression Data */}
        <img 
          src={PIXEL_URL} 
          width="1" height="1" 
          style={{ border: 'none', display: 'none' }} 
          loading="lazy"
          alt="" 
        />
      </div>
    </div>
  );
}