"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { MessageSquare, X, Send, Bot, Sparkles, User, Calendar, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: string;
  sender: "zara" | "user";
  text: string;
  timestamp: string;
}

export const AIAssistant: React.FC = () => {
  const { t, language, isRtl } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [typing, setTyping] = useState(false);
  const [bookingStep, setBookingStep] = useState<number>(0);
  const [bookingDetails, setBookingDetails] = useState({ name: "", date: "", guests: "" });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize introductory message
  useEffect(() => {
    setMessages([
      {
        id: "msg-intro",
        sender: "zara",
        text: t("aiIntro"),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  }, [language]);

  // Scroll to bottom on updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typing]);

  const addZaraResponse = (text: string) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `zara-${Math.random()}`,
          sender: "zara",
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }, 1000);
  };

  const handleFAQ = (faqKey: string) => {
    let userText = "";
    let zaraText = "";

    switch (faqKey) {
      case "hours":
        userText = t("aiFAQHours");
        zaraText = language === "ar"
          ? `ساعات العمل الفاخرة لدينا هي كالتالي:\n• أيام الأسبوع: من 12:00 ظهراً حتى 12:00 منتصف الليل\n• عطلة نهاية الأسبوع: من 12:00 ظهراً حتى 02:00 بعد منتصف الليل`
          : language === "tr"
          ? `Jag sarayımızın çalışma saatleri:\n• Hafta içi: 12:00 - 00:00\n• Hafta sonu: 12:00 - 02:00`
          : `Our business hours at Jag Restaurant Dubai:\n• Weekdays: 12:00 PM - 12:00 AM\n• Weekends: 12:00 PM - 02:00 AM`;
        break;

      case "location":
        userText = t("aiFAQLocation");
        zaraText = language === "ar"
          ? `يقع مطعمنا في دبي على طريق شاطئ جميرا المرموق. تتوفر خدمة صف السيارات المجانية VIP لجميع ضيوفنا الكرام بمجرد وصولهم.`
          : language === "tr"
          ? `Restaurantımız Dubai'nin en seçkin bölgelerinden Jumeirah Sahil Yolu üzerinde yer almaktadır. Tüm değerli konuklarımıza ücretsiz VIP vale hizmeti sunulmaktadır.`
          : `We are located on the prestigious Jumeirah Beach Road, Dubai, UAE. Free VIP Valet parking is available for all dining guests upon arrival.`;
        break;

      case "recommend":
        userText = t("aiFAQMenu");
        zaraText = language === "ar"
          ? `أوصي بشدة بتجربة شاه بلوف الأذربيجاني الفاخر (أرز مطبوخ في قشرة خبز مقرمشة مع لحم الغنم الطري والمشمش والمكسرات)، ويليه كباب أضنة التركي المشوي على الفحم. وللحلوى، كنافة هاتاي المقرمشة بالجبن الساخن.`
          : language === "tr"
          ? `Kesinlikle en meşhur imza lezzetimiz olan Azerbaycan Şah Pilavı'nı (kuzu eti, kestane ve kuru meyvelerle fırınlanmış basmati pilavı) denemelisiniz. Yanına zırhla çekilmiş özel Adana Kebabımızı ve tatlı olarak çıtır çıtır akan Hatay Künefesi'ni tavsiye ederim.`
          : `I highly recommend starting with our signature Azerbaijani Shah Plov (fluffy basmati rice with lamb and chestnuts inside a crispy crust) and then trying our Turkish Adana Kebab grilled over charcoal. For dessert, Gaziantep Baklava is a true masterpiece.`;
        break;

      case "reserve":
        userText = t("aiFAQReserve");
        zaraText = language === "ar"
          ? `بكل سرور! سأقوم بمساعدتك الآن. ما هو اسمك الكامل لتسجيل هذا الحجز؟`
          : language === "tr"
          ? `Memnuniyetle! Masa rezervasyonunuzu hemen oluşturalım. Öncelikle adınızı ve soyadınızı alabilir miyim?`
          : `With pleasure! I will guide you through our booking board. To start, may I have your full name?`;
        setBookingStep(1);
        break;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Math.random()}`,
        sender: "user",
        text: userText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);

    addZaraResponse(zaraText);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    setInputVal("");

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Math.random()}`,
        sender: "user",
        text: userText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);

    // Conversational multi-step booking logic
    if (bookingStep === 1) {
      setBookingDetails((prev) => ({ ...prev, name: userText }));
      const response = language === "ar"
        ? `أهلاً بك يا ${userText}. متى ترغب في حجز طاولتك؟ (يرجى كتابة التاريخ، على سبيل المثال: 10 يونيو)`
        : language === "tr"
        ? `Hoş geldiniz Sayın ${userText}. Rezervasyonunuzu hangi tarih için oluşturmak istersiniz? (Örn: 15 Haziran)`
        : `Welcome, ${userText}. What date would you prefer for your royal seating? (e.g., June 15th)`;
      addZaraResponse(response);
      setBookingStep(2);
      return;
    }

    if (bookingStep === 2) {
      setBookingDetails((prev) => ({ ...prev, date: userText }));
      const response = language === "ar"
        ? `ممتاز! ولكم من الحضور تتوقع؟`
        : language === "tr"
        ? `Harika! Kaç kişilik bir masa ayırmak istersiniz?`
        : `Perfect! How many guests will be joining us in your party?`;
      addZaraResponse(response);
      setBookingStep(3);
      return;
    }

    if (bookingStep === 3) {
      const guests = userText;
      const refCode = "JAG-AI-" + Math.floor(1000 + Math.random() * 9000);
      
      const response = language === "ar"
        ? `رائع جداً! لقد قمت بجدولة حجز مبدئي باسم ${bookingDetails.name} للتاريخ ${bookingDetails.date} لعدد ${guests} أشخاص.\n\nرمز الحجز الخاص بك هو: ${refCode}.\n\nنتطلع بشوق للترحيب بكم في صالة جاغ الملكية!`
        : language === "tr"
        ? `Mükemmel! Rezervasyonunuz oluşturuldu. Sayın ${bookingDetails.name} adına, ${bookingDetails.date} tarihinde ${guests} kişilik masanız ayrılmıştır.\n\nRezervasyon Kodunuz: ${refCode}.\n\nJag Restaurant Dubai'de sizi ağırlamak için sabırsızlanıyoruz!`
        : `Splendid! I have reserved a provisional seating for ${bookingDetails.name} on ${bookingDetails.date} for ${guests} guests.\n\nBooking Reference: ${refCode}.\n\nWe look forward to welcoming you to the halls of Jag!`;
      
      addZaraResponse(response);
      setBookingStep(0);
      return;
    }

    // Default intelligent keyword mapping
    const textLow = userText.toLowerCase();
    let zaraResponse = "";

    if (textLow.includes("hour") || textLow.includes("time") || textLow.includes("ساع") || textLow.includes("ساعة") || textLow.includes("ساعات") || textLow.includes("saat")) {
      zaraResponse = language === "ar"
        ? `ساعات العمل لدينا هي من 12:00 ظهراً وحتى 12:00 منتصف الليل يومياً (وحتى 2:00 صباحاً في عطلات نهاية الأسبوع).`
        : language === "tr"
        ? `Hafta içi 12:00 - 00:00, hafta sonu ise 12:00 - 02:00 saatleri arasında kapılarımız açıktır.`
        : `We are welcoming you daily from 12:00 PM to 12:00 AM (closing at 02:00 AM on weekends).`;
    } else if (textLow.includes("location") || textLow.includes("where") || textLow.includes("مكان") || textLow.includes("موقع") || textLow.includes("nerede") || textLow.includes("adres")) {
      zaraResponse = language === "ar"
        ? `نقع في شارع شاطئ جميرا المرموق في دبي. تتوفر خدمة صف السيارات مجاناً.`
        : language === "tr"
        ? `Dubai, Jumeirah Sahil Yolu üzerindeyiz. Ücretsiz VIP vale hizmetimiz mevcuttur.`
        : `We are situated on Jumeirah Beach Road, Dubai. Complimentary VIP valet parking is available.`;
    } else if (textLow.includes("menu") || textLow.includes("food") || textLow.includes("dish") || textLow.includes("طعام") || textLow.includes("اكل") || textLow.includes("قائمة") || textLow.includes("yemek")) {
      zaraResponse = language === "ar"
        ? `تتميز قائمتنا بأشهى الأطباق التركية والأذربيجانية. نوصي بشدة بطلب شاه بلوف وكباب أضنة الساخن.`
        : language === "tr"
        ? `Mısır esintili saray menümüzde Türk & Azeri harmanları bulunuyor. Şah Pilavı ve zırh kebabı en meşhurlarıdır.`
        : `Our digital gastronomy menu combines Turkish and Azerbaijani arts. Our absolute highlights are the Shah Plov and Adana charcoal kebab.`;
    } else if (textLow.includes("book") || textLow.includes("reserve") || textLow.includes("seat") || textLow.includes("حجز") || textLow.includes("طاولة") || textLow.includes("rezervasyon")) {
      zaraResponse = language === "ar"
        ? `بكل سرور! دعنا نقوم بالحجز الآن. ما هو اسمك الكامل؟`
        : language === "tr"
        ? `Memnuniyetle! Rezervasyon işlemine başlayalım. Adınız nedir?`
        : `I would be delighted to assist! Let's book your table. What is your full name?`;
      setBookingStep(1);
    } else {
      zaraResponse = language === "ar"
        ? `شكراً لرسالتك الجميلة. أنا هنا لمساعدتك في حجز طاولة، أو تفاصيل الموقع، أو مشاركة تفاصيل أطباقنا الشهية. يمكنك أيضاً كتابة "حجز طاولة" للبدء بالخطوات.`
        : language === "tr"
        ? `Mesajınız için teşekkür ederim. Size masa rezervasyonu, konum veya saray lezzetlerimiz hakkında bilgi verebilirim. Başlamak için "masa ayırt" yazabilirsiniz.`
        : `Thank you for your message. I am here to help you secure a table, guide you to our Dubai location, or recommend dishes. You can type "book table" to begin the guided flow.`;
    }

    addZaraResponse(zaraResponse);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      
      {/* Launcher Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-gold hover:bg-gold-hover text-bg-secondary flex items-center justify-center shadow-2xl relative group cursor-pointer border border-gold"
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        {open ? <X size={22} /> : <MessageSquare size={22} className="text-bg-secondary" />}
        {/* Glow pulsing ring around launcher */}
        <span className="absolute inset-0 w-full h-full rounded-full border border-gold animate-ping opacity-20 pointer-events-none" />
      </motion.button>

      {/* Conversational Box Frame */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3 }}
            className={`absolute bottom-20 ${
              isRtl ? "left-0" : "right-0"
            } w-[340px] sm:w-[380px] h-[500px] glass-premium rounded-[4px] border border-gold-border flex flex-col shadow-2xl overflow-hidden`}
          >
            
            {/* Header */}
            <div className="bg-[#121212] border-b border-gold-border/20 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center text-gold relative bg-bg-secondary animate-pulse">
                  <Bot size={16} />
                  {/* Active online green dot */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#121212]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white tracking-wide">
                    {t("aiName")}
                  </span>
                  <span className="text-[8px] text-gold uppercase tracking-widest font-mono">
                    ONLINE HOSTESS
                  </span>
                </div>
              </div>
              
              <Sparkles size={14} className="text-gold" />
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-3.5 bg-bg-primary/80">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-[3px] p-3 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gold text-bg-secondary font-medium rounded-tr-[0px]"
                        : "bg-[#161616] text-text-primary border border-gold-border/20 rounded-tl-[0px]"
                    } whitespace-pre-line`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[7px] text-text-muted mt-1 font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Typing loader state */}
              {typing && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border border-gold-border flex items-center justify-center text-gold bg-[#121212]">
                    <Bot size={12} />
                  </div>
                  <div className="bg-[#161616] border border-gold-border/10 rounded-[3px] py-2 px-3 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick FAQ Prompts Drawer */}
            <div className="px-4 py-2 border-t border-gold-border/15 bg-bg-secondary flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
              <button
                onClick={() => handleFAQ("hours")}
                className="px-3 py-1.5 bg-[#121212] hover:bg-gold-border border border-gold-border/20 rounded-[2px] text-[9px] text-text-secondary hover:text-gold transition-colors cursor-pointer"
              >
                {t("aiFAQHours")}
              </button>
              <button
                onClick={() => handleFAQ("location")}
                className="px-3 py-1.5 bg-[#121212] hover:bg-gold-border border border-gold-border/20 rounded-[2px] text-[9px] text-text-secondary hover:text-gold transition-colors cursor-pointer"
              >
                {t("aiFAQLocation")}
              </button>
              <button
                onClick={() => handleFAQ("recommend")}
                className="px-3 py-1.5 bg-[#121212] hover:bg-gold-border border border-gold-border/20 rounded-[2px] text-[9px] text-text-secondary hover:text-gold transition-colors cursor-pointer"
              >
                {t("aiFAQMenu")}
              </button>
              <button
                onClick={() => handleFAQ("reserve")}
                className="px-3 py-1.5 bg-[#121212] hover:bg-gold-border border border-gold-border/20 rounded-[2px] text-[9px] text-text-secondary hover:text-gold transition-colors cursor-pointer"
              >
                {t("aiFAQReserve")}
              </button>
            </div>

            {/* Text Input Block */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-gold-border/15 bg-[#121212] flex gap-2"
            >
              <input
                type="text"
                placeholder={t("aiPlaceholder")}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-grow bg-bg-primary border border-gold-border/20 focus:border-gold rounded-[2px] px-3.5 py-2.5 text-xs text-text-primary focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-10 bg-gold text-bg-secondary hover:bg-gold-hover rounded-[2px] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Send size={14} />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
