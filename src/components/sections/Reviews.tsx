"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  roleEN: string;
  roleAR: string;
  roleTR: string;
  quoteEN: string;
  quoteAR: string;
  quoteTR: string;
  rating: number;
  avatar: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: "rev-1",
    name: "Sir Richard Cole",
    roleEN: "Michelin Guide Reviewer",
    roleAR: "مقيم دليل ميشلان للمطاعم",
    roleTR: "Michelin Rehberi Gurmesi",
    quoteEN: "Jag Restaurant is a revelation. The Shah Plov is simply a masterwork. Saffron infusion combined with the crunchy flatbread crust creates absolute poetry on the palate.",
    quoteAR: "مطعم جاغ هو اكتشاف حقيقي. طبق شاه بلوف هو تحفة فنية ببساطة. مزيج الزعفران والخبز المقرمش يخلق شعراً حقيقياً في الفم.",
    quoteTR: "Jag Restaurant tam bir keşif. Şah Pilavı tek kelimeyle bir şaheser. Safran aroması ve çıtır çıtır lavaş kabuğu damakta adeta bir lezzet şiiri yaratıyor.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "rev-2",
    name: "Laila Al Mansoor",
    roleEN: "Dubai Food Connoisseur",
    roleAR: "متذوقة طعام - دبي",
    roleTR: "Dubai Gurme Kulübü Üyesi",
    quoteEN: "Unparalleled eastern hospitality in a stunning glassmorphic setting. The sizzling Saj Lamb was cooked to absolute perfection. Best Turkish & Azeri dining in UAE.",
    quoteAR: "ضيافة شرقية لا مثيل لها في أجواء زجاجية مذهلة. صاج لحم الغنم طُهي بمنتهى الكمال. أفضل طعام تركي وأذربيجاني في الإمارات.",
    quoteTR: "Göz alıcı lüks atmosferde eşsiz bir doğu misafirperverliği. Sac kavurma tek kelimeyle kusursuzdu. Birleşik Arap Emirlikleri'ndeki en iyi Türk & Azeri mutfağı.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "rev-3",
    name: "Chef Kemal Demirel",
    roleEN: "Gastronomy Critic",
    roleAR: "ناقد فنون طهي عالمي",
    roleTR: "Gastronomi Yazarı & Eleştirmen",
    quoteEN: "Authentic clay ovens and sand-brewed coffee that transport you directly to Istanbul. The Gaziantep baklava is crispy, fresh, and served warm. Outstanding culinary art.",
    quoteAR: "أفران الطين الأصيلة والقهوة المحضرة على الرمل تنقلك مباشرة إلى إسطنبول. بقلاوة غازي عنتاب مقرمشة وطازجة وتقدم دافئة. فن طهي رائع.",
    quoteTR: "Geleneksel taş fırınlar ve kumda pişen Türk kahvesi sizi doğrudan İstanbul'a götürüyor. Gaziantep baklavası çıtır çıtır, taze ve sıcak servis ediliyor.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "rev-4",
    name: "Alp Aliyev",
    roleEN: "Baku Cultural Envoy",
    roleAR: "مبعوث ثقافي - باكو",
    roleTR: "Bakü Kültür Ataşesi",
    quoteEN: "The Dushbara soup brought tears to my eyes. It tastes exactly like my grandmother's recipe from Baku. Absolute devotion to culinary authenticity.",
    quoteAR: "شوربة الدشبرة الأذربيجانية جعلت عيني تدمع. مذاقها يشبه تماماً وصفة جدتي في باكو. التزام مطلق بالأصالة التاريخية للطهي.",
    quoteTR: "Düşbere çorbası beni çocukluğuma götürdü. Tıpkı Bakü'deki anneannemin tarifi gibi. Lezzet asaletine ve kültürel özgünlüğe olan bu bağlılık harikulade.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1970&auto=format&fit=crop",
  }
];

export const Reviews: React.FC = () => {
  const { t, language } = useLanguage();

  const getLocalizedRole = (rev: Testimonial) => {
    if (language === "ar") return rev.roleAR;
    if (language === "tr") return rev.roleTR;
    return rev.roleEN;
  };

  const getLocalizedQuote = (rev: Testimonial) => {
    if (language === "ar") return rev.quoteAR;
    if (language === "tr") return rev.quoteTR;
    return rev.quoteEN;
  };

  // We can duplicate the elements to make a flawless continuous sliding track
  const doubleTestimonials = [...testimonialsData, ...testimonialsData];

  return (
    <section id="reviews" className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Decorative side fades to hide the carousel edges */}
      <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-60 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-60 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
      
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(212,175,55,0.03)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.4em] text-gold uppercase mb-3 block"
          >
            {t("reviewsTitle")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl font-serif-luxury text-white mb-4"
          >
            {language === "ar" ? "أصداء الضيافة الملكية في دبي" : language === "tr" ? "Misafir Memnuniyet Sarayı" : "The Echoes of Royal Senses"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs sm:text-sm text-text-muted leading-relaxed font-light"
          >
            {t("reviewsSub")}
          </motion.p>
        </div>
      </div>

      {/* Infinite Rolling Track */}
      <div className="flex w-full overflow-hidden relative select-none">
        
        {/* Row 1 Track */}
        <div className="flex gap-6 animate-[marquee_35s_linear_infinite] whitespace-nowrap py-4 min-w-full">
          {doubleTestimonials.map((rev, idx) => (
            <div
              key={`${rev.id}-${idx}`}
              className="w-[320px] sm:w-[400px] shrink-0 glass-premium rounded-[4px] border border-gold-border/10 p-6 sm:p-8 flex flex-col justify-between whitespace-normal shadow-lg transition-colors hover:border-gold/30"
            >
              <div>
                {/* Quote Icon & Rating */}
                <div className="flex items-center justify-between mb-6">
                  <Quote size={20} className="text-gold opacity-30 shrink-0" />
                  <div className="flex items-center gap-1 shrink-0">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={12} className="text-gold fill-gold" />
                    ))}
                  </div>
                </div>

                {/* Localized Quote */}
                <p className="text-xs text-text-secondary leading-relaxed font-light italic mb-8">
                  {getLocalizedQuote(rev)}
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-4 border-t border-gold-border/10 pt-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gold-border/30 shrink-0 bg-bg-secondary">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white tracking-wide truncate">
                    {rev.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-gold font-light truncate mt-0.5">
                    {getLocalizedRole(rev)}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
