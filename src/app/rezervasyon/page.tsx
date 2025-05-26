
 import Container from "@/components/Container";
 import SectionTitle from "@/components/SectionTitle";
 import ReservationForm from "@/components/ReservationForm";
 import { BsShieldCheck, BsClock, BsHeadset } from "react-icons/bs";
 
 export const metadata = {
   title: "Rezervasyon – PaletDepo",
   description: "PaletDepo'da depo alanınızı hemen rezerve edin. Detaylı ürün bilgileri ile güvenli depolama.",
   keywords: "palet rezervasyon, depo rezervasyon, esenyurt depo, palet depolama rezervasyonu"
 };
 
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
             <div className="flex flex-col items-center text-center p-4">
               <BsShieldCheck className="w-8 h-8 text-primary mb-3" />
               <h3 className="font-semibold mb-2">Güvenli Depolama</h3>
               <p className="text-sm text-foreground-accent">7/24 güvenlik, sigorta kapsamı</p>
             </div>
             <div className="flex flex-col items-center text-center p-4">
               <BsClock className="w-8 h-8 text-primary mb-3" />
               <h3 className="font-semibold mb-2">Hızlı Başlangıç</h3>
               <p className="text-sm text-foreground-accent">2 saat içinde geri dönüş</p>
             </div>
             <div className="flex flex-col items-center text-center p-4">
               <BsHeadset className="w-8 h-8 text-primary mb-3" />
               <h3 className="font-semibold mb-2">Uzman Destek</h3>
               <p className="text-sm text-foreground-accent">Özel müşteri temsilcisi</p>
             </div>
           </div>
         </section>
 
         {/* Reservation Form */}
         <ReservationForm />
 
         {/* Contact Information */}
         <section className="mt-16 text-center">
           <div className="bg-hero-background rounded-xl p-8">
             <h3 className="text-xl font-semibold mb-4">Hemen İletişime Geçmek İstiyor musunuz?</h3>
             <p className="text-foreground-accent mb-6">
               Acil rezervasyon ihtiyaçlarınız için doğrudan bizi arayabilirsiniz.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <a 
                 href="tel:+902127584214" 
                 className="bg-secondary text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
               >
                 📞 0 (212) 758 42 14
               </a>
               <a 
                 href="https://wa.me/905379527145" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
               >
                 💬 WhatsApp ile Yaz
               </a>
               <a 
                 href="mailto:rezervasyon@paletdepo.com"
                 className="bg-primary text-black px-6 py-3 rounded-full hover:bg-primary-accent transition"
               >
                 ✉️ E-posta Gönder
               </a>
             </div>
           </div>
         </section>
 
         {/* FAQ Section */}
         <section className="mt-16">
           <SectionTitle>
             <h2 className="text-center mb-8">Rezervasyon Hakkında</h2>
           </SectionTitle>
           <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <div className="bg-white border border-gray-200 rounded-lg p-6">
               <h4 className="font-semibold mb-3">🕐 Ne Kadar Sürede Başlayabilirim?</h4>
               <p className="text-sm text-foreground-accent">
                 Rezervasyon talebinizi aldıktan sonra 2 saat içinde size dönüş yapıyoruz. 
                 Onay sonrası aynı gün içinde paletlerinizi teslim alabilirsiniz.
               </p>
             </div>
             <div className="bg-white border border-gray-200 rounded-lg p-6">
               <h4 className="font-semibold mb-3">💰 Ödeme Nasıl Yapılır?</h4>
               <p className="text-sm text-foreground-accent">
                 Günlük depolama için haftalık, aylık abonelik için aylık faturalandırma. 
                 Kredi kartı, havale/EFT ve çek ile ödeme seçenekleri.
               </p>
             </div>
             <div className="bg-white border border-gray-200 rounded-lg p-6">
               <h4 className="font-semibold mb-3">📦 Hangi Ürünleri Depolayabilirim?</h4>
               <p className="text-sm text-foreground-accent">
                 Gıda, tekstil, elektronik, mobilya gibi çoğu ürün grubu kabul edilir. 
                 Tehlikeli madde durumunda özel onay gereklidir.
               </p>
             </div>
             <div className="bg-white border border-gray-200 rounded-lg p-6">
               <h4 className="font-semibold mb-3">🚛 Nakliye Hizmeti Var Mı?</h4>
               <p className="text-sm text-foreground-accent">
                 İstanbul içi nakliye hizmetimiz mevcuttur. Rezervasyon sırasında 
                 nakliye ihtiyaçınızı belirtebilirsiniz.
               </p>
             </div>
           </div>
         </section>
       </Container>
     </div>
   );
 };
 
 export default RezervasyonPage;