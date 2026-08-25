import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "Cloudflare 523エラーとは？原因と直し方",
  description:
    "Cloudflare 523（Origin is unreachable）の意味、オリジンサーバーへ到達できない主な原因、DNSや経路設定ミスとの関係、ユーザー側と運営側の見分け方を実用的に解説します。",
  alternates: { canonical: "/errors/cloudflare-523" }
};

export default function Cloudflare523Page() {
  return (
    <EvergreenPageShell
      h1="Cloudflare 523エラーとは？原因と直し方"
      updatedAt="2026-04-12"
      lead={[
        "Cloudflare 523 は、Cloudflare 自体には到達できているものの、その背後にあるオリジンサーバーへ到達できないときに出るエラーです。",
        "521 のような接続拒否でも、522 のような接続待ちタイムアウトでもなく、『そもそもオリジンへ届く経路や宛先が正しくない』ときに起きやすいのがポイントです。多くはサイト側の DNS、オリジンIP、ルーティング設定に原因があります。",
      ]}
      sections={[
        {
          type: "list",
          title: "まず結論：523で起きていること",
          items: [
            "ブラウザ → Cloudflare までは到達できている",
            "Cloudflare → オリジンサーバーの到達性が確保できていない",
            "原因はオリジンIPの誤り、古いDNS設定、ルーティング不整合、オリジン到達経路の断絶が中心",
          ],
        },
        {
          type: "list",
          title: "よくある原因（サイト側）",
          items: [
            "Cloudflare 側に登録されたオリジンIPが古い、または誤っている",
            "DNS 変更やサーバー移設後にオリジン到達先が更新されていない",
            "オリジンサーバーが別ネットワークへ移動し、経路が切れている",
            "IPv4 と IPv6 のどちらかだけが不整合で、到達不能な宛先を引いている",
            "オリジン側のルーティングや上流ネットワーク障害で Cloudflare から届かない",
            "Cloudflare の背後に置くべきでない内部向けアドレスや閉域向けアドレスを参照している",
          ],
        },
        {
          type: "list",
          title: "523が出やすい場面",
          items: [
            "サーバー移設やIP変更の直後",
            "DNS 切り替えやレコード修正の途中",
            "Cloudflare 導入直後でオリジン設定が揃っていない",
            "A レコードや AAAA レコードの片方だけが古いまま残っている",
            "一部地域や一部経路だけでオリジンへ届かないネットワーク障害が起きている",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "523 は『オリジンに届かない』であり、『届くが拒否される』521 とは違う",
            "523 は『到達先が不正または到達不能』であり、『届くまでが遅い』522 や 524 とも違う",
            "Cloudflare の画面までは出るが本文がまったく開かないなら、この系統を疑いやすい",
            "DNS や移設直後に発生したなら、単純なサーバー過負荷より設定不整合の可能性が高い",
          ],
        },
        {
          type: "p",
          title: "DNSやオリジンIPの不整合で起きやすい",
          body: [
            "Cloudflare 523 は、Cloudflare が参照しているオリジン先が正しくないときに起きやすいエラーです。たとえばサーバーは新しいIPへ移設済みなのに、Cloudflare 側は古い宛先を見ていると、Cloudflare 自体は生きていても背後のサーバーへ届きません。",
            <>
              DNS の整理が怪しいときは{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNSトラブルシューティング
              </Link>{" "}
              も近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "521・522・524との違い",
          body: [
            "Cloudflare 系の 52x は似て見えますが、失敗箇所が少しずつ違います。523 はオリジンへ到達できない、521 は到達したが拒否された、522 は接続確立が間に合わない、524 は接続後の応答完了が遅すぎる、という確認です。",
            <>
              近いページとして{" "}
              <Link
                href="/errors/cloudflare-521"
                className="underline hover:no-underline"
              >
                Cloudflare 521
              </Link>
              、{" "}
              <Link
                href="/errors/cloudflare-522"
                className="underline hover:no-underline"
              >
                Cloudflare 522
              </Link>
              、{" "}
              <Link
                href="/errors/cloudflare-524"
                className="underline hover:no-underline"
              >
                Cloudflare 524
              </Link>{" "}
              も見比べると整理しやすくなります。
            </>,
          ],
        },
        {
          type: "p",
          title: "ユーザー側でできることは限られる",
          body: [
            "523 はサイト側設定や到達経路の問題であることが多く、利用者側で直接直せることは多くありません。別回線で比べる、時間を置く、公式障害情報を確認する、といった確認が中心になります。",
            <>
              特定サービスで起きているなら{" "}
              <Link
                href="/services"
                className="underline hover:no-underline"
              >
                サービス別トラブルページ
              </Link>{" "}
              や{" "}
              <Link
                href="/outages/japan"
                className="underline hover:no-underline"
              >
                ネット障害情報
              </Link>{" "}
              も確認候補です。
            </>,
          ],
        },
        {
          type: "list",
          title: "ユーザー側で試せる確認",
          items: [
            "1) 少し時間を置いて再試行する",
            "2) 別回線で同じ症状か比較する",
            "3) 公式ステータスや障害情報を確認する",
            "4) 特定ページだけか、サイト全体かを見分ける",
          ],
        },
        {
          type: "list",
          title: "運営側の確認ポイント（サイト管理者向け）",
          items: [
            "Cloudflare に設定されたオリジンIPが現在のサーバーと一致しているか確認する",
            "A レコード、AAAA レコード、オリジン到達先に古い値が残っていないか確認する",
            "サーバー移設やDNS変更直後なら反映漏れや設定の分裂を疑う",
            "Cloudflare を経由しないオリジン直アクセスで到達できるか確認する",
            "オリジン側ネットワークや上流回線で経路障害が起きていないか確認する",
            "IPv6 を使っているなら AAAA レコードの整合性も確認する",
          ],
        },
        {
          type: "div",
          title: "このエラーが『サイト全体』か『自分だけ』か確認する",
          body: [
            "523 はサイト側要因がかなり強いエラーですが、まず外部からも同じかを確認すると判断が速くなります。",
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
                こちらでも同様なら、オリジン到達性やDNS設定の問題がより濃くなります。
              </p>
            </div>,
          ],
        },
        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. 523 は Cloudflare 障害ですか？ → 多くは違います。Cloudflare 自体ではなく、その先のオリジンへ届かない状態です。",
            "Q. 521 と同じですか？ → 違います。521 は拒否、523 は到達不能です。",
            "Q. 自分だけ起きることはありますか？ → 可能性は低めですが、まず別回線で比較すると見分けやすいです。",
            "Q. すぐ直りますか？ → 一時的な経路障害なら戻ることもありますが、設定不整合なら運営側修正が必要です。",
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [<ErrorRelatedLinks key="related" currentSlug="cloudflare-523" />],
        },
      ]}
    />
  );
}
