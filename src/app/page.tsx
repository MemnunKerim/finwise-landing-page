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
import Services from "@/components/Services";
import ProcessFlow from "@/components/ProcessFlow";

// Ana sayfa layout.tsx'ten metadata alıyor, ek metadata gerekmez



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
          <Section
            id="hizmetler"
            title="PaletDepo Ne Sunuyor?"
            description="Dijital gücümüzle depolamadan sevkiyata kadar uçtan uca çözümler."
          >
            <Services />
          </Section>
        <FAQ />
          <Section id="süreç" title="" description="">
            <ProcessFlow />
          </Section>
         <Logos />
        
        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
