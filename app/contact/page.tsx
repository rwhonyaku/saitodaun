import { SITE } from "@/lib/siteMeta";

export const metadata = {
  title: "お問い合わせ | サイトダウン",
  description: `${SITE.name}へのお問い合わせ方法、不具合報告、および運営への連絡先をまとめています。`,
  alternates: { canonical: "/contact" },
};

const EMAIL_DISPLAY = "admin@サイトダウン.com";
const EMAIL_PUNYCODE = "admin@xn--ecke7b4bzb0s.com";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-slate-800 text-sm leading-relaxed">
      {/* Breadcrumb for consistency with other pages */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
        <a href="/" className="hover:text-sky-600 transition-colors">TOP</a>
        <span>/</span>
        <span className="text-slate-600">お問い合わせ</span>
      </div>

      <h1 className="text-2xl font-bold mb-6 border-b pb-2">お問い合わせ</h1>

      <p className="mb-8">
        {SITE.name} のサービス内容、不具合報告、またはプレス・広告掲載に関するお問い合わせは、以下の窓口より受付けております。
        利用者様からの貴重なフィードバックは、システムの精度向上に活用させていただきます。
      </p>

      {/* Primary Contact Box */}
      <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm mb-10">
        <h2 className="font-bold text-base mb-4 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-sky-500 rounded-full" />
          運営事務局 サポート窓口
        </h2>
        
        <div className="space-y-6">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em] mb-1">
              Email (Primary)
            </p>
            <a
              className="text-sky-600 underline hover:text-sky-700 text-xl font-bold break-all"
              href={`mailto:${EMAIL_PUNYCODE}`}
            >
              {EMAIL_DISPLAY}
            </a>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 leading-relaxed italic">
              ※日本語ドメイン対応のメール環境から送信してください。お使いの環境でエラーが出る場合は、以下の「互換用アドレス（Punycode）」宛にお送りください。
            </p>
            <div className="mt-3 bg-slate-50 p-3 rounded-lg border border-dashed border-slate-200">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Compatible Address</p>
              <a
                className="text-slate-600 underline hover:text-sky-600 break-all font-mono text-xs"
                href={`mailto:${EMAIL_PUNYCODE}`}
              >
                {EMAIL_PUNYCODE}
              </a>
            </div>
          </div>
        </div>
      </div>

      <h2 className="font-bold text-lg mb-6">主な受付内容</h2>
      
      {/* Restored Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-sky-200 transition-colors">
          <p className="font-bold text-slate-900 mb-2">🛠 技術的な不具合・修正</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            特定のURLでの誤判定、リンク切れ、表示崩れの報告、APIの動作不備など。
          </p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-sky-200 transition-colors">
          <p className="font-bold text-slate-900 mb-2">📈 サービス追加リクエスト</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            「接続状況一覧」に追加してほしい主要なサイトやWebアプリ、SNS等の提案。
          </p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-sky-200 transition-colors">
          <p className="font-bold text-slate-900 mb-2">💼 プレス・広告掲載</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            メディア掲載の事実確認し、純広告・タイアップ広告枠に関するご相談。
          </p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-sky-200 transition-colors">
          <p className="font-bold text-slate-900 mb-2">⚖ 権利侵害に関する申立て</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            掲載内容の修正・削除依頼、商標権や著作権に関する法的通知。
          </p>
        </div>
      </div>

      <h2 className="font-bold text-lg mb-4">返信に関するポリシー</h2>
      <div className="space-y-4 text-slate-700">
        <p>
          お送りいただいた内容はすべて専任スタッフが目を通しております。原則として、サービス改善に直結する内容や重要なご提案については、<span className="font-bold text-slate-900 underline decoration-sky-300">3営業日以内</span>を目安に回答させていただきます。
        </p>
        <p>
          ただし、以下のような内容については個別の回答を差し控えさせていただく場合がございます。
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1 text-xs text-slate-500">
          <li>利用者個人の通信環境（ルーター・プロバイダ設定）のトラブル解決</li>
          <li>外部サービス（X, Amazon等）の障害原因の詳細調査依頼</li>
          <li>誹謗中傷、公序良俗に反する内容、営業・勧誘目的のメール</li>
        </ul>
      </div>

      <footer className="mt-12 pt-6 border-t border-slate-200">
        <p className="text-xs text-slate-400">最終更新日：2026-02-22</p>
      </footer>
    </div>
  );
}