import { ITestimonial } from "@/types";
import { siteDetails } from "./siteDetails";

export const testimonials: ITestimonial[] = [
    {
        name: 'Ali Bey',
        role: 'MyMescid - CEO',
        message: `Ramazan sezonu öncesi stoklarımızı hızla artırmamız gerektiğinde PaletDepo ile çalışıyoruz. `,
        avatar: '/images/testimonial-1.webp',
    },
    {
        name: 'Koray Bey',
        role: 'Favron - CTO',
        message: `Ürün sevkiyatlarımız bölgesel dalgalanma gösterdiği için günlük palet depolama modeli çok işimize yarıyor.`,
        avatar: '/images/testimonial-2.webp',
    },
    {
        name: 'Burhanettin Bey',
        role: 'POSTRANS - CEO',
        message: `PaletDepo Esenyurttaki ambarımız. Günlük depolama ücretlendirmesi ve dağıtım merkezi işlevi tüm ihtiyaçlarımızı karşılıyor.`,
        avatar: '/images/testimonial-3.webp',
    },

];