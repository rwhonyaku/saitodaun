export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-slate-800 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-4">利用規約</h1>

      <p className="mb-4">
        本利用規約（以下「本規約」といいます）は、サイトダウン（以下「本サイト」といいます）の利用条件を定めるものです。本サイトをご利用になる前に、本規約をよくお読みください。本サイトを利用した時点で、本規約に同意したものとみなします。
      </p>

      <h2 className="font-semibold mt-6 mb-2">1. サービス内容</h2>
      <p className="mb-4">
        本サイトは、指定したウェブサイトがオンラインかオフラインかを簡易的に確認するためのツールを提供します。本サイトが表示する結果は、アクセス時点の簡易的な応答状況を示すものであり、正確性や完全性を保証するものではありません。
      </p>

      <h2 className="font-semibold mt-6 mb-2">2. 免責事項</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>本サイトの判定結果の正確性は保証されません。</li>
        <li>本サイトの利用により生じたいかなる損害についても、運営者は責任を負いません。</li>
        <li>本サイトは予告なく内容の変更、中断、停止を行う場合があります。</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">3. 禁止事項</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>本サイトの不正利用、過度な負荷をかける行為</li>
        <li>本サイトの内容を無断で転載・複製する行為</li>
        <li>その他、運営者が不適切と判断する行為</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">4. プライバシー</h2>
      <p className="mb-4">
        本サイトは個人情報を収集しませんが、アクセス解析等により技術的情報が自動的に記録される場合があります。詳細はプライバシーポリシーをご確認ください。
      </p>

      <h2 className="font-semibold mt-6 mb-2">5. 規約の変更</h2>
      <p className="mb-4">
        運営者は必要に応じて本規約を変更することができます。変更後の規約は、本サイトに掲載された時点で効力を生じます。
      </p>

      <h2 className="font-semibold mt-6 mb-2">6. お問い合わせ</h2>
      <p>
        本規約に関するお問い合わせは、サイト運営者までご連絡ください。
      </p>
      <p className="text-xs text-slate-500 mt-6">
  最終更新日：{new Date().toLocaleDateString("ja-JP")}
</p>

    </div>
  );
}
