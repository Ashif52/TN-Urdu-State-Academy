/* ============================================================
   Tamil Nadu Urdu State Academy — APPLICATION
   ============================================================ */

/* ── STATE ── */
const state = {
  currentPage: 'home',
  isLoggedIn: false,
  isAdmin: false,
  user: { name: 'Mohammed Irfan', email: 'irfan@example.com', phone: '+91 98765 43210', initials: 'MI' },
  formStep: 1,
  selectedScheme: null,
  selectedEvent: null,
  dashboardTab: 'applications',
  adminTab: 'overview',
  schemeFilter: { category: 'all', search: '' },
  lightboxIndex: 0
};

/* ── UTILITIES ── */
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
function formatDateParts(dateStr) {
  const d = new Date(dateStr);
  return { day: d.getDate(), month: d.toLocaleDateString('en-IN', { month: 'short' }), year: d.getFullYear() };
}
function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
function statusBadge(status) {
  const map = { pending: 'warning', approved: 'success', rejected: 'danger', published: 'success', draft: 'info' };
  return `<span class="badge badge--${map[status] || 'primary'}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>`;
}

/* ── TOAST ── */
function showToast(type, title, message) {
  const icons = { success: 'ri-check-line', error: 'ri-error-warning-line', warning: 'ri-alert-line', info: 'ri-information-line' };
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <i class="toast__icon ${icons[type]}"></i>
    <div class="toast__content">
      <div class="toast__title">${title}</div>
      <div class="toast__message">${message}</div>
    </div>
    <button class="toast__close" onclick="this.parentElement.classList.add('toast-out'); setTimeout(() => this.parentElement.remove(), 300)"><i class="ri-close-line"></i></button>
  `;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('toast-out'); setTimeout(() => toast.remove(), 300); }, 4500);
}

/* ── MODAL ── */
function openModal(content) {
  document.getElementById('modal-content').innerHTML = content;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── LIGHTBOX ── */
function openLightbox(index) {
  state.lightboxIndex = index;
  const item = DATA.gallery[index];
  document.getElementById('lightbox-img').src = item.src;
  document.getElementById('lightbox-img').alt = item.caption;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── ANNOUNCEMENT MODAL ── */
function showAnnouncementModal() {
  const modal = document.getElementById('announcement-modal');
  const doNotShow = localStorage.getItem('hideAnnouncement');
  const expiry = localStorage.getItem('announcementExpiry');
  
  if (doNotShow && expiry && Date.now() < parseInt(expiry)) return;

  setTimeout(() => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }, 1000);
}

function closeAnnouncementModal() {
  const modal = document.getElementById('announcement-modal');
  const checkbox = document.getElementById('do-not-show-check');
  
  if (checkbox && checkbox.checked) {
    localStorage.setItem('hideAnnouncement', 'true');
    localStorage.setItem('announcementExpiry', (Date.now() + 4 * 60 * 60 * 1000).toString()); // 4 hours
  }
  
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  state.lightboxIndex = (state.lightboxIndex + dir + DATA.gallery.length) % DATA.gallery.length;
  const item = DATA.gallery[state.lightboxIndex];
  document.getElementById('lightbox-img').src = item.src;
  document.getElementById('lightbox-img').alt = item.caption;
}

/* ── ROUTER ── */
function navigate(page, params) {
  state.currentPage = page;
  if (params) Object.assign(state, params);
  window.location.hash = page;
  renderPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateNav();
  closeMobileNav();
}

function updateStaticTranslations() {
  // Update elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = i18n.t(el.dataset.i18n);
  });
  
  // Update footer tagline
  const footerTagline = document.querySelector('.footer__about p');
  if (footerTagline) footerTagline.textContent = i18n.t('footer_tagline');
  
  // Update footer headings
  const footerHeaders = document.querySelectorAll('.footer__col h4, .footer__col h3');
  footerHeaders.forEach(h => {
    if (h.textContent.includes('Contact')) h.textContent = i18n.t('footer_contact');
    if (h.textContent.includes('Services')) h.textContent = i18n.t('footer_services');
    if (h.textContent.includes('Quick Links')) h.textContent = i18n.t('footer_quick_links');
  });

  // Update address
  const addressItem = document.querySelector('.footer__contact-list li');
  if (addressItem) {
    const textNode = addressItem.lastChild;
    if (textNode && textNode.nodeType === 3) textNode.textContent = ' ' + i18n.t('address');
  }

  // Update copyright
  const footerBottom = document.querySelector('.footer__bottom p:first-child');
  if (footerBottom) {
    const textNode = footerBottom.firstChild;
    if (textNode && textNode.nodeType === 3) textNode.textContent = i18n.t('copyright') + ' | ';
  }
  
  const footerGov = document.querySelector('.footer__gov');
  if (footerGov) footerGov.textContent = i18n.t('gov_initiative');
}

function updateNav() {
  document.querySelectorAll('.navbar__link, .mobile-nav__links a').forEach(link => {
    link.classList.toggle('active', link.dataset.page === state.currentPage);
  });
  const loginBtn = document.getElementById('nav-login-btn');
  const dashBtn = document.getElementById('nav-dashboard-btn');
  const mobileLogin = document.getElementById('mobile-login-btn');
  if (state.isLoggedIn) {
    loginBtn.innerHTML = `<i class="ri-logout-box-line"></i> <span data-i18n="nav_logout">${i18n.t('nav_logout')}</span>`;
    loginBtn.href = '#home';
    loginBtn.onclick = (e) => { e.preventDefault(); state.isLoggedIn = false; state.isAdmin = false; showToast('info', 'Logged Out', 'You have been signed out.'); navigate('home'); };
    if (dashBtn) dashBtn.style.display = 'inline-flex';
    if (mobileLogin) { mobileLogin.innerHTML = '<i class="ri-logout-box-line"></i> Logout'; }
  } else {
    loginBtn.innerHTML = `<i class="ri-user-line"></i> <span data-i18n="nav_login">${i18n.t('nav_login')}</span>`;
    loginBtn.href = '#login';
    loginBtn.onclick = null;
    if (dashBtn) dashBtn.style.display = 'none';
    if (mobileLogin) { mobileLogin.innerHTML = '<i class="ri-user-line"></i> Login'; }
  }
}

function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
  document.getElementById('hamburger-btn').classList.remove('open');
}

/* ── RENDER ── */
function renderPage() {
  const content = document.getElementById('app-content');
  const footer = document.getElementById('footer');

  // Update i18n layout and static parts
  i18n.updateLayout();
  updateStaticTranslations();
  i18n.updateSwitcherUI();

  const pages = {
    home: renderHome,
    about: renderAbout,
    schemes: renderSchemes,
    'scheme-detail': renderSchemeDetail,
    events: renderEvents,
    'event-detail': renderEventDetail,
    announcements: renderAnnouncements,
    gallery: renderGallery,
    contact: renderContact,
    login: renderLogin,
    register: renderRegister,
    apply: renderApplication,
    dashboard: renderDashboard,
    admin: renderAdmin
  };

  const renderer = pages[state.currentPage] || renderHome;
  
  try {
    const html = renderer();
    if (!html) throw new Error("Renderer returned empty content");
    content.innerHTML = html;
  } catch (err) {
    console.error(`[App] Error rendering page ${state.currentPage}:`, err);
    content.innerHTML = `
      <div class="container" style="padding: 100px 20px; text-align: center;">
        <h2><i class="ri-error-warning-line" style="color:var(--clr-danger)"></i> Oops, something went wrong.</h2>
        <p>We are having trouble loading this section. Please try refreshing the page or switching languages.</p>
        <button class="btn btn--primary mt-4" onclick="navigate('home')">Go back to Home</button>
      </div>
    `;
  }
  
  // Hide footer on dashboard/admin/login/register
  const hideFooter = ['dashboard', 'admin', 'login', 'register'].includes(state.currentPage);
  footer.style.display = hideFooter ? 'none' : '';

  // Animations
  setTimeout(() => {
    document.querySelectorAll('.animate-in').forEach(el => el.style.opacity = '');
  }, 50);

  bindPageEvents();
}

/* ============================================================
   PAGE RENDERERS
   ============================================================ */

/* ── HOME ── */
function renderHome() {
  const featured = DATA.schemes.filter(s => s.featured).slice(0, 3);
  const recentAnnouncements = DATA.announcements.slice(0, 5);
  const recentEvents = DATA.events.slice(0, 3);

  return `
    <!-- Hero Carousel -->
    <section class="hero-carousel" id="hero-carousel" aria-label="Hero carousel" role="region">
      <!-- Slides -->
      <div class="hero-carousel__track">
        <div class="hero-carousel__slide active" data-slide="0" aria-hidden="false">
          <div class="hero-carousel__bg" style="background-image:url('images/hero/hero-slide-1.png')"></div>
          <div class="hero-carousel__overlay"></div>
          <div class="hero-carousel__content">
            <div class="hero-carousel__badge"><i class="ri-government-line"></i> ${i18n.t('government_tn')}</div>
            <h1 class="hero-carousel__title">${i18n.t('academy_title')}</h1>
            <p class="hero-carousel__subtitle">${i18n.activeLang === 'ta' ? 'உருது மொழி, கல்வி மற்றும் கலாச்சார பாரம்பரியத்தை மேம்படுத்துதல்' : (i18n.activeLang === 'ur' ? 'اردو زبان، تعلیم اور ثقافتی ورثے کو بااختیار بنانا' : 'Empowering Urdu language, education, and cultural heritage')}</p>
            <div class="hero-carousel__actions">
              <a href="#schemes" class="btn btn--carousel-primary" onclick="navigate('schemes'); return false;"><i class="ri-compass-3-line"></i> ${i18n.t('explore_schemes')}</a>
              <a href="#about" class="btn btn--carousel-ghost" onclick="navigate('about'); return false;"><i class="ri-information-line"></i> ${i18n.t('learn_more')}</a>
            </div>
          </div>
        </div>

        <div class="hero-carousel__slide" data-slide="1" aria-hidden="true">
          <div class="hero-carousel__bg" style="background-image:url('images/hero/hero-slide-2.png')"></div>
          <div class="hero-carousel__overlay"></div>
          <div class="hero-carousel__content">
            <div class="hero-carousel__badge"><i class="ri-award-line"></i> ${i18n.activeLang === 'ta' ? 'நிதி உதவி' : (i18n.activeLang === 'ur' ? 'مالی امداد' : 'Financial Assistance')}</div>
            <h1 class="hero-carousel__title">${i18n.activeLang === 'ta' ? 'உதவித்தொகை மற்றும் நிதி உதவி' : (i18n.activeLang === 'ur' ? 'اسکالرشپ اور مالی امداد' : 'Scholarships & Financial Support')}</h1>
            <p class="hero-carousel__subtitle">${i18n.activeLang === 'ta' ? 'கல்வி மற்றும் கலாச்சார உதவி திட்டங்களுக்கு விண்ணப்பிக்கவும்' : (i18n.activeLang === 'ur' ? 'تعلیمی اور ثقافتی امدادی پروگراموں کے لیے اپلائی کریں' : 'Apply for educational and cultural assistance programs')}</p>
            <div class="hero-carousel__actions">
              <a href="#apply" class="btn btn--carousel-primary" onclick="navigate('apply'); return false;"><i class="ri-edit-line"></i> ${i18n.t('apply_now')}</a>
              <a href="#schemes" class="btn btn--carousel-ghost" onclick="navigate('schemes'); return false;"><i class="ri-file-list-3-line"></i> ${i18n.t('view_all')}</a>
            </div>
          </div>
        </div>

        <div class="hero-carousel__slide" data-slide="2" aria-hidden="true">
          <div class="hero-carousel__bg" style="background-image:url('images/hero/hero-slide-3.png')"></div>
          <div class="hero-carousel__overlay"></div>
          <div class="hero-carousel__content">
            <div class="hero-carousel__badge"><i class="ri-calendar-event-line"></i> ${i18n.activeLang === 'ta' ? 'கலாச்சார நிகழ்ச்சிகள்' : (i18n.activeLang === 'ur' ? 'ثقافتی پروگرام' : 'Cultural Programs')}</div>
            <h1 class="hero-carousel__title">${i18n.activeLang === 'ta' ? 'கலாச்சார நிகழ்வுகள் மற்றும் திட்டங்கள்' : (i18n.activeLang === 'ur' ? 'ثقافتی تقاریب اور پروگرام' : 'Cultural Events & Programs')}</h1>
            <p class="hero-carousel__subtitle">${i18n.activeLang === 'ta' ? 'கருத்தரங்குகள், போட்டிகள் மற்றும் பட்டறைகளில் பங்கேற்கவும்' : (i18n.activeLang === 'ur' ? 'سیمینارز، مقابلوں اور ورکشاپس میں حصہ لیں' : 'Participate in seminars, competitions, and workshops')}</p>
            <div class="hero-carousel__actions">
              <a href="#events" class="btn btn--carousel-primary" onclick="navigate('events'); return false;"><i class="ri-calendar-check-line"></i> ${i18n.activeLang === 'ta' ? 'நிகழ்வுகளைக் காண்க' : (i18n.activeLang === 'ur' ? 'تقاریب دیکھیں' : 'View Events')}</a>
              <a href="#gallery" class="btn btn--carousel-ghost" onclick="navigate('gallery'); return false;"><i class="ri-gallery-line"></i> ${i18n.t('nav_gallery')}</a>
            </div>
          </div>
        </div>

        <div class="hero-carousel__slide" data-slide="3" aria-hidden="true">
          <div class="hero-carousel__bg" style="background-image:url('images/hero/hero-slide-4.png')"></div>
          <div class="hero-carousel__overlay"></div>
          <div class="hero-carousel__content">
            <div class="hero-carousel__badge"><i class="ri-megaphone-line"></i> ${i18n.activeLang === 'ta' ? 'அதிகாரப்பூர்வ அறிவிப்புகள்' : (i18n.activeLang === 'ur' ? 'سرکاری نوٹس' : 'Official Notices')}</div>
            <h1 class="hero-carousel__title">${i18n.activeLang === 'ta' ? 'சமீபத்திய செய்திகள் மற்றும் அறிவிப்புகள்' : (i18n.activeLang === 'ur' ? 'تازہ ترین اپڈیٹس اور نوٹس' : 'Latest Updates & Notices')}</h1>
            <p class="hero-carousel__subtitle">${i18n.activeLang === 'ta' ? 'அதிகாரப்பூர்வ அறிவிப்புகளுடன் தகவலுடன் இருங்கள்' : (i18n.activeLang === 'ur' ? 'سرکاری اعلانات سے باخبر رہیں' : 'Stay informed with official announcements')}</p>
            <div class="hero-carousel__actions">
              <a href="#announcements" class="btn btn--carousel-primary" onclick="navigate('announcements'); return false;"><i class="ri-notification-3-line"></i> ${i18n.activeLang === 'ta' ? 'அறிவிப்புகளைக் காண்க' : (i18n.activeLang === 'ur' ? 'اعلانات دیکھیں' : 'View Announcements')}</a>
              <a href="#contact" class="btn btn--carousel-ghost" onclick="navigate('contact'); return false;"><i class="ri-customer-service-2-line"></i> ${i18n.t('nav_contact')}</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <button class="hero-carousel__arrow hero-carousel__arrow--prev" id="carousel-prev" aria-label="Previous slide">
        <i class="ri-arrow-left-s-line"></i>
      </button>
      <button class="hero-carousel__arrow hero-carousel__arrow--next" id="carousel-next" aria-label="Next slide">
        <i class="ri-arrow-right-s-line"></i>
      </button>

      <!-- Dot Indicators -->
      <div class="hero-carousel__dots" id="carousel-dots" role="tablist" aria-label="Carousel navigation">
        <button class="hero-carousel__dot active" data-dot="0" role="tab" aria-selected="true" aria-label="Slide 1"></button>
        <button class="hero-carousel__dot" data-dot="1" role="tab" aria-selected="false" aria-label="Slide 2"></button>
        <button class="hero-carousel__dot" data-dot="2" role="tab" aria-selected="false" aria-label="Slide 3"></button>
        <button class="hero-carousel__dot" data-dot="3" role="tab" aria-selected="false" aria-label="Slide 4"></button>
      </div>

      <!-- Decorative Urdu letter -->
      <div class="hero-carousel__decorative" aria-hidden="true">ا</div>
    </section>

    <!-- ═══ ANNOUNCEMENT TICKER ═══ -->
    <div class="ticker" id="announcement-ticker">
      <div class="ticker__label">
        <i class="ri-megaphone-line"></i>
        <span>${i18n.t('latest_updates')}</span>
      </div>
      <div class="ticker__track-wrapper">
        <div class="ticker__track" id="ticker-track">
          <!-- Content injected by JS -->
        </div>
      </div>
      <button class="ticker__pause" id="ticker-pause-btn" aria-label="Pause ticker">
        <i class="ri-pause-mini-fill"></i>
      </button>
    </div>

    <!-- ═══ MEMBERS / OFFICIALS SECTION ═══ -->
    <section class="officials" id="officials-section">
      <div class="container">
        <div class="officials__header">
          <div class="officials__badge">
            <i class="ri-government-line"></i>
            <span>${i18n.activeLang === 'ta' ? 'அகாதெமி தலைமை' : (i18n.activeLang === 'ur' ? 'اکیڈمی کی قیادت' : 'Academy Leadership')}</span>
          </div>
          <h2 class="officials__title">${i18n.activeLang === 'ta' ? 'அகாதெமி அதிகாரி' : (i18n.activeLang === 'ur' ? 'اکیڈمی کے عہدیدار' : 'Academy Official')}</h2>
          <p class="officials__subtitle">${i18n.activeLang === 'ta' ? 'தமிழ்நாடு உருது அகாதெமியின் பார்வை மற்றும் பணியை இயக்குதல்' : (i18n.activeLang === 'ur' ? 'تامل ناڈو اردو اکیڈمی کے وژن اور مشن کو آگے بڑھانا' : 'Driving the vision and mission of Tamil Nadu Urdu State Academy')}</p>
        </div>
        <div class="officials__single-wrapper">
          <div class="officials__track officials__track--single" id="officials-track">
            ${DATA.leadership.map((l, i) => `
              <div class="officials__card animate-in" style="animation-delay: ${i * 80}ms">
                <div class="officials__photo-ring">
                  <img src="${l.image}" alt="${i18n.td(l.name)}" class="officials__photo" loading="lazy">
                </div>
                <h4 class="officials__name">${i18n.td(l.name)}</h4>
                <p class="officials__role">${i18n.td(l.role)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ WELCOME / ABOUT STRIP ═══ -->
    <section class="welcome-strip">
      <div class="container">
        <div class="welcome-strip__grid">
          <div class="welcome-strip__content">
            <h2>${i18n.activeLang === 'ta' ? 'தமிழ்நாடு உருது அகாதெமிக்கு வரவேற்கிறோம்' : (i18n.activeLang === 'ur' ? 'تامل ناڈو اردو اکیڈمی میں آپ کا خیر مقدم ہے' : 'Welcome to Tamil Nadu Urdu State Academy')}</h2>
            <p>${i18n.t('footer_tagline')}</p>
            <div class="welcome-strip__bilingual">
              <div class="urdu-text">تمل ناڈو اردو اکیڈمی میں آپ کا خیر مقدم ہے۔</div>
              <div class="tamil-text">தமிழ்நாடு உருது அகாதெமிற்கு உங்களை அன்புடன் வரவேற்கிறோம்.</div>
            </div>
            <a href="#about" class="btn btn--primary" onclick="navigate('about'); return false;">${i18n.t('nav_about')} <i class="ri-arrow-right-line"></i></a>
          </div>
          <div class="welcome-strip__links">
            <h3><i class="ri-links-line"></i> ${i18n.t('footer_quick_links')}</h3>
            <a href="#announcements" class="quick-link-btn" onclick="navigate('announcements'); return false;"><i class="ri-notification-3-line"></i> ${i18n.activeLang === 'ta' ? 'காலிப்பணியிட அறிவிப்புகள்' : (i18n.activeLang === 'ur' ? 'خالی آسامیوں کے نوٹس' : 'Vacancy Notices')} <i class="ri-arrow-right-s-line"></i></a>
            <a href="#events" class="quick-link-btn" onclick="navigate('events'); return false;"><i class="ri-calendar-event-line"></i> ${i18n.activeLang === 'ta' ? 'வரவிருக்கும் நிகழ்வுகள்' : (i18n.activeLang === 'ur' ? 'آنے والی تقاریب' : 'Upcoming Events')} <i class="ri-arrow-right-s-line"></i></a>
            <a href="#announcements" class="quick-link-btn" onclick="navigate('announcements'); return false;"><i class="ri-file-text-line"></i> ${i18n.activeLang === 'ta' ? 'அறிவிப்புகள் / சுற்றறிக்கைகள்' : (i18n.activeLang === 'ur' ? 'نوٹس / سرکلر' : 'Notices / Circulars')} <i class="ri-arrow-right-s-line"></i></a>
            <a href="#contact" class="quick-link-btn" onclick="navigate('contact'); return false;"><i class="ri-customer-service-2-line"></i> ${i18n.activeLang === 'ta' ? 'உதவி மையம் / RTI' : (i18n.activeLang === 'ur' ? 'ہیلپ ڈیسک / آر ٹی آئی' : 'Helpdesk / RTI')} <i class="ri-arrow-right-s-line"></i></a>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="section">
      <div class="container">
        <div class="grid grid--4 animate-in">
          <div class="stat-card">
            <div class="stat-card__icon"><i class="ri-file-list-3-line"></i></div>
            <div class="stat-card__number">${DATA.stats.totalSchemes}</div>
            <div class="stat-card__label">Active Schemes</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__icon"><i class="ri-group-line"></i></div>
            <div class="stat-card__number">${DATA.stats.beneficiaries}</div>
            <div class="stat-card__label">Beneficiaries</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__icon"><i class="ri-calendar-event-line"></i></div>
            <div class="stat-card__number">${DATA.stats.eventsConducted}</div>
            <div class="stat-card__label">Events Conducted</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__icon"><i class="ri-map-pin-2-line"></i></div>
            <div class="stat-card__number">${DATA.stats.districtsServed}</div>
            <div class="stat-card__label">Districts Served</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Schemes -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <h2>${i18n.activeLang === 'ta' ? 'சிறப்பு திட்டங்கள்' : (i18n.activeLang === 'ur' ? 'نمایاں اسکیمیں' : 'Featured Schemes')}</h2>
          <p>${i18n.activeLang === 'ta' ? 'உருது கல்வி, கலை மற்றும் கலாச்சார பாதுகாப்பை ஆதரிக்க வடிவமைக்கப்பட்ட அரசு திட்டங்கள்' : (i18n.activeLang === 'ur' ? 'اردو تعلیم، فنون اور ثقافتی تحفظ کے لیے تیار کردہ حکومتی پروگرام' : 'Government programs designed to support Urdu education, arts, and cultural preservation')}</p>
        </div>
        <div class="grid grid--3">
          ${featured.map(s => `
            <div class="scheme-card animate-in">
              <div class="scheme-card__icon"><i class="${s.icon}"></i></div>
              <h3 class="scheme-card__title">${i18n.td(s.title)}</h3>
              <p class="scheme-card__desc">${i18n.td(s.description)}</p>
              <div class="scheme-card__tags">${s.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
              <div class="scheme-card__deadline"><i class="ri-time-line"></i> ${i18n.activeLang === 'ta' ? 'காலக்கெடு' : (i18n.activeLang === 'ur' ? 'آخری تاریخ' : 'Deadline')}: ${formatDate(s.deadline)} (${daysUntil(s.deadline)} ${i18n.activeLang === 'ta' ? 'நாட்கள் உள்ளன' : (i18n.activeLang === 'ur' ? 'دن باقی ہیں' : 'days left')})</div>
              <button class="btn btn--primary btn--sm" onclick="navigate('scheme-detail', {selectedScheme: ${s.id}})">${i18n.t('view_all')} <i class="ri-arrow-right-line"></i></button>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-8">
          <a href="#schemes" class="btn btn--outline" onclick="navigate('schemes'); return false;">${i18n.t('explore_schemes')} <i class="ri-arrow-right-line"></i></a>
        </div>
      </div>
    </section>

    <!-- Announcements -->
    <section class="section">
      <div class="container">
        <div class="flex-between mb-6">
          <h2>${i18n.t('nav_announcements')}</h2>
          <a href="#announcements" class="btn btn--ghost btn--sm" onclick="navigate('announcements'); return false;">${i18n.t('view_all')} <i class="ri-arrow-right-line"></i></a>
        </div>
        <div class="card">
          <div class="card__body">
            ${recentAnnouncements.map(a => {
              const dp = formatDateParts(a.date);
              return `
              <div class="announcement-item" style="cursor:pointer" onclick="navigate('announcements')">
                <div class="announcement__date">
                  <div class="announcement__date-day">${dp.day}</div>
                  <div class="announcement__date-month">${dp.month}</div>
                </div>
                <div class="announcement__content">
                  <h4>${i18n.td(a.title)}</h4>
                  <p>${i18n.td(a.content).slice(0, 100)}…</p>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Events Preview -->
    <section class="section section--alt">
      <div class="container">
        <div class="section-header">
          <h2>${i18n.activeLang === 'ta' ? 'வரவிருக்கும் நிகழ்வுகள்' : (i18n.activeLang === 'ur' ? 'آنے والی تقاریب' : 'Upcoming Events')}</h2>
          <p>${i18n.activeLang === 'ta' ? 'கலாச்சார கொண்டாட்டங்கள், பட்டறைகள் மற்றும் இலக்கிய கூட்டங்களுக்கு எங்களுடன் சேருங்கள்' : (i18n.activeLang === 'ur' ? 'ثقافتی تقریبات، ورکشاپس اور ادبی اجتماعات میں ہمارے ساتھ شریک ہوں' : 'Join us for cultural celebrations, workshops, and literary gatherings')}</p>
        </div>
        <div class="grid grid--3">
          ${recentEvents.map(e => {
            const dp = formatDateParts(e.date);
            return `
            <div class="event-card animate-in">
              <div style="position:relative">
                <img class="event-card__img" src="${e.image}" alt="${i18n.td(e.title)}">
                <div class="event-card__date-badge">
                  <div class="day">${dp.day}</div>
                  <div class="month">${dp.month}</div>
                </div>
              </div>
              <div class="event-card__body">
                <div class="badge badge--primary mb-4">${e.category}</div>
                <h4 class="event-card__title">${i18n.td(e.title)}</h4>
                <div class="event-card__meta">
                  <span><i class="ri-time-line"></i> ${e.time}</span>
                  <span><i class="ri-map-pin-line"></i> ${e.location.split(',')[0]}</span>
                </div>
                <button class="btn btn--outline btn--sm" onclick="navigate('event-detail', {selectedEvent: ${e.id}})">${i18n.t('view_all')}</button>
              </div>
            </div>`;
          }).join('')}
        </div>
        <div class="text-center mt-8">
          <a href="#events" class="btn btn--outline" onclick="navigate('events'); return false;">${i18n.activeLang === 'ta' ? 'அனைத்து நிகழ்வுகளையும் காண்க' : (i18n.activeLang === 'ur' ? 'تمام تقاریب دیکھیں' : 'View All Events')} <i class="ri-arrow-right-line"></i></a>
        </div>
      </div>
    </section>

    <!-- Gallery Preview -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>${i18n.activeLang === 'ta' ? 'கலாச்சார தொகுப்பு' : (i18n.activeLang === 'ur' ? 'ثقافتی گیلری' : 'Cultural Gallery')}</h2>
          <p>${i18n.activeLang === 'ta' ? 'எங்கள் நிகழ்வுகள், பட்டறைகள் மற்றும் கலாச்சார கொண்டாட்டங்களின் காட்சிகள்' : (i18n.activeLang === 'ur' ? 'ہماری تقاریب، ورکشاپس اور ثقافتی جشن کی جھلکیاں' : 'Glimpses of our events, workshops, and cultural celebrations')}</p>
        </div>
        <div class="gallery-grid">
          ${DATA.gallery.slice(0, 8).map((g, i) => `
            <div class="gallery-item animate-in" onclick="openLightbox(${i})">
              <img src="${g.src}" alt="${i18n.td(g.caption)}">
              <div class="gallery-item__overlay"><i class="ri-zoom-in-line"></i></div>
            </div>
          `).join('')}
        </div>
        <div class="text-center mt-8">
          <a href="#gallery" class="btn btn--outline" onclick="navigate('gallery'); return false;">${i18n.t('nav_gallery')} <i class="ri-arrow-right-line"></i></a>
        </div>
      </div>
    </section>
  `;
}

/* ── ABOUT ── */
function renderAbout() {
  return `
    <div class="page-banner">
      <div class="container">
        <h1>${i18n.t('nav_about')}</h1>
        <p>${i18n.activeLang === 'ta' ? 'தமிழ்நாட்டில் உருது மொழி, இலக்கியம் மற்றும் கலாச்சாரத்தை மேம்படுத்துவதற்கான எங்கள் பணியைப் பற்றி அறிக' : (i18n.activeLang === 'ur' ? 'تامل ناڈو میں اردو زبان، ادب اور ثقافت کے فروغ کے ہمارے مشن کے بارے میں جانیں' : 'Learn about our mission to promote Urdu language, literature, and culture in Tamil Nadu')}</p>
        <div class="breadcrumb"><a href="#home" onclick="navigate('home'); return false;">${i18n.t('nav_home')}</a> <i class="ri-arrow-right-s-line"></i> ${i18n.t('nav_about')}</div>
      </div>
    </div>

    <!-- Overview -->
    <section class="section">
      <div class="container" style="max-width:900px">
        <div class="animate-in">
          <h2 class="mb-6">${i18n.activeLang === 'ta' ? 'நாங்கள் யார்' : (i18n.activeLang === 'ur' ? 'ہم کون ہیں' : 'Who We Are')}</h2>
          <p style="font-size:var(--fs-md); line-height:var(--lh-relaxed); color:var(--clr-text-secondary); margin-bottom:var(--sp-6)">
            ${i18n.activeLang === 'ta' ? 'தமிழ்நாடு உருது அகாதெமி 1992 ஆம் ஆண்டு தமிழ்நாடு அரசால் நிறுவப்பட்ட ஒரு தன்னாட்சி அமைப்பாகும், இது மாநிலம் முழுவதும் உருது மொழி, இலக்கியம் மற்றும் கலாச்சாரத்தை மேம்படுத்துவதற்கும் மேம்படுத்துவதற்கும் அர்ப்பணிக்கப்பட்டுள்ளது. முப்பது ஆண்டுகளுக்கும் மேலான சேவையுடன், அகாதெமி நவீன கல்வித் தேவைகளுக்கு ஏற்றவாறு வளமான உருது பாரம்பரியத்தைப் பாதுகாப்பதில் முக்கியப் பங்காற்றியுள்ளது.' : (i18n.activeLang === 'ur' ? 'تامل ناڈو اردو اکیڈمی 1992 میں حکومت تامل ناڈو کے ذریعہ قائم کردہ ایک خود مختار ادارہ ہے، جو ریاست بھر میں اردو زبان، ادب اور ثقافت کے فروغ اور ترقی کے لیے وقف ہے۔ تین دہائیوں سے زیادہ کی خدمت کے ساتھ، اکیڈمی نے جدید تعلیمی ضروریات کو اپناتے ہوئے اردو کے بھرپور ورثے کو محفوظ رکھنے میں اہم کردار ادا کیا ہے۔' : 'The Tamil Nadu Urdu State Academy is an autonomous body established by the Government of Tamil Nadu in 1992, dedicated to the promotion and development of Urdu language, literature, and culture across the state. With over three decades of service, the Academy has been instrumental in preserving the rich Urdu heritage while adapting to modern educational needs.')}
          </p>
          <p style="font-size:var(--fs-md); line-height:var(--lh-relaxed); color:var(--clr-text-secondary)">
            ${i18n.activeLang === 'ta' ? 'நாங்கள் தமிழ்நாடு அரசின் தமிழ் வளர்ச்சி மற்றும் தகவல் துறையின் கீழ் செயல்படுகிறோம், மாநிலத்தில் உருது மொழியை மேம்படுத்துவதற்கான முதன்மை நிறுவன அமைப்பாக செயல்படுகிறோம். எங்கள் திட்டங்கள் தமிழ்நாட்டின் அனைத்து 38 மாவட்டங்களிலும் 50,000 க்கும் மேற்பட்ட பயனாளிகளை சென்றடைகின்றன.' : (i18n.activeLang === 'ur' ? 'ہم محکمہ تامل ترقی اور اطلاعات، حکومت تامل ناڈو کے تحت کام کرتے ہیں، جو ریاست میں اردو زبان کے فروغ کے لیے بنیادی ادارہ جاتی ادارے کے طور پر کام کر رہے ہیں۔ ہمارے پروگرام تامل ناڈو کے تمام 38 اضلاع میں 50,000 سے زیادہ مستفیدین تک پہنچتے ہیں۔' : 'We operate under the Department of Tamil Development and Information, Government of Tamil Nadu, serving as the primary institutional body for Urdu language promotion in the state. Our programs reach over 50,000 beneficiaries across all 38 districts of Tamil Nadu.')}
          </p>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="section section--alt">
      <div class="container">
        <div class="grid grid--2">
          <div class="card animate-in">
            <div class="card__body" style="padding:var(--sp-8)">
              <div style="width:52px;height:52px;border-radius:var(--radius-md);background:var(--clr-primary-50);color:var(--clr-primary);display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:var(--sp-5)">
                <i class="ri-focus-2-line"></i>
              </div>
              <h3 class="mb-4">${i18n.activeLang === 'ta' ? 'எங்கள் நோக்கம்' : (i18n.activeLang === 'ur' ? 'ہمارا مشن' : 'Our Mission')}</h3>
              <p style="color:var(--clr-text-secondary); line-height:var(--lh-relaxed)">
                ${i18n.activeLang === 'ta' ? 'தரமான கல்வி ஆதரவை வழங்குதல், கலைத் திறமைகளை வளர்ப்பது மற்றும் கலாச்சார பரிமாற்றத்திற்கான தளங்களை உருவாக்குதல் ஆகியவற்றின் மூலம் தமிழ்நாட்டில் உருது மொழி மற்றும் இலக்கியத்தை மேம்படுத்துதல், உருவாக்குதல் மற்றும் பாதுகாத்தல். உருதுவின் வரலாற்று முக்கியத்துவத்தை மதிக்கும் அதே வேளையில், எதிர்கால சந்ததியினருக்கு உருது மொழியை அணுகக்கூடியதாகவும் பொருத்தமானதாகவும் மாற்றுவதை நாங்கள் நோக்கமாகக் கொண்டுள்ளோம்.' : (i18n.activeLang === 'ur' ? 'معیاری تعلیمی معاونت فراہم کرکے، فنکارانہ صلاحیتوں کو پروان چڑھانے، اور ثقافتی تبادلے کے لیے پلیٹ فارم تیار کرکے تمل ناڈو میں اردو زبان اور ادب کو فروغ دینا، ترقی دینا اور محفوظ کرنا۔ ہم اردو کی تاریخی اہمیت کا احترام کرتے ہوئے، آنے والی نسلوں کے لیے اردو کو قابل رسائی اور متعلقہ بنانا چاہتے ہیں۔' : 'To promote, develop, and preserve Urdu language and literature in Tamil Nadu by providing quality education support, nurturing artistic talent, and creating platforms for cultural exchange. We aim to make Urdu accessible and relevant for future generations while honoring its historical significance.')}
              </p>
            </div>
          </div>
          <div class="card animate-in">
            <div class="card__body" style="padding:var(--sp-8)">
              <div style="width:52px;height:52px;border-radius:var(--radius-md);background:var(--clr-secondary-50);color:var(--clr-secondary-dark);display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:var(--sp-5)">
                <i class="ri-eye-line"></i>
              </div>
              <h3 class="mb-4">${i18n.activeLang === 'ta' ? 'எங்கள் பார்வை' : (i18n.activeLang === 'ur' ? 'ہمارا وژن' : 'Our Vision')}</h3>
              <p style="color:var(--clr-text-secondary); line-height:var(--lh-relaxed)">
                ${i18n.activeLang === 'ta' ? 'உருது மொழி வளர்ச்சிக்கான தென்னிந்தியாவின் முன்னணி நிறுவனமாக திகழ்தல், கல்வி மற்றும் அன்றாட வாழ்க்கையின் வாழும் மொழியாக உருது செழித்தோங்கும் ஒரு துடிப்பான சுற்றுச்சூழல் அமைப்பை உருவாக்குதல். தமிழ்நாட்டில் உருது பேசும் ஒவ்வொருவருக்கும் தரமான கல்வி மற்றும் கலாச்சார வளங்கள் கிடைப்பதை நாங்கள் கற்பனை செய்கிறோம்.' : (i18n.activeLang === 'ur' ? 'اردو زبان کی ترقی کے لیے جنوبی ہندوستان کا صف اول کا ادارہ بننا، ایک متحرک ماحولیاتی نظام کی تشکیل جہاں اردو فن، تعلیم اور روزمرہ کی زندگی کی زندہ زبان کے طور پر پروان چڑھے۔ ہم تصور کرتے ہیں کہ تامل ناڈو میں اردو بولنے والے ہر فرد کو معیاری تعلیم اور ثقافتی وسائل تک رسائی حاصل ہو۔' : 'To be the leading institution in South India for Urdu language development, creating a vibrant ecosystem where Urdu thrives as a living language of art, education, and daily life. We envision every Urdu speaker in Tamil Nadu having access to quality education and cultural resources.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Leadership -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>${i18n.activeLang === 'ta' ? 'எங்கள் தலைமை' : (i18n.activeLang === 'ur' ? 'ہماری قیادت' : 'Our Leadership')}</h2>
          <p>${i18n.activeLang === 'ta' ? 'அகாதெமியின் பார்வை மற்றும் செயல்பாடுகளை வழிநடத்தும் குழுவை சந்திக்கவும்' : (i18n.activeLang === 'ur' ? 'اکیڈمی کے وژن اور کارروائیوں کی رہنمائی کرنے والی ٹیم سے ملیں' : "Meet the team guiding the Academy's vision and operations")}</p>
        </div>
        <div class="grid grid--3">
          ${DATA.leadership.map(l => `
            <div class="leader-card animate-in">
              <div class="leader-card__photo">
                <img src="${l.image}" alt="${i18n.td(l.name)}" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">
              </div>
              <h4>${i18n.td(l.name)}</h4>
              <p>${i18n.td(l.role)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section section--alt">
      <div class="container" style="max-width:700px">
        <div class="section-header">
          <h2>${i18n.activeLang === 'ta' ? 'எங்கள் பயணம்' : (i18n.activeLang === 'ur' ? 'ہمارا سفر' : 'Our Journey')}</h2>
          <p>${i18n.activeLang === 'ta' ? 'அகாதெமியின் வரலாற்றில் முக்கிய மைல்கற்கள்' : (i18n.activeLang === 'ur' ? 'اکیڈمی کی تاریخ میں اہم سنگ میل' : "Key milestones in the Academy's history")}</p>
        </div>
        <div class="timeline">
          ${DATA.timeline.map(t => `
            <div class="timeline__item animate-in">
              <div class="timeline__dot"></div>
              <div class="timeline__content">
                <div class="timeline__year">${t.year}</div>
                <h4>${i18n.td(t.title)}</h4>
                <p>${i18n.td(t.desc)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

/* ── SCHEMES ── */
function renderSchemes() {
  let schemes = DATA.schemes;
  if (state.schemeFilter.category !== 'all') {
    schemes = schemes.filter(s => s.category === state.schemeFilter.category);
  }
  if (state.schemeFilter.search) {
    const q = state.schemeFilter.search.toLowerCase();
    schemes = schemes.filter(s => 
      i18n.td(s.title).toLowerCase().includes(q) || 
      i18n.td(s.description).toLowerCase().includes(q)
    );
  }
  const categories = [...new Set(DATA.schemes.map(s => s.category))];

  return `
    <div class="page-banner">
      <div class="container">
        <h1>${i18n.activeLang === 'ta' ? 'அரசு திட்டங்கள்' : (i18n.activeLang === 'ur' ? 'حکومتی اسکیمیں' : 'Government Schemes')}</h1>
        <p>${i18n.activeLang === 'ta' ? 'தமிழ்நாடு உருது அகாதெமி வழங்கும் அனைத்து திட்டங்களையும் உலாவவும்' : (i18n.activeLang === 'ur' ? 'تامل ناڈو اردو اکیڈمی کی جانب سے پیش کردہ تمام اسکیمیں دیکھیں' : 'Browse all schemes offered by Tamil Nadu Urdu State Academy')}</p>
        <div class="breadcrumb"><a href="#home" onclick="navigate('home'); return false;">${i18n.t('nav_home')}</a> <i class="ri-arrow-right-s-line"></i> ${i18n.t('nav_schemes')}</div>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="schemes-layout" style="display:grid; grid-template-columns:${i18n.activeLang === 'ur' ? '1fr 280px' : '280px 1fr'}; gap:var(--sp-8); align-items:start;">
          <!-- Filter Sidebar -->
          <div class="filter-sidebar" style="${i18n.activeLang === 'ur' ? 'grid-column: 2;' : 'grid-column: 1;'}">
            <h3><i class="ri-filter-3-line"></i> ${i18n.activeLang === 'ta' ? 'வடிகட்டிகள்' : (i18n.activeLang === 'ur' ? 'فلٹرز' : 'Filters')}</h3>
            <div class="form-group">
              <input type="text" class="form-input" id="scheme-search" placeholder="${i18n.activeLang === 'ta' ? 'திட்டங்களைத் தேடுங்கள்…' : (i18n.activeLang === 'ur' ? 'اسکیمیں تلاش کریں…' : 'Search schemes…')}" value="${state.schemeFilter.search}" oninput="state.schemeFilter.search=this.value; renderPage();">
            </div>
            <div class="filter-group">
              <div class="filter-group__title">${i18n.activeLang === 'ta' ? 'வகை' : (i18n.activeLang === 'ur' ? 'قسم' : 'Category')}</div>
              <label class="filter-option"><input type="radio" name="cat" value="all" ${state.schemeFilter.category==='all'?'checked':''} onchange="state.schemeFilter.category='all'; renderPage();"> ${i18n.activeLang === 'ta' ? 'அனைத்து வகைகள்' : (i18n.activeLang === 'ur' ? 'تمام زمرے' : 'All Categories')}</label>
              ${categories.map(c => `<label class="filter-option"><input type="radio" name="cat" value="${c}" ${state.schemeFilter.category===c?'checked':''} onchange="state.schemeFilter.category='${c}'; renderPage();"> ${c.charAt(0).toUpperCase()+c.slice(1)}</label>`).join('')}
            </div>
            <button class="btn btn--ghost btn--sm btn--full" onclick="state.schemeFilter={category:'all',search:''}; renderPage();">
              <i class="ri-refresh-line"></i> ${i18n.activeLang === 'ta' ? 'வடிகட்டிகளை மீட்டமை' : (i18n.activeLang === 'ur' ? 'فلٹرز ری سیٹ کریں' : 'Reset Filters')}
            </button>
          </div>
          <!-- Scheme Grid -->
          <div style="${i18n.activeLang === 'ur' ? 'grid-column: 1;' : 'grid-column: 2;'} min-width: 0;">
            <div class="flex-between mb-6">
              <p class="caption">${schemes.length} ${i18n.activeLang === 'ta' ? 'திட்டங்கள் கண்டறியப்பட்டன' : (i18n.activeLang === 'ur' ? 'اسکیمیں ملی ہیں' : 'schemes found')}</p>
            </div>
            <div class="grid grid--2">
              ${schemes.map(s => `
                <div class="scheme-card animate-in">
                  <div class="scheme-card__icon"><i class="${s.icon}"></i></div>
                  <h3 class="scheme-card__title">${i18n.td(s.title)}</h3>
                  <p class="scheme-card__desc">${i18n.td(s.description)}</p>
                  <div class="scheme-card__tags">${s.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                  <div class="scheme-card__deadline"><i class="ri-time-line"></i> ${i18n.activeLang === 'ta' ? 'காலக்கெடு' : (i18n.activeLang === 'ur' ? 'آخری تاریخ' : 'Deadline')}: ${formatDate(s.deadline)}</div>
                  <button class="btn btn--primary btn--sm" onclick="navigate('scheme-detail', {selectedScheme: ${s.id}})">${i18n.t('view_all')} <i class="ri-arrow-right-line"></i></button>
                </div>
              `).join('')}
            </div>
            ${schemes.length === 0 ? `<div class="text-center mt-8"><i class="ri-search-line" style="font-size:3rem;color:var(--clr-text-muted)"></i><p class="mt-4 text-secondary">${i18n.activeLang === 'ta' ? 'வடிகட்டிகளுடன் பொருந்தக்கூடிய திட்டங்கள் எதுவும் இல்லை.' : (i18n.activeLang === 'ur' ? 'آپ کے فلٹرز سے میل کھاتی کوئی اسکیم نہیں ملی۔' : 'No schemes match your filters.')}</p></div>` : ''}
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ── SCHEME DETAIL ── */
function renderSchemeDetail() {
  const s = DATA.schemes.find(s => s.id === state.selectedScheme);
  if (!s) return renderSchemes();
  return `
    <div class="page-banner">
      <div class="container">
        <h1>${i18n.td(s.title)}</h1>
        <div class="breadcrumb">
          <a href="#home" onclick="navigate('home'); return false;">${i18n.t('nav_home')}</a> <i class="ri-arrow-right-s-line"></i>
          <a href="#schemes" onclick="navigate('schemes'); return false;">${i18n.t('nav_schemes')}</a> <i class="ri-arrow-right-s-line"></i> ${i18n.activeLang === 'ta' ? 'விவரங்கள்' : (i18n.activeLang === 'ur' ? 'تفصیلات' : 'Details')}
        </div>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="scheme-detail-grid">
          <div>
            <!-- Summary -->
            <div class="card mb-6">
              <div class="card__body">
                <div class="flex gap-3 mb-4">${s.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
                <p style="font-size:var(--fs-md);color:var(--clr-text-secondary);line-height:var(--lh-relaxed)">${i18n.td(s.description)}</p>
                <div class="scheme-card__deadline mt-4" style="font-size:var(--fs-sm)">
                  <i class="ri-timer-line"></i>
                  <strong>${i18n.activeLang === 'ta' ? 'காலக்கெடு' : (i18n.activeLang === 'ur' ? 'آخری تاریخ' : 'Deadline')}: ${formatDate(s.deadline)}</strong> — ${daysUntil(s.deadline)} ${i18n.activeLang === 'ta' ? 'நாட்கள் உள்ளன' : (i18n.activeLang === 'ur' ? 'دن باقی ہیں' : 'days remaining')}
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h3><i class="ri-checkbox-circle-line"></i> ${i18n.activeLang === 'ta' ? 'தகுதி வரம்புகள்' : (i18n.activeLang === 'ur' ? 'اہلیت کا معیار' : 'Eligibility Criteria')}</h3>
              <ul>${i18n.td(s.eligibility).map(e => `<li>${e}</li>`).join('')}</ul>
            </div>
            <div class="detail-section">
              <h3><i class="ri-gift-line"></i> ${i18n.activeLang === 'ta' ? 'பலன்கள்' : (i18n.activeLang === 'ur' ? 'فوائد' : 'Benefits')}</h3>
              <ul>${i18n.td(s.benefits).map(b => `<li>${b}</li>`).join('')}</ul>
            </div>
            <div class="detail-section">
              <h3><i class="ri-file-copy-line"></i> ${i18n.activeLang === 'ta' ? 'தேவையான ஆவணங்கள்' : (i18n.activeLang === 'ur' ? 'مطلوبہ دستاویزات' : 'Required Documents')}</h3>
              <ul>${i18n.td(s.documents).map(d => `<li>${d}</li>`).join('')}</ul>
            </div>
            <div class="detail-section">
              <h3><i class="ri-list-ordered"></i> ${i18n.activeLang === 'ta' ? 'விண்ணப்ப செயல்முறை' : (i18n.activeLang === 'ur' ? 'درخواست کا طریقہ کار' : 'Application Process')}</h3>
              <ul>${i18n.td(s.process).map(p => `<li>${p}</li>`).join('')}</ul>
            </div>
          </div>

          <!-- Sticky Sidebar -->
          <div class="scheme-detail__sidebar">
            <div class="scheme-detail__apply-box">
              <h3>${i18n.activeLang === 'ta' ? 'விண்ணப்பிக்க தயாரா?' : (i18n.activeLang === 'ur' ? 'درخواست دینے کے لیے تیار ہیں؟' : 'Ready to Apply?')}</h3>
              <p class="caption mb-4">${i18n.activeLang === 'ta' ? 'உங்கள் விண்ணப்பத்தை ஆன்லைனில் சமர்ப்பிக்கவும். உங்கள் நிலையை டேஷ்போர்டில் இருந்து கண்காணிக்கவும்.' : (i18n.activeLang === 'ur' ? 'اپنی درخواست آن لائن جمع کرائیں۔ ڈیش بورڈ سے اپنی حیثیت کو ٹریک کریں۔' : 'Submit your application online. Track your status from the dashboard.')}</p>
              <button class="btn btn--primary btn--lg btn--full mb-4" onclick="navigate('apply', {selectedScheme: ${s.id}})"><i class="ri-edit-line"></i> ${i18n.t('apply_now')}</button>
              <button class="btn btn--outline btn--sm btn--full" onclick="navigate('contact')"><i class="ri-question-line"></i> ${i18n.activeLang === 'ta' ? 'உதவி வேண்டுமா?' : (i18n.activeLang === 'ur' ? 'مدد چاہیے؟' : 'Need Help?')}</button>
              <div class="mt-6" style="padding-top:var(--sp-4);border-top:1px solid var(--clr-border-light)">
                <p class="caption"><i class="ri-download-line"></i> <a href="#" style="color:var(--clr-primary);font-weight:600">${i18n.activeLang === 'ta' ? 'விண்ணப்ப படிவத்தைப் பதிவிறக்குக (PDF)' : (i18n.activeLang === 'ur' ? 'درخواست فارم ڈاؤن لوڈ کریں (پی ڈی ایف)' : 'Download Application Form (PDF)')}</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ── APPLICATION (Multi-Step Form) ── */
function renderApplication() {
  const steps = ['Personal Info', 'Eligibility', 'Documents', 'Review'];
  const cs = state.formStep;
  return `
    <div class="page-banner">
      <div class="container">
        <h1>Application Form</h1>
        <p>${state.selectedScheme ? i18n.td(DATA.schemes.find(s => s.id === state.selectedScheme)?.title) || '' : 'Select a scheme to apply'}</p>
        <div class="breadcrumb"><a href="#home" onclick="navigate('home'); return false;">Home</a> <i class="ri-arrow-right-s-line"></i> Apply</div>
      </div>
    </div>
    <section class="section">
      <div class="container" style="max-width:800px">
        <!-- Step Indicator -->
        <div class="step-indicator">
          ${steps.map((s, i) => `
            ${i > 0 ? `<div class="step__connector ${i < cs ? 'completed' : ''}"></div>` : ''}
            <div class="step ${i+1 === cs ? 'active' : (i+1 < cs ? 'completed' : '')}">
              <div class="step__circle">${i+1 < cs ? '<i class="ri-check-line"></i>' : i+1}</div>
              <div class="step__label">${s}</div>
            </div>
          `).join('')}
        </div>

        <!-- Form Card -->
        <div class="card">
          <div class="card__body" style="padding:var(--sp-8)">
            ${cs === 1 ? `
              <h3 class="mb-6">Personal Information</h3>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Full Name <span class="required">*</span></label>
                  <input type="text" class="form-input" id="app-name" placeholder="Enter your full name" value="${state.user.name}">
                </div>
                <div class="form-group">
                  <label class="form-label">Email Address <span class="required">*</span></label>
                  <input type="email" class="form-input" id="app-email" placeholder="you@example.com" value="${state.user.email}">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Phone Number <span class="required">*</span></label>
                  <input type="tel" class="form-input" id="app-phone" placeholder="+91 XXXXX XXXXX" value="${state.user.phone}">
                </div>
                <div class="form-group">
                  <label class="form-label">Date of Birth <span class="required">*</span></label>
                  <input type="date" class="form-input" id="app-dob">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Address <span class="required">*</span></label>
                <textarea class="form-textarea" id="app-address" rows="3" placeholder="Enter your full address"></textarea>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">District <span class="required">*</span></label>
                  <select class="form-select" id="app-district">
                    <option value="">Select District</option>
                    <option>Chennai</option><option>Coimbatore</option><option>Madurai</option><option>Salem</option><option>Tiruchirappalli</option><option>Vellore</option><option>Tirunelveli</option><option>Other</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Pin Code <span class="required">*</span></label>
                  <input type="text" class="form-input" id="app-pin" placeholder="6-digit pin code" maxlength="6">
                </div>
              </div>
            ` : cs === 2 ? `
              <h3 class="mb-6">Eligibility Details</h3>
              <div class="form-group">
                <label class="form-label">Scheme <span class="required">*</span></label>
                <select class="form-select" id="app-scheme">
                  <option value="">Select Scheme</option>
                  ${DATA.schemes.map(s => `<option value="${s.id}" ${state.selectedScheme === s.id ? 'selected' : ''}>${i18n.td(s.title)}</option>`).join('')}
                </select>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Category <span class="required">*</span></label>
                  <select class="form-select" id="app-category">
                    <option value="">Select Category</option>
                    <option>Student</option><option>Teacher</option><option>Artist</option><option>Author</option><option>Organization</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Annual Family Income</label>
                  <select class="form-select" id="app-income">
                    <option value="">Select Range</option>
                    <option>Below ₹1,00,000</option><option>₹1,00,000 – ₹3,00,000</option><option>₹3,00,000 – ₹5,00,000</option><option>Above ₹5,00,000</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Educational Qualification</label>
                <select class="form-select">
                  <option value="">Select</option>
                  <option>10th Standard</option><option>12th Standard</option><option>Undergraduate</option><option>Postgraduate</option><option>Doctorate</option><option>Other</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Institution / Organization Name</label>
                <input type="text" class="form-input" placeholder="Enter institution name">
              </div>
              <div class="form-group">
                <label class="form-label">Additional Notes</label>
                <textarea class="form-textarea" rows="3" placeholder="Any additional information relevant to your application"></textarea>
              </div>
            ` : cs === 3 ? `
              <h3 class="mb-6">Upload Documents</h3>
              <p class="caption mb-6">Upload clear scanned copies or photographs of the required documents. Accepted formats: PDF, JPG, PNG (max 5MB each)</p>
              <div class="grid grid--2">
                ${['Aadhaar Card', 'Income Certificate', 'Educational Marksheet', 'Community Certificate', 'Bank Passbook', 'Passport Photo'].map(doc => `
                  <div class="form-group">
                    <label class="form-label">${doc}</label>
                    <div class="file-upload" onclick="this.querySelector('input').click()">
                      <input type="file" style="display:none" accept=".pdf,.jpg,.png" onchange="this.parentElement.querySelector('.file-upload__text').innerHTML='<span>✓ '+this.files[0].name+'</span>'">
                      <i class="ri-upload-cloud-line"></i>
                      <div class="file-upload__text"><span>Click to upload</span> or drag & drop</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <h3 class="mb-6">Review & Submit</h3>
              <p class="caption mb-6">Please review all the information before submitting your application.</p>
              <div class="card mb-4" style="border:1px solid var(--clr-border-light)">
                <div class="card__body">
                  <h4 class="mb-4" style="color:var(--clr-primary)"><i class="ri-user-line"></i> Personal Information</h4>
                  <div class="grid grid--2" style="gap:var(--sp-3)">
                    <p class="caption"><strong>Name:</strong> ${state.user.name}</p>
                    <p class="caption"><strong>Email:</strong> ${state.user.email}</p>
                    <p class="caption"><strong>Phone:</strong> ${state.user.phone}</p>
                    <p class="caption"><strong>District:</strong> Chennai</p>
                  </div>
                </div>
              </div>
              <div class="card mb-4" style="border:1px solid var(--clr-border-light)">
                <div class="card__body">
                  <h4 class="mb-4" style="color:var(--clr-primary)"><i class="ri-file-text-line"></i> Scheme Details</h4>
                  <p class="caption"><strong>Scheme:</strong> ${state.selectedScheme ? DATA.schemes.find(s => s.id === state.selectedScheme)?.title : 'Not selected'}</p>
                  <p class="caption mt-2"><strong>Category:</strong> Student</p>
                </div>
              </div>
              <div class="card mb-6" style="border:1px solid var(--clr-border-light)">
                <div class="card__body">
                  <h4 class="mb-4" style="color:var(--clr-primary)"><i class="ri-attachment-line"></i> Documents</h4>
                  <p class="caption">6 documents uploaded</p>
                </div>
              </div>
              <label class="filter-option" style="margin-bottom:var(--sp-4)">
                <input type="checkbox" id="agree-check">
                I confirm that all information provided is accurate and I agree to the terms and conditions.
              </label>
            `}
          </div>

          <!-- Form Navigation -->
          <div class="card__footer">
            <button class="btn btn--ghost" ${cs === 1 ? 'disabled' : ''} onclick="state.formStep = Math.max(1, state.formStep-1); renderPage();">
              <i class="ri-arrow-left-line"></i> Previous
            </button>
            ${cs < 4 ? `
              <button class="btn btn--primary" onclick="state.formStep = Math.min(4, state.formStep+1); renderPage();">
                Next <i class="ri-arrow-right-line"></i>
              </button>
            ` : `
              <button class="btn btn--secondary" id="submit-app-btn" onclick="handleSubmitApplication()">
                <i class="ri-check-line"></i> Submit Application
              </button>
            `}
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ── EVENTS ── */
function renderEvents() {
  return `
    <div class="page-banner">
      <div class="container">
        <h1>${i18n.activeLang === 'ta' ? 'நிகழ்வுகள்' : (i18n.activeLang === 'ur' ? 'تقاریب' : 'Events')}</h1>
        <p>${i18n.activeLang === 'ta' ? 'கலாச்சார நிகழ்வுகள், பட்டறைகள் மற்றும் கொண்டாட்டங்கள்' : (i18n.activeLang === 'ur' ? 'ثقافتی تقریبات، ورکشاپس اور تقریبات' : 'Cultural events, workshops, conferences, and celebrations')}</p>
        <div class="breadcrumb"><a href="#home" onclick="navigate('home'); return false;">${i18n.t('nav_home')}</a> <i class="ri-arrow-right-s-line"></i> ${i18n.t('nav_events')}</div>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="grid grid--3">
          ${DATA.events.map(e => {
            const dp = formatDateParts(e.date);
            return `
            <div class="event-card animate-in">
              <div style="position:relative">
                <img class="event-card__img" src="${e.image}" alt="${i18n.td(e.title)}">
                <div class="event-card__date-badge">
                  <div class="day">${dp.day}</div>
                  <div class="month">${dp.month}</div>
                </div>
              </div>
              <div class="event-card__body">
                <div class="badge badge--primary mb-4">${e.category}</div>
                <h4 class="event-card__title">${i18n.td(e.title)}</h4>
                <div class="event-card__meta">
                  <span><i class="ri-time-line"></i> ${e.time}</span>
                  <span><i class="ri-map-pin-line"></i> ${e.location.split(',')[0]}</span>
                </div>
                <p class="card__desc">${i18n.td(e.description).slice(0, 100)}…</p>
                <button class="btn btn--outline btn--sm" onclick="navigate('event-detail', {selectedEvent: ${e.id}})">${i18n.t('view_all')} <i class="ri-arrow-right-line"></i></button>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
    </section>
  `;
}

/* ── EVENT DETAIL ── */
function renderEventDetail() {
  const e = DATA.events.find(ev => ev.id === state.selectedEvent);
  if (!e) return renderEvents();
  return `
    <div class="page-banner">
      <div class="container">
        <h1>${i18n.td(e.title)}</h1>
        <div class="breadcrumb">
          <a href="#home" onclick="navigate('home'); return false;">${i18n.t('nav_home')}</a> <i class="ri-arrow-right-s-line"></i>
          <a href="#events" onclick="navigate('events'); return false;">${i18n.t('nav_events')}</a> <i class="ri-arrow-right-s-line"></i> ${i18n.activeLang === 'ta' ? 'விவரங்கள்' : (i18n.activeLang === 'ur' ? 'تفصیلات' : 'Details')}
        </div>
      </div>
    </div>
    <section class="section">
      <div class="container" style="max-width:900px">
        <div class="card mb-8">
          <img src="${e.image}" alt="${i18n.td(e.title)}" style="width:100%;height:400px;object-fit:cover;">
          <div class="card__body" style="padding:var(--sp-8)">
            <div class="badge badge--primary mb-4">${e.category}</div>
            <h2 class="mb-4">${i18n.td(e.title)}</h2>
            <div class="flex gap-4 mb-6" style="flex-wrap:wrap">
              <span class="caption"><i class="ri-calendar-line text-primary"></i> ${formatDate(e.date)}</span>
              <span class="caption"><i class="ri-time-line text-primary"></i> ${e.time}</span>
              <span class="caption"><i class="ri-map-pin-line text-primary"></i> ${e.location}</span>
            </div>
            <p style="font-size:var(--fs-md);color:var(--clr-text-secondary);line-height:var(--lh-relaxed);margin-bottom:var(--sp-6)">${i18n.td(e.description)}</p>
            <p style="font-size:var(--fs-md);color:var(--clr-text-secondary);line-height:var(--lh-relaxed);margin-bottom:var(--sp-8)">${i18n.activeLang === 'ta' ? 'உருது மொழி மற்றும் கலாச்சாரத்தை கொண்டாடும் இந்த அற்புதமான நிகழ்வில் எங்களுடன் சேருங்கள்.' : (i18n.activeLang === 'ur' ? 'اردو زبان اور ثقافت کا جشن منانے والی اس شاندار تقریب میں ہمارے ساتھ شامل ہوں۔' : 'Join us for this remarkable event celebrating Urdu language and culture. This event is open to all residents of Tamil Nadu. Prior registration is recommended for better arrangements.')}</p>
            <div class="flex gap-4">
              <button class="btn btn--primary btn--lg" onclick="showToast('success', 'Registered!', 'You have been registered for this event.')"><i class="ri-check-line"></i> ${i18n.activeLang === 'ta' ? 'பதிவு செய்க' : (i18n.activeLang === 'ur' ? 'رجسٹر کریں' : 'Register for Event')}</button>
              <button class="btn btn--outline btn--lg" onclick="showToast('info', 'Shared!', 'Event link copied to clipboard.')"><i class="ri-share-line"></i> ${i18n.activeLang === 'ta' ? 'பகிர்க' : (i18n.activeLang === 'ur' ? 'شیئر کریں' : 'Share')}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ── ANNOUNCEMENTS ── */
function renderAnnouncements() {
  return `
    <div class="page-banner">
      <div class="container">
        <h1>${i18n.t('nav_announcements')}</h1>
        <p>${i18n.activeLang === 'ta' ? 'அகாதெமியிலிருந்து சமீபத்திய செய்திகள் மற்றும் அறிவிப்புகள்' : (i18n.activeLang === 'ur' ? 'اکیڈمی کی جانب سے تازہ ترین خبریں اور اعلانات' : 'Latest news, updates, and notifications from the Academy')}</p>
        <div class="breadcrumb"><a href="#home" onclick="navigate('home'); return false;">${i18n.t('nav_home')}</a> <i class="ri-arrow-right-s-line"></i> ${i18n.t('nav_announcements')}</div>
      </div>
    </div>
    <section class="section">
      <div class="container" style="max-width:900px">
        ${DATA.announcements.map(a => {
          const dp = formatDateParts(a.date);
          // Pre-escape quotes for the openModal payload
          const safeTitle = i18n.td(a.title).replace(/'/g, "\\'").replace(/"/g, '&quot;');
          const safeContent = i18n.td(a.content).replace(/'/g, "\\'").replace(/"/g, '&quot;');
          
          return `
          <div class="card mb-4 animate-in" style="cursor:pointer" onclick="openModal(\`
            <h3 style='margin-bottom:var(--sp-4)'>\${'${safeTitle}'}</h3>
            <span class='badge badge--primary'>${a.category}</span>
            <p class='caption mt-4'>${formatDate(a.date)}</p>
            <p style='margin-top:var(--sp-4);color:var(--clr-text-secondary);line-height:var(--lh-relaxed)'>\${'${safeContent}'}</p>
          \`)">
            <div class="card__body">
              <div class="announcement-item" style="border-bottom:none;padding:0;">
                <div class="announcement__date">
                  <div class="announcement__date-day">${dp.day}</div>
                  <div class="announcement__date-month">${dp.month}</div>
                </div>
                <div class="announcement__content">
                  <div class="flex gap-3 mb-2"><span class="badge badge--primary">${a.category}</span></div>
                  <h4>${i18n.td(a.title)}</h4>
                  <p>${i18n.td(a.content).slice(0, 120)}…</p>
                </div>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </section>
  `;
}

/* ── GALLERY ── */
function renderGallery() {
  return `
    <div class="page-banner">
      <div class="container">
        <h1>${i18n.t('nav_gallery')}</h1>
        <p>${i18n.activeLang === 'ta' ? 'எங்கள் நிகழ்வுகள் மற்றும் பட்டறைகளின் காட்சிகள்' : (i18n.activeLang === 'ur' ? 'ہماری تقریبات اور ورکشاپس کی جھلکیاں' : 'Visual memories of our events, workshops, and cultural celebrations')}</p>
        <div class="breadcrumb"><a href="#home" onclick="navigate('home'); return false;">${i18n.t('nav_home')}</a> <i class="ri-arrow-right-s-line"></i> ${i18n.t('nav_gallery')}</div>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="gallery-grid">
          ${DATA.gallery.map((g, i) => `
            <div class="gallery-item animate-in" onclick="openLightbox(${i})">
              <img src="${g.src}" alt="${i18n.td(g.caption)}">
              <div class="gallery-item__overlay"><i class="ri-zoom-in-line"></i></div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

/* ── CONTACT ── */
function renderContact() {
  return `
    <div class="page-banner">
      <div class="container">
        <h1>Contact Us</h1>
        <p>Get in touch with Tamil Nadu Urdu State Academy</p>
        <div class="breadcrumb"><a href="#home" onclick="navigate('home'); return false;">Home</a> <i class="ri-arrow-right-s-line"></i> Contact</div>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <!-- Form -->
          <div>
            <h3 class="mb-6">Send us a Message</h3>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Full Name <span class="required">*</span></label>
                <input type="text" class="form-input" id="contact-name" placeholder="Your name">
              </div>
              <div class="form-group">
                <label class="form-label">Email <span class="required">*</span></label>
                <input type="email" class="form-input" id="contact-email" placeholder="you@example.com">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Subject</label>
              <input type="text" class="form-input" id="contact-subject" placeholder="What is this about?">
            </div>
            <div class="form-group">
              <label class="form-label">Message <span class="required">*</span></label>
              <textarea class="form-textarea" id="contact-message" placeholder="Write your message here…" rows="5"></textarea>
            </div>
            <button class="btn btn--primary btn--lg" onclick="handleContactSubmit()"><i class="ri-send-plane-line"></i> Send Message</button>
          </div>
          <!-- Info -->
          <div>
            <h3 class="mb-6">Contact Information</h3>
            <div class="contact-info-card">
              <div class="contact-info-card__icon"><i class="ri-map-pin-line"></i></div>
              <div>
                <h4>Address</h4>
                <p>No. 45, Anna Salai, Guindy<br>Chennai – 600002, Tamil Nadu</p>
              </div>
            </div>
            <div class="contact-info-card">
              <div class="contact-info-card__icon"><i class="ri-phone-line"></i></div>
              <div>
                <h4>Phone</h4>
                <p>+91 44 2852 1234<br>+91 44 2852 5678</p>
              </div>
            </div>
            <div class="contact-info-card">
              <div class="contact-info-card__icon"><i class="ri-mail-line"></i></div>
              <div>
                <h4>Email</h4>
                <p>info@tnurduacademy.gov.in<br>support@tnurduacademy.gov.in</p>
              </div>
            </div>
            <div class="contact-info-card">
              <div class="contact-info-card__icon"><i class="ri-time-line"></i></div>
              <div>
                <h4>Working Hours</h4>
                <p>Monday – Saturday<br>9:30 AM – 5:30 PM</p>
              </div>
            </div>
            <div class="map-container">
              <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=80.20%2C13.00%2C80.30%2C13.10&layer=mapnik" allowfullscreen loading="lazy"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ── LOGIN ── */
function renderLogin() {
  return `
    <div class="split-layout">
      <div class="split-layout__visual">
        <div class="split-layout__visual-content">
          <div style="width:72px;height:72px;border-radius:var(--radius-lg);background:rgba(200,169,81,0.2);color:var(--clr-secondary);display:flex;align-items:center;justify-content:center;font-size:2rem;margin:0 auto var(--sp-6)">
            <i class="ri-government-line"></i>
          </div>
          <h2>Tamil Nadu<br>Urdu Academy</h2>
          <p>Access your applications, track status, and manage your profile on the official platform.</p>
        </div>
        <div class="urdu-decorative">اردو</div>
      </div>
      <div class="split-layout__form">
        <div class="split-layout__form-inner">
          <h2>Welcome Back</h2>
          <p class="caption">Sign in to your account to continue</p>
          <form onsubmit="handleLogin(event)">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-input" id="login-email" placeholder="you@example.com" value="irfan@example.com" required>
            </div>
            <div class="form-group">
              <label class="form-label">Password</label>
              <input type="password" class="form-input" id="login-password" placeholder="Enter your password" value="password" required>
            </div>
            <div class="flex-between mb-6">
              <label class="filter-option" style="font-size:var(--fs-xs)"><input type="checkbox" checked> Remember me</label>
              <a href="#" style="font-size:var(--fs-xs);color:var(--clr-primary);font-weight:600">Forgot Password?</a>
            </div>
            <button type="submit" class="btn btn--primary btn--lg btn--full"><i class="ri-login-box-line"></i> Sign In</button>
          </form>
          <div class="form-divider">or</div>
          <button class="btn btn--outline btn--full" onclick="handleAdminLogin()"><i class="ri-shield-user-line"></i> Sign in as Admin</button>
          <div class="auth-switch">
            Don't have an account? <a href="#register" onclick="navigate('register'); return false;">Register here</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ── REGISTER ── */
function renderRegister() {
  return `
    <div class="split-layout">
      <div class="split-layout__visual">
        <div class="split-layout__visual-content">
          <div style="width:72px;height:72px;border-radius:var(--radius-lg);background:rgba(200,169,81,0.2);color:var(--clr-secondary);display:flex;align-items:center;justify-content:center;font-size:2rem;margin:0 auto var(--sp-6)">
            <i class="ri-user-add-line"></i>
          </div>
          <h2>Join the<br>Academy Platform</h2>
          <p>Create an account to apply for schemes, register for events, and track your applications.</p>
        </div>
        <div class="urdu-decorative">ع</div>
      </div>
      <div class="split-layout__form">
        <div class="split-layout__form-inner">
          <h2>Create Account</h2>
          <p class="caption">Fill in your details to get started</p>
          <form onsubmit="handleRegister(event)">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">First Name <span class="required">*</span></label>
                <input type="text" class="form-input" placeholder="First name" required>
              </div>
              <div class="form-group">
                <label class="form-label">Last Name <span class="required">*</span></label>
                <input type="text" class="form-input" placeholder="Last name" required>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Email Address <span class="required">*</span></label>
              <input type="email" class="form-input" placeholder="you@example.com" required>
            </div>
            <div class="form-group">
              <label class="form-label">Phone Number <span class="required">*</span></label>
              <input type="tel" class="form-input" placeholder="+91 XXXXX XXXXX" required>
            </div>
            <div class="form-group">
              <label class="form-label">Password <span class="required">*</span></label>
              <input type="password" class="form-input" placeholder="Minimum 8 characters" required>
              <div class="form-help">Use at least 8 characters with a mix of letters and numbers</div>
            </div>
            <div class="form-group">
              <label class="form-label">Confirm Password <span class="required">*</span></label>
              <input type="password" class="form-input" placeholder="Re-enter password" required>
            </div>
            <label class="filter-option mb-6" style="font-size:var(--fs-xs)">
              <input type="checkbox" required> I agree to the <a href="#" style="color:var(--clr-primary);font-weight:600">Terms & Conditions</a>
            </label>
            <button type="submit" class="btn btn--primary btn--lg btn--full"><i class="ri-user-add-line"></i> Create Account</button>
          </form>
          <div class="auth-switch">
            Already have an account? <a href="#login" onclick="navigate('login'); return false;">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ── USER DASHBOARD ── */
function renderDashboard() {
  const tabs = [
    { id: 'applications', icon: 'ri-file-list-3-line', label: 'My Applications' },
    { id: 'notifications', icon: 'ri-notification-3-line', label: 'Notifications' },
    { id: 'profile', icon: 'ri-user-settings-line', label: 'Profile' }
  ];
  return `
    <div class="dashboard-layout">
      <aside class="sidebar">
        <div class="sidebar__header">
          <div class="sidebar__user">
            <div class="sidebar__avatar">${state.user.initials}</div>
            <div>
              <div class="sidebar__name">${state.user.name}</div>
              <div class="sidebar__role">Applicant</div>
            </div>
          </div>
        </div>
        <nav class="sidebar__nav">
          ${tabs.map(t => `
            <div class="sidebar__link ${state.dashboardTab === t.id ? 'active' : ''}" onclick="state.dashboardTab='${t.id}'; renderPage();">
              <i class="${t.icon}"></i> ${t.label}
            </div>
          `).join('')}
          <div class="sidebar__link" onclick="state.isLoggedIn=false; showToast('info','Logged Out','See you next time.'); navigate('home');">
            <i class="ri-logout-box-line"></i> Logout
          </div>
        </nav>
      </aside>
      <div class="dashboard-main">
        ${state.dashboardTab === 'applications' ? renderDashboardApplications() :
          state.dashboardTab === 'notifications' ? renderDashboardNotifications() :
          renderDashboardProfile()}
      </div>
    </div>
  `;
}

function renderDashboardApplications() {
  return `
    <div class="dashboard-header">
      <div class="flex-between">
        <div>
          <h2>My Applications</h2>
          <p>Track and manage your scheme applications</p>
        </div>
        <button class="btn btn--primary" onclick="navigate('apply')"><i class="ri-add-line"></i> New Application</button>
      </div>
    </div>
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Scheme</th>
            <th>Submitted</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${DATA.userApplications.map(a => `
            <tr>
              <td><strong>${a.id}</strong></td>
              <td>${a.scheme}</td>
              <td>${formatDate(a.date)}</td>
              <td>${statusBadge(a.status)}</td>
              <td><button class="btn btn--ghost btn--sm" onclick="openModal('<h3>Application ${a.id}</h3><p class=\\'mt-4 caption\\'>Scheme: ${a.scheme}</p><p class=\\'caption\\'>Status: ${a.status}</p><p class=\\'mt-4 text-secondary\\'>Your application is currently ${a.status}. You will receive a notification when there is an update.</p>')">View</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderDashboardNotifications() {
  return `
    <div class="dashboard-header">
      <h2>Notifications</h2>
      <p>Stay updated with your application status and Academy news</p>
    </div>
    ${DATA.notifications.map(n => `
      <div class="notification-item ${n.unread ? 'notification-item--unread' : ''}">
        <i class="${n.icon}"></i>
        <div>
          <h5>${n.title}</h5>
          <p>${n.message}</p>
          <div class="time">${n.time}</div>
        </div>
      </div>
    `).join('')}
  `;
}

function renderDashboardProfile() {
  return `
    <div class="dashboard-header">
      <h2>Profile Settings</h2>
      <p>Update your personal information and preferences</p>
    </div>
    <div class="card" style="max-width:700px">
      <div class="card__body" style="padding:var(--sp-8)">
        <div class="flex gap-4 mb-8" style="align-items:center">
          <div class="sidebar__avatar" style="width:72px;height:72px;font-size:var(--fs-2xl)">${state.user.initials}</div>
          <div>
            <h4>${state.user.name}</h4>
            <p class="caption">Applicant • Joined April 2026</p>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" value="${state.user.name}">
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-input" value="${state.user.email}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input type="tel" class="form-input" value="${state.user.phone}">
          </div>
          <div class="form-group">
            <label class="form-label">District</label>
            <select class="form-select"><option>Chennai</option><option>Madurai</option><option>Coimbatore</option></select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Address</label>
          <textarea class="form-textarea" rows="3">No. 12, Periyar Street, Guindy, Chennai - 600032</textarea>
        </div>
        <button class="btn btn--primary" onclick="showToast('success', 'Saved!', 'Your profile has been updated.')"><i class="ri-check-line"></i> Save Changes</button>
      </div>
    </div>
  `;
}

/* ── ADMIN DASHBOARD ── */
function renderAdmin() {
  const tabs = [
    { id: 'overview', icon: 'ri-dashboard-3-line', label: 'Overview' },
    { id: 'schemes', icon: 'ri-file-list-3-line', label: 'Manage Schemes' },
    { id: 'applications', icon: 'ri-inbox-line', label: 'Applications' },
    { id: 'announcements', icon: 'ri-megaphone-line', label: 'Announcements' }
  ];
  return `
    <div class="dashboard-layout">
      <aside class="sidebar">
        <div class="sidebar__header">
          <div class="sidebar__user">
            <div class="sidebar__avatar" style="background:linear-gradient(135deg,var(--clr-secondary-dark),var(--clr-secondary))">A</div>
            <div>
              <div class="sidebar__name">Admin Panel</div>
              <div class="sidebar__role">Super Admin</div>
            </div>
          </div>
        </div>
        <nav class="sidebar__nav">
          ${tabs.map(t => `
            <div class="sidebar__link ${state.adminTab === t.id ? 'active' : ''}" onclick="state.adminTab='${t.id}'; renderPage();">
              <i class="${t.icon}"></i> ${t.label}
            </div>
          `).join('')}
          <div class="sidebar__link" onclick="state.isLoggedIn=false; state.isAdmin=false; showToast('info','Logged Out','Admin session ended.'); navigate('home');">
            <i class="ri-logout-box-line"></i> Logout
          </div>
        </nav>
      </aside>
      <div class="dashboard-main">
        ${state.adminTab === 'overview' ? renderAdminOverview() :
          state.adminTab === 'schemes' ? renderAdminSchemes() :
          state.adminTab === 'applications' ? renderAdminApplications() :
          renderAdminAnnouncements()}
      </div>
    </div>
  `;
}

function renderAdminOverview() {
  const s = DATA.admin.stats;
  return `
    <div class="dashboard-header">
      <h2>Dashboard Overview</h2>
      <p>Key metrics and recent activity</p>
    </div>
    <div class="grid grid--4 mb-8">
      <div class="admin-stat">
        <div class="admin-stat__icon admin-stat__icon--blue"><i class="ri-group-line"></i></div>
        <div>
          <div class="admin-stat__number">${s.totalUsers.toLocaleString()}</div>
          <div class="admin-stat__label">Total Users</div>
        </div>
      </div>
      <div class="admin-stat">
        <div class="admin-stat__icon admin-stat__icon--gold"><i class="ri-file-text-line"></i></div>
        <div>
          <div class="admin-stat__number">${s.totalApplications.toLocaleString()}</div>
          <div class="admin-stat__label">Applications</div>
        </div>
      </div>
      <div class="admin-stat">
        <div class="admin-stat__icon admin-stat__icon--green"><i class="ri-check-double-line"></i></div>
        <div>
          <div class="admin-stat__number">${s.approvals.toLocaleString()}</div>
          <div class="admin-stat__label">Approved</div>
        </div>
      </div>
      <div class="admin-stat">
        <div class="admin-stat__icon admin-stat__icon--red"><i class="ri-time-line"></i></div>
        <div>
          <div class="admin-stat__number">${s.pendingReview}</div>
          <div class="admin-stat__label">Pending Review</div>
        </div>
      </div>
    </div>

    <h3 class="mb-4">Recent Applications</h3>
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr><th>ID</th><th>User</th><th>Scheme</th><th>Date</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          ${DATA.admin.recentApplications.slice(0, 5).map(a => `
            <tr>
              <td><strong>${a.id}</strong></td>
              <td>${a.user}</td>
              <td>${a.scheme}</td>
              <td>${formatDate(a.date)}</td>
              <td>${statusBadge(a.status)}</td>
              <td>
                <div class="flex gap-2">
                  ${a.status === 'pending' ? `
                    <button class="btn btn--sm" style="background:var(--clr-success);color:#fff;padding:4px 10px;font-size:11px" onclick="showToast('success','Approved','Application ${a.id} has been approved.')">Approve</button>
                    <button class="btn btn--sm" style="background:var(--clr-danger);color:#fff;padding:4px 10px;font-size:11px" onclick="showToast('error','Rejected','Application ${a.id} has been rejected.')">Reject</button>
                  ` : `<span class="caption">—</span>`}
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderAdminSchemes() {
  return `
    <div class="dashboard-header">
      <div class="flex-between">
        <div>
          <h2>Manage Schemes</h2>
          <p>Add, edit, or remove government schemes</p>
        </div>
        <button class="btn btn--primary" onclick="showToast('info', 'Coming Soon', 'Add Scheme form will be available here.')"><i class="ri-add-line"></i> Add Scheme</button>
      </div>
    </div>
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr><th>Scheme</th><th>Category</th><th>Deadline</th><th>Tags</th><th>Actions</th></tr>
        </thead>
        <tbody>
          ${DATA.schemes.map(s => `
            <tr>
              <td><strong>${s.title}</strong></td>
              <td>${s.category}</td>
              <td>${formatDate(s.deadline)}</td>
              <td>${s.tags.map(t => `<span class="tag">${t}</span>`).join(' ')}</td>
              <td>
                <div class="flex gap-2">
                  <button class="btn btn--ghost btn--sm" onclick="showToast('info','Edit','Editing ${s.title}')"><i class="ri-edit-line"></i></button>
                  <button class="btn btn--ghost btn--sm" style="color:var(--clr-danger)" onclick="showToast('warning','Delete','Are you sure you want to delete this scheme?')"><i class="ri-delete-bin-line"></i></button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderAdminApplications() {
  return `
    <div class="dashboard-header">
      <h2>All Applications</h2>
      <p>Review and manage user applications</p>
    </div>
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr><th>ID</th><th>User</th><th>Scheme</th><th>Date</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          ${DATA.admin.recentApplications.map(a => `
            <tr>
              <td><strong>${a.id}</strong></td>
              <td>${a.user}</td>
              <td>${a.scheme}</td>
              <td>${formatDate(a.date)}</td>
              <td>${statusBadge(a.status)}</td>
              <td>
                <div class="flex gap-2">
                  ${a.status === 'pending' ? `
                    <button class="btn btn--sm" style="background:var(--clr-success);color:#fff;padding:4px 10px;font-size:11px" onclick="showToast('success','Approved','Application ${a.id} has been approved.')">Approve</button>
                    <button class="btn btn--sm" style="background:var(--clr-danger);color:#fff;padding:4px 10px;font-size:11px" onclick="showToast('error','Rejected','Application ${a.id} has been rejected.')">Reject</button>
                  ` : `
                    <button class="btn btn--ghost btn--sm" onclick="openModal('<h3>${a.id}</h3><p class=\\'mt-4 caption\\'>User: ${a.user}</p><p class=\\'caption\\'>Scheme: ${a.scheme}</p><p class=\\'caption\\'>Status: ${a.status}</p>')">View</button>
                  `}
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderAdminAnnouncements() {
  return `
    <div class="dashboard-header">
      <div class="flex-between">
        <div>
          <h2>Manage Announcements</h2>
          <p>Create, edit, and manage announcements</p>
        </div>
        <button class="btn btn--primary" onclick="openModal(\`
          <h3 style='margin-bottom:var(--sp-6)'>Create Announcement</h3>
          <div class='form-group'>
            <label class='form-label'>Title</label>
            <input type='text' class='form-input' placeholder='Announcement title'>
          </div>
          <div class='form-group'>
            <label class='form-label'>Content</label>
            <textarea class='form-textarea' rows='4' placeholder='Write the announcement…'></textarea>
          </div>
          <div class='form-group'>
            <label class='form-label'>Category</label>
            <select class='form-select'><option>General</option><option>Scheme</option><option>Event</option><option>Results</option></select>
          </div>
          <div class='flex gap-3'>
            <button class='btn btn--primary' onclick='showToast(\"success\",\"Published\",\"Announcement has been published.\"); closeModal();'>Publish</button>
            <button class='btn btn--outline' onclick='showToast(\"info\",\"Saved\",\"Draft saved.\"); closeModal();'>Save Draft</button>
          </div>
        \`)"><i class="ri-add-line"></i> New Announcement</button>
      </div>
    </div>
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr><th>Title</th><th>Date</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          ${DATA.admin.announcements.map(a => `
            <tr>
              <td><strong>${a.title}</strong></td>
              <td>${formatDate(a.date)}</td>
              <td>${statusBadge(a.status)}</td>
              <td>
                <div class="flex gap-2">
                  <button class="btn btn--ghost btn--sm" onclick="showToast('info','Edit','Editing announcement')"><i class="ri-edit-line"></i></button>
                  <button class="btn btn--ghost btn--sm" style="color:var(--clr-danger)" onclick="showToast('warning','Confirm','Are you sure you want to delete this?')"><i class="ri-delete-bin-line"></i></button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

/* ============================================================
   EVENT HANDLERS
   ============================================================ */
function handleLogin(e) {
  e.preventDefault();
  state.isLoggedIn = true;
  state.isAdmin = false;
  showToast('success', 'Welcome!', `Signed in as ${state.user.name}`);
  navigate('dashboard');
}

function handleAdminLogin() {
  state.isLoggedIn = true;
  state.isAdmin = true;
  showToast('success', 'Admin Access', 'Signed in as Administrator');
  navigate('admin');
}

function handleRegister(e) {
  e.preventDefault();
  state.isLoggedIn = true;
  showToast('success', 'Account Created!', 'Welcome to Tamil Nadu Urdu State Academy');
  navigate('dashboard');
}

function handleSubmitApplication() {
  const cb = document.getElementById('agree-check');
  if (!cb || !cb.checked) {
    showToast('warning', 'Required', 'Please agree to the terms and conditions.');
    return;
  }
  showToast('success', 'Application Submitted!', 'Your application has been received. Track it from your dashboard.');
  state.formStep = 1;
  if (state.isLoggedIn) {
    navigate('dashboard');
  } else {
    navigate('login');
  }
}

function handleContactSubmit() {
  const name = document.getElementById('contact-name')?.value;
  const email = document.getElementById('contact-email')?.value;
  const msg = document.getElementById('contact-message')?.value;
  if (!name || !email || !msg) {
    showToast('warning', 'Incomplete', 'Please fill in all required fields.');
    return;
  }
  showToast('success', 'Message Sent!', 'We will get back to you within 2 business days.');
}

function bindPageEvents() {
  // Initialize hero carousel if present
  initHeroCarousel();

  // Initialize officials carousel if present
  initOfficialsCarousel();

  // Initialize announcement ticker if present (now rendered inside home page)
  initAnnouncementTicker();
}

/* ── HERO CAROUSEL ── */
let carouselTimer = null;
let currentSlide = 0;
const SLIDE_COUNT = 4;
const AUTOPLAY_INTERVAL = 5000;

function initHeroCarousel() {
  const carousel = document.getElementById('hero-carousel');
  if (!carousel) return;

  currentSlide = 0;
  clearInterval(carouselTimer);

  // Arrow navigation
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide((currentSlide - 1 + SLIDE_COUNT) % SLIDE_COUNT));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide((currentSlide + 1) % SLIDE_COUNT));

  // Dot navigation
  const dots = document.querySelectorAll('.hero-carousel__dot');
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.dot, 10);
      goToSlide(idx);
    });
  });

  // Pause on hover
  carousel.addEventListener('mouseenter', () => clearInterval(carouselTimer));
  carousel.addEventListener('mouseleave', () => startAutoplay());

  // Keyboard navigation for the carousel
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { goToSlide((currentSlide - 1 + SLIDE_COUNT) % SLIDE_COUNT); e.preventDefault(); }
    if (e.key === 'ArrowRight') { goToSlide((currentSlide + 1) % SLIDE_COUNT); e.preventDefault(); }
  });

  // Make carousel focusable for keyboard
  carousel.setAttribute('tabindex', '0');

  // Start autoplay
  startAutoplay();
}

function startAutoplay() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    goToSlide((currentSlide + 1) % SLIDE_COUNT);
  }, AUTOPLAY_INTERVAL);
}

function goToSlide(index) {
  if (index === currentSlide) return;

  const slides = document.querySelectorAll('.hero-carousel__slide');
  const dots = document.querySelectorAll('.hero-carousel__dot');
  if (!slides.length) return;

  // Remove active from current
  slides[currentSlide].classList.remove('active');
  slides[currentSlide].setAttribute('aria-hidden', 'true');
  dots[currentSlide]?.classList.remove('active');
  dots[currentSlide]?.setAttribute('aria-selected', 'false');

  // Set new active
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  slides[currentSlide].setAttribute('aria-hidden', 'false');
  dots[currentSlide]?.classList.add('active');
  dots[currentSlide]?.setAttribute('aria-selected', 'true');

  // Restart autoplay timer
  startAutoplay();
}

/* ── OFFICIALS CAROUSEL ── */
function initOfficialsCarousel() {
  const track = document.getElementById('officials-track');
  if (!track) return;

  const prevBtn = document.getElementById('officials-prev');
  const nextBtn = document.getElementById('officials-next');
  const scrollAmount = 220;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Update arrow visibility based on scroll position
  function updateArrows() {
    if (prevBtn) prevBtn.style.opacity = track.scrollLeft <= 10 ? '0.3' : '1';
    if (nextBtn) nextBtn.style.opacity = track.scrollLeft >= (track.scrollWidth - track.clientWidth - 10) ? '0.3' : '1';
  }
  track.addEventListener('scroll', updateArrows);
  setTimeout(updateArrows, 100);
}

/* ── ANNOUNCEMENT TICKER ── */
function initAnnouncementTicker() {
  const track = document.getElementById('ticker-track');
  if (!track || !DATA.tickerItems) return;

  // Build ticker content (duplicate for seamless loop)
  const buildTickerHTML = () => {
    return DATA.tickerItems.map(item =>
      `<a href="#${item.link}" class="ticker__item" onclick="navigate('${item.link}'); return false;">
        <i class="${item.icon}"></i>
        <span>${i18n.td(item.text)}</span>
      </a>
      <span class="ticker__divider">◆</span>`
    ).join('');
  };

  // Inject content three times for seamless infinite scroll
  const content = buildTickerHTML();
  track.innerHTML = content + content + content;

  // Pause on hover
  const ticker = document.getElementById('announcement-ticker');
  if (ticker) {
    ticker.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('mouseleave', () => {
      if (!ticker.classList.contains('paused')) {
        track.style.animationPlayState = 'running';
      }
    });
  }

  // Pause/Play button
  const pauseBtn = document.getElementById('ticker-pause-btn');
  if (pauseBtn && ticker) {
    pauseBtn.addEventListener('click', () => {
      const isPaused = ticker.classList.toggle('paused');
      track.style.animationPlayState = isPaused ? 'paused' : 'running';
      pauseBtn.innerHTML = isPaused
        ? '<i class="ri-play-mini-fill"></i>'
        : '<i class="ri-pause-mini-fill"></i>';
      pauseBtn.setAttribute('aria-label', isPaused ? 'Play ticker' : 'Pause ticker');
    });
  }
}

/* ============================================================
   INITIALIZATION
   ============================================================ */
function init() {
  // Hash-based routing
  function handleHash() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const validPages = ['home','about','schemes','scheme-detail','events','event-detail','announcements','gallery','contact','login','register','apply','dashboard','admin'];
    if (validPages.includes(hash)) {
      state.currentPage = hash;
    } else {
      state.currentPage = 'home';
    }
    renderPage();
    updateNav();
  }

  window.addEventListener('hashchange', handleHash);

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
  });

  // Hamburger
  document.getElementById('hamburger-btn').addEventListener('click', () => {
    document.getElementById('hamburger-btn').classList.toggle('open');
    document.getElementById('mobile-nav').classList.toggle('open');
  });

  // Mobile nav links
  document.querySelectorAll('.mobile-nav__links a').forEach(link => {
    link.addEventListener('click', () => closeMobileNav());
  });

  // Modal close
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Lightbox controls
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', () => lightboxNav(-1));
  document.getElementById('lightbox-next').addEventListener('click', () => lightboxNav(1));
  document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(); closeLightbox(); }
    if (document.getElementById('lightbox').classList.contains('open')) {
      if (e.key === 'ArrowLeft') lightboxNav(-1);
      if (e.key === 'ArrowRight') lightboxNav(1);
    }
  });

  // Dashboard button — update based on login state
  const dashBtn = document.getElementById('nav-dashboard-btn');
  if (dashBtn) {
    dashBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(state.isAdmin ? 'admin' : 'dashboard');
    });
  }

  // Initial render
  handleHash();

  // Show announcement modal on home page
  if (state.currentPage === 'home') {
    showAnnouncementModal();
  }
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
