import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
// All site fonts are configured in one place — see src/app/fonts.ts.
import { fontVariables } from "./fonts";

export const metadata: Metadata = {
  title: {
    default: "Supremo",
    template: "%s — Supremo",
  },
  description: "",
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
