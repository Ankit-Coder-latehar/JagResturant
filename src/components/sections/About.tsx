"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Star, Award, ShieldCheck } from "lucide-react";
import { motion, useInView, useAnimation } from "framer-motion";

export const About: React.FC = () => {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Custom counting animation for statistics
  const [stats, setStats] = useState({ years: 0, customers: 0, dishes: 0 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // ms
      const intervalTime = 30;
      const steps = duration / intervalTime;
      
      const targetYears = 15;
      const targetCustomers = 98; // representing 98k+
      const targetDishes = 45;

      const incrementYears = targetYears / steps;
      const incrementCustomers = targetCustomers / steps;
      const incrementDishes = targetDishes / steps;

      const timer = setInterval(() => {
        start += 1;
        setStats({
          years: Math.min(Math.floor(start * incrementYears), targetYears),
          customers: Math.min(Math.floor(start * incrementCustomers), targetCustomers),
          dishes: Math.min(Math.floor(start * incrementDishes), targetDishes),
        });

        if (start >= steps) {
          clearInterval(timer);
          setStats({ years: targetYears, customers: targetCustomers, dishes: targetDishes });
        }
      }, intervalTime);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section id="about" className="py-24 bg-bg-primary relative overflow-hidden" ref={ref}>
      {/* Decorative backing circles */}
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,175,55,0.03)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.04)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left Panel: Image collage */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,175,55,0.06)_0%,transparent_70%)] filter blur-2xl pointer-events-none" />
            
            {/* Primary Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="col-span-8 overflow-hidden rounded-[4px] border border-gold-border/20 shadow-2xl relative group h-[380px]"
            >
              <img
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070&auto=format&fit=crop"
                alt="Michelin Star Dining Interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/80 to-transparent" />
            </motion.div>

            {/* Secondary Offset Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="col-span-4 overflow-hidden rounded-[4px] border border-gold-border/20 shadow-2xl relative group h-[260px] self-end -mb-10 z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop"
                alt="Gourmet Kebab Preparation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/80 to-transparent" />
            </motion.div>
          </div>

          {/* Right Panel: Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.4em] text-gold uppercase mb-3 block"
            >
              {t("aboutTitle")}
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl font-serif-luxury text-white mb-6"
            >
              {t("aboutSubtitle")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm text-text-secondary leading-relaxed mb-6 font-light"
            >
              {t("aboutText1")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-sm text-text-secondary leading-relaxed mb-8 font-light"
            >
              {t("aboutText2")}
            </motion.p>

            {/* Chef's philosophy callout box */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="p-6 border-l-2 border-gold bg-[#121212] glass-premium rounded-r-[4px] relative"
            >
              <h4 className="text-xs font-bold tracking-[0.2em] text-gold uppercase mb-2">
                {t("aboutChefPhilosophy")}
              </h4>
              <p className="text-xs italic text-text-secondary font-serif leading-relaxed font-light">
                {t("aboutChefQuote")}
              </p>
              
              {/* Chef Signature Mock */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] tracking-wider text-text-muted font-light">
                  — Chef Elnur Bayramov, Executive Culinary Director
                </span>
                <span className="font-serif italic text-gold text-lg font-light tracking-widest pl-4">
                  Elnur B.
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Statistics Board */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-gold-border/20">
          {/* Card 1: Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-premium rounded-[4px] p-8 text-center border border-gold-border/10 flex flex-col items-center group hover:border-gold/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors">
              <Award className="text-gold" size={20} />
            </div>
            <span className="text-4xl md:text-5xl font-serif-luxury font-bold text-gold tracking-normal mb-2 text-gold-glow">
              {stats.years}+
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted font-medium">
              {t("statYears")}
            </span>
          </motion.div>

          {/* Card 2: Customers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-premium rounded-[4px] p-8 text-center border border-gold-border/10 flex flex-col items-center group hover:border-gold/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors">
              <Star className="text-gold" size={20} />
            </div>
            <span className="text-4xl md:text-5xl font-serif-luxury font-bold text-gold tracking-normal mb-2 text-gold-glow">
              {stats.customers}K+
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted font-medium">
              {t("statCustomers")}
            </span>
          </motion.div>

          {/* Card 3: Signature Dishes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-premium rounded-[4px] p-8 text-center border border-gold-border/10 flex flex-col items-center group hover:border-gold/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors">
              <ShieldCheck className="text-gold" size={20} />
            </div>
            <span className="text-4xl md:text-5xl font-serif-luxury font-bold text-gold tracking-normal mb-2 text-gold-glow">
              {stats.dishes}+
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted font-medium">
              {t("statDishes")}
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
