import { getProductTotalQuantity, addToCart, increaseProductQuantity, decreaseProductQuantity } from '../store/cart.js';
import { getLocalizedProducts } from '../store/products.js';
import { showToast } from '../components/Toast.js';
import { t } from '../store/i18n.js';

export function renderProductActionButtonHtml(productId, type = 'shop-card') {
  const qty = getProductTotalQuantity(productId);

  if (type === 'home-featured') {
    if (qty > 0) {
      return `
        <div class="flex items-center justify-between border border-accent/40 rounded-xl bg-surface p-0.5 shadow-sm min-w-[100px] transition-all">
          <button data-product-id="${productId}" data-cart-action="dec" class="w-8 h-8 flex items-center justify-center text-primary hover:bg-accent/15 rounded-lg font-bold text-base transition-colors" title="Decrease">−</button>
          <span class="px-2.5 text-xs sm:text-sm font-bold text-primary font-display min-w-[22px] text-center">${qty}</span>
          <button data-product-id="${productId}" data-cart-action="inc" class="w-8 h-8 flex items-center justify-center text-primary hover:bg-accent/15 rounded-lg font-bold text-base transition-colors" title="Increase">+</button>
        </div>
      `;
    }
    return `
      <button data-product-id="${productId}" data-cart-action="add" class="flex-1 sm:flex-none bg-primary hover:bg-primary-container text-surface px-4 sm:px-5 py-2.5 rounded-xl text-xs font-label-caps uppercase tracking-wider font-bold transition-all shadow-md whitespace-nowrap text-center">
        ${t('addToCartBtn')}
      </button>
    `;
  }

  if (type === 'home-staple') {
    if (qty > 0) {
      return `
        <div class="flex items-center border border-accent/40 rounded-lg bg-surface p-0.5 shadow-sm transition-all">
          <button data-product-id="${productId}" data-cart-action="dec" class="w-6 h-6 flex items-center justify-center text-primary hover:bg-accent/15 rounded font-bold text-xs transition-colors" title="Decrease">−</button>
          <span class="px-2 text-xs font-bold text-primary font-display min-w-[18px] text-center">${qty}</span>
          <button data-product-id="${productId}" data-cart-action="inc" class="w-6 h-6 flex items-center justify-center text-primary hover:bg-accent/15 rounded font-bold text-xs transition-colors" title="Increase">+</button>
        </div>
      `;
    }
    return `
      <button data-product-id="${productId}" data-cart-action="add" class="bg-accent hover:bg-accent-hover text-on-primary px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-label-caps uppercase tracking-wider font-bold transition-all shadow-sm whitespace-nowrap">
        ${t('quickAddBtn')}
      </button>
    `;
  }

  if (type === 'search-card') {
    if (qty > 0) {
      return `
        <div class="flex items-center border border-accent/40 rounded-lg bg-surface p-0.5 shadow-sm flex-shrink-0 transition-all">
          <button data-product-id="${productId}" data-cart-action="dec" class="w-6 h-6 flex items-center justify-center text-primary hover:bg-accent/15 rounded font-bold text-xs transition-colors" title="Decrease">−</button>
          <span class="px-2 text-xs font-bold text-primary font-display min-w-[18px] text-center">${qty}</span>
          <button data-product-id="${productId}" data-cart-action="inc" class="w-6 h-6 flex items-center justify-center text-primary hover:bg-accent/15 rounded font-bold text-xs transition-colors" title="Increase">+</button>
        </div>
      `;
    }
    return `
      <button data-product-id="${productId}" data-cart-action="add" class="bg-accent hover:bg-accent-hover text-on-primary text-[11px] sm:text-xs font-label-caps uppercase px-2.5 sm:px-3.5 py-1.5 rounded-lg sm:rounded-xl font-bold transition-all flex-shrink-0">
        + Add
      </button>
    `;
  }

  // Default: 'shop-card'
  if (qty > 0) {
    return `
      <div class="flex items-center justify-between border border-accent/40 rounded-lg sm:rounded-xl bg-surface p-0.5 shadow-sm transition-all">
        <button data-product-id="${productId}" data-cart-action="dec" class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-primary hover:bg-accent/15 rounded-md font-bold text-sm transition-colors" title="Decrease">−</button>
        <span class="px-2 text-xs sm:text-sm font-bold text-primary font-display min-w-[22px] text-center">${qty}</span>
        <button data-product-id="${productId}" data-cart-action="inc" class="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-primary hover:bg-accent/15 rounded-md font-bold text-sm transition-colors" title="Increase">+</button>
      </div>
    `;
  }
  return `
    <button 
      data-product-id="${productId}" 
      data-cart-action="add"
      class="w-full sm:w-auto bg-accent hover:bg-accent-hover text-on-primary px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-label-caps text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all transform hover:-translate-y-0.5 shadow-sm whitespace-nowrap text-center"
    >
      ${t('quickAddBtn')}
    </button>
  `;
}

// In-place DOM updater that smoothly refreshes only the buttons without re-rendering the page
export function updateAllProductActionSlots() {
  document.querySelectorAll('.product-action-slot').forEach(slot => {
    const productId = slot.dataset.productId;
    const type = slot.dataset.actionType || 'shop-card';
    if (productId) {
      slot.innerHTML = renderProductActionButtonHtml(productId, type);
    }
  });

  // Also update PDP in-cart indicator if present
  const pdpIndicator = document.getElementById('pdp-in-cart-indicator');
  const pdpCount = document.getElementById('pdp-in-cart-count');
  const pdpProduct = document.getElementById('pdp-add-to-cart-btn');
  if (pdpIndicator && pdpCount && pdpProduct) {
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const pathParts = window.location.hash.replace('#/', '').split('/');
    const pId = pathParts[1];
    if (pId) {
      const q = getProductTotalQuantity(pId);
      pdpCount.textContent = q;
      if (q > 0) {
        pdpIndicator.classList.remove('hidden');
        pdpIndicator.classList.add('flex');
      } else {
        pdpIndicator.classList.add('hidden');
        pdpIndicator.classList.remove('flex');
      }
    }
  }
}

// Delegated click handler for zero-flash cart interactions
export function handleDelegatedCartClick(e) {
  const target = e.target.closest('[data-cart-action]');
  if (!target) return;

  e.preventDefault();
  e.stopPropagation();

  const action = target.dataset.cartAction;
  const productId = target.dataset.productId;
  if (!productId) return;

  const product = getLocalizedProducts().find(p => p.id === productId);
  if (!product) return;

  if (action === 'add') {
    addToCart(product, 1);
    showToast(`Added 1× ${product.name} to cart.`);
  } else if (action === 'inc') {
    increaseProductQuantity(productId);
  } else if (action === 'dec') {
    decreaseProductQuantity(productId);
  }

  // Update in-place without page flash
  updateAllProductActionSlots();
}
