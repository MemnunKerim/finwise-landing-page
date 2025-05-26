"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsWhatsapp, BsX } from "react-icons/bs";

const WhatsAppFloating: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Sayfa yüklendikten 2 saniye sonra göster
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Tooltip'i 3 saniye sonra otomatik kapat
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  const whatsappNumber = "905379527145";
  const message = "Merhaba! PaletDepo hizmetleri hakkında bilgi almak istiyorum.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    console.log('WhatsApp button clicked!'); // Debug için
    console.log('WhatsApp URL:', whatsappUrl); // Debug için
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none">
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                className="absolute right-16 bottom-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px] pointer-events-auto"
              >
                <button
                  onClick={() => setShowTooltip(false)}
                  className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
                >
                  <BsX size={16} />
                </button>
                <p className="text-sm text-gray-700 pr-4">
                  <strong>Hızlı İletişim</strong><br />
                  Sorularınız için WhatsApp&apos;tan yazın!
                </p>
                <div className="absolute right-[-8px] top-4 w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ana WhatsApp Butonu */}
          <motion.button
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors duration-200 cursor-pointer pointer-events-auto relative"
            aria-label="WhatsApp ile iletişime geç"
          >
            <BsWhatsapp size={24} />
          </motion.button>

          {/* Pulse animasyonu */}
          <motion.div
            className="absolute inset-0 bg-green-500 rounded-full opacity-30 pointer-events-none"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppFloating;