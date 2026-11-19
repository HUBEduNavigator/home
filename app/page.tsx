import { AppProvider } from "@/components/AppContext";
import { BookingModalLazy } from "@/components/BookingModalLazy";
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
import { MotionRoot } from "@/components/motion";

export default function Page() {
  return (
    <MotionRoot>
    <AppProvider>
      <a href="#noi-dung" className="skip">Bỏ qua tới nội dung</a>
      <Header />
      <main id="noi-dung">
        <Hero />
        <Situations />
        <Diagnostic />
        <Compare />
        <Process />
        <Resources />
        <Founder />
        <Plans />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
      <FloatingZalo />
      <BookingModalLazy />
    </AppProvider>
    </MotionRoot>
  );
}
