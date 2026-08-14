import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "Cloudflare 521エラーとは？原因と直し方 | サイトダウン",
  description:
    "Cloudflare 521（Web server is down）の意味、オリジンサーバーが接続を拒否する主な原因、ユーザー側でできる確認し、運営者側の確認ポイントを実用的に解説します。",
};

export default function Cloudflare521Page() {
  return (
    <EvergreenPageShell
      h1="Cloudflare 521エラーとは？原因と直し方"
      updatedAt="2026-04-11"
      lead={[
        "Cloudflare 521 は、Cloudflare がオリジンサーバーへ接続しようとしたときに、接続そのものを拒否された場合に出るエラーです。",
        "522 のような接続待ちのタイムアウトではなく、オリジン側が応答前に拒否しているのがポイントです。多くはサイト側の設定やオリジンサーバーの受け付け状態に原因があります。",
      ]}
      sections={[
        {
          type: "list",
          title: "まず結論：521で起きていること",
          items: [
            "ブラウザ → Cloudflare までは到達できている",
            "Cloudflare → オリジンサーバー接続の段階で拒否されている",
            "原因はサイト側のオリジン設定、ファイアウォール、Webサーバー停止が中心",
          ],
        },
        {
          type: "list",
          title: "よくある原因（サイト側）",
          items: [
            "オリジンサーバーの Web サーバーが停止している、または再起動中",
            "オリジン側のファイアウォールが Cloudflare のIPレンジを拒否している",
            "80番または443番ポートで待ち受ける設定が壊れている",
            "Nginx や Apache は動いていても、仮想ホスト設定やTLS設定が崩れて接続を受け付けていない",
            "直近の移設、WAF変更、サーバー防御設定変更で Cloudflare からの接続だけ落としている",
          ],
        },
        {
          type: "list",
          title: "521が出やすい場面",
          items: [
            "サーバー移設やCDN導入直後で、オリジン側の許可設定が揃っていない",
            "Cloudflare の背後にある Web サーバーが停止・再起動している",
            "セキュリティソフト、Fail2ban、WAF、ホスティング側防御で Cloudflare を誤遮断している",
            "HTTP は開くが HTTPS だけ拒否、またはその逆でポート別に設定不整合がある",
          ],
        },
        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) 少し待って再試行する（短時間の再起動や設定反映中なら戻ることがある）",
            "2) 別回線で試す（Wi-Fi→モバイル回線）",
            "3) 公式ステータスやSNSで障害情報を確認する",
            "4) 何度も連打せず、サイト側の復旧待ちを前提にする",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "複数端末・複数回線で同時に出るなら、サイト側のオリジン拒否を疑いやすい",
            "Cloudflare のエラー画面までは出るなら、完全なDNS不達よりオリジン接続拒否の可能性が高い",
            "522 や 524 と違い、521 は『遅い』より『受け付けていない』症状に近い",
            "自分だけに見えても、まずは別回線比較で局所問題か全体問題かを確認する",
          ],
        },
        {
          type: "list",
          title: "運営者側の確認ポイント（サイト管理者向け）",
          items: [
            "Web サーバーが本当に起動しているか、80/443 で待ち受けているか確認する",
            "Cloudflare のIPレンジをファイアウォールやWAFでブロックしていないか確認する",
            "Nginx/Apache の仮想ホスト設定、TLS証明書、リスン設定の不整合を確認する",
            "直近のセキュリティ設定変更、Fail2ban、ホスティング側自動防御の影響を戻して比較する",
            "Cloudflare を経由しないオリジン直アクセスで正常応答するか確認する",
          ],
        },
        {
          type: "div",
          title: "このエラーが『サイト全体』か『自分だけ』か確認する",
          body: [
            "521 はサイト側要因がかなり強いエラーですが、回線差や一時的な経路不調を完全には否定できません。まず外部からの到達可否を見て、局所問題か全体問題かを確認するのが早いです。",
            <div
              key="cta"
              className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm font-bold text-slate-900">
                外部から到達できるかをチェック →
              </p>
              <Link
                href="/"
                className="mt-2 inline-block text-sky-600 font-bold underline"
              >
                サイトダウンで接続チェックする
              </Link>
              <p className="mt-2 text-xs text-slate-600">
                こちらでも到達できないなら、オリジン停止やオリジン側拒否の可能性が高くなります。
              </p>
            </div>,
          ],
        },
        {
          type: "list",
          title: "関連エラーとの違い",
          items: [
            "Cloudflare 520：接続はできたが、オリジンから想定外または壊れた応答が返っている",
            "Cloudflare 522：Cloudflare がオリジンへ接続しようとしても接続確立できず時間切れになっている",
            "Cloudflare 524：接続自体はできたが、オリジンの処理完了待ちで時間切れになっている",
            "502 Bad Gateway：上流から正しい応答が返らずゲートウェイ処理が失敗している",
          ],
        },
        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. 521 は Cloudflare 障害ですか？ → 多くは違います。Cloudflare は見えており、オリジン側が接続を拒否しているケースが中心です。",
            "Q. 521 はサーバーダウンと同じですか？ → 近いことは多いですが、完全停止だけでなくファイアウォール拒否や設定不整合でも起こります。",
            "Q. 522 との違いは？ → 521 は拒否、522 は接続確立待ちのタイムアウトです。",
            "Q. すぐ直りますか？ → 一時的な再起動中なら短時間で戻ることもありますが、設定や遮断が原因なら運営者側の修正が必要です。",
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [<ErrorRelatedLinks key="related" currentSlug="cloudflare-521" />],
        },
      ]}
    />
  );
}
