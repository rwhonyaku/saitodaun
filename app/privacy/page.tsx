export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-slate-800 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">プライバシーポリシー</h1>

      <p className="mb-4">
        本サイト（「サイトダウン」）では、個人を特定できる情報の収集は行っておりません。
        ただし、アクセス解析ツールや広告配信のために、技術的な情報が自動的に取得される場合があります。
      </p>

      <h2 className="font-semibold mt-6 mb-2">1. 自動的に収集される情報</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>IPアドレス（匿名化される場合があります）</li>
        <li>ブラウザ・デバイス情報</li>
        <li>アクセス日時</li>
        <li>参照元URL</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">2. 利用目的</h2>
      <p className="mb-4">
        本サイトの改善、利用状況の把握、セキュリティ向上のために使用します。
        個人を特定する目的では利用しません。
      </p>

      <h2 className="font-semibold mt-6 mb-2">3. 第三者サービス（Google AdSense等）</h2>
      <p className="mb-4">
        本サイトでは広告配信に Google AdSense を使用する場合があります。
        Google は広告配信のために Cookie を使用することがあります。
        詳細は Google のポリシーをご確認ください。
      </p>

      <h2 className="font-semibold mt-6 mb-2">4. 免責事項</h2>
      <p className="mb-4">
        本サイトの利用によって発生したいかなる損害についても、運営者は責任を負わないものとします。
      </p>

      <h2 className="font-semibold mt-6 mb-2">5. お問い合わせ</h2>
      <p>必要に応じて、本ページに連絡方法を追記する場合があります。</p>
    <p className="text-xs text-slate-500 mt-6">
  最終更新日：{new Date().toLocaleDateString("ja-JP")}
</p>

    </div>
  );
}
