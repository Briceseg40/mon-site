import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/demarrer-un-projet/merci"] }], sitemap: `${siteConfig.url}/sitemap.xml` };
}
