/* yeni – basit blog veri kaynağı */
export interface BlogMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;          // ISO
}

export const blogPosts: BlogMeta[] = [
  {
    slug: "soguk-zincir-lojistigi",
    title: "Soğuk Zincir Lojistiği: Gıda ve İlaç Depolama Rehberi",
    excerpt:
      "Gıda güvenliği ve ilaç kalitesi söz konusu olduğunda, soğuk zincir lojistiği hayati önem taşır. Yanlış sıcaklık yönetimi, hem ürün kayıplarına hem de ciddi sağlık risklerine yol açabilir.",
    date: "2024-01-25",
  },
  {
    slug: "sezonsal-stok-yonetimi",
    title: "Sezonsal Stok Yönetimi: Depolama Stratejileri ve Maliyet Optimizasyonu",
    excerpt:
      "Yazın klima, kışın soba satışları tavan yaparken, diğer dönemlerde bu ürünler depolarda yer kaplar. Sezonsal ürün satan işletmeler için stok yönetimi ve depolama maliyetleri ciddi bir sorun olabilir.",
    date: "2024-01-20",
  },
  {
    slug: "adr-tehlikeli-madde-depolama",
    title: "ADR Tehlikeli Madde Depolama: Güvenlik ve Mevzuat Rehberi",
    excerpt:
      "Kimyasal maddeler, yakıtlar, boyalar veya temizlik ürünleri mi depoluyorsunuz? ADR sınıfına giren tehlikeli maddelerin depolanması, özel güvenlik önlemleri ve yasal düzenlemeler gerektirir.",
    date: "2024-01-15",
  },
  {
    slug: "kucuk-isletme-depo-cozumleri",
    title: "Küçük İşletmeler için Depo Çözümleri: Büyümeye Hazır Lojistik",
    excerpt:
      "Girişimden büyümeye, küçük işletmeler için maliyet etkin ve ölçeklenebilir depo çözümleri. Esnek fiyatlandırma ile büyümenizi destekleyin.",
    date: "2025-05-27",
  },
  {
    slug: "depo-guvenlik-sigorta",
    title: "Depo Güvenliği ve Sigorta: Riski Minimize Etme Rehberi",
    excerpt:
      "Modern güvenlik teknolojileri, sigorta stratejileri ve risk yönetimi ile deponuzu koruyun. Kapsamlı güvenlik rehberi.",
    date: "2025-05-26",
  },
  {
    slug: "cross-docking-transit-depolama",
    title: "Cross-docking ve Transit Depolama: Hızlı Dağıtım Çözümleri",
    excerpt:
      "Walmart ve Amazon'un kullandığı cross-docking stratejileri ile stok maliyetlerinizi %70'e varan oranda azaltın.",
    date: "2025-05-25",
  },
  {
    slug: "b2b-lojistik-kargo-entegrasyonu",
    title: "B2B Lojistik ve Kargo Entegrasyonu: Çoklu Kargo Yönetimi",
    excerpt:
      "Aras'tan MNG'ye, tüm kargo firmalarıyla akıllı entegrasyon. API entegrasyonu ve maliyet optimizasyonu stratejileri.",
    date: "2025-05-24",
  },
  {
    slug: "palet-depolama-maliyeti-nasil-optimize-edilir",
    title: "Palet Depolama Maliyeti Nasıl Optimize Edilir?",
    excerpt:
      "Doğru depo lokasyonu ve dinamik fiyatlandırma modeliyle işletme giderlerinizi %20'ye varan oranda azaltmanın yolları.",
    date: "2025-05-20",
  },
  {
    slug: "e-ticarette-fulfillment-ve-depo-secimi",
    title: "E-ticarette Fulfillment ve Depo Seçimi",
    excerpt:
      "Sipariş hacminiz hızla artarken palet bazlı depolama ve micro-fulfillment çözümleriyle ölçeklenin.",
    date: "2025-05-15",
  },
  {
    slug: "wms-entegrasyonu-ile-canli-stok-takibi",
    title: "WMS Entegrasyonu ile Canlı Stok Takibi",
    excerpt:
      "MERN tabanlı WMS'imizle gerçek zamanlı stok izleme, raporlama ve API entegrasyonu örnekleri.",
    date: "2025-05-01",
  },
];