import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "İstanbul Palet Depo Hizmetleri - Esenyurt, Büyükçekmece, Beylikdüzü | PaletDepo",
  description: "İstanbul'un her bölgesinde palet depolama hizmetleri. Esenyurt merkezli depomuzda Büyükçekmece, Beylikdüzü, Avcılar ve tüm İstanbul'dan paletleri güvenle saklayın.",
  keywords: "istanbul palet depo, esenyurt depo, büyükçekmece lojistik, beylikdüzü palet, avcılar depolama"
};

// Bölge verileri
const regions = [
  {
    name: "Esenyurt",
    distance: "0 km",
    accessTime: "Anında",
    description: "Ana depomuzun bulunduğu merkez lokasyon. 7/24 hızlı erişim.",
    features: ["Ana Depo Lokasyonu", "7/24 Erişim", "Anında Palet Teslim", "En Uygun Fiyatlar"]  },
  {
    name: "Büyükçekmece",
    distance: "12 km",
    accessTime: "15 dakika",
    description: "TEM Otoyolu üzerinden hızlı ulaşım. Paletlerinize kolay erişim.",
    features: ["Kolay Erişim", "Hızlı Ulaşım", "Esnek Saatler", "Güvenli Depolama"]
  },
  {
    name: "Beylikdüzü",
    distance: "18 km",
    accessTime: "20 dakika",
    description: "E-5 ve TEM bağlantısıyla kolay erişim. Marina ve AVM bölgesi müşterilerimiz için ideal.",
    features: ["Marina Bölgesi", "AVM Yakını", "Ticari Bölge", "Yoğun Nüfus"]
  },
  {
    name: "Avcılar",
    distance: "25 km",
    accessTime: "25 dakika",
    description: "Üniversite ve yerleşim bölgesi. Öğrenci ve işletme dostudur.",
    features: ["Üniversite Bölgesi", "Yerleşim Alanı", "Uygun Fiyatlar", "Öğrenci Dostu"]
  },
  {
    name: "Küçükçekmece",
    distance: "20 km",
    accessTime: "22 dakika",
    description: "Gölün etrafındaki ticari alanlar. Sanayi bölgesi yakını.",
    features: ["Sanayi Yakını", "Ticari Alan", "Göl Manzarası", "Merkezi Konum"]
  },
  {
    name: "İstanbul Geneli",
    distance: "50+ km",
    accessTime: "1-2 saat",
    description: "Kadıköy, Beşiktaş, Şişli ve diğer ilçelerden paletlerinizi getirebilirsiniz.",
    features: ["Tüm İlçeler", "Kendi Getirin", "Programlı Erişim", "Toplu Depolama"]
  }
];

const nearbyProvinces = [
  {
    name: "Çanakkale",
    distance: "320 km",
    description: "Boğaz geçişi ile ulaşım. Çanakkale'den paletleri getirtebilirsiniz."
  },
  {
    name: "Tekirdağ",
    distance: "90 km", 
    description: "Trakya bölgesi merkezi. Tekirdağ'dan paletleri kabul ediyoruz."
  },
  {
    name: "Kocaeli",
    distance: "160 km",
    description: "Sanayi şehri. Kocaeli fabrikalarının paletlerini depoluyoruz."
  }
];

const BolgelerPage = () => {
  return (
    <div className="pt-24 pb-16">
      <Container>
        {/* Hero Section */}
        <section className="text-center mb-16">
          <SectionTitle>
            <h1 className="mb-6">İstanbul Genelinde Palet Depolama Hizmetleri</h1>
          </SectionTitle>
          <p className="text-lg text-foreground-accent max-w-3xl mx-auto mb-8">
            Esenyurt merkezli ana depomuzdan İstanbul&apos;un her köşesine hızlı ve güvenilir 
            palet depolama hizmetleri sunuyoruz. Hangi bölgeden olursanız olun, paletlerinizi güvenle saklayın!
          </p>
          
          {/* Konum Görseli */}
          <div className="max-w-4xl mx-auto mb-12">
            <Image
              src="/images/warehouse-hero.webp"
              alt="İstanbul Esenyurt Palet Depo"
              width={800}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
        </section>

        {/* İstanbul Bölgeleri */}
        <section className="mb-16">
          <SectionTitle>
            <h2 className="text-center mb-12">Hizmet Verdiğimiz İstanbul Bölgeleri</h2>
          </SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region, index) => (
              <div 
                key={region.name}
                className={`bg-white rounded-xl border-2 p-6 hover:shadow-lg transition ${
                  index === 0 ? 'border-primary bg-primary/5' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{region.name}</h3>
                  <div className="text-right text-sm">
                    <div className="text-gray-600">{region.distance}</div>
                    <div className="text-primary font-semibold">{region.accessTime}</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{region.description}</p>
                
                <ul className="space-y-2">
                  {region.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {index === 0 && (
                  <div className="mt-4 text-center">
                    <span className="bg-primary text-black px-3 py-1 rounded-full text-sm font-semibold">
                      ANA DEPO
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Yakın İller */}
        <section className="mb-16">
          <SectionTitle>
            <h2 className="text-center mb-12">İstanbul Dışı Hizmet Bölgeleri</h2>
          </SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-6">
            {nearbyProvinces.map((province) => (
              <div key={province.name} className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">{province.name}</h3>
                <div className="text-primary font-bold mb-2">{province.distance}</div>
                <p className="text-sm text-gray-600">{province.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-foreground-accent mb-4">
              Listelenmeyen bölgelerden de paletlerinizi kabul ediyoruz.
            </p>
            <Link 
              href="/iletisim"
              className="bg-secondary text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
            >
              Bölgenizi Sorgulayın
            </Link>
          </div>
        </section>

        {/* Avantajlar */}
        <section className="bg-hero-background rounded-xl p-8">
          <SectionTitle>
            <h2 className="text-center mb-8">Neden PaletDepo?</h2>
          </SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Hızlı Erişim</h3>
              <p className="text-sm text-gray-600">İstanbul genelinde en hızlı palet erişim süresi</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-semibold mb-2">Merkezi Konum</h3>
              <p className="text-sm text-gray-600">TEM ve E-5&apos;e yakın stratejik lokasyon</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold mb-2">Adil Fiyat</h3>
              <p className="text-sm text-gray-600">Sadece depoladığınız palet için ödeme</p>
            </div>
            
            <div className="text-center">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold mb-2">Güvenli Depolama</h3>
              <p className="text-sm text-gray-600">7/24 güvenlik ve sigorta kapsamı</p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default BolgelerPage;