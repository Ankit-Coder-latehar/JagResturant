"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Leaf, Flame, ShieldAlert, Sparkles, Music, Star } from "lucide-react";
import { motion } from "framer-motion";

export const WhyChooseUs: React.FC = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: <Leaf size={24} className="text-gold" />,
      title: t("why1Title"),
      description: t("why1Desc"),
      glowColor: "rgba(34, 197, 94, 0.15)", // green glow
    },
    {
      icon: <Flame size={24} className="text-gold" />,
      title: t("why2Title"),
      description: t("why2Desc"),
      glowColor: "rgba(239, 68, 68, 0.15)", // red glow
    },
    {
      icon: <Star size={24} className="text-gold" />,
      title: t("why3Title"),
      description: t("why3Desc"),
      glowColor: "rgba(234, 179, 8, 0.15)", // yellow glow
    },
    {
      icon: <Music size={24} className="text-gold" />,
      title: t("why4Title"),
      description: t("why4Desc"),
      glowColor: "rgba(168, 85, 247, 0.15)", // purple glow
    },
  ];

  return (
    <section id="experience" className="py-24 bg-bg-secondary relative overflow-hidden">
      {/* Background backing grid */}
      <div className="absolute inset-0 opacity-[0.01] bg-[radial-gradient(ellipse_at_center,var(--accent-gold)_0%,transparent_80%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.4em] text-gold uppercase mb-3 block"
          >
            {t("whyTitle")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl font-serif-luxury text-white mb-4"
          >
            {language === "ar"
              ? "مستويات لا مثيل لها من الرقي والكمال"
              : language === "tr"
              ? "Eşsiz Kalite ve Kusursuz Deneyim"
              : "Unrivaled Standards of Fine Dining"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs sm:text-sm text-text-muted leading-relaxed font-light"
          >
            {t("whySub")}
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
              key={idx}
              className="glass-premium rounded-[4px] border border-gold-border/10 p-8 flex flex-col justify-between group hover:border-gold/40 transition-all duration-500 h-full relative overflow-hidden"
            >
              {/* Dynamic hover color backing glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 10% 10%, ${feat.glowColor} 0%, transparent 60%)`,
                }}
              />

              <div className="flex flex-col gap-6">
                {/* Thin-line Gold Circle Icon */}
                <div className="w-12 h-12 rounded-full border border-gold-border/30 flex items-center justify-center bg-bg-primary shrink-0 relative group-hover:scale-110 group-hover:border-gold transition-all duration-500">
                  {feat.icon}
                  {/* Subtle pulsing background */}
                  <div className="absolute inset-0 bg-gold/5 rounded-full scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-base font-serif-luxury font-medium text-white tracking-wide group-hover:text-gold transition-colors duration-300">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed font-light">
                    {feat.description}
                  </p>
                </div>
              </div>

              {/* Decorative side accent lines */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
