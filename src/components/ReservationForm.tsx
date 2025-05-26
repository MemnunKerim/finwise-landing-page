"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BsCheckCircleFill, 
  BsArrowLeft, 
  BsArrowRight, 
  BsCalendarDate,
  BsBoxSeam,
  BsPerson,
  BsCalculator
} from "react-icons/bs";

interface ReservationData {
  // Kişisel Bilgiler
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  email: string;
  
  // Ürün Bilgileri
  productType: string;
  productDescription: string;
  productValue: string;
  specialRequirements: string;
  temperatureRequirement: string;
  hazardousMaterial: boolean;
  
  // Palet Bilgileri
  paletCount: number;
  paletDimensions: string;
  totalWeight: string;
  stackable: boolean;
  
  // Depolama Bilgileri
  startDate: string;
  estimatedDuration: string;
  durationType: 'days' | 'weeks' | 'months';
  serviceType: 'daily' | 'monthly';
  
  // Ek Hizmetler
  needsHandling: boolean;
  needsPalletizing: boolean;
  needsWrapping: boolean;
  needsLabeling: boolean;
  
  // Yasal
  termsAccepted: boolean;
  kvkkConsent: boolean;
}

const initialData: ReservationData = {
  firstName: "",
  lastName: "",
  company: "",
  phone: "",
  email: "",
  productType: "",
  productDescription: "",
  productValue: "",
  specialRequirements: "",
  temperatureRequirement: "normal",
  hazardousMaterial: false,
  paletCount: 1,
  paletDimensions: "120x80x150",
  totalWeight: "",
  stackable: true,
  startDate: "",
  estimatedDuration: "",
  durationType: 'days',
  serviceType: 'daily',
  needsHandling: false,
  needsPalletizing: false,
  needsWrapping: false,
  needsLabeling: false,
  termsAccepted: false,
  kvkkConsent: false,
};

const steps = [
  { id: 1, title: "Kişisel Bilgiler", icon: BsPerson },
  { id: 2, title: "Ürün Detayları", icon: BsBoxSeam },
  { id: 3, title: "Depolama Planı", icon: BsCalendarDate },
  { id: 4, title: "Maliyet Özeti", icon: BsCalculator },
];

const ReservationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ReservationData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<"success" | "error" | null>(null);
  const [estimatedCost, setEstimatedCost] = useState(0);

  // Toast otomatik kapanma
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Maliyet hesaplama
  useEffect(() => {
    calculateCost();
  }, [formData.paletCount, formData.serviceType, formData.estimatedDuration, formData.durationType]);

  const calculateCost = () => {
    const dailyRate = 30; // ₺30/palet/gün
    const monthlyRate = 750; // ₺750/palet/ay
    
    let days = 0;
    const duration = parseInt(formData.estimatedDuration) || 0;
    
    switch (formData.durationType) {
      case 'days':
        days = duration;
        break;
      case 'weeks':
        days = duration * 7;
        break;
      case 'months':
        days = duration * 30;
        break;
    }

    let cost = 0;
    if (formData.serviceType === 'daily') {
      cost = formData.paletCount * dailyRate * days;
    } else {
      cost = formData.paletCount * monthlyRate * Math.ceil(days / 30);
    }

    // Ek hizmet maliyetleri
    const additionalServices = [
      formData.needsHandling && 50,
      formData.needsPalletizing && 25,
      formData.needsWrapping && 15,
      formData.needsLabeling && 10,
    ].filter(Boolean).reduce((sum: number, cost) => sum + (cost as number), 0);

    setEstimatedCost(cost + (additionalServices * formData.paletCount));
  };

  const updateFormData = (field: keyof ReservationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.phone && formData.email);
      case 2:
        return !!(formData.productType && formData.productDescription && formData.paletCount > 0);
      case 3:
        return !!(formData.startDate && formData.estimatedDuration);
      case 4:
        return formData.termsAccepted && formData.kvkkConsent;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setSubmitting(true);
    
    const payload = {
      ...formData,
      estimatedCost,
      formType: "reservation",
      siteDomain: window.location.host,
      submissionDate: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Submission failed");
      
      setToast("success");
      setFormData(initialData);
      setCurrentStep(1);
    } catch (error) {
      setToast("error");
      console.error("Reservation submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= step.id 
                  ? 'bg-primary text-black' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > step.id ? <BsCheckCircleFill /> : <step.icon />}
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 ${
                  currentStep > step.id ? 'bg-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-lg font-semibold">
          {steps[currentStep - 1].title}
        </p>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-6 md:p-8"
        >
          {currentStep === 1 && <PersonalInfoStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 2 && <ProductDetailsStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 3 && <StoragePlanStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 4 && <CostSummaryStep formData={formData} updateFormData={updateFormData} estimatedCost={estimatedCost} />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
        >
          <BsArrowLeft /> Geri
        </button>

        {currentStep < steps.length ? (
          <button
            onClick={nextStep}
            disabled={!validateStep(currentStep)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-accent transition"
          >
            İleri <BsArrowRight />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!validateStep(currentStep) || submitting}
            className="flex items-center gap-2 px-8 py-3 bg-secondary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition"
          >
            {submitting ? "Gönderiliyor..." : "Rezervasyonu Tamamla"}
          </button>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 rounded-lg px-6 py-3 text-white shadow-lg z-50 ${
          toast === "success" ? "bg-green-600" : "bg-red-600"
        }`}>
          {toast === "success" 
            ? "Rezervasyon talebiniz alındı! En kısa sürede sizinle iletişime geçeceğiz." 
            : "Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin."
          }
        </div>
      )}
    </div>
  );
};

// Step Components
const PersonalInfoStep: React.FC<{
  formData: ReservationData;
  updateFormData: (field: keyof ReservationData, value: any) => void;
}> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold mb-6">Kişisel ve Şirket Bilgileri</h3>
    
    <div className="grid md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Adınız *"
        value={formData.firstName}
        onChange={(e) => updateFormData('firstName', e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        required
      />
      <input
        type="text"
        placeholder="Soyadınız *"
        value={formData.lastName}
        onChange={(e) => updateFormData('lastName', e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        required
      />
    </div>

    <input
      type="text"
      placeholder="Şirket Adı"
      value={formData.company}
      onChange={(e) => updateFormData('company', e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
    />

    <div className="grid md:grid-cols-2 gap-4">
      <input
        type="tel"
        placeholder="Telefon Numaranız *"
        value={formData.phone}
        onChange={(e) => updateFormData('phone', e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        required
      />
      <input
        type="email"
        placeholder="E-posta Adresiniz *"
        value={formData.email}
        onChange={(e) => updateFormData('email', e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        required
      />
    </div>
  </div>
);

const ProductDetailsStep: React.FC<{
  formData: ReservationData;
  updateFormData: (field: keyof ReservationData, value: any) => void;
}> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold mb-6">Ürün ve Palet Detayları</h3>
    
    <div className="grid md:grid-cols-2 gap-4">
      <select
        value={formData.productType}
        onChange={(e) => updateFormData('productType', e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        required
      >
        <option value="">Ürün Türü Seçin *</option>
        <option value="gida">Gıda Ürünleri</option>
        <option value="tekstil">Tekstil</option>
        <option value="elektronik">Elektronik</option>
        <option value="mobilya">Mobilya</option>
        <option value="kimyasal">Kimyasal Ürünler</option>
        <option value="otomotiv">Otomotiv Parçaları</option>
        <option value="diger">Diğer</option>
      </select>

      <input
        type="number"
        placeholder="Palet Sayısı *"
        min="1"
        value={formData.paletCount}
        onChange={(e) => updateFormData('paletCount', parseInt(e.target.value) || 0)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        required
      />
    </div>

    <textarea
      placeholder="Ürün Açıklaması *"
      value={formData.productDescription}
      onChange={(e) => updateFormData('productDescription', e.target.value)}
      rows={3}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
      required
    />

    <div className="grid md:grid-cols-2 gap-4">
      <select
        value={formData.paletDimensions}
        onChange={(e) => updateFormData('paletDimensions', e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
      >
        <option value="120x80x150">Standart Palet (120x80x150 cm)</option>
        <option value="120x100x150">Euro Palet (120x100x150 cm)</option>
        <option value="custom">Özel Boyut</option>
      </select>

      <input
        type="text"
        placeholder="Toplam Ağırlık (kg)"
        value={formData.totalWeight}
        onChange={(e) => updateFormData('totalWeight', e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
      />
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Tahmini Değer (₺)"
        value={formData.productValue}
        onChange={(e) => updateFormData('productValue', e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
      />

      <select
        value={formData.temperatureRequirement}
        onChange={(e) => updateFormData('temperatureRequirement', e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
      >
        <option value="normal">Normal Oda Sıcaklığı</option>
        <option value="cool">Serin Ortam (10-15°C)</option>
        <option value="cold">Soğuk Depo (2-8°C)</option>
        <option value="frozen">Dondurulmuş (-18°C)</option>
      </select>
    </div>

    <div className="space-y-4">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={formData.stackable}
          onChange={(e) => updateFormData('stackable', e.target.checked)}
          className="w-5 h-5 text-primary"
        />
        <span>Paletler üst üste istifleme için uygun</span>
      </label>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={formData.hazardousMaterial}
          onChange={(e) => updateFormData('hazardousMaterial', e.target.checked)}
          className="w-5 h-5 text-primary"
        />
        <span>Tehlikeli madde içerir</span>
      </label>
    </div>

    <textarea
      placeholder="Özel Gereksinimler (isteğe bağlı)"
      value={formData.specialRequirements}
      onChange={(e) => updateFormData('specialRequirements', e.target.value)}
      rows={3}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
    />
  </div>
);

const StoragePlanStep: React.FC<{
  formData: ReservationData;
  updateFormData: (field: keyof ReservationData, value: any) => void;
}> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold mb-6">Depolama Planı ve Ek Hizmetler</h3>
    
    <div className="grid md:grid-cols-2 gap-4">
      <input
        type="date"
        value={formData.startDate}
        onChange={(e) => updateFormData('startDate', e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        required
      />

      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Süre *"
          min="1"
          value={formData.estimatedDuration}
          onChange={(e) => updateFormData('estimatedDuration', e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          required
        />
        <select
          value={formData.durationType}
          onChange={(e) => updateFormData('durationType', e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="days">Gün</option>
          <option value="weeks">Hafta</option>
          <option value="months">Ay</option>
        </select>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium mb-3">Fiyatlandırma Modeli *</label>
      <div className="grid md:grid-cols-2 gap-4">
        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="serviceType"
            value="daily"
            checked={formData.serviceType === 'daily'}
            onChange={(e) => updateFormData('serviceType', e.target.value)}
            className="mr-3"
          />
          <div>
            <div className="font-semibold">Günlük Fiyatlandırma</div>
            <div className="text-sm text-gray-600">₺30/palet/gün</div>
          </div>
        </label>
        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="serviceType"
            value="monthly"
            checked={formData.serviceType === 'monthly'}
            onChange={(e) => updateFormData('serviceType', e.target.value)}
            className="mr-3"
          />
          <div>
            <div className="font-semibold">Aylık Abonelik</div>
            <div className="text-sm text-gray-600">₺750/palet/ay</div>
          </div>
        </label>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium mb-3">Ek Hizmetler</label>
      <div className="grid md:grid-cols-2 gap-4">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.needsHandling}
            onChange={(e) => updateFormData('needsHandling', e.target.checked)}
            className="w-5 h-5 text-primary"
          />
          <span>Elleçleme Hizmeti (+₺50/palet)</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.needsPalletizing}
            onChange={(e) => updateFormData('needsPalletizing', e.target.checked)}
            className="w-5 h-5 text-primary"
          />
          <span>Paletleme (+₺25/palet)</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.needsWrapping}
            onChange={(e) => updateFormData('needsWrapping', e.target.checked)}
            className="w-5 h-5 text-primary"
          />
          <span>Streç Sarma (+₺15/palet)</span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.needsLabeling}
            onChange={(e) => updateFormData('needsLabeling', e.target.checked)}
            className="w-5 h-5 text-primary"
          />
          <span>Etiketleme (+₺10/palet)</span>
        </label>
      </div>
    </div>
  </div>
);

const CostSummaryStep: React.FC<{
  formData: ReservationData;
  updateFormData: (field: keyof ReservationData, value: any) => void;
  estimatedCost: number;
}> = ({ formData, updateFormData, estimatedCost }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold mb-6">Rezervasyon Özeti ve Onay</h3>
    
    <div className="bg-gray-50 rounded-lg p-6">
      <h4 className="text-lg font-semibold mb-4">Maliyet Hesaplaması</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Palet Sayısı:</span>
          <span>{formData.paletCount} adet</span>
        </div>
        <div className="flex justify-between">
          <span>Süre:</span>
          <span>{formData.estimatedDuration} {formData.durationType === 'days' ? 'gün' : formData.durationType === 'weeks' ? 'hafta' : 'ay'}</span>
        </div>
        <div className="flex justify-between">
          <span>Fiyatlandırma:</span>
          <span>{formData.serviceType === 'daily' ? 'Günlük' : 'Aylık'}</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between text-lg font-bold">
          <span>Tahmini Toplam:</span>
          <span>₺{estimatedCost.toLocaleString('tr-TR')}</span>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={formData.termsAccepted}
          onChange={(e) => updateFormData('termsAccepted', e.target.checked)}
          className="w-5 h-5 text-primary mt-0.5"
          required
        />
        <span className="text-sm">
          <a href="#" className="text-primary underline">Hizmet Şartları</a> ve 
          <a href="#" className="text-primary underline"> Fiyatlandırma Politikası</a>'nı okudum ve kabul ediyorum.
        </span>
      </label>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={formData.kvkkConsent}
          onChange={(e) => updateFormData('kvkkConsent', e.target.checked)}
          className="w-5 h-5 text-primary mt-0.5"
          required
        />
        <span className="text-sm">
          Kişisel verilerimin, Memnun Depo Nakliyat Lojistik San. ve Tic. tarafından 
          <a href="#" className="text-primary underline"> KVKK Aydınlatma Metni</a>'nde 
          açıklandığı şekilde işlenmesini kabul ediyorum.
        </span>
      </label>
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <p className="text-sm text-blue-800">
        <strong>Önemli Not:</strong> Bu rezervasyon talebi bir ön taleptir. 
        Ekibimiz 2 saat içinde sizinle iletişime geçerek detayları onaylayacak ve 
        kesin rezervasyon için gerekli adımları atacaktır.
      </p>
    </div>
  </div>
);

export default ReservationForm;