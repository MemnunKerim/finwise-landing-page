// src/app/rezervasyon/page.tsx            <--  new*
import Link from "next/link";

export const metadata = {
  title: "Rezervasyon – PaletDepo",
  description:
    "PaletDepo’da depo alanınızı hemen rezerve edin. Yakında online ödeme!",
};

export default function RezervasyonPage() {
  return (
    <section className="container mx-auto max-w-4xl py-24 text-center">
      <h1 className="mb-6 text-4xl font-bold">Palet Depo Rezervasyonu</h1>
      <p className="mb-10 text-foreground-accent">
        Online rezervasyon modülü üzerinde çalışıyoruz. Şimdilik
        <br />
        <Link href="/iletisim" className="text-primary underline">
          iletişim formumuzu
        </Link>{" "}
        doldurarak ekibimizden teklif alabilirsiniz.
      </p>

      <div className="rounded-xl bg-muted p-8 shadow-lg">
        <p className="text-lg">
          <strong>Sıradaki adım:</strong> Güvenli ödeme &amp; stok planlama
          entegrasyonu.
        </p>
        <p className="mt-2 text-sm text-foreground-accent">
          (Bu sayfa, e-commerce benzeri satın alma sürecinin temelini
          oluşturacak.)
        </p>
      </div>
    </section>
  );
}
