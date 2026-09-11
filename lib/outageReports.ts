export const REPORTING_SERVICE_IDS = [
  "teams",
  "twitter",
  "notion",
  "steam",
  "line",
  "netflix",
  "prime-video",
  "youtube",
  "instagram",
  "openai",
  "discord",
  "slack",
  "zoom",
  "google",
  "paypay",
  "amazon-jp",
  "yahoo-japan",
  "microsoft-365",
  "u-next",
  "jalan",
  "rakuten-pay",
  "line-works",
  "roblox",
  "abema",
] as const;

export type ReportingServiceId = (typeof REPORTING_SERVICE_IDS)[number];

const REPORTING_SERVICE_LABELS: Record<ReportingServiceId, string> = {
  teams: "Microsoft Teams",
  twitter: "X（旧Twitter）",
  notion: "Notion",
  steam: "Steam",
  line: "LINE",
  netflix: "Netflix",
  "prime-video": "Amazon Prime Video",
  youtube: "YouTube",
  instagram: "Instagram",
  openai: "ChatGPT",
  discord: "Discord",
  slack: "Slack",
  zoom: "Zoom",
  google: "Google",
  paypay: "PayPay",
  "amazon-jp": "Amazon.co.jp",
  "yahoo-japan": "Yahoo! JAPAN",
  "microsoft-365": "Microsoft 365",
  "u-next": "U-NEXT",
  jalan: "じゃらん",
  "rakuten-pay": "楽天ペイ",
  "line-works": "LINE WORKS",
  roblox: "Roblox",
  abema: "ABEMA",
};

export const PROBLEM_TYPES = [
  "connection",
  "login",
  "loading",
  "meeting",
  "messaging",
  "posting",
  "payment",
  "audio_video",
  "search",
  "streaming",
  "email",
  "sync",
  "notification",
  "checkout",
  "other",
] as const;

export type ProblemType = (typeof PROBLEM_TYPES)[number];

export type ProblemOption = {
  type: ProblemType;
  label: string;
};

const SERVICE_PROBLEMS: Record<ReportingServiceId, ProblemOption[]> = {
  teams: [
    { type: "meeting", label: "会議に参加できない" },
    { type: "messaging", label: "チャットを送れない" },
    { type: "login", label: "ログインできない" },
    { type: "audio_video", label: "通話・映像がおかしい" },
    { type: "loading", label: "画面が遅い・開かない" },
    { type: "other", label: "その他" },
  ],
  twitter: [
    { type: "loading", label: "タイムラインが読めない" },
    { type: "posting", label: "投稿・更新できない" },
    { type: "messaging", label: "DMを送れない" },
    { type: "login", label: "ログインできない" },
    { type: "connection", label: "接続できない" },
    { type: "other", label: "その他" },
  ],
  notion: [
    { type: "loading", label: "ページが開かない・遅い" },
    { type: "posting", label: "編集・同期できない" },
    { type: "login", label: "ログインできない" },
    { type: "connection", label: "接続できない" },
    { type: "other", label: "その他" },
  ],
  steam: [
    { type: "login", label: "ログインできない" },
    { type: "connection", label: "Steam・ゲームサーバーに接続できない" },
    { type: "loading", label: "ストアが開かない・遅い" },
    { type: "messaging", label: "フレンド・チャットが使えない" },
    { type: "payment", label: "購入・決済できない" },
    { type: "other", label: "ダウンロード・更新が進まない" },
  ],
  line: [
    { type: "messaging", label: "メッセージを送受信できない" },
    { type: "audio_video", label: "通話・ビデオ通話ができない" },
    { type: "notification", label: "通知が来ない・遅い" },
    { type: "login", label: "ログイン・認証できない" },
    { type: "loading", label: "アプリが開かない・遅い" },
    { type: "other", label: "その他" },
  ],
  netflix: [
    { type: "streaming", label: "動画を再生できない" },
    { type: "connection", label: "Netflixに繋がらない" },
    { type: "login", label: "ログイン・アカウントに問題がある" },
    { type: "loading", label: "アプリ・画面が開かない" },
    { type: "audio_video", label: "音声・映像がおかしい" },
    { type: "other", label: "その他" },
  ],
  "prime-video": [
    { type: "streaming", label: "動画を再生できない" },
    { type: "loading", label: "作品一覧・アプリが開かない" },
    { type: "connection", label: "Prime Videoに繋がらない" },
    { type: "login", label: "ログイン・アカウントに問題がある" },
    { type: "audio_video", label: "音声・映像がおかしい" },
    { type: "other", label: "テレビ・特定端末だけ使えない" },
  ],
  youtube: [
    { type: "streaming", label: "動画を再生できない" },
    { type: "loading", label: "動画・トップページが読み込めない" },
    { type: "posting", label: "投稿・アップロードできない" },
    { type: "login", label: "ログインできない" },
    { type: "audio_video", label: "音声・映像がおかしい" },
    { type: "other", label: "その他" },
  ],
  instagram: [
    { type: "loading", label: "フィード・ストーリーズが読めない" },
    { type: "posting", label: "投稿・更新できない" },
    { type: "messaging", label: "DMを送受信できない" },
    { type: "login", label: "ログインできない" },
    { type: "notification", label: "通知が来ない・遅い" },
    { type: "other", label: "その他" },
  ],
  openai: [
    { type: "loading", label: "ChatGPTが開かない・応答しない" },
    { type: "connection", label: "エラーで接続できない" },
    { type: "login", label: "ログインできない" },
    { type: "posting", label: "メッセージを送信できない" },
    { type: "payment", label: "プラン・決済に問題がある" },
    { type: "other", label: "その他" },
  ],
  discord: [
    { type: "connection", label: "サーバーに接続できない" },
    { type: "messaging", label: "メッセージを送れない" },
    { type: "audio_video", label: "音声・ビデオ通話がおかしい" },
    { type: "login", label: "ログインできない" },
    { type: "loading", label: "画面が読み込めない・遅い" },
    { type: "other", label: "その他" },
  ],
  slack: [
    { type: "messaging", label: "メッセージを送受信できない" },
    { type: "notification", label: "通知が来ない・遅い" },
    { type: "login", label: "ログインできない" },
    { type: "search", label: "検索できない" },
    { type: "audio_video", label: "ハドル・通話がおかしい" },
    { type: "other", label: "その他" },
  ],
  zoom: [
    { type: "meeting", label: "ミーティングに参加できない" },
    { type: "audio_video", label: "音声・映像がおかしい" },
    { type: "login", label: "ログインできない" },
    { type: "connection", label: "接続が切れる・不安定" },
    { type: "loading", label: "アプリ・サイトが開かない" },
    { type: "other", label: "その他" },
  ],
  google: [
    { type: "search", label: "検索できない・結果が出ない" },
    { type: "loading", label: "Googleが開かない・遅い" },
    { type: "login", label: "Googleアカウントにログインできない" },
    { type: "connection", label: "Googleサービスに接続できない" },
    { type: "other", label: "その他" },
  ],
  "u-next": [
    { type: "streaming", label: "動画を再生できない・途中で止まる" },
    { type: "loading", label: "アプリ・画面が開かない" },
    { type: "login", label: "ログインできない" },
    { type: "payment", label: "購入・決済できない" },
    { type: "connection", label: "U-NEXTに接続できない" },
    { type: "other", label: "その他" },
  ],
  jalan: [
    { type: "search", label: "宿泊施設・プランを検索できない" },
    { type: "login", label: "ログインできない" },
    { type: "payment", label: "予約・決済を完了できない" },
    { type: "loading", label: "サイト・アプリが開かない" },
    { type: "connection", label: "じゃらんに接続できない" },
    { type: "other", label: "その他のシステムエラー" },
  ],
  "rakuten-pay": [
    { type: "payment", label: "コード・QR払いができない" },
    { type: "loading", label: "アプリ・支払いコードが開かない" },
    { type: "login", label: "ログイン・認証できない" },
    { type: "connection", label: "通信エラーになる" },
    { type: "other", label: "残高・ポイント・履歴がおかしい" },
  ],
  "line-works": [
    { type: "messaging", label: "トークを送受信できない" },
    { type: "audio_video", label: "通話・ビデオ会議ができない" },
    { type: "login", label: "ログイン・認証できない" },
    { type: "notification", label: "通知が来ない・遅い" },
    { type: "loading", label: "アプリ・管理画面が開かない" },
    { type: "connection", label: "接続できない・不安定" },
    { type: "other", label: "Drive・カレンダーなどその他" },
  ],
  roblox: [
    { type: "connection", label: "ゲーム・体験に参加できない" },
    { type: "login", label: "ログインできない" },
    { type: "loading", label: "アプリ・サイトが開かない" },
    { type: "payment", label: "Robux購入・決済できない" },
    { type: "messaging", label: "チャット・フレンド機能がおかしい" },
    { type: "other", label: "その他" },
  ],
  abema: [
    { type: "streaming", label: "動画・生放送を再生できない" },
    { type: "loading", label: "アプリ・番組ページが開かない" },
    { type: "connection", label: "ABEMAに接続できない" },
    { type: "login", label: "ログインできない" },
    { type: "messaging", label: "コメントを投稿・表示できない" },
    { type: "other", label: "その他" },
  ],
  paypay: [
    { type: "payment", label: "支払いできない" },
    { type: "loading", label: "アプリが開かない・残高が見えない" },
    { type: "login", label: "ログイン・本人確認できない" },
    { type: "connection", label: "通信エラーになる" },
    { type: "notification", label: "決済通知が来ない・遅い" },
    { type: "other", label: "その他" },
  ],
  "amazon-jp": [
    { type: "loading", label: "商品ページが開かない・遅い" },
    { type: "search", label: "商品を検索できない" },
    { type: "checkout", label: "カート・注文確定に進めない" },
    { type: "payment", label: "支払い・決済できない" },
    { type: "login", label: "ログインできない" },
    { type: "other", label: "その他" },
  ],
  "yahoo-japan": [
    { type: "loading", label: "トップページ・ニュースが開かない" },
    { type: "search", label: "検索できない" },
    { type: "login", label: "Yahoo! JAPAN IDでログインできない" },
    { type: "email", label: "Yahoo!メールを送受信できない" },
    { type: "checkout", label: "Yahoo!ショッピングで購入できない" },
    { type: "payment", label: "ヤフオクの入札・取引で問題がある" },
    { type: "connection", label: "接続できない・通信エラーになる" },
    { type: "other", label: "その他" },
  ],
  "microsoft-365": [
    { type: "login", label: "Microsoftアカウントにログインできない" },
    { type: "email", label: "Outlookメールを送受信できない" },
    { type: "sync", label: "OneDrive・Officeが同期できない" },
    { type: "meeting", label: "Teams会議・通話に問題がある" },
    { type: "loading", label: "Microsoft 365が開かない・遅い" },
    { type: "other", label: "その他" },
  ],
};

export function isReportingServiceId(value: string): value is ReportingServiceId {
  return REPORTING_SERVICE_IDS.includes(value as ReportingServiceId);
}

export function isProblemType(value: string): value is ProblemType {
  return PROBLEM_TYPES.includes(value as ProblemType);
}

export function getProblemOptions(serviceId: ReportingServiceId) {
  return SERVICE_PROBLEMS[serviceId];
}

export function getReportingServiceLabel(serviceId: ReportingServiceId) {
  return REPORTING_SERVICE_LABELS[serviceId];
}

export function isProblemTypeForService(
  serviceId: ReportingServiceId,
  type: ProblemType
) {
  return SERVICE_PROBLEMS[serviceId].some((option) => option.type === type);
}

export function getProblemLabel(serviceId: ReportingServiceId, type: ProblemType) {
  return SERVICE_PROBLEMS[serviceId].find((option) => option.type === type)?.label ?? "その他";
}
