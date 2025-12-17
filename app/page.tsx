import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { SITE } from "@/lib/siteMeta";

export const metadata: Metadata = {
  title: "接続チェック",
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeClient />;
}
