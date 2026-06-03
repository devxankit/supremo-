import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build your career at Supremo — 27 years of polymer manufacturing across four ISO-certified plants. Explore open roles in manufacturing, sales, quality, supply chain and more, and apply online.",
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
