import type { MetadataRoute } from "next";
import { STATUS_SITES, CATEGORY_ORDER } from "@/lib/statusSites";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://xn--ecke7b4bzb0s.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/status`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORY_ORDER.map((cat) => ({
    url: `${base}/status/category/${cat}`,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const statusDetailRoutes: MetadataRoute.Sitemap = STATUS_SITES.map((s) => ({
    url: `${base}/status/${s.id}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...statusDetailRoutes];
}
