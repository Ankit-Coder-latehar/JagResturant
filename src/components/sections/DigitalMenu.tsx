"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { Search, Plus, Info, X, Check, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
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
  allergensEN: string[];
  ingredientsEN: string[];
}

const menuItemsData: MenuItem[] = [
  // Turkish specials
  {
    id: "menu-iskender",
    translationKey: "menuIskender",
    nameEN: "Bursa Iskender Kebab",
    descEN: "Thinly sliced charcoal-grilled lamb doner laid over soft pide bread, topped with warm rich tomato sauce, sizzling brown sheep butter, and premium strained yogurt.",
    price: 90,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
    category: "turkish",
    chefRecommend: true,
    allergensEN: ["Gluten", "Dairy"],
    ingredientsEN: ["Shaved Lamb Ribs", "Pide Bread", "Tomato Sauce", "Sheep Butter", "Strained Yogurt"],
  },
  {
    id: "menu-lahmacun",
    translationKey: "menuLahmacun",
    nameEN: "Gaziantep Lahmacun (2 Pcs)",
    descEN: "Crisp stone-baked flatbread topped with a rich minced lamb, tomato, parsley, garlic, red bell pepper, and Anatolian spices. Served with lemon wedges and fresh greens.",
    price: 45,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=2000&auto=format&fit=crop",
    category: "turkish",
    allergensEN: ["Gluten"],
    ingredientsEN: ["Stone-baked Flour", "Minced Lamb", "Sumac", "Fresh Parsley", "Garlic", "Lemon"],
  },
  {
    id: "menu-meze-platter",
    translationKey: "menuMeze",
    nameEN: "Imperial Meze Collection",
    descEN: "A premium cold meze board featuring hummus with pine nuts, muhammara, babaganoush, stuffed vine leaves, haydari, and warm freshly baked balloon bread.",
    price: 65,
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=1969&auto=format&fit=crop",
    category: "turkish",
    vegan: true,
    allergensEN: ["Nuts", "Sesame", "Gluten", "Dairy"],
    ingredientsEN: ["Chickpeas", "Tahini", "Roasted Aubergine", "Walnuts", "Vine Leaves", "Strained Yogurt"],
  },
  // Azerbaijani specials
  {
    id: "menu-dushbara",
    translationKey: "menuDushbara",
    nameEN: "Baku Dushbara",
    descEN: "Traditional dumplings stuffed with minced lamb and herbs, hand-folded so small that ten fit on a single spoon, served in a rich saffron-infused lamb broth.",
    price: 55,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=2070&auto=format&fit=crop",
    category: "azeri",
    chefRecommend: true,
    allergensEN: ["Gluten"],
    ingredientsEN: ["Handmade Flour Shells", "Minced Lamb", "Saffron Broth", "Wild Mint", "Vinegar-Garlic Dip"],
  },
  {
    id: "menu-govurma",
    translationKey: "menuGovurma",
    nameEN: "Cherry Govurma Plov",
    descEN: "Fluffy basmati rice topped with pan-seared milk-fed veal, organic sour cherries, dried fruits, chestnuts, and baked sweet onions.",
    price: 105,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=2000&auto=format&fit=crop",
    category: "azeri",
    allergensEN: ["Dairy"],
    ingredientsEN: ["Basmati Rice", "Milk-fed Veal Chunks", "Sour Cherries", "Chestnuts", "Clarified Butter"],
  },
  {
    id: "menu-gutab",
    translationKey: "menuGutab",
    nameEN: "Azerbaijani Gutab Trio",
    descEN: "Traditional paper-thin folded dough pockets filled with lamb, mixed mountain greens, and sweet pumpkin, grilled on an iron saj and sprinkled with sumac.",
    price: 48,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop",
    category: "azeri",
    allergensEN: ["Gluten", "Dairy"],
    ingredientsEN: ["Paper-thin Dough", "Mountain Greens", "Minced Lamb", "Pumpkin puree", "Sumac", "Clarified Butter"],
  },
  // Desserts
  {
    id: "menu-kunefe",
    translationKey: "menuKunefe",
    nameEN: "Hatay Crispy Künefe",
    descEN: "Shredded kadayıf pastry baked with unsalted melting Hatay cheese, soaked in light sweet syrup, crowned with premium crushed green pistachios and clotted cream.",
    price: 55,
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=1974&auto=format&fit=crop",
    category: "dessert",
    chefRecommend: true,
    allergensEN: ["Dairy", "Gluten", "Nuts"],
    ingredientsEN: ["Kadayıf Pastry", "Hatay Cheese", "Sugar Syrup", "Premium Pistachios", "Kaymak clotted cream"],
  },
  {
    id: "menu-halva",
    translationKey: "menuHalva",
    nameEN: "Baku Saffron Halva",
    descEN: "Traditional Azerbaijani wedding halva cooked with toasted wheat flour, pure honey, rich cardamoms, and heavy saffron syrup. Garnished with walnuts.",
    price: 40,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop",
    category: "dessert",
    allergensEN: ["Gluten", "Nuts"],
    ingredientsEN: ["Toasted Wheat Flour", "Organic Saffron", "Cardamom", "Caspian Honey", "Walnut Halves"],
  },
  // Beverages
  {
    id: "menu-turkish-coffee",
    translationKey: "menuCoffee",
    nameEN: "Traditional Sand-Brewed Coffee",
    descEN: "Premium Turkish coffee slow-brewed on hot sand in copper cezve. Served with authentic double-roasted pistachio Turkish delights and glass of chilled rosewater.",
    price: 28,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=1974&auto=format&fit=crop",
    category: "beverage",
    allergensEN: ["Nuts"],
    ingredientsEN: ["Sand-ground Coffee Beans", "Cardamom infusion", "Pistachio Turkish Delights", "Rosewater"],
  },
  {
    id: "menu-sherbet-basil",
    translationKey: "menuSherbetBasil",
    nameEN: "Purple Basil Sherbet",
    descEN: "Chilled infusion of mountain purple basil leaves, fresh lemon wedges, organic honey, and cardamoms. A refreshing, deep magenta Caspian royal digestif.",
    price: 25,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=1974&auto=format&fit=crop",
    category: "beverage",
    vegan: true,
    allergensEN: [],
    ingredientsEN: ["Purple Basil Leaves", "Mountain Honey", "Lemon juice", "Cardamom Pods"],
  }
];

export const DigitalMenu: React.FC = () => {
  const { t, language, isRtl } = useLanguage();
  const { addItem } = useCart();
  
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const getLocalizedName = (item: MenuItem) => {
    if (language === "ar") {
      switch (item.id) {
        case "menu-iskender": return "إسكندر كباب بورصة الملكي";
        case "menu-lahmacun": return "لحم بعجين غازي عنتاب";
        case "menu-meze-platter": return "مجموعة المقبلات الإمبراطورية";
        case "menu-dushbara": return "دشبرة باكو الفاخرة";
        case "menu-govurma": return "بلوف كوفورما بالكرز العضوي";
        case "menu-gutab": return "ثلاثية القطاب الأذربيجاني";
        case "menu-kunefe": return "كنافة هاتاي المقرمشة بالجبن";
        case "menu-halva": return "حلاوة باكو بالزعفران";
        case "menu-turkish-coffee": return "القهوة التركية المحضرة على الرمل";
        case "menu-sherbet-basil": return "شربات الريحان البنفسجي المنعش";
      }
    } else if (language === "tr") {
      switch (item.id) {
        case "menu-iskender": return "Meşhur Bursa İskender Kebabı";
        case "menu-lahmacun": return "Taş Fırın Antep Lahmacunu";
        case "menu-meze-platter": return "Saray Meze Tabağı";
        case "menu-dushbara": return "Geleneksel Bakü Düşberesi";
        case "menu-govurma": return "Vişneli Kavurmalı Pilav";
        case "menu-gutab": return "Azerbaycan Kutab Üçlemesi";
        case "menu-kunefe": return "Hatay Çıtır Peynirli Künefe";
        case "menu-halva": return "Bakü Safran Helvası";
        case "menu-turkish-coffee": return "Kumda Pişen Geleneksel Kahve";
        case "menu-sherbet-basil": return "Reyhan Şerbeti (Fesleğen)";
      }
    }
    return item.nameEN;
  };

  const getLocalizedDesc = (item: MenuItem) => {
    if (language === "ar") {
      switch (item.id) {
        case "menu-iskender": return "دونر لحم غنم مشوي على الفحم يوضع فوق خبز بيدي ناعم، تعلوه صلصة طماطم غنية دافئة، زبدة غنم مغلية، ولبن زبادي مصفى فاخر.";
        case "menu-lahmacun": return "خبز مقرمش مخبوز على الحجر يعلوه لحم غنم مفروم، طماطم، بقدونس، ثوم، فلفل أحمر وتوابل أناضولية. يقدم قطعتين.";
        case "menu-meze-platter": return "لوحة مقبلات باردة فاخرة تحتوي على حمص بالصنوبر، محمرة، بابا غنوج، ورق عنب محشي، حيدري، وخبز البالون الدافئ.";
        case "menu-dushbara": return "زلابية تقليدية محشوة بلحم الغنم المفروم والأعشاب، ملفوفة يدوياً بحجم متناهي الصغر يقدم في حساء زعفران غني.";
        case "menu-govurma": return "أرز بسمتي منفوش يعلوه لحم عجل مغذى على الحليب مقلي، مع كرز حامض عضوي، فواكه مجففة، كستناء وبصل مشوي.";
        case "menu-gutab": return "عجينة رقيقة للغاية مطوية محشوة بلحم الغنم، أعشاب الجبل المختلطة، واليقطين الحلو، مشوية على الصاج مع السماق.";
        case "menu-kunefe": return "عجينة كنافة مقرمشة تخبز مع جبن هاتاي الخالي من الملح، مشربة بالشربات، تعلوها طبقة فستق حلبي مطحون وقشطة.";
        case "menu-halva": return "حلاوة أذربيجانية تقليدية مطبوخة بدقيق القمح المحمص، عسل طبيعي، هيل نفاذ وشربات الزعفران الكثيف.";
        case "menu-turkish-coffee": return "قهوة تركية ممتازة مخمرة ببطء على الرمل الساخن في ركوة نحاسية. تقدم مع راحة الحلقوم بالفستق وكوب ماء ورد مبرد.";
        case "menu-sherbet-basil": return "منقوع بارد من أوراق الريحان البنفسجي، ليمون، عسل جبلي، وهيل. دايجستيف ملكي منعش.";
      }
    } else if (language === "tr") {
      switch (item.id) {
        case "menu-iskender": return "İncecik kesilmiş kömür ateşinde kuzu döner, tırnak pide yatağında, tereyağı, domates sosu ve süzme yoğurt eşliğinde servis edilir.";
        case "menu-lahmacun": return "Taş fırında çıtır pişen, zırh kıymalı, domatesli, sarımsaklı harçlı lahmacun. Limon ve yeşilliklerle birlikte (2 adet).";
        case "menu-meze-platter": return "Çam fıstıklı humus, muhammara, babaganuş, yaprak sarması, haydari ve taze balon ekmeğinden oluşan soğuk meze tabağı.";
        case "menu-dushbara": return "Süzme kuzu eti suyu ve safranla demlenmiş çorba içerisinde, tek bir kaşığa 10 adet sığacak küçüklükte el açması mini mantılar.";
        case "menu-govurma": return "Tavada mühürlenmiş süt danası eti, taze vişneler, kestane ve karamelize soğan ile demlenmiş tane tane basmati pilavı.";
        case "menu-gutab": return "Saj üzerinde pişen, kuzu kıymalı, taze dağ otlu ve tatlı bal kabaklı incecik lavaş hamuru bükmeleri.";
        case "menu-kunefe": return "Özel Hatay künefe peyniri ile kadayıfın taş fırında buluşması, şerbet, Antep fıstığı ve hakiki kaymak eşliğinde.";
        case "menu-halva": return "Kavrulmuş un, tereyağı, bal, kakule ve yoğun safran şerbeti ile demlenen geleneksel Bakü helvası. Cevizle süslenir.";
        case "menu-turkish-coffee": return "Bakır cezvede köz kumda yavaşça pişen kahve. Çifte kavrulmuş fıstıklı lokum ve gül suyu ikramıyla sunulur.";
        case "menu-sherbet-basil": return "Mor reyhan yaprakları, limon dilimleri, dağ balı ve kakule ile demlenmiş, Hazar kıyılarından ferahlatıcı mor şerbet.";
      }
    }
    return item.descEN;
  };

  const filteredItems = menuItemsData.filter((item) => {
    const matchesTab = activeTab === "all" || item.category === activeTab;
    
    // Simple text match
    const text = searchQuery.toLowerCase();
    const nameMatch = item.nameEN.toLowerCase().includes(text);
    const descMatch = item.descEN.toLowerCase().includes(text);
    
    // Add simple mock translations to make it responsive
    const localName = getLocalizedName(item).toLowerCase();
    const localNameMatch = localName.includes(text);

    return matchesTab && (nameMatch || descMatch || localNameMatch);
  });

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.nameEN,
      translationKey: item.translationKey,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    setAddedItemName(item.nameEN);
    setTimeout(() => {
      setAddedItemName(null);
    }, 2000);
  };

  return (
    <section id="menu" className="py-24 bg-bg-primary relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,175,55,0.03)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,175,55,0.03)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.4em] text-gold uppercase mb-3 block"
          >
            {t("menuTitle")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl font-serif-luxury text-white mb-4"
          >
            {language === "ar" ? "قائمة المذاق الأصيل والفاخر" : language === "tr" ? "Zengin Gurme Seçkimiz" : "The Complete Gastronomic Menu"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs sm:text-sm text-text-muted leading-relaxed font-light"
          >
            {t("menuSub")}
          </motion.p>
        </div>

        {/* Search Bar & Categories layout */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between border-b border-gold-border/20 pb-8 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start w-full md:w-auto">
            {[
              { id: "all", label: t("filterAll") },
              { id: "turkish", label: t("filterTurkish") },
              { id: "azeri", label: t("filterAzeri") },
              { id: "dessert", label: t("filterDessert") },
              { id: "beverage", label: t("filterBeverage") },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-[2px] text-[9px] font-bold tracking-[0.15em] uppercase border transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-gold/10 border-gold text-gold"
                    : "border-transparent text-text-secondary hover:text-gold"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input Widget */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-border/80" size={16} />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212] border border-gold-border/30 rounded-[2px] py-2.5 pl-10 pr-4 text-xs text-text-primary focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={item.id}
              className="p-5 bg-bg-secondary/40 border border-gold-border/10 rounded-[4px] hover:border-gold/30 transition-all duration-300 flex items-center gap-4 sm:gap-6 relative group"
            >
              {/* Image Circle */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 border border-gold-border/30 relative">
                <img
                  src={item.image}
                  alt={item.nameEN}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text Info */}
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-baseline gap-2 mb-1.5">
                  <h3 className="text-sm sm:text-base font-serif-luxury font-medium text-white truncate pr-1">
                    {getLocalizedName(item)}
                  </h3>
                  <span className="text-xs sm:text-sm font-bold text-gold font-mono tracking-wider shrink-0">
                    {item.price} AED
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-text-muted leading-relaxed font-light line-clamp-2">
                  {getLocalizedDesc(item)}
                </p>
                {/* Special Indicators */}
                <div className="flex items-center gap-2 mt-2">
                  {item.chefRecommend && (
                    <span className="text-[7px] text-gold font-bold uppercase tracking-wider bg-gold/5 px-1.5 py-0.5 rounded-[1px] border border-gold/10">
                      ★ RECOMMEND
                    </span>
                  )}
                  {item.vegan && (
                    <span className="text-[7px] text-green-400 font-bold uppercase tracking-wider bg-green-500/5 px-1.5 py-0.5 rounded-[1px] border border-green-500/10">
                      {t("vegan")}
                    </span>
                  )}
                </div>
              </div>

              {/* View Action Circle */}
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="w-8 h-8 rounded-full border border-gold-border/20 flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold transition-colors cursor-pointer"
                  title={t("viewDetails")}
                >
                  <Eye size={14} />
                </button>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-8 h-8 rounded-full bg-gold/5 border border-gold-border/20 flex items-center justify-center text-gold hover:bg-gold hover:text-bg-secondary transition-colors cursor-pointer"
                  title={t("addToCart")}
                >
                  <Plus size={14} />
                </button>
              </div>
            </motion.div>
          ))}
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
              <Check className="text-gold" size={16} />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-wide">
                  {language === "ar" ? "تمت إضافة الصنف!" : language === "tr" ? "Sipariş Eklendi!" : "Item Added!"}
                </span>
                <span className="text-[10px] text-text-muted font-light mt-0.5">
                  {addedItemName}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GORGEOUS DETAILS MODAL OVERLAY */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/85 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-full max-w-2xl glass-premium rounded-[4px] border border-gold-border/30 shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col md:flex-row"
              >
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white hover:text-gold flex items-center justify-center transition-colors border border-gold-border/20 cursor-pointer"
                >
                  <X size={16} />
                </button>

                {/* Left side: Premium Image Banner */}
                <div className="md:w-5/12 h-[200px] md:h-auto relative overflow-hidden shrink-0 bg-bg-secondary">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.nameEN}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-bg-secondary via-transparent to-transparent" />
                </div>

                {/* Right side: Detailed descriptions */}
                <div className="p-6 md:p-8 md:w-7/12 overflow-y-auto flex flex-col justify-between">
                  <div>
                    {/* Category Label */}
                    <span className="text-[8px] font-bold tracking-[0.3em] text-gold uppercase block mb-2">
                      {selectedItem.category === "turkish"
                        ? t("filterTurkish")
                        : selectedItem.category === "azeri"
                        ? t("filterAzeri")
                        : selectedItem.category === "dessert"
                        ? t("filterDessert")
                        : t("filterBeverage")}
                    </span>

                    {/* Title & Price */}
                    <div className="flex justify-between items-baseline gap-4 mb-4">
                      <h2 className="text-xl md:text-2xl font-serif-luxury text-white">
                        {getLocalizedName(selectedItem)}
                      </h2>
                      <span className="text-base font-bold text-gold font-mono tracking-wider">
                        {selectedItem.price} AED
                      </span>
                    </div>

                    {/* Storytelling Text */}
                    <p className="text-xs text-text-secondary leading-relaxed font-light mb-6">
                      {getLocalizedDesc(selectedItem)}
                    </p>

                    {/* Ingredients table */}
                    <div className="mb-6">
                      <h4 className="text-[9px] uppercase tracking-[0.25em] text-text-muted font-bold mb-2">
                        {language === "ar" ? "أبرز المكونات" : language === "tr" ? "Önemli Malzemeler" : "Key Ingredients"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.ingredientsEN.map((ing, i) => (
                          <span
                            key={i}
                            className="bg-bg-primary text-text-secondary text-[9px] py-1 px-2.5 rounded-[1px] border border-gold-border/10 font-light"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Allergy table */}
                    {selectedItem.allergensEN.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-[9px] uppercase tracking-[0.25em] text-red-400 font-bold mb-2 flex items-center gap-1">
                          <Info size={10} />
                          {t("allergens")}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.allergensEN.map((allerg, i) => (
                            <span
                              key={i}
                              className="bg-red-500/5 text-red-300 border border-red-500/20 text-[9px] py-1 px-2 rounded-[1px] font-medium"
                            >
                              {allerg}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cart Action bottom bar */}
                  <div className="flex gap-4 border-t border-gold-border/20 pt-4 shrink-0">
                    <button
                      onClick={() => {
                        handleAddToCart(selectedItem);
                        setSelectedItem(null);
                      }}
                      className="w-full py-3 bg-gold hover:bg-gold-hover text-bg-secondary text-[10px] font-bold tracking-[0.25em] uppercase transition-colors rounded-[2px] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Plus size={12} />
                      {t("addToCart")}
                    </button>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-6 py-3 border border-gold-border/30 text-text-secondary hover:text-white text-[10px] font-bold tracking-[0.25em] uppercase rounded-[2px] cursor-pointer"
                    >
                      {t("close")}
                    </button>
                  </div>

                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
