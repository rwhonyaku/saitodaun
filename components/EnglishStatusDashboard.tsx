"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

type SignalLevel = "normal" | "elevated" | "spike";
type ExternalSource = { label: string; href: string };
type DirectoryService = { id: string; name: string; aliases: string; official?: ExternalSource; independent?: ExternalSource };
type ReportService = { serviceId: string; level: SignalLevel; reports: number; reporters: number; trend: number[] };
type HotSummary = { hot: ReportService[]; services: ReportService[]; monitoredServices: number; updatedAt: string };
type CheckResult = { online: boolean; probeBlocked?: boolean; status: number | null; responseTime: number | null; checkedUrl?: string; error?: string };

const DD = (slug: string): ExternalSource => ({ label: "Independent reports", href: `https://downdetector.com/status/${slug}/` });

const SERVICES: DirectoryService[] = [
  { id: "twitter", name: "X (Twitter)", aliases: "x twitter social", independent: DD("twitter") },
  { id: "youtube", name: "YouTube", aliases: "google video streaming", independent: DD("youtube") },
  { id: "instagram", name: "Instagram", aliases: "meta social", official: { label: "Official status", href: "https://metastatus.com/instagram" }, independent: DD("instagram") },
  { id: "openai", name: "ChatGPT", aliases: "openai ai", official: { label: "Official status", href: "https://status.openai.com/" }, independent: DD("openai") },
  { id: "discord", name: "Discord", aliases: "chat voice messaging", official: { label: "Official status", href: "https://discordstatus.com/" }, independent: DD("discord") },
  { id: "steam", name: "Steam", aliases: "valve gaming games", official: { label: "SteamDB status", href: "https://steamstat.us/" }, independent: DD("steam") },
  { id: "teams", name: "Microsoft Teams", aliases: "microsoft 365 office", official: { label: "Official updates", href: "https://x.com/MSFT365Status" }, independent: DD("teams") },
  { id: "notion", name: "Notion", aliases: "productivity workspace", official: { label: "Official status", href: "https://status.notion.so/" }, independent: DD("notion") },
  { id: "line", name: "LINE", aliases: "messaging japan", official: { label: "Official status", href: "https://api.line-status.info/" }, independent: DD("line") },
  { id: "amazon-jp", name: "Amazon Japan", aliases: "amazon jp shopping", independent: DD("amazon") },
  { id: "paypay", name: "PayPay", aliases: "payment japan", independent: DD("paypay") },
  { id: "yahoo-japan", name: "Yahoo! Japan", aliases: "yahoo jp", independent: DD("yahoo") },
  { id: "spotify", name: "Spotify", aliases: "music audio streaming", official: { label: "Official status", href: "https://support.spotify.com/article/service-status/" }, independent: DD("spotify") },
  { id: "cloudflare", name: "Cloudflare", aliases: "cdn dns infrastructure", official: { label: "Official status", href: "https://www.cloudflarestatus.com/" }, independent: DD("cloudflare") },
  { id: "github", name: "GitHub", aliases: "developer git actions", official: { label: "Official status", href: "https://www.githubstatus.com/" }, independent: DD("github") },
  { id: "slack", name: "Slack", aliases: "work messaging", official: { label: "Official status", href: "https://status.slack.com/" }, independent: DD("slack") },
  { id: "zoom", name: "Zoom", aliases: "meeting video", official: { label: "Official status", href: "https://status.zoom.us/" }, independent: DD("zoom") },
  { id: "microsoft-365", name: "Microsoft 365", aliases: "office outlook onedrive", official: { label: "Official updates", href: "https://x.com/MSFT365Status" }, independent: DD("microsoft-365") },
  { id: "netflix", name: "Netflix", aliases: "video streaming", official: { label: "Official help", href: "https://help.netflix.com/node/13243" }, independent: DD("netflix") },
  { id: "google", name: "Google", aliases: "search workspace gmail", official: { label: "Official status", href: "https://www.google.com/appsstatus/dashboard/" }, independent: DD("google") },
];

const FEATURED_STYLE: Record<string, { mark: string; color: string }> = {
  twitter: { mark: "X", color: "bg-slate-950 text-white" },
  youtube: { mark: "▶", color: "bg-red-500 text-white" },
  instagram: { mark: "◎", color: "bg-fuchsia-600 text-white" },
  openai: { mark: "AI", color: "bg-teal-700 text-white" },
  discord: { mark: "D", color: "bg-indigo-600 text-white" },
  steam: { mark: "S", color: "bg-sky-950 text-white" },
  teams: { mark: "T", color: "bg-violet-600 text-white" },
  notion: { mark: "N", color: "border border-slate-300 bg-white text-slate-950" },
};
const FEATURED_IDS = Object.keys(FEATURED_STYLE);

function track(name: string, parameters: Record<string, string>) {
  const analyticsWindow = window as Window & { gtag?: (event: string, name: string, parameters: Record<string, string>) => void };
  analyticsWindow.gtag?.("event", name, parameters);
}

function presentation(level: SignalLevel) {
  if (level === "spike") return { label: "Unusual spike", text: "text-rose-700", dot: "bg-rose-500", line: "#f43f5e" };
  if (level === "elevated") return { label: "Higher than usual", text: "text-amber-700", dot: "bg-amber-500", line: "#f59e0b" };
  return { label: "No unusual activity", text: "text-emerald-700", dot: "bg-emerald-500", line: "#0ea5e9" };
}

function formatUpdateTime(value: string) {
  return new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit", timeZoneName: "short" }).format(new Date(value));
}

function Sparkline({ values, level }: { values: number[]; level: SignalLevel }) {
  const data = values.length > 1 ? values : [0, 0];
  const max = Math.max(1, ...data);
  const points = data.map((value, index) => `${((index / (data.length - 1)) * 100).toFixed(1)},${(27 - (value / max) * 22).toFixed(1)}`).join(" ");
  return <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-9 w-full" aria-hidden="true"><path d="M0 27 H100" stroke="#e2e8f0" strokeWidth="1" /><polyline points={points} fill="none" stroke={presentation(level).line} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" /></svg>;
}

function SourceLink({ source, serviceId, kind }: { source: ExternalSource; serviceId: string; kind: string }) {
  return <a href={source.href} target="_blank" rel="noopener noreferrer" onClick={() => track("english_status_source_click", { service_id: serviceId, source_type: kind })} className="inline-flex min-h-10 items-center text-xs font-semibold text-sky-700 underline underline-offset-2 hover:text-sky-900">{source.label} ↗</a>;
}

function validUrl(raw: string) {
  try {
    const explicitScheme = raw.match(/^([a-z][a-z\d+.-]*):\/\//i)?.[1];
    if (explicitScheme && !/^https?$/i.test(explicitScheme)) return false;
    const parsed = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    return Boolean(parsed.hostname && (parsed.hostname.includes(".") || parsed.hostname.includes(":")) && !/\s/.test(raw));
  } catch { return false; }
}

export default function EnglishStatusDashboard() {
  const [summary, setSummary] = useState<HotSummary | null>(null);
  const [feedError, setFeedError] = useState(false);
  const [checkMode, setCheckMode] = useState<"service" | "website">("website");
  const [serviceQuery, setServiceQuery] = useState("");
  const [url, setUrl] = useState("");
  const [checking, setChecking] = useState(false);
  const [inputError, setInputError] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);

  const loadReports = useCallback(async () => {
    try {
      const response = await fetch("/api/reports?view=hot", { cache: "no-store" });
      if (!response.ok) throw new Error("feed unavailable");
      setSummary((await response.json()) as HotSummary);
      setFeedError(false);
    } catch { setFeedError(true); }
  }, []);

  useEffect(() => {
    loadReports();
    const timer = window.setInterval(loadReports, 60_000);
    return () => window.clearInterval(timer);
  }, [loadReports]);

  const searchResults = useMemo(() => {
    const query = serviceQuery.trim().toLowerCase();
    if (!query) return [];
    return SERVICES.filter((service) => `${service.name} ${service.aliases}`.toLowerCase().includes(query)).slice(0, 6);
  }, [serviceQuery]);

  async function checkWebsite() {
    const raw = url.trim();
    if (!validUrl(raw)) {
      setInputError("Enter a valid domain or web address, such as example.com.");
      setResult(null);
      return;
    }
    setInputError(""); setChecking(true); setResult(null);
    track("english_website_check", { tool: "external_reachability" });
    try {
      const response = await fetch("/api/check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: raw }) });
      const data = (await response.json()) as CheckResult;
      setResult(data);
      if (data.checkedUrl) setUrl(data.checkedUrl);
    } catch {
      setResult({ online: false, status: null, responseTime: null, error: "The check could not be completed. Try again shortly." });
    } finally { setChecking(false); }
  }

  const featured = FEATURED_IDS.map((id) => ({ ...SERVICES.find((service) => service.id === id)!, ...FEATURED_STYLE[id], report: summary?.services.find((service) => service.serviceId === id) }));
  const resultUnconfirmed = Boolean(result && (result.probeBlocked || result.error || result.status == null));

  return <>
    <section className="relative overflow-hidden bg-slate-950 px-4 py-8 text-white sm:py-10">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.28),transparent_32%),radial-gradient(circle_at_10%_90%,rgba(37,99,235,0.2),transparent_30%)]" />
      <div className="relative mx-auto max-w-5xl"><div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1 text-xs font-semibold text-sky-200"><span className="h-2 w-2 rounded-full bg-sky-400" /> User reports from Japan</div><h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Service outages right now</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">See which websites and apps are showing unusual report activity, then confirm the signal through official and independent status sources.</p></div>
    </section>

    <section className="border-b border-slate-200 bg-white" aria-labelledby="check-heading">
      <div className="mx-auto w-full max-w-5xl px-4 py-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Start here</p>
        <h2 id="check-heading" className="mt-2 text-2xl font-bold tracking-tight text-slate-950">What do you want to check?</h2>
        <div className="mt-5 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2" role="tablist" aria-label="Check type">
            <button type="button" role="tab" aria-selected={checkMode === "website"} aria-controls="website-check-panel" onClick={() => setCheckMode("website")} className={`min-h-12 rounded-xl px-3 text-sm font-bold transition ${checkMode === "website" ? "bg-sky-600 text-white shadow-sm" : "bg-white text-slate-600 hover:text-slate-950"}`}>Website URL</button>
            <button type="button" role="tab" aria-selected={checkMode === "service"} aria-controls="service-check-panel" onClick={() => setCheckMode("service")} className={`min-h-12 rounded-xl px-3 text-sm font-bold transition ${checkMode === "service" ? "bg-slate-950 text-white shadow-sm" : "bg-white text-slate-600 hover:text-slate-950"}`}>Service reports</button>
          </div>

          {checkMode === "service" ? <div id="service-check-panel" role="tabpanel" className="p-3 sm:p-4">
            <label htmlFor="english-service-search" className="font-bold text-slate-950">Find a known service</label>
            <p className="mt-1 text-xs leading-5 text-slate-500">Search user reports and status sources for a major service. This does not run a technical website test.</p>
            <input id="english-service-search" type="search" value={serviceQuery} onChange={(event) => setServiceQuery(event.target.value)} placeholder="Discord, Spotify, Cloudflare…" className="mt-3 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100" />
            {serviceQuery && searchResults.length === 0 ? <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500"><span>No matching service in this directory.</span><button type="button" onClick={() => setCheckMode("website")} className="min-h-10 font-semibold text-sky-700 underline underline-offset-2">Check its website URL instead →</button></div> : null}
            {searchResults.length ? <div className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">{searchResults.map((service) => {
              const report = summary?.services.find((item) => item.serviceId === service.id);
              const state = report ? presentation(report.level) : null;
              return <div key={service.id} className="p-4 sm:flex sm:items-center sm:justify-between sm:gap-4"><div><div className="flex flex-wrap items-center gap-2"><p className="font-bold text-slate-950">{service.name}</p>{state ? <span className={`flex items-center gap-1 text-[10px] font-bold ${state.text}`}><span className={`h-2 w-2 rounded-full ${state.dot}`} />Reports from Japan: {state.label}</span> : <span className="text-[10px] text-slate-400">User-report monitoring is not available</span>}</div><Link href={`/status/sites/${service.id}`} onClick={() => track("english_service_detail_click", { service_id: service.id })} className="inline-flex min-h-10 items-center text-xs font-semibold text-slate-500 underline underline-offset-2">Our detailed page (Japanese) →</Link></div><div className="flex flex-wrap gap-x-4">{service.official ? <SourceLink source={service.official} serviceId={service.id} kind={service.id === "steam" ? "independent_specialist" : "official"} /> : null}{service.independent ? <SourceLink source={service.independent} serviceId={service.id} kind="independent" /> : null}</div></div>;
            })}</div> : null}
          </div> : <div id="website-check-panel" role="tabpanel" className="p-3 sm:p-4">
            <label htmlFor="english-website-url" className="font-bold text-slate-950">Run a technical reachability test</label>
            <p className="mt-1 text-xs leading-5 text-slate-500">Enter a web address. Our server will test whether that URL responds; it cannot verify every feature, account, app, or location.</p>
            <div className="mt-3 flex gap-2"><input id="english-website-url" value={url} onChange={(event) => { setUrl(event.target.value); setInputError(""); }} onKeyDown={(event) => { if (event.key === "Enter") checkWebsite(); }} type="text" inputMode="url" autoCapitalize="none" autoCorrect="off" spellCheck={false} placeholder="example.com" aria-invalid={Boolean(inputError)} className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-950 outline-none focus:ring-2 focus:ring-sky-400" /><button onClick={checkWebsite} disabled={checking} className="min-h-12 rounded-xl bg-sky-600 px-5 text-sm font-bold text-white hover:bg-sky-700 disabled:opacity-60 sm:px-7">{checking ? "Checking…" : "Check URL"}</button></div>
            {inputError ? <p className="mt-2 text-sm font-medium text-red-700" role="alert">{inputError}</p> : null}
            {result ? <div className={`mt-4 rounded-xl border p-5 ${resultUnconfirmed ? "border-amber-200 bg-amber-50" : result.online ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`} role="status"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-bold text-slate-950">{resultUnconfirmed ? "Result inconclusive" : result.online ? "The website responded" : "The website did not respond normally"}</p>{result.checkedUrl ? <p className="mt-1 max-w-xl break-all font-mono text-xs text-slate-500">{result.checkedUrl}</p> : null}</div><div className="flex gap-2 text-xs"><span className="rounded-lg bg-white px-3 py-2">HTTP <b>{result.status ?? "—"}</b></span><span className="rounded-lg bg-white px-3 py-2">{result.responseTime != null ? `${result.responseTime} ms` : "—"}</span></div></div></div> : null}
          </div>}
        </div>
      </div>
    </section>

    <section className="mx-auto w-full max-w-5xl px-4 py-8" aria-labelledby="live-status-heading">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Updated every 60 seconds</p><h2 id="live-status-heading" className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Current user-report activity</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Distinct visitors in Japan who submitted a problem report during the latest 30 minutes, compared with each service&apos;s previous 24 hours. This is not a server test or a worldwide status.</p></div><div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm"><b>{summary?.monitoredServices ?? "—"}</b> services with report monitoring{summary?.updatedAt ? <span className="ml-2 text-xs text-slate-500">· {formatUpdateTime(summary.updatedAt)}</span> : null}</div></div>
      {summary?.hot.length ? <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-5"><p className="font-bold text-rose-950">Unusual activity detected</p><p className="mt-1 text-sm text-rose-800">{summary.hot.map((item) => SERVICES.find((service) => service.id === item.serviceId)?.name ?? item.serviceId).join(", ")}</p></div> : summary ? <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5" role="status"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 font-bold text-white">✓</span><div><p className="font-bold text-emerald-950">No unusual report spikes detected</p><p className="mt-1 text-xs leading-5 text-emerald-800">Partial, account-specific, and other regional problems may not appear here.</p></div></div> : null}
      {feedError && !summary ? <p className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">Live report data is temporarily unavailable.</p> : null}

      <h2 className="mt-8 text-xl font-bold text-slate-950">Major services</h2><p className="mt-1 text-xs text-slate-500">Sparklines show recent user-report activity from Japan. Source links open the service owner or a separate independent reporting site.</p>
      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">{featured.map((service) => { const state = presentation(service.report?.level ?? "normal"); return <article key={service.id} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"><div className="flex items-start justify-between gap-2"><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black ${service.color}`}>{service.mark}</span><span className={`flex items-center gap-1 text-[10px] font-bold ${service.report ? state.text : "text-slate-400"}`}><span className={`h-2 w-2 rounded-full ${service.report ? state.dot : "bg-slate-300"}`} />{service.report ? state.label : "Loading"}</span></div><p className="mt-3 text-sm font-bold text-slate-950">{service.name}</p><div className="mt-2"><Sparkline values={service.report?.trend ?? [0, 0]} level={service.report?.level ?? "normal"} /></div><p className="mt-1 text-[10px] leading-4 text-slate-500">{service.report ? `${service.report.reporters} reporters · ${service.report.reports} reports / 30 min` : "Fetching reports…"}</p><div className="mt-2 border-t border-slate-100 pt-1">{service.official ? <SourceLink source={service.official} serviceId={service.id} kind="official" /> : service.independent ? <SourceLink source={service.independent} serviceId={service.id} kind="independent" /> : null}</div></article>; })}</div>
      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-xs leading-5 text-slate-600"><b>Coverage note:</b> elevated reporting in Japan is additional regional evidence, not proof of a worldwide outage. External sources are independent and their data is not reproduced here.</div>
    </section>

  </>;
}
