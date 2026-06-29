import type { Metadata } from "next";
import { Playpen_Sans_Arabic, Zain } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/ui/provideres";
import { Toaster } from "@/components/ui/sonner" // or wherever shadcn puts it


const playpen = Playpen_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
});

const zain = Zain({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "700", "800", "900"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "اللعبة",
    template: "%s | اللعبة",
  },
  description: "منصة المسابقات التنافسية لطلبة جامعة برج العرب التكنولوجية",
  keywords: ["اللعبة", "مسابقات", "كويز", "BATU", "برج العرب"],
  authors: [{ name: "Shilla Team" }],
  creator: "Shilla Team",
  metadataBase: new URL("https://el-le3ba.vercel.app"),
  openGraph: {
    type: "website",
    locale: "ar_EG",
    title: "اللعبة",
    description: "منصة المسابقات التنافسية لطلبة جامعة برج العرب التكنولوجية",
    siteName: "اللعبة",
  },
  twitter: {
    card: "summary_large_image",
    title: "اللعبة",
    description: "منصة المسابقات التنافسية لطلبة جامعة برج العرب التكنولوجية",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${playpen.variable} ${zain.variable} font-body antialiased`}
      >
        <Providers>
          <Toaster position="bottom-right" dir="ltr" />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
