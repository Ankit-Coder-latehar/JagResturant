"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Users, ChevronDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  const { t, language, isRtl } = useLanguage();
  const [guests, setGuests] = useState("2");
  const [date, setDate] = useState("");

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    // Pre-fill booking fields in the booking section and scroll down
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      // Find real elements inside booking section and set their values
      const dateEl = document.getElementById("booking-date") as HTMLInputElement;
      const guestsEl = document.getElementById("booking-guests") as HTMLSelectElement;
      if (dateEl && date) dateEl.value = date;
      if (guestsEl && guests) guestsEl.value = guests;
      
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-secondary pt-20"
    >
      {/* Background Image Layer with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-105"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(11, 11, 11, 0.4), rgba(18, 18, 18, 0.95)), url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop')`,
        }}
      />

      {/* Subtle floating gold particle circles */}
      <div className="absolute top-1/3 left-1/10 w-[8px] h-[8px] bg-gold rounded-full blur-[1px] animate-pulse opacity-40" />
      <div className="absolute bottom-1/4 right-1/10 w-[12px] h-[12px] bg-gold rounded-full blur-[2px] animate-pulse opacity-20" />
      <div className="absolute top-1/4 right-1/4 w-[6px] h-[6px] bg-gold rounded-full blur-[1px] opacity-30" />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 w-full pt-12 pb-20">
        
        {/* Left Column: Heading and description */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left rtl:lg:text-right">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold tracking-[0.4em] text-gold uppercase mb-4 block"
          >
            {language === "ar"
              ? "مرحبًا بكم في مطعم جاغ"
              : language === "tr"
              ? "JAG RESTAURANT'A HOŞ GELDİNİZ"
              : "WELCOME TO JAG RESTAURANT"}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif-luxury tracking-normal leading-tight text-white mb-6"
          >
            {t("heroTitle1")}{" "}
            <span className="text-gold italic block font-light mt-2 text-gold-glow">
              {t("heroTitle2")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-sm md:text-base text-text-secondary leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10 font-light"
          >
            {t("heroSub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button
              onClick={() => scrollToSection("booking")}
              className="w-full sm:w-auto px-8 py-4 bg-gold text-bg-secondary text-xs font-bold tracking-[0.25em] uppercase hover:bg-gold-hover transition-all duration-300 rounded-[2px] shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
            >
              {t("btnReserve")}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection("menu")}
              className="w-full sm:w-auto px-8 py-4 border border-gold/40 hover:border-gold text-text-primary text-xs font-bold tracking-[0.25em] uppercase hover:bg-gold/10 transition-all duration-300 rounded-[2px] cursor-pointer"
            >
              {t("heroExploreMenu")}
            </button>
          </motion.div>
        </div>

        {/* Right Column: Floating glassmorphism card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex items-center justify-center"
        >
          <div className="w-full max-w-sm glass-premium rounded-[4px] p-8 border border-gold-border/20 shadow-2xl relative overflow-hidden">
            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/30 pointer-events-none rounded-tr-[4px]" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold/30 pointer-events-none rounded-bl-[4px]" />

            <h3 className="text-lg font-serif-luxury tracking-[0.1em] text-gold text-center mb-6 font-medium">
              {t("heroQuickBook")}
            </h3>

            <form onSubmit={handleQuickBook} className="flex flex-col gap-5">
              {/* Date Input */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.25em] text-text-muted font-bold">
                  {t("heroSelectDate")}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={16} />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#161616] border border-gold-border/30 rounded-[2px] py-3 pl-10 pr-4 text-xs text-text-primary focus:outline-none focus:border-gold transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Guest Count */}
              <div className="flex flex-col gap-2">
                <label className="text-[9px] uppercase tracking-[0.25em] text-text-muted font-bold">
                  {t("heroSelectGuests")}
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={16} />
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-[#161616] border border-gold-border/30 rounded-[2px] py-3 pl-10 pr-4 text-xs text-text-primary focus:outline-none focus:border-gold transition-colors cursor-pointer appearance-none"
                  >
                    <option value="1">1 {language === "ar" ? "شخص" : "Guest"}</option>
                    <option value="2">2 {language === "ar" ? "شخصين" : "Guests"}</option>
                    <option value="4">4 {language === "ar" ? "أربعة أشخاص" : "Guests"}</option>
                    <option value="6">6 {language === "ar" ? "ستة أشخاص" : "Guests"}</option>
                    <option value="8">8+ {language === "ar" ? "مجموعة" : "Guests"}</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={14} />
                </div>
              </div>

              {/* Submit Quick Booking */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gold hover:bg-gold-hover text-bg-secondary text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300 rounded-[2px] cursor-pointer mt-2"
              >
                {t("heroReserveNow")}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Down Prompt */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer opacity-75 hover:opacity-100 transition-opacity" onClick={() => scrollToSection("about")}>
        <span className="text-[8px] uppercase tracking-[0.45em] text-text-muted font-light font-sans pl-1">
          {language === "ar" ? "اكتشف" : "Discover"}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-gold" />
        </motion.div>
      </div>
    </section>
  );
};
