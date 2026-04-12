import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "600", "700", "800"],
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
    <html lang="fr" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-inter bg-navy antialiased">{children}</body>
    </html>
  );
}
