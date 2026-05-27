/**
 * ==========================================================================
 * NEW AKSHAT FASHION — BRAND NAVBAR DYNAMIC TEMPLATE
 * Premium mobile navigation · Balenciaga / Saint Laurent inspiration
 * ==========================================================================
 */

const NAVBAR_HTML = `
  <nav class="navbar" id="navbar">
    <div class="navbar-container">

      <!-- Brand Logo -->
      <a href="index.html" class="brand-logo" id="nav-brand-link" aria-label="New Akshat Fashion Home">
        <span class="brand-title">NEW AKSHAT FASHION</span>
      </a>

      <!-- Desktop Navigation Links -->
      <div class="nav-links-desktop">
        <div class="nav-links-group">
          <a href="index.html"      class="nav-link" id="nav-home">Home<span class="underline"></span></a>
          <a href="collection.html" class="nav-link" id="nav-collections">Collections<span class="underline"></span></a>
          <a href="about.html"      class="nav-link" id="nav-about">About<span class="underline"></span></a>
          <a href="contact.html"    class="nav-link" id="nav-contact">Contact<span class="underline"></span></a>
        </div>
        <div class="nav-socials">
          <a href="https://www.instagram.com/akshat_family_wear_/" target="_blank" rel="noopener noreferrer" class="social-icon" title="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="https://wa.me/919327620020" target="_blank" rel="noopener noreferrer" class="social-icon" title="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="header-whatsapp" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326z"/></svg>
          </a>
          <a href="visit.html" class="nav-btn" id="nav-visit-btn">Visit Showroom</a>
        </div>
      </div>

      <!-- Mobile Hamburger — circular bordered -->
      <button class="mobile-toggle" id="mobile-toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-menu">
        <span class="ham-line"></span>
        <span class="ham-line ham-line--mid"></span>
        <span class="ham-line"></span>
      </button>
    </div>
  </nav>

  <!-- =======================================================
       MOBILE MENU OVERLAY (outside nav, fixed full-screen)
       Slide-in panel · Premium fashion brand style
       ======================================================= -->
  <div class="mm-overlay" id="mm-overlay" aria-hidden="true"></div>

  <div class="mm-panel" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">

    <!-- Panel Top: Brand Stack -->
    <div class="mm-header">
      <a href="index.html" class="mm-brand" tabindex="-1">
        <span class="mm-brand-name">NEW AKSHAT FASHION</span>
      </a>
    </div>

    <!-- Thin gold rule under header -->
    <div class="mm-rule"></div>

    <!-- Central Nav Links -->
    <nav class="mm-nav" aria-label="Mobile navigation">
      <a href="index.html"      class="mm-link"><span class="mm-link-num">01</span><span class="mm-link-text">Home</span></a>
      <a href="collection.html" class="mm-link"><span class="mm-link-num">02</span><span class="mm-link-text">Collections</span></a>
      <a href="about.html"      class="mm-link"><span class="mm-link-num">03</span><span class="mm-link-text">About</span></a>
      <a href="contact.html"    class="mm-link"><span class="mm-link-num">04</span><span class="mm-link-text">Contact</span></a>
    </nav>

    <!-- Panel Footer -->
    <div class="mm-footer">
      <!-- CTA Button -->
      <a href="visit.html" class="mm-cta-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Visit Showroom
      </a>

      <!-- Social Links -->
      <div class="mm-socials">
        <a href="https://www.instagram.com/akshat_family_wear_/" target="_blank" rel="noopener noreferrer" class="mm-social-link" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
        </a>
        <a href="https://wa.me/919327620020" target="_blank" rel="noopener noreferrer" class="mm-social-link" aria-label="WhatsApp">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326z"/></svg>
        </a>
        <a href="https://www.google.com/maps/search/?api=1&query=New+Akshat+Fashion+Bhujpur+Kutch" target="_blank" rel="noopener noreferrer" class="mm-social-link" aria-label="Find us on Maps">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        </a>
      </div>

      <!-- Copyright micro-line -->
      <p class="mm-copyright">© 2025 New Akshat Fashion · Bhujpur, Kutch</p>
    </div>
  </div>
`;

(function () {
  // ── Inject HTML ──────────────────────────────────────────────────────────
  const placeholder = document.getElementById('navbar-placeholder');
  if (placeholder) placeholder.outerHTML = NAVBAR_HTML;

  // ── DOM refs ─────────────────────────────────────────────────────────────
  const navbar       = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobilePanel  = document.getElementById('mobile-menu');
  const mmOverlay    = document.getElementById('mm-overlay');

  // ── 1. Scroll detection ──────────────────────────────────────────────────
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── 2. Menu open / close / toggle ────────────────────────────────────────
  const openMenu = () => {
    if (!mobilePanel) return;
    mobilePanel.classList.add('is-open');
    if (mmOverlay) mmOverlay.classList.add('is-visible');
    document.body.classList.add('menu-open');
    if (mobileToggle) {
      mobileToggle.classList.add('is-active');
      mobileToggle.setAttribute('aria-expanded', 'true');
    }
    // Focus first link for accessibility
    const firstLink = mobilePanel.querySelector('.mm-link');
    if (firstLink) setTimeout(() => firstLink.focus(), 400);
  };

  const closeMenu = () => {
    if (!mobilePanel) return;
    mobilePanel.classList.remove('is-open');
    if (mmOverlay) mmOverlay.classList.remove('is-visible');
    document.body.classList.remove('menu-open');
    if (mobileToggle) {
      mobileToggle.classList.remove('is-active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.focus();
    }
  };

  const toggleMenu = () => {
    if (!mobilePanel) return;
    const isOpen = mobilePanel.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  if (mobileToggle) mobileToggle.addEventListener('click', toggleMenu);
  if (mmOverlay)    mmOverlay.addEventListener('click', closeMenu);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobilePanel && mobilePanel.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Close on any nav link click
  if (mobilePanel) {
    mobilePanel.querySelectorAll('.mm-link, .mm-cta-btn').forEach(el => {
      el.addEventListener('click', closeMenu);
    });
  }

  // ── 3. Active page highlighter ───────────────────────────────────────────
  const currentPath = window.location.pathname;
  const pageName    = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  const markActive = (links) => {
    links.forEach(link => {
      const href = link.getAttribute('href');
      const isHome = (pageName === '' || pageName === 'index.html') && (href === '/' || href === 'index.html');
      const isMatch = href && pageName !== '' && href.includes(pageName);
      link.classList.toggle('active', isHome || isMatch);
    });
  };

  markActive(document.querySelectorAll('.nav-link'));
  markActive(document.querySelectorAll('.mm-link'));
})();
