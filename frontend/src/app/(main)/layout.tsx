import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAB } from "@/components/FAB";
import { PageTransition } from "@/components/PageTransition";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <FAB />
    </>
  );
}
