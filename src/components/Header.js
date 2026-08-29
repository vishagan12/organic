import { getTotals } from '../store/cart.js';
import { getLanguage, setLanguage, t } from '../store/i18n.js';

export function renderHeader(currentRoute = '') {
  const totals = getTotals();
  const itemCount = totals.itemCount;
  const currentLang = getLanguage();

  const isActive = (path) => {
    if (path === '' && (currentRoute === '' || currentRoute === '/' || currentRoute === '#/')) return true;
    return currentRoute.startsWith(path);
  };

  const navLinkClass = (path) => {
    const active = isActive(path);
    return active
      ? 'font-label-caps text-[13px] sm:text-[14px] tracking-[0.10em] text-primary font-bold uppercase relative py-2 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-accent transition-all'
      : 'font-label-caps text-[13px] sm:text-[14px] tracking-[0.10em] text-on-surface-variant hover:text-primary font-medium uppercase relative py-2 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2.5px] after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left transition-colors';
  };

  return `
    <!-- Top Announcement Bar -->
    <div class="w-full bg-primary text-surface py-2 sm:py-2.5 px-3 sm:px-4 text-center text-[10px] sm:text-[12px] font-label-caps tracking-[0.08em] sm:tracking-[0.12em] uppercase font-semibold border-b border-primary/20 flex items-center justify-center gap-1.5 sm:gap-2">
      <span class="text-accent text-[10px] sm:text-xs">✦</span>
      <span class="truncate">${t('announcement')}</span>
      <span class="text-accent text-[10px] sm:text-xs">✦</span>
    </div>

    <!-- Main Navigation Header -->
    <header class="sticky top-0 w-full z-40 bg-surface/95 backdrop-blur-xl border-b border-primary/10 transition-all duration-300 shadow-glass">
      <div class="h-16 sm:h-20 w-full px-3 sm:px-8 lg:px-12 flex items-center justify-between">
        
        <!-- Leftmost: Brand Logo & Title -->
        <a href="#/" class="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-all duration-300 shadow-sm flex-shrink-0">
            <span class="material-symbols-outlined text-[18px] sm:text-[22px] group-hover:rotate-12 transition-transform">spa</span>
          </div>
          <div class="flex flex-col">
            <span class="font-display text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-primary leading-none whitespace-nowrap">Aura Botanica</span>
            <span class="font-label-caps text-[8.5px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-accent font-semibold mt-0.5 sm:mt-1 whitespace-nowrap">${t('brandSubtitle')}</span>
          </div>
        </a>

        <!-- Centered / Spaced Navigation Links (Desktop) -->
        <nav class="hidden lg:flex items-center gap-6 xl:gap-10">
          <a href="#/shop" class="${navLinkClass('#/shop')}">${t('navShop')}</a>
          <a href="#/story" class="${navLinkClass('#/story')}">${t('navStory')}</a>
          <a href="#/journal" class="${navLinkClass('#/journal')}">${t('navJournal')}</a>
          <a href="#/contact" class="${navLinkClass('#/contact')}">${t('navContact')}</a>
        </nav>

        <!-- Rightmost: Action Icons & Language Toggle -->
        <div class="flex items-center gap-1.5 sm:gap-4 flex-shrink-0">
          
          <!-- Language Toggle Button (EN | தமிழ்) -->
          <button 
            id="lang-toggle-btn" 
            class="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-surface-container-low hover:bg-surface-container border border-primary/15 text-primary text-[11px] sm:text-[13px] font-bold font-label-caps tracking-wide transition-all shadow-sm group"
            title="Switch Language / மொழியை மாற்றுக"
            aria-label="Switch Language"
          >
            <span class="material-symbols-outlined text-[15px] sm:text-[17px] text-accent group-hover:rotate-45 transition-transform">translate</span>
            <span>${currentLang === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>

          <!-- Search Trigger -->
          <button id="open-search-btn" class="text-on-surface-variant hover:text-primary transition-colors p-1.5 sm:p-2.5 rounded-full hover:bg-surface-container-low" aria-label="Search Products">
            <span class="material-symbols-outlined text-[20px] sm:text-[22px]">search</span>
          </button>

          <!-- Cart Trigger with Count Pill -->
          <button id="open-cart-btn" class="flex items-center gap-1.5 sm:gap-2 bg-surface-container-low hover:bg-surface-container border border-primary/10 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all text-primary group" aria-label="View Shopping Cart">
            <span class="material-symbols-outlined text-[18px] sm:text-[20px] text-primary group-hover:scale-110 transition-transform">shopping_bag</span>
            <span class="text-xs sm:text-[13px] font-label-caps uppercase tracking-wider font-bold hidden sm:inline">${t('navCart')}</span>
            <span id="header-cart-badge" class="${itemCount > 0 ? 'inline-flex' : 'hidden'} bg-accent text-on-primary text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full items-center justify-center animate-scale-in shadow-sm">
              ${itemCount}
            </span>
          </button>

          <!-- Account -->
          <a href="#/checkout" class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary text-surface hidden md:flex items-center justify-center hover:bg-primary-container transition-colors shadow-sm" title="My Account">
            <span class="material-symbols-outlined text-[18px]">person</span>
          </a>

          <!-- Mobile Menu Button -->
          <button id="mobile-menu-btn" class="lg:hidden text-primary p-1.5 sm:p-2 focus:outline-none flex items-center justify-center rounded-lg hover:bg-surface-container-low" aria-label="Toggle Menu">
            <span class="material-symbols-outlined text-[24px] sm:text-[26px]">menu</span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div id="mobile-nav-drawer" class="hidden lg:hidden bg-surface-container-low border-b border-primary/10 px-5 py-5 transition-all shadow-2xl animate-fade-in-up">
        <nav class="flex flex-col gap-3">
          <a href="#/" class="mobile-nav-link font-display text-base text-primary py-2 border-b border-primary/5 flex items-center justify-between">
            <span>Home</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <a href="#/shop" class="mobile-nav-link font-display text-base text-primary py-2 border-b border-primary/5 flex items-center justify-between">
            <span>${t('navShop')}</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <a href="#/story" class="mobile-nav-link font-display text-base text-primary py-2 border-b border-primary/5 flex items-center justify-between">
            <span>${t('navStory')}</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <a href="#/journal" class="mobile-nav-link font-display text-base text-primary py-2 border-b border-primary/5 flex items-center justify-between">
            <span>${t('navJournal')}</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <a href="#/contact" class="mobile-nav-link font-display text-base text-primary py-2 border-b border-primary/5 flex items-center justify-between">
            <span>${t('navContact')}</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
          <a href="#/cart" class="mobile-nav-link font-display text-base text-accent py-2 flex items-center justify-between font-bold">
            <span>${t('cartTitle')}</span>
            <span class="text-xs bg-accent text-on-primary px-3 py-1 rounded-full">${itemCount} Items</span>
          </a>
        </nav>
      </div>
    </header>
  `;
}

export function attachHeaderEvents(rerender) {
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.onclick = () => {
      const nextLang = getLanguage() === 'en' ? 'ta' : 'en';
      setLanguage(nextLang);
      if (rerender) rerender();
    };
  }

  // Close mobile nav when clicking any nav link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.onclick = () => {
      const drawer = document.getElementById('mobile-nav-drawer');
      if (drawer) drawer.classList.add('hidden');
    };
  });
}
