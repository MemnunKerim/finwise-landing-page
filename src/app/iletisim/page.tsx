export const metadata = {
    title: "İletişim – PaletDepo",
    description: "Bize hemen ulaşın, teklif alın.",
    alternates: {
      canonical: "https://www.paletdepo.com/iletisim",
    },
  };
import CTA from "@/components/CTA";
/*  const IletisimPage = () => (
    <div className="pt-24 pb-16 max-w-xl mx-auto text-center space-y-6">
      <h1 className="text-4xl font-bold">İletişim</h1>
      <p className="text-foreground-accent">
        Depolama ihtiyaçlarınız için bize ulaşın.
      </p>
      <a
        href="https://wa.me/905379527145"
        className="inline-block bg-accent text-white py-3 px-6 rounded-full"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp ile Yaz
      </a>
      <p>
        <strong>Telefon:</strong> <a href="tel:+902127584214">0 (212) 758 42 14</a>
        <br />
        <strong>E‑posta:</strong> <a href="mailto:info@paletdepo.com">info@paletdepo.com</a>
      </p>
    </div>
  );
  */
const IletisimPage = () => (
  <div className="pt-12 pb-16 max-w-6xl mx-auto text-center space-y-6">
    <CTA />
  </div>
);

  export default IletisimPage;
  