// app/sitemap.ts

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/siteMeta";
import { STATUS_SITES, CATEGORY_ORDER } from "@/lib/statusSites";
import { SERVICES } from "@/lib/services/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.origin;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/status`, changeFrequency: "daily", priority: 0.9 },
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

    // Troubleshooting cluster
    { url: `${base}/troubleshooting/specific-site-not-working`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/troubleshooting/internet-not-working`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/troubleshooting/wifi-not-working`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/troubleshooting/router-not-working`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/troubleshooting/isp-outage`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/troubleshooting/browser-not-loading-sites`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/troubleshooting/device-cannot-connect`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/troubleshooting/dns-propagation`, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/troubleshooting/site-blocked-by-firewall`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/troubleshooting/site-works-on-phone-not-computer`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/troubleshooting/cdn-or-server-edge-issues`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/troubleshooting/how-to-check-if-a-website-is-down`, changeFrequency: "monthly", priority: 0.8 },

    // Error guides
    { url: `${base}/errors/403-forbidden`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/errors/404-not-found`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/errors/429-too-many-requests`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/errors/500-internal-server-error`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/errors/502-bad-gateway`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/errors/503-service-unavailable`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/errors/504-gateway-timeout`, changeFrequency: "monthly", priority: 0.7 },

    { url: `${base}/errors/err-connection-refused`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/errors/connection-reset`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/errors/err-connection-timed-out`, changeFrequency: "monthly", priority: 0.6 },

    { url: `${base}/errors/dns-probe-finished-nxdomain`, changeFrequency: "monthly", priority: 0.6 },

    { url: `${base}/errors/cloudflare-520`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/errors/cloudflare-522`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/errors/cloudflare-524`, changeFrequency: "monthly", priority: 0.6 },

    { url: `${base}/errors/ssl-handshake-failed`, changeFrequency: "monthly", priority: 0.6 },

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

  return [...staticRoutes, ...categoryRoutes, ...statusDetailRoutes, ...serviceRoutes];
}
