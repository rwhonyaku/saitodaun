export const STATUS_TO_GUIDE: Record<number, string> = {
  403: "/errors/403-forbidden",
  404: "/errors/404-not-found",
  429: "/errors/429-too-many-requests",
  500: "/errors/500-internal-server-error",
  502: "/errors/502-bad-gateway",
  503: "/errors/503-service-unavailable",
  504: "/errors/504-gateway-timeout",
};

function normalizeError(err?: string) {
  return (err ?? "").toLowerCase();
}

function isDnsishError(e: string) {
  // DNS / name resolution / host lookup failures
  return (
    e.includes("enotfound") ||
    e.includes("eai_again") ||
    e.includes("getaddrinfo") ||
    e.includes("nxdomain") ||
    e.includes("servfail") ||
    e.includes("enodata") ||
    e.includes("dns") ||
    e.includes("name resolution") ||
    e.includes("could not resolve") ||
    e.includes("resolve host") ||
    e.includes("host not found") ||
    e.includes("名前解決")
  );
}

function isSslTlsError(e: string) {
  return (
    e.includes("ssl") ||
    e.includes("tls") ||
    e.includes("certificate") ||
    e.includes("cert") ||
    e.includes("証明書")
  );
}

function isConnectionRefusedError(e: string) {
  return (
    e.includes("connection refused") ||
    e.includes("refused") ||
    e.includes("接続が拒否") ||
    e.includes("拒否され")
  );
}

function isTimeoutError(e: string) {
  return (
    e.includes("timed out") ||
    e.includes("timeout") ||
    e.includes("time out") ||
    e.includes("時間切れ") ||
    e.includes("タイムアウト")
  );
}

function isConnectionResetError(e: string) {
  return (
    e.includes("connection reset") ||
    e.includes("reset") ||
    e.includes("リセット") ||
    e.includes("切断され")
  );
}

export function getGuideHref(status: number | null | undefined) {
  if (status == null) return "/status-codes";
  return STATUS_TO_GUIDE[status] ?? "/status-codes";
}

export function getGuideHrefFromResult(opts: {
  status: number | null | undefined;
  error?: string;
}) {
  const { status, error } = opts;

  // If we have a known HTTP status, always prioritize the exact guide.
  const byStatus = getGuideHref(status);
  if (byStatus !== "/status-codes") return byStatus;

  // Only apply "no HTTP code" heuristics when status is null/undefined.
  if (status != null) return "/status-codes";

  const e = normalizeError(error);

  // DNS
  if (isDnsishError(e)) return "/troubleshooting-dns";

  // SSL / TLS
  if (isSslTlsError(e)) return "/errors/ssl-handshake-failed";

  // Connection errors
  if (isConnectionRefusedError(e)) return "/errors/err-connection-refused";
  if (isTimeoutError(e)) return "/errors/err-connection-timed-out";
  if (isConnectionResetError(e)) return "/errors/connection-reset";

  // Default hub
  return "/status-codes";
}