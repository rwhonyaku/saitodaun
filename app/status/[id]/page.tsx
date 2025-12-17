import type { Metadata } from "next";
import { getSiteById } from "@/lib/statusSites";
import StatusClient from "./StatusClient";

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const base = "https://xn--ecke7b4bzb0s.com";
  const site = getSiteById(params.id);

  if (!site) {
    return {
      title: "ステータスが見つかりません｜サイトダウン",
      description: "指定されたサービスは見つかりませんでした。",
      alternates: { canonical: `${base}/status` },
    };
  }

  const title = `${site.name} は落ちてる？障害・稼働状況を確認｜サイトダウン`;
  const description = `${site.name} の稼働状況（オンライン／オフライン）を簡易チェック。HTTPステータスや応答時間も確認できます。`;

  return {
    title,
    description,
    alternates: { canonical: `${base}/status/${site.id}` },
    openGraph: {
      title,
      description,
      url: `${base}/status/${site.id}`,
      siteName: "サイトダウン",
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function Page() {
  return <StatusClient />;
}
