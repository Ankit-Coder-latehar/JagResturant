"use client";

import React, { useState, useEffect } from "react";
import { useLanguage, Language } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { Menu, X, ShoppingBag, Globe, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const { t, language, setLanguage, isRtl } = useLanguage();
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme Toggle Logic
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("jashan_theme") as "dark" | "light";
      if (storedTheme) {
        setTheme(storedTheme);
        const root = document.documentElement;
        if (storedTheme === "light") {
          root.classList.add("light");
        } else {
          root.classList.remove("light");
        }
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("jashan_theme", nextTheme);
    const root = document.documentElement;
    if (nextTheme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  };

  const navLinks = [
    { name: t("navHome"), href: "#home" },
    { name: t("navAbout"), href: "#about" },
    { name: t("navMenu"), href: "#menu" },
    { name: t("navWhyUs"), href: "#experience" },
    { name: t("navReviews"), href: "#reviews" },
    { name: t("navGallery"), href: "#gallery" },
    { name: t("navContact"), href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const selectLanguage = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  const getLanguageLabel = (lang: Language) => {
    switch (lang) {
      case "en": return "EN";
      case "ar": return "العربية";
      case "tr": return "TR";
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "py-3 glass-premium shadow-lg"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Brand Logo & Emblem */}
          <a href="#home" className="flex items-center gap-3 select-none" onClick={(e) => handleLinkClick(e, "#home")}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-[0_0_5px_rgba(212,175,55,0.4)]"
            >
              <path
                d="M50 5L75 25V60L50 85L25 60V25L50 5Z"
                stroke="#D4AF37"
                strokeWidth="4"
              />
              <path
                d="M46 32H54V50C54 54.4 50.4 58 46 58C43.8 58 42 56.2 42 54"
                stroke="#D4AF37"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col">
              <span className="text-xl font-serif-luxury font-bold tracking-[0.2em] text-gold text-gold-glow">
                JASHAN
              </span>
              <span className="text-[7px] tracking-[0.35em] text-text-primary uppercase font-light -mt-1 hidden sm:inline">
                RESTAURANT DUBAI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[11px] font-medium tracking-[0.2em] uppercase text-text-secondary hover:text-gold transition-colors duration-300 relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Bar (Right panel controls) */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gold-border rounded-full text-text-secondary hover:text-gold transition-all duration-300 relative group cursor-pointer"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="p-2 hover:bg-gold-border rounded-full text-text-secondary hover:text-gold transition-all duration-300 flex items-center gap-1 cursor-pointer"
              >
                <Globe size={18} />
                <span className="text-[10px] font-bold tracking-wider font-mono hidden sm:inline">
                  {getLanguageLabel(language).toUpperCase()}
                </span>
              </button>
              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute ${
                      isRtl ? "left-0" : "right-0"
                    } mt-2 w-32 rounded-md shadow-xl glass-premium overflow-hidden border border-gold-border py-1 text-xs`}
                  >
                    {(["en", "ar", "tr"] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => selectLanguage(lang)}
                        className={`w-full text-left px-4 py-2 hover:bg-gold-border text-text-primary transition-colors cursor-pointer ${
                          language === lang ? "text-gold font-bold bg-gold-border/20" : ""
                        }`}
                      >
                        {getLanguageLabel(lang)}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={onCartClick}
              className="p-2 hover:bg-gold-border rounded-full text-text-secondary hover:text-gold transition-all duration-300 relative cursor-pointer"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-bg-secondary text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* ReserveCTA Button */}
            <a
              href="#booking"
              onClick={(e) => handleLinkClick(e, "#booking")}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 border border-gold text-[10px] font-bold tracking-[0.2em] uppercase text-gold hover:bg-gold hover:text-bg-secondary transition-all duration-300 rounded-[2px]"
            >
              {t("btnReserve")}
            </a>

            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gold-border rounded-full text-text-secondary hover:text-gold transition-all lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 flex flex-col justify-center items-center bg-[#0B0B0BG0] backdrop-blur-2xl lg:hidden border-b border-gold-border"
          >
            <div className="flex flex-col gap-6 text-center px-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx, duration: 0.4 }}
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-lg font-serif-luxury tracking-widest text-text-primary hover:text-gold transition-colors duration-300 py-2 uppercase"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.a
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                href="#booking"
                onClick={(e) => handleLinkClick(e, "#booking")}
                className="mt-6 inline-flex items-center justify-center px-8 py-3 bg-gold text-bg-secondary text-xs font-bold tracking-[0.2em] uppercase hover:bg-gold-hover transition-colors rounded-[2px]"
              >
                {t("btnReserve")}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
