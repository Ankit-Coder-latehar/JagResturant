"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart, CartItem } from "@/context/CartContext";
import { Plus, ShoppingCart, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Dish {
  id: string;
  translationKey: string;
  nameEN: string;
  descEN: string;
  price: number;
  image: string;
  category: "turkish" | "azeri" | "dessert" | "beverage";
  spicy?: boolean;
  vegan?: boolean;
  chefRecommend?: boolean;
}

export const signatureDishesData: Dish[] = [
  {
    id: "sig-shah-plov",
    translationKey: "dishShahPlov",
    nameEN: "Azerbaijani Shah Plov",
    descEN: "The King of Plovs. Basmati rice baked inside a crisp lavash crust with tender lamb, chestnuts, dried apricots, plums, and golden raisins.",
    price: 120,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=2000&auto=format&fit=crop",
    category: "azeri",
    chefRecommend: true,
  },
  {
    id: "sig-adana-kebab",
    translationKey: "dishAdanaKebab",
    nameEN: "Royal Adana Kebab",
    descEN: "Hand-minced prime lamb rib mixed with red bell peppers and Anatolian spices, charcoal-grilled on a broad iron skewer. Served with lavash and sumac onions.",
    price: 95,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
    category: "turkish",
    spicy: true,
    chefRecommend: true,
  },
  {
    id: "sig-saj-lamb",
    translationKey: "dishSajLamb",
    nameEN: "Sizzling Saj Lamb",
    descEN: "Traditional Azerbaijani dish cooked on a convex cast-iron pan. Tender lamb chunks sizzled with wild onions, bell peppers, aubergine, and sweet pomegranate seeds.",
    price: 110,
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=1992&auto=format&fit=crop",
    category: "azeri",
  },
  {
    id: "sig-pistachio-baklava",
    translationKey: "dishBaklava",
    nameEN: "Gaziantep Pistachio Baklava",
    descEN: "Forty layers of paper-thin phyllo pastry filled with crushed premium Gaziantep pistachios and soaked in light honey syrup. Served warm with Turkish Maraş dondurma.",
    price: 50,
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=1974&auto=format&fit=crop",
    category: "dessert",
  },
  {
    id: "sig-shekerbura",
    translationKey: "dishShekerbura",
    nameEN: "Azerbaijani Shekerbura",
    descEN: "Delectable crescent-shaped sweet pastry filled with sweet ground almonds, cardamom, and hazelnuts, decorated with traditional hand-pinched patterns.",
    price: 45,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop",
    category: "dessert",
    chefRecommend: true,
  },
  {
    id: "sig-sherbet",
    translationKey: "dishSherbet",
    nameEN: "Pomegranate Saffron Sherbet",
    descEN: "Traditional cold Azerbaijani beverage infused with organic pomegranates, rosewater, fresh mint, and a whisper of premium saffron threads.",
    price: 35,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=1974&auto=format&fit=crop",
    category: "beverage",
  }
];

export const SignatureDishes: React.FC = () => {
  const { t, language, isRtl } = useLanguage();
  const { addItem } = useCart();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const filteredDishes = signatureDishesData.filter((dish) => {
    if (categoryFilter === "all") return true;
    return dish.category === categoryFilter;
  });

  const handleAddToCart = (dish: Dish) => {
    addItem({
      id: dish.id,
      name: dish.nameEN,
      translationKey: dish.translationKey,
      price: dish.price,
      image: dish.image,
      category: dish.category,
    });
    setAddedItemName(dish.nameEN);
    setTimeout(() => {
      setAddedItemName(null);
    }, 2000);
  };

  const getLocalizedName = (dish: Dish) => {
    if (language === "ar") {
      switch (dish.id) {
        case "sig-shah-plov": return "شاه بلوف الأذربيجاني الملكي";
        case "sig-adana-kebab": return "كباب أضنة الفاخر";
        case "sig-saj-lamb": return "صاج اللحم الأذربيجاني المشتعل";
        case "sig-pistachio-baklava": return "البقلاوة بالفستق من غازي عنتاب";
        case "sig-shekerbura": return "شكر بورا الأذربيجانية بالهيل";
        case "sig-sherbet": return "شربات الرمان والزعفران";
      }
    } else if (language === "tr") {
      switch (dish.id) {
        case "sig-shah-plov": return "Azerbaycan Şah Pilavı";
        case "sig-adana-kebab": return "Kraliyet Adana Kebabı";
        case "sig-saj-lamb": return "Sıcak Sac Kavurma (Kuzu)";
        case "sig-pistachio-baklava": return "Gaziantep Fıstıklı Baklava";
        case "sig-shekerbura": return "Azerbaycan Şekerburası";
        case "sig-sherbet": return "Safranlı Nar Şerbeti";
      }
    }
    return dish.nameEN;
  };

  const getLocalizedDesc = (dish: Dish) => {
    if (language === "ar") {
      switch (dish.id) {
        case "sig-shah-plov": return "ملك الأطباق الأذربيجانية. أرز بسمتي فاخر يخبز داخل قشرة لواش مقرمشة مع لحم الغنم الطري والكستناء والمشمش المجفف والخوخ والزبيب الذهبي.";
        case "sig-adana-kebab": return "لحم الغنم المفروم يدوياً والممزوج بالفلفل الأحمر والتوابل الأناضولية، مشوي على الفحم على سيخ حديدي عريض. يقدم مع خبز لواش والبصل بالسماق.";
        case "sig-saj-lamb": return "طبق أذربيجاني تقليدي مطبوخ على مقلاة صاج دائرية. قطع لحم غنم طرية مقلية مع البصل البري، الفلفل الحلو، الباذنجان، وحبوب الرمان الحلوة.";
        case "sig-pistachio-baklava": return "أربعون طبقة من رقائق العجين الرقيقة للغاية المحشوة بالفستق الحلبي الفاخر من غازي عنتاب والمغمورة بشراب العسل الخفيف. تقدم دافئة.";
        case "sig-shekerbura": return "عجينة حلوة على شكل هلال محشوة باللوز المطحون والهيل والبندق، ومزينة بنقوش تقليدية ملقطية يدوية.";
        case "sig-sherbet": return "مشروب أذربيجاني تقليدي بارد غني بالرمان العضوي وماء الورد والنعناع الطازج ونفحات من خيوط الزعفران الفاخرة.";
      }
    } else if (language === "tr") {
      switch (dish.id) {
        case "sig-shah-plov": return "Pilavların Şahı. Çıtır lavaş kabuğu içerisinde fırınlanmış basmati pirinci, körpe kuzu eti, kestane, kayısı, mürdüm eriği ve altın üzüm.";
        case "sig-adana-kebab": return "Zırhla kıyılmış kuzu boşluğu, kapya biberi ve özel Anadolu baharatları ile yoğrularak kömür ateşinde pişirilen geleneksel Adana kebabı.";
        case "sig-saj-lamb": return "Azerbaycan'ın meşhur sac yemeği. Kuzu eti parçaları, yabani soğan, renkli biberler, patlıcan ve tatlı nar taneleriyle sac üzerinde sote.";
        case "sig-pistachio-baklava": return "Antep fıstıkları ile doldurulmuş 40 kat incecik el açması baklava yufkası, hafif şerbet ile ıslatılmış, Maraş dondurması eşliğinde sıcak servis.";
        case "sig-shekerbura": return "Hilal şeklinde hazırlanan, içi kakuleli badem ve fındık ezmesi dolu, üzeri geleneksel nakış aleti nakkaş ile işlenmiş Azeri tatlısı.";
        case "sig-sherbet": return "Taze nar taneleri, gül suyu, nane yaprakları ve hakiki safran telleri ile demlenmiş geleneksel ferahlatıcı saray şerbeti.";
      }
    }
    return dish.descEN;
  };

  return (
    <section id="experience" className="py-24 bg-bg-secondary relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(212,175,55,0.04)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.4em] text-gold uppercase mb-3 block"
          >
            {t("sigTitle")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl font-serif-luxury text-white mb-4"
          >
            {language === "ar"
              ? "روائع فنية من المطبخ الإمبراطوري"
              : language === "tr"
              ? "Saray Mutfağının Gurme Sanatı"
              : "Culinary Art from the Imperial Kitchen"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs sm:text-sm text-text-muted leading-relaxed font-light"
          >
            {t("sigSub")}
          </motion.p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {[
            { id: "all", label: t("filterAll") },
            { id: "turkish", label: t("filterTurkish") },
            { id: "azeri", label: t("filterAzeri") },
            { id: "dessert", label: t("filterDessert") },
            { id: "beverage", label: t("filterBeverage") },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategoryFilter(tab.id)}
              className={`px-5 py-2.5 rounded-[2px] text-[10px] font-bold tracking-[0.15em] uppercase border transition-all duration-300 cursor-pointer ${
                categoryFilter === tab.id
                  ? "bg-gold border-gold text-bg-secondary shadow-[0_0_12px_rgba(212,175,55,0.25)]"
                  : "border-gold-border/20 text-text-secondary hover:border-gold hover:text-gold"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dishes Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDishes.map((dish, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={dish.id}
                className="glass-premium rounded-[4px] border border-gold-border/10 overflow-hidden relative flex flex-col h-full group hover:border-gold/40 transition-all duration-500 hover:-translate-y-2 shadow-xl"
              >
                {/* Image Container with Badges */}
                <div className="relative h-[220px] overflow-hidden shrink-0">
                  <img
                    src={dish.image}
                    alt={dish.nameEN}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Glowing Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/90 via-bg-secondary/20 to-transparent" />
                  
                  {/* Top floating badges */}
                  <div className={`absolute top-4 ${isRtl ? "left-4" : "right-4"} flex flex-col gap-2`}>
                    {dish.chefRecommend && (
                      <span className="bg-gold text-bg-secondary text-[8px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-[1px] shadow-lg">
                        {t("chefRecommend")}
                      </span>
                    )}
                    {dish.spicy && (
                      <span className="bg-red-950/80 border border-red-500/30 text-red-400 text-[8px] font-bold uppercase tracking-wider py-1 px-2 rounded-[1px]">
                        {t("spicy")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="text-base font-serif-luxury font-medium text-white tracking-wide group-hover:text-gold transition-colors duration-300">
                      {getLocalizedName(dish)}
                    </h3>
                    <span className="text-sm font-bold text-gold font-mono tracking-wider shrink-0 mt-0.5">
                      {dish.price} AED
                    </span>
                  </div>

                  <p className="text-xs text-text-muted leading-relaxed font-light flex-grow mb-6">
                    {getLocalizedDesc(dish)}
                  </p>

                  {/* Add to Order Button */}
                  <button
                    onClick={() => handleAddToCart(dish)}
                    className="w-full py-3 border border-gold/30 hover:border-gold text-gold hover:bg-gold hover:text-bg-secondary text-[9px] font-bold tracking-[0.2em] uppercase rounded-[2px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group-hover:border-gold/50"
                  >
                    <Plus size={12} />
                    {t("addToCart")}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global Toast Alert upon item adding */}
        <AnimatePresence>
          {addedItemName && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="fixed bottom-8 left-8 z-50 glass-premium border border-gold px-6 py-4 rounded-[4px] shadow-2xl flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                <ShoppingCart size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-wide">
                  {language === "ar" ? "تمت إضافة الطبق!" : language === "tr" ? "Lezzet Eklendi!" : "Dish Selected!"}
                </span>
                <span className="text-[10px] text-text-muted font-light mt-0.5">
                  {addedItemName}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
