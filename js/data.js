/* ============================================================
   Tamil Nadu Urdu State Academy — DATA LAYER
   ============================================================ */

const DATA = {
  /* ── SCHEMES ── */
  schemes: [
    {
      id: 1,
      title: {
        en: "Urdu Student Scholarship",
        ta: "உருது மாணவர் உதவித்தொகை",
        ur: "اردو طالب علم اسکالرشپ"
      },
      description: {
        en: "Financial assistance for meritorious Urdu-medium students pursuing higher education in recognized institutions across Tamil Nadu.",
        ta: "தமிழ்நாடு முழுவதும் அங்கீகரிக்கப்பட்ட நிறுவனங்களில் உயர் கல்வி பயிலும் தகுதியான உருது வழி மாணவர்களுக்கான நிதி உதவி.",
        ur: "تامل ناڈو بھر کے تسلیم شدہ اداروں میں اعلیٰ تعلیم حاصل کرنے والے ہونہار اردو میڈیم طلباء کے لیے مالی امداد۔"
      },
      category: "student",
      eligibility: {
        en: ["Students enrolled in Urdu-medium schools/colleges", "Annual family income below ₹3,00,000", "Minimum 60% marks in previous examination", "Resident of Tamil Nadu"],
        ta: ["உருது வழிப் பள்ளிகள்/கல்லூரிகளில் பயிலும் மாணவர்கள்", "ஆண்டு குடும்ப வருமானம் ₹3,00,000-க்கும் குறைவாக இருக்க வேண்டும்", "முந்தைய தேர்வில் குறைந்தபட்சம் 60% மதிப்பெண்கள்", "தமிழ்நாட்டில் வசிப்பவர்"],
        ur: ["اردو میڈیم اسکولوں/کالجوں میں زیر تعلیم طلباء", "سالانہ گھریلو آمدنی 3,00,000 روپے سے کم", "گزشتہ امتحان میں کم از کم 60 فیصد نمبر", "تامل ناڈو کا رہائشی"]
      },
      benefits: {
        en: ["Annual scholarship of ₹15,000 for undergraduate students", "₹25,000 for postgraduate students", "Book allowance of ₹3,000", "Free access to digital learning resources"],
        ta: ["இளங்கலை மாணவர்களுக்கு ஆண்டுக்கு ₹15,000 உதவித்தொகை", "முதுகலை மாணவர்களுக்கு ₹25,000", "புத்தகக் கொடுப்பனவு ₹3,000", "டிஜிட்டல் கற்றல் வளங்களுக்கான இலவச அணுகல்"],
        ur: ["انڈرگریجویٹ طلباء کے لیے سالانہ 15,000 روپے اسکالرشپ", "پوسٹ گریجویٹ طلباء کے لیے 25,000 روپے", "کتابوں کا الاؤنس 3,000 روپے", "ڈیجیٹل سیکھنے کے وسائل تک مفت رسائی"]
      },
      documents: {
        en: ["Aadhaar Card", "Income Certificate", "Previous marksheet", "Community Certificate", "Bank Passbook copy", "Passport-size photograph"],
        ta: ["ஆதார் அட்டை", "வருமானச் சான்றிதழ்", "முந்தைய மதிப்பெண் பட்டியல்", "சமூகச் சான்றிதழ்", "வங்கி கணக்கு புத்தக நகல்", "பாஸ்போர்ட் அளவு புகைப்படம்"],
        ur: ["آدھار کارڈ", "آمدنی کا سرٹیفکیٹ", "پچھلی مارک شیٹ", "کمیونٹی سرٹیفکیٹ", "بینک پاس بک کی کاپی", "پاسپورٹ سائز تصویر"]
      },
      process: {
        en: ["Register on the portal", "Fill the application form", "Upload required documents", "Submit for verification", "Track application status"],
        ta: ["போர்ட்டலில் பதிவு செய்யவும்", "விண்ணப்ப படிவத்தை நிரப்பவும்", "தேவையான ஆவணங்களை பதிவேற்றவும்", "சரிபார்ப்பிற்கு சமர்ப்பிக்கவும்", "விண்ணப்ப நிலையை கண்காணிக்கவும்"],
        ur: ["پورٹل پر رجسٹریشن کریں", "درخواست فارم بھریں", "مطلوبہ دستاویزات اپ لوڈ کریں", "تصدیق کے لیے جمع کرائیں", "درخواست کی صورتحال کو ٹریک کریں"]
      },
      deadline: "2026-06-30",
      icon: "ri-graduation-cap-line",
      tags: ["Education", "Scholarship"],
      featured: true
    },
    {
      id: 2,
      title: {
        en: "Urdu Calligraphy Artist Grant",
        ta: "உருது கையெழுத்து கலைஞர் மானியம்",
        ur: "اردو خطاطی آرٹسٹ گرانٹ"
      },
      description: {
        en: "Support for traditional Urdu calligraphy artists to preserve and promote the art form, including exhibition support and material grants.",
        ta: "கண்காட்சி ஆதரவு மற்றும் பொருள் மானியங்கள் உட்பட கலை வடிவத்தைப் பாதுகாக்கவும் மேம்படுத்தவும் பாரம்பரிய உருது கையெழுத்துக் கலைஞர்களுக்கான ஆதரவு.",
        ur: "خطاطی کے روایتی فن کو محفوظ کرنے اور فروغ دینے کے لیے اردو خطاطوں کے لیے تعاون، بشمول نمائش کی معاونت اور مادی گرانٹس۔"
      },
      category: "artist",
      eligibility: {
        en: ["Practicing Urdu calligraphy artist for 3+ years", "Portfolio of at least 10 original works", "Resident of Tamil Nadu", "Age 18 and above"],
        ta: ["3+ ஆண்டுகளாக உருது கையெழுத்துக் கலைஞராகப் பணியாற்றுபவர்", "குறைந்தது 10 அசல் படைப்புகளின் போர்ட்ஃபோலியோ", "தமிழ்நாட்டில் வசிப்பவர்", "18 வயது மற்றும் அதற்கு மேல்"],
        ur: ["3+ سال سے اردو خطاطی کا فنکار", "کم از کم 10 اصل کاموں کا پورٹ فولیو", "تامل ناڈو کا رہائشی", "عمر 18 سال اور اس سے زیادہ"]
      },
      benefits: {
        en: ["One-time grant of ₹50,000", "Exhibition space support", "Raw material kit worth ₹10,000", "Inclusion in Academy's artist registry"],
        ta: ["ஒரு முறை மானியம் ₹50,000", "கண்காட்சி இட ஆதரவு", "₹10,000 மதிப்புள்ள மூலப்பொருள் கிட்", "அகாதெமியின் கலைஞர் பதிவேட்டில் சேர்த்தல்"],
        ur: ["ایک بار 50,000 روپے کی گرانٹ", "نمائشی جگہ کی معاونت", "10,000 روپے مالیت کی خام مال کی کٹ", "اکیڈمی کے آرٹسٹ رجسٹری میں شمولیت"]
      },
      documents: {
        en: ["Aadhaar Card", "Artist portfolio (photos)", "Recommendation from cultural body", "Bank account details", "Address proof"],
        ta: ["ஆதார் அட்டை", "கலைஞர் போர்ட்ஃபோலியோ (புகைப்படங்கள்)", "கலாச்சார அமைப்பின் பரிந்துரை", "வங்கி கணக்கு விவரங்கள்", "முகவரி சான்று"],
        ur: ["آدھار کارڈ", "آرٹسٹ پورٹ فولیو (تصاویر)", "ثقافتی ادارے کی سفارش", "بینک اکاؤنٹ کی تفصیلات", "پتے کا ثبوت"]
      },
      process: {
        en: ["Submit application with portfolio", "Panel review of artworks", "Interview/demonstration", "Grant approval", "Disbursement within 30 days"],
        ta: ["போர்ட்ஃபோலியோவுடன் விண்ணப்பத்தை சமர்ப்பிக்கவும்", "கலைப்படைப்புகளின் குழு ஆய்வு", "நேர்காணல்/செயல்முறை விளக்கம்", "மானிய அங்கீகாரம்", "30 நாட்களுக்குள் பணம் செலுத்துதல்"],
        ur: ["پورٹ فولیو کے ساتھ درخواست جمع کرائیں", "فن پاروں کا پینل ریویو", "انٹرویو / مظاہرہ", "گرانٹ کی منظوری", "30 دنوں کے اندر ادائیگی"]
      },
      deadline: "2026-08-15",
      icon: "ri-quill-pen-line",
      tags: ["Art", "Cultural"],
      featured: true
    },
    {
      id: 3,
    title: {
      en: "Urdu Teacher Training Scholarship",
      ta: "உருது ஆசிரியர் பயிற்சி உதவித்தொகை",
      ur: "اردو اساتذہ تربیتی اسکالرشپ"
    },
    description: {
      en: "Financial support for aspiring and existing Urdu teachers to undergo certified training programs and improve teaching standards.",
      ta: "உருது ஆசிரியர்களாக விரும்புவோர் மற்றும் பணியில் உள்ள ஆசிரியர்கள் சான்றளிக்கப்பட்ட பயிற்சிகளில் பங்கேற்று கற்பித்தல் திறனை மேம்படுத்த நிதி உதவி.",
      ur: "اردو اساتذہ کے لیے تربیتی پروگرامز میں شرکت اور تدریسی معیار کو بہتر بنانے کے لیے مالی معاونت۔"
    },
    category: "education",
    eligibility: {
      en: ["Graduate in any discipline", "Interest in Urdu teaching", "Resident of Tamil Nadu", "Age between 21–45"],
      ta: ["ஏதேனும் துறையில் பட்டம்", "உருது கற்பிப்பதில் ஆர்வம்", "தமிழ்நாட்டில் வசிப்பவர்", "வயது 21–45"],
      ur: ["کسی بھی شعبے میں گریجویٹ", "اردو تدریس میں دلچسپی", "تامل ناڈو کا رہائشی", "عمر 21–45 سال"]
    },
    benefits: {
      en: ["Training fee coverage up to ₹20,000", "Certification support", "Placement assistance", "Study materials provided"],
      ta: ["₹20,000 வரை பயிற்சி கட்டணம்", "சான்றிதழ் ஆதரவு", "வேலை வாய்ப்பு உதவி", "பயிற்சி பொருட்கள் வழங்கப்படும்"],
      ur: ["20,000 روپے تک تربیتی فیس", "سرٹیفیکیشن سپورٹ", "ملازمت میں مدد", "مطالعہ کا مواد فراہم کیا جائے گا"]
    },
    documents: {
      en: ["Aadhaar Card", "Degree Certificate", "Resume", "Address Proof"],
      ta: ["ஆதார் அட்டை", "பட்டச் சான்றிதழ்", "சுயவிவரக் குறிப்பு", "முகவரி சான்று"],
      ur: ["آدھار کارڈ", "ڈگری سرٹیفکیٹ", "ریزیومے", "پتے کا ثبوت"]
    },
    process: {
      en: ["Register online", "Submit documents", "Attend screening", "Enroll in training", "Complete certification"],
      ta: ["ஆன்லைனில் பதிவு செய்யவும்", "ஆவணங்களை சமர்ப்பிக்கவும்", "சரிபார்ப்பில் பங்கேற்கவும்", "பயிற்சியில் சேரவும்", "சான்றிதழைப் பெறவும்"],
      ur: ["آن لائن رجسٹریشن کریں", "دستاویزات جمع کرائیں", "اسکریننگ میں شرکت کریں", "تربیت میں داخلہ لیں", "سرٹیفیکیشن مکمل کریں"]
    },
    deadline: "2026-07-20",
    icon: "ri-user-star-line",
    tags: ["Training", "Education"],
    featured: false
  },
  {
    id: 4,
    title: {
      en: "Urdu Literary Publication Grant",
      ta: "உருது இலக்கிய வெளியீட்டு மானியம்",
      ur: "اردو ادبی اشاعت گرانٹ"
    },
    description: {
      en: "Financial assistance for authors to publish Urdu books, poetry collections, and research works.",
      ta: "உருது புத்தகங்கள், கவிதைத் தொகுப்புகள் மற்றும் ஆராய்ச்சி நூல்கள் வெளியிட எழுத்தாளர்களுக்கு நிதி உதவி.",
      ur: "اردو کتابوں، شاعری کے مجموعوں اور تحقیقی کاموں کی اشاعت کے لیے مالی امداد۔"
    },
    category: "artist",
    eligibility: {
      en: ["Author with original manuscript", "Minimum 50 pages content", "Resident of Tamil Nadu"],
      ta: ["அசல் கருநூல் கொண்ட எழுத்தாளர்", "குறைந்தது 50 பக்கங்கள்", "தமிழ்நாட்டில் வசிப்பவர்"],
      ur: ["اصل مسودہ رکھنے والا مصنف", "کم از کم 50 صفحات", "تامل ناڈو کا رہائشی"]
    },
    benefits: {
      en: ["Grant up to ₹75,000", "Printing support", "Distribution assistance", "Promotion via academy"],
      ta: ["₹75,000 வரை மானியம்", "அச்சிடுதல் ஆதரவு", "விநியோக உதவி", "அகாதெமி மூலம் பிரச்சாரம்"],
      ur: ["75,000 روپے تک گرانٹ", "طباعت میں مدد", "تقسیم میں معاونت", "اکیڈمی کے ذریعے تشہیر"]
    },
    documents: {
      en: ["Manuscript copy", "Author ID proof", "Bank details", "Declaration form"],
      ta: ["கருநூல் நகல்", "எழுத்தாளர் அடையாளச் சான்று", "வங்கி விவரங்கள்", "உறுதிமொழி படிவம்"],
      ur: ["مسودہ کی کاپی", "مصنف کا شناختی ثبوت", "بینک کی تفصیلات", "اعلامیہ فارم"]
    },
    process: {
      en: ["Submit manuscript", "Review committee approval", "Grant sanction", "Publishing process"],
      ta: ["கருநூலை சமர்ப்பிக்கவும்", "ஆய்வுக் குழு ஒப்புதல்", "மானியம் அனுமதி", "வெளியீட்டு செயல்முறை"],
      ur: ["مسودہ جمع کرائیں", "ریویو کمیٹی کی منظوری", "گرانٹ کی منظوری", "اشاعت کا عمل"]
    },
    deadline: "2026-09-10",
    icon: "ri-book-open-line",
    tags: ["Literature", "Publishing"],
    featured: true
  },
  {
    id: 5,
    title: {
      en: "Urdu Cultural Event Support Scheme",
      ta: "உருது கலாச்சார நிகழ்ச்சி ஆதரவு திட்டம்",
      ur: "اردو ثقافتی پروگرام معاونتی اسکیم"
    },
    description: {
      en: "Support for organizing Urdu cultural events such as mushaira, seminars, and workshops across Tamil Nadu.",
      ta: "தமிழ்நாடு முழுவதும் முஷைரா, கருத்தரங்குகள் மற்றும் பணிமனை போன்ற உருது கலாச்சார நிகழ்ச்சிகளை நடத்த ஆதரவு.",
      ur: "تامل ناڈو بھر میں اردو ثقافتی پروگرامز جیسے مشاعرہ، سیمینار اور ورکشاپ کے انعقاد کے لیے معاونت۔"
    },
    category: "cultural",
    eligibility: {
      en: ["Registered cultural organization", "Event proposal submission", "Local collaboration required"],
      ta: ["பதிவு செய்யப்பட்ட கலாச்சார அமைப்பு", "நிகழ்ச்சி முன்மொழிவு", "உள்ளூர் ஒத்துழைப்பு அவசியம்"],
      ur: ["رجسٹرڈ ثقافتی تنظیم", "پروگرام کی تجویز", "مقامی تعاون ضروری"]
    },
    benefits: {
      en: ["Funding up to ₹1,00,000", "Venue support", "Publicity assistance", "Guest coordination"],
      ta: ["₹1,00,000 வரை நிதி", "நிகழ்வு இட ஆதரவு", "பிரச்சாரம் உதவி", "விருந்தினர் ஒருங்கிணைப்பு"],
      ur: ["1,00,000 روپے تک فنڈنگ", "مقام کی سہولت", "تشہیر میں مدد", "مہمانوں کی ہم آہنگی"]
    },
    documents: {
      en: ["Organization registration", "Event proposal", "Budget plan", "Bank details"],
      ta: ["அமைப்பு பதிவு சான்றிதழ்", "நிகழ்ச்சி முன்மொழிவு", "பட்ஜெட் திட்டம்", "வங்கி விவரங்கள்"],
      ur: ["تنظیم کی رجسٹریشن", "پروگرام کی تجویز", "بجٹ پلان", "بینک کی تفصیلات"]
    },
    process: {
      en: ["Submit proposal", "Committee review", "Approval", "Fund release", "Event execution report"],
      ta: ["முன்மொழிவை சமர்ப்பிக்கவும்", "குழு ஆய்வு", "ஒப்புதல்", "நிதி வெளியீடு", "நிகழ்ச்சி நிறைவேற்ற அறிக்கை"],
      ur: ["تجویز جمع کرائیں", "کمیٹی کا جائزہ", "منظوری", "فنڈ کا اجراء", "پروگرام کی رپورٹ"]
    },
    deadline: "2026-10-01",
    icon: "ri-calendar-event-line",
    tags: ["Event", "Cultural"],
    featured: false
  },
  {
    id: 6,
    title: {
      en: "Urdu Digital Learning Support",
      ta: "உருது டிஜிட்டல் கற்றல் ஆதரவு",
      ur: "اردو ڈیجیٹل لرننگ سپورٹ"
    },
    description: {
      en: "Providing digital learning tools and online resources for Urdu students to enhance remote education.",
      ta: "உருது மாணவர்களுக்கு ஆன்லைன் கல்வியை மேம்படுத்த டிஜிட்டல் கற்றல் கருவிகள் மற்றும் வளங்கள் வழங்குதல்.",
      ur: "اردو طلباء کے لیے آن لائن تعلیم کو بہتر بنانے کے لیے ڈیجیٹل وسائل اور ٹولز فراہم کرنا۔"
    },
    category: "student",
    eligibility: {
      en: ["School or college student", "Access to internet required", "Resident of Tamil Nadu"],
      ta: ["பள்ளி அல்லது கல்லூரி மாணவர்", "இணைய வசதி அவசியம்", "தமிழ்நாட்டில் வசிப்பவர்"],
      ur: ["اسکول یا کالج کا طالب علم", "انٹرنیٹ کی سہولت ضروری", "تامل ناڈو کا رہائشی"]
    },
    benefits: {
      en: ["Free access to e-learning platform", "Tablet subsidy", "Online mentorship sessions", "Study material downloads"],
      ta: ["இலவச e-learning அணுகல்", "டேப்லெட் மானியம்", "ஆன்லைன் வழிகாட்டுதல்", "படிப்புப் பொருட்கள் பதிவிறக்கம்"],
      ur: ["ای لرننگ پلیٹ فارم تک مفت رسائی", "ٹیبلیٹ سبسڈی", "آن لائن رہنمائی", "مطالعہ مواد ڈاؤن لوڈ"]
    },
    documents: {
      en: ["Student ID", "Aadhaar Card", "Income Certificate"],
      ta: ["மாணவர் அடையாள அட்டை", "ஆதார் அட்டை", "வருமானச் சான்றிதழ்"],
      ur: ["طالب علم کا شناختی کارڈ", "آدھار کارڈ", "آمدنی کا سرٹیفکیٹ"]
    },
    process: {
      en: ["Apply online", "Verification", "Access granted", "Start learning"],
      ta: ["ஆன்லைனில் விண்ணப்பிக்கவும்", "சரிபார்ப்பு", "அணுகல் வழங்கப்பட்டது", "கற்றலைத் தொடங்கவும்"],
      ur: ["آن لائن اپلائی کریں", "تصدیق", "رسائی دی گئی", "سیکھنا شروع کریں"]
    },
    deadline: "2026-11-15",
    icon: "ri-computer-line",
    tags: ["Digital", "Education"],
    featured: true
  }
  ],

  /* ── EVENTS ── */
  events: [
    {
      id: 1,
      title: {
        en: "Annual Mushaira — Urdu Poetry Evening",
        ta: "ஆண்டு முஷைரா — உருது கவிதை மாலை",
        ur: "سالانہ مشاعرہ — اردو شامِ غزل"
      },
      date: "2026-05-10",
      time: "6:00 PM – 10:00 PM",
      location: "Rajaji Hall, Chennai",
      description: {
        en: "An evening of mesmerizing Urdu poetry featuring renowned poets from across India. Experience the beauty of Urdu shayari in a grand cultural gathering.",
        ta: "இந்தியா முழுவதிலுமிருந்து புகழ்பெற்ற கவிஞர்கள் பங்கேற்கும் மயக்கும் உருது கவிதை மாலை. ஒரு பிரமாண்டமான கலாச்சார கூட்டத்தில் உருது ஷயாரியின் அழகை அனுபவியுங்கள்.",
        ur: "ہندوستان بھر کے نامور شعراء پر مشتمل ایک مسحور کن اردو شاعری کی شام۔ ایک عظیم ثقافتی اجتماع میں اردو شاعری کی خوبصورتی کا تجربہ کریں۔"
      },
      image: "images/events/event-mushaira.png",
      category: "Cultural"
    },
    {
      id: 2,
      title: {
        en: "Award Ceremony 2026",
        ta: "விருது வழங்கும் விழா 2026",
        ur: "تقسیم انعامات 2026"
      },
      date: "2026-06-20",
      time: "10:00 AM – 1:00 PM",
      location: "Academy Auditorium, Chennai",
      description: {
        en: "Honoring outstanding contributors to Urdu literature and education in Tamil Nadu.",
        ta: "தமிழ்நாட்டில் உருது இலக்கியம் மற்றும் கல்விக்கு சிறப்பான பங்களிப்பவர்களை கௌரவித்தல்.",
        ur: "تامل ناڈو میں اردو ادب اور تعلیم میں نمایاں خدمات انجام دینے والوں کو اعزاز دینا۔"
      },
      image: "images/events/event-ceremony.png",
      category: "Ceremony"
    },
    {
    id: 3,
    title: {
      en: "Urdu Calligraphy Workshop",
      ta: "உருது கைஎழுத்து பயிற்சி பட்டறை",
      ur: "اردو خطاطی ورکشاپ"
    },
    date: "2026-07-05",
    time: "11:00 AM – 3:00 PM",
    location: "Kalaivanar Arangam, Chennai",
    description: {
      en: "A hands-on workshop introducing participants to the art of Urdu calligraphy, guided by expert calligraphers.",
      ta: "உருது கைஎழுத்தின் கலை பற்றி நிபுணர்களால் வழிநடத்தப்படும் செயல்முறை பயிற்சி பட்டறை.",
      ur: "ماہر خطاطوں کی رہنمائی میں اردو خطاطی کے فن سے روشناس کرانے والی عملی ورکشاپ۔"
    },
    image: "images/events/event-mushaira.png",
    category: "Workshop"
  },
  {
    id: 4,
    title: {
      en: "Urdu Debate Competition for Students",
      ta: "மாணவர்களுக்கான உருது விவாத போட்டி",
      ur: "طلباء کے لیے اردو مباحثہ مقابلہ"
    },
    date: "2026-07-18",
    time: "9:30 AM – 2:00 PM",
    location: "Government College Hall, Vellore",
    description: {
      en: "An inter-college debate competition encouraging students to showcase their Urdu speaking and critical thinking skills.",
      ta: "மாணவர்கள் உருது பேச்சுத் திறன் மற்றும் விமர்சன சிந்தனையை வெளிப்படுத்தும் இடைக்கல்லூரி விவாத போட்டி.",
      ur: "طلباء کو اپنی اردو تقریری اور تنقیدی صلاحیتیں دکھانے کا موقع فراہم کرنے والا بین الکلیجی مباحثہ مقابلہ۔"
    },
    image: "images/events/event-ceremony.png",
    category: "Competition"
  },
  {
    id: 5,
    title: {
      en: "Urdu Book Exhibition & Sale",
      ta: "உருது புத்தகக் கண்காட்சி மற்றும் விற்பனை",
      ur: "اردو کتاب نمائش و فروخت"
    },
    date: "2026-08-02",
    time: "10:00 AM – 6:00 PM",
    location: "Chennai Trade Centre",
    description: {
      en: "Explore a wide collection of Urdu books, including literature, poetry, and academic works, with special discounts.",
      ta: "உருது இலக்கியம், கவிதைகள் மற்றும் கல்வி புத்தகங்களின் விரிவான தொகுப்பை சிறப்பு தள்ளுபடிகளுடன் கண்டறியுங்கள்.",
      ur: "اردو ادب، شاعری اور تعلیمی کتابوں کا وسیع مجموعہ خصوصی رعایت کے ساتھ دستیاب ہوگا۔"
    },
    image: "images/events/event-mushaira.png",
    category: "Exhibition"
  },
  {
    id: 6,
    title: {
      en: "Teacher Training Program for Urdu Educators",
      ta: "உருது ஆசிரியர்களுக்கான பயிற்சி திட்டம்",
      ur: "اردو اساتذہ کے لیے تربیتی پروگرام"
    },
    date: "2026-08-20",
    time: "10:00 AM – 4:00 PM",
    location: "Academy Training Center, Chennai",
    description: {
      en: "A professional development program aimed at enhancing teaching methodologies for Urdu educators.",
      ta: "உருது ஆசிரியர்களின் கற்பித்தல் முறைகளை மேம்படுத்தும் தொழில்முறை பயிற்சி திட்டம்.",
      ur: "اردو اساتذہ کی تدریسی مہارتوں کو بہتر بنانے کے لیے پیشہ ورانہ تربیتی پروگرام۔"
    },
    image: "images/events/event-ceremony.png",
    category: "Training"
  }
  ],

  /* ── ANNOUNCEMENTS ── */
  announcements: [
    {
      id: 1,
      title: {
        en: "Scholarship Applications Open for 2026–27",
        ta: "2026-27 ஆம் ஆண்டிற்கான உதவித்தொகை விண்ணப்பங்கள் தொடங்கப்பட்டுள்ளன",
        ur: "تعلیمی سال 27-2026 کے لیے اسکالرشپ کی درخواستیں شروع"
      },
      date: "2026-04-15",
      content: {
        en: "The Tamil Nadu State Urdu Academy is now accepting applications for the Urdu Student Scholarship program for the academic year 2026–27. Eligible students are encouraged to apply before the deadline.",
        ta: "தமிழ்நாடு உருது அகாதெமி இப்போது 2026-27 கல்வியாண்டிற்கான உருது மாணவர் உதவித்தொகை திட்டத்திற்கான விண்ணப்பங்களை ஏற்றுக்கொள்கிறது. தகுதியுள்ள மாணவர்கள் காலக்கெடுவிற்கு முன் விண்ணப்பிக்க ஊக்குவிக்கப்படுகிறார்கள்.",
        ur: "تامل ناڈو اردو اکیڈمی اب تعلیمی سال 27-2026 کے لیے اردو اسٹوڈنٹ اسکالرشپ پروگرام کے لیے درخواستیں قبول کر رہی ہے۔ اہل طلباء کی حوصلہ افزائی کی جاتی ہے کہ وہ آخری تاریخ سے پہلے اپلائی کریں۔"
      },
      category: "Scholarship"
    },
    {
    id: 2,
    title: {
      en: "Applications Open for Urdu Certificate Course",
      ta: "உருது சான்றிதழ் பாடநெறிக்கான விண்ணப்பங்கள் தொடங்கப்பட்டுள்ளன",
      ur: "اردو سرٹیفکیٹ کورس کے لیے درخواستیں شروع ہو گئی ہیں"
    },
    date: "2026-04-20",
    content: {
      en: "Applications are now open for the part-time Urdu Certificate Course. The course duration is one year and classes will be conducted in offline mode.",
      ta: "பகுதி நேர உருது சான்றிதழ் பாடநெறிக்கான விண்ணப்பங்கள் தற்போது திறக்கப்பட்டுள்ளன. இந்த பாடநெறியின் கால அளவு ஒரு வருடம் மற்றும் வகுப்புகள் நேரடியாக நடைபெறும்.",
      ur: "پارٹ ٹائم اردو سرٹیفکیٹ کورس کے لیے درخواستیں اب کھلی ہیں۔ کورس کی مدت ایک سال ہے اور کلاسز آف لائن منعقد کی جائیں گی۔"
    },
    category: "Course"
  },
  {
    id: 3,
    title: {
      en: "Upcoming Urdu Cultural Festival in Chennai",
      ta: "சென்னையில் நடைபெறவுள்ள உருது கலாச்சார விழா",
      ur: "چنئی میں ہونے والا اردو ثقافتی میلہ"
    },
    date: "2026-05-05",
    content: {
      en: "Tamil Nadu State Urdu Academy is organizing a cultural festival featuring poetry, music, and literary discussions. All are welcome to participate.",
      ta: "தமிழ்நாடு உருது அகாதெமி கவிதை, இசை மற்றும் இலக்கிய கலந்துரையாடல்களைக் கொண்ட ஒரு கலாச்சார விழாவை நடத்துகிறது. அனைவரும் பங்கேற்க வரவேற்கப்படுகிறார்கள்.",
      ur: "تامل ناڈو اردو اکیڈمی شاعری، موسیقی اور ادبی مباحثوں پر مشتمل ایک ثقافتی میلہ منعقد کر رہی ہے۔ سب کو شرکت کی دعوت دی جاتی ہے۔"
    },
    category: "Event"
  },
  {
    id: 4,
    title: {
      en: "Last Date Extended for Scholarship Applications",
      ta: "உதவித்தொகை விண்ணப்பங்களுக்கான கடைசி தேதி நீட்டிக்கப்பட்டுள்ளது",
      ur: "اسکالرشپ درخواستوں کی آخری تاریخ میں توسیع کر دی گئی ہے"
    },
    date: "2026-05-10",
    content: {
      en: "The last date for submitting scholarship applications has been extended to May 30, 2026. Students are advised to complete their applications at the earliest.",
      ta: "உதவித்தொகை விண்ணப்பங்களை சமர்ப்பிக்கும் கடைசி தேதி மே 30, 2026 வரை நீட்டிக்கப்பட்டுள்ளது. மாணவர்கள் விரைவாக விண்ணப்பிக்க அறிவுறுத்தப்படுகிறார்கள்.",
      ur: "اسکالرشپ درخواستیں جمع کرانے کی آخری تاریخ 30 مئی 2026 تک بڑھا دی گئی ہے۔ طلباء کو جلد از جلد درخواست مکمل کرنے کا مشورہ دیا جاتا ہے۔"
    },
    category: "Notice"
  },
  {
    id: 5,
    title: { en: "Silver Jubilee Function — 25 Years of Excellence", ta: "வெள்ளி விழா — 25 ஆண்டு சிறப்பு", ur: "سلور جوبلی تقریب — 25 سال کی شاندار خدمات" },
    date: "2026-06-15",
    content: {
      en: "Tamil Nadu State Urdu Academy celebrates its Silver Jubilee — 25 years of dedicated service to Urdu language, literature, and culture. A grand commemorative function will be held with distinguished guests from across the nation.",
      ta: "தமிழ்நாடு மாநில உருது அகாதமி தனது வெள்ளி விழாவைக் கொண்டாடுகிறது — உருது மொழி, இலக்கியம் மற்றும் கலாச்சாரத்திற்கான 25 ஆண்டு அர்ப்பணிப்பான சேவை.",
      ur: "تامل ناڈو اسٹیٹ اردو اکیڈمی اپنی سلور جوبلی منا رہی ہے — اردو زبان، ادب اور ثقافت کی 25 سال کی مسلسل خدمت۔"
    },
    category: "Special",
    pinned: true
  }
  ],

  /* ── GALLERY ── */
  gallery: [
    { id: 1, src: "images/hero/hero-banner.png", caption: { en: "Academy Cultural Event 2025", ta: "அகாதெமி கலாச்சார நிகழ்வு 2025", ur: "اکیڈمی ثقافتی تقریب 2025" }, category: "Events" },
    { id: 2, src: "images/gallery/gallery-calligraphy.png", caption: { en: "Urdu Calligraphy Masterclass", ta: "உருது கையெழுத்து மாஸ்டர்கிளாஸ்", ur: "اردو خطاطی ماسٹر کلاس" }, category: "Art" },
    { id: 3, src: "images/gallery/gallery-heritage.png", caption: { en: "Heritage Walk 2025", ta: "பாரம்பரிய நடைப்பயணம் 2025", ur: "ہیریٹیج واک 2025" }, category: "Culture" },
    { id: 4, src: "images/gallery/gallery-students.png", caption: { en: "Students Felicitation", ta: "மாணவர்கள் பாராட்டு", ur: "طلباء کی حوصلہ افزائی" }, category: "Education" }
  ],

  /* ── LEADERSHIP ── */
  leadership: [
    { 
      name: { en: "Dr. Md.Nayeemur Rahman", ta: "டாக்டர் முகமது நயீமுர் ரஹ்மான்", ur: "ڈاکٹر محمد نعیم الرحمنی" }, 
      role: { en: "Vice Chairperson", ta: "துணைத் தலைவர்", ur: "وائس چیئرپرسن" }, 
      initials: "MK", 
      icon: "ri-user-3-line", 
      image: "images/officials/official-2.png" 
    }
  ],

  /* ── TIMELINE ── */
  timeline: [
    {
      year: "2000",
      title: { en: "Academy Established", ta: "அகாதமி நிறுவப்பட்டது", ur: "اکیڈمی کا قیام" },
      desc: { en: "Established in 2000 by Honorable Chief Minister Dr. M. Karunanidhi to promote Urdu language, literature, and culture.", ta: "மாண்புமிகு முதலமைச்சர் டாக்டர் மு. கருணாநிதி அவர்களால் 2000 ஆம் ஆண்டு உருது மொழி, இலக்கியம் மற்றும் கலாச்சாரத்தை மேம்படுத்த நிறுவப்பட்டது.", ur: "2000 میں معزز وزیر اعلیٰ ڈاکٹر ایم کروناندھی کے ذریعے اردو زبان، ادب اور ثقافت کے فروغ کے لیے قائم کیا گیا۔" }
    },
    {
      year: "2005",
      title: { en: "Scholarship Program", ta: "உதவித்தொகை திட்டம்", ur: "اسکالرشپ پروگرام" },
      desc: { en: "Launched statewide financial assistance for Urdu-medium students.", ta: "உருது வழி மாணவர்களுக்கான மாநிலம் தழுவிய நிதி உதவி தொடங்கப்பட்டது.", ur: "اردو میڈیم طلباء کے لیے ریاست گیر مالی امداد کا آغاز۔" }
    },
    {
      year: "2018",
      title: { en: "Digital Initiatives", ta: "டிஜிட்டல் முயற்சிகள்", ur: "ڈیجیٹل اقدامات" },
      desc: { en: "Introduced online learning resources and digital application portals.", ta: "ஆன்லைன் கற்றல் வளங்கள் மற்றும் டிஜிட்டல் விண்ணப்ப போர்ட்டல்கள் அறிமுகப்படுத்தப்பட்டன.", ur: "آن لائن سیکھنے کے وسائل اور ڈیجیٹل ایپلیکیشن پورٹلز متعارف کرائے گئے۔" }
    },
    {
      year: "2024",
      title: { en: "Cultural Revival Project", ta: "கலாச்சார மறுமலர்ச்சி திட்டம்", ur: "ثقافتی احیاء کا منصوبہ" },
      desc: { en: "Expanded support for traditional arts, calligraphy, and poetry.", ta: "பாரம்பரிய கலைகள், கையெழுத்து மற்றும் கவிதைக்கான ஆதரவு விரிவுபடுத்தப்பட்டது.", ur: "روایتی فنون، خطاطی اور شاعری کے لیے تعاون میں توسیع۔" }
    },
    {
      year: "2025",
      title: { en: "Silver Jubilee Year", ta: "வெள்ளி விழா ஆண்டு", ur: "سلور جوبلی سال" },
      desc: { en: "Celebrating 25 years of service to Urdu language and culture in Tamil Nadu.", ta: "தமிழ்நாட்டில் உருது மொழி மற்றும் கலாச்சாரத்திற்கான 25 ஆண்டு சேவையைக் கொண்டாடுதல்.", ur: "تامل ناڈو میں اردو زبان اور ثقافت کی 25 سال کی خدمت کا جشن۔" }
    }
  ],

  /* ── TICKER ITEMS ── */
  tickerItems: [
    { 
      text: { en: "Scholarship Applications Open for 2026–27", ta: "2026-27 உதவித்தொகை விண்ணப்பங்கள்", ur: "اسکالرشپ کی درخواستیں شروع 27-2026" }, 
      link: "schemes", 
      icon: "ri-award-line" 
    },
    { 
      text: { en: "New Calligraphy Artist Grant — Apply Now", ta: "புதிய கையெழுத்து கலைஞர் மானியம் — இப்போது விண்ணப்பிக்கவும்", ur: "نیو خطاطی آرٹسٹ گرانٹ — ابھی اپلائی کریں" }, 
      link: "schemes", 
      icon: "ri-quill-pen-line" 
    },
    { 
      text: { en: "Silver Jubilee Function — 25 Years of Excellence", ta: "வெள்ளி விழா — 25 ஆண்டு சிறப்பு", ur: "سلور جوبلی — 25 سال کی شاندار خدمات" }, 
      link: "announcements", 
      icon: "ri-trophy-line" 
    }
  ],

  /* ── STATS ── */
  stats: {
    totalSchemes: 12,
    beneficiaries: "50,000+",
    eventsConducted: 124,
    districtsServed: 38
  },

  /* ── DASHBOARD / ADMIN DATA ── */
  userApplications: [
    { id: "APP-2026-001", scheme: "Urdu Student Scholarship", date: "2026-04-10", status: "pending" },
    { id: "APP-2025-084", scheme: "Urdu Calligraphy Artist Grant", date: "2025-11-20", status: "approved" }
  ],

  notifications: [
    { id: 1, title: "Application Approved", message: "Your application for the Artist Grant has been approved.", time: "2 days ago", icon: "ri-checkbox-circle-line", unread: true },
    { id: 2, title: "New Scheme Launched", message: "Check out the Digital Learning Support scheme.", time: "1 week ago", icon: "ri-information-line", unread: false }
  ],

  admin: {
    stats: {
      totalUsers: 4250,
      totalApplications: 1240,
      approvals: 890,
      pendingReview: 145
    },
    recentApplications: [
      { id: "APP-2026-142", user: "Ahmed Khan", scheme: "Student Scholarship", date: "2026-04-25", status: "pending" },
      { id: "APP-2026-141", user: "Priya Sundar", scheme: "Teacher Training", date: "2026-04-24", status: "approved" },
      { id: "APP-2026-140", user: "Mohammad Ali", scheme: "Publication Grant", date: "2026-04-24", status: "pending" }
    ],
    announcements: [
      { id: 1, title: "Scholarship 2026", date: "2026-04-15", status: "published" },
      { id: 2, title: "Workshop Update", date: "2026-04-10", status: "draft" }
    ]
  },

  /* ── COURSES ── */
  courses: [
    {
      id: 1,
      title: { en: "Learn Urdu — Beginner", ta: "உருது கற்க — தொடக்க நிலை", ur: "اردو سیکھیں — ابتدائی" },
      duration: { en: "3 Months", ta: "3 மாதங்கள்", ur: "3 ماہ" },
      description: { en: "A foundational course for beginners to learn Urdu script, basic grammar, and conversational skills.", ta: "உருது எழுத்து, அடிப்படை இலக்கணம் மற்றும் உரையாடல் திறன்களைக் கற்றுக்கொள்ள ஆரம்பநிலையினருக்கான அடிப்படை பாடநெறி.", ur: "اردو رسم الخط، بنیادی گرامر اور گفتگو کی مہارتیں سیکھنے کے لیے ابتدائی کورس۔" },
      icon: "ri-book-2-line"
    },
    {
      id: 2,
      title: { en: "Diploma in Urdu", ta: "உருது டிப்ளோமா", ur: "اردو میں ڈپلوما" },
      duration: { en: "1 Year", ta: "1 வருடம்", ur: "1 سال" },
      description: { en: "A comprehensive diploma program covering advanced Urdu literature, poetry, and academic writing.", ta: "மேம்பட்ட உருது இலக்கியம், கவிதை மற்றும் கல்வி எழுத்து பற்றிய விரிவான டிப்ளோமா திட்டம்.", ur: "اعلیٰ اردو ادب، شاعری اور علمی تحریر کا جامع ڈپلوما پروگرام۔" },
      icon: "ri-graduation-cap-line"
    },
    {
      id: 3,
      title: { en: "Urdu Calligraphy", ta: "உருது கையெழுத்துக் கலை", ur: "اردو خطاطی" },
      duration: { en: "3 Months", ta: "3 மாதங்கள்", ur: "3 ماہ" },
      description: { en: "Master the art of Urdu calligraphy with expert guidance on Nastaliq and other traditional scripts.", ta: "நஸ்தலிக் மற்றும் பிற பாரம்பரிய எழுத்து முறைகளில் நிபுணர் வழிகாட்டுதலுடன் உருது கையெழுத்துக் கலையில் தேர்ச்சி பெறுங்கள்.", ur: "نستعلیق اور دیگر روایتی رسم الخط میں ماہرین کی رہنمائی میں اردو خطاطی کے فن میں مہارت حاصل کریں۔" },
      icon: "ri-quill-pen-line"
    }
  ],

  /* ── OBJECTIVES ── */
  objectives: [
    { icon: "ri-global-line", title: { en: "Promote Urdu Language", ta: "உருது மொழியை மேம்படுத்துதல்", ur: "اردو زبان کا فروغ" }, desc: { en: "Promote and develop Urdu language, literature, and culture across Tamil Nadu.", ta: "தமிழ்நாடு முழுவதும் உருது மொழி, இலக்கியம் மற்றும் கலாச்சாரத்தை மேம்படுத்துதல்.", ur: "تامل ناڈو بھر میں اردو زبان، ادب اور ثقافت کو فروغ دینا۔" } },
    { icon: "ri-ancient-gate-line", title: { en: "Preserve Heritage", ta: "பாரம்பரியத்தைப் பாதுகாத்தல்", ur: "ورثے کا تحفظ" }, desc: { en: "Preserve Urdu heritage while adapting to modern education standards.", ta: "நவீன கல்வி தரத்திற்கு ஏற்ப உருது பாரம்பரியத்தைப் பாதுகாத்தல்.", ur: "جدید تعلیمی معیارات کے مطابق اردو ورثے کا تحفظ۔" } },
    { icon: "ri-government-line", title: { en: "Institutional Leadership", ta: "நிறுவன தலைமை", ur: "ادارہ جاتی قیادت" }, desc: { en: "Serve as the primary institutional body for Urdu development in Tamil Nadu.", ta: "தமிழ்நாட்டில் உருது மேம்பாட்டிற்கான முதன்மை நிறுவன அமைப்பாகச் செயல்படுதல்.", ur: "تامل ناڈو میں اردو کی ترقی کے لیے بنیادی ادارہ جاتی ادارے کے طور پر خدمات انجام دینا۔" } }
  ],

  /* ── AWARDS ── */
  awards: [
    { id: 1, name: { en: "Allama Iqbal Award", ta: "அல்லாமா இக்பால் விருது", ur: "علامہ اقبال ایوارڈ" }, recipient: { en: "Dr. Syed Fazlur Rahman", ta: "டாக்டர் சையது ஃபஸ்லுர் ரஹ்மான்", ur: "ڈاکٹر سید فضل الرحمان" }, contribution: { en: "Outstanding contribution to Urdu poetry and literary criticism", ta: "உருது கவிதை மற்றும் இலக்கிய விமர்சனத்தில் சிறந்த பங்களிப்பு", ur: "اردو شاعری اور ادبی تنقید میں نمایاں خدمات" }, year: "2025", image: "images/officials/official-2.png" },
    { id: 2, name: { en: "Mirza Ghalib Award", ta: "மிர்சா காலிப் விருது", ur: "مرزا غالب ایوارڈ" }, recipient: { en: "Prof. Nasreen Banu", ta: "பேராசிரியர் நஸ்ரீன் பானு", ur: "پروفیسر نسرین بانو" }, contribution: { en: "Lifelong dedication to Urdu education and women empowerment", ta: "உருது கல்வி மற்றும் பெண்கள் மேம்பாட்டிற்கான வாழ்நாள் அர்ப்பணிப்பு", ur: "اردو تعلیم اور خواتین کی بااختیاریت کے لیے تاحیات خدمات" }, year: "2025", image: "images/officials/official-2.png" },
    { id: 3, name: { en: "Kaifi Azmi Award", ta: "கைஃபி அஸ்மி விருது", ur: "کیفی اعظمی ایوارڈ" }, recipient: { en: "Shri Abdul Qadir", ta: "ஸ்ரீ அப்துல் காதிர்", ur: "جناب عبدالقادر" }, contribution: { en: "Pioneering Urdu theater and dramatic arts in South India", ta: "தென்னிந்தியாவில் உருது நாடகம் மற்றும் நாடகக் கலைகளில் முன்னோடி", ur: "جنوبی ہندوستان میں اردو تھیٹر اور ڈرامائی فنون میں سبقت" }, year: "2024", image: "images/officials/official-2.png" }
  ]
};
