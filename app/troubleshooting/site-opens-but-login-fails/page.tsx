import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "サイトは開くのにログインできない原因と対処法",
  description:
    "ログイン画面は開くのにサインインできないときの原因と対処法を解説します。認証障害、セッション不整合、403や429の制限、VPNや社内ネットワーク、部分障害の見分け方をまとめています。",
  alternates: { canonical: "/troubleshooting/site-opens-but-login-fails" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="サイトは開くのにログインできない原因と対処法"
      updatedAt="2026-04-12"
      lead={[
        "トップページやログイン画面までは開くのに、サインインだけ失敗することがあります。これはサイト全体が落ちているというより、認証まわり、セッション、アクセス条件、またはログイン後だけ壊れている部分障害で起きやすい症状です。",
        "重要なのは、パスワード間違いと決めつけずに、どこで止まるかを見分けることです。ログインボタンを押しても反応しないのか、読み込みが続くのか、403や429が出るのか、別端末では入れるのかで次に見るべき場所が変わります。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "別端末や別回線でログインできるなら、サイト全体より自分のブラウザ、端末、回線条件を疑う",
            "ログイン画面は出るが送信後だけ失敗するなら、認証系の部分障害やセッション不整合を疑う",
            "403 や 429 が出るなら、資格情報そのものよりアクセス制限や回数制限の可能性が高い",
            "トップは正常だがログイン後画面だけ壊れるなら、サイト全体停止ではなく一部機能の障害に近い",
            "会社や学校のネットワーク、VPN 利用時だけ失敗するなら、制限や経路条件を優先して見る",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                ログイン送信後に 403 が出る →{" "}
                <Link
                  href="/errors/403-forbidden"
                  className="underline hover:no-underline"
                >
                  403 Forbidden
                </Link>
              </p>
              <p>
                ログイン試行を繰り返した後に弾かれる →{" "}
                <Link
                  href="/errors/429-too-many-requests"
                  className="underline hover:no-underline"
                >
                  429 Too Many Requests
                </Link>
              </p>
              <p>
                ログイン画面は出るがボタンを押しても進まない →{" "}
                <Link
                  href="/troubleshooting/browser-not-loading-sites"
                  className="underline hover:no-underline"
                >
                  ブラウザエラーの確認ハブ
                </Link>
              </p>
              <p>
                サイト自体は開くがログイン後だけ真っ白・止まる →{" "}
                <Link
                  href="/troubleshooting/site-opens-but-is-blank"
                  className="underline hover:no-underline"
                >
                  サイトは開くのに真っ白になる原因
                </Link>
              </p>
              <p>
                特定サービスのログインだけ失敗する →{" "}
                <Link
                  href="/services"
                  className="underline hover:no-underline"
                >
                  サービス別トラブルページ
                </Link>
              </p>
              <p>
                会社・学校・VPN 利用時だけ失敗する →{" "}
                <Link
                  href="/troubleshooting/site-blocked-by-firewall"
                  className="underline hover:no-underline"
                >
                  サイトがファイアウォールでブロックされる原因
                </Link>
              </p>
              <p>
                まずサイト側障害か確認したい →{" "}
                <Link
                  href="/outages/japan"
                  className="underline hover:no-underline"
                >
                  ネット障害情報
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "list",
          title: "よくある失敗パターン",
          items: [
            "ID とパスワードを入れて送信すると同じ画面に戻る",
            "ログイン後に読み込みが続いたまま進まない",
            "ログイン画面だけ開くが、認証後の画面が真っ白になる",
            "スマホアプリでは入れるのにブラウザでは入れない",
            "自宅では入れるのに会社や学校の回線だと失敗する",
            "何度か試した後から急に弾かれる",
          ],
        },
        {
          type: "p",
          title: "サイト全体停止ではなく認証まわりだけ壊れていることがある",
          body: [
            "ログイン失敗は、サイト全体の停止と見え方がかなり違います。トップページ、ヘルプ、公開ページは正常でも、認証 API、セッション保存、二段階認証、ログイン後だけ使うバックエンドが落ちると、サインインだけ失敗します。",
            <>
              そのため、トップページが開くことだけで安心せず、ログイン以外の機能も壊れているかを見ます。特定サービスで起きているなら{" "}
              <Link
                href="/services"
                className="underline hover:no-underline"
              >
                サービス別トラブルページ
              </Link>{" "}
              のほうが近いケースもあります。
            </>,
          ],
        },
        {
          type: "p",
          title: "別端末で入れるならセッションやブラウザ側を優先する",
          body: [
            "同じアカウントでスマホでは入れるのに PC ブラウザでは入れないなら、認証情報そのものより、Cookie、保存済みセッション、拡張機能、ブラウザ保存データの不整合を疑いやすくなります。",
            <>
              ログイン送信後に画面が変わらない、ボタンが反応しない、ループするように見えるなら、まず{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラーの確認ハブ
              </Link>{" "}
              でブラウザ差を確認するのが近道です。
            </>,
          ],
        },
        {
          type: "p",
          title: "403 や 429 はログイン情報より制限条件が手がかりになる",
          body: [
            "ログイン時に 403 が出るなら、正しい情報でもアクセス条件で止められている可能性があります。VPN、共有 IP、国や地域制限、社内ネットワーク、Bot 判定、WAF などが関係することがあります。",
            <>
              429 が出るなら、連続試行や共有回線による回数制限が近い症状です。表示メッセージがあるなら{" "}
              <Link
                href="/errors/403-forbidden"
                className="underline hover:no-underline"
              >
                403 Forbidden
              </Link>{" "}
              と{" "}
              <Link
                href="/errors/429-too-many-requests"
                className="underline hover:no-underline"
              >
                429 Too Many Requests
              </Link>{" "}
              を優先して見たほうが早いです。
            </>,
          ],
        },
        {
          type: "p",
          title: "会社・学校・VPN 利用時だけ失敗するなら制限を疑う",
          body: [
            "自宅回線では入れるのに会社や学校、ホテル、公衆 Wi-Fi、VPN 利用時だけログインできないなら、認証画面自体ではなく接続条件が原因のことがあります。ログイン後の遷移先や認証用ドメインだけが制限されていると、トップは見えてもサインインだけ通りません。",
            <>
              この方向なら{" "}
              <Link
                href="/troubleshooting/site-blocked-by-firewall"
                className="underline hover:no-underline"
              >
                サイトがファイアウォールでブロックされる原因
              </Link>{" "}
              が近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "ログイン後だけ真っ白・読み込み中なら部分障害に近い",
          body: [
            "認証は通っていそうなのに、その後の画面が真っ白になったり、読み込みが終わらなかったりするなら、ログイン機能そのものより、ログイン後画面で使う API やスクリプトだけ落ちている可能性があります。",
            <>
              そう見えるときは{" "}
              <Link
                href="/troubleshooting/site-opens-but-is-blank"
                className="underline hover:no-underline"
              >
                サイトは開くのに真っ白になる原因
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              のほうが近いことがあります。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "1) 別端末か別回線で同じアカウントのログイン結果を比べる",
            "2) 403、429、証明書警告などの表示メッセージがないか確認する",
            "3) ブラウザ版だけ失敗するならシークレットモードや別ブラウザで試す",
            "4) 会社・学校・VPN 利用時だけ失敗するかを確認する",
            "5) ログイン画面だけでなく、ログイン後の特定画面で止まっていないか見る",
            "6) 特定サービスならサービス別ページや障害情報も確認する",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "ログイン失敗は、認証情報の誤りだけでなく、セッション不整合、制限、部分障害でも起きます。『どの端末でも失敗するか』『どの回線でも失敗するか』『どの表示で止まるか』の3つで見ると、次に進む先を絞りやすくなります。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "サイトは開くのにログインできないときは、サイト全体停止より、認証系の部分障害、ブラウザ保存データ、アクセス制限、VPN や社内ネットワーク条件を優先して確認するほうが早いです。",
            <>
              まず症状を 403・429・ブラウザ差・回線差・ログイン後だけの不具合に分けて、必要に応じて{" "}
              <Link
                href="/errors"
                className="underline hover:no-underline"
              >
                エラー解説一覧
              </Link>
              、{" "}
              <Link
                href="/services"
                className="underline hover:no-underline"
              >
                サービス別トラブルページ
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-blocked-by-firewall"
                className="underline hover:no-underline"
              >
                制限系の確認
              </Link>{" "}
              へ進むのが実用的です。
            </>,
          ],
        },
      ]}
    />
  );
}
