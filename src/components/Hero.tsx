import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { heroDetails } from '@/data/hero';

const Hero: React.FC = () => {
    return (
        <section
            id="hero"
            className="relative isolate overflow-hidden bg-gradient-to-b from-white/80 to-white py-20 md:py-28"

        >
            {/* arka plan kare grid */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/grid.svg')] bg-center opacity-10" />

            {/* GRID LAYOUT */}
            <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">
                {/* Görsel – sağ tarafta (md+) */}
                <div className="w-full md:w-1/2">
                    <Image
                        src={heroDetails.centerImageSrc}
                        width={600}
                        height={460}
                        quality={100}
                        sizes="(max-width: 768px) 90vw, 600px"
                        priority
                        alt="Depoda palet görseli"
                        className="rounded-lg shadow-xl mx-auto md:mx-0"
                    />
                </div>

                {/* Metin & CTA – sol tarafta (md+) */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground md:leading-tight">
                        {heroDetails.heading}
                    </h1>
                    <p className="mt-4 text-lg text-foreground/80 max-w-lg md:max-w-none md:pr-8">
                        {heroDetails.subheading}
                    </p>

                    {/* CTA Butonları */}
                    <div className="mt-8 flex flex-col sm:inline-flex sm:flex-row md:justify-start justify-center gap-4">
                        <Link
                            href="/rezervasyon"
                            className="px-8 py-4 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-white transition text-center"
                        >
                            Rezervasyon Yap
                        </Link>
                        <Link
                            href="/iletisim"
                            className="px-8 py-4 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-white transition text-center"
                        >
                            Fiyat Teklifi Al
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;