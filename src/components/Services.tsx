'use client';
import { services } from "@/data/services";
import BenefitSection from "./Benefits/BenefitSection";

export default function Services() {
  return (
    <>
      {services.map((svc, idx) => (
        <BenefitSection
            key={svc.title}
            benefit={svc}                 // ⚠️ zorunlu alan
            imageAtRight={idx % 2 === 1}  // dönüşümlü hizalama
        />
      ))}
    </>
  );
}
