"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryImage {
  id: string;
  url: string;
  titleEN: string;
  titleAR: string;
  titleTR: string;
  category: string;
}

const galleryData: GalleryImage[] = [
  {
    id: "gal-1",
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2000&auto=format&fit=crop",
    titleEN: "Flames of the Adana Grill",
    titleAR: "لهيب شواية أضنة الفاخرة",
    titleTR: "Adana Ocağının Ateşi",
    category: "kitchen",
  },
  {
    id: "gal-2",
    url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=2000&auto=format&fit=crop",
    titleEN: "Azerbaijani Shah Plov Presentation",
    titleAR: "تقديم طبق شاه بلوف الأذربيجاني الأصيل",
    titleTR: "Geleneksel Şah Pilavı Sunumu",
    category: "plating",
  },
  {
    id: "gal-3",
    url: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2000&auto=format&fit=crop",
    titleEN: "The Royal Sultan Dining Room",
    titleAR: "قاعة السلطان الملكية لتناول الطعام",
    titleTR: "Sultan Odası Kapalı Salon",
    category: "interior",
  },
  {
    id: "gal-4",
    url: "https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=2000&auto=format&fit=crop",
    titleEN: "Gaziantep Pastry Craftsmanship",
    titleAR: "حرفية صناعة البقلاوة في غازي عنتاب",
    titleTR: "El Açması Baklava Sanatı",
    category: "kitchen",
  },
  {
    id: "gal-5",
    url: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2000&auto=format&fit=crop",
    titleEN: "Chef Elnur finishing a Saj Masterpiece",
    titleAR: "الشيف إلنور يضع اللمسات الأخيرة على تحفة الصاج",
    titleTR: "Şef Elnur Sac Başyapıtını Hazırlarken",
    category: "plating",
  },
  {
    id: "gal-6",
    url: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?q=80&w=2000&auto=format&fit=crop",
    titleEN: "Sand-Brewed Golden Turkish Coffee",
    titleAR: "القهوة التركية الذهبية المحضرة على الرمل",
    titleTR: "Kumda Pişen Altın Türk Kahvesi",
    category: "interior",
  }
];

export const Gallery: React.FC = () => {
  const { t, language, isRtl } = useLanguage();
  const [index, setIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (index !== null) {
      setIndex(index === 0 ? galleryData.length - 1 : index - 1);
    }
  };

  const handleNext = () => {
    if (index !== null) {
      setIndex(index === galleryData.length - 1 ? 0 : index + 1);
    }
  };

  const getLocalizedTitle = (img: GalleryImage) => {
    if (language === "ar") return img.titleAR;
    if (language === "tr") return img.titleTR;
    return img.titleEN;
  };

  return (
    <section id="gallery" className="py-24 bg-bg-secondary relative overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,175,55,0.03)_0%,transparent_70%)] filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.4em] text-gold uppercase mb-3 block"
          >
            {t("galleryTitle")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl font-serif-luxury text-white mb-4"
          >
            {language === "ar" ? "معرض الصور والجمال البصري" : language === "tr" ? "Göz Alıcı Fotoğraf Albümümüz" : "The Architectural & Culinary Poetry"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs sm:text-sm text-text-muted leading-relaxed font-light"
          >
            {t("gallerySub")}
          </motion.p>
        </div>

        {/* Masonry Image Gallery Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryData.map((img, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              key={img.id}
              className="break-inside-avoid relative overflow-hidden rounded-[4px] border border-gold-border/10 group cursor-pointer shadow-lg hover:border-gold/40 transition-colors"
              onClick={() => setIndex(idx)}
            >
              {/* Image Frame */}
              <img
                src={img.url}
                alt={img.titleEN}
                className="w-full object-cover h-auto max-h-[420px] rounded-[4px] group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />

              {/* Hover Frame Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-bg-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <Maximize2 size={16} className="text-gold absolute top-4 right-4" />
                <div className="flex items-center gap-2 mb-1.5">
                  <Camera size={12} className="text-gold" />
                  <span className="text-[8px] font-bold tracking-[0.25em] text-gold uppercase">
                    {img.category}
                  </span>
                </div>
                <h4 className="text-sm font-serif-luxury text-white tracking-wide">
                  {getLocalizedTitle(img)}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* HIGH-END INTERACTIVE LIGHTBOX OVERLAY */}
        <AnimatePresence>
          {index !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
            >
              {/* Close Button */}
              <button
                onClick={() => setIndex(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white hover:text-gold flex items-center justify-center border border-gold-border/20 transition-colors cursor-pointer z-55"
              >
                <X size={20} />
              </button>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className={`absolute ${
                  isRtl ? "right-6" : "left-6"
                } top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black text-white hover:text-gold flex items-center justify-center border border-gold-border/10 transition-colors cursor-pointer z-55`}
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className={`absolute ${
                  isRtl ? "left-6" : "right-6"
                } top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black text-white hover:text-gold flex items-center justify-center border border-gold-border/10 transition-colors cursor-pointer z-55`}
              >
                <ChevronRight size={24} />
              </button>

              {/* Lightbox Center Image & Meta */}
              <div className="relative max-w-4xl max-h-[80vh] px-4 flex flex-col items-center select-none">
                <motion.img
                  key={index}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={galleryData[index].url}
                  alt={galleryData[index].titleEN}
                  className="w-full max-h-[70vh] object-contain rounded-[4px] border border-gold-border/10 shadow-2xl"
                />

                {/* Subtitle Caption */}
                <motion.div
                  key={`caption-${index}`}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-center"
                >
                  <h3 className="text-base sm:text-lg font-serif-luxury text-gold tracking-wide">
                    {getLocalizedTitle(galleryData[index])}
                  </h3>
                  <span className="text-[8px] sm:text-[10px] tracking-[0.3em] uppercase text-text-muted mt-1 block">
                    — IMAGE {index + 1} OF {galleryData.length} —
                  </span>
                </motion.div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
