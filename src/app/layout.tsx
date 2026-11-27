import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/inter-tight";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";

const description =
  "Brice Seguret conçoit et développe des sites internet et des applications sur mesure pour les indépendants et les entreprises, depuis Anglet.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.brand.name} · ${siteConfig.brand.tagline} · Sites et applications sur mesure`, template: `%s · ${siteConfig.brand.name}` },
  description,
  applicationName: siteConfig.brand.name,
  authors: [{ name: `${siteConfig.person.firstName} ${siteConfig.person.lastName}` }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "fr_FR", siteName: siteConfig.brand.name, url: "/", description },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#f6f5f1", colorScheme: "light" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.brand.name,
  slogan: siteConfig.brand.tagline,
  description,
  url: siteConfig.url,
  areaServed: "France",
  address: { "@type": "PostalAddress", addressLocality: "Anglet", postalCode: "64600", addressCountry: "FR" },
  founder: { "@type": "Person", name: `${siteConfig.person.firstName} ${siteConfig.person.lastName}` },
  ...(siteConfig.email ? { email: siteConfig.email } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="grain">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <CursorGlow />
        <Header />
        <main id="contenu" className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
