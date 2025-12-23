// lib/statusSites.ts

export type SiteConfig = {
  /** URL slug & stable identifier (SEO-critical) */
  id: string;

  /** 表示名（日本語・公式表記） */
  name: string;

  /** 実際に接続チェックするURL */
  url: string;

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
    officialStatusUrl: "https://status.rakuten.co.jp/",
    supportUrl: "https://ichiba.faq.rakuten.net/",
    serviceNote:
      "決済や注文履歴の表示に問題が出るケースが多く、アプリのみ影響する障害も報告されています。",
  },
  {
    id: "amazon-jp",
    name: "Amazon.co.jp",
    url: "https://www.amazon.co.jp",
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
    officialStatusUrl: "https://www.google.com/appsstatus/dashboard/",
    supportUrl: "https://support.google.com/youtube/",
    serviceNote:
      "動画の読み込み不良やライブ配信のみ視聴できないなど、機能限定の障害が発生することがあります。",
  },
  {
    id: "twitter",
    name: "X（旧Twitter）",
    url: "https://twitter.com",
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
    officialStatusUrl: "https://metastatus.com/instagram",
    supportUrl: "https://help.instagram.com/",
    serviceNote:
      "投稿・ストーリーズ・DM のいずれかのみが利用できない障害が発生することがあります。",
  },
  {
    id: "line",
    name: "LINE",
    url: "https://line.me",
    officialStatusUrl: "https://line-status.github.io/",
    supportUrl: "https://help.line.me/",
    serviceNote:
      "メッセージ送信は可能でも通話やスタンプ購入が利用できないなど、機能限定の障害が起きやすいです。",
  },
  {
    id: "mercari",
    name: "メルカリ",
    url: "https://www.mercari.com/jp/",
    officialStatusUrl: "https://help.jp.mercari.com/guide/articles/865/",
    supportUrl: "https://help.jp.mercari.com/",
    serviceNote:
      "検索や出品は可能でも、購入手続きや支払い処理が正常に完了しない障害が発生することがあります。",
  },
  {
    id: "paypay",
    name: "PayPay",
    url: "https://paypay.ne.jp",
    officialStatusUrl: "https://www.paypay.ne.jp/notice/",
    supportUrl: "https://paypay.ne.jp/help/",
    serviceNote:
      "決済エラーや残高反映の遅延など、支払い関連に限定した障害が発生するケースが多いです。",
  },

  /* ===== 新規追加（未着手サービス） ===== */

  {
    id: "discord",
    name: "Discord",
    url: "https://discord.com",
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
    officialStatusUrl: "https://www.apple.com/jp/support/systemstatus/",
    supportUrl: "https://support.apple.com/ja-jp",
    serviceNote:
      "iCloud 同期、App Store ダウンロード、サインイン周りなど、特定サービスのみ影響を受ける障害が発生することがあります。",
    aliases: ["アップル", "iCloud", "App Store"],
  },
  {
    id: "mynaportal",
    name: "マイナポータル",
    url: "https://myna.go.jp",
    officialStatusUrl: "https://www.digital.go.jp/policies/mynaportal",
    supportUrl: "https://myna.go.jp/help",
    serviceNote:
      "ログイン不可や申請手続きが途中で止まるなど、利用集中時に障害が発生することがあります。",
  },
    {
    id: "icloud",
    name: "iCloud",
    url: "https://www.icloud.com",
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
    officialStatusUrl: "https://www.apple.com/jp/support/systemstatus/",
    supportUrl: "https://support.apple.com/ja-jp/apps",
    serviceNote:
      "アプリの検索やダウンロードが進まない、更新が失敗するなどの障害が発生することがあります。",
  },
  {
    id: "netflix",
    name: "Netflix",
    url: "https://www.netflix.com/jp/",
    officialStatusUrl: "https://help.netflix.com/ja/node/13243",
    supportUrl: "https://help.netflix.com/ja/",
    serviceNote:
      "動画が再生できない、プロフィール切替ができないなど、視聴関連に限定した障害が起きることがあります。",
  },
  {
    id: "spotify",
    name: "Spotify",
    url: "https://www.spotify.com/jp/",
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
    officialStatusUrl: "https://status.zoom.us/",
    supportUrl: "https://support.zoom.com/",
    serviceNote:
      "会議への接続不可、音声が途切れるなど、地域や時間帯限定の障害が発生することがあります。",
  },
  {
    id: "microsoft-365",
    name: "Microsoft 365",
    url: "https://www.microsoft.com/ja-jp/microsoft-365",
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
    officialStatusUrl: "https://portal.office.com/servicestatus",
    supportUrl: "https://support.microsoft.com/ja-jp/teams",
    serviceNote:
      "チャット送信遅延や会議への接続失敗など、リアルタイム機能に影響が出ることがあります。",
  },
  {
    id: "onedrive",
    name: "OneDrive",
    url: "https://onedrive.live.com/",
    officialStatusUrl: "https://portal.office.com/servicestatus",
    supportUrl: "https://support.microsoft.com/ja-jp/onedrive",
    serviceNote:
      "ファイル同期が止まる、アップロードが完了しないなどの障害が発生することがあります。",
  },
  {
    id: "suica",
    name: "Suica",
    url: "https://www.jreast.co.jp/suica/",
    officialStatusUrl: "https://www.jreast.co.jp/press/",
    supportUrl: "https://www.jreast.co.jp/suica/support/",
    serviceNote:
      "モバイルSuicaのチャージや決済が利用できないなど、利用集中時に障害が発生することがあります。",
  },
  {
    id: "jr-east",
    name: "JR東日本",
    url: "https://www.jreast.co.jp/",
    officialStatusUrl: "https://www.jreast.co.jp/press/",
    supportUrl: "https://www.jreast.co.jp/info/",
    serviceNote:
      "公式サイトは表示されても、運行情報ページのみアクセスしづらくなることがあります。",
  },
    // ===== Additional services (batch: NEW ONLY) =====
  {
    id: "cloudflare",
    name: "Cloudflare",
    url: "https://www.cloudflare.com",
    officialStatusUrl: "https://www.cloudflarestatus.com/",
    supportUrl: "https://support.cloudflare.com/",
    serviceNote:
      "DNS・CDN・WAF など基盤系のため、影響は多数サイトに連鎖的に出ることがあります。",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com",
    officialStatusUrl: "https://www.githubstatus.com/",
    supportUrl: "https://support.github.com/",
    serviceNote:
      "リポジトリ閲覧は可能でも、push・Actions・ログインのみ失敗する障害が発生することがあります。",
  },
  {
    id: "aws",
    name: "AWS",
    url: "https://aws.amazon.com",
    officialStatusUrl: "https://health.aws.amazon.com/health/status",
    supportUrl: "https://aws.amazon.com/support/",
    serviceNote:
      "リージョン単位での障害が多く、特定サービスのみ影響するケースが一般的です。",
  },
  {
    id: "gcp",
    name: "Google Cloud",
    url: "https://cloud.google.com",
    officialStatusUrl: "https://status.cloud.google.com/",
    supportUrl: "https://cloud.google.com/support",
    serviceNote:
      "API・Compute・Storage など個別サービス単位で障害が発生することがあります。",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    url: "https://azure.microsoft.com",
    officialStatusUrl: "https://status.azure.com/",
    supportUrl: "https://azure.microsoft.com/support/",
    serviceNote:
      "サブスクリプションやリージョン依存の障害として現れることがあります。",
  },
  {
    id: "openai",
    name: "OpenAI",
    url: "https://www.openai.com",
    officialStatusUrl: "https://status.openai.com/",
    supportUrl: "https://help.openai.com/",
    serviceNote:
      "API は利用可能でも、Chat 機能のみ遅延・制限されるケースがあります。",
  },
  {
    id: "vercel",
    name: "Vercel",
    url: "https://vercel.com",
    officialStatusUrl: "https://www.vercel-status.com/",
    supportUrl: "https://vercel.com/support",
    serviceNote:
      "ビルドやデプロイのみ失敗し、既存サイト表示は継続する障害が発生することがあります。",
  },
  {
    id: "netlify",
    name: "Netlify",
    url: "https://www.netlify.com",
    officialStatusUrl: "https://www.netlifystatus.com/",
    supportUrl: "https://www.netlify.com/support/",
    serviceNote:
      "管理画面は正常でも、デプロイやフォーム機能のみ影響を受ける場合があります。",
  },
  {
    id: "notion",
    name: "Notion",
    url: "https://www.notion.so",
    officialStatusUrl: "https://status.notion.so/",
    supportUrl: "https://www.notion.so/help",
    serviceNote:
      "閲覧は可能でも、編集や同期が遅延するケースが報告されています。",
  },
  {
    id: "slack",
    name: "Slack",
    url: "https://slack.com",
    officialStatusUrl: "https://status.slack.com/",
    supportUrl: "https://slack.com/help",
    serviceNote:
      "メッセージ送信や通知のみ遅延し、UI は表示されることがあります。",
  },
  {
    id: "stripe",
    name: "Stripe",
    url: "https://stripe.com",
    officialStatusUrl: "https://status.stripe.com/",
    supportUrl: "https://support.stripe.com/",
    serviceNote:
      "決済は成功しても、ダッシュボード反映が遅れる障害が発生することがあります。",
  },
  {
    id: "paypal",
    name: "PayPal",
    url: "https://www.paypal.com",
    officialStatusUrl: "https://www.paypal-status.com/",
    supportUrl: "https://www.paypal.com/support",
    serviceNote:
      "送金・支払い処理のみ影響を受け、ログインは可能なケースがあります。",
  },
  {
    id: "zoom",
    name: "Zoom",
    url: "https://zoom.us",
    officialStatusUrl: "https://status.zoom.us/",
    supportUrl: "https://support.zoom.us/",
    serviceNote:
      "会議参加は可能でも、録画やチャット機能のみ障害が出ることがあります。",
  },
  {
    id: "twitch",
    name: "Twitch",
    url: "https://www.twitch.tv",
    officialStatusUrl: "https://status.twitch.tv/",
    supportUrl: "https://help.twitch.tv/",
    serviceNote:
      "視聴は可能でも配信開始やチャット機能のみ影響することがあります。",
  },
  {
    id: "steam",
    name: "Steam",
    url: "https://store.steampowered.com",
    officialStatusUrl: "https://steamstat.us/",
    supportUrl: "https://help.steampowered.com/",
    serviceNote:
      "ストアは表示されてもログインやゲーム接続のみ失敗する障害が発生します。",
  },
  {
    id: "dropbox",
    name: "Dropbox",
    url: "https://www.dropbox.com",
    officialStatusUrl: "https://status.dropbox.com/",
    supportUrl: "https://help.dropbox.com/",
    serviceNote:
      "同期のみ遅延し、Web 版操作は可能なケースがあります。",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    url: "https://www.salesforce.com",
    officialStatusUrl: "https://status.salesforce.com/",
    supportUrl: "https://help.salesforce.com/",
    serviceNote:
      "特定インスタンス単位での障害が多く、全体停止は稀です。",
  },
  {
    id: "jira",
    name: "Jira",
    url: "https://www.atlassian.com/software/jira",
    officialStatusUrl: "https://status.atlassian.com/",
    supportUrl: "https://support.atlassian.com/",
    serviceNote:
      "閲覧は可能でも更新・通知処理のみ影響するケースがあります。",
  },
  {
    id: "confluence",
    name: "Confluence",
    url: "https://www.atlassian.com/software/confluence",
    officialStatusUrl: "https://status.atlassian.com/",
    supportUrl: "https://support.atlassian.com/",
    serviceNote:
      "検索や編集のみが失敗し、表示は継続する障害が報告されています。",
  },
    {
    id: "docomo",
    name: "NTTドコモ",
    url: "https://www.docomo.ne.jp",
    officialStatusUrl: "https://www.docomo.ne.jp/info/notice/",
    supportUrl: "https://www.docomo.ne.jp/support/",
    serviceNote:
      "通信障害や音声通話・データ通信のみ影響を受けるケースがあります。",
  },
  {
    id: "au",
    name: "au（KDDI）",
    url: "https://www.au.com",
    officialStatusUrl: "https://www.au.com/information/",
    supportUrl: "https://www.au.com/support/",
    serviceNote:
      "大規模障害時は通話・SMS・データ通信が同時に利用できなくなることがあります。",
  },
  {
    id: "softbank",
    name: "ソフトバンク",
    url: "https://www.softbank.jp",
    officialStatusUrl: "https://www.softbank.jp/mobile/info/personal/important/",
    supportUrl: "https://www.softbank.jp/support/",
    serviceNote:
      "モバイル通信や一部エリア限定で障害が発生することがあります。",
  },
  {
    id: "rakuten-mobile",
    name: "楽天モバイル",
    url: "https://network.mobile.rakuten.co.jp",
    officialStatusUrl: "https://network.mobile.rakuten.co.jp/information/",
    supportUrl: "https://network.mobile.rakuten.co.jp/support/",
    serviceNote:
      "通信品質低下や圏外になるなど、地域差のある障害が報告されます。",
  },
  {
    id: "nuro",
    name: "NURO光",
    url: "https://www.nuro.jp",
    officialStatusUrl: "https://www.nuro.jp/notice/",
    supportUrl: "https://www.nuro.jp/support/",
    serviceNote:
      "特定エリアで通信断や速度低下が発生するケースがあります。",
  },
    {
    id: "mufg",
    name: "三菱UFJ銀行",
    url: "https://www.bk.mufg.jp",
    officialStatusUrl: "https://www.bk.mufg.jp/news/index.html",
    supportUrl: "https://www.bk.mufg.jp/support/",
    serviceNote:
      "インターネットバンキングや振込処理のみ利用できない障害が発生することがあります。",
  },
  {
    id: "smbc",
    name: "三井住友銀行",
    url: "https://www.smbc.co.jp",
    officialStatusUrl: "https://www.smbc.co.jp/notice/",
    supportUrl: "https://www.smbc.co.jp/support/",
    serviceNote:
      "SMBCダイレクトへのログイン不可や残高反映遅延が起きることがあります。",
  },
  {
    id: "mizuho",
    name: "みずほ銀行",
    url: "https://www.mizuhobank.co.jp",
    officialStatusUrl: "https://www.mizuhobank.co.jp/notification/",
    supportUrl: "https://www.mizuhobank.co.jp/support/",
    serviceNote:
      "過去に大規模障害があり、振込・ATM連携に影響が出ることがあります。",
  },
  {
    id: "japan-post-bank",
    name: "ゆうちょ銀行",
    url: "https://www.jp-bank.japanpost.jp",
    officialStatusUrl: "https://www.jp-bank.japanpost.jp/oshirase/",
    supportUrl: "https://www.jp-bank.japanpost.jp/support/",
    serviceNote:
      "オンラインサービスや送金処理が停止するケースがあります。",
  },
  {
    id: "line-pay",
    name: "LINE Pay",
    url: "https://linepay.line.me",
    officialStatusUrl: "https://linepay.line.me/notice",
    supportUrl: "https://help.line.me/linepay/",
    serviceNote:
      "決済エラーや残高反映遅延など、支払い関連の障害が発生することがあります。",
  },
    {
    id: "e-tax",
    name: "e-Tax",
    url: "https://www.e-tax.nta.go.jp",
    officialStatusUrl: "https://www.e-tax.nta.go.jp/topics/index.htm",
    supportUrl: "https://www.e-tax.nta.go.jp/toiawase/",
    serviceNote:
      "申告期限前にアクセス集中で利用できなくなることがあります。",
  },
  {
    id: "nenkin-net",
    name: "ねんきんネット",
    url: "https://www.nenkin.go.jp/n_net/",
    officialStatusUrl: "https://www.nenkin.go.jp/oshirase/",
    supportUrl: "https://www.nenkin.go.jp/inquiry/",
    serviceNote:
      "ログインや情報表示が不安定になることがあります。",
  },
  {
    id: "hello-work",
    name: "ハローワークインターネットサービス",
    url: "https://www.hellowork.mhlw.go.jp",
    officialStatusUrl: "https://www.mhlw.go.jp/stf/shingi/index.html",
    supportUrl: "https://www.hellowork.mhlw.go.jp/member/",
    serviceNote:
      "求人検索や応募機能のみ利用できない障害が発生することがあります。",
  },
  {
    id: "my-number",
    name: "マイナンバーカード",
    url: "https://www.kojinbango-card.go.jp",
    officialStatusUrl: "https://www.digital.go.jp/news",
    supportUrl: "https://www.kojinbango-card.go.jp/contact/",
    serviceNote:
      "認証や連携サービスで障害が発生するケースがあります。",
  },
  {
    id: "covid-vaccine",
    name: "新型コロナワクチン接種システム",
    url: "https://www.cov19-vaccine.mhlw.go.jp",
    officialStatusUrl: "https://www.mhlw.go.jp/stf/index.html",
    supportUrl: "https://www.mhlw.go.jp/contact/",
    serviceNote:
      "予約システムが利用集中で停止することがあります。",
  },
    {
    id: "jr-west",
    name: "JR西日本",
    url: "https://www.westjr.co.jp",
    officialStatusUrl: "https://www.westjr.co.jp/press/",
    supportUrl: "https://www.westjr.co.jp/guide/",
    serviceNote:
      "列車運行情報や予約関連ページがアクセス集中で不安定になることがあります。",
  },
  {
    id: "jr-central",
    name: "JR東海",
    url: "https://jr-central.co.jp",
    officialStatusUrl: "https://jr-central.co.jp/news/",
    supportUrl: "https://jr-central.co.jp/support/",
    serviceNote:
      "新幹線の運行情報やエクスプレス予約のみ影響を受けるケースがあります。",
  },
  {
    id: "ana",
    name: "ANA（全日本空輸）",
    url: "https://www.ana.co.jp",
    officialStatusUrl: "https://www.ana.co.jp/notice/",
    supportUrl: "https://www.ana.co.jp/ja/jp/support/",
    serviceNote:
      "予約・チェックイン・マイル関連機能のみ利用できない障害が発生することがあります。",
  },
  {
    id: "jal",
    name: "JAL（日本航空）",
    url: "https://www.jal.co.jp",
    officialStatusUrl: "https://www.jal.co.jp/jp/ja/info/",
    supportUrl: "https://www.jal.co.jp/jp/ja/support/",
    serviceNote:
      "予約変更やオンラインチェックインが利用できないケースがあります。",
  },
  {
    id: "ekinet",
    name: "えきねっと",
    url: "https://www.eki-net.com",
    officialStatusUrl: "https://www.jreast.co.jp/press/",
    supportUrl: "https://www.eki-net.com/support/",
    serviceNote:
      "指定席予約やログイン処理が集中時に失敗することがあります。",
  },
    {
    id: "shopify",
    name: "Shopify",
    url: "https://www.shopify.com/jp",
    officialStatusUrl: "https://www.shopifystatus.com/",
    supportUrl: "https://help.shopify.com/ja",
    serviceNote:
      "管理画面は表示されても、決済やチェックアウトのみ影響を受けることがあります。",
  },
  {
    id: "base",
    name: "BASE",
    url: "https://thebase.in",
    officialStatusUrl: "https://thebase.in/news",
    supportUrl: "https://help.thebase.in",
    serviceNote:
      "商品購入や決済処理が一時的に利用できなくなることがあります。",
  },
  {
    id: "stores",
    name: "STORES",
    url: "https://stores.jp",
    officialStatusUrl: "https://stores.jp/news",
    supportUrl: "https://support.stores.jp",
    serviceNote:
      "ショップ管理画面や注文処理が不安定になるケースがあります。",
  },
  {
    id: "makeshop",
    name: "MakeShop",
    url: "https://www.makeshop.jp",
    officialStatusUrl: "https://www.makeshop.jp/main/news/",
    supportUrl: "https://www.makeshop.jp/main/support/",
    serviceNote:
      "管理画面へのログインや注文処理に影響が出ることがあります。",
  },
  {
    id: "ec-cube",
    name: "EC-CUBE",
    url: "https://www.ec-cube.net",
    officialStatusUrl: "https://www.ec-cube.net/news/",
    supportUrl: "https://www.ec-cube.net/support/",
    serviceNote:
      "管理画面やプラグイン連携に起因する障害が報告されることがあります。",
  },
    {
    id: "epic-games",
    name: "Epic Games",
    url: "https://www.epicgames.com",
    officialStatusUrl: "https://status.epicgames.com/",
    supportUrl: "https://www.epicgames.com/help/",
    serviceNote:
      "ログインやストア購入のみ影響を受け、ゲーム起動は可能な場合があります。",
  },
  {
    id: "xbox-live",
    name: "Xbox Live",
    url: "https://www.xbox.com",
    officialStatusUrl: "https://support.xbox.com/xbox-live-status",
    supportUrl: "https://support.xbox.com/",
    serviceNote:
      "オンライン対戦やフレンド機能のみ利用できない障害が発生することがあります。",
  },
  {
    id: "battle-net",
    name: "Battle.net",
    url: "https://www.blizzard.com",
    officialStatusUrl: "https://twitter.com/BlizzardCS",
    supportUrl: "https://support.blizzard.com/",
    serviceNote:
      "ログインやマッチングのみ影響を受けるケースがあります。",
  },
  {
    id: "genshin-impact",
    name: "原神",
    url: "https://genshin.hoyoverse.com/ja",
    officialStatusUrl: "https://www.hoyolab.com/",
    supportUrl: "https://www.hoyoverse.com/ja-jp/support",
    serviceNote:
      "サーバーメンテナンスやログイン不可が定期的に発生します。",
  },
  {
    id: "pokemon-home",
    name: "Pokémon HOME",
    url: "https://home.pokemon.com/ja-jp/",
    officialStatusUrl: "https://www.pokemon.co.jp/info/",
    supportUrl: "https://www.pokemon-support.com/",
    serviceNote:
      "連携やログイン処理のみ失敗する障害が発生することがあります。",
  },
    {
    id: "visa",
    name: "Visa",
    url: "https://www.visa.co.jp",
    officialStatusUrl: "https://www.visa.co.jp/run-your-business/small-business-tools/operational-resilience.html",
    supportUrl: "https://www.visa.co.jp/contact-us.html",
    serviceNote:
      "加盟店決済は可能でも、認証や一部カード取引のみ失敗することがあります。",
  },
  {
    id: "mastercard",
    name: "Mastercard",
    url: "https://www.mastercard.co.jp",
    officialStatusUrl: "https://www.mastercard.us/en-us/business/overview/what-we-do/operational-resilience.html",
    supportUrl: "https://www.mastercard.co.jp/ja-jp/consumers/get-support.html",
    serviceNote:
      "決済ネットワークの一部処理が遅延し、特定加盟店のみ影響を受けるケースがあります。",
  },
  {
    id: "jcb",
    name: "JCB",
    url: "https://www.jcb.co.jp",
    officialStatusUrl: "https://www.jcb.co.jp/information/",
    supportUrl: "https://www.jcb.co.jp/support/",
    serviceNote:
      "オンライン決済や本人認証（3Dセキュア）のみ失敗することがあります。",
  },
  {
    id: "amex",
    name: "American Express",
    url: "https://www.americanexpress.com/jp",
    officialStatusUrl: "https://www.americanexpress.com/jp/content/service-updates.html",
    supportUrl: "https://www.americanexpress.com/jp/customer-service/",
    serviceNote:
      "カード決済は可能でも、明細反映やアプリ表示が遅延するケースがあります。",
  },
  {
    id: "rakuten-card",
    name: "楽天カード",
    url: "https://www.rakuten-card.co.jp",
    officialStatusUrl: "https://www.rakuten-card.co.jp/info/",
    supportUrl: "https://www.rakuten-card.co.jp/customer-support/",
    serviceNote:
      "ログイン不可や利用明細の反映遅延が発生することがあります。",
  },
  {
    id: "prime-video",
    name: "Amazon Prime Video",
    url: "https://www.amazon.co.jp/Prime-Video",
    officialStatusUrl: "https://health.aws.amazon.com/health/status",
    supportUrl: "https://www.amazon.co.jp/gp/help/customer/display.html",
    serviceNote:
      "視聴は可能でも、検索や再生開始が遅延するケースがあります。",
  },
  {
    id: "abema",
    name: "ABEMA",
    url: "https://abema.tv",
    officialStatusUrl: "https://help.abema.tv/hc/ja/articles/360044138231",
    supportUrl: "https://help.abema.tv/",
    serviceNote:
      "生放送視聴やコメント機能のみ影響を受けることがあります。",
  },
  {
    id: "hulu-jp",
    name: "Hulu（日本）",
    url: "https://www.hulu.jp",
    officialStatusUrl: "https://help.hulu.jp/hc/ja/articles/360049898093",
    supportUrl: "https://help.hulu.jp/",
    serviceNote:
      "ログインや再生のみ失敗し、アプリ別に影響が出るケースがあります。",
  },
  {
    id: "u-next",
    name: "U-NEXT",
    url: "https://video.unext.jp",
    officialStatusUrl: "https://help.unext.jp/",
    supportUrl: "https://help.unext.jp/",
    serviceNote:
      "再生開始や購入処理が一時的に利用できなくなることがあります。",
  },
    {
    id: "kyotsu-test",
    name: "大学入学共通テスト",
    url: "https://www.dnc.ac.jp",
    officialStatusUrl: "https://www.dnc.ac.jp/news/",
    supportUrl: "https://www.dnc.ac.jp/contact/",
    serviceNote:
      "成績照会や関連ページが試験期間中に不安定になることがあります。",
  },
  {
    id: "toeic",
    name: "TOEIC",
    url: "https://www.iibc-global.org",
    officialStatusUrl: "https://www.iibc-global.org/iibc/information/",
    supportUrl: "https://www.iibc-global.org/iibc/contact/",
    serviceNote:
      "申込やログイン処理が締切前に集中して失敗することがあります。",
  },
  {
    id: "eiken",
    name: "英検",
    url: "https://www.eiken.or.jp",
    officialStatusUrl: "https://www.eiken.or.jp/eiken/info/",
    supportUrl: "https://www.eiken.or.jp/eiken/contact/",
    serviceNote:
      "申込ページや合否確認のみ影響を受けるケースがあります。",
  },
  {
    id: "studysapuri",
    name: "スタディサプリ",
    url: "https://studysapuri.jp",
    officialStatusUrl: "https://studysapuri.jp/info/",
    supportUrl: "https://studysapuri.jp/support/",
    serviceNote:
      "動画視聴やログインが不安定になることがあります。",
  },
  {
    id: "manaba",
    name: "manaba",
    url: "https://manaba.jp",
    officialStatusUrl: "https://manaba.jp/faq/",
    supportUrl: "https://manaba.jp/faq/",
    serviceNote:
      "大学授業開始時間帯にアクセス集中で利用しづらくなることがあります。",
  },
  {
    id: "nta",
    name: "国税庁",
    url: "https://www.nta.go.jp",
    officialStatusUrl: "https://www.nta.go.jp/information/",
    supportUrl: "https://www.nta.go.jp/contact/",
    serviceNote:
      "各種手続きページのみ不安定になるケースがあります。",
  },
  {
    id: "city-office",
    name: "自治体オンライン手続き",
    url: "https://www.digital.go.jp",
    officialStatusUrl: "https://www.digital.go.jp/news",
    supportUrl: "https://www.digital.go.jp/contact",
    serviceNote:
      "住民票・各種申請サービスが利用集中で停止することがあります。",
  },





];




export function getSiteById(id: string): SiteConfig | undefined {
  return STATUS_SITES.find((s) => s.id === id);
}
