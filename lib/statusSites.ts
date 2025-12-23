// lib/statusSites.ts

export const SITE_CATEGORIES = {
  search_portal: "検索・ポータル",
  ecommerce_marketplace: "EC・マーケット",
  social_messaging: "SNS・メッセージ",
  streaming_media: "動画・音楽",
  gaming: "ゲーム",
  payments_finance: "決済・金融",
  cloud_devops: "クラウド・開発基盤",
  productivity_saas: "業務・SaaS",
  telecom_isp: "通信・ISP",
  government_public: "官公庁・公共",
  transport_travel: "交通・旅行",
  education_exam: "教育・試験",
} as const;

export type SiteCategory = keyof typeof SITE_CATEGORIES;

export type SiteConfig = {
  /** URL slug & stable identifier (SEO-critical) */
  id: string;

  /** 表示名（日本語・公式表記） */
  name: string;

  /** 実際に接続チェックするURL */
  url: string;

  /** カテゴリ（一覧/SEO導線の核） */
  category: SiteCategory;

  /** 公式ステータスページ（あれば） */
  officialStatusUrl?: string;

  /** 公式サポート・ヘルプページ */
  supportUrl?: string;

  /** 公式X（旧Twitter）アカウント */
  xUrl?: string;

  /** サービス固有の注意点・よくある障害パターン（SEO差別化の核） */
  serviceNote: string;

  /** 日本語検索で使われやすい別名・旧名 */
  aliases?: string[];
};

export const STATUS_SITES: SiteConfig[] = [
  {
    id: "google",
    name: "Google",
    url: "https://www.google.com",
    category: "search_portal",
    officialStatusUrl: "https://www.google.com/appsstatus/dashboard/",
    supportUrl: "https://support.google.com/",
    xUrl: "https://x.com/google",
    serviceNote:
      "検索・Gmail・Google Workspace など複数サービスが同時に影響を受けることがあります。ログイン周りや一部地域のみの障害として発生するケースも多いです。",
    aliases: ["グーグル"],
  },
  {
    id: "yahoo-japan",
    name: "Yahoo! JAPAN",
    url: "https://www.yahoo.co.jp",
    category: "search_portal",
    officialStatusUrl:
      "https://www.yahoo-help.jp/app/answers/detail/p/537/a_id/40959",
    supportUrl: "https://support.yahoo-net.jp/",
    serviceNote:
      "トップページは表示されても、メールやオークションなど一部機能のみ利用できない障害が発生することがあります。",
    aliases: ["ヤフー"],
  },

  {
    id: "rakuten",
    name: "楽天市場",
    url: "https://www.rakuten.co.jp",
    category: "ecommerce_marketplace",
    officialStatusUrl: "https://status.rakuten.co.jp/",
    supportUrl: "https://ichiba.faq.rakuten.net/",
    serviceNote:
      "決済や注文履歴の表示に問題が出るケースが多く、アプリのみ影響する障害も報告されています。",
  },
  {
    id: "amazon-jp",
    name: "Amazon.co.jp",
    url: "https://www.amazon.co.jp",
    category: "ecommerce_marketplace",
    officialStatusUrl: "https://health.aws.amazon.com/health/status",
    supportUrl: "https://www.amazon.co.jp/hz/contact-us",
    serviceNote:
      "サイト自体は表示されても、購入・決済・注文履歴が正常に動作しない場合は一時的な障害の可能性があります。",
    aliases: ["アマゾン"],
  },

  {
    id: "youtube",
    name: "YouTube",
    url: "https://www.youtube.com",
    category: "streaming_media",
    officialStatusUrl: "https://www.google.com/appsstatus/dashboard/",
    supportUrl: "https://support.google.com/youtube/",
    serviceNote:
      "動画の読み込み不良やライブ配信のみ視聴できないなど、機能限定の障害が発生することがあります。",
  },

  {
    id: "twitter",
    name: "X（旧Twitter）",
    url: "https://twitter.com",
    category: "social_messaging",
    officialStatusUrl: "https://api.twitterstat.us/",
    supportUrl: "https://help.x.com/",
    xUrl: "https://x.com/x",
    serviceNote:
      "タイムラインは表示されても投稿や通知が遅延するなど、部分的な障害として現れるケースが多いです。",
    aliases: ["ツイッター", "Twitter"],
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com",
    category: "social_messaging",
    officialStatusUrl: "https://metastatus.com/instagram",
    supportUrl: "https://help.instagram.com/",
    serviceNote:
      "投稿・ストーリーズ・DM のいずれかのみが利用できない障害が発生することがあります。",
  },
  {
    id: "line",
    name: "LINE",
    url: "https://line.me",
    category: "social_messaging",
    officialStatusUrl: "https://line-status.github.io/",
    supportUrl: "https://help.line.me/",
    serviceNote:
      "メッセージ送信は可能でも通話やスタンプ購入が利用できないなど、機能限定の障害が起きやすいです。",
  },

  {
    id: "mercari",
    name: "メルカリ",
    url: "https://www.mercari.com/jp/",
    category: "ecommerce_marketplace",
    officialStatusUrl: "https://help.jp.mercari.com/guide/articles/865/",
    supportUrl: "https://help.jp.mercari.com/",
    serviceNote:
      "検索や出品は可能でも、購入手続きや支払い処理が正常に完了しない障害が発生することがあります。",
  },

  {
    id: "paypay",
    name: "PayPay",
    url: "https://paypay.ne.jp",
    category: "payments_finance",
    officialStatusUrl: "https://www.paypay.ne.jp/notice/",
    supportUrl: "https://paypay.ne.jp/help/",
    serviceNote:
      "決済エラーや残高反映の遅延など、支払い関連に限定した障害が発生するケースが多いです。",
  },

  {
    id: "discord",
    name: "Discord",
    url: "https://discord.com",
    category: "social_messaging",
    officialStatusUrl: "https://discordstatus.com/",
    supportUrl: "https://support.discord.com/",
    xUrl: "https://x.com/discord",
    serviceNote:
      "ログイン不可、メッセージ送信失敗、音声通話に接続できないなど、機能別に障害が発生することがあります。",
  },

  {
    id: "nintendo",
    name: "Nintendo",
    url: "https://www.nintendo.co.jp",
    category: "gaming",
    officialStatusUrl: "https://www.nintendo.co.jp/netinfo/ja_JP/",
    supportUrl: "https://support.nintendo.co.jp/",
    serviceNote:
      "オンライン対戦やフレンド機能のみ利用できないなど、タイトルや機能単位の障害として発生することがあります。",
    aliases: ["任天堂"],
  },
  {
    id: "playstation-network",
    name: "PlayStation Network",
    url: "https://www.playstation.com/ja-jp/",
    category: "gaming",
    officialStatusUrl: "https://status.playstation.com/ja-jp/",
    supportUrl: "https://www.playstation.com/ja-jp/support/",
    serviceNote:
      "サインイン不可、オンラインプレイ不可、ストア利用不可など、サービス別に影響が出ることがあります。",
    aliases: ["PSN", "プレイステーション"],
  },

  {
    id: "apple",
    name: "Apple（iCloud / App Store）",
    url: "https://www.apple.com/jp/",
    category: "productivity_saas",
    officialStatusUrl: "https://www.apple.com/jp/support/systemstatus/",
    supportUrl: "https://support.apple.com/ja-jp",
    serviceNote:
      "iCloud 同期、App Store ダウンロード、サインイン周りなど、特定サービスのみ影響を受ける障害が発生することがあります。",
    aliases: ["アップル", "iCloud", "App Store"],
  },
  {
    id: "icloud",
    name: "iCloud",
    url: "https://www.icloud.com",
    category: "productivity_saas",
    officialStatusUrl: "https://www.apple.com/jp/support/systemstatus/",
    supportUrl: "https://support.apple.com/ja-jp/icloud",
    serviceNote:
      "写真や連絡先の同期、バックアップが反映されないなど、同期系の障害として現れることがあります。",
    aliases: ["アイクラウド"],
  },
  {
    id: "app-store",
    name: "App Store",
    url: "https://apps.apple.com/jp/",
    category: "productivity_saas",
    officialStatusUrl: "https://www.apple.com/jp/support/systemstatus/",
    supportUrl: "https://support.apple.com/ja-jp/apps",
    serviceNote:
      "アプリの検索やダウンロードが進まない、更新が失敗するなどの障害が発生することがあります。",
  },

  {
    id: "mynaportal",
    name: "マイナポータル",
    url: "https://myna.go.jp",
    category: "government_public",
    officialStatusUrl: "https://www.digital.go.jp/policies/mynaportal",
    supportUrl: "https://myna.go.jp/help",
    serviceNote:
      "ログイン不可や申請手続きが途中で止まるなど、利用集中時に障害が発生することがあります。",
  },

  {
    id: "netflix",
    name: "Netflix",
    url: "https://www.netflix.com/jp/",
    category: "streaming_media",
    officialStatusUrl: "https://help.netflix.com/ja/node/13243",
    supportUrl: "https://help.netflix.com/ja/",
    serviceNote:
      "動画が再生できない、プロフィール切替ができないなど、視聴関連に限定した障害が起きることがあります。",
  },
  {
    id: "spotify",
    name: "Spotify",
    url: "https://www.spotify.com/jp/",
    category: "streaming_media",
    officialStatusUrl: "https://support.spotify.com/jp/article/service-status/",
    supportUrl: "https://support.spotify.com/jp/",
    xUrl: "https://x.com/SpotifyStatus",
    serviceNote:
      "楽曲が再生できない、検索結果が表示されないなど、アプリ単位での障害が発生することがあります。",
  },

  {
    id: "zoom",
    name: "Zoom",
    url: "https://zoom.us",
    category: "productivity_saas",
    officialStatusUrl: "https://status.zoom.us/",
    supportUrl: "https://support.zoom.com/",
    serviceNote:
      "会議への接続不可、音声が途切れるなど、地域や時間帯限定の障害が発生することがあります。",
  },

  {
    id: "microsoft-365",
    name: "Microsoft 365",
    url: "https://www.microsoft.com/ja-jp/microsoft-365",
    category: "productivity_saas",
    officialStatusUrl: "https://portal.office.com/servicestatus",
    supportUrl: "https://support.microsoft.com/ja-jp",
    serviceNote:
      "Outlook、Teams、OneDrive など複数サービスが同時に影響を受ける障害が発生することがあります。",
    aliases: ["Office365", "Microsoft"],
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    url: "https://www.microsoft.com/ja-jp/microsoft-teams",
    category: "productivity_saas",
    officialStatusUrl: "https://portal.office.com/servicestatus",
    supportUrl: "https://support.microsoft.com/ja-jp/teams",
    serviceNote:
      "チャット送信遅延や会議への接続失敗など、リアルタイム機能に影響が出ることがあります。",
  },
  {
    id: "onedrive",
    name: "OneDrive",
    url: "https://onedrive.live.com/",
    category: "productivity_saas",
    officialStatusUrl: "https://portal.office.com/servicestatus",
    supportUrl: "https://support.microsoft.com/ja-jp/onedrive",
    serviceNote:
      "ファイル同期が止まる、アップロードが完了しないなどの障害が発生することがあります。",
  },

  {
    id: "cloudflare",
    name: "Cloudflare",
    url: "https://www.cloudflare.com",
    category: "cloud_devops",
    officialStatusUrl: "https://www.cloudflarestatus.com/",
    supportUrl: "https://support.cloudflare.com/",
    serviceNote:
      "DNS・CDN・WAF など基盤系のため、影響は多数サイトに連鎖的に出ることがあります。",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com",
    category: "cloud_devops",
    officialStatusUrl: "https://www.githubstatus.com/",
    supportUrl: "https://support.github.com/",
    serviceNote:
      "リポジトリ閲覧は可能でも、push・Actions・ログインのみ失敗する障害が発生することがあります。",
  },
  {
    id: "aws",
    name: "AWS",
    url: "https://aws.amazon.com",
    category: "cloud_devops",
    officialStatusUrl: "https://health.aws.amazon.com/health/status",
    supportUrl: "https://aws.amazon.com/support/",
    serviceNote:
      "リージョン単位での障害が多く、特定サービスのみ影響するケースが一般的です。",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    url: "https://cloud.google.com",
    category: "cloud_devops",
    officialStatusUrl: "https://status.cloud.google.com/",
    supportUrl: "https://cloud.google.com/support",
    serviceNote:
      "API・Compute・Storage など個別サービス単位で障害が発生することがあります。",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    url: "https://azure.microsoft.com",
    category: "cloud_devops",
    officialStatusUrl: "https://status.azure.com/",
    supportUrl: "https://azure.microsoft.com/support/",
    serviceNote:
      "サブスクリプションやリージョン依存の障害として現れることがあります。",
  },
  {
    id: "openai",
    name: "OpenAI",
    url: "https://www.openai.com",
    category: "cloud_devops",
    officialStatusUrl: "https://status.openai.com/",
    supportUrl: "https://help.openai.com/",
    serviceNote:
      "API は利用可能でも、Chat 機能のみ遅延・制限されるケースがあります。",
  },
  {
    id: "vercel",
    name: "Vercel",
    url: "https://vercel.com",
    category: "cloud_devops",
    officialStatusUrl: "https://www.vercel-status.com/",
    supportUrl: "https://vercel.com/support",
    serviceNote:
      "ビルドやデプロイのみ失敗し、既存サイト表示は継続する障害が発生することがあります。",
  },
  {
    id: "netlify",
    name: "Netlify",
    url: "https://www.netlify.com",
    category: "cloud_devops",
    officialStatusUrl: "https://www.netlifystatus.com/",
    supportUrl: "https://www.netlify.com/support/",
    serviceNote:
      "管理画面は正常でも、デプロイやフォーム機能のみ影響を受ける場合があります。",
  },

  {
    id: "notion",
    name: "Notion",
    url: "https://www.notion.so",
    category: "productivity_saas",
    officialStatusUrl: "https://status.notion.so/",
    supportUrl: "https://www.notion.so/help",
    serviceNote:
      "閲覧は可能でも、編集や同期が遅延するケースが報告されています。",
  },
  {
    id: "slack",
    name: "Slack",
    url: "https://slack.com",
    category: "productivity_saas",
    officialStatusUrl: "https://status.slack.com/",
    supportUrl: "https://slack.com/help",
    serviceNote:
      "メッセージ送信や通知のみ遅延し、UI は表示されることがあります。",
  },

  {
    id: "stripe",
    name: "Stripe",
    url: "https://stripe.com",
    category: "payments_finance",
    officialStatusUrl: "https://status.stripe.com/",
    supportUrl: "https://support.stripe.com/",
    serviceNote:
      "決済は成功しても、ダッシュボード反映が遅れる障害が発生することがあります。",
  },
  {
    id: "paypal",
    name: "PayPal",
    url: "https://www.paypal.com",
    category: "payments_finance",
    officialStatusUrl: "https://www.paypal-status.com/",
    supportUrl: "https://www.paypal.com/support",
    serviceNote:
      "送金・支払い処理のみ影響を受け、ログインは可能なケースがあります。",
  },

  {
    id: "twitch",
    name: "Twitch",
    url: "https://www.twitch.tv",
    category: "streaming_media",
    officialStatusUrl: "https://status.twitch.tv/",
    supportUrl: "https://help.twitch.tv/",
    serviceNote:
      "視聴は可能でも配信開始やチャット機能のみ影響することがあります。",
  },

  {
    id: "steam",
    name: "Steam",
    url: "https://store.steampowered.com",
    category: "gaming",
    officialStatusUrl: "https://steamstat.us/",
    supportUrl: "https://help.steampowered.com/",
    serviceNote:
      "ストアは表示されてもログインやゲーム接続のみ失敗する障害が発生します。",
  },
  {
    id: "epic-games",
    name: "Epic Games",
    url: "https://www.epicgames.com",
    category: "gaming",
    officialStatusUrl: "https://status.epicgames.com/",
    supportUrl: "https://www.epicgames.com/help/",
    serviceNote:
      "ログインやストア購入のみ影響を受け、ゲーム起動は可能な場合があります。",
  },
  {
    id: "xbox-live",
    name: "Xbox Live",
    url: "https://www.xbox.com",
    category: "gaming",
    officialStatusUrl: "https://support.xbox.com/xbox-live-status",
    supportUrl: "https://support.xbox.com/",
    serviceNote:
      "オンライン対戦やフレンド機能のみ利用できない障害が発生することがあります。",
  },
  {
    id: "battle-net",
    name: "Battle.net",
    url: "https://www.blizzard.com",
    category: "gaming",
    officialStatusUrl: "https://twitter.com/BlizzardCS",
    supportUrl: "https://support.blizzard.com/",
    serviceNote:
      "ログインやマッチングのみ影響を受けるケースがあります。",
  },
  {
    id: "genshin-impact",
    name: "原神",
    url: "https://genshin.hoyoverse.com/ja",
    category: "gaming",
    officialStatusUrl: "https://www.hoyolab.com/",
    supportUrl: "https://www.hoyoverse.com/ja-jp/support",
    serviceNote: "サーバーメンテナンスやログイン不可が定期的に発生します。",
  },
  {
    id: "pokemon-home",
    name: "Pokémon HOME",
    url: "https://home.pokemon.com/ja-jp/",
    category: "gaming",
    officialStatusUrl: "https://www.pokemon.co.jp/info/",
    supportUrl: "https://www.pokemon-support.com/",
    serviceNote:
      "連携やログイン処理のみ失敗する障害が発生することがあります。",
  },

  {
    id: "dropbox",
    name: "Dropbox",
    url: "https://www.dropbox.com",
    category: "productivity_saas",
    officialStatusUrl: "https://status.dropbox.com/",
    supportUrl: "https://help.dropbox.com/",
    serviceNote:
      "同期のみ遅延し、Web 版操作は可能なケースがあります。",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    url: "https://www.salesforce.com",
    category: "productivity_saas",
    officialStatusUrl: "https://status.salesforce.com/",
    supportUrl: "https://help.salesforce.com/",
    serviceNote:
      "特定インスタンス単位での障害が多く、全体停止は稀です。",
  },
  {
    id: "jira",
    name: "Jira",
    url: "https://www.atlassian.com/software/jira",
    category: "productivity_saas",
    officialStatusUrl: "https://status.atlassian.com/",
    supportUrl: "https://support.atlassian.com/",
    serviceNote:
      "閲覧は可能でも更新・通知処理のみ影響するケースがあります。",
  },
  {
    id: "confluence",
    name: "Confluence",
    url: "https://www.atlassian.com/software/confluence",
    category: "productivity_saas",
    officialStatusUrl: "https://status.atlassian.com/",
    supportUrl: "https://support.atlassian.com/",
    serviceNote:
      "検索や編集のみが失敗し、表示は継続する障害が報告されています。",
  },

  {
    id: "docomo",
    name: "NTTドコモ",
    url: "https://www.docomo.ne.jp",
    category: "telecom_isp",
    officialStatusUrl: "https://www.docomo.ne.jp/info/notice/",
    supportUrl: "https://www.docomo.ne.jp/support/",
    serviceNote:
      "通信障害や音声通話・データ通信のみ影響を受けるケースがあります。",
  },
  {
    id: "au",
    name: "au（KDDI）",
    url: "https://www.au.com",
    category: "telecom_isp",
    officialStatusUrl: "https://www.au.com/information/",
    supportUrl: "https://www.au.com/support/",
    serviceNote:
      "大規模障害時は通話・SMS・データ通信が同時に利用できなくなることがあります。",
  },
  {
    id: "softbank",
    name: "ソフトバンク",
    url: "https://www.softbank.jp",
    category: "telecom_isp",
    officialStatusUrl: "https://www.softbank.jp/mobile/info/personal/important/",
    supportUrl: "https://www.softbank.jp/support/",
    serviceNote:
      "モバイル通信や一部エリア限定で障害が発生することがあります。",
  },
  {
    id: "rakuten-mobile",
    name: "楽天モバイル",
    url: "https://network.mobile.rakuten.co.jp",
    category: "telecom_isp",
    officialStatusUrl: "https://network.mobile.rakuten.co.jp/information/",
    supportUrl: "https://network.mobile.rakuten.co.jp/support/",
    serviceNote:
      "通信品質低下や圏外になるなど、地域差のある障害が報告されます。",
  },
  {
    id: "nuro",
    name: "NURO光",
    url: "https://www.nuro.jp",
    category: "telecom_isp",
    officialStatusUrl: "https://www.nuro.jp/notice/",
    supportUrl: "https://www.nuro.jp/support/",
    serviceNote:
      "特定エリアで通信断や速度低下が発生するケースがあります。",
  },

  {
    id: "mufg",
    name: "三菱UFJ銀行",
    url: "https://www.bk.mufg.jp",
    category: "payments_finance",
    officialStatusUrl: "https://www.bk.mufg.jp/news/index.html",
    supportUrl: "https://www.bk.mufg.jp/support/",
    serviceNote:
      "インターネットバンキングや振込処理のみ利用できない障害が発生することがあります。",
  },
  {
    id: "smbc",
    name: "三井住友銀行",
    url: "https://www.smbc.co.jp",
    category: "payments_finance",
    officialStatusUrl: "https://www.smbc.co.jp/notice/",
    supportUrl: "https://www.smbc.co.jp/support/",
    serviceNote:
      "SMBCダイレクトへのログイン不可や残高反映遅延が起きることがあります。",
  },
  {
    id: "mizuho",
    name: "みずほ銀行",
    url: "https://www.mizuhobank.co.jp",
    category: "payments_finance",
    officialStatusUrl: "https://www.mizuhobank.co.jp/notification/",
    supportUrl: "https://www.mizuhobank.co.jp/support/",
    serviceNote:
      "過去に大規模障害があり、振込・ATM連携に影響が出ることがあります。",
  },
  {
    id: "japan-post-bank",
    name: "ゆうちょ銀行",
    url: "https://www.jp-bank.japanpost.jp",
    category: "payments_finance",
    officialStatusUrl: "https://www.jp-bank.japanpost.jp/oshirase/",
    supportUrl: "https://www.jp-bank.japanpost.jp/support/",
    serviceNote:
      "オンラインサービスや送金処理が停止するケースがあります。",
  },

  {
    id: "line-pay",
    name: "LINE Pay",
    url: "https://linepay.line.me",
    category: "payments_finance",
    officialStatusUrl: "https://linepay.line.me/notice",
    supportUrl: "https://help.line.me/linepay/",
    serviceNote:
      "決済エラーや残高反映遅延など、支払い関連の障害が発生することがあります。",
  },

  {
    id: "visa",
    name: "Visa",
    url: "https://www.visa.co.jp",
    category: "payments_finance",
    officialStatusUrl:
      "https://www.visa.co.jp/run-your-business/small-business-tools/operational-resilience.html",
    supportUrl: "https://www.visa.co.jp/contact-us.html",
    serviceNote:
      "加盟店決済は可能でも、認証や一部カード取引のみ失敗することがあります。",
  },
  {
    id: "mastercard",
    name: "Mastercard",
    url: "https://www.mastercard.co.jp",
    category: "payments_finance",
    officialStatusUrl:
      "https://www.mastercard.us/en-us/business/overview/what-we-do/operational-resilience.html",
    supportUrl: "https://www.mastercard.co.jp/ja-jp/consumers/get-support.html",
    serviceNote:
      "決済ネットワークの一部処理が遅延し、特定加盟店のみ影響を受けるケースがあります。",
  },
  {
    id: "jcb",
    name: "JCB",
    url: "https://www.jcb.co.jp",
    category: "payments_finance",
    officialStatusUrl: "https://www.jcb.co.jp/information/",
    supportUrl: "https://www.jcb.co.jp/support/",
    serviceNote:
      "オンライン決済や本人認証（3Dセキュア）のみ失敗することがあります。",
  },
  {
    id: "amex",
    name: "American Express",
    url: "https://www.americanexpress.com/jp",
    category: "payments_finance",
    officialStatusUrl:
      "https://www.americanexpress.com/jp/content/service-updates.html",
    supportUrl: "https://www.americanexpress.com/jp/customer-service/",
    serviceNote:
      "カード決済は可能でも、明細反映やアプリ表示が遅延するケースがあります。",
  },
  {
    id: "rakuten-card",
    name: "楽天カード",
    url: "https://www.rakuten-card.co.jp",
    category: "payments_finance",
    officialStatusUrl: "https://www.rakuten-card.co.jp/info/",
    supportUrl: "https://www.rakuten-card.co.jp/customer-support/",
    serviceNote:
      "ログイン不可や利用明細の反映遅延が発生することがあります。",
  },

  {
    id: "e-tax",
    name: "e-Tax",
    url: "https://www.e-tax.nta.go.jp",
    category: "government_public",
    officialStatusUrl: "https://www.e-tax.nta.go.jp/topics/index.htm",
    supportUrl: "https://www.e-tax.nta.go.jp/toiawase/",
    serviceNote: "申告期限前にアクセス集中で利用できなくなることがあります。",
  },
  {
    id: "nenkin-net",
    name: "ねんきんネット",
    url: "https://www.nenkin.go.jp/n_net/",
    category: "government_public",
    officialStatusUrl: "https://www.nenkin.go.jp/oshirase/",
    supportUrl: "https://www.nenkin.go.jp/inquiry/",
    serviceNote: "ログインや情報表示が不安定になることがあります。",
  },
  {
    id: "hello-work",
    name: "ハローワークインターネットサービス",
    url: "https://www.hellowork.mhlw.go.jp",
    category: "government_public",
    officialStatusUrl: "https://www.mhlw.go.jp/stf/shingi/index.html",
    supportUrl: "https://www.hellowork.mhlw.go.jp/member/",
    serviceNote:
      "求人検索や応募機能のみ利用できない障害が発生することがあります。",
  },
  {
    id: "my-number",
    name: "マイナンバーカード",
    url: "https://www.kojinbango-card.go.jp",
    category: "government_public",
    officialStatusUrl: "https://www.digital.go.jp/news",
    supportUrl: "https://www.kojinbango-card.go.jp/contact/",
    serviceNote: "認証や連携サービスで障害が発生するケースがあります。",
  },
  {
    id: "covid-vaccine",
    name: "新型コロナワクチン接種システム",
    url: "https://www.cov19-vaccine.mhlw.go.jp",
    category: "government_public",
    officialStatusUrl: "https://www.mhlw.go.jp/stf/index.html",
    supportUrl: "https://www.mhlw.go.jp/contact/",
    serviceNote: "予約システムが利用集中で停止することがあります。",
  },
  {
    id: "nta",
    name: "国税庁",
    url: "https://www.nta.go.jp",
    category: "government_public",
    officialStatusUrl: "https://www.nta.go.jp/information/",
    supportUrl: "https://www.nta.go.jp/contact/",
    serviceNote: "各種手続きページのみ不安定になるケースがあります。",
  },
  {
    id: "city-office",
    name: "自治体オンライン手続き",
    url: "https://www.digital.go.jp",
    category: "government_public",
    officialStatusUrl: "https://www.digital.go.jp/news",
    supportUrl: "https://www.digital.go.jp/contact",
    serviceNote:
      "住民票・各種申請サービスが利用集中で停止することがあります。",
  },

  {
    id: "jr-east",
    name: "JR東日本",
    url: "https://www.jreast.co.jp/",
    category: "transport_travel",
    officialStatusUrl: "https://www.jreast.co.jp/press/",
    supportUrl: "https://www.jreast.co.jp/info/",
    serviceNote:
      "公式サイトは表示されても、運行情報ページのみアクセスしづらくなることがあります。",
  },
  {
    id: "jr-west",
    name: "JR西日本",
    url: "https://www.westjr.co.jp",
    category: "transport_travel",
    officialStatusUrl: "https://www.westjr.co.jp/press/",
    supportUrl: "https://www.westjr.co.jp/guide/",
    serviceNote:
      "列車運行情報や予約関連ページがアクセス集中で不安定になることがあります。",
  },
  {
    id: "jr-central",
    name: "JR東海",
    url: "https://jr-central.co.jp",
    category: "transport_travel",
    officialStatusUrl: "https://jr-central.co.jp/news/",
    supportUrl: "https://jr-central.co.jp/support/",
    serviceNote:
      "新幹線の運行情報やエクスプレス予約のみ影響を受けるケースがあります。",
  },
  {
    id: "ekinet",
    name: "えきねっと",
    url: "https://www.eki-net.com",
    category: "transport_travel",
    officialStatusUrl: "https://www.jreast.co.jp/press/",
    supportUrl: "https://www.eki-net.com/support/",
    serviceNote:
      "指定席予約やログイン処理が集中時に失敗することがあります。",
  },
  {
    id: "ana",
    name: "ANA（全日本空輸）",
    url: "https://www.ana.co.jp",
    category: "transport_travel",
    officialStatusUrl: "https://www.ana.co.jp/notice/",
    supportUrl: "https://www.ana.co.jp/ja/jp/support/",
    serviceNote:
      "予約・チェックイン・マイル関連機能のみ利用できない障害が発生することがあります。",
  },
  {
    id: "jal",
    name: "JAL（日本航空）",
    url: "https://www.jal.co.jp",
    category: "transport_travel",
    officialStatusUrl: "https://www.jal.co.jp/jp/ja/info/",
    supportUrl: "https://www.jal.co.jp/jp/ja/support/",
    serviceNote:
      "予約変更やオンラインチェックインが利用できないケースがあります。",
  },

  {
    id: "suica",
    name: "Suica",
    url: "https://www.jreast.co.jp/suica/",
    category: "transport_travel",
    officialStatusUrl: "https://www.jreast.co.jp/press/",
    supportUrl: "https://www.jreast.co.jp/suica/support/",
    serviceNote:
      "モバイルSuicaのチャージや決済が利用できないなど、利用集中時に障害が発生することがあります。",
  },

  {
    id: "shopify",
    name: "Shopify",
    url: "https://www.shopify.com/jp",
    category: "ecommerce_marketplace",
    officialStatusUrl: "https://www.shopifystatus.com/",
    supportUrl: "https://help.shopify.com/ja",
    serviceNote:
      "管理画面は表示されても、決済やチェックアウトのみ影響を受けることがあります。",
  },
  {
    id: "base",
    name: "BASE",
    url: "https://thebase.in",
    category: "ecommerce_marketplace",
    officialStatusUrl: "https://thebase.in/news",
    supportUrl: "https://help.thebase.in",
    serviceNote:
      "商品購入や決済処理が一時的に利用できなくなることがあります。",
  },
  {
    id: "stores",
    name: "STORES",
    url: "https://stores.jp",
    category: "ecommerce_marketplace",
    officialStatusUrl: "https://stores.jp/news",
    supportUrl: "https://support.stores.jp",
    serviceNote:
      "ショップ管理画面や注文処理が不安定になるケースがあります。",
  },
  {
    id: "makeshop",
    name: "MakeShop",
    url: "https://www.makeshop.jp",
    category: "ecommerce_marketplace",
    officialStatusUrl: "https://www.makeshop.jp/main/news/",
    supportUrl: "https://www.makeshop.jp/main/support/",
    serviceNote:
      "管理画面へのログインや注文処理に影響が出ることがあります。",
  },
  {
    id: "ec-cube",
    name: "EC-CUBE",
    url: "https://www.ec-cube.net",
    category: "ecommerce_marketplace",
    officialStatusUrl: "https://www.ec-cube.net/news/",
    supportUrl: "https://www.ec-cube.net/support/",
    serviceNote:
      "管理画面やプラグイン連携に起因する障害が報告されることがあります。",
  },

  {
    id: "prime-video",
    name: "Amazon Prime Video",
    url: "https://www.amazon.co.jp/Prime-Video",
    category: "streaming_media",
    officialStatusUrl: "https://health.aws.amazon.com/health/status",
    supportUrl: "https://www.amazon.co.jp/gp/help/customer/display.html",
    serviceNote:
      "視聴は可能でも、検索や再生開始が遅延するケースがあります。",
  },
  {
    id: "abema",
    name: "ABEMA",
    url: "https://abema.tv",
    category: "streaming_media",
    officialStatusUrl: "https://help.abema.tv/hc/ja/articles/360044138231",
    supportUrl: "https://help.abema.tv/",
    serviceNote:
      "生放送視聴やコメント機能のみ影響を受けることがあります。",
  },
  {
    id: "hulu-jp",
    name: "Hulu（日本）",
    url: "https://www.hulu.jp",
    category: "streaming_media",
    officialStatusUrl: "https://help.hulu.jp/hc/ja/articles/360049898093",
    supportUrl: "https://help.hulu.jp/",
    serviceNote:
      "ログインや再生のみ失敗し、アプリ別に影響が出るケースがあります。",
  },
  {
    id: "u-next",
    name: "U-NEXT",
    url: "https://video.unext.jp",
    category: "streaming_media",
    officialStatusUrl: "https://help.unext.jp/",
    supportUrl: "https://help.unext.jp/",
    serviceNote:
      "再生開始や購入処理が一時的に利用できなくなることがあります。",
  },

  {
    id: "kyotsu-test",
    name: "大学入学共通テスト",
    url: "https://www.dnc.ac.jp",
    category: "education_exam",
    officialStatusUrl: "https://www.dnc.ac.jp/news/",
    supportUrl: "https://www.dnc.ac.jp/contact/",
    serviceNote:
      "成績照会や関連ページが試験期間中に不安定になることがあります。",
  },
  {
    id: "toeic",
    name: "TOEIC",
    url: "https://www.iibc-global.org",
    category: "education_exam",
    officialStatusUrl: "https://www.iibc-global.org/iibc/information/",
    supportUrl: "https://www.iibc-global.org/iibc/contact/",
    serviceNote:
      "申込やログイン処理が締切前に集中して失敗することがあります。",
  },
  {
    id: "eiken",
    name: "英検",
    url: "https://www.eiken.or.jp",
    category: "education_exam",
    officialStatusUrl: "https://www.eiken.or.jp/eiken/info/",
    supportUrl: "https://www.eiken.or.jp/eiken/contact/",
    serviceNote:
      "申込ページや合否確認のみ影響を受けるケースがあります。",
  },
  {
    id: "studysapuri",
    name: "スタディサプリ",
    url: "https://studysapuri.jp",
    category: "education_exam",
    officialStatusUrl: "https://studysapuri.jp/info/",
    supportUrl: "https://studysapuri.jp/support/",
    serviceNote: "動画視聴やログインが不安定になることがあります。",
  },
  {
    id: "manaba",
    name: "manaba",
    url: "https://manaba.jp",
    category: "education_exam",
    officialStatusUrl: "https://manaba.jp/faq/",
    supportUrl: "https://manaba.jp/faq/",
    serviceNote:
      "大学授業開始時間帯にアクセス集中で利用しづらくなることがあります。",
  },
    {
    id: "bing",
    name: "Bing",
    url: "https://www.bing.com",
    category: "search_portal",
    supportUrl: "https://support.microsoft.com/",
    serviceNote:
      "検索結果は表示されても、画像検索や一部機能のみ読み込みが遅いなどの部分障害として発生することがあります。",
    aliases: ["ビング"],
  },
  {
    id: "duckduckgo",
    name: "DuckDuckGo",
    url: "https://duckduckgo.com",
    category: "search_portal",
    supportUrl: "https://duckduckgo.com/duckduckgo-help-pages/",
    serviceNote:
      "ページ自体は開けても検索結果が返らない、特定地域のみ遅いなどの症状が出ることがあります。",
    aliases: ["ダックダックゴー"],
  },

  {
    id: "tiktok",
    name: "TikTok",
    url: "https://www.tiktok.com",
    category: "social_messaging",
    supportUrl: "https://support.tiktok.com/",
    serviceNote:
      "フィードは表示されても投稿・コメント・ログインのみ失敗するなど、機能限定の障害が発生することがあります。",
    aliases: ["ティックトック"],
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com",
    category: "social_messaging",
    officialStatusUrl: "https://metastatus.com/",
    supportUrl: "https://www.facebook.com/help/",
    serviceNote:
      "ログインや投稿のみ不安定になるなど、機能ごとの部分障害として現れることがあります。",
    aliases: ["フェイスブック"],
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    url: "https://www.whatsapp.com",
    category: "social_messaging",
    officialStatusUrl: "https://metastatus.com/",
    supportUrl: "https://faq.whatsapp.com/",
    serviceNote:
      "送受信はできてもメディア送信や通話のみ不安定になるなど、機能限定の障害が発生することがあります。",
    aliases: ["ワッツアップ"],
  },

  {
    id: "yahoo-auctions",
    name: "Yahoo!オークション（ヤフオク!）",
    url: "https://auctions.yahoo.co.jp",
    category: "ecommerce_marketplace",
    officialStatusUrl: "https://auctions.yahoo.co.jp/topic/notice/troubleRepo/",
    supportUrl: "https://support.yahoo-net.jp/PccAuctions/s/",
    xUrl: "https://x.com/8209",
    serviceNote:
      "閲覧は可能でも購入手続き・取引ナビ・支払い周りのみ不安定になるケースがあります。",
    aliases: ["ヤフオク", "Yahoo Auctions"],
  },
  {
    id: "yahoo-shopping",
    name: "Yahoo!ショッピング",
    url: "https://shopping.yahoo.co.jp",
    category: "ecommerce_marketplace",
    supportUrl: "https://support.yahoo-net.jp/",
    serviceNote:
      "商品ページは表示されてもカート・注文確定・決済のみ失敗するなど、機能限定の障害が発生することがあります。",
    aliases: ["ヤフーショッピング"],
  },
  {
    id: "zozotown",
    name: "ZOZOTOWN",
    url: "https://zozo.jp",
    category: "ecommerce_marketplace",
    supportUrl: "https://zozo.jp/_help/",
    serviceNote:
      "閲覧は可能でもカート投入や注文確定のみ不安定になるなど、購入フローに限定した障害が発生することがあります。",
    aliases: ["ゾゾタウン"],
  },
  {
    id: "qoo10",
    name: "Qoo10",
    url: "https://www.qoo10.jp",
    category: "ecommerce_marketplace",
    supportUrl: "https://www.qoo10.jp/gmkt.inc/CS/NHelp.aspx",
    serviceNote:
      "商品閲覧はできても決済や注文履歴の表示のみ遅延・失敗することがあります。",
    aliases: ["キューテン"],
  },

  {
    id: "dbarai",
    name: "d払い",
    url: "https://service.smt.docomo.ne.jp/keitai_payment/",
    category: "payments_finance",
    officialStatusUrl: "https://service.smt.docomo.ne.jp/keitai_payment/info/trouble.html",
    supportUrl: "https://service.smt.docomo.ne.jp/keitai_payment/support/",
    serviceNote:
      "バーコード決済やネット決済のみ利用できない、利用可能額の反映が遅いなど、決済関連に限定した障害が発生することがあります。",
    aliases: ["ディーバライ"],
  },
  {
    id: "rakuten-pay",
    name: "楽天ペイ",
    url: "https://pay.rakuten.co.jp/",
    category: "payments_finance",
    supportUrl: "https://pay.rakuten.co.jp/help/",
    serviceNote:
      "決済エラーや残高反映の遅延など、支払い関連に限定した障害が発生することがあります。",
    aliases: ["楽天Pay"],
  },
  {
    id: "au-pay",
    name: "au PAY",
    url: "https://aupay.auone.jp/",
    category: "payments_finance",
    supportUrl: "https://www.au.com/support/service/aupay/",
    serviceNote:
      "支払い・チャージ・残高表示など、決済周辺のみ不安定になるケースがあります。",
    aliases: ["エーユーペイ"],
  },
  {
    id: "google-pay",
    name: "Google Pay",
    url: "https://pay.google.com",
    category: "payments_finance",
    supportUrl: "https://support.google.com/pay/",
    serviceNote:
      "支払いは可能でもカード追加や認証処理のみ失敗するなど、手続き系の障害として発生することがあります。",
    aliases: ["グーグルペイ"],
  },

  {
    id: "disney-plus",
    name: "Disney+（ディズニープラス）",
    url: "https://www.disneyplus.com/ja-jp",
    category: "streaming_media",
    supportUrl: "https://help.disneyplus.com/ja-JP/",
    serviceNote:
      "ログインはできても再生開始や画質切替のみ不安定になるなど、視聴機能に限定した障害が発生することがあります。",
    aliases: ["ディズニープラス", "Disney Plus"],
  },
  {
    id: "apple-music",
    name: "Apple Music",
    url: "https://music.apple.com/jp/browse",
    category: "streaming_media",
    officialStatusUrl: "https://www.apple.com/jp/support/systemstatus/",
    supportUrl: "https://support.apple.com/ja-jp/music",
    serviceNote:
      "再生やライブラリ同期のみ不安定になるなど、機能限定の障害が発生することがあります。",
    aliases: ["アップルミュージック"],
  },

  {
    id: "roblox",
    name: "Roblox",
    url: "https://www.roblox.com",
    category: "gaming",
    officialStatusUrl: "https://status.roblox.com/",
    supportUrl: "https://en.help.roblox.com/hc/en-us",
    serviceNote:
      "ログイン不可や一部ゲームサーバーのみ接続できないなど、サーバー単位の障害として発生することがあります。",
  },
  {
    id: "valorant",
    name: "VALORANT",
    url: "https://playvalorant.com/ja-jp/",
    category: "gaming",
    officialStatusUrl: "https://status.riotgames.com/",
    supportUrl: "https://support-valorant.riotgames.com/hc/ja",
    serviceNote:
      "マッチメイキングやログインのみ不安定になるなど、機能単位の障害が発生することがあります。",
    aliases: ["ヴァロラント"],
  },
  {
    id: "league-of-legends",
    name: "League of Legends",
    url: "https://www.leagueoflegends.com/ja-jp/",
    category: "gaming",
    officialStatusUrl: "https://status.riotgames.com/",
    supportUrl: "https://support-leagueoflegends.riotgames.com/hc/ja",
    serviceNote:
      "特定リージョンのみログイン不可・遅延が発生するケースがあります。",
    aliases: ["LoL", "リーグ・オブ・レジェンド"],
  },

  {
    id: "docker-hub",
    name: "Docker Hub",
    url: "https://hub.docker.com",
    category: "cloud_devops",
    officialStatusUrl: "https://www.dockerstatus.com/",
    supportUrl: "https://www.docker.com/support/",
    serviceNote:
      "イメージのpullのみ遅い、ログインやWeb表示のみ不安定など、機能限定の障害が発生することがあります。",
  },
  {
    id: "npm",
    name: "npm",
    url: "https://www.npmjs.com",
    category: "cloud_devops",
    officialStatusUrl: "https://status.npmjs.org/",
    supportUrl: "https://www.npmjs.com/support",
    serviceNote:
      "サイト閲覧は可能でもインストール（レジストリ）やログインのみ影響を受けることがあります。",
  },
    {
    id: "yahoo-mail",
    name: "Yahoo!メール",
    url: "https://mail.yahoo.co.jp",
    category: "productivity_saas",
    supportUrl: "https://support.yahoo-net.jp/PccMail/s/",
    serviceNote:
      "受信はできても送信や添付ファイルのみ失敗するなど、機能限定の障害が発生することがあります。",
    aliases: ["ヤフーメール"],
  },
  {
    id: "gmail",
    name: "Gmail",
    url: "https://mail.google.com",
    category: "productivity_saas",
    officialStatusUrl: "https://www.google.com/appsstatus/dashboard/",
    supportUrl: "https://support.google.com/mail/",
    serviceNote:
      "Web版は利用できてもアプリ同期や送信のみ遅延するなど、部分的な障害が発生することがあります。",
  },

  {
    id: "threads",
    name: "Threads",
    url: "https://www.threads.net",
    category: "social_messaging",
    officialStatusUrl: "https://metastatus.com/",
    supportUrl: "https://help.instagram.com/",
    serviceNote:
      "投稿は表示されても新規投稿やログインのみ失敗するなど、機能限定の障害が発生することがあります。",
  },
  {
    id: "telegram",
    name: "Telegram",
    url: "https://telegram.org",
    category: "social_messaging",
    supportUrl: "https://telegram.org/support",
    serviceNote:
      "メッセージ送信は可能でも通知やメディア配信のみ遅延するケースがあります。",
  },

  {
    id: "nico-nico",
    name: "ニコニコ動画",
    url: "https://www.nicovideo.jp",
    category: "streaming_media",
    officialStatusUrl: "https://blog.nicovideo.jp/niconews/",
    supportUrl: "https://qa.nicovideo.jp/",
    serviceNote:
      "動画再生やコメント機能のみ不安定になるなど、利用集中時に障害が発生することがあります。",
    aliases: ["ニコ動"],
  },
  {
    id: "tv-tver",
    name: "TVer",
    url: "https://tver.jp",
    category: "streaming_media",
    supportUrl: "https://help.tver.jp/",
    serviceNote:
      "再生開始や広告読み込みのみ失敗するなど、視聴フローに限定した障害が発生することがあります。",
  },

  {
    id: "rakuten-travel",
    name: "楽天トラベル",
    url: "https://travel.rakuten.co.jp",
    category: "transport_travel",
    supportUrl: "https://travel.rakuten.co.jp/help/",
    serviceNote:
      "検索は可能でも予約確定やログインのみ不安定になるケースがあります。",
  },
  {
    id: "jalan",
    name: "じゃらん",
    url: "https://www.jalan.net",
    category: "transport_travel",
    supportUrl: "https://www.jalan.net/help/",
    serviceNote:
      "宿泊検索は可能でも予約手続きや決済のみ影響を受けることがあります。",
  },
  {
    id: "booking-com",
    name: "Booking.com",
    url: "https://www.booking.com",
    category: "transport_travel",
    supportUrl: "https://www.booking.com/help",
    serviceNote:
      "検索結果は表示されても予約確定やログインのみ失敗することがあります。",
  },

  {
    id: "yodobashi",
    name: "ヨドバシ.com",
    url: "https://www.yodobashi.com",
    category: "ecommerce_marketplace",
    supportUrl: "https://www.yodobashi.com/ec/support/",
    serviceNote:
      "商品閲覧は可能でもカート・注文確定のみ不安定になるケースがあります。",
  },
  {
    id: "biccamera",
    name: "ビックカメラ.com",
    url: "https://www.biccamera.com",
    category: "ecommerce_marketplace",
    supportUrl: "https://www.biccamera.com/bc/i/support/",
    serviceNote:
      "在庫表示や決済処理のみ影響を受ける障害が発生することがあります。",
  },

  {
    id: "money-forward",
    name: "マネーフォワード",
    url: "https://moneyforward.com",
    category: "payments_finance",
    supportUrl: "https://support.moneyforward.com/",
    serviceNote:
      "口座連携や自動取得のみ失敗するなど、データ更新に限定した障害が発生することがあります。",
  },
  {
    id: "freee",
    name: "freee",
    url: "https://www.freee.co.jp",
    category: "payments_finance",
    officialStatusUrl: "https://status.freee.co.jp/",
    supportUrl: "https://support.freee.co.jp/",
    serviceNote:
      "会計データの同期やログインのみ不安定になるケースがあります。",
  },

  {
    id: "kakaku",
    name: "価格.com",
    url: "https://kakaku.com",
    category: "search_portal",
    supportUrl: "https://support.kakaku.com/",
    serviceNote:
      "検索結果は表示されても詳細ページのみ遅延・失敗するケースがあります。",
  },
  {
    id: "cookpad",
    name: "クックパッド",
    url: "https://cookpad.com",
    category: "search_portal",
    supportUrl: "https://help.cookpad.com/",
    serviceNote:
      "レシピ閲覧は可能でも投稿・保存機能のみ影響を受けることがあります。",
  },

  {
    id: "udemy",
    name: "Udemy",
    url: "https://www.udemy.com",
    category: "education_exam",
    supportUrl: "https://support.udemy.com/",
    serviceNote:
      "動画再生や購入処理のみ影響を受けるケースがあります。",
  },
  {
    id: "coursera",
    name: "Coursera",
    url: "https://www.coursera.org",
    category: "education_exam",
    supportUrl: "https://learner.coursera.help/",
    serviceNote:
      "ログインや課題提出のみ不安定になるなど、機能限定の障害が発生することがあります。",
  },

  {
    id: "canva",
    name: "Canva",
    url: "https://www.canva.com",
    category: "productivity_saas",
    officialStatusUrl: "https://www.canvastatus.com/",
    supportUrl: "https://www.canva.com/help/",
    serviceNote:
      "編集は可能でも書き出しや保存のみ失敗するなど、処理系の障害が発生することがあります。",
  },
  {
    id: "figma",
    name: "Figma",
    url: "https://www.figma.com",
    category: "productivity_saas",
    officialStatusUrl: "https://status.figma.com/",
    supportUrl: "https://help.figma.com/",
    serviceNote:
      "閲覧は可能でも共同編集やコメントのみ不安定になるケースがあります。",
  },
    {
    id: "google-maps",
    name: "Google マップ",
    url: "https://www.google.com/maps",
    category: "search_portal",
    officialStatusUrl: "https://www.google.com/appsstatus/dashboard/",
    supportUrl: "https://support.google.com/maps/",
    serviceNote:
      "地図表示は可能でも検索やナビ機能のみ不安定になるなど、機能限定の障害が発生することがあります。",
    aliases: ["Google Maps", "グーグルマップ"],
  },
  {
    id: "yahoo-maps",
    name: "Yahoo!地図",
    url: "https://map.yahoo.co.jp/",
    category: "search_portal",
    supportUrl: "https://support.yahoo-net.jp/PccMaps/s/",
    serviceNote:
      "地図は表示されてもルート検索や施設情報のみ取得できないケースがあります。",
  },

  {
    id: "instagram-dm",
    name: "Instagram（DM）",
    url: "https://www.instagram.com/direct/inbox/",
    category: "social_messaging",
    officialStatusUrl: "https://metastatus.com/",
    supportUrl: "https://help.instagram.com/",
    serviceNote:
      "投稿閲覧は可能でもDM送受信のみ遅延・失敗する障害が発生することがあります。",
    aliases: ["インスタDM"],
  },
  {
    id: "messenger",
    name: "Facebook Messenger",
    url: "https://www.messenger.com",
    category: "social_messaging",
    officialStatusUrl: "https://metastatus.com/",
    supportUrl: "https://www.facebook.com/help/messenger-app",
    serviceNote:
      "メッセージ履歴は表示されても送信や通知のみ不安定になるケースがあります。",
  },

  {
    id: "wowow",
    name: "WOWOW",
    url: "https://www.wowow.co.jp",
    category: "streaming_media",
    supportUrl: "https://support.wowow.co.jp/",
    serviceNote:
      "オンデマンド再生やログインのみ影響を受けるケースがあります。",
  },
  {
    id: "fod",
    name: "FOD",
    url: "https://fod.fujitv.co.jp",
    category: "streaming_media",
    supportUrl: "https://help.fod.fujitv.co.jp/",
    serviceNote:
      "再生開始や購入処理のみ不安定になるケースがあります。",
  },

  {
    id: "klook",
    name: "Klook",
    url: "https://www.klook.com/ja/",
    category: "transport_travel",
    supportUrl: "https://support.klook.com/",
    serviceNote:
      "商品検索は可能でも予約確定や決済のみ失敗することがあります。",
  },
  {
    id: "airbnb",
    name: "Airbnb",
    url: "https://www.airbnb.jp",
    category: "transport_travel",
    supportUrl: "https://www.airbnb.jp/help",
    serviceNote:
      "検索は可能でも予約確定やメッセージ機能のみ不安定になるケースがあります。",
  },

  {
    id: "lohaco",
    name: "LOHACO",
    url: "https://lohaco.yahoo.co.jp",
    category: "ecommerce_marketplace",
    supportUrl: "https://support.yahoo-net.jp/PccShopping/s/",
    serviceNote:
      "商品表示は可能でもカート・注文確定のみ影響を受けることがあります。",
  },
  {
    id: "nissen",
    name: "ニッセン",
    url: "https://www.nissen.co.jp",
    category: "ecommerce_marketplace",
    supportUrl: "https://www.nissen.co.jp/customer/",
    serviceNote:
      "注文処理や会員ログインのみ不安定になるケースがあります。",
  },

  {
    id: "paypay-bank",
    name: "PayPay銀行",
    url: "https://www.paypay-bank.co.jp",
    category: "payments_finance",
    supportUrl: "https://www.paypay-bank.co.jp/support/",
    serviceNote:
      "ログインや振込処理のみ遅延・失敗する障害が発生することがあります。",
  },
  {
    id: "resona",
    name: "りそな銀行",
    url: "https://www.resonabank.co.jp",
    category: "payments_finance",
    supportUrl: "https://www.resonabank.co.jp/support/",
    serviceNote:
      "インターネットバンキングや残高反映のみ影響を受けることがあります。",
  },

  {
    id: "indeed",
    name: "Indeed",
    url: "https://jp.indeed.com",
    category: "search_portal",
    supportUrl: "https://support.indeed.com/",
    serviceNote:
      "検索結果は表示されても応募機能やログインのみ不安定になるケースがあります。",
  },
  {
    id: "townwork",
    name: "タウンワーク",
    url: "https://townwork.net",
    category: "search_portal",
    supportUrl: "https://help.townwork.net/",
    serviceNote:
      "求人検索は可能でも応募フォームのみ影響を受けることがあります。",
  },

  {
    id: "benesse",
    name: "ベネッセ",
    url: "https://www.benesse.co.jp",
    category: "education_exam",
    supportUrl: "https://www.benesse.co.jp/contact/",
    serviceNote:
      "会員ページや教材配信のみ不安定になるケースがあります。",
  },
  {
    id: "z-kai",
    name: "Z会",
    url: "https://www.zkai.co.jp",
    category: "education_exam",
    supportUrl: "https://www.zkai.co.jp/support/",
    serviceNote:
      "申込や会員ログインのみ影響を受けることがあります。",
  },

  {
    id: "asana",
    name: "Asana",
    url: "https://asana.com",
    category: "productivity_saas",
    officialStatusUrl: "https://status.asana.com/",
    supportUrl: "https://asana.com/support",
    serviceNote:
      "閲覧は可能でもタスク更新や通知のみ不安定になるケースがあります。",
  },
  {
    id: "trello",
    name: "Trello",
    url: "https://trello.com",
    category: "productivity_saas",
    officialStatusUrl: "https://trello.status.atlassian.com/",
    supportUrl: "https://support.atlassian.com/trello/",
    serviceNote:
      "ボード表示は可能でもカード編集のみ失敗することがあります。",
  },

  {
    id: "heroku",
    name: "Heroku",
    url: "https://www.heroku.com",
    category: "cloud_devops",
    officialStatusUrl: "https://status.heroku.com/",
    supportUrl: "https://help.heroku.com/",
    serviceNote:
      "既存アプリは稼働していてもデプロイや管理画面のみ不安定になるケースがあります。",
  },
  {
    id: "digitalocean",
    name: "DigitalOcean",
    url: "https://www.digitalocean.com",
    category: "cloud_devops",
    officialStatusUrl: "https://status.digitalocean.com/",
    supportUrl: "https://www.digitalocean.com/support",
    serviceNote:
      "特定リージョンや管理画面のみ影響を受ける障害が発生することがあります。",
  },
    {
    id: "epark-medical",
    name: "EPARK（病院・クリニック予約）",
    url: "https://medical.epark.jp",
    category: "education_exam",
    supportUrl: "https://medical.epark.jp/help/",
    serviceNote:
      "検索は可能でも予約確定やログインのみ不安定になるなど、予約機能に限定した障害が発生することがあります。",
    aliases: ["EPARK病院"],
  },
  {
    id: "epark-pharmacy",
    name: "EPARKお薬手帳",
    url: "https://okusuri.epark.jp",
    category: "education_exam",
    supportUrl: "https://okusuri.epark.jp/help/",
    serviceNote:
      "処方箋送信や履歴表示のみ失敗するなど、機能限定の障害が発生することがあります。",
  },

  {
    id: "caloo",
    name: "Caloo（病院検索）",
    url: "https://caloo.jp",
    category: "education_exam",
    supportUrl: "https://caloo.jp/about",
    serviceNote:
      "病院情報は表示されても口コミ投稿や検索条件指定のみ不安定になるケースがあります。",
  },
  {
    id: "byoin-navi",
    name: "病院なび",
    url: "https://byoinnavi.jp",
    category: "education_exam",
    supportUrl: "https://byoinnavi.jp/pc/faq",
    serviceNote:
      "検索結果は表示されても詳細ページの表示が遅延することがあります。",
  },

  {
    id: "clinics",
    name: "CLINICS（オンライン診療）",
    url: "https://clinics.medley.life",
    category: "education_exam",
    supportUrl: "https://clinics-support.medley.life/",
    serviceNote:
      "予約は可能でもビデオ診療接続やログインのみ影響を受けるケースがあります。",
  },
  {
    id: "curon",
    name: "curon（オンライン診療）",
    url: "https://app.curon.co",
    category: "education_exam",
    supportUrl: "https://support.curon.co/",
    serviceNote:
      "診療予約は可能でも通話接続や決済処理のみ不安定になることがあります。",
  },

  {
    id: "medley",
    name: "Medley",
    url: "https://www.medley.life",
    category: "education_exam",
    supportUrl: "https://www.medley.life/support",
    serviceNote:
      "医療情報ページは表示されても関連サービスへの遷移のみ影響を受けることがあります。",
  },
  {
    id: "medical-note",
    name: "Medical Note",
    url: "https://medicalnote.jp",
    category: "education_exam",
    supportUrl: "https://medicalnote.jp/contact",
    serviceNote:
      "記事閲覧は可能でも検索や関連記事表示のみ遅延するケースがあります。",
  },

  {
    id: "ask-doctors",
    name: "AskDoctors",
    url: "https://www.askdoctors.jp",
    category: "education_exam",
    supportUrl: "https://www.askdoctors.jp/help",
    serviceNote:
      "閲覧は可能でも質問投稿やログインのみ不安定になるケースがあります。",
  },
  {
    id: "calldoctor",
    name: "ファストドクター",
    url: "https://fastdoctor.jp",
    category: "education_exam",
    supportUrl: "https://fastdoctor.jp/faq/",
    serviceNote:
      "申込ページは表示されても受付完了や決済処理のみ影響を受けることがあります。",
    aliases: ["FastDoctor"],
  },

  {
    id: "mhlw",
    name: "厚生労働省",
    url: "https://www.mhlw.go.jp",
    category: "government_public",
    officialStatusUrl: "https://www.mhlw.go.jp/stf/index.html",
    supportUrl: "https://www.mhlw.go.jp/form/pub/mhlw01",
    serviceNote:
      "医療制度・感染症関連ページのみアクセスしづらくなるケースがあります。",
  },
  {
    id: "pmda",
    name: "PMDA（医薬品医療機器総合機構）",
    url: "https://www.pmda.go.jp",
    category: "government_public",
    supportUrl: "https://www.pmda.go.jp/about-pmda/qa/0001.html",
    serviceNote:
      "医薬品情報検索やPDF閲覧のみ不安定になることがあります。",
  },

  {
    id: "himawari-net",
    name: "ひまわり（医療機関検索）",
    url: "https://www.himawari.metro.tokyo.jp",
    category: "government_public",
    supportUrl: "https://www.fukushishinko.metro.tokyo.lg.jp/",
    serviceNote:
      "夜間・休日医療検索が利用集中で不安定になることがあります。",
  },
  {
    id: "iryou-kikan-net",
    name: "医療機関ネット（全国）",
    url: "https://iryou-kikan.net",
    category: "government_public",
    supportUrl: "https://www.mhlw.go.jp/",
    serviceNote:
      "検索結果は表示されても詳細情報取得のみ遅延するケースがあります。",
  },

  {
    id: "myna-insurance",
    name: "マイナ保険証",
    url: "https://www.mhlw.go.jp/stf/newpage_08277.html",
    category: "government_public",
    supportUrl: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000121431_00004.html",
    serviceNote:
      "資格確認や連携処理のみ利用できない障害が発生することがあります。",
  },
  {
    id: "kenshin-net",
    name: "健康診断予約システム",
    url: "https://www.ningen-dock.jp",
    category: "education_exam",
    supportUrl: "https://www.ningen-dock.jp/contact",
    serviceNote:
      "予約検索は可能でも申込確定のみ失敗するケースがあります。",
  },

  {
    id: "okusuri-110",
    name: "おくすり110番",
    url: "https://www.jah.ne.jp/~kako/",
    category: "education_exam",
    supportUrl: "https://www.jah.ne.jp/",
    serviceNote:
      "薬剤情報ページのみ表示が不安定になるケースがあります。",
  },
  {
    id: "qlife",
    name: "QLife",
    url: "https://www.qlife.jp",
    category: "education_exam",
    supportUrl: "https://www.qlife.jp/support",
    serviceNote:
      "検索や医療ニュース表示のみ遅延することがあります。",
  },

  {
    id: "my-hospital",
    name: "マイホスピタル（電子カルテ連携）",
    url: "https://www.myhospital.jp",
    category: "education_exam",
    supportUrl: "https://www.myhospital.jp/support",
    serviceNote:
      "ログインやデータ同期のみ影響を受けるケースがあります。",
  },
  {
    id: "medpeer",
    name: "MedPeer",
    url: "https://medpeer.jp",
    category: "education_exam",
    supportUrl: "https://medpeer.jp/help",
    serviceNote:
      "医師向け掲示板やログインのみ不安定になることがあります。",
  },
    {
    id: "yahoo-news-jp",
    name: "Yahoo! News Japan",
    url: "https://news.yahoo.co.jp",
    category: "search_portal",
    supportUrl: "https://support.yahoo-net.jp/",
    serviceNote:
      "Headlines may load while article pages or comments fail to display during partial outages.",
    aliases: ["Yahoo News"],
  },
  {
    id: "google-news",
    name: "Google News",
    url: "https://news.google.com",
    category: "search_portal",
    officialStatusUrl: "https://www.google.com/appsstatus/dashboard/",
    supportUrl: "https://support.google.com/news/",
    serviceNote:
      "The front page may render while individual sources or topic pages fail to load.",
  },

  {
    id: "reddit",
    name: "Reddit",
    url: "https://www.reddit.com",
    category: "social_messaging",
    officialStatusUrl: "https://www.redditstatus.com/",
    supportUrl: "https://support.reddithelp.com/",
    serviceNote:
      "Browsing may work while posting, voting, or comments intermittently fail.",
  },
  {
    id: "mastodon",
    name: "Mastodon",
    url: "https://mastodon.social",
    category: "social_messaging",
    supportUrl: "https://joinmastodon.org/support",
    serviceNote:
      "Service availability can vary by instance; one server may be unreachable while others remain accessible.",
  },

  {
    id: "yahoo-weather",
    name: "Yahoo! Weather",
    url: "https://weather.yahoo.co.jp/weather/",
    category: "search_portal",
    supportUrl: "https://support.yahoo-net.jp/",
    serviceNote:
      "Forecast pages may load while radar maps or alerts fail to update.",
  },
  {
    id: "tenki-jp",
    name: "tenki.jp",
    url: "https://tenki.jp",
    category: "search_portal",
    supportUrl: "https://tenki.jp/help/",
    serviceNote:
      "Weather data may display while location search or warnings are unavailable.",
  },

  {
    id: "yahoo-transit",
    name: "Yahoo! Transit",
    url: "https://transit.yahoo.co.jp",
    category: "transport_travel",
    supportUrl: "https://support.yahoo-net.jp/PccTransit/s/",
    serviceNote:
      "Route search may fail while timetables remain accessible.",
  },
  {
    id: "navitime",
    name: "NAVITIME",
    url: "https://www.navitime.co.jp",
    category: "transport_travel",
    supportUrl: "https://www.navitime.co.jp/support/",
    serviceNote:
      "Map display may work while route calculation or traffic data is unavailable.",
  },

  {
    id: "yamato-transport",
    name: "Yamato Transport",
    url: "https://www.kuronekoyamato.co.jp",
    category: "transport_travel",
    supportUrl: "https://faq.kuronekoyamato.co.jp/",
    serviceNote:
      "Tracking pages may be reachable while shipment status updates fail to refresh.",
  },
  {
    id: "sagawa",
    name: "Sagawa Express",
    url: "https://www.sagawa-exp.co.jp",
    category: "transport_travel",
    supportUrl: "https://www.sagawa-exp.co.jp/support/",
    serviceNote:
      "Tracking numbers may not resolve even though the main site remains accessible.",
  },

  {
    id: "japan-post",
    name: "Japan Post",
    url: "https://www.post.japanpost.jp",
    category: "transport_travel",
    supportUrl: "https://www.post.japanpost.jp/question/",
    serviceNote:
      "Postal tracking or rate calculation may fail while informational pages load normally.",
  },
  {
    id: "ems",
    name: "EMS (Japan Post)",
    url: "https://www.post.japanpost.jp/int/ems/",
    category: "transport_travel",
    supportUrl: "https://www.post.japanpost.jp/int/question/",
    serviceNote:
      "International tracking may be delayed or unavailable during system issues.",
  },

  {
    id: "rakuten-bank",
    name: "Rakuten Bank",
    url: "https://www.rakuten-bank.co.jp",
    category: "payments_finance",
    supportUrl: "https://www.rakuten-bank.co.jp/support/",
    serviceNote:
      "Login or transfer functions may fail while balance information remains visible.",
  },
  {
    id: "sony-bank",
    name: "Sony Bank",
    url: "https://moneykit.net",
    category: "payments_finance",
    supportUrl: "https://moneykit.net/visitor/support/",
    serviceNote:
      "Online banking features may be intermittently unavailable during maintenance windows.",
  },

  {
    id: "google-drive",
    name: "Google Drive",
    url: "https://drive.google.com",
    category: "productivity_saas",
    officialStatusUrl: "https://www.google.com/appsstatus/dashboard/",
    supportUrl: "https://support.google.com/drive/",
    serviceNote:
      "File viewing may work while uploads, downloads, or sync operations fail.",
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    url: "https://calendar.google.com",
    category: "productivity_saas",
    officialStatusUrl: "https://www.google.com/appsstatus/dashboard/",
    supportUrl: "https://support.google.com/calendar/",
    serviceNote:
      "Calendar pages may load while event creation or updates fail to save.",
  },

  {
    id: "bitbucket",
    name: "Bitbucket",
    url: "https://bitbucket.org",
    category: "cloud_devops",
    officialStatusUrl: "https://bitbucket.status.atlassian.com/",
    supportUrl: "https://support.atlassian.com/bitbucket-cloud/",
    serviceNote:
      "Repository browsing may work while pushes or pipelines fail.",
  },
  {
    id: "gitlab",
    name: "GitLab",
    url: "https://gitlab.com",
    category: "cloud_devops",
    officialStatusUrl: "https://status.gitlab.com/",
    supportUrl: "https://support.gitlab.com/",
    serviceNote:
      "Web access may be available while CI/CD or authentication services are degraded.",
  },

  {
    id: "wordpress-com",
    name: "WordPress.com",
    url: "https://wordpress.com",
    category: "productivity_saas",
    officialStatusUrl: "https://wordpress.com/status/",
    supportUrl: "https://wordpress.com/support/",
    serviceNote:
      "Published sites may remain visible while admin dashboards or editing tools fail.",
  },
  {
    id: "medium",
    name: "Medium",
    url: "https://medium.com",
    category: "search_portal",
    supportUrl: "https://help.medium.com/",
    serviceNote:
      "Article reading may work while login or publishing features are unavailable.",
  },
    {
    id: "google-search-console",
    name: "Google Search Console",
    url: "https://search.google.com/search-console",
    category: "productivity_saas",
    officialStatusUrl: "https://www.google.com/appsstatus/dashboard/",
    supportUrl: "https://support.google.com/webmasters/",
    serviceNote:
      "Reports may load while indexing data or performance charts fail to update.",
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    url: "https://analytics.google.com",
    category: "productivity_saas",
    officialStatusUrl: "https://www.google.com/appsstatus/dashboard/",
    supportUrl: "https://support.google.com/analytics/",
    serviceNote:
      "Dashboards may render while real-time or historical data queries fail.",
  },

  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com",
    category: "social_messaging",
    officialStatusUrl: "https://www.linkedin-status.com/",
    supportUrl: "https://www.linkedin.com/help/linkedin",
    serviceNote:
      "Feed browsing may work while messaging or posting features are unavailable.",
  },
  {
    id: "signal",
    name: "Signal",
    url: "https://signal.org",
    category: "social_messaging",
    supportUrl: "https://support.signal.org/",
    serviceNote:
      "Message delivery may be delayed while app access remains available.",
  },

  {
    id: "youtube-music",
    name: "YouTube Music",
    url: "https://music.youtube.com",
    category: "streaming_media",
    officialStatusUrl: "https://www.google.com/appsstatus/dashboard/",
    supportUrl: "https://support.google.com/youtubemusic/",
    serviceNote:
      "Playback may fail while browsing and search remain functional.",
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    url: "https://soundcloud.com",
    category: "streaming_media",
    officialStatusUrl: "https://status.soundcloud.com/",
    supportUrl: "https://help.soundcloud.com/",
    serviceNote:
      "Streaming may be interrupted while profile pages continue to load.",
  },

  {
    id: "expedia",
    name: "Expedia",
    url: "https://www.expedia.com",
    category: "transport_travel",
    supportUrl: "https://www.expedia.com/service/",
    serviceNote:
      "Search results may appear while booking or payment confirmation fails.",
  },
  {
    id: "tripadvisor",
    name: "Tripadvisor",
    url: "https://www.tripadvisor.com",
    category: "transport_travel",
    supportUrl: "https://www.tripadvisor.com/help",
    serviceNote:
      "Reviews may load while posting or account features are unavailable.",
  },

  {
    id: "fedex",
    name: "FedEx",
    url: "https://www.fedex.com",
    category: "transport_travel",
    supportUrl: "https://www.fedex.com/en-us/customer-support.html",
    serviceNote:
      "Tracking information may be delayed while the main site remains accessible.",
  },
  {
    id: "dhl",
    name: "DHL",
    url: "https://www.dhl.com",
    category: "transport_travel",
    supportUrl: "https://www.dhl.com/global-en/home/customer-service.html",
    serviceNote:
      "Shipment tracking may fail while informational pages continue to load.",
  },

  {
    id: "wise",
    name: "Wise",
    url: "https://wise.com",
    category: "payments_finance",
    officialStatusUrl: "https://status.wise.com/",
    supportUrl: "https://wise.com/help",
    serviceNote:
      "Transfers may be delayed while balances and rates remain visible.",
  },
  {
    id: "revolut",
    name: "Revolut",
    url: "https://www.revolut.com",
    category: "payments_finance",
    officialStatusUrl: "https://www.revolut.com/system-status/",
    supportUrl: "https://www.revolut.com/help/",
    serviceNote:
      "Card payments may fail while app access remains available.",
  },

  {
    id: "adobe-creative-cloud",
    name: "Adobe Creative Cloud",
    url: "https://www.adobe.com/creativecloud.html",
    category: "productivity_saas",
    officialStatusUrl: "https://status.adobe.com/",
    supportUrl: "https://helpx.adobe.com/support.html",
    serviceNote:
      "App downloads or license checks may fail while account pages load.",
  },
  {
    id: "dropbox-paper",
    name: "Dropbox Paper",
    url: "https://paper.dropbox.com",
    category: "productivity_saas",
    officialStatusUrl: "https://status.dropbox.com/",
    supportUrl: "https://help.dropbox.com/",
    serviceNote:
      "Viewing may work while editing or syncing fails.",
  },

  {
    id: "cloudwatch",
    name: "Amazon CloudWatch",
    url: "https://aws.amazon.com/cloudwatch/",
    category: "cloud_devops",
    officialStatusUrl: "https://health.aws.amazon.com/health/status",
    supportUrl: "https://aws.amazon.com/support/",
    serviceNote:
      "Metrics may be delayed while dashboards remain accessible.",
  },
  {
    id: "lambda",
    name: "AWS Lambda",
    url: "https://aws.amazon.com/lambda/",
    category: "cloud_devops",
    officialStatusUrl: "https://health.aws.amazon.com/health/status",
    supportUrl: "https://aws.amazon.com/support/",
    serviceNote:
      "Function execution may fail in specific regions while others operate normally.",
  },

  {
    id: "khan-academy",
    name: "Khan Academy",
    url: "https://www.khanacademy.org",
    category: "education_exam",
    supportUrl: "https://support.khanacademy.org/",
    serviceNote:
      "Video playback may fail while lesson pages continue to load.",
  },
  {
    id: "duolingo",
    name: "Duolingo",
    url: "https://www.duolingo.com",
    category: "education_exam",
    supportUrl: "https://support.duolingo.com/",
    serviceNote:
      "Lessons may not start while account access remains available.",
  },
    {
    id: "uber-eats-jp",
    name: "Uber Eats (Japan)",
    url: "https://www.ubereats.com/jp",
    category: "ecommerce_marketplace",
    supportUrl: "https://help.uber.com/ubereats/",
    serviceNote:
      "Browsing may work while order placement, payment, or courier tracking fails.",
  },
  {
    id: "demae-can",
    name: "Demae-can",
    url: "https://demae-can.com",
    category: "ecommerce_marketplace",
    supportUrl: "https://demae-can.com/support/",
    serviceNote:
      "Restaurant listings may load while checkout or delivery status updates fail.",
  },

  {
    id: "gurunavi",
    name: "Gurunavi",
    url: "https://www.gnavi.co.jp",
    category: "search_portal",
    supportUrl: "https://www.gnavi.co.jp/support/",
    serviceNote:
      "Search results may appear while reservation links or details fail to load.",
  },
  {
    id: "tabelog",
    name: "Tabelog",
    url: "https://tabelog.com",
    category: "search_portal",
    supportUrl: "https://tabelog.com/help/",
    serviceNote:
      "Listings may load while reviews or reservation features are unavailable.",
  },

  {
    id: "openstreetmap",
    name: "OpenStreetMap",
    url: "https://www.openstreetmap.org",
    category: "search_portal",
    supportUrl: "https://wiki.openstreetmap.org/wiki/Contact",
    serviceNote:
      "Map tiles may render while search or editing tools are degraded.",
  },
  {
    id: "waze",
    name: "Waze",
    url: "https://www.waze.com",
    category: "transport_travel",
    supportUrl: "https://support.google.com/waze/",
    serviceNote:
      "Map display may work while routing or traffic updates are unavailable.",
  },

  {
    id: "uber",
    name: "Uber",
    url: "https://www.uber.com/jp",
    category: "transport_travel",
    supportUrl: "https://help.uber.com/",
    serviceNote:
      "App access may work while ride requests or fare estimates fail.",
  },
  {
    id: "go-taxi",
    name: "GO Taxi",
    url: "https://go.mo-t.com",
    category: "transport_travel",
    supportUrl: "https://go.mo-t.com/support/",
    serviceNote:
      "Booking may fail while maps or fare estimates remain accessible.",
  },

  {
    id: "rakuten-kobo",
    name: "Rakuten Kobo",
    url: "https://books.rakuten.co.jp/e-book/",
    category: "ecommerce_marketplace",
    supportUrl: "https://books.rakuten.co.jp/e-book/help/",
    serviceNote:
      "Store pages may load while downloads or library sync fail.",
  },
  {
    id: "kindle-store",
    name: "Kindle Store",
    url: "https://www.amazon.co.jp/kindle-dbs/storefront",
    category: "ecommerce_marketplace",
    supportUrl: "https://www.amazon.co.jp/hz/contact-us",
    serviceNote:
      "Browsing may work while purchases or downloads fail to start.",
  },

  {
    id: "auone",
    name: "au one",
    url: "https://www.auone.jp",
    category: "search_portal",
    supportUrl: "https://www.au.com/support/",
    serviceNote:
      "Portal pages may load while linked services fail to open.",
  },
  {
    id: "docomo-online",
    name: "My docomo",
    url: "https://www.docomo.ne.jp/mydocomo/",
    category: "telecom_isp",
    supportUrl: "https://www.docomo.ne.jp/support/",
    serviceNote:
      "Login may fail while public pages remain accessible.",
  },

  {
    id: "google-play",
    name: "Google Play",
    url: "https://play.google.com",
    category: "productivity_saas",
    officialStatusUrl: "https://www.google.com/appsstatus/dashboard/",
    supportUrl: "https://support.google.com/googleplay/",
    serviceNote:
      "Store browsing may work while downloads or payments fail.",
  },
  {
    id: "apple-tv",
    name: "Apple TV",
    url: "https://tv.apple.com/jp",
    category: "streaming_media",
    officialStatusUrl: "https://www.apple.com/support/systemstatus/",
    supportUrl: "https://support.apple.com/ja-jp/tv",
    serviceNote:
      "Playback may fail while catalog pages load normally.",
  },

  {
    id: "zoom-phone",
    name: "Zoom Phone",
    url: "https://zoom.us/phone",
    category: "productivity_saas",
    officialStatusUrl: "https://status.zoom.us/",
    supportUrl: "https://support.zoom.com/",
    serviceNote:
      "Admin access may work while call connectivity is degraded.",
  },
  {
    id: "ringcentral",
    name: "RingCentral",
    url: "https://www.ringcentral.com",
    category: "productivity_saas",
    officialStatusUrl: "https://status.ringcentral.com/",
    supportUrl: "https://support.ringcentral.com/",
    serviceNote:
      "Web access may work while calling or messaging services are unavailable.",
  },

  {
    id: "firebase",
    name: "Firebase",
    url: "https://firebase.google.com",
    category: "cloud_devops",
    officialStatusUrl: "https://status.firebase.google.com/",
    supportUrl: "https://firebase.google.com/support",
    serviceNote:
      "Console access may work while hosting, auth, or database services are degraded.",
  },
  {
    id: "supabase",
    name: "Supabase",
    url: "https://supabase.com",
    category: "cloud_devops",
    officialStatusUrl: "https://status.supabase.com/",
    supportUrl: "https://supabase.com/support",
    serviceNote:
      "Dashboards may load while database or auth services are unavailable.",
  },

  {
    id: "udemy-business",
    name: "Udemy Business",
    url: "https://business.udemy.com",
    category: "education_exam",
    supportUrl: "https://support.udemy.com/",
    serviceNote:
      "Course browsing may work while enrollment or playback fails.",
  },
  {
    id: "skillshare",
    name: "Skillshare",
    url: "https://www.skillshare.com",
    category: "education_exam",
    supportUrl: "https://help.skillshare.com/",
    serviceNote:
      "Video pages may load while playback or login is unavailable.",
  },
    {
    id: "electric-power-tepco",
    name: "TEPCO Power Grid",
    url: "https://www.tepco.co.jp",
    category: "government_public",
    supportUrl: "https://www.tepco.co.jp/pg/consignment/information/",
    serviceNote:
      "Outage information pages may be accessible while regional status updates are delayed.",
  },
  {
    id: "kansai-electric",
    name: "Kansai Electric Power",
    url: "https://www.kepco.co.jp",
    category: "government_public",
    supportUrl: "https://www.kepco.co.jp/energy_supply/energy_supply_info/",
    serviceNote:
      "Planned outage or restoration pages may not update in real time during incidents.",
  },

  {
    id: "waterworks-tokyo",
    name: "Tokyo Waterworks Bureau",
    url: "https://www.waterworks.metro.tokyo.lg.jp",
    category: "government_public",
    supportUrl: "https://www.waterworks.metro.tokyo.lg.jp/kurashi/",
    serviceNote:
      "Maintenance notices may load while emergency water outage information is delayed.",
  },
  {
    id: "j-alert",
    name: "J-Alert",
    url: "https://www.fdma.go.jp",
    category: "government_public",
    supportUrl: "https://www.fdma.go.jp/contact.html",
    serviceNote:
      "Alert history pages may be accessible while real-time notifications fail to display.",
  },

  {
    id: "weather-jma",
    name: "Japan Meteorological Agency",
    url: "https://www.jma.go.jp",
    category: "government_public",
    supportUrl: "https://www.jma.go.jp/jma/kishou/faq/index.html",
    serviceNote:
      "Forecast pages may load while warnings or radar data fail to refresh.",
  },

  {
    id: "fastly",
    name: "Fastly",
    url: "https://www.fastly.com",
    category: "cloud_devops",
    officialStatusUrl: "https://www.fastlystatus.com/",
    supportUrl: "https://www.fastly.com/support",
    serviceNote:
      "Customer sites may be affected even if the Fastly dashboard remains reachable.",
  },
  {
    id: "akamai",
    name: "Akamai",
    url: "https://www.akamai.com",
    category: "cloud_devops",
    supportUrl: "https://www.akamai.com/support",
    serviceNote:
      "Edge delivery issues may occur without a full public service outage notice.",
  },

  {
    id: "cloudfront",
    name: "Amazon CloudFront",
    url: "https://aws.amazon.com/cloudfront/",
    category: "cloud_devops",
    officialStatusUrl: "https://health.aws.amazon.com/health/status",
    supportUrl: "https://aws.amazon.com/support/",
    serviceNote:
      "Content delivery may degrade regionally while the AWS console remains accessible.",
  },

  {
    id: "line-works",
    name: "LINE WORKS",
    url: "https://line.worksmobile.com",
    category: "productivity_saas",
    officialStatusUrl: "https://status.worksmobile.com/",
    supportUrl: "https://help.worksmobile.com/",
    serviceNote:
      "Messaging may work while admin or file-sharing features are unavailable.",
  },
  {
    id: "chatwork",
    name: "Chatwork",
    url: "https://www.chatwork.com",
    category: "productivity_saas",
    supportUrl: "https://help.chatwork.com/",
    serviceNote:
      "Message history may load while sending or notifications fail.",
  },

  {
    id: "cybozu",
    name: "Cybozu",
    url: "https://cybozu.co.jp",
    category: "productivity_saas",
    officialStatusUrl: "https://status.cybozu.com/",
    supportUrl: "https://support.cybozu.com/",
    serviceNote:
      "Specific services may be affected independently within the Cybozu platform.",
  },
  {
    id: "kintone",
    name: "kintone",
    url: "https://kintone.cybozu.co.jp",
    category: "productivity_saas",
    officialStatusUrl: "https://status.cybozu.com/",
    supportUrl: "https://help.cybozu.com/",
    serviceNote:
      "App access may work while record updates or API operations fail.",
  },

  {
    id: "jre-point",
    name: "JRE POINT",
    url: "https://www.jrepoint.jp",
    category: "payments_finance",
    supportUrl: "https://www.jrepoint.jp/inquiry/",
    serviceNote:
      "Point balance display may fail while login remains possible.",
  },
  {
    id: "t-point",
    name: "T-Point",
    url: "https://www.tsite.jp",
    category: "payments_finance",
    supportUrl: "https://tsite.jp/inquiry/",
    serviceNote:
      "Point usage may be unavailable even if account pages load.",
  },

  {
    id: "aeon-card",
    name: "AEON Card",
    url: "https://www.aeon.co.jp",
    category: "payments_finance",
    supportUrl: "https://www.aeon.co.jp/inquiry/",
    serviceNote:
      "Statement or authentication services may be intermittently unavailable.",
  },

  {
    id: "au-smartpass",
    name: "au Smart Pass",
    url: "https://www.au.com/service/smartpass/",
    category: "telecom_isp",
    supportUrl: "https://www.au.com/support/",
    serviceNote:
      "Membership verification may fail while promotional pages remain accessible.",
  },

  {
    id: "nhk-plus",
    name: "NHK Plus",
    url: "https://plus.nhk.jp",
    category: "streaming_media",
    supportUrl: "https://www.nhk.or.jp/plus/help/",
    serviceNote:
      "Live streaming may fail while on-demand pages load normally.",
  },
  {
    id: "radiko",
    name: "radiko",
    url: "https://radiko.jp",
    category: "streaming_media",
    supportUrl: "https://radiko.jp/help/",
    serviceNote:
      "Playback may be unavailable in specific regions despite site accessibility.",
  },
    {
    id: "yamato-track",
    name: "Yamato Tracking",
    url: "https://toi.kuronekoyamato.co.jp/cgi-bin/tneko",
    category: "transport_travel",
    supportUrl: "https://faq.kuronekoyamato.co.jp/",
    serviceNote:
      "Tracking pages may be unreachable or fail to update while the main site remains accessible.",
  },
  {
    id: "sagawa-track",
    name: "Sagawa Tracking",
    url: "https://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do",
    category: "transport_travel",
    supportUrl: "https://www.sagawa-exp.co.jp/support/",
    serviceNote:
      "Tracking numbers may not resolve even though public pages load normally.",
  },
  {
    id: "japan-post-track",
    name: "Japan Post Tracking",
    url: "https://trackings.post.japanpost.jp/services/srv/search/",
    category: "transport_travel",
    supportUrl: "https://www.post.japanpost.jp/question/",
    serviceNote:
      "Status updates may be delayed or unavailable during peak periods.",
  },

  {
    id: "ems-track",
    name: "EMS Tracking",
    url: "https://trackings.post.japanpost.jp/services/srv/search/?requestNoLang=EN",
    category: "transport_travel",
    supportUrl: "https://www.post.japanpost.jp/int/question/",
    serviceNote:
      "International tracking may lag behind actual shipment movement.",
  },
  {
    id: "dhl-track",
    name: "DHL Tracking",
    url: "https://www.dhl.com/global-en/home/tracking.html",
    category: "transport_travel",
    supportUrl: "https://www.dhl.com/global-en/home/customer-service.html",
    serviceNote:
      "Tracking results may intermittently fail while the main site is reachable.",
  },
  {
    id: "fedex-track",
    name: "FedEx Tracking",
    url: "https://www.fedex.com/fedextrack/",
    category: "transport_travel",
    supportUrl: "https://www.fedex.com/en-us/customer-support.html",
    serviceNote:
      "Shipment details may not load during system maintenance windows.",
  },
  {
    id: "ups-track",
    name: "UPS Tracking",
    url: "https://www.ups.com/track",
    category: "transport_travel",
    supportUrl: "https://www.ups.com/support",
    serviceNote:
      "Tracking pages may be slow or unavailable while other site sections load.",
  },

  {
    id: "amazon-logistics",
    name: "Amazon Logistics",
    url: "https://logistics.amazon.co.jp",
    category: "transport_travel",
    supportUrl: "https://www.amazon.co.jp/hz/contact-us",
    serviceNote:
      "Delivery status updates may fail to refresh even when the storefront is accessible.",
  },
  {
    id: "rakuten-logistics",
    name: "Rakuten Logistics",
    url: "https://logistics.rakuten.co.jp",
    category: "transport_travel",
    supportUrl: "https://logistics.rakuten.co.jp/support/",
    serviceNote:
      "Shipment dashboards may load while tracking updates are delayed.",
  },

  {
    id: "yamato-business",
    name: "Yamato Business Portal",
    url: "https://business.kuronekoyamato.co.jp",
    category: "productivity_saas",
    supportUrl: "https://faq.kuronekoyamato.co.jp/",
    serviceNote:
      "Business dashboards may be accessible while label printing or pickups fail.",
  },
  {
    id: "sagawa-business",
    name: "Sagawa Business Portal",
    url: "https://www.sagawa-exp.co.jp/service/",
    category: "productivity_saas",
    supportUrl: "https://www.sagawa-exp.co.jp/support/",
    serviceNote:
      "Account access may work while shipment registration is unavailable.",
  },

  {
    id: "kuroneko-member",
    name: "Kuroneko Members",
    url: "https://member.kms.kuronekoyamato.co.jp",
    category: "productivity_saas",
    supportUrl: "https://faq.kuronekoyamato.co.jp/",
    serviceNote:
      "Login may fail while public tracking pages remain accessible.",
  },
  {
    id: "yu-pack",
    name: "Yu-Pack",
    url: "https://www.post.japanpost.jp/service/you_pack/",
    category: "transport_travel",
    supportUrl: "https://www.post.japanpost.jp/question/",
    serviceNote:
      "Service information may load while tracking updates are delayed.",
  },

  {
    id: "seven-eleven-receipt",
    name: "7-Eleven Pickup Service",
    url: "https://www.sej.co.jp/services/",
    category: "ecommerce_marketplace",
    supportUrl: "https://www.sej.co.jp/services/",
    serviceNote:
      "Pickup status updates may fail while store pages remain available.",
  },
  {
    id: "lawson-pickup",
    name: "Lawson Pickup Service",
    url: "https://www.lawson.co.jp/service/",
    category: "ecommerce_marketplace",
    supportUrl: "https://www.lawson.co.jp/contact/",
    serviceNote:
      "Order linkage may be unavailable even if store information loads.",
  },
  {
    id: "familymart-pickup",
    name: "FamilyMart Pickup Service",
    url: "https://www.family.co.jp/services/",
    category: "ecommerce_marketplace",
    supportUrl: "https://www.family.co.jp/company/customer.html",
    serviceNote:
      "Pickup confirmation may be delayed during system congestion.",
  },

  {
    id: "post-office-search",
    name: "Post Office Locator",
    url: "https://www.post.japanpost.jp/office_search/",
    category: "government_public",
    supportUrl: "https://www.post.japanpost.jp/question/",
    serviceNote:
      "Search results may fail to load while the main site remains accessible.",
  },
  {
    id: "customs-japan",
    name: "Japan Customs",
    url: "https://www.customs.go.jp",
    category: "government_public",
    supportUrl: "https://www.customs.go.jp/contact/",
    serviceNote:
      "Clearance information pages may be slow or unavailable during peak periods.",
  },
  {
    id: "naccs",
    name: "NACCS",
    url: "https://www.naccs.jp",
    category: "government_public",
    supportUrl: "https://www.naccs.jp/contact/",
    serviceNote:
      "Trade processing systems may be unavailable even if informational pages load.",
  },
  {
  id: "jgrants",
  name: "jGrants",
  url: "https://www.jgrants-portal.go.jp",
  category: "government_public",
  serviceNote: "Grant applications may fail near submission deadlines.",
},
{
  id: "passport-online",
  name: "Online Passport Application",
  url: "https://www.mofa.go.jp/j_info/passport/",
  category: "government_public",
  serviceNote: "Online submission or status lookup may be unavailable.",
},
{
  id: "immigration-online",
  name: "Immigration Online Procedures",
  url: "https://www.moj.go.jp/isa/applications/",
  category: "government_public",
  serviceNote: "Application tracking may fail during peak periods.",
},
{
  id: "childcare-benefits",
  name: "Childcare Benefit Application",
  url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000135097.html",
  category: "government_public",
  serviceNote: "Benefit applications may be unavailable near deadlines.",
},
{
  id: "disaster-prevention-portal",
  name: "Cabinet Secretariat Disaster Portal",
  url: "https://www.bousai.go.jp",
  category: "government_public",
  serviceNote: "Real-time updates may lag during emergencies.",
},
{
  id: "housing-benefit",
  name: "Housing Support Benefit",
  url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000212318.html",
  category: "government_public",
  serviceNote: "Application pages may be inaccessible during high traffic.",
},
{
  id: "local-tax-portal",
  name: "Local Tax Portal",
  url: "https://www.soumu.go.jp/main_sosiki/jichi_zeisei/",
  category: "government_public",
  serviceNote: "Local tax filing systems may be unavailable near deadlines.",
},
{
  id: "chugoku-electric",
  name: "Chugoku Electric Power",
  url: "https://www.energia.co.jp",
  category: "government_public",
  serviceNote: "Outage information may fail to update in real time.",
},
{
  id: "hokuriku-electric",
  name: "Hokuriku Electric Power",
  url: "https://www.rikuden.co.jp",
  category: "government_public",
  serviceNote: "Regional outage updates may be delayed.",
},
{
  id: "shikoku-electric",
  name: "Shikoku Electric Power",
  url: "https://www.yonden.co.jp",
  category: "government_public",
  serviceNote: "Restoration status pages may not load during incidents.",
},
{
  id: "tokyo-gas-outage",
  name: "Tokyo Gas Outage Information",
  url: "https://home.tokyo-gas.co.jp/safety/",
  category: "government_public",
  serviceNote: "Service interruption notices may be delayed.",
},
{
  id: "osaka-water",
  name: "Osaka City Waterworks",
  url: "https://www.city.osaka.lg.jp/suido/",
  category: "government_public",
  serviceNote: "Outage or maintenance information may be unavailable.",
},
{
  id: "center-exam-results",
  name: "University Entrance Exam Results",
  url: "https://www.dnc.ac.jp",
  category: "education_exam",
  serviceNote: "Result lookup pages may be inaccessible during peak traffic.",
},
{
  id: "nursing-exam",
  name: "National Nursing Exam Portal",
  url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000188411.html",
  category: "education_exam",
  serviceNote: "Exam result announcements may load slowly.",
},
{
  id: "care-worker-exam",
  name: "Certified Care Worker Exam",
  url: "https://www.sssc.or.jp",
  category: "education_exam",
  serviceNote: "Application and result pages may be unavailable.",
},
{
  id: "teacher-certification",
  name: "Teacher Certification Portal",
  url: "https://www.mext.go.jp",
  category: "education_exam",
  serviceNote: "Certification procedures may fail during peak seasons.",
},
{
  id: "jibun-bank",
  name: "au Jibun Bank",
  url: "https://www.jibunbank.co.jp",
  category: "payments_finance",
  serviceNote: "Login or transfers may fail during maintenance.",
},
{
  id: "sbj-bank",
  name: "SBJ Bank",
  url: "https://www.sbjbank.co.jp",
  category: "payments_finance",
  serviceNote: "Internet banking features may be unavailable.",
},
{
  id: "shinsei-bank",
  name: "Shinsei Bank",
  url: "https://www.sbishinseibank.co.jp",
  category: "payments_finance",
  serviceNote: "Transfers or authentication may fail temporarily.",
},
{
  id: "jaccs",
  name: "JACCS",
  url: "https://www.jaccs.co.jp",
  category: "payments_finance",
  serviceNote: "Card authentication or statement access may be unavailable.",
},
{
  id: "orico",
  name: "Orico Card",
  url: "https://www.orico.co.jp",
  category: "payments_finance",
  serviceNote: "Member login or payment confirmation may fail.",
},
{
  id: "passport-status",
  name: "Passport Application Status",
  url: "https://www.mofa.go.jp/mofaj/toko/passport/",
  category: "government_public",
  serviceNote: "Application status lookup may be unavailable during peak periods.",
},
{
  id: "immigration-residence-online",
  name: "Residence Status Online Application",
  url: "https://www.moj.go.jp/isa/online/",
  category: "government_public",
  serviceNote: "Online application and tracking may fail during maintenance.",
},

{
  id: "japan-pension-benefit",
  name: "Pension Benefit Procedures",
  url: "https://www.nenkin.go.jp/service/",
  category: "government_public",
  serviceNote: "Benefit claim pages may be inaccessible near payment deadlines.",
},

{
  id: "childcare-application",
  name: "Childcare Facility Application Portal",
  url: "https://www.cfa.go.jp/policies/childcare/",
  category: "government_public",
  serviceNote: "Applications may fail near municipal deadlines.",
},

{
  id: "high-school-exam-results",
  name: "High School Entrance Exam Results",
  url: "https://www.mext.go.jp",
  category: "education_exam",
  serviceNote: "Result announcement pages may be inaccessible during release windows.",
},
{
  id: "national-medical-exam",
  name: "National Medical Examination Portal",
  url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000188411.html",
  category: "education_exam",
  serviceNote: "Exam result pages may load slowly or fail during peak access.",
},

{
  id: "city-bank-atm-network",
  name: "City Bank ATM Network",
  url: "https://www.zenginkyo.or.jp/abstract/efforts/system/",
  category: "payments_finance",
  serviceNote: "ATM availability information may lag during system disruptions.",
},
{
  id: "bank-authentication",
  name: "Online Banking Authentication Systems",
  url: "https://www.zenginkyo.or.jp",
  category: "payments_finance",
  serviceNote: "Authentication failures may occur even if bank sites are reachable.",
},

{
  id: "chugoku-gas",
  name: "Chugoku Gas",
  url: "https://www.chugokugas.co.jp",
  category: "government_public",
  serviceNote: "Service interruption notices may be delayed during incidents.",
},
{
  id: "toho-gas",
  name: "Toho Gas",
  url: "https://www.tohogas.co.jp",
  category: "government_public",
  serviceNote: "Maintenance and outage pages may be temporarily unavailable.",
},

{
  id: "prefecture-disaster-info",
  name: "Prefectural Disaster Information",
  url: "https://www.bousai.go.jp",
  category: "government_public",
  serviceNote: "Local disaster updates may lag during emergencies.",
},

{
  id: "school-lunch-system",
  name: "School Lunch Payment System",
  url: "https://www.mext.go.jp",
  category: "education_exam",
  serviceNote: "Payment or confirmation pages may be unavailable.",
},

{
  id: "municipal-online-services",
  name: "Municipal Online Services",
  url: "https://www.digital.go.jp",
  category: "government_public",
  serviceNote: "Online applications may fail during high-traffic periods.",
},

{
  id: "regional-tax-payment",
  name: "Regional Tax Payment Portal",
  url: "https://www.soumu.go.jp",
  category: "government_public",
  serviceNote: "Payment confirmation pages may not load near deadlines.",
},

{
  id: "housing-registration",
  name: "Housing Registration System",
  url: "https://www.mlit.go.jp",
  category: "government_public",
  serviceNote: "Registration or lookup pages may be temporarily unavailable.",
},

{
  id: "medical-insurance-qualification",
  name: "Health Insurance Qualification Check",
  url: "https://www.mhlw.go.jp",
  category: "government_public",
  serviceNote: "Eligibility confirmation may fail during system updates.",
},

{
  id: "disaster-evacuation-info",
  name: "Evacuation Information System",
  url: "https://www.bousai.go.jp/taisaku/",
  category: "government_public",
  serviceNote: "Evacuation guidance pages may not update in real time.",
},

{
  id: "regional-water-service",
  name: "Regional Water Utility Services",
  url: "https://www.mlit.go.jp/mizukokudo/",
  category: "government_public",
  serviceNote: "Outage and maintenance information may be delayed.",
},

{
  id: "exam-application-portal",
  name: "National Exam Application Portal",
  url: "https://www.mext.go.jp",
  category: "education_exam",
  serviceNote: "Application submissions may fail near deadlines.",
},





];

export function getSiteById(id: string): SiteConfig | undefined {
  return STATUS_SITES.find((s) => s.id === id);
}

/** UI用：カテゴリ順（表示順を固定したい場合に使う） */
export const CATEGORY_ORDER: SiteCategory[] = [
  "search_portal",
  "social_messaging",
  "streaming_media",
  "ecommerce_marketplace",
  "payments_finance",
  "cloud_devops",
  "productivity_saas",
  "telecom_isp",
  "government_public",
  "transport_travel",
  "education_exam",
];

/** UI用：カテゴリ別にまとめる */
export function getSitesByCategory(): Record<SiteCategory, SiteConfig[]> {
  const map = Object.keys(SITE_CATEGORIES).reduce((acc, k) => {
    acc[k as SiteCategory] = [];
    return acc;
  }, {} as Record<SiteCategory, SiteConfig[]>);

  for (const s of STATUS_SITES) map[s.category].push(s);

  // ついでに表示を安定化（名前順）
  for (const k of Object.keys(map) as SiteCategory[]) {
    map[k].sort((a, b) => a.name.localeCompare(b.name, "ja"));
  }
  return map;
}

/** UI用：カテゴリ件数 */
export function getCategoryCounts(): Record<SiteCategory, number> {
  const grouped = getSitesByCategory();
  const counts = {} as Record<SiteCategory, number>;
  for (const k of Object.keys(grouped) as SiteCategory[]) counts[k] = grouped[k].length;
  return counts;
}

/** UI用：実際に使われているカテゴリだけ返す（空カテゴリを非表示にしたい場合） */
export function getAllCategoriesInUse(): SiteCategory[] {
  const counts = getCategoryCounts();
  return CATEGORY_ORDER.filter((c) => counts[c] > 0);
}
