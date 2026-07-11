import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NavWrapper } from "@/components/layout/NavWrapper";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "网络社会不研究所 | Institute of Not Studying Network Society",
    template: "%s | 网络社会不研究所",
  },
  description:
    "An independent research organization dedicated to studying everything except network society.",
  metadataBase: new URL("https://notstudying.network"),
  openGraph: {
    title: "网络社会不研究所",
    description:
      "An independent research organization dedicated to studying everything except network society.",
    url: "https://notstudying.network",
    siteName: "网络社会不研究所",
    locale: "zh_CN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&family=Inter:wght@300;400;500;600&family=Source+Serif+4:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="网络社会不研究所 RSS Feed"
          href="/insns/rss.xml"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <NavWrapper />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
