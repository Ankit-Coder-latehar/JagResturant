"use client";

import React, { useState } from "react";
import { useCart, CartItem } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { X, Trash2, Plus, Minus, ShoppingBag, MessageSquare, ClipboardCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { t, language, isRtl } = useLanguage();
  const { cart, removeItem, updateQuantity, subtotal, serviceFee, total, clearCart } = useCart();
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const getLocalizedName = (item: CartItem) => {
    if (language === "ar") {
      switch (item.id) {
        case "sig-shah-plov": return "شاه بلوف الأذربيجاني الملكي";
        case "sig-adana-kebab": return "كباب أضنة الفاخر";
        case "sig-saj-lamb": return "صاج اللحم الأذربيجاني المشتعل";
        case "sig-pistachio-baklava": return "البقلاوة بالفستق من غازي عنتاب";
        case "sig-shekerbura": return "شكر بورا الأذربيجانية بالهيل";
        case "sig-sherbet": return "شربات الرمان والزعفران";
        
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
        case "sig-shah-plov": return "Azerbaycan Şah Pilavı";
        case "sig-adana-kebab": return "Kraliyet Adana Kebabı";
        case "sig-saj-lamb": return "Sıcak Sac Kavurma (Kuzu)";
        case "sig-pistachio-baklava": return "Gaziantep Fıstıklı Baklava";
        case "sig-shekerbura": return "Azerbaycan Şekerburası";
        case "sig-sherbet": return "Safranlı Nar Şerbeti";
        
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
    return item.name;
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    // Compile absolute order list
    let orderText = language === "ar"
      ? `📝 *طلب مأكولات فاخرة جديد - مطعم جاشان دبي*\n\n`
      : language === "tr"
      ? `📝 *Yeni Gurme Siparişi - Jashan Restaurant Dubai*\n\n`
      : `📝 *New Luxury Order - Jashan Restaurant Dubai*\n\n`;

    cart.forEach((item, idx) => {
      orderText += `${idx + 1}. *${getLocalizedName(item)}* x ${item.quantity} (${item.price * item.quantity} AED)\n`;
    });

    orderText += `\n-----------------------------\n`;
    orderText += `*${t("cartSubtotal")}:* ${subtotal} AED\n`;
    orderText += `*${t("cartServiceFee")}:* ${serviceFee} AED\n`;
    orderText += `*${t("cartTotal")}:* ${total} AED\n`;
    orderText += `-----------------------------\n`;

    if (specialInstructions.trim()) {
      orderText += `\n👨‍🍳 *${t("cartSpecialInst")}:*\n"${specialInstructions.trim()}"\n`;
    }

    orderText += `\n📍 _Dubai Compliments_`;

    const encodedText = encodeURIComponent(orderText);
    // WhatsApp direct launch link
    window.open(`https://wa.me/971501234567?text=${encodedText}`, "_blank");

    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      clearCart();
      setSpecialInstructions("");
      onClose();
    }, 4000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
          />

          {/* Cart Panel Sheet */}
          <motion.div
            initial={{ x: isRtl ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed top-0 bottom-0 ${
              isRtl ? "left-0 border-r" : "right-0 border-l"
            } z-50 w-full sm:w-[440px] bg-bg-secondary border-gold-border/20 shadow-2xl flex flex-col`}
          >
            
            {/* Header */}
            <div className="p-6 border-b border-gold-border/20 flex items-center justify-between bg-[#121212] shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-gold" />
                <span className="text-sm font-serif-luxury font-bold tracking-widest text-white uppercase">
                  {t("cartTitle")}
                </span>
                {cart.length > 0 && (
                  <span className="bg-gold text-bg-secondary text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {cart.length}
                  </span>
                )}
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-gold-border/10 flex items-center justify-center text-text-secondary hover:text-gold transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Body Container */}
            <div className="flex-grow overflow-y-auto p-6 bg-bg-primary/80">
              <AnimatePresence mode="wait">
                {checkoutSuccess ? (
                  // SUCCESS SCREEN
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-gold mb-6 animate-bounce">
                      <ClipboardCheck size={28} />
                    </div>
                    <h3 className="text-lg font-serif-luxury text-white mb-2 text-gold-glow">
                      {t("orderSuccess")}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed font-light max-w-xs">
                      {t("orderSuccessSub")}
                    </p>
                  </motion.div>
                ) : cart.length === 0 ? (
                  // EMPTY SCREEN
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <ShoppingBag size={36} className="text-gold-border/40 mb-4 animate-pulse" />
                    <p className="text-xs text-text-muted leading-relaxed font-light max-w-xs">
                      {t("cartEmpty")}
                    </p>
                  </motion.div>
                ) : (
                  // LIST SCREEN
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-6"
                  >
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 items-center bg-[#121212]/50 border border-gold-border/10 rounded-[3px] p-3 hover:border-gold-border/20 transition-all"
                      >
                        {/* Circular Image */}
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-gold-border/20 shrink-0 bg-bg-secondary">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Title & Operations */}
                        <div className="flex-grow min-w-0">
                          <h4 className="text-xs font-serif-luxury font-medium text-white truncate mb-1">
                            {getLocalizedName(item)}
                          </h4>
                          <span className="text-[10px] text-gold font-mono font-bold">
                            {item.price} AED
                          </span>
                        </div>

                        {/* Plus/Minus operations */}
                        <div className="flex items-center border border-gold-border/20 rounded-[2px] overflow-hidden shrink-0 bg-bg-primary">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2 hover:bg-gold-border/10 text-text-secondary hover:text-gold transition-colors cursor-pointer"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-[10px] font-mono font-bold text-white px-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2 hover:bg-gold-border/10 text-text-secondary hover:text-gold transition-colors cursor-pointer"
                          >
                            <Plus size={10} />
                          </button>
                        </div>

                        {/* Trash icon */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-text-muted hover:text-red-400 transition-colors shrink-0 cursor-pointer p-1"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}

                    {/* Special Chef Instructions */}
                    <div className="border-t border-gold-border/15 pt-6 flex flex-col gap-2 mt-4">
                      <label className="text-[9px] uppercase tracking-[0.25em] text-text-muted font-bold flex items-center gap-1.5">
                        <MessageSquare size={10} className="text-gold" />
                        {t("cartSpecialInst")}
                      </label>
                      <textarea
                        rows={3}
                        placeholder={
                          language === "ar"
                            ? "أضف ملاحظاتك للطاهي هنا (مثل: خالي من المكسرات، إضافات خاصة...)"
                            : language === "tr"
                            ? "Şefimize iletmek istediğiniz notlar (örn: glutensiz ekmek, az tuzlu...)"
                            : "Write requests for the kitchen here (e.g., allergies, spicy levels...)"
                        }
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full bg-[#121212] border border-gold-border/20 focus:border-gold rounded-[2px] py-2.5 px-3 text-xs text-text-primary focus:outline-none transition-colors"
                      />
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer summaries & Checkout actions */}
            {cart.length > 0 && !checkoutSuccess && (
              <div className="p-6 border-t border-gold-border/20 bg-[#121212] shrink-0 flex flex-col gap-5">
                
                {/* Cost tables */}
                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex justify-between text-text-muted font-light">
                    <span>{t("cartSubtotal")}</span>
                    <span className="font-mono">{subtotal} AED</span>
                  </div>
                  <div className="flex justify-between text-text-muted font-light">
                    <span>{t("cartServiceFee")}</span>
                    <span className="font-mono">{serviceFee} AED</span>
                  </div>
                  
                  <div className="border-t border-gold-border/10 pt-3 flex justify-between text-white font-bold">
                    <span>{t("cartTotal")}</span>
                    <span className="font-mono text-gold text-sm tracking-wide">{total} AED</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gold hover:bg-gold-hover text-bg-secondary text-[10px] font-bold tracking-[0.25em] uppercase rounded-[2px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg relative overflow-hidden group"
                >
                  <Sparkles size={12} className="text-bg-secondary fill-bg-secondary animate-pulse" />
                  {t("cartCheckoutWhatsApp")}
                </button>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
