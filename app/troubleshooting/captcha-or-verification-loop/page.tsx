import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "CAPTCHAや本人確認がループするときの原因と対処法",
  description:
    "CAPTCHA や本人確認が何度やっても終わらないときの原因と対処法を解説します。Cookie、JavaScript、VPN、共有 IP、403 や 429、制限環境の見分け方をまとめています。",
  alternates: { canonical: "/troubleshooting/captcha-or-verification-loop" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="CAPTCHAや本人確認がループするときの原因と対処法"
      updatedAt="2026-04-12"
      lead={[
        "『私はロボットではありません』を通過したはずなのに、また同じ確認に戻る、認証が何度もやり直しになる、本人確認が終わらないという症状はよくあります。これはサイト全体が落ちているというより、Cookie、JavaScript、IP 評価、VPN、アクセス制限のどこかで判定が通らないときに起きやすいです。",
        "重要なのは、単なる表示不良なのか、Bot 判定で弾かれているのか、回数制限に入っているのかを分けることです。403 や 429 が出るか、別回線では通るか、シークレットモードでは通るかで次に見るべき場所が変わります。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で確認するなら",
          items: [
            "シークレットモードで通るなら、Cookie や保存データ、拡張機能の干渉を優先して疑う",
            "VPN や共有回線を切ると通るなら、IP 評価やアクセス制限の可能性が高い",
            "何度も試したあと弾かれるなら、回数制限や一時的な Bot 判定を疑う",
            "特定サービスだけで起きるなら、そのサービス側の制限や部分障害も候補になる",
            "403 や 429 が見えるなら、症状ページより該当エラーページのほうが近い",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                確認のあとに 403 が出る →{" "}
                <Link
                  href="/errors/403-forbidden"
                  className="underline hover:no-underline"
                >
                  403 Forbidden
                </Link>
              </p>
              <p>
                何度も試してから弾かれる、待てと言われる →{" "}
                <Link
                  href="/errors/429-too-many-requests"
                  className="underline hover:no-underline"
                >
                  429 Too Many Requests
                </Link>
              </p>
              <p>
                会社・学校・VPN 利用時だけループする →{" "}
                <Link
                  href="/troubleshooting/site-blocked-by-firewall"
                  className="underline hover:no-underline"
                >
                  サイトがファイアウォールでブロックされる原因
                </Link>
              </p>
              <p>
                ブラウザだけで起きてアプリでは起きない →{" "}
                <Link
                  href="/troubleshooting/browser-not-loading-sites"
                  className="underline hover:no-underline"
                >
                  ブラウザエラーの確認ハブ
                </Link>
              </p>
              <p>
                特定サイトや特定サービスだけで起きる →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
                </Link>
              </p>
              <p>
                まずサービス側障害か確認したい →{" "}
                <Link
                  href="/services"
                  className="underline hover:no-underline"
                >
                  サービス別トラブルページ
                </Link>
              </p>
              <p>
                広域な通信障害も気になる →{" "}
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
          title: "よくある原因",
          items: [
            "Cookie やローカル保存データが壊れて判定結果を保持できない",
            "JavaScript や必要なスクリプトが拡張機能で止められている",
            "VPN、プロキシ、共有 IP が不審アクセス扱いされている",
            "会社・学校・公共 Wi-Fi などの制限環境で認証用通信が崩れている",
            "短時間の連続試行で回数制限や Bot 対策に入っている",
            "そのサービス側で認証まわりだけ部分障害になっている",
          ],
        },
        {
          type: "p",
          title: "ループは『確認に失敗している』とは限らない",
          body: [
            "チェック自体は通っていても、その結果を保存する Cookie やセッションが保持できなければ、次の画面でまた同じ確認に戻されます。見た目は『判定が通らない』ですが、実際には通過後の保存や遷移が壊れているケースもあります。",
            <>
              ブラウザ差が強いなら{" "}
              <Link
                href="/troubleshooting/browser-not-loading-sites"
                className="underline hover:no-underline"
              >
                ブラウザエラーの確認ハブ
              </Link>{" "}
              が近い入口です。
            </>,
          ],
        },
        {
          type: "p",
          title: "VPNや共有回線で起きるなら IP 評価や制限を疑う",
          body: [
            "VPN、ホテル Wi-Fi、会社回線、学校回線、携帯キャリアの共有 IP では、他の利用者の影響も含めて Bot 判定が厳しくなることがあります。この場合、正しく操作していても確認が終わらず、何度も同じチャレンジが出ることがあります。",
            <>
              制限条件が強そうなら{" "}
              <Link
                href="/troubleshooting/site-blocked-by-firewall"
                className="underline hover:no-underline"
              >
                制限系の確認
              </Link>{" "}
              や{" "}
              <Link
                href="/errors/403-forbidden"
                className="underline hover:no-underline"
              >
                403 Forbidden
              </Link>{" "}
              が近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "何度も試すほど 429 に寄ることがある",
          body: [
            "ループすると焦って何度も認証を繰り返しがちですが、それによって今度は回数制限に入り、さらに通りにくくなることがあります。最初は単なる Cookie や JS 問題でも、連続試行で 429 に寄ってしまうケースがあります。",
            <>
              『しばらく待ってから再試行』の表示や試行回数制限が見えるなら{" "}
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
          title: "特定サービスだけなら認証部分の部分障害も候補",
          body: [
            "あるサービスだけ CAPTCHA や本人確認が終わらないなら、あなたの環境だけでなく、そのサービス側の認証 API や Bot 対策基盤だけが不安定になっている可能性もあります。トップページは開くのに確認だけ終わらないときは、この種の部分障害もよくあります。",
            <>
              その場合は{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別トラブルページ
              </Link>{" "}
              や{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定のサイトだけ開かない原因
              </Link>{" "}
              のほうが近い案内になります。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "1) シークレットモードか別ブラウザで同じ確認が通るか試す",
            "2) VPN、プロキシ、広告ブロック、保護機能を一時的に見直す",
            "3) Wi-Fi とモバイル回線で結果が変わるか確認する",
            "4) 403 や 429 の表示がないか確認する",
            "5) 特定サービスだけか、他サイトでも同様かを分ける",
            "6) 連続試行を止めて少し時間を置いてから再試行する",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "CAPTCHA ループは『人間判定に落ちている』だけではありません。Cookie 保存失敗、JavaScript 停止、IP 評価、回数制限のどれでも同じ見え方になりやすいので、ブラウザ差・回線差・エラー表示の有無で分けると進めやすくなります。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "CAPTCHA や本人確認が何度やっても終わらないときは、サイト全体停止より、Cookie、JavaScript、VPN や共有 IP、制限環境、回数制限を優先して確認するほうが早いです。",
            <>
              まずは症状を 403・429・ブラウザ差・回線差・サービス固有の問題に分けて、必要に応じて{" "}
              <Link
                href="/errors/403-forbidden"
                className="underline hover:no-underline"
              >
                403
              </Link>
              、{" "}
              <Link
                href="/errors/429-too-many-requests"
                className="underline hover:no-underline"
              >
                429
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-blocked-by-firewall"
                className="underline hover:no-underline"
              >
                制限系ページ
              </Link>
              、{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別ページ
              </Link>{" "}
              へ進むのが実用的です。
            </>,
          ],
        },
      ]}
    />
  );
}
