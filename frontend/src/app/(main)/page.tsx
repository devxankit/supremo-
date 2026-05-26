import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { Commitment } from "@/components/Commitment";
import { WhyUs } from "@/components/WhyUs";
import { Reach } from "@/components/Reach";
import { DealerNetwork } from "@/components/DealerNetwork";
import { Timeline } from "@/components/Timeline";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { DealerCTA } from "@/components/DealerCTA";
import { Certifications } from "@/components/Certifications";
import { Testimonials } from "@/components/Testimonials";
import { BigCTA } from "@/components/BigCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <Commitment />
      <WhyUs />
      <Reach />
      <DealerNetwork />
      <Timeline />
      <FeaturedProducts />
      <DealerCTA />
      <Certifications />
      <Testimonials />
      <BigCTA />
    </main>
  );
}
