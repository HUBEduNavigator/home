import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});
const display = Fraunces({
  subsets: ["latin", "vietnamese"],
  variable: "--font-fraunces",
  display: "swap",
});

const title = `${site.name} | Mentor định hướng tự học cho học sinh`;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl.endsWith("/") ? site.siteUrl : site.siteUrl + "/"),
  title,
  description: site.description,
  alternates: { canonical: "./" },
  openGraph: {
    title,
    description: site.description,
    type: "website",
    locale: "vi_VN",
    siteName: site.name,
    images: [{ url: `${site.basePath}/og.png`, width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title, description: site.description, images: [`${site.basePath}/og.png`] },
};

export const viewport: Viewport = {
  themeColor: "#0f2a4a",
  width: "device-width",
  initialScale: 1,
};

const themeScript = `try{var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=d?'dark':'light'}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.siteUrl,
  slogan: site.slogan,
  description: site.description,
  founder: { "@type": "Person", name: "HUB" },
  contactPoint: [{ "@type": "ContactPoint", telephone: "+84346043094", contactType: "customer service", availableLanguage: "Vietnamese" }],
  sameAs: [site.bioUrl, site.docsUrl],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
