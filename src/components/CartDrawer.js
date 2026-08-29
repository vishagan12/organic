import { getCartItems, getTotals, updateQuantity, removeFromCart } from '../store/cart.js';
import { t } from '../store/i18n.js';

export function renderCartDrawer() {
  return `
    <div id="cart-drawer-backdrop" class="fixed inset-0 bg-primary/50 backdrop-blur-md z-50 transition-opacity duration-300 opacity-0 pointer-events-none">
      <div 
        id="cart-drawer-panel" 
        class="fixed top-0 right-0 h-full w-full sm:max-w-md bg-surface shadow-2xl flex flex-col z-50 transform translate-x-full transition-transform duration-300 ease-out border-l border-primary/10"
      >
        <!-- Dynamic Content Injected Here -->
        <div id="cart-drawer-content" class="h-full flex flex-col">
          ${renderCartDrawerInner()}
        </div>
      </div>
    </div>
  `;
}

export function renderCartDrawerInner() {
  const items = getCartItems();
  const totals = getTotals();
  const shippingPercent = Math.min(100, Math.round((totals.subtotal / totals.freeShippingThreshold) * 100));

  return `
    <!-- Header -->
    <div class="p-4 sm:p-6 border-b border-primary/10 flex items-center justify-between bg-surface-container-low flex-shrink-0">
      <div class="flex items-center gap-2.5 sm:gap-3">
        <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span class="material-symbols-outlined text-[18px]">shopping_bag</span>
        </div>
        <h3 class="font-display text-lg sm:text-xl text-primary font-bold">${t('cartDrawerTitle')}</h3>
      </div>
      <button id="close-cart-btn" class="text-on-surface-variant hover:text-primary p-2 rounded-full hover:bg-surface transition-colors" aria-label="Close Cart">
        <span class="material-symbols-outlined text-[22px]">close</span>
      </button>
    </div>

    <!-- Free Delivery Progress Bar -->
    <div class="px-4 sm:px-6 py-3 sm:py-4 bg-surface-container border-b border-primary/10 text-xs flex-shrink-0">
      ${totals.isFreeShipping && totals.subtotal > 0 ? `
        <div class="flex items-center gap-2 text-primary font-bold">
          <span class="material-symbols-outlined text-accent text-base">verified</span>
          <span>${t('freeShippingUnlocked')}</span>
        </div>
      ` : `
        <div class="flex flex-col gap-1.5 sm:gap-2">
          <div class="flex justify-between text-on-surface-variant">
            <span>${t('addForFreeShipping')} <strong class="text-primary font-bold">₹${totals.amountNeededForFreeShipping.toFixed(0)}</strong> ${t('forFreeShipping')}</span>
            <span class="font-bold text-accent">${shippingPercent}%</span>
          </div>
          <div class="w-full bg-primary/10 rounded-full h-2 overflow-hidden">
            <div class="bg-accent h-full rounded-full transition-all duration-500" style="width: ${shippingPercent}%"></div>
          </div>
        </div>
      `}
    </div>

    <!-- Items Body -->
    <div class="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
      ${items.length === 0 ? `
        <div class="my-auto flex flex-col items-center text-center py-10 sm:py-12">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-surface-container flex items-center justify-center text-primary/40 mb-4 shadow-inner">
            <span class="material-symbols-outlined text-3xl sm:text-4xl">shopping_cart</span>
          </div>
          <h4 class="font-display text-lg sm:text-xl text-primary font-bold mb-2">${t('cartEmptyTitle')}</h4>
          <p class="text-on-surface-variant text-xs max-w-xs mb-6 sm:mb-8 leading-relaxed">
            ${t('cartEmptyDesc')}
          </p>
          <a href="#/shop" class="close-drawer-link bg-accent hover:bg-accent-hover text-on-primary px-7 py-3 rounded-xl font-label-caps text-xs uppercase tracking-wider transition-all font-bold shadow-md">
            ${t('browseAllBtn')}
          </a>
        </div>
      ` : `
        ${items.map(item => {
          const effectivePrice = item.isSubscription ? item.product.price * 0.9 : item.product.price;
          const lineTotal = effectivePrice * item.quantity;
          return `
            <div class="flex gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-surface-container-low border border-primary/5 items-center shadow-sm">
              <img src="${item.product.image}" alt="${item.product.name}" class="w-14 h-14 sm:w-20 sm:h-20 object-cover rounded-xl flex-shrink-0 bg-surface border border-primary/5" loading="lazy" decoding="async" />
              
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-start mb-0.5 sm:mb-1 gap-1">
                  <h4 class="font-display text-xs sm:text-sm font-bold text-primary truncate">${item.product.name}</h4>
                  <button data-item-id="${item.id}" class="remove-cart-item-btn text-on-surface-variant/60 hover:text-error transition-colors p-1 flex-shrink-0" title="Remove">
                    <span class="material-symbols-outlined text-[16px] sm:text-[18px]">delete</span>
                  </button>
                </div>
                
                <p class="text-[11px] sm:text-xs text-on-surface-variant mb-2">${item.size}${item.isSubscription ? ` • <span class="text-accent font-bold">${t('save10')}</span>` : ''}</p>
                
                <div class="flex items-center justify-between">
                  <!-- Quantity Controls -->
                  <div class="flex items-center border border-primary/20 rounded-lg bg-surface">
                    <button data-item-id="${item.id}" data-action="dec" class="cart-qty-btn px-2 py-0.5 text-xs text-primary hover:bg-primary/10 transition-colors font-bold">−</button>
                    <span class="px-2 py-0.5 text-xs font-bold text-primary min-w-[18px] text-center">${item.quantity}</span>
                    <button data-item-id="${item.id}" data-action="inc" class="cart-qty-btn px-2 py-0.5 text-xs text-primary hover:bg-primary/10 transition-colors font-bold">+</button>
                  </div>

                  <span class="font-display text-xs sm:text-sm font-bold text-primary">₹${lineTotal.toFixed(0)}</span>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      `}
    </div>

    <!-- Footer -->
    ${items.length > 0 ? `
      <div class="p-4 sm:p-6 border-t border-primary/10 bg-surface-container-low flex flex-col gap-3 sm:gap-4 flex-shrink-0">
        <div class="flex justify-between items-baseline text-sm">
          <span class="text-on-surface-variant font-medium text-xs sm:text-sm">${t('estimatedSubtotal')}</span>
          <span class="font-display text-xl sm:text-2xl font-bold text-primary">₹${totals.subtotal.toFixed(0)}</span>
        </div>
        
        <p class="text-[10px] sm:text-[11px] text-on-surface-variant/80 italic">
          ${t('gstLabel')} • ${t('deliveryFeeLabel')}
        </p>

        <div class="grid grid-cols-2 gap-2.5 sm:gap-3 pt-1">
          <a 
            href="#/cart" 
            class="close-drawer-link w-full text-center py-3 sm:py-3.5 px-2.5 rounded-xl border border-primary/30 text-primary font-label-caps text-xs uppercase tracking-wider hover:bg-surface transition-all font-bold truncate"
          >
            ${t('viewCart')}
          </a>
          <a 
            href="#/checkout" 
            class="close-drawer-link w-full text-center py-3 sm:py-3.5 px-2.5 rounded-xl bg-accent hover:bg-accent-hover text-on-primary font-label-caps text-xs uppercase tracking-wider transition-all font-bold shadow-lg shadow-accent/25 truncate"
          >
            ${t('checkout')}
          </a>
        </div>
      </div>
    ` : ''}
  `;
}

export function refreshCartDrawerUI() {
  const container = document.getElementById('cart-drawer-content');
  if (container) {
    container.innerHTML = renderCartDrawerInner();
    attachCartDrawerEvents();
  }
}

export function attachCartDrawerEvents() {
  const backdrop = document.getElementById('cart-drawer-backdrop');
  const panel = document.getElementById('cart-drawer-panel');
  const closeBtn = document.getElementById('close-cart-btn');

  function close() {
    if (!backdrop || !panel) return;
    panel.classList.add('translate-x-full');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
  }

  if (closeBtn) closeBtn.onclick = close;
  if (backdrop) {
    backdrop.onclick = (e) => {
      if (e.target === backdrop) close();
    };
  }

  document.querySelectorAll('.close-drawer-link').forEach(link => {
    link.onclick = close;
  });

  // Quantity handlers
  document.querySelectorAll('.cart-qty-btn').forEach(btn => {
    btn.onclick = () => {
      const itemId = btn.dataset.itemId;
      const action = btn.dataset.action;
      const items = getCartItems();
      const item = items.find(i => i.id === itemId);
      if (item) {
        if (action === 'inc') {
          updateQuantity(itemId, item.quantity + 1);
        } else {
          updateQuantity(itemId, item.quantity - 1);
        }
        refreshCartDrawerUI();
      }
    };
  });

  // Remove handlers
  document.querySelectorAll('.remove-cart-item-btn').forEach(btn => {
    btn.onclick = () => {
      const itemId = btn.dataset.itemId;
      removeFromCart(itemId);
      refreshCartDrawerUI();
    };
  });
}

export function openCartDrawer() {
  refreshCartDrawerUI();
  const backdrop = document.getElementById('cart-drawer-backdrop');
  const panel = document.getElementById('cart-drawer-panel');
  if (!backdrop || !panel) return;
  backdrop.classList.remove('opacity-0', 'pointer-events-none');
  backdrop.classList.add('opacity-100');
  panel.classList.remove('translate-x-full');
}
