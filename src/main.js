import './style.css';
import { parseRoute } from './utils/router.js';
import { getProductById } from './store/products.js';
import { subscribeCart, getTotals } from './store/cart.js';
import { subscribeLanguage, getLanguage } from './store/i18n.js';
import { showToast } from './components/Toast.js';
import { handleDelegatedCartClick, updateAllProductActionSlots } from './utils/productActions.js';
import { renderHeader, attachHeaderEvents } from './components/Header.js';
import { renderFooter } from './components/Footer.js';
import { renderCartDrawer, attachCartDrawerEvents, openCartDrawer, refreshCartDrawerUI } from './components/CartDrawer.js';
import { renderSearchModal, attachSearchModalEvents, openSearchModal } from './components/SearchModal.js';
import { renderHomePage, attachHomeEvents } from './pages/Home.js';
import { renderShopPage, attachShopEvents } from './pages/Shop.js';
import { renderProductDetailPage, attachProductDetailEvents } from './pages/ProductDetail.js';
import { renderCartPage, attachCartPageEvents } from './pages/Cart.js';
import { renderCheckoutPage, attachCheckoutEvents } from './pages/Checkout.js';
import { renderOurStoryPage } from './pages/OurStory.js';
import { renderJournalPage } from './pages/Journal.js';
import { renderContactPage, attachContactEvents } from './pages/Contact.js';

const app = document.getElementById('app');

function renderApp() {
  const currentLang = getLanguage();
  const isTa = currentLang === 'ta';

  // Apply language class strictly when Tamil is active
  document.documentElement.lang = currentLang;
  document.documentElement.classList.toggle('lang-ta', isTa);
  document.body.classList.toggle('lang-ta', isTa);

  const route = parseRoute();
  const currentHash = window.location.hash || '#/';

  let pageHtml = '';
  if (route.name === 'home') {
    pageHtml = renderHomePage();
  } else if (route.name === 'shop') {
    pageHtml = renderShopPage();
  } else if (route.name === 'product-detail') {
    pageHtml = renderProductDetailPage(route.params.id);
  } else if (route.name === 'cart') {
    pageHtml = renderCartPage();
  } else if (route.name === 'checkout') {
    pageHtml = renderCheckoutPage();
  } else if (route.name === 'story') {
    pageHtml = renderOurStoryPage();
  } else if (route.name === 'journal') {
    pageHtml = renderJournalPage();
  } else if (route.name === 'contact') {
    pageHtml = renderContactPage();
  } else {
    pageHtml = renderHomePage();
  }

  app.innerHTML = `
    <div style="background-color: #F4EBD9;" class="min-h-screen flex flex-col justify-between bg-surface selection:bg-accent selection:text-on-primary">
      ${renderHeader(currentHash)}
      <main style="background-color: #F4EBD9;" class="flex-1 w-full pt-2 bg-surface">
        ${pageHtml}
      </main>
      ${renderFooter()}
      ${renderCartDrawer()}
      ${renderSearchModal()}
    </div>
  `;

  // Attach interactive events
  attachGlobalEvents();
  attachHeaderEvents(() => renderApp());
  attachCartDrawerEvents();
  attachSearchModalEvents();

  if (route.name === 'home') {
    attachHomeEvents();
  } else if (route.name === 'shop') {
    attachShopEvents(() => renderApp());
  } else if (route.name === 'product-detail') {
    const product = getProductById(route.params.id);
    attachProductDetailEvents(product);
  } else if (route.name === 'cart') {
    attachCartPageEvents(() => renderApp());
  } else if (route.name === 'checkout') {
    attachCheckoutEvents(() => renderApp());
  } else if (route.name === 'contact') {
    attachContactEvents();
  }
}

function attachGlobalEvents() {
  // Open search modal
  const searchBtn = document.getElementById('open-search-btn');
  if (searchBtn) {
    searchBtn.onclick = () => openSearchModal();
  }

  // Open cart drawer
  const cartBtn = document.getElementById('open-cart-btn');
  if (cartBtn) {
    cartBtn.onclick = () => openCartDrawer();
  }

  // Mobile navigation drawer toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.onclick = () => {
      mobileNavDrawer.classList.toggle('hidden');
    };
  }

  // Newsletter submission in footer
  const footerNewsletter = document.getElementById('footer-newsletter-form');
  if (footerNewsletter) {
    footerNewsletter.onsubmit = (e) => {
      e.preventDefault();
      const isTa = getLanguage() === 'ta';
      showToast(isTa ? 'நன்றி! ஆரா பொட்டானிகாவிற்கு நல்வரவு. 15% தள்ளுபடி கூப்பன் உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்டது.' : 'Thank you! Welcome to Aura Botanica. We sent a 15% discount code to your inbox.');
      footerNewsletter.reset();
    };
  }
}

// Global delegated cart button listener (zero screen flash)
document.addEventListener('click', handleDelegatedCartClick);

// Re-render when hash changes & scroll to top
window.addEventListener('hashchange', () => {
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Update cart badges, drawer, and product button action slots without whole-page DOM wiping
subscribeCart(() => {
  const totals = getTotals();
  const badge = document.getElementById('header-cart-badge');
  if (badge) {
    badge.textContent = totals.itemCount;
    if (totals.itemCount > 0) {
      badge.classList.remove('hidden');
      badge.classList.add('inline-flex');
    } else {
      badge.classList.add('hidden');
      badge.classList.remove('inline-flex');
    }
  }
  refreshCartDrawerUI();
  updateAllProductActionSlots();
});

// Re-render when language changes
subscribeLanguage(() => {
  renderApp();
});

// Initial boot
renderApp();
