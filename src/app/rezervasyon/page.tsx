import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import ReservationForm from "@/components/ReservationForm";
import { BsShieldCheck, BsClock, BsHeadset } from "react-icons/bs";


export const metadata = {
  title: "Rezervasyon – PaletDepo",
  description:
    "PaletDepo'da depo alanınızı hemen rezerve edin. Detaylı ürün bilgileri ile güvenli depolama.",
  keywords: "palet rezervasyon, depo rezervasyon, esenyurt depo, palet depolama rezervasyonu"};

const RezervasyonPage = () => {
  return (
      <div className="pt-24 pb-16">
      <Container>
        {/* Hero Section */}
        <section className="text-center mb-12">
          <SectionTitle>
            <h1 className="mb-6">Palet Depo Rezervasyonu</h1>
          </SectionTitle>
          <p className="text-lg text-foreground-accent max-w-2xl mx-auto mb-8">
            Depolama ihtiyaçlarınız için hızlı ve güvenli rezervasyon yapın. 
            Formda verdiğiniz bilgiler doğrultusunda size en uygun çözümü sunacağız.
          </p>
          
          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            [... geri kalan kod ...]
          </div>
        </section>

        {/* Reservation Form */}
        <ReservationForm />

        {/* Contact Information & FAQ sections ... */}
      </Container>
    </div>
  );
}
export default RezervasyonPage;