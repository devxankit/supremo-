import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAB } from "@/components/FAB";
import { PageTransition } from "@/components/PageTransition";
import { HeroThemeProvider } from "@/components/HeroThemeContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <HeroThemeProvider>
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <FAB />
    </HeroThemeProvider>
  );
}
