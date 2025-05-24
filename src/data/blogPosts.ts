/* yeni – basit blog veri kaynağı */
export interface BlogMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;          // ISO
}

export const blogPosts: BlogMeta[] = [
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
      "MERN tabanlı WMS’imizle gerçek zamanlı stok izleme, raporlama ve API entegrasyonu örnekleri.",
    date: "2025-05-01",
  },
];
