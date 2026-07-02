import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Platform from "@/components/Platform";
import WaveDifference from "@/components/WaveDifference";
import Services from "@/components/Services";
import ProofAndPartner from "@/components/ProofAndPartner";
import Process from "@/components/Process";
import WhyChooseUs from "@/components/WhyChooseUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Platform />
      <WaveDifference />
      <Services />
      <ProofAndPartner />
      <Process />
      <WhyChooseUs />
      <Contact />
      <Footer />
    </main>
  );
}
