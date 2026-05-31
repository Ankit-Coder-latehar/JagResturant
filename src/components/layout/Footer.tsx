"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, MapPin, Phone, Send, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Footer: React.FC = () => {
  const { t, isRtl, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubsubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubsubscribed(true);
    setEmail("");
    setTimeout(() => {
      setSubsubscribed(false);
    }, 5000);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
      href: "https://instagram.com"
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      href: "https://facebook.com"
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
      href: "https://twitter.com"
    },
  ];

  return (
    <footer className="relative bg-[#080808] border-t border-gold-border pt-20 pb-10 overflow-hidden">
      {/* Decorative backing glows */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.04)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,175,55,0.03)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Grid: Newsletter + Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <svg
                width="30"
                height="30"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 5L75 25V60L50 85L25 60V25L50 5Z"
                  stroke="#D4AF37"
                  strokeWidth="4"
                />
                <circle cx="50" cy="45" r="8" fill="#D4AF37" />
              </svg>
              <span className="text-xl font-serif-luxury font-bold tracking-[0.2em] text-gold">
                JASHAN
              </span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed font-light">
              {language === "ar"
                ? "انغمس في النكهات الفاخرة للطهي التركي والأذربيجاني في دبي. نقدم إبداعات ملكية تناسب تطلعات الذواقة."
                : language === "tr"
                ? "İstanbul ve Bakü saraylarının asırlık lezzet geleneklerini lüks bir tasarım ve usta şeflerimizin dokunuşlarıyla Dubai'de keşfedin."
                : "Immerse in the luxury dining heritage of Turkish & Azerbaijani master cuisines in the heart of Dubai. Creating royal moments for food connoisseurs."}
            </p>
            {/* Social handles */}
            <div className="flex items-center gap-3">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full border border-gold-border flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold hover:shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all duration-300 cursor-pointer"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-6">
              {t("navHome")} &amp; {t("navGallery")}
            </h3>
            <ul className="flex flex-col gap-4 text-xs">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleLinkClick(e, "#home")}
                  className="text-text-muted hover:text-gold transition-colors"
                >
                  {t("navHome")}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleLinkClick(e, "#about")}
                  className="text-text-muted hover:text-gold transition-colors"
                >
                  {t("navAbout")}
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  onClick={(e) => handleLinkClick(e, "#menu")}
                  className="text-text-muted hover:text-gold transition-colors"
                >
                  {t("navMenu")}
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => handleLinkClick(e, "#gallery")}
                  className="text-text-muted hover:text-gold transition-colors"
                >
                  {t("navGallery")}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Bits */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gold">
              {t("navContact")}
            </h3>
            <div className="flex flex-col gap-4 text-xs text-text-muted font-light">
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-gold shrink-0" />
                <span>{t("address")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-gold shrink-0" />
                <span dir="ltr">+971 4 321 0987</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-gold shrink-0" />
                <span>concierge@jashanrestaurant.ae</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter subscription */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-2">
                {t("footerSubTitle")}
              </h3>
              <p className="text-[10px] text-text-muted leading-relaxed font-light">
                {t("footerSubText")}
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="relative flex">
              <input
                type="email"
                required
                placeholder={isRtl ? "عنوان البريد الإلكتروني..." : "Your luxury email..."}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-[#121212] border ${
                  subscribed ? "border-green-500" : "border-gold-border focus:border-gold"
                } rounded-[2px] py-2.5 px-4 text-xs text-text-primary focus:outline-none transition-all`}
              />
              <button
                type="submit"
                className={`absolute ${
                  isRtl ? "left-1" : "right-1"
                } top-1 bottom-1 px-3 bg-gold text-bg-secondary hover:bg-gold-hover transition-colors rounded-[2px] flex items-center justify-center cursor-pointer`}
              >
                <Send size={12} />
              </button>
            </form>

            <AnimatePresence>
              {subscribed && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] text-gold font-medium"
                >
                  {t("footerSubsSuccess")}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gold-border/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] text-text-muted tracking-wider font-light">
            &copy; {new Date().getFullYear()} JASHAN RESTAURANT DUBAI. {t("allRightsReserved")}
          </span>

          <span className="text-[9px] text-text-muted flex items-center gap-1 font-mono tracking-widest uppercase">
            MADE WITH <Heart size={10} className="text-gold fill-gold" /> FOR CONNOISSEURS
          </span>
        </div>
      </div>
    </footer>
  );
};
