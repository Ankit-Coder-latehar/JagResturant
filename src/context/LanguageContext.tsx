"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ar" | "tr";

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

export const translations: Translations = {
  // Navbar & Globals
  navHome: { en: "Home", ar: "الرئيسية", tr: "Anasayfa" },
  navAbout: { en: "About", ar: "من نحن", tr: "Hakkımızda" },
  navMenu: { en: "Menu", ar: "القائمة", tr: "Menü" },
  navWhyUs: { en: "Experience", ar: "تميزنا", tr: "Neden Biz" },
  navReviews: { en: "Reviews", ar: "الآراء", tr: "Yorumlar" },
  navGallery: { en: "Gallery", ar: "المعرض", tr: "Galeri" },
  navContact: { en: "Contact", ar: "اتصل بنا", tr: "İletişim" },
  btnReserve: { en: "Book a Table", ar: "حجز طاولة", tr: "Masa Rezervasyonu" },
  cartTitle: { en: "Your Selection", ar: "اختياراتك", tr: "Seçiminiz" },

  // Hero Section
  heroTitle1: { en: "Authentic Turkish & Azerbaijani", ar: "المذاق التركي والأذربيجاني الأصيل", tr: "Geleneksel Türk & Azerbaycan" },
  heroTitle2: { en: "Dining Experience in Dubai", ar: "تجربة طعام فاخرة في دبي", tr: "Lezzet Serüveni Dubai'de" },
  heroSub: { 
    en: "Embark on a culinary journey celebrating rich heritage, master craftsmanship, and the finest ingredients under one Michelin-inspired roof.",
    ar: "انطلق في رحلة طهي تحتفي بالتراث الغني والحرفية العالية وأجود المكونات في مكان واحد مستوحى من معايير ميشلان.",
    tr: "Zengin kültürel mirasımızı, usta ellerin maharetini ve en seçkin malzemeleri Michelin esintili lüks bir atmosferde keşfedin."
  },
  heroExploreMenu: { en: "Explore Menu", ar: "اكتشف القائمة", tr: "Menüyü Keşfet" },
  heroQuickBook: { en: "Quick Booking", ar: "حجز سريع", tr: "Hızlı Rezervasyon" },
  heroSelectGuests: { en: "Guests", ar: "الأشخاص", tr: "Kişi Sayısı" },
  heroSelectDate: { en: "Select Date", ar: "اختر التاريخ", tr: "Tarih Seç" },
  heroReserveNow: { en: "Reserve Now", ar: "احجز الآن", tr: "Hemen Rezervasyon" },

  // About Section
  aboutTitle: { en: "Our Story", ar: "قصتنا", tr: "Hikayemiz" },
  aboutSubtitle: { en: "Heritage, Passion & Master Craftsmanship", ar: "التراث والشغف وحرفية الطهي", tr: "Miras, Tutku ve Ustalık" },
  aboutText1: {
    en: "Jashan Restaurant Dubai represents a harmonious fusion of Turkish and Azerbaijani culinary arts. Rooted in century-old traditions, our master chefs create a symphony of flavors that honor the royal feasts of Istanbul and the rich hearths of Baku.",
    ar: "يمثل مطعم جاشان دبي اندماجاً متناغماً بين فنون الطهي التركية والأذربيجانية. يبتكر طهاتنا المتميزون سيمفونية من النكهات المستوحاة من التقاليد العريقة والولائم السلطانية في إسطنبول ومطابخ باكو الغنية.",
    tr: "Jashan Restaurant Dubai, Türk ve Azerbaycan mutfak sanatlarının kusursuz bir sentezini sunar. Yüzyıllık geleneklere sadık kalan usta şeflerimiz, İstanbul saray ziyafetleri ile Bakü ocaklarının zengin aromalarını modern bir gastronomi yorumuyla buluşturuyor."
  },
  aboutText2: {
    en: "Every ingredient is sourced directly from ethical organic farms in Anatolia and the Caucasus, ensuring that every bite delivers unmatched authenticity and visual poetry.",
    ar: "يتم استيراد كل مكون مباشرة من المزارع العضوية الأصيلة في الأناضول والقوقاز، لضمان تقديم المذاق الحقيقي واللوحة البصرية الفنية في كل قمة.",
    tr: "Kullandığımız her bir malzeme, Anadolu ve Kafkasya'daki yerel üreticilerden doğrudan tedarik edilerek sofranıza en taze ve en özgün haliyle ulaşır."
  },
  aboutChefPhilosophy: { en: "Chef's Philosophy", ar: "فلسفة الطاهي", tr: "Şefin Felsefesi" },
  aboutChefQuote: { 
    en: "\"Cooking is not merely creating food; it is weaving history, love, and architecture on a single plate.\"",
    ar: "\"الطهي ليس مجرد إعداد للطعام؛ بل هو نسج للتاريخ والحب والهندسة المعمارية في طبق واحد.\"",
    tr: "\"Yemek pişirmek sadece karın doyurmak değil; tarih, sevgi ve estetiği tek bir tabakta harmanlamaktır.\""
  },
  statYears: { en: "Years of Heritage", ar: "سنوات من التراث", tr: "Yıllık Deneyim" },
  statCustomers: { en: "Happy Guests", ar: "ضيوف سعداء", tr: "Mutlu Misafir" },
  statDishes: { en: "Signature Creations", ar: "أطباق مبتكرة مميزة", tr: "İmza Lezzet" },

  // Signature Dishes
  sigTitle: { en: "Signature Masterpieces", ar: "روائع جاشان المبتكرة", tr: "İmza Başyapıtlarımız" },
  sigSub: { en: "A curated preview of our award-winning culinary presentations.", ar: "عرض منسق لأطباقنا الحائزة على جوائز مرموقة.", tr: "Ödüllü şeflerimizin elinden çıkan görsel ve lezzetsel şölen." },
  filterAll: { en: "All Creations", ar: "كل الإبداعات", tr: "Tüm Lezzetler" },
  filterTurkish: { en: "Turkish Specials", ar: "المقبلات والأطباق التركية", tr: "Türk Spesiyalleri" },
  filterAzeri: { en: "Azerbaijani Specials", ar: "الروائع الأذربيجانية", tr: "Azerbaycan Spesiyalleri" },
  filterDessert: { en: "Desserts", ar: "الحلويات الشرقية", tr: "Tatlılar" },
  filterBeverage: { en: "Beverages", ar: "المشروبات الفاخرة", tr: "İçecekler" },
  addToCart: { en: "Add to Order", ar: "إضافة للطلب", tr: "Siparişe Ekle" },

  // Digital Menu
  menuTitle: { en: "Our Digital Gastronomy", ar: "قائمتنا الرقمية", tr: "Dijital Menümüz" },
  menuSub: { en: "Explore the comprehensive array of authentic fine dining options.", ar: "استكشف المجموعة الشاملة من خيارات الطعام الراقي والأصيل.", tr: "Geleneksel tatların lüks sunumlarla buluştuğu zengin menümüz." },
  searchPlaceholder: { en: "Search delicate dishes...", ar: "ابحث عن أطباقنا الشهية...", tr: "Nefis yemekleri ara..." },
  chefRecommend: { en: "Chef Recommendation", ar: "توصية الشيف", tr: "Şefin Önerisi" },
  spicy: { en: "Spicy", ar: "حار", tr: "Acılı" },
  vegan: { en: "Vegan", ar: "نباتي", tr: "Vejetaryen" },
  allergens: { en: "Allergens", ar: "مسببات الحساسية", tr: "Alerjenler" },
  close: { en: "Close", ar: "إغلاق", tr: "Kapat" },
  viewDetails: { en: "View Details", ar: "التفاصيل", tr: "Detayları Gör" },

  // Why Choose Us
  whyTitle: { en: "The Pillars of Jashan", ar: "ركائز التميز في جاشان", tr: "Jashan Deneyimini Eşsiz Kılanlar" },
  whySub: { en: "Crafting unforgettable memories through absolute devotion to the culinary arts.", ar: "صنع ذكريات لا تُنسى من خلال التفاني المطلق في فنون الخدمة والطهي.", tr: "Gastronomi sanatına adanmışlıkla unutulmaz anlar yaratıyoruz." },
  why1Title: { en: "Fresh Organic Ingredients", ar: "مكونات عضوية طازجة", tr: "Taze Organik Malzemeler" },
  why1Desc: { en: "Straight from Anatolian soil and Caspian shores, selected by our chefs.", ar: "مباشرة من تربة الأناضول وسواحل القوقاز، مختارة بعناية فائقة.", tr: "Doğrudan Anadolu topraklarından ve Hazar kıyılarından şeflerimizin seçimiyle." },
  why2Title: { en: "Authentic Imperial Recipes", ar: "وصفات سلطانية أصيلة", tr: "Geleneksel Saray Tarifleri" },
  why2Desc: { en: "Preserving historical cooking methods using authentic clay ovens and coal fire.", ar: "الحفاظ على طرق الطهي التاريخية باستخدام أفران الطين والفحم الطبيعي.", tr: "Köz ateşinde ve geleneksel toprak fırınlarda pişen asırlık lezzetler." },
  why3Title: { en: "Michelin-Inspired Service", ar: "خدمة بمعايير ميشلان", tr: "Michelin Standartlarında Hizmet" },
  why3Desc: { en: "Exquisite attention to detail, personalized menus, and warm eastern hospitality.", ar: "اهتمام رائع بالتفاصيل، قوائم مخصصة، وضيافة شرقية دافئة.", tr: "Detaylara gösterilen büyük özen, kişiye özel menüler ve sıcak doğu misafirperverliği." },
  why4Title: { en: "Luxury Ambience", ar: "أجواء فاخرة ودافئة", tr: "Lüks & Nezih Atmosfer" },
  why4Desc: { en: "A beautifully curated venue in Dubai featuring live traditional oriental music.", ar: "مكان منسق بجمال فائق في دبي يتميز بموسيقى شرقية حية راقية.", tr: "Canlı şark ezgileri eşliğinde Dubai'nin kalbinde büyüleyici bir tasarım." },

  // Reviews
  reviewsTitle: { en: "Whispers of Praise", ar: "آراء ضيوفنا الكرام", tr: "Misafirlerimizin Kaleminden" },
  reviewsSub: { en: "What local food critics and cherished customers write about their experiences.", ar: "ما يكتبه نقاد الطعام المحليون وضيوفنا الأعزاء عن تجربتهم.", tr: "Yerel gurmelerin ve değerli konuklarımızın unutulmaz deneyimleri." },

  // Gallery
  galleryTitle: { en: "Visual Poetry", ar: "الشعر البصري للطهي", tr: "Görsel Sanat Galerimiz" },
  gallerySub: { en: "A window into our kitchen, architectural design, and premium table settings.", ar: "نافذة على مطبخنا، والتصميم المعماري الفاخر، وتنسيقات الطاولات الراقية.", tr: "Mutfak arkası sırlarımız, özel tasarım mimarimiz ve sunumlarımızdan kareler." },

  // Reservation Form
  reserveTitle: { en: "Secure Your Culinary Seating", ar: "احجز مقعدك الفاخر", tr: "Masada Yerinizi Ayırtın" },
  reserveSub: { en: "Reserve your table at Jashan Restaurant Dubai. Valet parking is complimentary.", ar: "احجز طاولتك في مطعم جاشان دبي. تتوفر خدمة صف السيارات مجاناً.", tr: "Jashan Restaurant Dubai'de rezervasyonunuzu yapın. Valet parking ücretsizdir." },
  resName: { en: "Full Name", ar: "الاسم الكامل", tr: "Ad Soyad" },
  resEmail: { en: "Email Address", ar: "البريد الإلكتروني", tr: "E-posta Adresi" },
  resPhone: { en: "Phone Number", ar: "رقم الهاتف", tr: "Telefon Numarası" },
  resDate: { en: "Select Date", ar: "اختر التاريخ", tr: "Tarih Seçin" },
  resTime: { en: "Time Slot", ar: "الوقت المفضل", tr: "Saat Dilimi" },
  resGuests: { en: "Number of Guests", ar: "عدد الحضور", tr: "Kişi Sayısı" },
  resNotes: { en: "Special Requests (Dietary requirements, anniversary, etc.)", ar: "طلبات خاصة (حساسية طعام، مناسبة خاصة، إلخ)", tr: "Özel İstekler (Alerji durumu, doğum günü, evlilik yıldönümü vb.)" },
  resSeating: { en: "Seating Preference", ar: "تفضيل الجلوس", tr: "Oturma Alanı Tercihi" },
  seatIndoor: { en: "Royal Indoor Hall", ar: "الصالة الداخلية الملكية", tr: "Kraliyet Kapalı Salonu" },
  seatTerrace: { en: "Skyline Terrace (Outdoor)", ar: "التراس المطل على الأفق (خارجي)", tr: "Skyline Terası (Açık Hava)" },
  seatPrivate: { en: "VIP Private Cabinet", ar: "كابينة VIP خاصة", tr: "VIP Özel Oda" },
  resSubmit: { en: "Confirm Luxury Reservation", ar: "تأكيد الحجز الفاخر", tr: "Lüks Rezervasyonu Onayla" },
  resSuccess: { en: "Reservation Confirmed Successfully!", ar: "تم تأكيد الحجز بنجاح!", tr: "Rezervasyonunuz Başarıyla Onaylandı!" },
  resSuccessSub: { 
    en: "A confirmation SMS and email have been sent. We look forward to welcoming you.",
    ar: "تم إرسال رسالة تأكيد نصية وبريد إلكتروني. نحن بشوق كبير لاستقبالكم وتدليل حواسكم.",
    tr: "Onay SMS'i ve e-postası gönderilmiştir. Sizi ağırlamaktan mutluluk duyacağız."
  },

  // Contact Section
  contactTitle: { en: "Locate & Connect", ar: "موقعنا وتواصلنا", tr: "Konum & İletişim" },
  contactSub: { en: "Located in the heart of Dubai, welcoming you daily.", ar: "نقع في قلب دبي النابض، نرحب بكم يومياً.", tr: "Dubai'nin merkezindeki lokasyonumuzla her gün hizmetinizdeyiz." },
  hoursTitle: { en: "Business Hours", ar: "ساعات العمل", tr: "Çalışma Saatleri" },
  hoursWeekdays: { en: "Weekdays: 12:00 PM - 12:00 AM", ar: "أيام الأسبوع: 12:00 ظهراً - 12:00 منتصف الليل", tr: "Hafta içi: 12:00 - 00:00" },
  hoursWeekends: { en: "Weekends: 12:00 PM - 02:00 AM", ar: "عطلة نهاية الأسبوع: 12:00 ظهراً - 02:00 بعد منتصف الليل", tr: "Hafta sonu: 12:00 - 02:00" },
  contactInfo: { en: "Contact Info", ar: "معلومات الاتصال", tr: "İletişim Bilgileri" },
  address: { en: "Jumeirah Beach Road, Dubai, UAE", ar: "طريق شاطئ جميرا، دبي، الإمارات العربية المتحدة", tr: "Jumeirah Sahil Yolu, Dubai, BAE" },
  whatsappText: { en: "Chat on WhatsApp", ar: "تواصل عبر الواتساب", tr: "WhatsApp'ta Sohbet Et" },

  // AI Assistant (Zara)
  aiName: { en: "Zara - Royal Hostess", ar: "زارا - المضيفة الملكية", tr: "Zara - Saray Mihmandarı" },
  aiIntro: { 
    en: "Hello, I am Zara, your culinary assistant. I can recommend dishes, share our culture, or help book your premium seating. How may I serve you today?", 
    ar: "مرحباً، أنا زارا، مضيفتك الرقمية. يمكنني التوصية بالأطباق الشهية، أو شرح ثقافتنا العريقة، أو حجز طاولة فاخرة لك. كيف يمكنني خدمتك اليوم؟", 
    tr: "Merhaba, ben saray mihmandarınız Zara. Menüden tavsiyelerde bulunabilir, kültürümüzü paylaşabilir veya lüks masa rezervasyonunuzu yapabilirim. Size nasıl yardımcı olabilirim?" 
  },
  aiPlaceholder: { en: "Ask Zara anything...", ar: "اسأل زارا عن أي شيء...", tr: "Zara'ya istediğini sor..." },
  aiTyping: { en: "Zara is thinking...", ar: "زارا تفكر...", tr: "Zara düşünüyor..." },
  aiFAQHours: { en: "What are your business hours?", ar: "ما هي ساعات العمل؟", tr: "Çalışma saatleriniz nedir?" },
  aiFAQLocation: { en: "Where are you located in Dubai?", ar: "أين يقع المطعم في دبي؟", tr: "Dubai'de tam olarak neredesiniz?" },
  aiFAQMenu: { en: "Recommend some signature dishes.", ar: "اقترحي بعض الأطباق المميزة.", tr: "Bana imza lezzetler önerin." },
  aiFAQReserve: { en: "Guide me through booking a table.", ar: "ساعديني في حجز طاولة.", tr: "Masa rezervasyonu yapmama yardım et." },

  // Shopping Cart & Order Drawer
  cartOrderSummary: { en: "Order Summary", ar: "ملخص الطلب", tr: "Sipariş Özeti" },
  cartEmpty: { en: "Your cart is empty. Explore our menu to add exquisite dishes.", ar: "سلة المأكولات فارغة. استكشف قائمتنا لإضافة أطباق رائعة.", tr: "Sipariş listeniz boş. Menümüzden eşsiz lezzetler ekleyebilirsiniz." },
  cartDineIn: { en: "Dine-in Pre-Order", ar: "طلب مسبق لتناول الطعام", tr: "Restoranda Yemek Ön Siparişi" },
  cartDelivery: { en: "Luxury Home Delivery", ar: "توصيل منزلي فاخر", tr: "Lüks Eve Teslim" },
  cartSpecialInst: { en: "Special Culinary Instructions", ar: "تعليمات طهي خاصة", tr: "Şefe Özel Notlar" },
  cartSubtotal: { en: "Subtotal", ar: "المجموع الفرعي", tr: "Ara Toplam" },
  cartServiceFee: { en: "Luxury Experience Fee", ar: "رسوم الخدمة الفاخرة", tr: "Lüks Deneyim Hizmeti" },
  cartTotal: { en: "Total Amount", ar: "المبلغ الإجمالي", tr: "Toplam Tutar" },
  cartCheckoutWhatsApp: { en: "Send Order via WhatsApp", ar: "إرسال الطلب عبر الواتساب", tr: "Siparişi WhatsApp ile Gönder" },
  orderSuccess: { en: "Order Invoice Generated!", ar: "تم إنشاء فاتورة الطلب بنجاح!", tr: "Sipariş Faturası Oluşturuldu!" },
  orderSuccessSub: { 
    en: "We have compiled your selection. Click below to instantly send to our kitchen via WhatsApp.",
    ar: "لقد قمنا بتجهيز اختياراتك الفاخرة. اضغط أدناه لإرسال الطلب فوراً إلى مطبخنا عبر الواتساب.",
    tr: "Seçimlerinizi derledik. Siparişi WhatsApp üzerinden anında mutfağımıza iletmek için tıklayın."
  },
  
  // Footer
  footerSubTitle: { en: "Subscribe to Our Royal Gazette", ar: "اشترك في نشرتنا الملكية", tr: "Saray Bültenimize Abone Olun" },
  footerSubText: { en: "Receive invitations to exclusive wine tasting sessions and secret menu launches.", ar: "احصل على دعوات حصرية لتذوق النكهات الخاصة وإطلاق قوائم الطعام السرية.", tr: "Özel tadım etkinlikleri ve gizli lansmanlardan ilk siz haberdar olun." },
  footerSubscribeBtn: { en: "Subscribe", ar: "اشتراك", tr: "Abone Ol" },
  footerSubsSuccess: { en: "Thank you for subscribing to our Gazette!", ar: "شكراً لاهتمامكم بالاشتراك في نشرتنا!", tr: "Bültenimize kaydolduğunuz için teşekkür ederiz!" },
  allRightsReserved: { en: "All Rights Reserved. Created for connoisseurs.", ar: "جميع الحقوق محفوظة. صُمم لعشاق التميز والذواقة.", tr: "Tüm Hakları Saklıdır. Gurmeler için tasarlanmıştır." },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("jashan_lang", lang);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("jashan_lang") as Language;
      if (stored && (stored === "en" || stored === "ar" || stored === "tr")) {
        setLanguageState(stored);
      }
    }
  }, []);

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  const isRtl = language === "ar";

  useEffect(() => {
    if (typeof document !== "undefined") {
      const htmlEl = document.documentElement;
      htmlEl.setAttribute("dir", isRtl ? "rtl" : "ltr");
      htmlEl.setAttribute("lang", language);
    }
  }, [language, isRtl]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
