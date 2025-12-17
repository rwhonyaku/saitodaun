import type { Metadata } from "next";
import StatusListClient from "@/components/StatusListClient";
import { SITE } from "@/lib/siteMeta";

export const metadata: Metadata = {
  title: "ステータス一覧",
  description: `主要サービスの障害・稼働状況（ステータス）を簡易チェックできます。`,
  alternates: { canonical: "/status" },
};

export default function Page() {
  return <StatusListClient />;
}
