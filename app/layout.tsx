import type { Metadata } from "next";
import { Raleway, DM_Sans } from "next/font/google";
import "./globals.css";

// Raleway replaces Syne — keeps same CSS variable so all font-syne classes work unchanged
const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

// DM Sans replaces Inter — keeps same CSS variable
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inscription — SERMA HUB Impact Academy",
  description:
    "Inscrivez-vous gratuitement à la formation SERMA HUB Impact Academy. Places limitées à 10 participants. Dates : 16, 17 et 18 Avril 2026.",
  openGraph: {
    title: "Inscription — SERMA HUB Impact Academy",
    description: "Formation gratuite en comptabilité — 16, 17, 18 Avril 2026",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${raleway.variable}`}>
      <body className="font-inter bg-navy antialiased">{children}</body>
    </html>
  );
}
