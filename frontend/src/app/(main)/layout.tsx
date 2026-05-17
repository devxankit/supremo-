import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAB } from "@/components/FAB";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <FAB />
    </>
  );
}
