const baseUrl = (process.env.REPORTING_HEALTH_BASE_URL || "https://xn--ecke7b4bzb0s.com").replace(/\/$/, "");

async function readJson(path) {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { "User-Agent": "saitodaun-reporting-health/1.0" },
  });
  const text = await response.text();
  let payload;

  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error(`${path} returned non-JSON content (HTTP ${response.status})`);
  }

  if (!response.ok) {
    throw new Error(`${path} failed with HTTP ${response.status}: ${payload.error || "unknown error"}`);
  }

  return payload;
}

const service = await readJson("/api/reports?serviceId=google");
if (
  typeof service.count !== "number" ||
  service.windowMinutes !== 30 ||
  !service.signal ||
  !Array.isArray(service.timeline)
) {
  throw new Error("Google reporting response has an unexpected shape");
}

const activity = await readJson("/api/reports?view=hot");
if (!Array.isArray(activity.services) || typeof activity.monitoredServices !== "number") {
  throw new Error("Site-wide reporting response has an unexpected shape");
}

console.log(
  `Reporting health OK: Google=${service.count} reports, monitored services=${activity.monitoredServices}`
);
