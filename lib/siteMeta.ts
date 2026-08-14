export const SITE = {
  name: "サイトダウン",
  // One-line description used everywhere (titles, meta, headers)
  tagline:
    "URLを入力すると、いま接続できるか（オンライン／オフライン）をすぐ確認できます。",
  // Meta description (slightly longer is OK; keep it consistent)
  description:
    "サイトダウンは、指定したURLにいま接続できるか（オンライン／オフライン）を素早く確認できるシンプルな接続チェックツールです。障害確認や一次確認に役立ちます。",
  // Canonical origin
  origin: "https://xn--ecke7b4bzb0s.com",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "接続チェック" },
  { href: "/status", label: "ステータス" },
  { href: "/faq", label: "FAQ" },
  { href: "/what-is-website-downtime", label: "サイトが落ちるとは" },
  { href: "/glossary", label: "ステータスコード解説" },
  { href: "/troubleshooting-dns", label: "DNSエラーの直し方" },
  { href: "/how-it-works", label: "仕組み" },
  { href: "/about", label: "このサイトについて" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/privacy", label: "プライバシー" },
  { href: "/terms", label: "利用規約" },
] as const;
