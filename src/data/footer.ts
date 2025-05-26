import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    address:string;
    socials: ISocials;
} = {
    subheading: "Palet bazında esnek depolama, elleçleme ve dijital envanter yönetimi.",
      quickLinks: [
    { text: "Ana Sayfa", url: "/" },
    { text: "Hizmetler", url: "/#hizmetler" },
    { text: "Fiyatlar", url: "/#fiyatlar" },
    { text: "SSS", url: "/#faq" },
    { text: "İletişim", url: "/iletisim" },
    { text: "Rezervasyon", url: "/rezervasyon" },
  ],
    email: 'selam@paletdepo.com',
    telephone: "+90 212 758 42 14",
    address: "Zafer Mah. 118.Sk. No 10 Esenyurt/Ist MEMNUN DEPO ",
    socials: {
        // github: 'https://github.com',
        // x: 'https://twitter.com/x',
        twitter: 'https://twitter.com/Twitter',
        facebook: 'https://facebook.com',
        // youtube: 'https://youtube.com',
        linkedin: 'https://www.linkedin.com',
        // threads: 'https://www.threads.net',
        instagram: 'https://www.instagram.com',
    }
}