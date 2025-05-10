import { IPricing } from "@/types";

export const tiers: IPricing[] = [
  {
    name: "B2B‑Günlük",
    price: "₺30 / palet / gün",
    description:
      "Palet başına günlük ücret. Minimum süre yok, kaç gün depolarsanız o kadar ödersiniz.",
    features: [
      "Günlük fiyatlandırma",
      "Anında rezervasyon paneli",
      "Gerçek zamanlı stok takibi",
      "7/24 depo erişimi",
    ],
    cta: { text: "Teklif Al", href: "/iletisim" },
  },
  {
    name: "B2B‑Abonelik",
    price: "₺750 / palet / ay",
    description:
      "Düzenli depolama yapan firmalar için sabit aylık ücret. Maliyetleri önceden planlayın.",
    features: [
      "Sabit aylık ücret",
      "Öncelikli elleçleme",
      "Aylık envanter raporu",
      "Özel müşteri temsilcisi",
    ],
    highlight: true,
    cta: { text: "Teklif Al", href: "/iletisim" },
  },
];
