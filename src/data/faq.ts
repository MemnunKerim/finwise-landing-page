import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
{
    question: "Minimum kaç palet depolayabilirim?",
    answer:
      "PaletDepo’da minimum depo limiti yoktur. Tek bir palet dahi depolayabilir, ihtiyacınız arttıkça kapasiteyi anında yükseltebilirsiniz."
  },
  {
    question: "Depo rezervasyonumu nasıl oluştururum?",
    answer:
      "Web sitemizdeki Rezervasyon formunu doldurabilir veya iletişim bilgilerinizi bırakarak ekibimizin sizinle aynı gün içinde iletişime geçmesini sağlayabilirsiniz."
  },
  {
    question: "Paletlerime 7/24 erişim sağlayabilir miyim?",
    answer:
      "Evet. Tüm depolarımız randevulu 7/24 erişim sunar. Panelden çıkış talebi oluşturmanız yeterlidir; ekiplerimiz belirttiğiniz saat aralığında hazırlık yapar."
  },
  {
    question: "Fiyatlandırma nasıl hesaplanıyor?",
    answer:
      "Günlük modelde paletiniz depoda kaç gün kaldıysa o kadar ücret ödersiniz. Abonelik modelinde ise palet başı sabit aylık ücret uygulanır; fatura dönemi sonunda otomatik kesilir."
  },
  {
    question: "Paletlerim sigortalı mı?",
    answer:
      "Depolarımız zorunlu yangın ve hırsızlık sigortasına sahiptir. Ek teminat isterseniz değer bazlı sigorta paketi opsiyonel olarak sunulur."
  },
  {
    question: "API veya ERP entegrasyonu mümkün mü?",
    answer:
      "MERN tabanlı WMS’imiz REST API desteği sağlar. Stok verilerinizi kendi ERP veya lojistik yönetim sisteminize gerçek zamanlı aktarabilirsiniz."
  }
];