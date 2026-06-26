import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAB } from "@/components/FAB";
import { PageTransition } from "@/components/PageTransition";
import { HeroThemeProvider } from "@/components/HeroThemeContext";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <HeroThemeProvider>
        <Navbar />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <FAB />
      </HeroThemeProvider>
    </SmoothScrollProvider>
  );
}

