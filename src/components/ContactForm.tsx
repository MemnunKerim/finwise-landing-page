/* new – ContactForm.tsx */
"use client";

import { useState } from "react";

const ContactForm: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;               /* 🔑 referansı tut */
    const fd = new FormData(form);
    /* Form alanlarını tek tek eşleştir (adlar şemayla %100 aynı) */
    const payload = {
      firstName: fd.get("firstName") || "",
      lastName:  fd.get("lastName")  || "",
      phone:     fd.get("phone")     || "",
      email:     fd.get("email")     || "",
      service:   fd.get("service")   || "",
      message:   fd.get("message")   || "",
      promoConsent: fd.get("promoConsent") === "true",
      kvkkConsent:  fd.get("kvkkConsent")  === "true",
    };

    /*  ➜  Formspree örneği.
        Hesabınızda yeni bir “form” oluşturduğunuzda
        oluşan ID’yi `yourFormID` yerine yazın. */
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
      method: "POST",
      body: JSON.stringify(payload),
          /*  JSON gövdeyi Express json()’ın parse edebilmesi için
        Content-Type mutlaka application/json olmalı              */
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Bad Request");
        form.reset();                           /* 👉 güvenli reset */
        alert("Talebiniz alındı! En kısa sürede sizinle iletişime geçeceğiz.");
      })
      .catch(() => alert("Gönderim sırasında bir hata oluştu."))
      .finally(() => setSubmitting(false));
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
          className={inputBase}
        />
        <input
          required
          name="lastName"
          placeholder="Soyadınız *"
          className={inputBase}
        />
      </div>

      {/* Telefon / E-posta */}
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          required
          name="phone"
          placeholder="Telefon Numaranız *"
          className={inputBase}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="E-posta Adresiniz *"
          className={inputBase}
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
        className={inputBase}
      />

      {/* Onay kutuları */}
      <label className="flex items-start gap-2 text-xs leading-snug">
        <input type="checkbox" name="promoConsent" value="true" required />
        PaletDepo’dan haber, etkinlik ve ürün duyurularını e-posta ile almak
        için ticari ileti onay metnini okudum ve kabul ediyorum.
      </label>

      <label className="flex items-start gap-2 text-xs leading-snug">
        <input type="checkbox" name="kvkkConsent" value="true" required />
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

/* 🔧 ortak input stilini değişkene atayıp gerçekten kullanalım */
const inputBase =
  "w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-3 text-sm placeholder-gray-500 focus:border-primary focus:ring-primary";

export default ContactForm;
