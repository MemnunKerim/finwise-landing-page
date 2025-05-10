'use client';
import { processSteps } from "@/data/process";
import clsx from "clsx";

export default function ProcessFlow() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-20">
      {/* Başlık */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-bold">PaletDepo Nasıl Çalışır?</h2>
        <p className="mt-4 text-gray-600">
          Depolama sürecinizi 4 basit adımda tamamlayın.
        </p>
      </div>

      {/* Adımlar */}
      <div className="flex flex-col md:grid md:grid-cols-4 gap-12 relative">
        {processSteps.map((step, idx) => (
          <div key={step.id} className="text-center md:text-left">
            {/* Daire + numara */}
            <div className="mx-auto md:mx-0 w-14 h-14 flex items-center justify-center
                            text-white bg-primary rounded-full text-xl font-bold mb-4">
              {step.id}
            </div>

            {/* Icon */}
            <step.icon className="w-10 h-10 text-accent mx-auto md:mx-0 mb-4" />

            {/* Başlık */}
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>

            {/* Açıklama */}
            <p className="text-gray-600">{step.desc}</p>

            {/* Ok çizgisi – sadece md ve üstü */}
            {idx < processSteps.length - 1 && (
              <div
                className={clsx(
                  "hidden md:block absolute top-7 h-0.5 bg-gray-300",
                  idx === 0 && "left-[calc(25%+1rem)] right-[75%]",
                  idx === 1 && "left-[calc(50%+1rem)] right-[50%]",
                  idx === 2 && "left-[calc(75%+1rem)] right-[25%]"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <a
          href="/iletisim"
          className="inline-block bg-primary hover:bg-primary-accent
                     text-white font-semibold px-8 py-3 rounded-full transition"
        >
          Şimdi Depo Rezervasyonu Yap
        </a>
      </div>
    </div>
  );
}
