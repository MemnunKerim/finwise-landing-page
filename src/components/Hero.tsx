import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { heroDetails } from '@/data/hero';

const Hero: React.FC = () => {
    return (
        <section
            id="hero"
            className="relative isolate overflow-hidden
                       bg-gradient-to-b from-white/80 to-white
                       pt-32 md:pt-28 pb-20"

        >
            {/* ───────── GRID (arka plan) ───────── */}
            <div className="absolute left-0 top-0 bottom-0 -z-50 w-full">
                <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]">
                </div>
            </div>
            
            {/* --- 1. GRID + radial mask (fade çevreleri) --- */}
            <div
                className="pointer-events-none absolute inset-0 -z-10
                           bg-[url('/images/grid.svg')] bg-center opacity-10
                           bg-[length:40px_40px]
                           [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent_100%)]"
            />

            {/* --- 2. Alt blur & soft gradient (eski Hero’dan) --- */}
            <div
                className="pointer-events-none absolute left-0 right-0 bottom-0 h-40 -z-10
                           backdrop-blur-[2px]
                           bg-gradient-to-b from-transparent
                           via-[rgba(233,238,255,0.5)]
                           to-[rgba(202,208,230,0.5)]"
            />

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
                            /* ─ İlk CTA: dolu turuncu buton ─ */
                            className="px-8 py-4 rounded-full bg-white border-2 border-accent text-black font-semibold
                                        shadow-xl hover:bg-yellow-400 transition text-center"
                        >
                            Rezervasyon Yap
                        </Link>
                        <Link
                            href="/iletisim"
                            className="px-8 py-4 rounded-full border-2 border-accent shadow-xl text-accent font-semibold hover:bg-white hover:text-yellow-500 transition text-center"
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