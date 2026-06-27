import type { Metadata } from "next";
import { ExploreTabs } from "./_components/ExploreTabs";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore media, photos and factory walkthroughs from Supremo.",
};

export default function GalleryPage() {
  return (
    <main style={{ background: "var(--paper)" }}>
      <ExploreTabs />
    </main>
  );
}
