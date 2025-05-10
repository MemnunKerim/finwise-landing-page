// PaletDepo – Avantajlar (Neden PaletDepo?)
import { IBenefit } from "@/types";
import {
  BsClockHistory,
  BsGraphUp,
  BsShieldCheck,
  BsPiggyBank,
  BsFillEmojiSmileFill,
} from "react-icons/bs";
import { HiOutlineLightningBolt, HiOutlineClipboardCheck } from "react-icons/hi";
import { MdOutlineWarehouse } from "react-icons/md";

export const benefits: IBenefit[] = [
  {
    /* — 1. Esneklik — */
    title: "Esnek Depolama ve Hızlı Ölçeklenme",
    description:
      "Palet bazında kiralama modeli sayesinde talep dalgalanmalarında alan sorununuz ortadan kalkar. İhtiyaç duyduğunuz kadar depolama kullanır, iş yoğunluğunuza göre anında ölçeklenirsiniz.",
    imageSrc: "/images/benefit-flexibility.jpg", // 16:9 veya dikey depo raf fotoğrafı
    bullets: [
      {
        title: "Günlük / Aylık Seçenekler",
        description:
          "Sabit kira kontratlarına gerek kalmadan gün, hafta veya ay bazında depolama.",
        icon: <BsClockHistory className="w-6 h-6 text-accent" />,
      },
      {
        title: "Anında Rezervasyon",
        description: "Online panel üzerinden dakikalar içinde depo alanınızı ayırtın.",
        icon: <HiOutlineLightningBolt className="w-6 h-6 text-accent" />,
      },
      {
        title: "7/24 Erişim",
        description: "Ürünlerinize mesai saati kısıtı olmadan erişim imkânı.",
        icon: <MdOutlineWarehouse className="w-6 h-6 text-accent" />,
      },
    ],
  },
  {
    /* — 2. Maliyet Avantajı — */
    title: "Maliyet Tasarrufu ve Şeffaf Fiyatlandırma",
    description:
      "Kullanılmayan metrekareler için ödeme yapmayın. Sadece depolanan palet adedi ve süre üzerinden faturalandırma ile maliyetlerinizi %30'a varan oranlarda azaltın.",
    imageSrc: "/images/benefit-flexibility.jpg", // 16:9 veya dikey depo raf fotoğrafı
    bullets: [
      {
        title: "Kullandığın Kadar Öde",
        description: "Boş alan maliyeti yok; şeffaf palet başı fiyatlandırma.",
        icon: <BsPiggyBank className="w-6 h-6 text-accent" />,
      },
      {
        title: "Tahmini Bütçe",
        description:
          "Panelde kalan gün sayısı ve ödenecek tutarı anlık görebilirsiniz.",
        icon: <BsGraphUp className="w-6 h-6 text-accent" />,
      },
      {
        title: "Tek Fatura Kolaylığı",
        description:
          "Elleçleme ve depolama giderleri tek faturada birleşir, muhasebe kolaylaşır.",
        icon: <HiOutlineClipboardCheck className="w-6 h-6 text-accent" />,
      },
    ],
  },
  {
    /* — 3. Güvenlik & Operasyon — */
    title: "Güvenlik ve Operasyonel Mükemmellik",
    description:
      "Depolarımız 7/24 CCTV, yangın ve giriş kontrol sistemleri ile korunur. Eğitimli personel ile palet kabul, sayım ve çapraz kontroller standart süreçlere göre yapılır.",
    imageSrc: "/images/benefit-flexibility.jpg", // 16:9 veya dikey depo raf fotoğrafı
    bullets: [
      {
        title: "7/24 CCTV & Sigorta",
        description: "Tüm paletler kameralarla izlenir ve sigorta kapsamındadır.",
        icon: <BsShieldCheck className="w-6 h-6 text-accent" />,
      },
      {
        title: "Barkodlu Takip",
        description: "Palet hareketleri anlık olarak WMS'e işlenir, hatasız envanter.",
        icon: <HiOutlineClipboardCheck className="w-6 h-6 text-accent" />,
      },
      {
        title: "%99 Operasyonel Süreç Başarısı",
        description: "Teslim alma / çıkarma SLA'larımız sektörde lider.",
        icon: <BsGraphUp className="w-6 h-6 text-accent" />,
      },
    ],
  },
];
