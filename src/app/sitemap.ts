import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const pages = ["", "/realisations", "/services", "/a-propos", "/demarrer-un-projet", "/mentions-legales", "/confidentialite"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : p === "/demarrer-un-projet" ? 0.9 : 0.7 })),
    ...projects.filter((p) => !p.placeholder).map((p) => ({ url: `${base}/realisations/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
