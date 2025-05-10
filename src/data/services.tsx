// PaletDepo – Hizmetler / Çözümler
import { BsGraphUpArrow, BsBoxSeam, BsFillGearFill } from "react-icons/bs";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { IBenefit } from "@/types";          // BenefitSection zaten IBenefit bekliyor

export const services: IBenefit[] = [
  {
    /* 1. Dijital Depo Yönetimi */
    title: "Dijital Depo Yönetimi",
    description:
      "Kendi geliştirdiğimiz MERN tabanlı WMS ile paletlerinizi anlık olarak izleyin ve raporlayın.",
    imageSrc: "/images/service-digital.jpg",              // sağ kolon resim için
    bullets: [
      {
        title: "Canlı Stok Takibi",
        description: "Depodaki palet miktarını ve lokasyonunu anlık görün.",
        icon: <BsGraphUpArrow className="w-6 h-6 text-accent" />,
      },
      {
        title: "Hareket Geçmişi",
        description: "Giriş/çıkış işlemleri saniyesi saniyesine kaydedilir.",
        icon: <MdOutlineQrCodeScanner className="w-6 h-6 text-accent" />,
      },
      {
        title: "Palet Ayrıntıları",
        description: "Her paletin içeriğini ve QR kodunu tek tıkla görüntüleyin.",
        icon: <BsBoxSeam className="w-6 h-6 text-accent" />,
      },
      {
        title: "Günlük Harcama & Fatura",
        description: "Günlük ücret ve fatura takibi otomatik oluşur.",
        icon: <BsFillGearFill className="w-6 h-6 text-accent" />,
      },
    ],
  },

  {
    /* 2. Birim Yük Haline Getirme */
    title: "Birim Yük (TIR / Konteyner) Hazırlığı",
    description:
      "Biriktirilen paletler, sevkiyata hazır TIR veya konteyner birim yük hâline getirilir; sayım ve kalite kontrolü sonrası gönderilir.",
    imageSrc: "/images/service-unitload.jpg",             // sol kolon resim
    bullets: [
      { title: "Palet Konsolidasyonu", description: "Farklı paletler tek sevkiyat için birleştirilir.", icon: <BsBoxSeam className="w-6 h-6 text-accent" /> },
      { title: "Sayım & Kontrol",   description: "Yüklemeden önce adet ve hasar kontrolü yapılır.",   icon: <BsGraphUpArrow className="w-6 h-6 text-accent" /> },
      { title: "Sevkiyat Planlama", description: "TIR/konteyner doluluk optimizasyonu sağlanır.",     icon: <BsFillGearFill className="w-6 h-6 text-accent" /> },
    ],
  },

  {
    /* 3. Elleçleme & Güçlendirme */
    title: "Elleçleme ve Palet Güçlendirme",
    description:
      "Dökme gelen ürünler paletlenir, köşebent ve streç ile güçlendirilir, plastik çemberle sabitlenir.",
    imageSrc: "/images/service-handling.jpg",             // sağ kolon resim
    bullets: [
      { title: "Paletleme",     description: "Dökme ürünleri hızlıca palet üzerine yerleştiriyoruz.",         icon: <BsBoxSeam className="w-6 h-6 text-accent" /> },
      { title: "Köşebent & Streç", description: "Karton köşebent + streç film ile yük stabilitesi artırılır.", icon: <BsGraphUpArrow className="w-6 h-6 text-accent" /> },
      { title: "Çemberleme",    description: "Plastik çember ve kelepçe ile palet bütünlüğü sağlanır.",       icon: <BsFillGearFill className="w-6 h-6 text-accent" /> },
    ],
  },
];
