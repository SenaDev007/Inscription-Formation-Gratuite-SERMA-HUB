import type { Metadata } from "next";
import { Raleway, DM_Sans } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inscription — SERMA HUB Impact Academy",
  description:
    "Inscrivez-vous à la formation SERMA HUB Impact Academy. 07, 08 et 09 Mai 2026. Présentiel & En ligne. Places limitées à 10 participants.",
  openGraph: {
    title: "Inscription — SERMA HUB Impact Academy",
    description: "Formation professionnelle — 07, 08, 09 Mai 2026 · Présentiel & En ligne",
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
