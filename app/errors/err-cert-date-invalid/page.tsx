import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "ERR_CERT_DATE_INVALIDとは？原因と対処 | サイトダウン",
  description:
    "ERR_CERT_DATE_INVALID の意味、証明書の期限切れや端末時刻ずれで起きる原因、ユーザー側での切り分け方、運営者側の確認ポイントを実用的に解説します。",
};

export default function ErrCertDateInvalidPage() {
  return (
    <EvergreenPageShell
      h1="ERR_CERT_DATE_INVALIDとは？原因と対処"
      updatedAt="2026-04-11"
      lead={[
        "ERR_CERT_DATE_INVALID は、アクセス先サイトの証明書の有効期間と、ブラウザが認識している現在時刻が合わないときに出るエラーです。",
        "多くはサイト側の証明書期限切れや更新ミスですが、自分の端末の日時ずれだけで起きることもあります。SSLエラーの中でも、まず『証明書の日付』と『端末の時計』を見るべきタイプです。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "端末の日時設定がずれていないかを最初に確認する",
            "別端末や別回線でも同じなら、サイト側の証明書期限切れを疑う",
            "自分のPCだけで出るなら、OS時刻、時刻同期、ブラウザ環境を優先して疑う",
            "証明書名の不一致ではなく『期限・日付』の問題なので、まず時刻関連から見ると早い",
          ],
        },
        {
          type: "list",
          title: "このエラーで起きていること",
          items: [
            "ブラウザが、証明書の有効開始日または有効期限と現在時刻が一致しないと判断している",
            "HTTPS 接続そのものは試みているが、証明書の信頼確認で止まっている",
            "原因は証明書期限切れ、時刻ずれ、更新直後の不整合などが中心",
          ],
        },
        {
          type: "list",
          title: "主な原因（サイト側）",
          items: [
            "SSL証明書の期限切れ",
            "証明書更新漏れや自動更新失敗",
            "新しい証明書への切り替えが一部サーバーだけ反映されていない",
            "CDNやロードバランサ配下で古い証明書が残っている",
            "有効開始日前の証明書が誤って配信されている",
          ],
        },
        {
          type: "list",
          title: "主な原因（ユーザー側）",
          items: [
            "PCやスマホの日時が大きくずれている",
            "時刻同期がオフになっている、または失敗している",
            "古いOSや古いブラウザで証明書検証が不安定になっている",
            "会社・学校端末で時刻や証明書ポリシーの影響を受けている",
          ],
        },
        {
          type: "list",
          title: "見分け方の目安",
          items: [
            "どの端末・どの回線でも同じなら、サイト側の証明書期限切れや更新不備の可能性が高い",
            "自分のPCだけで出るなら、端末時刻やブラウザ環境の可能性が高い",
            "スマホでも同じ警告が出るなら、サイト側要因をかなり疑いやすい",
            "会社PCだけで出るなら、端末管理ポリシーや時刻同期不良も候補に入る",
          ],
        },
        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) 端末の日時・タイムゾーン・自動時刻設定を確認する",
            "2) 別ブラウザ、別端末、別回線で同じか比較する",
            "3) ページを開き直し、証明書更新直後の反映遅れを疑って少し待つ",
            "4) 会社・学校端末なら別回線や私物端末でも比較する",
            "5) 安全性が確認できない限り、警告を無視して進まない",
          ],
        },
        {
          type: "p",
          title: "『自分だけ』か『サイト全体』かを先に分ける",
          body: [
            "このエラーは、端末時刻ずれだけでも起きるので、いきなりサイト障害と決めつけないことが重要です。まず別端末と別回線で比較すれば、サイト側か手元要因かをかなり絞れます。",
            <>
              外部からの疎通を見たいなら{" "}
              <Link href="/" className="underline hover:no-underline">
                接続チェックツール
              </Link>{" "}
              を使い、より広い証明書警告の見方は{" "}
              <Link
                href="/errors/your-connection-is-not-private"
                className="underline hover:no-underline"
              >
                この接続ではプライバシーが保護されません
              </Link>{" "}
              も参考になります。
            </>,
          ],
        },
        {
          type: "p",
          title: "NET::ERR_CERT_COMMON_NAME_INVALID や SSL Handshake Failed との違い",
          body: [
            "ERR_CERT_DATE_INVALID は『証明書の期限・日付』に寄ったエラーです。証明書名が違う場合や、TLS交渉全体が失敗している場合とは原因の中心が異なります。",
            <>
              証明書名の不一致なら{" "}
              <Link
                href="/errors/net-err-cert-common-name-invalid"
                className="underline hover:no-underline"
              >
                NET::ERR_CERT_COMMON_NAME_INVALID
              </Link>{" "}
              が近く、TLS のやり取り全体が怪しいなら{" "}
              <Link
                href="/errors/ssl-handshake-failed"
                className="underline hover:no-underline"
              >
                SSL Handshake Failed
              </Link>{" "}
              や{" "}
              <Link
                href="/errors/err-ssl-protocol-error"
                className="underline hover:no-underline"
              >
                ERR_SSL_PROTOCOL_ERROR
              </Link>{" "}
              が近いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "スマホでは開くのにPCだけ警告が出る場合",
          body: [
            "このパターンはサイト側より、PCの時計ずれ、古いブラウザ、社内端末設定の影響であることが多めです。",
            <>
              端末差の切り分けでは{" "}
              <Link
                href="/troubleshooting/site-works-on-phone-not-computer"
                className="underline hover:no-underline"
              >
                スマホでは開くのにパソコンで開かない原因
              </Link>{" "}
              も近いページです。
            </>,
          ],
        },
        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. これはサーバーダウンですか？ → 多くは違います。証明書の有効期間チェックで止まっています。",
            "Q. 自分だけ出ることはありますか？ → あります。端末の時計ずれだけでも起きます。",
            "Q. 少し待てば直りますか？ → サイト側の証明書更新直後なら反映待ちで直ることがありますが、端末時刻ずれなら自分側の修正が必要です。",
            "Q. 警告を無視して進んでもいいですか？ → 安全性を確認できない限り推奨できません。ログインや決済では特に避けるべきです。",
          ],
        },
        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks
              key="related"
              currentSlug="err-cert-date-invalid"
            />,
          ],
        },
      ]}
    />
  );
}
