"use client";

import { useState, useEffect, useCallback } from "react";
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
  // Kişisel Bilgiler (Backend ile uyumlu)
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  email: string;
  
  // Rezervasyon Bilgileri
  palletCount: number;
  plannedDate: string;
  plannedDuration: number; // gün cinsinden
  note: string;
}

const initialData: ReservationData = {
  firstName: "",
  lastName: "",
  company: "",
  phone: "",
  email: "",
  palletCount: 1,
  plannedDate: "",
  plannedDuration: 7,
  note: "",
};

const steps = [
  { id: 1, title: "Kişisel Bilgiler", icon: BsPerson },
  { id: 2, title: "Rezervasyon Detayları", icon: BsBoxSeam },
  { id: 3, title: "Tarih ve Süre", icon: BsCalendarDate },
  { id: 4, title: "Özet ve Onay", icon: BsCalculator },
];

const ReservationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ReservationData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<"success" | "error" | null>(null);
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [reservationNo, setReservationNo] = useState("");

  // Toast otomatik kapanma
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Maliyet hesaplama fonksiyonu
  const calculateCost = useCallback(() => {
    const dailyRate = 750; // ₺750/palet/ay (backend default)
    const dailyCost = dailyRate / 30; // Günlük maliyet
    
    const cost = formData.palletCount * dailyCost * formData.plannedDuration;
    setEstimatedCost(Math.round(cost));
  }, [formData.palletCount, formData.plannedDuration]);

  // Maliyet hesaplama effect'i
  useEffect(() => {
    calculateCost();
  }, [calculateCost]);

  const updateFormData = (field: keyof ReservationData, value: string | number) => {
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
        return !!(formData.firstName && formData.lastName && formData.phone && formData.email && formData.company);
      case 2:
        return formData.palletCount > 0;
      case 3:
        return !!(formData.plannedDate && formData.plannedDuration > 0);
      case 4:
        return true; // Özet sayfası, her zaman geçerli
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          palletCount: Number(formData.palletCount),
          plannedDuration: Number(formData.plannedDuration),
        }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Submission failed");
      
      setToast("success");
      setReservationNo(result.reservationNo || "");
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
          {currentStep === 2 && <ReservationDetailsStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 3 && <DateTimeStep formData={formData} updateFormData={updateFormData} />}
          {currentStep === 4 && <SummaryStep formData={formData} estimatedCost={estimatedCost} />}
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
            {submitting ? 'Gönderiliyor...' : 'Rezervasyonu Oluştur'}
          </button>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 rounded-lg px-6 py-3 text-white shadow-lg z-50 ${
          toast === "success" ? "bg-green-600" : "bg-red-600"
        }`}>
          {toast === "success" 
            ? `Rezervasyonunuz oluşturuldu! ${reservationNo ? `Rezervasyon No: ${reservationNo}` : 'En kısa sürede sizinle iletişime geçeceğiz.'}`
            : 'Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin.'
          }
        </div>
      )}
    </div>
  );
};

// Step Components
const PersonalInfoStep: React.FC<{
  formData: ReservationData;
  updateFormData: (field: keyof ReservationData, value: string | number) => void;
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
      placeholder="Şirket Adı *"
      value={formData.company}
      onChange={(e) => updateFormData('company', e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
      required
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

const ReservationDetailsStep: React.FC<{
  formData: ReservationData;
  updateFormData: (field: keyof ReservationData, value: string | number) => void;
}> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold mb-6">Rezervasyon Detayları</h3>
    
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-2">Palet Sayısı *</label>
        <input
          type="number"
          min="1"
          value={formData.palletCount}
          onChange={(e) => updateFormData('palletCount', parseInt(e.target.value) || 1)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Minimum 1 palet</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Bilgi</h4>
        <p className="text-sm text-blue-700">
          Standart palet boyutu: 120x80x150 cm<br />
          Maksimum ağırlık: 1000 kg/palet
        </p>
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Ek Notlar</label>
      <textarea
        placeholder="Özel gereksinimleriniz, ürün detayları vb. (isteğe bağlı)"
        value={formData.note}
        onChange={(e) => updateFormData('note', e.target.value)}
        rows={4}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
      />
    </div>
  </div>
);

const DateTimeStep: React.FC<{
  formData: ReservationData;
  updateFormData: (field: keyof ReservationData, value: string | number) => void;
}> = ({ formData, updateFormData }) => {
  // Bugünden itibaren tarih seçimi için minimum tarih
  const today = new Date();
  today.setDate(today.getDate() + 1); // En erken yarın
  const minDate = today.toISOString().slice(0, 10);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-6">Tarih ve Süre Planlaması</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Depolama Başlangıç Tarihi *</label>
          <input
            type="date"
            min={minDate}
            value={formData.plannedDate}
            onChange={(e) => updateFormData('plannedDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            required
          />
          <p className="text-xs text-gray-500 mt-1">En erken yarın tarihini seçebilirsiniz</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Planlanan Süre (Gün) *</label>
          <select
            value={formData.plannedDuration}
            onChange={(e) => updateFormData('plannedDuration', parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            required
          >
            <option value="">Süre seçin</option>
            <option value={7}>1 Hafta (7 gün)</option>
            <option value={14}>2 Hafta (14 gün)</option>
            <option value={30}>1 Ay (30 gün)</option>
            <option value={60}>2 Ay (60 gün)</option>
            <option value={90}>3 Ay (90 gün)</option>
            <option value={180}>6 Ay (180 gün)</option>
            <option value={365}>1 Yıl (365 gün)</option>
          </select>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">📅 Planlama Bilgisi</h4>
        <p className="text-sm text-yellow-700">
          Seçtiğiniz süre tahmini bir süredir. İhtiyaçlarınıza göre süreyi uzatabilir veya erken teslim alabilirsiniz.
          Kesin süre ve koşullar rezervasyon onayında belirtilecektir.
        </p>
      </div>
    </div>
  );
};

const SummaryStep: React.FC<{
  formData: ReservationData;
  estimatedCost: number;
}> = ({ formData, estimatedCost }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold mb-6">Rezervasyon Özeti</h3>
    
    <div className="grid md:grid-cols-2 gap-8">
      {/* Müşteri Bilgileri */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">Müşteri Bilgileri</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Ad Soyad:</span>
            <span>{formData.firstName} {formData.lastName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Şirket:</span>
            <span>{formData.company}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">E-posta:</span>
            <span>{formData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Telefon:</span>
            <span>{formData.phone}</span>
          </div>
        </div>
      </div>

      {/* Rezervasyon Detayları */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">Rezervasyon Detayları</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">Palet Sayısı:</span>
            <span>{formData.palletCount} adet</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Başlangıç Tarihi:</span>
            <span>{new Date(formData.plannedDate).toLocaleDateString('tr-TR')}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Planlanan Süre:</span>
            <span>{formData.plannedDuration} gün</span>
          </div>
        </div>
      </div>
    </div>

    {/* Maliyet Hesaplaması */}
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
      <h4 className="text-lg font-semibold mb-4">Tahmini Maliyet</h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Günlük Ücret (palet başı):</span>
          <span>₺25</span>
        </div>
        <div className="flex justify-between">
          <span>Toplam Süre:</span>
          <span>{formData.palletCount} palet × {formData.plannedDuration} gün</span>
        </div>
        <hr className="my-3" />
        <div className="flex justify-between text-lg font-bold text-primary">
          <span>Tahmini Toplam:</span>
          <span>₺{estimatedCost.toLocaleString('tr-TR')}</span>
        </div>
      </div>
      <p className="text-xs text-gray-600 mt-3">
        * Bu tahmini bir hesaplamadır. Kesin fiyat rezervasyon onayında belirtilecektir.
      </p>
    </div>

    {/* Notlar */}
    {formData.note && (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Ek Notlarınız</h4>
        <p className="text-sm text-blue-700">{formData.note}</p>
      </div>
    )}

    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <p className="text-sm text-green-800">
        <strong>🎉 Son Adım!</strong> Rezervasyonunuzu oluşturmak için &quot;Rezervasyonu Oluştur&quot; butonuna tıklayın. 
        Ekibimiz 2 saat içinde sizinle iletişime geçerek detayları onaylayacaktır.
      </p>
    </div>
  </div>
);

export default ReservationForm;