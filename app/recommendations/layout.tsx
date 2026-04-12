import { Metadata } from "next";

export const metadata: Metadata = {
  title: "推奨ツール・サービス一覧 | サイトダウン",
  description: "Webサイトの安定運用や、ドメイン管理、接続トラブル解決に役立つ厳選されたツールとサービスを比較・紹介します。",
};

export default function RecommendationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}