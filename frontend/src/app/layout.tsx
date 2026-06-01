import type { Metadata } from "next";
import { IBM_Plex_Serif, Work_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

// Serif headings + sans UI — the brand pairing from the UX review.
const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Supremo — Built to Hold India's Water",
  description:
    "Manufacturer of premium triple-layer water tanks, PVC pipes, planters and utility products. Pan-India dealer network across 22 states.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plexSerif.variable} ${workSans.variable}`}>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
