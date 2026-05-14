import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Categories } from "@/components/Categories";
import { WhyUs } from "@/components/WhyUs";
import { Manufacturing } from "@/components/Manufacturing";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { DealerCTA } from "@/components/DealerCTA";
import { Certifications } from "@/components/Certifications";
import { Testimonials } from "@/components/Testimonials";
import { BigCTA } from "@/components/BigCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <Categories />
      <WhyUs />
      <Manufacturing />
      <FeaturedProducts />
      <DealerCTA />
      <Certifications />
      <Testimonials />
      <BigCTA />
    </main>
  );
}
