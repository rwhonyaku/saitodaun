import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "特定のサイトだけ開かない原因は？最短の切り分けと対処",
  description:
    "一つのサイトだけ開けない時に、サイト障害、DNS、ブラウザ、Wi-Fi、VPNやアクセス制限のどれが原因かを別回線・別端末で切り分けます。",
  alternates: { canonical: "/troubleshooting/specific-site-not-working" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="特定のサイトだけ開かない原因は？最短の切り分け"
      lead={[
        "ほかのサイトは見られるのに一つのサイトだけ開かない場合は、通信全体よりも、そのサイトの障害・DNS・ブラウザ・回線ごとの制限を疑います。",
        "同じURLを別回線と別端末で試すと、サイト側か自分側かを短時間で切り分けられます。",
      ]}
      sections={[
        {
          type: "list",
          title: "最初の3分で確認する",
          items: [
            <span key="check">
              <Link href="/" className="font-bold text-sky-600 underline">
                対象URLを接続チェック
              </Link>
              し、外部から応答するか確認する
            </span>,
            "Wi-Fiを切ってモバイル回線で同じURLを開く",
            "シークレットモード、または別の端末で同じURLを開く",
          ],
        },
        {
          type: "div",
          title: "結果から原因を判断する",
          body: [
            <div key="decision" className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid gap-1 border-b border-slate-200 p-4 sm:grid-cols-[11rem_1fr]">
                <p className="font-bold text-slate-900">どの回線・端末でも開かない</p>
                <p>サイト側の障害やメンテナンスの可能性が高めです。主要サービスなら <Link href="/services" className="underline">サービス別ページ</Link>、一般サイトなら接続チェックの結果と公式案内を確認します。</p>
              </div>
              <div className="grid gap-1 border-b border-slate-200 p-4 sm:grid-cols-[11rem_1fr]">
                <p className="font-bold text-slate-900">モバイル回線なら開く</p>
                <p>Wi-Fi、ルーター、DNS、会社・学校の制限が候補です。<Link href="/troubleshooting/website-loads-on-phone-not-wifi" className="underline">Wi-Fiだけで開かない時の確認</Link>へ進みます。</p>
              </div>
              <div className="grid gap-1 border-b border-slate-200 p-4 sm:grid-cols-[11rem_1fr]">
                <p className="font-bold text-slate-900">別ブラウザなら開く</p>
                <p>キャッシュ、Cookie、拡張機能が候補です。シークレットモードで再確認し、問題のあるブラウザだけ保存データや拡張機能を見直します。</p>
              </div>
              <div className="grid gap-1 p-4 sm:grid-cols-[11rem_1fr]">
                <p className="font-bold text-slate-900">トップだけ開く</p>
                <p>ログイン、決済、APIなどの部分障害やアカウント制限が候補です。失敗する操作と表示されたエラーを記録し、公式サポートを確認します。</p>
              </div>
            </div>,
          ],
        },
        {
          type: "list",
          title: "表示されたエラーで次を決める",
          items: [
            <span key="dns">「サーバーが見つかりません」「NXDOMAIN」なら <Link href="/troubleshooting-dns" className="underline">DNSトラブルの確認</Link></span>,
            <span key="timeout">「ERR_CONNECTION_TIMED_OUT」なら <Link href="/errors/err-connection-timed-out" className="underline">接続タイムアウトの原因と対処</Link></span>,
            <span key="reset">「ERR_CONNECTION_RESET」なら <Link href="/errors/connection-reset" className="underline">接続がリセットされた時の確認</Link></span>,
            <span key="access">「403」「429」ならアクセス権限、地域・IP制限、短時間の連続アクセスを確認する</span>,
            <span key="server">「500」「502」「503」「504」ならサイト側の障害を優先して疑う</span>,
            <span key="ssl">SSLや証明書の警告なら、先へ進まず <Link href="/errors/your-connection-is-not-private" className="underline">証明書エラーの確認</Link>を行う</span>,
          ],
        },
        {
          type: "list",
          title: "自分側だった場合の対処順",
          items: [
            "VPN・プロキシをいったんオフにする",
            "シークレットモードで開き、拡張機能の影響を除外する",
            "対象サイトのCookieとキャッシュだけを削除する",
            "端末とルーターを再起動する",
            <span key="dns-next">回線によって結果が違う場合は <Link href="/troubleshooting-dns" className="underline">DNS設定を確認する</Link></span>,
          ],
        },
        {
          type: "note",
          title: "接続チェックがオンラインでも使えない場合",
          body: [
            "接続チェックは公開URLから応答が返るかを確認します。ログイン後の画面、決済、アプリ内API、個別アカウントの制限までは判定できません。トップページは開くのに操作だけ失敗する場合は、サービスの公式障害情報やサポートを確認してください。",
          ],
        },
      ]}
      updatedAt="2026-08-25"
    />
  );
}
