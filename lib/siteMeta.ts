export const SITE = {
  name: "サイトダウン",
  // One-line description used everywhere (titles, meta, headers)
  tagline:
    "URLを入力すると、いま接続できるか（オンライン／オフライン）をすぐ確認できます。",
  // Meta description (slightly longer is OK; keep it consistent)
  description:
    "サイトダウンは、指定したURLにいま接続できるか（オンライン／オフライン）を素早く確認できるシンプルな接続チェックツールです。障害切り分けや一次確認に役立ちます。",
  // Canonical origin (used in metadata if you want absolute URLs later)
  origin: "https://サイトダウン.com",
} as const

export const NAV_LINKS = [
  { href: "/", label: "接続チェック" },
  { href: "/status", label: "ステータス" },
  { href: "/about", label: "このサイトについて" },
  { href: "/how-it-works", label: "仕組み" },
  { href: "/what-is-website-downtime", label: "サイトが落ちるとは" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "プライバシー" },
  { href: "/terms", label: "利用規約" },
] as const
