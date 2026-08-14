export const REPORTING_SERVICE_IDS = ["teams", "twitter", "notion", "steam"] as const;

export type ReportingServiceId = (typeof REPORTING_SERVICE_IDS)[number];

export const PROBLEM_TYPES = [
  "connection",
  "login",
  "loading",
  "meeting",
  "messaging",
  "posting",
  "payment",
  "audio_video",
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
    { type: "connection", label: "サーバーに接続できない" },
    { type: "loading", label: "ストア・ダウンロードが遅い" },
    { type: "payment", label: "購入・決済できない" },
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

export function getProblemLabel(serviceId: ReportingServiceId, type: ProblemType) {
  return SERVICE_PROBLEMS[serviceId].find((option) => option.type === type)?.label ?? "その他";
}
