export function classifyHttpResponse(status) {
  const probeBlocked = [401, 403, 405, 429].includes(status);
  if (probeBlocked) {
    return { outcome: "blocked", reachable: true, online: false, probeBlocked };
  }
  if (status >= 200 && status < 300) {
    return { outcome: "success", reachable: true, online: true, probeBlocked };
  }
  return { outcome: "http_error", reachable: true, online: false, probeBlocked };
}

function errorDetails(error, seen = new Set()) {
  if (!error || seen.has(error)) return "";
  if (typeof error === "string") return error;
  if (typeof error !== "object") return String(error);
  seen.add(error);
  const value = error;
  return [value.name, value.code, value.message, errorDetails(value.cause, seen)]
    .filter(Boolean)
    .join(" ");
}

export function classifyProbeError(error) {
  const text = errorDetails(error).toLowerCase();
  if (text.includes("private destination")) return "blocked_destination";
  if (text.includes("too many redirects")) return "redirect_loop";
  if (text.includes("url too long") || text.includes("unsupported protocol") || text.includes("invalid url")) return "invalid_url";
  if (/enotfound|eai_again|getaddrinfo|nxdomain|servfail|enodata|name resolution/.test(text)) return "dns";
  if (/certificate|cert_|ssl|tls|unable_to_verify|self_signed|altname/.test(text)) return "tls";
  if (/econnrefused|connection refused/.test(text)) return "connection_refused";
  if (/econnreset|connection reset|und_err_socket|socket hang up/.test(text)) return "connection_reset";
  if (/aborterror|timeout|timed out|headers timeout|connect timeout/.test(text)) return "timeout";
  return "unknown";
}

export function errorMessage(errorType) {
  const messages = {
    dns: "ドメインの名前解決に失敗しました。DNS設定やドメイン名を確認してください。",
    tls: "安全な接続を確立できませんでした。証明書またはTLS設定を確認してください。",
    connection_refused: "接続先サーバーに接続を拒否されました。",
    connection_reset: "接続先との通信が途中で切断されました。",
    timeout: "接続先から時間内に応答がありませんでした。",
    redirect_loop: "リダイレクトが繰り返され、最終ページを確認できませんでした。",
    blocked_destination: "安全上の理由により、この接続先は確認できません。",
    invalid_url: "有効なHTTPまたはHTTPSのURLを指定してください。",
    rate_limited: "短時間の確認回数が上限に達しました。1分ほど待って再度お試しください。",
    unknown: "外部サーバーから接続を完了できませんでした。時間をおいて再度お試しください。",
  };
  return messages[errorType] ?? messages.unknown;
}
