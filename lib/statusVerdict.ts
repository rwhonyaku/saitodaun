export type VerdictCheck = {
  online: boolean;
  probeBlocked?: boolean;
  status: number | null;
  error?: string;
};

export type VerdictCommunity = {
  count: number;
  topProblem: { label: string; count: number } | null;
  signal: {
    level: "normal" | "elevated" | "spike";
    currentReporters: number;
  };
};

export type StatusVerdict = {
  level: "checking" | "normal" | "partial" | "likely" | "unknown";
  badge: string;
  main: string;
  detail: string;
  icon: string;
  cardClassName: string;
  badgeClassName: string;
  iconClassName: string;
};

const styles = {
  checking: {
    cardClassName: "border-slate-200 bg-slate-50",
    badgeClassName: "bg-slate-100 text-slate-700 ring-slate-200",
    iconClassName: "bg-slate-500 text-white",
  },
  normal: {
    cardClassName: "border-emerald-200 bg-emerald-50",
    badgeClassName: "bg-emerald-100 text-emerald-800 ring-emerald-200",
    iconClassName: "bg-emerald-600 text-white",
  },
  partial: {
    cardClassName: "border-amber-200 bg-amber-50",
    badgeClassName: "bg-amber-100 text-amber-900 ring-amber-200",
    iconClassName: "bg-amber-500 text-white",
  },
  likely: {
    cardClassName: "border-rose-200 bg-rose-50",
    badgeClassName: "bg-rose-100 text-rose-800 ring-rose-200",
    iconClassName: "bg-rose-600 text-white",
  },
  unknown: {
    cardClassName: "border-slate-300 bg-slate-50",
    badgeClassName: "bg-slate-100 text-slate-700 ring-slate-300",
    iconClassName: "bg-slate-600 text-white",
  },
} as const;

export function getStatusVerdict(
  check: VerdictCheck | null,
  checkLoading: boolean,
  community: VerdictCommunity | null
): StatusVerdict {
  if (checkLoading || !check) {
    return {
      level: "checking",
      badge: "確認中",
      main: "現在の状況を確認中です",
      detail: "接続状態と日本の利用者報告を分けて確認しています。",
      icon: "...",
      ...styles.checking,
    };
  }

  const signal = community?.signal.level;
  const symptom = community?.topProblem?.label;
  const currentReporters = community?.signal.currentReporters ?? 0;
  const checkUnknown = Boolean(check.probeBlocked || check.error || check.status == null);
  const serverFailure = !checkUnknown && !check.online && check.status != null && check.status >= 500;

  if (signal === "spike") {
    return {
      level: "likely",
      badge: "障害疑い",
      main: check.online
        ? "サイトは応答していますが、一部機能の障害報告が急増しています"
        : "障害が発生している可能性が高まっています",
      detail: `${currentReporters}人の異なる利用者から直近30分に報告があります${symptom ? `。最も多い症状は「${symptom}」です` : ""}。公式発表で影響範囲を確認してください。`,
      icon: "!",
      ...styles.likely,
    };
  }

  if (serverFailure && signal === "elevated") {
    return {
      level: "likely",
      badge: "障害疑い",
      main: "接続失敗と利用者報告の増加を検出しました",
      detail: "複数の独立した兆候がありますが、障害が公式に確認されたという意味ではありません。公式情報も確認してください。",
      icon: "!",
      ...styles.likely,
    };
  }

  if (signal === "elevated") {
    return {
      level: "partial",
      badge: "一部問題の可能性",
      main: check.online
        ? "サイトへの接続は正常ですが、一部機能の問題が報告されています"
        : "通常より利用者報告が増えています",
      detail: `${currentReporters}人の異なる利用者から報告があります${symptom ? `。最も多い症状は「${symptom}」です` : ""}。`,
      icon: "!",
      ...styles.partial,
    };
  }

  if (checkUnknown) {
    return {
      level: "unknown",
      badge: "確認不可",
      main: "接続状態を確認できませんでした",
      detail: community
        ? "利用者報告の急増は検出されていませんが、接続チェックだけでは判定できません。"
        : "自動チェックが制限されている可能性があります。ブラウザでの確認と公式情報を優先してください。",
      icon: "?",
      ...styles.unknown,
    };
  }

  if (serverFailure) {
    return {
      level: "likely",
      badge: "障害疑い",
      main: "このチェックでは、障害が起きている可能性があります",
      detail: "サーバーエラーを検出しました。ただし、単一地点の接続結果であり、公式確認ではありません。",
      icon: "!",
      ...styles.likely,
    };
  }

  if (!check.online) {
    return {
      level: "partial",
      badge: "一部問題",
      main: "一部の環境で問題が起きている可能性があります",
      detail: "接続に失敗しましたが、一時的な通信エラーや地域差の可能性もあります。",
      icon: "!",
      ...styles.partial,
    };
  }

  return {
    level: "normal",
    badge: "正常稼働の目安",
    main: "現在、大きな障害を示す兆候は確認されていません",
    detail: community
      ? "サイトへの接続は正常で、日本の利用者報告も通常範囲です。一部機能や個別アカウントの問題までは判定できません。"
      : "サイトへの接続は正常です。一部機能や個別アカウントの問題までは判定できません。",
    icon: "OK",
    ...styles.normal,
  };
}
