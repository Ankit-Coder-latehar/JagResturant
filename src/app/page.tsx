"use client";

import React, { useState, useEffect } from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SignatureDishes } from "@/components/sections/SignatureDishes";
import { DigitalMenu } from "@/components/sections/DigitalMenu";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Reviews } from "@/components/sections/Reviews";
import { Gallery } from "@/components/sections/Gallery";
import { Reservation } from "@/components/sections/Reservation";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ui/AIAssistant";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll details tracking
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back-to-top button
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Track exact scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track desktop mouse positioning for subtle glowing light effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LanguageProvider>
      <CartProvider>
        {/* Preloading Screen */}
        <LoadingScreen />

        {/* Global Thin Gold Scroll Progress Line */}
        <div 
          className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#D4AF37] z-50 transition-all duration-100 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Floating Mouse-following Subtle Golden Glow Effect */}
        <div
          className="hidden md:block fixed w-[280px] h-[280px] bg-[radial-gradient(circle,rgba(212,175,55,0.025)_0%,transparent_70%)] filter blur-3xl rounded-full pointer-events-none z-30 transition-transform duration-75 ease-out"
          style={{
            left: mousePosition.x - 140,
            top: mousePosition.y - 140,
          }}
        />

        {/* Navbar */}
        <Navbar onCartClick={() => setCartOpen(true)} />

        {/* Cart Drawer Layer */}
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

        {/* Main Sections Body */}
        <main className="relative">
          <Hero />
          <About />
          <SignatureDishes />
          <DigitalMenu />
          <WhyChooseUs />
          <Reviews />
          <Gallery />
          <Reservation />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* AI Booking Assistant chatbot Zara */}
        <AIAssistant />

        {/* Floating Back to Top button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="fixed bottom-24 right-6 w-11 h-11 bg-bg-secondary hover:bg-gold-border border border-gold-border/40 rounded-full flex items-center justify-center text-gold hover:text-white transition-colors shadow-2xl z-40 cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp size={16} />
            </motion.button>
          )}
        </AnimatePresence>

      </CartProvider>
    </LanguageProvider>
  );
}
