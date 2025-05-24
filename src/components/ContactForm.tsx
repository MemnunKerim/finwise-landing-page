/* new – ContactForm.tsx */
"use client";

import { useState } from "react";

const ContactForm: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData(e.currentTarget);

    /*  ➜  Formspree örneği.
        Hesabınızda yeni bir “form” oluşturduğunuzda
        oluşan ID’yi `yourFormID` yerine yazın. */
    await fetch("https://formspree.io/f/yourFormID", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    }).catch(() => {});

    e.currentTarget.reset();
    setSubmitting(false);
    alert("Talebiniz alındı! En kısa sürede sizinle iletişime geçeceğiz.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 text-left"
    >
      {/* Ad / Soyad */}
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          required
          name="firstName"
          placeholder="Adınız *"
          className="input"
        />
        <input
          required
          name="lastName"
          placeholder="Soyadınız *"
          className="input"
        />
      </div>

      {/* Telefon / E-posta */}
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          required
          name="phone"
          placeholder="Telefon Numaranız *"
          className="input"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="E-posta Adresiniz *"
          className="input"
        />
      </div>

      {/* Hizmet seçimi */}
      <fieldset className="space-y-2">
        <legend className="font-semibold text-sm">
          Aradığınız Hizmet Nedir? *
        </legend>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="service"
            value="B2B Lojistik Depolama"
            required
          />
          B2B Lojistik Depolama
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="service"
            value="Yurt İçi Fulfillment"
            required
          />
          Yurt İçi Fulfillment
        </label>
      </fieldset>

      {/* Mesaj */}
      <textarea
        name="message"
        placeholder="Mesajınız (isteğe bağlı)"
        rows={4}
        className="input"
      />

      {/* Onay kutuları */}
      <label className="flex items-start gap-2 text-xs leading-snug">
        <input type="checkbox" name="promoConsent" required />
        PaletDepo’dan haber, etkinlik ve ürün duyurularını e-posta ile almak
        için ticari ileti onay metnini okudum ve kabul ediyorum.
      </label>

      <label className="flex items-start gap-2 text-xs leading-snug">
        <input type="checkbox" name="kvkkConsent" required />
        Kişisel verilerimin, tepe markamız Memnun Depo Nakliyat Lojistik San. ve Tic.
        tarafından KVKK Aydınlatma Metni’nde açıklandığı şekilde işlenmesini
        okudum ve onaylıyorum.
      </label>

      {/* Gönder butonu */}
      <button
        type="submit"
        disabled={submitting}
        className="bg-primary hover:bg-primary-accent text-black font-semibold px-8 py-3 rounded-full transition disabled:opacity-50"
      >
        {submitting ? "Gönderiliyor…" : "Gönder"}
      </button>
    </form>
  );
};

/* Küçük yardımcı sınıf */
const inputBase =
  "w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-3 text-sm placeholder-gray-500 focus:border-primary focus:ring-primary";

export default ContactForm;
