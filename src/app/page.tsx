import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing/Pricing";
import FAQ from "@/components/FAQ";
import Logos from "@/components/Logos";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Stats />
     
      <Container>
        <Benefits />

        <Section
          id="fiyatlar"
          title="Fiyatlar"
          description="Şeffaf, öngörülebilir fiyatlandırma. Sürpriz maliyet yok."
        >
          <Pricing />
        </Section>

        <Section
          id="referanslar"
          title="Müşterilerimiz Ne Diyor?"
          description="PaletDepo ile çalışan şirketlerin deneyimlerini keşfedin."
        >
          <Testimonials />
        </Section>

        <FAQ />

         <Logos />
        
        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
