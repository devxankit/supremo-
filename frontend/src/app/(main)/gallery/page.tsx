import type { Metadata } from "next";
import { ExploreTabs } from "./_components/ExploreTabs";

export const metadata: Metadata = {
  title: "Explore Supremo — Media, Videos & Blogs",
  description:
    "Factory photos, plant walkthroughs and knowledge guides from Supremo India — a look inside our manufacturing, our people and our pan-India dispatch network.",
};

export default function GalleryPage() {
  return (
    <main style={{ background: "var(--paper)" }}>
      <ExploreTabs />
    </main>
  );
}
