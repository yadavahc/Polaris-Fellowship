import type { Metadata, Viewport } from "next";
import { Sora, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { site } from "@/lib/content";

const sans = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yadava-portfolio.vercel.app"),
  title: `${site.name} — ${site.fellowship}`,
  description:
    "Yadava H C — AI-first product engineer. An interactive, video-narrated portfolio for the Polaris Fellowship: projects, hackathons, DSA, community and a 10-year vision.",
  keywords: [
    "Yadava H C",
    "Polaris Fellowship",
    "AI engineer",
    "portfolio",
    "Legal Saathi",
    "WattWatch",
    "hackathons",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    title: `${site.name} — ${site.fellowship}`,
    description:
      "An interactive, video-narrated portfolio — the website responds to the spoken story.",
    type: "website",
    images: ["/images/profile-hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.fellowship}`,
    description: "An interactive, video-narrated portfolio.",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} antialiased`}
    >
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
