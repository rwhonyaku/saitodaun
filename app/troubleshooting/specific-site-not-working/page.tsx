import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "特定のサイトだけ開かない原因と対処法",
  description:
    "特定のサイトだけ開かない場合の原因と対処法を解説します。サイト側の障害、DNSの問題、ブラウザやネットワークの問題、端末設定などを順番に切り分ける方法を紹介します。",
  alternates: { canonical: "/troubleshooting/specific-site-not-working" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="特定のサイトだけ開かない原因と対処法"
      lead={[
        "インターネット自体にはつながっているのに、特定のサイトだけ開かないことがあります。たとえば、GoogleやYouTubeは見れるのに、ある会社のサイトや特定サービスだけ読み込めないという状況です。",
        "このような場合、必ずしもそのサイト全体がダウンしているとは限りません。サイト側の障害、DNSの問題、ブラウザの不具合、回線やネットワーク制限、VPNやセキュリティソフトの影響など、原因は複数あります。",
        "大切なのは、いきなり原因を決めつけず、サイト側の問題なのか、自分の環境の問題なのかを順番に切り分けることです。このページでは、特定のサイトだけ開かないときの原因と確認の進め方を実用的に整理しています。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "他のサイトが開くなら、通信全体ではなく対象サイト・DNS・制限の問題を優先して疑う",
            "同じURLを別端末と別回線でも試し、どこでも開かないならサイト側、特定環境だけなら自分側を疑う",
            "403・429は制限、502・503・504はサイト側障害、NXDOMAINはDNS、SSL警告は証明書や端末時刻が手がかりになる",
            "トップは開くのにログインや決済だけ失敗するなら、全体障害ではなく部分障害やアクセス制限の可能性が高い",
          ],
        },
        {
          type: "p",
          title: "まず最初に確認したいこと",
          body: [
            "最初に見るべきなのは、そのサイトだけが開かないのか、それとも他のサイトにも影響が出ているのかです。ほかは問題なく開くなら、通信全体ではなく対象サイトに関係する問題の可能性が高くなります。",
            "同じURLをスマホとパソコンの両方で試し、さらにWi-Fiとモバイル回線でも見比べると、サイト側なのか自分の環境側なのかをかなり絞り込みやすくなります。",
            <>
              まずは{" "}
              <Link href="/" className="underline hover:no-underline">
                接続チェックツール
              </Link>{" "}
              で対象URLの応答状況を確認し、その後に{" "}
              <Link
                href="/outages/japan"
                className="underline hover:no-underline"
              >
                ネット障害の切り分け
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNSトラブルの確認
              </Link>{" "}
              へ進む流れが基本です。
            </>,
          ],
        },
        {
          type: "list",
          title: "特定のサイトだけ開かない主な原因",
          items: [
            "そのサイト自体で障害やメンテナンスが発生している",
            "DNSキャッシュやDNSサーバーの問題で名前解決がうまくいっていない",
            "ブラウザのキャッシュ、Cookie、拡張機能が影響している",
            "会社・学校・公共Wi-Fiなどのネットワークでアクセス制限がかかっている",
            "VPN、プロキシ、セキュリティソフト、広告ブロッカーなどが通信を妨げている",
            "HTTPエラーやSSL証明書エラーなど、サイト側または通信経路上の技術的な問題が出ている",
            "端末の時刻設定や古いブラウザなど、端末側の環境が原因になっている",
          ],
        },
        {
          type: "p",
          title: "サイト側の障害かどうかを切り分ける",
          body: [
            "特定のサイトだけ開かないときは、まずサイト側で障害やメンテナンスが起きていないかを確認します。相手側のサーバーが停止していれば、自分の環境を見直しても表示されません。",
            "応答しない、極端に遅い、5xx系エラーが出る、短時間だけ開いたり落ちたりする、といった症状はサイト側のトラブルでよく見られます。",
            <>
              サービス系であれば{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別トラブル一覧
              </Link>{" "}
              から確認し、一般サイトであればトップの接続チェックや{" "}
              <Link href="/errors" className="underline hover:no-underline">
                エラー解説ページ
              </Link>{" "}
              を併用すると判断しやすくなります。
            </>,
          ],
        },
        {
          type: "p",
          title: "DNSの問題で特定サイトだけ開かないことがある",
          body: [
            "DNSは、ドメイン名を接続先IPアドレスに変換する仕組みです。名前解決がうまくいかないと、ほかのサイトは開くのに対象サイトだけ失敗することがあります。",
            "原因としては、DNSキャッシュの古さ、一時的な名前解決失敗、プロバイダDNSの反映遅れ、一部地域だけのDNSトラブルなどがあります。",
            "この場合は、時間をおいて再試行する、別回線で試す、端末やルーターを再起動する、DNS設定を見直すといった対応が有効です。",
            <>
              DNSが怪しいと感じる場合は、{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNSトラブルシューティング
              </Link>{" "}
              を先に読むと切り分けしやすくなります。
            </>,
          ],
        },
        {
          type: "p",
          title: "ブラウザのキャッシュや拡張機能が原因の場合",
          body: [
            "サイトや回線に問題がなくても、使っているブラウザだけで開かないことがあります。キャッシュやCookieの破損、ログイン状態の不整合、広告ブロッカーやセキュリティ系拡張機能の影響が典型例です。",
            <>
              このときは、シークレットモードで開く、別ブラウザで試す、キャッシュとCookieを削除する、拡張機能を一時的に無効にする、ブラウザを最新版に更新するといった確認が有効です。特定のブラウザだけで発生するなら、サイト全体より自分のブラウザ環境を疑うべきです。ブラウザ全体でサイトが読めない症状に近い場合は{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザでサイトが開かないときの切り分け
              </Link>{" "}
              も役立ちます。
            </>,
          ],
        },
        {
          type: "p",
          title: "アクセス制限や部分的なブロックの可能性",
          body: [
            "会社や学校、ホテル、空港、公共Wi-Fiなどでは、一部サイトや特定ポートへの通信が制限されることがあります。その場合、家の回線やスマホのモバイル通信では開くのに、特定のネットワーク上だけ開かない形になります。",
            "また、VPNやプロキシを使っていると、接続元地域やIPアドレスの評価によってブロックされることがあります。海外サイト、決済系、ログイン制御が厳しいサービスでは特に起こりやすいです。",
            <>
              この系統は『サイト側の全面障害』ではなく『自分の接続条件だけで止められている』ケースが多いため、Wi-Fiを切ってモバイル回線で試す、VPNをオフにする、別のWi-Fiで試す確認が有効です。Wi-Fiだと失敗するがスマホ回線では開くときは{" "}
              <Link
                href="/troubleshooting/website-loads-on-phone-not-wifi"
                className="underline hover:no-underline"
              >
                スマホでは開くのにWi-Fiでは開かないケース
              </Link>{" "}
              の整理が近い症状です。
            </>,
          ],
        },
        {
          type: "p",
          title: "HTTPエラーやSSLの問題も手がかりになる",
          body: [
            "単に『開かない』ように見えても、実際にはHTTPエラーやSSL証明書の問題が出ていることがあります。たとえば403、404、429、500、502、503、504などは、それぞれ意味が異なります。",
            "403ならアクセス制限、404ならページ不在、429ならアクセス過多、500番台ならサーバー側の障害の可能性があります。証明書エラーなら、サイト側のSSL設定、端末時刻、ブラウザの古さなども確認ポイントになります。",
            <>
              表示されたメッセージやコードがある場合は、{" "}
              <Link href="/errors" className="underline hover:no-underline">
                エラー一覧
              </Link>{" "}
              や各エラーページで意味を確認すると、原因をかなり絞れます。証明書警告が出ているなら{" "}
              <Link
                href="/errors/your-connection-is-not-private"
                className="underline hover:no-underline"
              >
                この接続ではプライバシーが保護されません
              </Link>{" "}
              も近い症状です。
            </>,
          ],
        },
        {
          type: "list",
          title: "表示されるメッセージで切り分ける",
          items: [
            "「403 Forbidden」なら、サイトは生きているが自分のIP、回線、地域、権限条件で制限されている可能性があります。",
            "「404 Not Found」なら、サイト全体の障害ではなく、そのURLだけが削除・移動・入力ミスであることが多いです。",
            "「429 Too Many Requests」なら、短時間の連続アクセス、VPN、共有IPなどで自分だけ制限されているケースもあります。",
            "「502 / 503 / 504」なら、サイト側の負荷、メンテナンス、上流サーバー不調などの可能性が高く、自分側でできることは限られます。",
            "「DNS_PROBE_FINISHED_NXDOMAIN」や「サーバーが見つかりません」なら、対象サイトのDNS、ドメイン失効、自分のDNSキャッシュ不整合を疑います。",
            "「SSL / 証明書の警告」なら、サイト側の証明書失効・中間証明書不備、または端末の時刻ずれや古いブラウザを確認すると切り分けやすくなります。",
          ],
        },
        {
          type: "p",
          title: "サイトは開くのに特定の操作だけ失敗する場合",
          body: [
            "「トップページは開くのにログインできない」「購入や決済だけ進まない」「投稿・アップロードだけ失敗する」という症状は、サイト全体が落ちているのではなく、ある機能だけ不安定になっている『部分障害』の形でよく起こります。",
            "特にログイン・決済・検索・アップロード・コメント投稿などは、公開ページよりも厳しい制限や別系統のAPIを使っているため、『見れるけど使えない』ということが起こります。",
            "このケースでは、サイト全体の疎通よりも『どの操作で失敗するか』を記録するのが重要です。トップだけでなく、ログイン後画面や遷移先の処理で失敗するなら、サービス別ページや公式障害情報が役立ちます。",
          ],
        },
        {
          type: "div",
          title: "関連するエラーを先に読むと切り分けしやすいケース",
          body: [
            <>
              403や429なら{" "}
              <Link href="/errors/403-forbidden" className="underline hover:no-underline">
                403 Forbidden
              </Link>{" "}
              や{" "}
              <Link
                href="/errors/429-too-many-requests"
                className="underline hover:no-underline"
              >
                429 Too Many Requests
              </Link>{" "}
              が、5xxなら{" "}
              <Link
                href="/errors/502-bad-gateway"
                className="underline hover:no-underline"
              >
                502 Bad Gateway
              </Link>
              、{" "}
              <Link
                href="/errors/503-service-unavailable"
                className="underline hover:no-underline"
              >
                503 Service Unavailable
              </Link>
              、{" "}
              <Link
                href="/errors/504-gateway-timeout"
                className="underline hover:no-underline"
              >
                504 Gateway Timeout
              </Link>{" "}
              を見ると、サイト側か自分側かの判断がしやすくなります。
            </>,
            <>
              ドメインが見つからない、サーバーが見つからない、といった表示なら{" "}
              <Link
                href="/errors/dns-probe-finished-nxdomain"
                className="underline hover:no-underline"
              >
                DNS_PROBE_FINISHED_NXDOMAIN
              </Link>
              、SSL警告なら{" "}
              <Link
                href="/errors/ssl-handshake-failed"
                className="underline hover:no-underline"
              >
                SSL Handshake Failed
              </Link>{" "}
              や{" "}
              <Link
                href="/errors/err-name-not-resolved"
                className="underline hover:no-underline"
              >
                ERR_NAME_NOT_RESOLVED
              </Link>{" "}
              のページが近い症状です。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "他のサイトは開くか確認する",
            "同じURLをスマホ・パソコンなど別端末で試す",
            "Wi-Fiとモバイル回線の両方で試す",
            "接続チェックツールで対象URLの応答を確認する",
            "シークレットモードや別ブラウザで開いてみる",
            "ブラウザのキャッシュとCookieを削除する",
            "VPN、広告ブロッカー、セキュリティソフトを一時的に見直す",
            "DNSやネット障害ページを見て、サイト側・自分側・制限のどれに近いかを見直す",
            "表示されたHTTPエラーや警告文を確認する",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "自宅Wi-Fiでは開かないがモバイル回線では開くなら、自分の回線やDNS、アクセス制限の可能性が高くなります。どの端末・どの回線でも開かないなら、サイト側の障害や広域的な問題を疑いやすくなります。1つの確認だけで結論を出さず、端末・回線・ブラウザを変えて比べるのが最短です。",
          ],
        },
        {
          type: "p",
          title: "こんなときはサービス別ページも確認する",
          body: [
            "開かない対象が一般サイトではなく、YouTube、LINE、Instagram、Amazon、ChatGPTなどの主要サービスなら、サービスごとの障害や仕様変更、アプリ側の不具合であることもあります。",
            "アプリだけ使えない、ブラウザ版だけおかしい、ログインだけ失敗する、特定機能だけ落ちているといった場合は、サービス別ページのほうが役立つことがあります。",
            <>
              該当サービスがある場合は{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別トラブルページ
              </Link>{" "}
              も確認してください。
            </>,
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "特定のサイトだけ開かないときは、サイト全体の障害とは限らず、DNS、ブラウザ、ネットワーク制限、VPN、セキュリティ設定など、かなり多くの要因が考えられます。",
            "最初にサイト側の障害かどうかを見て、その後に端末、ブラウザ、回線、DNSの順で切り分けると、無駄なく原因に近づけます。",
            <>
              迷ったときは、まず{" "}
              <Link href="/" className="underline hover:no-underline">
                接続チェックツール
              </Link>{" "}
              を使い、必要に応じて{" "}
              <Link
                href="/outages/japan"
                className="underline hover:no-underline"
              >
                ネット障害の確認
              </Link>
              、{" "}
              <Link
                href="/troubleshooting-dns"
                className="underline hover:no-underline"
              >
                DNSトラブル
              </Link>
              、{" "}
              <Link href="/errors" className="underline hover:no-underline">
                エラー解説
              </Link>{" "}
              へ進むのが基本です。
            </>,
          ],
        },
      ]}
      updatedAt="2026-03-06"
    />
  );
}
