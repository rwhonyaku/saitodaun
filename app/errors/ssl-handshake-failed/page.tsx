import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";
import ErrorRelatedLinks from "@/components/ErrorRelatedLinks";

export const metadata = {
  title: "SSL Handshake Failedとは？原因・直し方・切り分け方法 | サイトダウン",
  description:
    "SSL Handshake Failed の意味、証明書・TLS設定・Cloudflare等CDNの典型原因、ユーザー側でできる切り分け、運営者側の確認ポイント、よくある関連SSLエラーを解説します。",
};

export default function SSLHandshakePage() {
  return (
    <EvergreenPageShell
      h1="SSL Handshake Failedとは？原因と直し方"
      updatedAt="2026-03-03"
      lead={[
        "SSL Handshake Failed は、ブラウザとサーバーがHTTPS（TLS）接続を確立できなかったときに発生するエラーです。",
        "暗号通信の設定や証明書に問題があると起きます。サイト側の設定不備が原因のことが多いですが、端末の時刻ズレなど“手元要因”もあるため切り分けが重要です。",
      ]}
      sections={[
        {
          type: "list",
          title: "まず結論：SSL Handshake Failedで起きていること",
          items: [
            "HTTP（平文）ではなくHTTPS（暗号化）で接続しようとして失敗している",
            "証明書やTLS設定の不整合により、暗号通信の合意（ハンドシェイク）が成立しない",
            "多くはサイト側の設定問題。ただし端末側の時刻ズレ・古い環境・ネットワーク干渉でも起きる",
          ],
        },

        {
          type: "list",
          title: "主な原因（サイト側）",
          items: [
            "SSL証明書の期限切れ、または更新漏れ",
            "証明書チェーン（中間証明書）設定ミス",
            "TLS/暗号スイート設定が厳しすぎる（古い端末/ブラウザが対応できない）",
            "SNI/ホスト名不整合（複数ドメイン運用で誤った証明書が返る）",
            "Cloudflare等CDNとオリジンのTLS設定が噛み合っていない（Flexible/Full/Strictの不整合等）",
            "HTTPSリダイレクト/HTTP→HTTPSの設定不備でループや例外が発生している",
          ],
        },

        {
          type: "list",
          title: "Cloudflare利用時に多い原因",
          items: [
            "TLSモードの不一致（Flexible / Full / Full (strict)）により、Cloudflareとオリジンサーバーの接続が成立しない",
            "オリジン証明書の期限切れ、設定漏れ、または想定外の証明書が返っている",
            "SNI（Server Name Indication）の不整合により、正しい証明書ではなく別ドメイン用の証明書が返る",
            "CDN側は正常でも、オリジンサーバー側のTLS設定や応答不良でハンドシェイクが失敗する",
          ],
        },

        {
          type: "list",
          title: "主な原因（ユーザー側）",
          items: [
            "端末の日時が大きくズレている（証明書の有効期限判定に失敗）",
            "会社/学校ネットワークやセキュリティ製品がHTTPS通信に干渉している（SSLインスペクション等）",
            "古いOS/ブラウザで最新TLSに対応できない",
            "VPN/プロキシの経路が不安定でTLSが途中で失敗する",
          ],
        },

        {
          type: "list",
          title: "ユーザー側でできる対処（優先順）",
          items: [
            "1) 別ブラウザ/別端末で試す（手元要因の切り分け）",
            "2) 端末の日時を確認・自動設定をオンにする（最重要）",
            "3) シークレットモードで試す（拡張機能の影響を減らす）",
            "4) VPN/プロキシをオフにして試す（干渉の切り分け）",
            "5) 別回線で試す（社内ネットワークの干渉を回避）",
          ],
        },

        {
          type: "list",
          title: "発生パターン別の見分け方",
          items: [
            "自分の端末だけで発生 → 端末の時刻ズレ、ブラウザ設定、拡張機能、証明書ストアの問題など手元要因の可能性が高い",
            "特定の回線（会社・学校・VPN）だけで発生 → HTTPSインスペクション、プロキシ、セキュリティ製品、ネットワーク制限の影響が考えられる",
            "すべての端末・回線で発生 → サイト側の証明書・TLS設定・CDN設定の問題の可能性が高い",
            "スマホでは開けるがPCで開けない、またはその逆 → ブラウザやOSの対応TLS、証明書ストア、ネットワーク設定の差が疑われる",
          ],
        },
        {
          type: "p",
          title: "Wi-Fiや回線条件で差が出るとき",
          body: [
            "スマホ回線では開くのに自宅Wi-Fiや社内Wi-Fiだけで失敗するなら、サイト設定だけでなく途中経路の干渉や回線側条件も候補に入ります。",
            <>
              回線差が大きいときは{" "}
              <Link
                href="/troubleshooting/website-loads-on-phone-not-wifi"
                className="underline hover:no-underline"
              >
                スマホでは開くのにWi-Fiだと開かない原因
              </Link>{" "}
              や{" "}
              <Link
                href="/errors/err-network-changed"
                className="underline hover:no-underline"
              >
                ERR_NETWORK_CHANGED
              </Link>{" "}
              も近い切り分けになります。
            </>,
          ],
        },

        {
          type: "list",
          title: "スマホ・古い環境で起きることがある理由",
          items: [
            "古いOSや古いブラウザは、新しいTLS設定や証明書方式に対応できず失敗することがある",
            "企業管理端末や学校端末では、独自の証明書や通信監視設定の影響で通常の端末よりHTTPSに失敗しやすいことがある",
            "アプリ内ブラウザは通常ブラウザと挙動が異なる場合があり、SafariやChromeでは開けるのにアプリ内だけ失敗することがある",
            "Wi-Fiでは失敗するのにモバイル回線では開ける場合、回線側の干渉やDNS/プロキシ設定の影響が疑われる",
          ],
        },

        {
          type: "list",
          title: "運営者側の確認ポイント（サイト管理者向け）",
          items: [
            "証明書の期限・対象ドメイン（SAN）・更新状況を確認",
            "証明書チェーン（中間証明書）設定が正しいか確認",
            "TLS設定（対応バージョン、暗号スイート）を確認（互換性を落としすぎない）",
            "SNI/バーチャルホスト設定で正しい証明書が返っているか確認",
            "CDN（Cloudflare等）利用時：TLSモードとオリジン証明書の整合（Full/Strict等）",
            "HTTPSリダイレクト/HTTP→HTTPSのルールがループしていないか確認",
          ],
        },

        {
          type: "div",
          title: "この問題が「サイト全体」か「自分だけ」か確認する",
          body: [
            "SSL/TLSはサイト側設定が原因のことが多いですが、端末/回線/セキュリティ製品の影響で“自分だけ”失敗するケースもあります。外部地点から到達できるか確認して切り分けましょう。",
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
                こちらで「オンライン」なのに自分だけ開けない場合は、端末の時刻ズレや社内ネットワークの干渉など手元要因の可能性があります。
              </p>
            </div>,
          ],
        },

        {
          type: "list",
          title: "よく一緒に表示されるSSL関連エラー",
          items: [
            "ERR_SSL_PROTOCOL_ERROR：TLSのネゴシエーションに失敗している。設定不整合や古い環境などで起きる",
            "SSL_ERROR_HANDSHAKE_FAILURE_ALERT：サーバーとクライアントの暗号条件が一致せず、握手の途中で失敗している",
            "525 SSL Handshake Failed：主にCloudflare利用時に、CDNとオリジンサーバー間のTLS接続に失敗している",
            "NET::ERR_CERT_COMMON_NAME_INVALID：証明書のドメイン名がアクセス先と一致していない",
            "この接続ではプライバシーが保護されません：証明書の信頼性や設定に問題があるときに表示されやすい",
          ],
        },
        {
          type: "p",
          title: "ブラウザ全体でサイトが開かないとき",
          body: [
            "SSL の問題か、ブラウザ環境全体の問題かを迷うこともあります。拡張機能や保存データが絡む場合は、SSLだけを見ても切り分けきれません。",
            <>
              そういうときは{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザでサイトが開かない原因
              </Link>{" "}
              もあわせて確認してください。
            </>,
          ],
        },

        {
          type: "list",
          title: "よくある質問",
          items: [
            "Q. これはサーバーダウンですか？ → 多くの場合は違います。HTTPS（TLS）の合意が成立していないだけで、サーバー自体は動いていることがあります。",
            "Q. なぜ“端末の時間”が重要？ → 証明書は「有効期間」があり、端末の時計がズレると期限切れ扱いになって接続できません。",
            "Q. Cloudflareを使っていると起きやすい？ → 設定が複雑になるため起き得ます。Cloudflare側TLSモードとオリジン証明書の整合が重要です。",
            "Q. スマホだけ開けないことはありますか？ → あります。OSやアプリ内ブラウザ、回線、証明書ストアの違いで発生することがあります。",
            "Q. 直るまでどれくらい？ → 端末要因ならすぐ直ることもあります。サイト側の証明書/設定問題なら運営者対応次第です。",
          ],
        },

        {
          type: "div",
          title: "関連するエラー・ガイド",
          body: [
            <ErrorRelatedLinks key="related" currentSlug="ssl-handshake-failed" />,
          ],
        },
      ]}
    />
  );
}
