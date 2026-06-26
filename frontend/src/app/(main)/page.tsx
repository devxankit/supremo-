import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { WhyUs } from "@/components/WhyUs";
import { Reach } from "@/components/Reach";
import { BrandsCarousel } from "@/components/BrandsCarousel";
import { DealerNetwork } from "@/components/DealerNetwork";
import { Timeline } from "@/components/Timeline";
import { Certifications } from "@/components/Certifications";
// import { Testimonials } from "@/components/Testimonials";
import { BigCTA } from "@/components/BigCTA";

export const dynamic = "force-dynamic";

export default async function Home() {
  let sections: any[] = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"}/homepage-sections`, { cache: "no-store" });
    if (res.ok) {
      sections = await res.json();
    }
  } catch (error) {
    console.error("Error loading homepage sections:", error);
  }

  // Helper to determine visibility (default to true if section config is missing, except "featured")
  const isVisible = (id: string, defaultVisible = true) => {
    const sec = sections.find((s: any) => s.id === id);
    return sec ? sec.visible : defaultVisible;
  };

  // Helper to get heading and sub properties
  const getProps = (id: string) => {
    const sec = sections.find((s: any) => s.id === id);
    return {
      heading: sec?.heading || undefined,
      headingHighlight: sec?.headingHighlight || undefined,
      sub: sec?.sub || undefined
    };
  };

  return (
    <main>
      {isVisible("hero", true) && <Hero />}
      {isVisible("categories", true) && <Categories {...getProps("categories")} />}
      {isVisible("manufacturing", true) && <Timeline {...getProps("manufacturing")} />}
      {isVisible("whyus", true) && <WhyUs {...getProps("whyus")} />}
      {isVisible("intro", true) && <Reach {...getProps("intro")} />}
      {isVisible("testimonials", true) && <BrandsCarousel {...getProps("testimonials")} />}
      {isVisible("dealercta", true) && <DealerNetwork {...getProps("dealercta")} />}
      {isVisible("certifications", true) && <Certifications {...getProps("certifications")} />}
      {isVisible("bigcta", true) && <BigCTA {...getProps("bigcta")} />}
    </main>
  );
}
