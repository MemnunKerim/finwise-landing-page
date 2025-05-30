export interface IMenuItem {
    text: string;
    url: string;
}

export interface IBenefit {
    title: string;
    description: string;
    imageSrc: string;
    bullets: IBenefitBullet[]
}

export interface IBenefitBullet {
    title: string;
    description: string;
    icon: JSX.Element;
}
export interface IProcessStep {
  id: number;
  title: string;
  desc: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export interface IPricing {
  name: string;
  price: string;            // "₺15 / palet / gün" gibi tek string
  features: string[];
  description?: string;     // (yeni) kısa açıklama satırı
  highlight?: boolean;
  cta?: { text: string; href: string };   // (yeni) butonda kullanılacak
}

export interface IFAQ {
    question: string;
    answer: string;
}

export interface ITestimonial {
    name: string;
    role: string;
    message: string;
    avatar: string;
}

export interface IStats {
    title: string;
    icon: JSX.Element;
    description: string;
}

export interface ISocials {
    facebook?: string;
    github?: string;
    instagram?: string;
    linkedin?: string;
    threads?: string;
    twitter?: string;
    youtube?: string;
    x?: string;
    [key: string]: string | undefined;
}