import type { Metadata } from "next";
import { Anton, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Billboard display face — used only for the largest, loudest moments.
const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

// Grotesque workhorse for headings, nav, and body.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

// Instrument face — scoreboard numerals, eyebrows, data labels.
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhooWon — Settle Every Score",
  description:
    "The premium scoreboard for friendly bloodsport. Log every set, track every streak, and prove — match after match — exactly whoo won.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // Browser extensions (e.g. Kantu/UI.Vision adds data-kantu) mutate
      // <html> before hydration; suppress the resulting attribute-mismatch
      // warning on this element only — it does not affect child diffing.
      suppressHydrationWarning
      className={`${anton.variable} ${archivo.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
