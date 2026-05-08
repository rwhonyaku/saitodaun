// app/sitemap.ts

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/siteMeta";
import { STATUS_SITES, CATEGORY_ORDER } from "@/lib/statusSites";
import { SERVICES } from "@/lib/services/registry";

const TROUBLESHOOTING_ROUTES = [
  "access-denied",
  "app-not-working",
  "browser-not-loading-sites",
  "cant-log-in",
  "captcha-or-verification-loop",
  "cdn-or-server-edge-issues",
  "device-cannot-connect",
  "dns-propagation",
  "form-submit-not-working",
  "how-to-check-if-a-website-is-down",
  "internet-not-working",
  "internet-working-but-apps-not-loading",
  "isp-outage",
  "public-wifi-login-page-not-showing",
  "router-not-working",
  "router-vs-isp-problem",
  "secure-connection-failed",
  "server-not-found",
  "signed-in-but-site-not-working",
  "site-blocked-by-firewall",
  "site-loads-forever",
  "site-loads-without-images",
  "site-opens-but-buttons-do-not-work",
  "site-opens-but-does-not-work",
  "site-opens-but-is-blank",
  "site-opens-but-login-fails",
  "site-works-on-phone-not-computer",
  "slow-internet",
  "specific-site-not-working",
  "this-site-cant-be-reached",
  "website-blocked",
  "website-keeps-asking-are-you-human",
  "website-keeps-logging-me-out",
  "website-keeps-reloading",
  "website-loads-on-phone-not-wifi",
  "website-not-loading",
  "website-slow-but-internet-is-fine",
  "website-works-on-wifi-not-mobile-data",
  "wifi-not-working",
] as const;

const ERROR_ROUTES = [
  "401-unauthorized",
  "403-forbidden",
  "404-not-found",
  "408-request-timeout",
  "429-too-many-requests",
  "500-internal-server-error",
  "502-bad-gateway",
  "503-service-unavailable",
  "504-gateway-timeout",
  "cloudflare-520",
  "cloudflare-521",
  "cloudflare-522",
  "cloudflare-523",
  "cloudflare-524",
  "cloudflare-526",
  "connection-reset",
  "dns-probe-finished-nxdomain",
  "err-address-unreachable",
  "err-cert-date-invalid",
  "err-connection-refused",
  "err-connection-timed-out",
  "err-empty-response",
  "err-internet-disconnected",
  "err-name-not-resolved",
  "err-network-changed",
  "err-ssl-protocol-error",
  "err-too-many-redirects",
  "err-tunnel-connection-failed",
  "net-err-cert-common-name-invalid",
  "ssl-handshake-failed",
  "your-connection-is-not-private",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.origin;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/status`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/status/index`, changeFrequency: "daily", priority: 0.7 },
    { url: `${base}/errors`, changeFrequency: "monthly", priority: 0.75 },

    // Outage funnel
    { url: `${base}/outages/japan`, changeFrequency: "daily", priority: 0.85 },

    // Service troubleshooting
    { url: `${base}/services`, changeFrequency: "daily", priority: 0.9 },

    // Conversion pillars
    { url: `${base}/conoha`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/recommendations`, changeFrequency: "monthly", priority: 0.8 },

    // Knowledge pillars
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/troubleshooting-guide`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/troubleshooting-dns`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/glossary`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/status-codes`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/network-types`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/site-performance`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/what-is-website-downtime`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/how-it-works`, changeFrequency: "monthly", priority: 0.6 },

    // Legal
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Status category routes
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORY_ORDER.map((cat) => ({
    url: `${base}/status/category/${cat}`,
    changeFrequency: "daily",
    priority: 0.65,
  }));

  // Status detail routes
  const statusDetailRoutes: MetadataRoute.Sitemap = STATUS_SITES.map((s) => ({
    url: `${base}/status/sites/${s.id}`,
    changeFrequency: "daily",
    priority: 0.75,
  }));

  // Service hub + issue routes
  const serviceRoutes: MetadataRoute.Sitemap = Object.values(SERVICES).flatMap((svc) => {
    const hub = {
      url: `${base}/services/${svc.id}`,
      changeFrequency: "daily" as const,
      priority: 0.85,
    };

    const issues = Object.values(svc.issues || {}).map((issue) => ({
      url: `${base}/services/${svc.id}/${issue.id}`,
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));

    return [hub, ...issues];
  });

  const troubleshootingRoutes: MetadataRoute.Sitemap = TROUBLESHOOTING_ROUTES.map((slug) => ({
    url: `${base}/troubleshooting/${slug}`,
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  const errorRoutes: MetadataRoute.Sitemap = ERROR_ROUTES.map((slug) => ({
    url: `${base}/errors/${slug}`,
    changeFrequency: "monthly",
    priority: 0.68,
  }));

  return [
    ...staticRoutes,
    ...troubleshootingRoutes,
    ...errorRoutes,
    ...categoryRoutes,
    ...statusDetailRoutes,
    ...serviceRoutes,
  ];
}
