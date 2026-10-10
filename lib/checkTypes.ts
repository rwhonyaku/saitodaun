export type CheckOutcome = "success" | "http_error" | "blocked" | "connection_error" | "inconclusive";
export type CheckErrorType = "dns" | "tls" | "connection_refused" | "connection_reset" | "timeout" | "redirect_loop" | "blocked_destination" | "invalid_url" | "rate_limited" | "unknown";

export type CheckResult = {
  online: boolean;
  reachable: boolean;
  outcome: CheckOutcome;
  errorType?: CheckErrorType;
  probeBlocked?: boolean;
  status: number | null;
  responseTime: number | null;
  timestamp: string;
  error?: string;
  requestedUrl?: string;
  checkedUrl?: string;
};
