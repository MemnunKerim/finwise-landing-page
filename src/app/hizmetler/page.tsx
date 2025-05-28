import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Benefits from "@/components/Benefits/Benefits";

export const metadata = {
  title: "Hizmetler – PaletDepo",
  description: "Palet depolama, elleçleme ve stok takibi çözümlerimiz.",
  alternates: {
    canonical: "https://www.paletdepo.com/hizmetler",
  },
};

const HizmetlerPage = () => (
  <Container className="pt-24 pb-16">
    <SectionTitle>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Hizmetlerimiz
      </h2>
    </SectionTitle>
    <Benefits />
  </Container>
);

export default HizmetlerPage;
