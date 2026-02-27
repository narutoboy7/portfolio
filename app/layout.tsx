import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import JsonLd from "./components/JsonLd";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_URL = "https://vishnukantsahil.online";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Vishnu — Founder & Systems Builder",
    template: "%s | Vishnu",
  },
  description:
    "Founder building scalable businesses in lead generation, automation, and AI systems. Operator, product builder, and systems architect shipping SaaS products at scale.",
  keywords: [
    "Vishnu",
    "founder",
    "product builder",
    "lead generation",
    "cold email infrastructure",
    "SaaS",
    "automation",
    "AI systems",
    "growth consulting",
    "systems builder",
    "operator",
    "BuzzedInbox",
    "LeadSend",
    "Artha",
  ],
  authors: [{ name: "Vishnu", url: SITE_URL }],
  creator: "Vishnu",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Vishnu — Founder & Systems Builder",
    title: "Vishnu — Founder & Systems Builder",
    description:
      "Founder building scalable businesses in lead generation, automation, and AI systems. Operator, product builder, and systems architect.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Vishnu — Founder & Systems Builder",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vishnu — Founder & Systems Builder",
    description:
      "Founder building scalable businesses in lead generation, automation, and AI systems.",
    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },

  manifest: "/manifest.webmanifest",

  // Replace with your actual Google Search Console verification code:
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} antialiased transition-colors duration-300`}
      >
        <JsonLd />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
