export const metadata = {
    title: "İletişim – PaletDepo",
    description: "Bize hemen ulaşın, teklif alın."
  };
  
  const IletisimPage = () => (
    <div className="pt-24 pb-16 max-w-xl mx-auto text-center space-y-6">
      <h1 className="text-4xl font-bold">İletişim</h1>
      <p className="text-foreground-accent">
        Depolama ihtiyaçlarınız için bize ulaşın.
      </p>
      <a
        href="https://wa.me/905xxxxxxxxx"
        className="inline-block bg-accent text-white py-3 px-6 rounded-full"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp ile Yaz
      </a>
      <p>
        <strong>Telefon:</strong> <a href="tel:+90xxxxxxxxxx">0 (xxx) xxx xx xx</a>
        <br />
        <strong>E‑posta:</strong> <a href="mailto:info@paletdepo.com">info@paletdepo.com</a>
      </p>
    </div>
  );
  
  export default IletisimPage;
  