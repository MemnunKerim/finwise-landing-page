# PaletDepo Blog Sistemi - Claude Çalışma Notları

## Proje Özeti
Next.js 14 tabanlı PaletDepo web sitesi blog sistemi entegrasyonu ve geliştirmeleri.

## Tamamlanan İşler

### Blog Sistemi Entegrasyonu
- ✅ 10 blog yazısı markdown formatında oluşturuldu
- ✅ Responsive newspaper-style layout (desktop 2-3 kolon)
- ✅ Blog içerik yönetimi (markdown + frontmatter)
- ✅ Hero görselleri ve thumbnail desteği
- ✅ TypeScript entegrasyonu

### Blog Yazıları (Kronolojik)
1. **WMS Entegrasyonu ile Canlı Stok Takibi** (2025-05-01)
2. **E-ticarette Fulfillment ve Depo Seçimi** (2025-05-15) 
3. **Palet Depolama Maliyeti Optimizasyonu** (2025-05-20)
4. **B2B Lojistik ve Kargo Entegrasyonu** (2025-05-24)
5. **Cross-docking ve Transit Depolama** (2025-05-25)
6. **Depo Güvenliği ve Sigorta** (2025-05-26)
7. **Küçük İşletme Depo Çözümleri** (2025-05-27)
8. **ADR Tehlikeli Madde Depolama** (2024-01-15) 
9. **Sezonsal Stok Yönetimi** (2024-01-20)
10. **Soğuk Zincir Lojistiği** (2024-01-25)

### Teknik Düzeltmeler
- ✅ Blog text container contrast sorunu çözüldü
- ✅ Responsive overflow/scroll problemi düzeltildi
- ✅ Sitemap.xml ve robots.txt eklendi (Google Search Console)

### Dosya Yapısı
```
src/
├── content/blog/           # Markdown blog dosyları
├── data/blogPosts.ts       # Blog metadata
├── lib/blog.ts            # Blog utility fonksiyonları
├── app/blog/              # Blog sayfaları
├── app/sitemap.ts         # SEO sitemap
└── app/robots.ts          # Robots.txt

public/images/             # Blog görselleri
```

### CSS Sınıfları (Sorun Çözümü)
```css
/* Blog containers - contrast ve overflow fix */
.prose-code:bg-gray-800 .prose-code:text-white
.prose-pre:bg-gray-800 .prose-pre:text-white 
overflow-hidden, word-wrap: break-word
```

### Kullanılan Kütüphaneler
- gray-matter: Markdown frontmatter parsing
- remark: Markdown to HTML conversion
- PyPDF2: PDF içerik çıkarma (Python)

## Müşteri Örnekleri (Blog İçeriğinde)
- MyMescid: Ramazan sezonu stok yönetimi
- Favron: Bölgesel dalgalanma depolama
- Gökbora Lojistik: ADR depolama sistemi
- Borusan Lojistik: Çoklu sıcaklık bölmeleri

## Gelecek Geliştirmeler
- [ ] Blog kategorileri sistemi
- [ ] Arama fonksiyonu
- [ ] İlgili yazılar önerisi
- [ ] Social media paylaşım butonları
- [ ] Newsletter entegrasyonu

## Önemli Notlar
- Blog yazıları Turkish locale kullanıyor
- Newspaper layout sadece desktop (lg: breakpoint)
- Hero görseller Next.js Image component ile optimize
- SEO metadata her blog yazısı için ayrı tanımlı

Last updated: 2025-01-27