import { AiDemo } from "@/components/AiDemo";
import { AppProvider } from "@/components/AppContext";
import { BookingModal } from "@/components/BookingModal";
import { Compare } from "@/components/Compare";
import { Diagnostic } from "@/components/Diagnostic";
import { Faq } from "@/components/Faq";
import { FloatingZalo } from "@/components/FloatingZalo";
import { Footer } from "@/components/Footer";
import { Founder } from "@/components/Founder";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Plans } from "@/components/Plans";
import { Process } from "@/components/Process";
import { Resources } from "@/components/Resources";
import { Situations } from "@/components/Situations";
import { Testimonials } from "@/components/Testimonials";

export default function Page() {
  return (
    <AppProvider>
      <a href="#noi-dung" className="skip">Bỏ qua tới nội dung</a>
      <Header />
      <main id="noi-dung">
        <Hero />
        <Situations />
        <Diagnostic />
        <Compare />
        <Process />
        <AiDemo />
        <Founder />
        <Resources />
        <Plans />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
      <FloatingZalo />
      <BookingModal />
    </AppProvider>
  );
}
