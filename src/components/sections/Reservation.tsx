"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Users, Clock, Mail, Phone, User, Landmark, HelpCircle, CheckCircle, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export const Reservation: React.FC = () => {
  const { t, language, isRtl } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    seating: "indoor",
    notes: "",
  });

  const [bookingReference, setBookingReference] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      return;
    }

    // Trigger premium confetti burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#FFFFFF", "#B8860B"],
    });

    // Generate unique royal booking reference
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const code = "JAG-" + 
      alphabet[Math.floor(Math.random() * 26)] + 
      alphabet[Math.floor(Math.random() * 26)] + 
      Math.floor(1000 + Math.random() * 9000);
      
    setBookingReference(code);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "2",
      seating: "indoor",
      notes: "",
    });
    setBookingReference(null);
  };

  const getSeatingLabel = (key: string) => {
    switch (key) {
      case "indoor": return t("seatIndoor");
      case "terrace": return t("seatTerrace");
      case "private": return t("seatPrivate");
      default: return key;
    }
  };

  return (
    <section id="booking" className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Background backing glow nodes */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.04)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,175,55,0.03)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.4em] text-gold uppercase mb-3 block"
          >
            {t("reserveTitle")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl font-serif-luxury text-white mb-4"
          >
            {language === "ar" ? "احجز مكانك الفاخر" : language === "tr" ? "Lüks Masa Rezervasyonu" : "Secure Your Dining Experience"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs sm:text-sm text-text-muted leading-relaxed font-light"
          >
            {t("reserveSub")}
          </motion.p>
        </div>

        {/* Content Card layout */}
        <div className="glass-premium rounded-[4px] border border-gold-border/20 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Decorative Corner lines */}
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold/30 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gold/30 pointer-events-none" />

          <AnimatePresence mode="wait">
            {!bookingReference ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                
                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">
                    {t("resName")} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={16} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Richard Cole"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#121212] border border-gold-border/30 focus:border-gold rounded-[2px] py-3.5 pl-10 pr-4 text-xs text-text-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">
                    {t("resEmail")} *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={16} />
                    <input
                      type="email"
                      required
                      placeholder="e.g. richard@cole.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#121212] border border-gold-border/30 focus:border-gold rounded-[2px] py-3.5 pl-10 pr-4 text-xs text-text-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">
                    {t("resPhone")} *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={16} />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +971 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#121212] border border-gold-border/30 focus:border-gold rounded-[2px] py-3.5 pl-10 pr-4 text-xs text-text-primary focus:outline-none transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Select Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">
                    {t("resDate")} *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={16} />
                    <input
                      type="date"
                      required
                      id="booking-date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#121212] border border-gold-border/30 focus:border-gold rounded-[2px] py-3.5 pl-10 pr-4 text-xs text-text-primary focus:outline-none transition-colors font-mono cursor-pointer"
                    />
                  </div>
                </div>

                {/* Select Time */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">
                    {t("resTime")} *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={16} />
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#121212] border border-gold-border/30 focus:border-gold rounded-[2px] py-3.5 pl-10 pr-4 text-xs text-text-primary focus:outline-none transition-colors cursor-pointer appearance-none"
                    >
                      <option value="">{language === "ar" ? "-- اختر التوقيت --" : "-- Select Time --"}</option>
                      <option value="12:00 PM">12:00 PM (Lunch)</option>
                      <option value="01:30 PM">01:30 PM (Lunch)</option>
                      <option value="03:00 PM">03:00 PM (Lunch)</option>
                      <option value="07:00 PM">07:00 PM (Dinner)</option>
                      <option value="08:30 PM">08:30 PM (Dinner - Peak)</option>
                      <option value="10:00 PM">10:00 PM (Dinner)</option>
                      <option value="11:30 PM">11:30 PM (Late Dinner)</option>
                    </select>
                  </div>
                </div>

                {/* Guest Count */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">
                    {t("resGuests")} *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={16} />
                    <select
                      id="booking-guests"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-[#121212] border border-gold-border/30 focus:border-gold rounded-[2px] py-3.5 pl-10 pr-4 text-xs text-text-primary focus:outline-none transition-colors cursor-pointer appearance-none"
                    >
                      <option value="1">1 {language === "ar" ? "شخص" : "Guest"}</option>
                      <option value="2">2 {language === "ar" ? "شخصين" : "Guests"}</option>
                      <option value="4">4 {language === "ar" ? "أربعة أشخاص" : "Guests"}</option>
                      <option value="6">6 {language === "ar" ? "ستة أشخاص" : "Guests"}</option>
                      <option value="8">8+ {language === "ar" ? "مجموعة (حفل خاص)" : "Guests"}</option>
                    </select>
                  </div>
                </div>

                {/* Seating preference */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">
                    {t("resSeating")}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: "indoor", label: t("seatIndoor") },
                      { id: "terrace", label: t("seatTerrace") },
                      { id: "private", label: t("seatPrivate") },
                    ].map((seat) => (
                      <button
                        key={seat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, seating: seat.id })}
                        className={`py-3.5 rounded-[2px] text-[10px] font-bold tracking-wider uppercase border transition-colors cursor-pointer ${
                          formData.seating === seat.id
                            ? "bg-gold/10 border-gold text-gold"
                            : "border-gold-border/20 text-text-secondary hover:border-gold"
                        }`}
                      >
                        {seat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-bold">
                    {t("resNotes")}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={language === "ar" ? "يرجى كتابة أي طلبات خاصة هنا..." : "Dietary alerts, anniversary celebration requests, private hosts..."}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#121212] border border-gold-border/30 focus:border-gold rounded-[2px] py-3.5 px-4 text-xs text-text-primary focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit button */}
                <div className="md:col-span-2 mt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gold hover:bg-gold-hover text-bg-secondary text-[10px] font-bold tracking-[0.25em] uppercase rounded-[2px] transition-colors cursor-pointer shadow-lg"
                  >
                    {t("resSubmit")}
                  </button>
                </div>

              </motion.form>
            ) : (
              // GORGEOUS GOLD SUCCESS RECEIPT PANEL
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-gold mb-6 animate-pulse">
                  <CheckCircle size={32} />
                </div>

                <h3 className="text-2xl font-serif-luxury text-white mb-2 text-gold-glow">
                  {t("resSuccess")}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed font-light max-w-md mb-8">
                  {t("resSuccessSub")}
                </p>

                {/* Simulated ticket card */}
                <div className="w-full max-w-sm bg-[#121212] border border-gold-border rounded-[4px] p-6 text-left relative neumorphism-inset">
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/30 rounded-tr-[4px]" />
                  
                  <div className="flex justify-between items-center border-b border-gold-border/20 pb-4 mb-4">
                    <span className="text-[9px] uppercase tracking-wider text-text-muted font-bold">
                      ROYAL TICKET
                    </span>
                    <span className="text-xs font-mono font-bold text-gold tracking-widest">
                      {bookingReference}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3.5 text-xs text-text-secondary font-light">
                    <div className="flex justify-between">
                      <span className="text-text-muted">{t("resName")}</span>
                      <span className="font-medium text-white">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">{t("resDate")}</span>
                      <span className="font-medium text-white font-mono">{formData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">{t("resTime")}</span>
                      <span className="font-medium text-white font-mono">{formData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">{t("resGuests")}</span>
                      <span className="font-medium text-white">{formData.guests} {language === "ar" ? "أشخاص" : "Guests"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">{t("resSeating")}</span>
                      <span className="font-medium text-gold font-serif-luxury">{getSeatingLabel(formData.seating)}</span>
                    </div>
                    {formData.notes && (
                      <div className="border-t border-gold-border/10 pt-3 mt-1 flex flex-col gap-1">
                        <span className="text-text-muted text-[10px] uppercase font-bold tracking-wider">{language === "ar" ? "ملاحظات خاصة" : "Special Requests"}</span>
                        <p className="text-[10px] text-text-secondary italic leading-relaxed">{formData.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Complementary VIP note */}
                  <div className="mt-6 border-t border-gold-border/20 pt-4 flex items-center gap-3 text-[10px] text-gold font-light leading-relaxed">
                    <Award size={16} className="shrink-0" />
                    <span>
                      {language === "ar"
                        ? "ملاحظة: تتوفر خدمة صف السيارات المجانية VIP بمجرد إبراز هذا التذكرة الرقمية."
                        : language === "tr"
                        ? "Not: Girişte bu dijital bileti göstererek ücretsiz VIP vale hizmetimizden yararlanabilirsiniz."
                        : "Complimentary VIP valet parking is enabled upon presenting this digital ticket."}
                    </span>
                  </div>
                </div>

                {/* Reset Trigger */}
                <button
                  onClick={resetForm}
                  className="mt-8 px-8 py-3 border border-gold-border/30 hover:border-gold text-text-secondary hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-[2px] transition-colors cursor-pointer"
                >
                  {language === "ar" ? "حجز طاولة أخرى" : language === "tr" ? "Yeni Masa Ayırt" : "Book Another Table"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
