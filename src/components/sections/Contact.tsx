"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, Globe } from "lucide-react";
import { motion } from "framer-motion";

export const Contact: React.FC = () => {
  const { t, language, isRtl } = useLanguage();

  const handleWhatsAppChat = () => {
    // Generate pre-filled WhatsApp greeting message
    const greeting = language === "ar"
      ? "مرحباً مطعم جاغ، أرغب في الاستفسار عن حجز طاولة أو قائمة الطعام."
      : language === "tr"
      ? "Merhaba Jag Restaurant, masa rezervasyonu ve menü hakkında bilgi almak istiyorum."
      : "Hello Jag Restaurant, I would like to inquire about reservation slots and menu options.";
      
    const encodedText = encodeURIComponent(greeting);
    window.open(`https://wa.me/971501234567?text=${encodedText}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 bg-bg-secondary relative overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,175,55,0.03)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,175,55,0.03)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.4em] text-gold uppercase mb-3 block"
          >
            {t("contactTitle")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl font-serif-luxury text-white mb-4"
          >
            {language === "ar" ? "تواصل مع كبار موظفينا" : language === "tr" ? "Sarayımıza Ulaşın" : "The Gateway to Fine Dining"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs sm:text-sm text-text-muted leading-relaxed font-light"
          >
            {t("contactSub")}
          </motion.p>
        </div>

        {/* Info Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Location Address Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-premium rounded-[4px] border border-gold-border/10 p-6 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-full border border-gold-border/30 flex items-center justify-center bg-bg-primary text-gold shrink-0">
                <MapPin size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  {language === "ar" ? "الموقع الجغرافي" : language === "tr" ? "Lokasyon" : "Location"}
                </span>
                <span className="text-xs text-text-secondary leading-relaxed font-light">
                  {t("address")}
                </span>
                <span className="text-[10px] text-gold mt-2 flex items-center gap-1 font-medium hover:underline cursor-pointer">
                  <Navigation size={10} />
                  {language === "ar" ? "عرض الاتجاهات في خرائط جوجل" : language === "tr" ? "Haritada Yol Tarifi Al" : "Get Google Maps Directions"}
                </span>
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-premium rounded-[4px] border border-gold-border/10 p-6 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-full border border-gold-border/30 flex items-center justify-center bg-bg-primary text-gold shrink-0">
                <Clock size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  {t("hoursTitle")}
                </span>
                <div className="flex flex-col gap-1.5 text-xs text-text-secondary font-light">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gold rounded-full" />
                    <span>{t("hoursWeekdays")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-gold rounded-full" />
                    <span>{t("hoursWeekends")}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Direct Contacts Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-premium rounded-[4px] border border-gold-border/10 p-6 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-full border border-gold-border/30 flex items-center justify-center bg-bg-primary text-gold shrink-0">
                <Phone size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  {t("contactInfo")}
                </span>
                <div className="flex flex-col gap-1.5 text-xs text-text-secondary font-light font-mono">
                  <span>Phone: +971 4 321 0987</span>
                  <span>Mobile/WhatsApp: +971 50 123 4567</span>
                  <span className="font-sans font-light">Email: concierge@jagrestaurant.ae</span>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp CTA Action */}
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onClick={handleWhatsAppChat}
              className="w-full py-4 bg-green-950/20 border border-green-500/30 hover:border-green-500 text-green-400 font-bold text-[10px] tracking-[0.2em] uppercase rounded-[2px] flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <MessageCircle size={16} className="fill-green-400 text-transparent" />
              {t("whatsappText")}
            </motion.button>

          </div>

          {/* Right Column: Google Maps Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 rounded-[4px] border border-gold-border/10 overflow-hidden shadow-2xl relative h-[380px] lg:h-auto min-h-[320px] bg-bg-primary"
          >
            {/* Custom Google Map showing Dubai's gorgeous beachfront map. We can embed standard Google maps with dark styled filter */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115511.2396347895!2d55.143278567151065!3d25.212457850020757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff2790d0b6ca73d!2sJumeirah%20Beach%20Road%20-%20Jumeirah!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(40%)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full relative z-10"
            />
            {/* Loading Cover Spinner behind map load */}
            <div className="absolute inset-0 flex items-center justify-center bg-bg-secondary text-gold">
              <span className="text-xs uppercase tracking-widest font-light animate-pulse">Loading Map...</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
