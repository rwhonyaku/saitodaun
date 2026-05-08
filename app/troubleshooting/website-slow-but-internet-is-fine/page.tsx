import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "特定のサイトだけ遅い原因と対処法",
  description:
    "インターネット全体は普通なのに特定のサイトやサービスだけ遅いときの原因と対処法を解説します。サイト側の高負荷、CDNや経路差、部分障害、読み込み停止との見分け方をまとめています。",
  alternates: { canonical: "/troubleshooting/website-slow-but-internet-is-fine" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="特定のサイトだけ遅い原因と対処法"
      updatedAt="2026-04-13"
      lead={[
        "他のサイトやアプリは普通に使えるのに、あるサイトだけ極端に重いことがあります。この場合は回線全体の問題というより、そのサイト側の高負荷、配信経路、地域差、特定機能だけの部分障害を優先して見たほうが早いです。",
        "重要なのは『ネット全体が遅い』のか『そのサイトだけ遅い』のかを最初に分けることです。特定サイトだけ遅いなら、Wi-Fi や ISP 全体より、サイト固有の症状として整理したほうが切り分けやすくなります。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "他のサイトは普通なら、回線全体よりそのサイト側や配信経路を優先して疑う",
            "トップは見えるがログイン後や検索だけ重いなら、機能単位の部分障害に近い",
            "時間帯によってだけ極端に遅いなら、サイト側の高負荷や混雑の可能性が高い",
            "別回線でも同じサイトだけ遅いなら、ローカル回線よりサービス側に寄る",
            "読み込みが終わらず止まり気味なら、単なる低速ではなく処理停止や API 遅延も候補になる",
          ],
        },
        {
          type: "div",
          title: "症状から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                インターネット全体が重いかまだ迷う →{" "}
                <Link
                  href="/troubleshooting/slow-internet"
                  className="underline hover:no-underline"
                >
                  インターネットが遅いときの切り分けハブ
                </Link>
              </p>
              <p>
                読み込み中のまま終わらない →{" "}
                <Link
                  href="/troubleshooting/site-loads-forever"
                  className="underline hover:no-underline"
                >
                  サイトが読み込み中のまま終わらない原因
                </Link>
              </p>
              <p>
                地域差や配信経路の問題を疑っている →{" "}
                <Link
                  href="/troubleshooting/cdn-or-server-edge-issues"
                  className="underline hover:no-underline"
                >
                  CDNやサーバー経路の問題
                </Link>
              </p>
              <p>
                特定サービスだけ重い、遅い →{" "}
                <Link href="/services" className="underline hover:no-underline">
                  サービス別トラブルページ
                </Link>
              </p>
              <p>
                特定サイトだけ不安定で開いたり遅かったりする →{" "}
                <Link
                  href="/troubleshooting/specific-site-not-working"
                  className="underline hover:no-underline"
                >
                  特定のサイトだけ開かない原因
                </Link>
              </p>
              <p>
                表示速度そのものの考え方を見たい →{" "}
                <Link
                  href="/site-performance"
                  className="underline hover:no-underline"
                >
                  サイトが重い・表示が遅い時の測定と対策
                </Link>
              </p>
            </div>,
          ],
        },
        {
          type: "list",
          title: "この症状で多い見え方",
          items: [
            "他のサイトは速いのに一つだけ極端に重い",
            "トップは開くが検索、ログイン後、購入画面だけ遅い",
            "時間帯によってだけそのサイトが重くなる",
            "スマホでも PC でも同じサイトだけ遅い",
            "画像や一部機能だけ遅れて出る",
            "表示は始まるが最後まで完了しない",
          ],
        },
        {
          type: "p",
          title: "回線全体ではなくサイト固有の症状として見るほうが早い",
          body: [
            "他のサイトや動画、アプリは普通に使えるのに一つだけ遅いなら、Wi-Fi 全体の問題と考えて遠回りするより、そのサイト側の症状として整理したほうが早いです。サイトの高負荷、地域ごとの CDN 不調、特定ページだけの API 遅延などでも『そのサイトだけ重い』見え方になります。",
            <>
              まず全体の遅さと切り分けたいなら{" "}
              <Link
                href="/troubleshooting/slow-internet"
                className="underline hover:no-underline"
              >
                slow-internet ハブ
              </Link>
              から逆に確認するのも有効です。
            </>,
          ],
        },
        {
          type: "p",
          title: "特定の操作だけ遅いなら部分障害に近い",
          body: [
            "トップページは見えるのに、検索結果、会員ページ、購入処理、投稿画面など特定の操作だけ重いなら、回線速度よりその機能の裏側が遅れている可能性が高いです。見た目は『遅い』でも、実際には特定の API や認証、在庫確認、保存処理だけが詰まっていることがあります。",
            <>
              その見え方なら{" "}
              <Link
                href="/troubleshooting/specific-site-not-working"
                className="underline hover:no-underline"
              >
                特定サイトの切り分け
              </Link>
              や{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別トラブルページ
              </Link>
              が近い案内です。
            </>,
          ],
        },
        {
          type: "p",
          title: "地域差や時間帯差があるなら CDN や経路差を疑う",
          body: [
            "夜だけ重い、ある回線だけ遅い、他の人も同じ地域で遅いというときは、そのサイトのサーバー本体より配信経路や CDN 側の混雑・不安定さが原因のことがあります。こうしたケースでは『開かない』ではなく『妙に重い』『一部だけ遅い』見え方になりやすいです。",
            <>
              この方向なら{" "}
              <Link
                href="/troubleshooting/cdn-or-server-edge-issues"
                className="underline hover:no-underline"
              >
                CDNやサーバー経路の問題
              </Link>
              が最も近いページです。
            </>,
          ],
        },
        {
          type: "p",
          title: "終わらないなら『遅い』より停止に近いこともある",
          body: [
            "表示が遅いのではなく、読み込み中のまま長く止まる、途中まで見えるのに完了しないなら、単純な低速表示より処理停止や待ち状態に近い可能性があります。こうなると体感は『遅い』ですが、実際には何かが詰まっているケースです。",
            <>
              その場合は{" "}
              <Link
                href="/troubleshooting/site-loads-forever"
                className="underline hover:no-underline"
              >
                読み込み中のまま終わらないケース
              </Link>
              へ進んだほうが切り分けしやすくなります。
            </>,
          ],
        },
        {
          type: "list",
          title: "順番に試したい確認手順",
          items: [
            "1) 他のサイトやアプリも遅いのか、そのサイトだけ遅いのかを分ける",
            "2) トップだけか、ログイン後や検索など特定操作だけかを確認する",
            "3) スマホと PC、Wi-Fi と別回線で同じサイトの重さを比べる",
            "4) 時間帯を変えて同じ症状が続くかを見る",
            "5) サービス別ページや障害情報で同種報告がないか確認する",
            "6) 読み込み停止に近いなら専用ページへ移る",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "『そのサイトだけ遅い』ときは、まず回線速度の話から離れて考えると整理しやすくなります。特定機能だけか、時間帯差があるか、別回線でも同じかの3点で見ると次の手が決めやすいです。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "インターネット全体は普通なのに特定のサイトだけ遅いときは、回線全体の不調より、そのサイト側の高負荷、配信経路、特定機能だけの部分障害を優先して見るほうが早いです。『どこが遅いか』を分けるだけで、次に進むべきページがかなりはっきりします。",
            <>
              必要に応じて{" "}
              <Link
                href="/troubleshooting/slow-internet"
                className="underline hover:no-underline"
              >
                全体の遅さ
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/cdn-or-server-edge-issues"
                className="underline hover:no-underline"
              >
                CDNや経路
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/site-loads-forever"
                className="underline hover:no-underline"
              >
                読み込み停止
              </Link>
              、{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別ページ
              </Link>
              へ進むのが実用的です。
            </>,
          ],
        },
      ]}
    />
  );
}
