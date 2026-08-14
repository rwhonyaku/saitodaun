import { AFFILIATE_LINKS } from "@/lib/affiliateLinks";

export default function SurfsharkAffiliateBlock() {
  const href = AFFILIATE_LINKS.surfshark?.url?.trim();

  if (!href) {
    return null;
  }

  return (
    <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50/70 p-5">
      <p className="text-xs font-bold text-sky-700 uppercase tracking-wide">
        VPNを検討する場合の一例
      </p>
      <p className="mt-2 text-sm text-slate-700 leading-relaxed">
        地域制限やネットワーク制限、公共Wi-Fiでの確認が必要な場面では、VPNが役立つことがあります。
        Surfshark は当サイトで紹介している選択肢の一例で、複数端末で使いやすく、公共Wi-Fiや日常利用も含めて見やすい候補です。
        ただし、サービス自体の障害は VPN では解決しません。必要な場合のみ検討してください。
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-slate-500">
          当サイトはアフィリエイト広告を利用しています。
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-bold text-white hover:bg-sky-700 transition-colors"
        >
          Surfsharkを確認する
        </a>
      </div>
    </div>
  );
}
