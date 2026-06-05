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

export default function Home() {
  return (
    <main>
      <Hero />
      <Timeline />
      <Categories />
      <WhyUs />
      <Reach />
      <BrandsCarousel />
      <DealerNetwork />
      <Certifications />
      {/* <Testimonials /> */}
      <BigCTA />
    </main>
  );
}
