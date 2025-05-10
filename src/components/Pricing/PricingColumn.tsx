import clsx from "clsx";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { IPricing } from "@/types";

interface Props {
    tier: IPricing;
    highlight?: boolean;
}

const PricingColumn: React.FC<Props> = ({ tier, highlight }: Props) => {
    const { name, price, features, description, cta } = tier;

    return (
        <div className={clsx("w-full max-w-sm mx-auto bg-white rounded-xl border border-gray-200 lg:max-w-full", { "shadow-lg": highlight })}>
            <div className="p-6 border-b border-gray-200 rounded-t-xl">
                <h3 className="text-2xl font-semibold mb-4">{name}</h3>
                <p className="text-3xl md:text-4xl font-bold mb-4">
                <span className={clsx({ "text-secondary": highlight })}>{price}</span>
                </p>
                {description && <p className="text-sm text-gray-600 mb-6">{description}</p>}

<a href={cta?.href ?? '/iletisim'}
   className={clsx(
     'block text-center w-full py-3 px-4 rounded-full font-semibold transition',
     highlight
       ? 'bg-primary hover:bg-primary-accent text-white'
       : 'bg-hero-background hover:bg-gray-200 text-gray-900'
   )}
>
  {cta?.text ?? 'Teklif Al'}
</a>

            </div>
            <div className="p-6 mt-1">
                <p className="font-bold mb-0">ÖNE ÇIKAN ÖZELLİKLER</p>
                <ul className="space-y-4 mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <BsFillCheckCircleFill className="h-5 w-5 text-secondary mr-2" />
                            <span className="text-foreground-accent">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PricingColumn