import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "インターネットが遅いときの切り分けハブ",
  description:
    "インターネットやサイトが遅いときの切り分けハブです。Wi-Fi、ルーター、ISP 障害、サイト側負荷、CDN 経路、読み込み停止など、症状ごとに次に見るべきページへ案内します。",
  alternates: { canonical: "/troubleshooting/slow-internet" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="インターネットが遅いときの切り分けハブ"
      updatedAt="2026-04-12"
      lead={[
        "『ネットが遅い』と感じるときでも、原因は一つではありません。家の Wi-Fi やルーターが遅いのか、回線や ISP 側が混雑しているのか、特定サイトだけが重いのか、ページは開くが読み込みが終わらないのかで見るべき場所が変わります。",
        "このページは、速度低下や重さに関する症状を最短で振り分けるためのミニハブです。まず『何が遅いのか』を分けて、必要な深掘りページへ進んでください。",
      ]}
      sections={[
        {
          type: "list",
          title: "最短で切り分けるなら",
          items: [
            "どのサイトも全体的に遅いなら、Wi-Fi、ルーター、ISP 側を優先して疑う",
            "特定サイトだけ遅いなら、サイト側負荷や CDN 経路の問題に近い",
            "ページは開くが読み込みが終わらないなら、回線速度だけでなく部分障害やスクリプト待ちも候補になる",
            "Wi-Fi では遅いがモバイル回線なら普通なら、自宅や職場のネットワーク側にかなり寄る",
            "ピーク時間だけ重いなら、回線混雑やサービス側高負荷を疑いやすい",
          ],
        },
        {
          type: "div",
          title: "状況から選ぶ",
          body: [
            <div key="cases" className="space-y-3">
              <p>
                インターネット全体が遅い、どのサイトも重い →{" "}
                <Link
                  href="/troubleshooting/internet-not-working"
                  className="underline hover:no-underline"
                >
                  インターネットにつながらない原因
                </Link>
              </p>
              <p>
                Wi-Fi だけ遅い、家の回線だけ重い →{" "}
                <Link
                  href="/troubleshooting/wifi-not-working"
                  className="underline hover:no-underline"
                >
                  Wi-Fiがつながらない原因
                </Link>
              </p>
              <p>
                ルーターの問題か回線障害か見たい →{" "}
                <Link
                  href="/troubleshooting/router-vs-isp-problem"
                  className="underline hover:no-underline"
                >
                  ルーターが原因か回線障害か見分ける方法
                </Link>
              </p>
              <p>
                回線障害や ISP 側の不調を疑っている →{" "}
                <Link
                  href="/troubleshooting/isp-outage"
                  className="underline hover:no-underline"
                >
                  インターネット回線の障害を確認する方法
                </Link>
              </p>
              <p>
                特定サイトだけ重い、地域差がありそう →{" "}
                <Link
                  href="/troubleshooting/cdn-or-server-edge-issues"
                  className="underline hover:no-underline"
                >
                  CDNやサーバー経路の問題
                </Link>
              </p>
              <p>
                ページは開くが読み込みが終わらない →{" "}
                <Link
                  href="/troubleshooting/site-loads-forever"
                  className="underline hover:no-underline"
                >
                  サイトが読み込み中のまま終わらない原因
                </Link>
              </p>
              <p>
                サイトの表示速度そのものを見たい →{" "}
                <Link
                  href="/site-performance"
                  className="underline hover:no-underline"
                >
                  サイトが重い・表示が遅い時の測定と対策
                </Link>
              </p>
              <p>
                まず広域障害か確認したい →{" "}
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
          title: "遅さの主な分かれ方",
          items: [
            "回線全体が遅い: Wi-Fi、ルーター、ISP、混雑",
            "特定サイトだけ遅い: サイト側高負荷、CDN、経路差",
            "表示は始まるが終わらない: 部分障害、スクリプト待ち、API 遅延",
            "時間帯でだけ遅い: 混雑、ピーク負荷、一時障害",
            "端末や回線を変えると改善する: ローカル環境や経路差",
          ],
        },
        {
          type: "p",
          title: "『全部遅い』か『一部だけ遅い』かを先に分ける",
          body: [
            "速度低下の切り分けで一番重要なのは、ネット全体が重いのか、特定のサイトや特定の操作だけが重いのかを見ることです。前者ならルーターや回線、後者ならサイト側や配信経路の可能性が高くなります。",
            <>
              家の中の複数端末で広く遅いなら{" "}
              <Link
                href="/troubleshooting/router-vs-isp-problem"
                className="underline hover:no-underline"
              >
                ルーターか回線かの切り分け
              </Link>{" "}
              が近道です。
            </>,
          ],
        },
        {
          type: "p",
          title: "Wi-Fiだけ遅いならローカル側を優先する",
          body: [
            "モバイル回線では普通なのに、自宅や職場の Wi-Fi だけ遅いなら、サイト全体障害よりローカルネットワーク側に寄ります。ルーターの不安定さ、混雑、電波条件、DNS、ISP 側の局所的な不調が候補です。",
            <>
              この方向なら{" "}
              <Link
                href="/troubleshooting/wifi-not-working"
                className="underline hover:no-underline"
              >
                Wi-Fi
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/router-not-working"
                className="underline hover:no-underline"
              >
                ルーター
              </Link>
              、{" "}
              <Link
                href="/troubleshooting/isp-outage"
                className="underline hover:no-underline"
              >
                回線障害
              </Link>{" "}
              の順で見ると整理しやすいです。
            </>,
          ],
        },
        {
          type: "p",
          title: "特定サイトだけ遅いなら速度問題というよりサイト側の症状",
          body: [
            "1つのサイトやサービスだけが極端に遅いなら、単純な回線速度低下ではなく、そのサービス側の高負荷、地域差のある CDN 不調、特定機能だけの部分障害かもしれません。『遅い』と感じても、実際には一部機能だけ止まりかけていることがあります。",
            <>
              その場合は{" "}
              <Link
                href="/troubleshooting/cdn-or-server-edge-issues"
                className="underline hover:no-underline"
              >
                CDNやサーバー経路の問題
              </Link>{" "}
              や{" "}
              <Link href="/services" className="underline hover:no-underline">
                サービス別トラブルページ
              </Link>{" "}
              のほうが近い案内です。
            </>,
          ],
        },
        {
          type: "p",
          title: "読み込みが終わらないなら『遅い』ではなく停止に近いこともある",
          body: [
            "ページ表示は始まるのにスピナーが消えない、特定操作のあとだけ待たされ続けるなら、単なる低速回線ではなく API 遅延や部分障害、JavaScript 待ちの可能性があります。これは『遅い』と感じても、実際には処理が止まりかけているケースです。",
            <>
              そう見えるときは{" "}
              <Link
                href="/troubleshooting/site-loads-forever"
                className="underline hover:no-underline"
              >
                読み込み中のまま終わらない原因
              </Link>{" "}
              が近いページです。
            </>,
          ],
        },
        {
          type: "list",
          title: "このハブ配下として見なせる既存ページ",
          items: [
            "/site-performance",
            "/troubleshooting/site-loads-forever",
            "/troubleshooting/cdn-or-server-edge-issues",
            "/troubleshooting/isp-outage",
            "/troubleshooting/router-vs-isp-problem",
            "/troubleshooting/router-not-working",
            "/troubleshooting/wifi-not-working",
            "/troubleshooting/internet-not-working",
          ],
        },
        {
          type: "note",
          title: "判断のコツ",
          body: [
            "『遅い』は広すぎる症状です。まずは全部遅いのか、一部だけ遅いのか、回線差があるのか、読み込み停止に近いのかを分けると、次に行くべきページがかなりはっきりします。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "インターネットが遅いときは、回線、Wi-Fi、ルーター、ISP、サイト側高負荷、CDN 経路、部分障害が候補になります。まず遅さの範囲を分けることが、最短の切り分けです。",
            <>
              回線全体なら{" "}
              <Link
                href="/troubleshooting/router-vs-isp-problem"
                className="underline hover:no-underline"
              >
                ルーターか回線か
              </Link>
              、サイト単位なら{" "}
              <Link
                href="/troubleshooting/cdn-or-server-edge-issues"
                className="underline hover:no-underline"
              >
                CDNや経路
              </Link>
              、停止っぽいなら{" "}
              <Link
                href="/troubleshooting/site-loads-forever"
                className="underline hover:no-underline"
              >
                読み込み停止
              </Link>{" "}
              へ進むのが実用的です。
            </>,
          ],
        },
      ]}
    />
  );
}
