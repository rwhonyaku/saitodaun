import type { Metadata } from "next";
import Link from "next/link";
import EvergreenPageShell from "@/components/EvergreenPageShell";

export const metadata: Metadata = {
  title: "インターネット回線の障害を確認する方法",
  description:
    "インターネット回線やプロバイダの障害で通信できない場合の確認方法を解説します。回線障害の見分け方と対処法を紹介します。",
  alternates: { canonical: "/troubleshooting/isp-outage" },
};

export default function Page() {
  return (
    <EvergreenPageShell
      h1="インターネット回線の障害を確認する方法"
      lead={[
        "突然インターネットが使えなくなった場合、回線事業者やプロバイダ側で障害が発生している可能性があります。",
        "家庭のネットワーク設定を変更する前に、まず回線側の問題かどうかを確認することが重要です。",
        "このページでは、インターネット回線の障害を見分ける方法を解説します。",
      ]}
      sections={[
        {
          type: "p",
          title: "回線障害の典型的な症状",
          body: [
            "回線障害の場合、家のすべての端末で同時に通信できなくなることが多いです。",
          ],
        },
        {
          type: "list",
          title: "よくある症状",
          items: [
            "どのサイトも開かない",
            "Wi-Fi接続はできるがインターネットが使えない",
            "スマホ、PCなどすべての端末で通信できない",
          ],
        },
        {
          type: "p",
          title: "障害情報を確認する",
          body: [
            <>
              国内の広域ネット障害は{" "}
              <Link href="/outages/japan" className="underline hover:no-underline">
                ネット障害情報ページ
              </Link>{" "}
              で確認できます。
            </>,
          ],
        },
        {
          type: "p",
          title: "自宅の機器も確認する",
          body: [
            "回線障害ではなく、ルーターやモデムの問題の可能性もあります。",
            <>
              機器のトラブルについては{" "}
              <Link href="/troubleshooting/router-not-working" className="underline hover:no-underline">
                ルーターがつながらない原因
              </Link>{" "}
              を確認してください。
            </>,
          ],
        },
        {
          type: "note",
          title: "覚えておきたいポイント",
          body: [
            "回線障害の場合、ユーザー側でできる対処は基本的にありません。復旧を待つのが最も確実です。",
          ],
        },
        {
          type: "p",
          title: "まとめ",
          body: [
            "インターネットが突然使えなくなった場合は、まず回線障害の可能性を確認してください。自宅機器の設定を変更する前に状況を確認することで、不要な設定変更を防ぐことができます。",
          ],
        },
      ]}
      updatedAt="2026-03-06"
    />
  );
}