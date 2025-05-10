"use client";
import Image from "next/image";
import { logos } from "@/data/logos";

const Logos: React.FC = () => (
  <section id="logos" className="py-32 px-5 bg-background">
    <p className="text-lg font-medium text-center">
      Güvenen <span className="text-secondary">100+</span> Türkiye geneli müşteri
    </p>

    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 place-items-center">
      {logos.map((name) => (
        <Image
          key={name}
          src={`/logos/${name}.png`}
          alt={`${name} logo`}
          width={140}
          height={40}
          className="h-10 w-auto object-contain
                     grayscale opacity-60
                     hover:grayscale-0 hover:opacity-100
                     transition"
        />
      ))}
    </div>
  </section>
);

export default Logos;
