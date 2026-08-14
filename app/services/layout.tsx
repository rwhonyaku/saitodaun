import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "サービス別トラブル解決",
    template: "%s",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
