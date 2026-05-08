// lib/services/registry.ts

export type ServiceId =
  | "youtube"
  | "line"
  | "x"
  | "notion"
  | "instagram"
  | "amazon"
  | "chatgpt"
  | "gmail"
  | "google"
  | "netflix"
  | "discord"
  | "paypay"
  | "rakuten"
  | "yahoo"
  | "tiktok"
  | "zoom"
  | "mercari"
  | "outlook"
  | "microsoft365";

export type ServiceIssueId = "not-working";

export type OfficialSource = {
  label: string;
  href: string;
};

export type ServiceIssueConfig = {
  id: ServiceIssueId;

  /** UI strings (Japanese) */
  title: string;
  description: string;

  /** Search-intent phrases (Japanese) used for internal planning/FAQ prompts if needed */
  intentPhrases: string[];

  /** Error pages to link (keep tight: 4–8 max) */
  relatedErrorSlugs: string[];

  /** Internal troubleshooting guides to link */
  troubleshootingLinks: Array<{ label: string; href: string }>;

  /** Official references */
  officialSources: OfficialSource[];

  /** Existing status checker pages */
  statusPageHref: string;

  /** Main tool route */
  mainToolHref: string;
};

export type ServiceConfig = {
  id: ServiceId;

  /** UI strings (Japanese) */
  name: string;
  shortBlurb: string;

  /** /services/{service} */
  hubHref: string;

  issues: Record<ServiceIssueId, ServiceIssueConfig>;
};

export const SERVICES: Record<ServiceId, ServiceConfig> = {
  youtube: {
    id: "youtube",
    name: "YouTube",
    shortBlurb: "見れない・読み込めない・再生できない時の切り分けと最短対処。",
    hubHref: "/services/youtube",
    issues: {
      "not-working": {
        id: "not-working",
        title: "YouTubeが見れない・開かない？（障害か自分側か）",
        description:
          "YouTube側の障害か、自分の環境（回線/端末/ブラウザ/DNS）かを最短で切り分け、すぐ試せる対処に誘導します。",
        intentPhrases: ["youtube 見れない", "youtube 開かない", "youtube 読み込めない", "youtube 再生できない"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "err-connection-reset",
          "err-connection-refused",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "cloudflare-522",
          "cloudflare-524",
          "504-gateway-timeout",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [
          {
            label: "Google Workspace ステータスダッシュボード",
            href: "https://www.google.com/appsstatus/dashboard/",
          },
          {
            label: "YouTube 公式アカウント（X）",
            href: "https://x.com/youtube",
          },
        ],
        statusPageHref: "/status/sites/youtube",
        mainToolHref: "/",
      },
    },
  },

  line: {
    id: "line",
    name: "LINE",
    shortBlurb: "開かない・送れない・通話できない時の最短切り分け。",
    hubHref: "/services/line",
    issues: {
      "not-working": {
        id: "not-working",
        title: "LINEが使えない？（障害か自分側か）",
        description:
          "LINE側の障害か、自分の回線/端末/アプリ起因かを短時間で切り分け、最短で復旧する手順をまとめます。",
        intentPhrases: ["line 開かない", "line 送れない", "line 通話 できない", "line 繋がらない"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "err-connection-reset",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [{ label: "LINE公式（X）", href: "https://x.com/LINEjp_official" }],
        statusPageHref: "/status/sites/line",
        mainToolHref: "/",
      },
    },
  },

  x: {
    id: "x",
    name: "X",
    shortBlurb: "開かない・読み込めない・ログインできない時の切り分け。",
    hubHref: "/services/x",
    issues: {
      "not-working": {
        id: "not-working",
        title: "Xが開かない？（障害か自分側か）",
        description:
          "X側の障害か、自分の環境（回線/DNS/ブラウザ/アプリ）かを切り分け、最短の対処に誘導します。",
        intentPhrases: ["twitter 開かない", "x 開かない", "x 読み込めない", "x ログインできない"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "err-connection-reset",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "503-service-unavailable",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [{ label: "Xサポート（X）", href: "https://x.com/Support" }],
        statusPageHref: "/status/sites/twitter",
        mainToolHref: "/",
      },
    },
  },

  notion: {
    id: "notion",
    name: "Notion",
    shortBlurb: "開かない・重い・ログインできない・同期しない時の切り分け。",
    hubHref: "/services/notion",
    issues: {
      "not-working": {
        id: "not-working",
        title: "Notionが開かない・重い・ログインできない？（障害か自分側か）",
        description:
          "Notionが広く落ちていないのに使えない時に、読み込み、ログイン、同期、表示不良、アプリやブラウザ、ネットワーク制限の切り分けを行います。",
        intentPhrases: [
          "notion 障害",
          "notion 開かない",
          "notion 重い",
          "notion ログインできない",
        ],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "err-connection-reset",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "503-service-unavailable",
          "504-gateway-timeout",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [
          { label: "Notion Status", href: "https://status.notion.so/" },
          { label: "Notion Help", href: "https://www.notion.so/help" },
        ],
        statusPageHref: "/status/sites/notion",
        mainToolHref: "/",
      },
    },
  },

  instagram: {
    id: "instagram",
    name: "Instagram",
    shortBlurb: "読み込めない・表示されない・ログインできない時の対処。",
    hubHref: "/services/instagram",
    issues: {
      "not-working": {
        id: "not-working",
        title: "Instagramが読み込めない？（障害か自分側か）",
        description:
          "Instagram側の障害か、自分の環境（回線/DNS/アプリ）かを短時間で切り分けます。",
        intentPhrases: ["instagram 読み込めない", "インスタ 開かない", "インスタ 表示されない", "インスタ ログインできない"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "err-connection-reset",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [{ label: "Meta ステータス", href: "https://metastatus.com/" }],
        statusPageHref: "/status/sites/instagram",
        mainToolHref: "/",
      },
    },
  },

  amazon: {
    id: "amazon",
    name: "Amazon",
    shortBlurb: "ログインできない・購入できない・開かない時の切り分け。",
    hubHref: "/services/amazon",
    issues: {
      "not-working": {
        id: "not-working",
        title: "Amazonがログインできない？（障害か自分側か）",
        description:
          "Amazon側の障害か、端末/回線/アカウント起因かを切り分け、無駄なく対処します。",
        intentPhrases: ["amazon ログインできない", "amazon 開かない", "amazon 購入できない", "amazon エラー"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "err-connection-reset",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "502-bad-gateway",
          "503-service-unavailable",
          "504-gateway-timeout",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [{ label: "Amazon ヘルプ", href: "https://www.amazon.com/gp/help/customer/display.html" }],
        statusPageHref: "/status/sites/amazon-jp",
        mainToolHref: "/",
      },
    },
  },

  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    shortBlurb: "使えない・ログインできない時の切り分けと対処。",
    hubHref: "/services/chatgpt",
    issues: {
      "not-working": {
        id: "not-working",
        title: "ChatGPTが使えない？（障害か自分側か）",
        description:
          "障害か、自分の環境（回線/DNS/ブラウザ）かを切り分け、最短で復旧する手順をまとめます。",
        intentPhrases: ["chatgpt 使えない", "chatgpt ログインできない", "chatgpt 開かない", "chatgpt エラー"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "err-connection-reset",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "429-too-many-requests",
          "502-bad-gateway",
          "503-service-unavailable",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [{ label: "OpenAI ステータス", href: "https://status.openai.com/" }],
        statusPageHref: "/status/sites/openai",
        mainToolHref: "/",
      },
    },
  },

  gmail: {
    id: "gmail",
    name: "Gmail",
    shortBlurb: "送受信できない・開かない時の切り分けと対処。",
    hubHref: "/services/gmail",
    issues: {
      "not-working": {
        id: "not-working",
        title: "Gmailが送受信できない？（障害か自分側か）",
        description:
          "Google側の障害か、回線/DNS/ブラウザ起因かを切り分け、すぐ試せる対処に誘導します。",
        intentPhrases: ["gmail 送れない", "gmail 受信できない", "gmail 開かない", "gmail エラー"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "502-bad-gateway",
          "503-service-unavailable",
          "504-gateway-timeout",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [
          {
            label: "Google Workspace ステータスダッシュボード",
            href: "https://www.google.com/appsstatus/dashboard/",
          },
        ],
        statusPageHref: "/status/sites/gmail",
        mainToolHref: "/",
      },
    },
  },

  google: {
    id: "google",
    name: "Google",
    shortBlurb: "検索できない・開けない時の切り分けと対処。",
    hubHref: "/services/google",
    issues: {
      "not-working": {
        id: "not-working",
        title: "Googleが開けない？（障害か自分側か）",
        description:
          "Google側の障害か、自分の環境（回線/DNS/ブラウザ）かを切り分け、最短で対処します。",
        intentPhrases: ["google 開けない", "google 検索できない", "google つながらない", "google エラー"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "502-bad-gateway",
          "503-service-unavailable",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [
          {
            label: "Google Workspace ステータスダッシュボード",
            href: "https://www.google.com/appsstatus/dashboard/",
          },
        ],
        statusPageHref: "/status/sites/google",
        mainToolHref: "/",
      },
    },
  },

  netflix: {
    id: "netflix",
    name: "Netflix",
    shortBlurb: "再生できない・読み込めない時の切り分けと対処。",
    hubHref: "/services/netflix",
    issues: {
      "not-working": {
        id: "not-working",
        title: "Netflixが再生できない？（障害か自分側か）",
        description:
          "Netflix側の障害か、端末/アプリ/回線起因かを切り分け、再生トラブルを最短で解決します。",
        intentPhrases: ["netflix 再生できない", "netflix 読み込めない", "netflix エラー", "ネトフリ 見れない"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "err-connection-reset",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "504-gateway-timeout",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [{ label: "Netflix ヘルプセンター", href: "https://help.netflix.com/" }],
        statusPageHref: "/status/sites/netflix",
        mainToolHref: "/",
      },
    },
  },

  discord: {
    id: "discord",
    name: "Discord",
    shortBlurb: "つながらない・読み込めない時の切り分けと対処。",
    hubHref: "/services/discord",
    issues: {
      "not-working": {
        id: "not-working",
        title: "Discordがつながらない？（障害か自分側か）",
        description:
          "Discord側の障害か、自分の環境（回線/DNS/アプリ）かを切り分け、最短で復旧する手順をまとめます。",
        intentPhrases: ["discord つながらない", "discord 読み込めない", "discord 接続できない", "discord エラー"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "err-connection-reset",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "502-bad-gateway",
          "503-service-unavailable",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [{ label: "Discord ステータス", href: "https://discordstatus.com/" }],
        statusPageHref: "/status/sites/discord",
        mainToolHref: "/",
      },
    },
  },

  paypay: {
    id: "paypay",
    name: "PayPay",
    shortBlurb: "使えない・支払いできない・開かない時の切り分け。",
    hubHref: "/services/paypay",
    issues: {
      "not-working": {
        id: "not-working",
        title: "PayPayが使えない？（障害か自分側か）",
        description:
          "PayPayが開かない・使えない・支払いできない時に、障害か自分の環境（回線/端末/アプリ/DNS/アカウント）かを最短で切り分けます。",
        intentPhrases: ["paypay 使えない", "paypay エラー", "paypay 開かない", "paypay 支払いできない"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "502-bad-gateway",
          "503-service-unavailable",
          "504-gateway-timeout",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [
          { label: "PayPay公式", href: "https://paypay.ne.jp/" },
          { label: "PayPayヘルプ", href: "https://paypay.ne.jp/help/" },
        ],
        statusPageHref: "/status/sites/paypay",
        mainToolHref: "/",
      },
    },
  },

  rakuten: {
    id: "rakuten",
    name: "楽天",
    shortBlurb: "開かない・ログインできない・購入できない時の切り分け。",
    hubHref: "/services/rakuten",
    issues: {
      "not-working": {
        id: "not-working",
        title: "楽天が開かない・ログインできない？（障害か自分側か）",
        description:
          "楽天市場や楽天サービスが開かない・ログインできない場合に、楽天側の障害か、自分の環境（回線/DNS/ブラウザ/端末）かを切り分けて最短で対処します。",
        intentPhrases: ["楽天 開かない", "楽天 ログインできない", "楽天市場 エラー", "楽天 つながらない"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "err-connection-reset",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "502-bad-gateway",
          "503-service-unavailable",
          "504-gateway-timeout",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [
          {
            label: "楽天グループ公式サイト",
            href: "https://corp.rakuten.co.jp/",
          },
          {
            label: "楽天市場ヘルプ",
            href: "https://ichiba.faq.rakuten.net/",
          },
        ],
        statusPageHref: "/status/sites/rakuten",
        mainToolHref: "/",
      },
    },
  },

  yahoo: {
    id: "yahoo",
    name: "Yahoo! JAPAN",
    shortBlurb: "開かない・検索できない・ログインできない時の切り分け。",
    hubHref: "/services/yahoo",
    issues: {
      "not-working": {
        id: "not-working",
        title: "Yahoo! JAPANが開かない？（障害か自分側か）",
        description:
          "Yahoo! JAPANが開かない・検索できない・ログインできない場合に、障害か自分の環境かを切り分けます。",
        intentPhrases: ["yahoo 開かない", "yahoo japan 開かない", "yahoo 検索できない", "yahoo エラー"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "err-connection-reset",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "502-bad-gateway",
          "503-service-unavailable",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [{ label: "Yahoo! JAPAN", href: "https://www.yahoo.co.jp/" }],
        statusPageHref: "/status/sites/yahoo-japan",
        mainToolHref: "/",
      },
    },
  },

  tiktok: {
    id: "tiktok",
    name: "TikTok",
    shortBlurb: "開かない・読み込めない・再生できない時の切り分け。",
    hubHref: "/services/tiktok",
    issues: {
      "not-working": {
        id: "not-working",
        title: "TikTokが使えない？（障害か自分側か）",
        description:
          "TikTokが開かない・読み込めない・再生できない場合に、障害か自分の環境かを切り分けます。",
        intentPhrases: ["tiktok 開かない", "tiktok 読み込めない", "tiktok 見れない", "tiktok エラー"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "err-connection-reset",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "503-service-unavailable",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [{ label: "TikTok", href: "https://www.tiktok.com/" }],
        statusPageHref: "/status/sites/tiktok",
        mainToolHref: "/",
      },
    },
  },

  zoom: {
    id: "zoom",
    name: "Zoom",
    shortBlurb: "入れない・接続できない・起動しない時の切り分け。",
    hubHref: "/services/zoom",
    issues: {
      "not-working": {
        id: "not-working",
        title: "Zoomが接続できない？（障害か自分側か）",
        description:
          "Zoom会議に入れない・接続できない場合に、障害か自分の環境（回線/DNS/アプリ/端末）かを切り分けます。",
        intentPhrases: ["zoom 入れない", "zoom 接続できない", "zoom 開かない", "zoom エラー"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "err-connection-reset",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "504-gateway-timeout",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [{ label: "Zoom Status", href: "https://status.zoom.us/" }],
        statusPageHref: "/status/sites/zoom",
        mainToolHref: "/",
      },
    },
  },

  mercari: {
    id: "mercari",
    name: "メルカリ",
    shortBlurb: "開かない・ログインできない・購入できない時の切り分け。",
    hubHref: "/services/mercari",
    issues: {
      "not-working": {
        id: "not-working",
        title: "メルカリが開かない？（障害か自分側か）",
        description:
          "メルカリが開かない・ログインできない・購入できない場合に、障害か自分の環境（回線/DNS/アプリ/端末）かを切り分けます。",
        intentPhrases: ["メルカリ 開かない", "メルカリ ログインできない", "メルカリ エラー", "メルカリ 使えない"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "err-connection-reset",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "502-bad-gateway",
          "503-service-unavailable",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [{ label: "メルカリ公式", href: "https://www.mercari.com/jp/" }],
        statusPageHref: "/status/sites/mercari",
        mainToolHref: "/",
      },
    },
  },

  outlook: {
    id: "outlook",
    name: "Outlook",
    shortBlurb: "メールが送受信できない・ログインできない時の切り分け。",
    hubHref: "/services/outlook",
    issues: {
      "not-working": {
        id: "not-working",
        title: "Outlookが使えない？（障害か自分側か）",
        description:
          "Outlookメールが開かない・送受信できない場合に、Microsoft側の障害か自分の環境（回線/DNS/ブラウザ/端末）かを切り分けます。",
        intentPhrases: ["outlook 開かない", "outlook メール 送れない", "outlook ログインできない", "outlook エラー"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "502-bad-gateway",
          "503-service-unavailable",
          "504-gateway-timeout",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [{ label: "Microsoft Service Status", href: "https://portal.office.com/servicestatus" }],
        statusPageHref: "/status/sites/microsoft-365",
        mainToolHref: "/",
      },
    },
  },

  microsoft365: {
    id: "microsoft365",
    name: "Microsoft 365",
    shortBlurb: "Teams・Outlook・Officeが使えない時の切り分け。",
    hubHref: "/services/microsoft365",
    issues: {
      "not-working": {
        id: "not-working",
        title: "Microsoft 365が使えない？（障害か自分側か）",
        description:
          "Microsoft 365（Outlook・Teams・Officeなど）が使えない場合に、Microsoft側の障害か自分の環境を切り分けます。",
        intentPhrases: ["microsoft365 使えない", "office365 エラー", "microsoft365 ログインできない", "office365 開かない"],
        relatedErrorSlugs: [
          "err-connection-timed-out",
          "dns-probe-finished-nxdomain",
          "ssl-handshake-failed",
          "502-bad-gateway",
          "503-service-unavailable",
        ],
        troubleshootingLinks: [
          { label: "DNSトラブル対処", href: "/troubleshooting-dns" },
          { label: "ステータスコード一覧", href: "/status-codes" },
        ],
        officialSources: [{ label: "Microsoft Service Status", href: "https://portal.office.com/servicestatus" }],
        statusPageHref: "/status/sites/microsoft-365",
        mainToolHref: "/",
      },
    },
  },
};

export function getService(serviceId: string): ServiceConfig | null {
  const key = serviceId as ServiceId;
  return SERVICES[key] ?? null;
}

export function listServices(): ServiceConfig[] {
  return Object.values(SERVICES);
}
