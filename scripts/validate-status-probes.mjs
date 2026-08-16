import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../lib/statusSites.ts", import.meta.url), "utf8");
const sitePattern =
  /\{\s*id:\s*"([^"]+)"[\s\S]*?name:\s*"([^"]+)"[\s\S]*?url:\s*"([^"]+)"/g;

const requestedIds = new Set(
  process.argv
    .slice(2)
    .flatMap((arg) => arg.split(","))
    .map((arg) => arg.trim())
    .filter(Boolean)
);

const sites = [];
for (const match of source.matchAll(sitePattern)) {
  const site = { id: match[1], name: match[2], url: match[3] };
  if (requestedIds.size === 0 || requestedIds.has(site.id)) sites.push(site);
}

if (requestedIds.size > 0 && sites.length !== requestedIds.size) {
  const foundIds = new Set(sites.map((site) => site.id));
  const missingIds = [...requestedIds].filter((id) => !foundIds.has(id));
  console.error(`Unknown status site id(s): ${missingIds.join(", ")}`);
  process.exit(1);
}

const allowedBlockedStatuses = new Set([401, 403, 405, 429]);
const knownAutomationLimitedIds = new Set(["zozotown", "dbarai"]);
const probeUrlOverrides = new Map([
  ["mynaportal", "https://myna.go.jp/help"],
  ["dbarai", "https://service.smt.docomo.ne.jp/keitai_payment/robots.txt"],
]);
const redirectStatuses = new Set([301, 302, 303, 307, 308]);
const concurrency = Number(process.env.STATUS_PROBE_CONCURRENCY ?? 8);
const timeoutMs = Number(process.env.STATUS_PROBE_TIMEOUT_MS ?? 8000);
const maxRedirects = Number(process.env.STATUS_PROBE_MAX_REDIRECTS ?? 10);

async function fetchWithRedirectLimit(startUrl) {
  let currentUrl = startUrl;
  const chain = [];

  for (let redirectCount = 0; redirectCount <= maxRedirects; redirectCount += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(currentUrl, {
        method: "GET",
        redirect: "manual",
        signal: controller.signal,
        headers: {
          "user-agent": "saitodaun-status-probe-validator/1.0",
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });

      response.body?.cancel();
      chain.push(`${response.status} ${currentUrl}`);

      if (!redirectStatuses.has(response.status)) {
        return { status: response.status, finalUrl: currentUrl, chain };
      }

      const location = response.headers.get("location");
      if (!location) {
        return {
          status: response.status,
          finalUrl: currentUrl,
          chain,
          error: "redirect-without-location",
        };
      }

      currentUrl = new URL(location, currentUrl).toString();
    } finally {
      clearTimeout(timeout);
    }
  }

  return {
    status: null,
    finalUrl: currentUrl,
    chain,
    error: `too-many-redirects>${maxRedirects}`,
  };
}

function classify(result) {
  if (result.error) return "fail";
  if (result.status >= 200 && result.status < 300) return "ok";
  if (allowedBlockedStatuses.has(result.status)) return "probe-limited";
  return "fail";
}

async function validateSite(site) {
  try {
    const result = await fetchWithRedirectLimit(probeUrlOverrides.get(site.id) ?? site.url);
    const classification = knownAutomationLimitedIds.has(site.id)
      ? "probe-limited"
      : classify(result);
    return { site, result, classification };
  } catch (error) {
    return {
      site,
      result: {
        status: null,
        finalUrl: site.url,
        chain: [],
        error: error instanceof Error ? error.message : String(error),
      },
      classification: knownAutomationLimitedIds.has(site.id)
        ? "probe-limited"
        : "fail",
    };
  }
}

const results = [];
for (let index = 0; index < sites.length; index += concurrency) {
  const batch = sites.slice(index, index + concurrency);
  results.push(...(await Promise.all(batch.map(validateSite))));
}

const failures = results.filter((entry) => entry.classification === "fail");
const limited = results.filter((entry) => entry.classification === "probe-limited");

for (const entry of failures) {
  const { site, result } = entry;
  console.error(
    [
      `${site.id} (${site.name}) failed probe validation`,
      `target: ${site.url}`,
      `final: ${result.finalUrl}`,
      `status: ${result.status ?? "none"}`,
      `error: ${result.error ?? "none"}`,
      result.chain.length ? `redirect chain: ${result.chain.join(" -> ")}` : null,
    ]
      .filter(Boolean)
      .join("\n")
  );
  console.error("");
}

console.log(
  `Checked ${results.length} status probe URLs: ${
    results.length - failures.length - limited.length
  } ok, ${limited.length} probe-limited, ${failures.length} failed.`
);

if (limited.length > 0) {
  console.log(
    `Probe-limited targets returned ${[...allowedBlockedStatuses].join(
      "/"
    )} or are known to restrict automation; these should render as confirmation-limited, not offline.`
  );
}

if (failures.length > 0) {
  process.exitCode = 1;
}
