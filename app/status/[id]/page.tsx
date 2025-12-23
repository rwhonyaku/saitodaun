import type { Metadata } from "next";
import { getSiteById } from "@/lib/statusSites";
import StatusClient from "./StatusClient";
import { SITE } from "@/lib/siteMeta";


const toId = (raw: unknown): string => {
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw) && typeof raw[0] === "string") return raw[0];
  return "";
};

export function generateMetadata({ params }: { params: any }): Metadata {
  const base = SITE.origin;
  const id = toId(params?.id);
  const site = id ? getSiteById(id) : undefined;

  if (!site) {
    return {
      title: `ステータスが見つかりません｜${SITE.name}`,
      description: "指定されたサービスは見つかりませんでした。",
      alternates: { canonical: `${base}/status` },
    };
  }

  const title = `${site.name} は今落ちてる？（障害・稼働状況チェック）｜${SITE.name}`;
  const description = `${site.name} の稼働状況（オンライン／オフライン）を簡易チェック。HTTPステータスや応答時間も確認できます。`;

  return {
    title,
    description,
    alternates: { canonical: `${base}/status/${site.id}` },
    openGraph: {
      title,
      description,
      url: `${base}/status/${site.id}`,
      siteName: SITE.name,
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
