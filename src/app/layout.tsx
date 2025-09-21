import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://shasikam.com'),
  title: "Shasika Madhushan - Senior Software Engineer",
  description: "Senior Software Engineer with 4+ years of experience building high-quality web applications using Laravel, Vue.js, and modern technologies. Specialized in full-stack development, clean architecture, and performance optimization.",
  keywords: ["Senior Software Engineer", "Laravel", "Vue.js", "PHP", "JavaScript", "Full Stack Developer", "Web Development", "Sri Lanka"],
  authors: [{ name: "Shasika Madhushan" }],
  creator: "Shasika Madhushan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shasikam.com",
    title: "Shasika Madhushan - Senior Software Engineer",
    description: "Senior Software Engineer with 4+ years of experience building high-quality web applications using Laravel, Vue.js, and modern technologies.",
    siteName: "Shasika Madhushan Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shasika Madhushan - Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shasika Madhushan - Senior Software Engineer",
    description: "Senior Software Engineer with 4+ years of experience building high-quality web applications using Laravel, Vue.js, and modern technologies.",
    images: ["/og-image.jpg"],
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
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
