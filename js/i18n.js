/**
 * Tamil Nadu Urdu Academy — i18n Engine
 */

const i18n = {
  activeLang: localStorage.getItem('tnua_lang') || 'en',
  
  // UI Strings Dictionary
  translations: {
    en: {
      "nav_home": "Home",
      "nav_about": "About",
      "nav_schemes": "Schemes",
      "nav_events": "Events",
      "nav_announcements": "Announcements",
      "nav_gallery": "Gallery",
      "nav_contact": "Contact",
      "nav_login": "Login",
      "nav_dashboard": "Dashboard",
      "latest_updates": "Latest Updates",
      "apply_now": "Apply Now",
      "view_all": "View All",
      "learn_more": "Learn More",
      "explore_schemes": "Explore Schemes",
      "government_tn": "Government of Tamil Nadu",
      "academy_title": "Tamil Nadu Urdu Academy",
      "academy_subtitle": "தமிழ்நாடு உருது அகாதெமி",
      "footer_tagline": "Promoting Urdu language, literature, and culture across Tamil Nadu since 1992. A Government of Tamil Nadu initiative.",
      "footer_contact": "Contact",
      "footer_services": "Services",
      "footer_quick_links": "Quick Links",
      "address": "No. 45, Anna Salai, Chennai – 600002",
      "copyright": "© 2026 Tamil Nadu Urdu Academy. All rights reserved.",
      "gov_initiative": "A Government of Tamil Nadu Initiative"
    },
    ta: {
      "nav_home": "முகப்பு",
      "nav_about": "எங்களை பற்றி",
      "nav_schemes": "திட்டங்கள்",
      "nav_events": "நிகழ்வுகள்",
      "nav_announcements": "அறிவிப்புகள்",
      "nav_gallery": "கேலரி",
      "nav_contact": "தொடர்பு",
      "nav_login": "உள்நுழை",
      "nav_dashboard": "டாஷ்போர்டு",
      "latest_updates": "சமீபத்திய செய்திகள்",
      "apply_now": "விண்ணப்பிக்க",
      "view_all": "அனைத்தையும் காண்க",
      "learn_more": "மேலும் அறிய",
      "explore_schemes": "திட்டங்களை ஆராயுங்கள்",
      "government_tn": "தமிழ்நாடு அரசு",
      "academy_title": "தமிழ்நாடு உருது அகாதெமி",
      "academy_subtitle": "Tamil Nadu Urdu Academy",
      "footer_tagline": "1992 முதல் தமிழ்நாடு முழுவதும் உருது மொழி, இலக்கியம் மற்றும் கலாச்சாரத்தை மேம்படுத்துகிறது. தமிழ்நாடு அரசின் ஒரு முயற்சி.",
      "footer_contact": "தொடர்பு",
      "footer_services": "சேவைகள்",
      "footer_quick_links": "விரைவான இணைப்புகள்",
      "address": "எண் 45, அண்ணா சாலை, சென்னை - 600002",
      "copyright": "© 2026 தமிழ்நாடு உருது அகாதெமி. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      "gov_initiative": "தமிழ்நாடு அரசின் ஒரு முயற்சி"
    },
    ur: {
      "nav_home": "ہوم",
      "nav_about": "ہمارے بارے میں",
      "nav_schemes": "اسکیمیں",
      "nav_events": "تقاریب",
      "nav_announcements": "اعلانات",
      "nav_gallery": "گیلری",
      "nav_contact": "رابطہ",
      "nav_login": "لاگ ان",
      "nav_dashboard": "ڈیش بورڈ",
      "latest_updates": "تازہ ترین اپڈیٹس",
      "apply_now": "ابھی اپلائی کریں",
      "view_all": "سب دیکھیں",
      "learn_more": "مزید جانیں",
      "explore_schemes": "اسکیموں کو تلاش کریں",
      "government_tn": "حکومت تامل ناڈو",
      "academy_title": "تامل ناڈو اردو اکیڈمی",
      "academy_subtitle": "தமிழ்நாடு உருது அகாதெமி",
      "footer_tagline": "1992 سے تامل ناڈو بھر میں اردو زبان، ادب اور ثقافت کو فروغ دینا۔ حکومت تامل ناڈو کا ایک اقدام۔",
      "footer_contact": "رابطہ",
      "footer_services": "خدمات",
      "footer_quick_links": "فوری لنکس",
      "address": "نمبر 45، انا سلائی، چنئی - 600002",
      "copyright": "© 2026 تامل ناڈو اردو اکیڈمی۔ جملہ حقوق محفوظ ہیں۔",
      "gov_initiative": "حکومت تامل ناڈو کا ایک اقدام"
    }
  },

  // Get translated UI string
  t(key, fallbackStr) {
    if (!this.translations[this.activeLang]) {
      console.warn(`[i18n] Language ${this.activeLang} not found`);
      return this.translations['en'][key] || fallbackStr || key;
    }
    
    let str = this.translations[this.activeLang][key];
    if (!str) {
      console.warn(`[i18n] Missing translation for key: ${key} in lang: ${this.activeLang}`);
      str = this.translations['en'][key]; // Fallback to EN
    }
    return str || fallbackStr || key;
  },

  // Get translated object property (for DATA)
  td(dataObj, fallbackStr) {
    if (!dataObj) return fallbackStr || '';
    if (typeof dataObj === 'string') return dataObj;
    if (Array.isArray(dataObj)) return dataObj; // Return array as is if it's not a translation object
    
    let str = dataObj[this.activeLang];
    if (!str) {
      console.warn(`[i18n] Missing translation in object for lang: ${this.activeLang}`, dataObj);
      str = dataObj['en']; // Fallback to EN
    }
    return str || fallbackStr || '';
  },

  setLang(lang) {
    this.activeLang = lang;
    localStorage.setItem('tnua_lang', lang);
    this.updateLayout();
    
    // Re-render the entire app to apply changes
    if (typeof renderPage === 'function') {
      renderPage();
    }
    
    // Update active state in nav switchers
    this.updateSwitcherUI();
  },

  updateLayout() {
    const isRTL = this.activeLang === 'ur';
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', this.activeLang);
    
    if (isRTL) {
      document.body.classList.add('rtl-mode');
    } else {
      document.body.classList.remove('rtl-mode');
    }
    
    // Change font based on language
    document.documentElement.style.setProperty('--ff-active', isRTL ? 'var(--ff-urdu)' : (this.activeLang === 'ta' ? 'var(--ff-tamil)' : 'var(--ff-primary)'));
  },

  updateSwitcherUI() {
    const switchers = document.querySelectorAll('.lang-switcher__btn');
    switchers.forEach(btn => {
      if (btn.dataset.lang === this.activeLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  },

  init() {
    this.updateLayout();
    // Re-bind click events to switcher
    document.addEventListener('click', (e) => {
      if (e.target.closest('.lang-switcher__btn')) {
        const lang = e.target.closest('.lang-switcher__btn').dataset.lang;
        this.setLang(lang);
      }
    });
  }
};

// Initialize on load
i18n.init();
