import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Supremo team — 27 years of polymer manufacturing across four ISO-certified plants. Submit your resume and our HR team will reach out when there's a fit.",
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
