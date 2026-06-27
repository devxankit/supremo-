import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Supremo team. Explore career opportunities with us.",
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
