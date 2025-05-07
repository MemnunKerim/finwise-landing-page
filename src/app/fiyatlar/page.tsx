import Section from "@/components/Section";
import Container from "@/components/Container";
import Pricing from "@/components/Pricing/Pricing";

export const metadata = {
  title: "Fiyatlar – PaletDepo",
  description: "Günlük ve abonelik bazlı palet depolama fiyatlarımızı inceleyin.",
};

const FiyatlarPage = () => (
  <Container className="pt-24 pb-16">
    <Section
      id="pricing"
      title="Depolama Paketlerimiz"
      description="İhtiyacınıza göre esnek fiyat seçenekleri."
    >
      <Pricing />
    </Section>
  </Container>
);

export default FiyatlarPage;
