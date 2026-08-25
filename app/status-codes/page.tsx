import EvergreenPageShell from "@/components/EvergreenPageShell";
import Link from "next/link";

export const metadata = {
  title: "HTTPエラーコード詳細ガイド",
  description:
    "403, 404, 429, 500, 502, 503, 504やCloudflareエラーなど、ブラウザに表示されるエラーの意味と解決策を詳しく解説します。",
  alternates: { canonical: "/status-codes" }
};

export default function StatusCodesPage() {
  return (
    <EvergreenPageShell
      h1="HTTPエラーコード詳細ガイド"
      updatedAt="2026-03-03"
      lead={[
        "ブラウザに表示される3桁の数字は、エラーの原因を特定する重要な手がかりです。",
        "これらは「HTTPステータスコード」と呼ばれ、サーバーがリクエストをどのように処理したか（成功・転送・拒否・障害など）を示しています。",
        "本ページは「概要（ハブ）」として、主要コードの意味と確認の考え方をまとめています。各コードの詳細な直し方は、個別ページ（詳細ガイド）でより深く解説します。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "403・429は『アクセス条件や制限』を疑う",
            "404は『URLやページの所在』を疑う",
            "500・502・503・504は『サイト側の障害や過負荷』を疑う",
            "数値ではなくDNSやSSLの文言が出るなら、HTTPの前段で止まっている可能性が高い",
          ],
        },
        {
          type: "list",
          title: "まず確認：どの種類の問題か（最短の確認）",
          items: [
            "4xx（例：403/404/429）：URL・権限・制限・回数など「アクセス条件」による失敗が多い（ただし制限を設定しているのは運営側）。",
            "5xx（例：500/502/503/504）：サイト運営側の障害・過負荷・バックエンド不調が多く、ユーザー側でできることは限定的。",
            "数値が出ない／DNS・SSL系：HTTPの前段（名前解決、証明書、ネットワーク）で詰まっている可能性が高い。",
            "Cloudflare等のCDN表示：ブラウザ→CDNは到達しているが、CDN→オリジン（本体サーバー）側の不調が疑われる。",
          ],
        },

        {
          type: "list",
          title: "よくある見分け方",
          items: [
            "ページは存在しそうなのに拒否されるなら403、存在しないなら404の可能性が高い",
            "少し待つと戻る、混雑時だけ出るなら429や503の可能性がある",
            "トップは開くのに一部機能だけ失敗するなら、502や504のような上流処理エラーも疑いやすい",
            "ドメインが見つからない、証明書警告が出る場合は、HTTPコードの一覧よりDNS・SSL系ページを見るほうが早い",
          ],
        },

        {
          type: "p",
          title: "主要HTTPエラーの詳細ガイド（個別ページ）",
          body: [
            <ul
              key="http-core"
              className="list-disc list-inside space-y-2 my-2 bg-slate-50 p-4 rounded-xl text-xs"
            >
              <li>
                <Link href="/errors/403-forbidden" className="text-sky-600 font-bold underline">
                  403 Forbidden（閲覧禁止）
                </Link>
              </li>
              <li>
                <Link href="/errors/404-not-found" className="text-sky-600 font-bold underline">
                  404 Not Found（ページが見つからない）
                </Link>
              </li>
              <li>
                <Link href="/errors/429-too-many-requests" className="text-sky-600 font-bold underline">
                  429 Too Many Requests（アクセス過多・制限）
                </Link>
              </li>
              <li>
                <Link
                  href="/errors/500-internal-server-error"
                  className="text-sky-600 font-bold underline"
                >
                  500 Internal Server Error（サーバー内部エラー）
                </Link>
              </li>
              <li>
                <Link href="/errors/502-bad-gateway" className="text-sky-600 font-bold underline">
                  502 Bad Gateway（中継エラー）
                </Link>
              </li>
              <li>
                <Link
                  href="/errors/503-service-unavailable"
                  className="text-sky-600 font-bold underline"
                >
                  503 Service Unavailable（過負荷・メンテ）
                </Link>
              </li>
              <li>
                <Link href="/errors/504-gateway-timeout" className="text-sky-600 font-bold underline">
                  504 Gateway Timeout（応答待ち時間切れ）
                </Link>
              </li>
            </ul>,
          ],
        },

        {
          type: "p",
          title: "よくあるブラウザエラー（HTTPコードが出ないタイプ）",
          body: [
            <ul
              key="browser-errors"
              className="list-disc list-inside space-y-2 my-2 bg-slate-50 p-4 rounded-xl text-xs"
            >
              <li>
                <Link
                  href="/errors/err-connection-refused"
                  className="text-sky-600 font-bold underline"
                >
                  ERR_CONNECTION_REFUSED（接続拒否）
                </Link>
              </li>
              <li>
                <Link
                  href="/errors/err-connection-timed-out"
                  className="text-sky-600 font-bold underline"
                >
                  ERR_CONNECTION_TIMED_OUT（待ち時間切れ）
                </Link>
              </li>
              <li>
                <Link href="/errors/connection-reset" className="text-sky-600 font-bold underline">
                  ERR_CONNECTION_RESET（通信リセット）
                </Link>
              </li>
              <li>
                <Link
                  href="/errors/dns-probe-finished-nxdomain"
                  className="text-sky-600 font-bold underline"
                >
                  DNS_PROBE_FINISHED_NXDOMAIN（DNSで見つからない）
                </Link>
              </li>
              <li>
                <Link href="/errors/ssl-handshake-failed" className="text-sky-600 font-bold underline">
                  SSL Handshake Failed（HTTPS接続失敗）
                </Link>
              </li>
            </ul>,
          ],
        },

        {
          type: "p",
          title: "Cloudflareエラー（CDN配下でよく見る）",
          body: [
            <ul
              key="cf-errors"
              className="list-disc list-inside space-y-2 my-2 bg-slate-50 p-4 rounded-xl text-xs"
            >
              <li>
                <Link href="/errors/cloudflare-520" className="text-sky-600 font-bold underline">
                  Cloudflare 520（未知のエラー）
                </Link>
              </li>
              <li>
                <Link href="/errors/cloudflare-522" className="text-sky-600 font-bold underline">
                  Cloudflare 522（オリジン接続タイムアウト）
                </Link>
              </li>
              <li>
                <Link href="/errors/cloudflare-524" className="text-sky-600 font-bold underline">
                  Cloudflare 524（オリジン応答が遅すぎる）
                </Link>
              </li>
            </ul>,
          ],
        },

        {
          type: "p",
          title: "403 Forbidden（閲覧禁止）",
          body: [
            "403エラーは、サーバーがリクエスト自体は理解しているものの『アクセスを許可していない』場合に返されるコードです。サイトが消えているのではなく、権限や接続条件で止められている状態です。",
            "よくある原因としては、IPアドレス制限、国・地域制限、ログイン権限不足、またはWAFによるセキュリティブロックがあります。Bot対策が厳しいサイトでは、VPN経由や共有IPでも起こります。",
            "別回線に切り替える、VPNや拡張機能を見直すなどの確認はできますが、完全なアクセス制御なら運営側の許可がないと解消しません。",
            <>
              より具体的な原因と対処は、個別ページで確認できます：{" "}
              <Link href="/errors/403-forbidden" className="text-sky-600 font-bold underline">
                /errors/403-forbidden
              </Link>
            </>,
          ],
        },

        {
          type: "p",
          title: "404 Not Found（ページが見つからない）",
          body: [
            "404は『サーバーには到達できたが、そのURLのページが存在しない』状態です。サイト全体が落ちているのではなく、URLの入力ミス、ページの削除・移動、古いリンクなどが原因で起こることが多いです。",
            "まずはURLのスペルや末尾のスラッシュを確認し、トップページから探す／一つ上の階層へ戻って探すのが有効です。",
            <>
              より具体的な原因と対処は、個別ページで確認できます：{" "}
              <Link href="/errors/404-not-found" className="text-sky-600 font-bold underline">
                /errors/404-not-found
              </Link>
            </>,
          ],
        },

        {
          type: "p",
          title: "429 Too Many Requests（アクセス過多・制限）",
          body: [
            "429は、短時間にリクエストが多すぎるため、サイト側が一時的に制限している状態です。落ちているのではなく、負荷対策やBot対策の一部として意図的に弾かれているケースが中心です。",
            "ユーザー側の対策は、まず待つこと（数分〜）、連打を止めること、別回線で試すことです。共有回線（会社/学校/マンション等）では同一IPの利用者が多く、制限されやすいことがあります。",
            <>
              より具体的な原因と対処は、個別ページで確認できます：{" "}
              <Link
                href="/errors/429-too-many-requests"
                className="text-sky-600 font-bold underline"
              >
                /errors/429-too-many-requests
              </Link>
            </>,
          ],
        },

        {
          type: "p",
          title: "500 Internal Server Error（サーバー内部エラー）",
          body: [
            "500エラーは、サーバー内部で予期しない問題が発生したことを示しています。アプリケーション、設定ファイル、データベース接続、プラグインやコード不具合などが代表例です。",
            "WordPressなどのCMSでは、テーマやプラグイン更新の直後に起きることもあります。",
            "基本的にユーザー側では解決できず、長引く場合はサイト運営者の復旧待ちが中心になります。",
            <>
              より具体的な原因と対処は、個別ページで確認できます：{" "}
              <Link
                href="/errors/500-internal-server-error"
                className="text-sky-600 font-bold underline"
              >
                /errors/500-internal-server-error
              </Link>
            </>,
          ],
        },

        {
          type: "p",
          title: "502 Bad Gateway（中継エラー）",
          body: [
            "502は、通信を中継しているサーバー（プロキシ/CDN/ロードバランサ等）が、その先（上流）のサーバーから正しい応答を受け取れなかった状態です。Cloudflareや各種CDN配下でよく見られます。",
            "一時的な障害や上流の過負荷が原因の場合は、時間を置くと復旧することがあります。トップは開くのに一部機能だけ失敗する場合にも出やすいコードです。",
            <>
              より具体的な原因と対処は、個別ページで確認できます：{" "}
              <Link href="/errors/502-bad-gateway" className="text-sky-600 font-bold underline">
                /errors/502-bad-gateway
              </Link>
            </>,
          ],
        },

        {
          type: "p",
          title: "503 Service Unavailable（サービス利用不可）",
          body: [
            "503エラーは、サーバーが一時的にリクエストを処理できない状態を示しています。典型的なのは『一時的な過負荷』または『メンテナンス中』です。",
            "アクセス急増で処理能力を超えている場合や、計画メンテナンス中に出ることがあります。",
            "ユーザー側では、数分から数十分ほど時間を置いて再度アクセスするのが基本です。長時間続く場合は障害の可能性が高くなります。",
            <>
              より具体的な原因と対処は、個別ページで確認できます：{" "}
              <Link
                href="/errors/503-service-unavailable"
                className="text-sky-600 font-bold underline"
              >
                /errors/503-service-unavailable
              </Link>
            </>,
          ],
        },

        {
          type: "p",
          title: "504 Gateway Timeout（応答待ち時間切れ）",
          body: [
            "504は、中継サーバー（CDN/プロキシ等）が上流サーバーの応答を待ったが、時間内に返ってこなかった状態です。バックエンド処理が遅い、DBが詰まっている、外部API待ちなどが原因になりやすいです。",
            "ユーザー側でできることは限られるため、時間を置いて再試行し、長引く場合はサイト側の復旧待ちが基本になります。",
            <>
              より具体的な原因と対処は、個別ページで確認できます：{" "}
              <Link
                href="/errors/504-gateway-timeout"
                className="text-sky-600 font-bold underline"
              >
                /errors/504-gateway-timeout
              </Link>
            </>,
          ],
        },
      ]}
    />
  );
}
