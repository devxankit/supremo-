import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
// All site fonts are configured in one place — see src/app/fonts.ts.
import { fontVariables } from "./fonts";

export const metadata: Metadata = {
  title: {
    default: "Supremo — Built to Hold India's Water",
    template: "%s — Supremo India",
  },
  description:
    "Manufacturer of premium triple-layer water tanks, PVC pipes, planters and utility products. Pan-India dealer network across 22 states.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
