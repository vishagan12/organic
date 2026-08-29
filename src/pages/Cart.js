import { getCartItems, getTotals, updateQuantity, removeFromCart, applyPromoCode, removePromoCode } from '../store/cart.js';
import { showToast } from '../components/Toast.js';
import { t } from '../store/i18n.js';

export function renderCartPage() {
  const items = getCartItems();
  const totals = getTotals();

  const shippingPercent = Math.min(100, Math.round((totals.subtotal / totals.freeShippingThreshold) * 100));

  return `
    <div class="w-full bg-surface pt-4 sm:pt-10 pb-section-gap">
      <div class="px-4 sm:px-8 lg:px-12 max-w-6xl mx-auto">
        
        <!-- Page Title -->
        <div class="border-b border-primary/10 pb-4 sm:pb-6 mb-6 sm:mb-10">
          <span class="font-label-caps text-[10px] sm:text-xs text-accent uppercase tracking-widest block mb-1 sm:mb-2 font-bold">${t('cartTitle')}</span>
          <h1 class="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-primary">${t('cartTitle')}</h1>
        </div>

        ${items.length === 0 ? `
          <div class="bg-surface-container-low rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-16 text-center border border-primary/5 shadow-editorial max-w-xl mx-auto my-8 sm:my-12">
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-surface flex items-center justify-center text-primary mx-auto mb-4 sm:mb-6 shadow-sm border border-primary/10">
              <span class="material-symbols-outlined text-3xl sm:text-4xl">shopping_cart</span>
            </div>
            <h2 class="font-display text-xl sm:text-3xl font-bold text-primary mb-2 sm:mb-3">${t('cartEmptyTitle')}</h2>
            <p class="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto mb-6 sm:mb-8 leading-relaxed">
              ${t('cartEmptyDesc')}
            </p>
            <a href="#/shop" class="bg-accent hover:bg-accent-hover text-on-primary px-7 py-3.5 rounded-xl font-label-caps text-xs uppercase tracking-wider font-bold shadow-lg shadow-accent/25 transition-all inline-block">
              ${t('browseAllBtn')}
            </a>
          </div>
        ` : `
          <!-- Free delivery progress bar -->
          <div class="bg-surface-container-low p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-primary/5 mb-6 sm:mb-10 shadow-editorial">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 mb-2.5 sm:mb-3">
              <div class="flex items-center gap-2 text-xs sm:text-sm text-primary font-bold">
                <span class="material-symbols-outlined text-accent text-lg sm:text-xl flex-shrink-0">local_shipping</span>
                ${totals.isFreeShipping ? `
                  <span>${t('freeShippingUnlocked')}</span>
                ` : `
                  <span>${t('addForFreeShipping')} <strong class="text-accent font-bold">₹${totals.amountNeededForFreeShipping.toFixed(0)}</strong> ${t('forFreeShipping')}.</span>
                `}
              </div>
              <span class="text-[10px] sm:text-xs font-label-caps uppercase text-primary font-bold flex-shrink-0">${shippingPercent}% Reached</span>
            </div>
            <div class="w-full bg-primary/10 rounded-full h-2 sm:h-2.5 overflow-hidden">
              <div class="bg-accent h-full rounded-full transition-all duration-500" style="width: ${shippingPercent}%"></div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
            
            <!-- Items List (8 cols) -->
            <div class="lg:col-span-8 flex flex-col gap-4 sm:gap-6">
              ${items.map(item => {
                const effectivePrice = item.isSubscription ? item.product.price * 0.9 : item.product.price;
                const lineTotal = effectivePrice * item.quantity;
                return `
                  <div class="bg-surface-container-low p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-primary/5 shadow-editorial flex flex-row gap-3 sm:gap-6 items-start sm:items-center">
                    
                    <a href="#/product/${item.product.id}" class="w-20 h-20 sm:w-28 sm:h-28 rounded-xl sm:rounded-2xl overflow-hidden bg-surface flex-shrink-0 border border-primary/5">
                      <img src="${item.product.image}" alt="${item.product.name}" class="w-full h-full object-cover" loading="lazy" decoding="async" />
                    </a>

                    <div class="flex-1 min-w-0 w-full">
                      <div class="flex justify-between items-start mb-0.5 sm:mb-1 gap-2">
                        <div class="min-w-0">
                          <span class="text-[9.5px] sm:text-[10px] font-label-caps uppercase text-accent font-bold block mb-0.5 truncate">${item.product.category}</span>
                          <a href="#/product/${item.product.id}" class="font-display text-sm sm:text-xl font-bold text-primary hover:text-accent transition-colors block truncate">
                            ${item.product.name}
                          </a>
                        </div>
                        <span class="font-display text-sm sm:text-lg font-bold text-primary flex-shrink-0">₹${lineTotal.toFixed(0)}</span>
                      </div>

                      <p class="text-[11px] sm:text-xs text-on-surface-variant mb-2.5 sm:mb-4">
                        ${t('selectSizeLabel')}: <span class="font-bold text-primary">${item.size}</span>
                        ${item.isSubscription ? ` • <span class="text-accent font-bold">${t('save10')}</span>` : ''}
                      </p>

                      <div class="flex justify-between items-center pt-2 sm:pt-3 border-t border-primary/5">
                        <div class="flex items-center border border-primary/20 rounded-lg sm:rounded-xl bg-surface p-0.5 sm:p-1">
                          <button data-item-id="${item.id}" data-action="dec" class="page-cart-qty-btn w-7 sm:w-8 h-7 sm:h-8 text-primary hover:bg-primary/10 rounded font-bold transition-colors">−</button>
                          <span class="w-7 sm:w-8 text-center text-xs font-bold text-primary font-display">${item.quantity}</span>
                          <button data-item-id="${item.id}" data-action="inc" class="page-cart-qty-btn w-7 sm:w-8 h-7 sm:h-8 text-primary hover:bg-primary/10 rounded font-bold transition-colors">+</button>
                        </div>

                        <button data-item-id="${item.id}" class="page-remove-cart-btn text-xs text-error/80 hover:text-error flex items-center gap-1 font-label-caps uppercase tracking-wider font-bold transition-colors px-2 py-1">
                          <span class="material-symbols-outlined text-[16px]">delete</span>
                          <span>${t('removeBtn')}</span>
                        </button>
                      </div>

                    </div>

                  </div>
                `;
              }).join('')}

              <!-- Gift Note Accordion -->
              <details class="bg-surface-container-low p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-primary/5 cursor-pointer shadow-editorial">
                <summary class="flex justify-between items-center list-none font-display font-bold text-xs sm:text-sm text-primary">
                  <span class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-accent text-base sm:text-lg">featured_seasonal_and_gifts</span>
                    ${t('giftCardTitle')}
                  </span>
                  <span class="material-symbols-outlined text-primary">expand_more</span>
                </summary>
                <div class="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-primary/10">
                  <textarea 
                    rows="3" 
                    placeholder="${t('giftCardPlaceholder')}" 
                    class="apothecary-input text-xs w-full"
                  ></textarea>
                </div>
              </details>
            </div>

            <!-- Summary Sidebar (4 cols) -->
            <div class="lg:col-span-4 bg-surface-container-low p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-primary/5 shadow-editorial sticky top-28 flex flex-col gap-4 sm:gap-6 w-full">
              <h3 class="font-display text-xl sm:text-2xl font-bold text-primary border-b border-primary/10 pb-3 sm:pb-4">${t('orderSummary')}</h3>

              <!-- Promo code form -->
              <div>
                <label class="block font-label-caps text-[11px] sm:text-xs text-on-surface-variant uppercase tracking-wider mb-1.5 sm:mb-2 font-bold">${t('discountCoupon')}</label>
                <div class="flex gap-2">
                  <input 
                    type="text" 
                    id="cart-promo-input" 
                    placeholder="BOTANICAL15" 
                    value="${totals.appliedPromo ? totals.appliedPromo.code : ''}"
                    class="apothecary-input text-xs uppercase flex-1 min-w-0"
                    ${totals.appliedPromo ? 'disabled' : ''}
                  />
                  ${totals.appliedPromo ? `
                    <button id="remove-promo-btn" class="bg-error/10 text-error hover:bg-error hover:text-on-error px-3.5 sm:px-4 py-2 rounded-xl text-xs font-label-caps uppercase font-bold transition-colors flex-shrink-0">
                      ${t('removeBtn')}
                    </button>
                  ` : `
                    <button id="apply-promo-btn" class="bg-primary hover:bg-primary-container text-surface px-4 sm:px-5 py-2 rounded-xl text-xs font-label-caps uppercase font-bold transition-colors shadow-sm flex-shrink-0">
                      ${t('applyBtn')}
                    </button>
                  `}
                </div>
                ${totals.appliedPromo ? `
                  <p class="text-xs text-accent mt-2 flex items-center gap-1 font-bold">
                    <span class="material-symbols-outlined text-sm">check_circle</span>
                    ${totals.appliedPromo.description}
                  </p>
                ` : `
                  <p class="text-[10px] sm:text-[11px] text-on-surface-variant/80 mt-1.5 sm:mt-2">Use code <code class="text-primary font-bold bg-surface px-1.5 py-0.5 rounded border border-primary/10">BOTANICAL15</code> for 15% off.</p>
                `}
              </div>

              <!-- Breakdown -->
              <div class="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-sm pt-3 sm:pt-4 border-t border-primary/10">
                <div class="flex justify-between text-on-surface-variant">
                  <span>${t('estimatedSubtotal')}</span>
                  <span class="font-bold text-primary font-display">₹${totals.subtotal.toFixed(0)}</span>
                </div>

                ${totals.totalDiscount > 0 ? `
                  <div class="flex justify-between text-accent font-bold">
                    <span>${t('discountLabel')}</span>
                    <span class="font-display">-₹${totals.totalDiscount.toFixed(0)}</span>
                  </div>
                ` : ''}

                <div class="flex justify-between text-on-surface-variant">
                  <span>${t('deliveryFeeLabel')}</span>
                  <span>${totals.isFreeShipping ? `<strong class="text-accent font-label-caps uppercase text-xs font-bold">${t('freeDelivery')}</strong>` : `₹${totals.shipping.toFixed(0)}`}</span>
                </div>

                <div class="flex justify-between text-on-surface-variant">
                  <span>${t('gstLabel')}</span>
                  <span class="font-display font-semibold">₹${totals.tax.toFixed(0)}</span>
                </div>

                <div class="flex justify-between text-base sm:text-lg font-bold text-primary pt-3 sm:pt-4 border-t border-primary/10">
                  <span>${t('totalAmountLabel')}</span>
                  <span class="font-display text-xl sm:text-3xl text-primary font-bold">₹${totals.total.toFixed(0)}</span>
                </div>
              </div>

              <a 
                href="#/checkout" 
                class="w-full text-center bg-accent hover:bg-accent-hover text-on-primary py-3.5 sm:py-4 px-6 rounded-xl font-label-caps text-xs uppercase tracking-wider font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-accent/25 block"
              >
                ${t('proceedToCheckout')}
              </a>

              <div class="text-center">
                <a href="#/shop" class="text-xs text-primary font-label-caps uppercase tracking-wider font-bold hover:underline">
                  ${t('continueShopping')}
                </a>
              </div>

            </div>

          </div>
        `}

      </div>
    </div>
  `;
}

export function attachCartPageEvents(rerender) {
  // Quantity buttons
  document.querySelectorAll('.page-cart-qty-btn').forEach(btn => {
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
        rerender();
      }
    };
  });

  // Remove buttons
  document.querySelectorAll('.page-remove-cart-btn').forEach(btn => {
    btn.onclick = () => {
      const itemId = btn.dataset.itemId;
      removeFromCart(itemId);
      showToast('Item removed from cart.');
      rerender();
    };
  });

  // Promo apply
  const applyPromoBtn = document.getElementById('apply-promo-btn');
  const promoInput = document.getElementById('cart-promo-input');
  if (applyPromoBtn && promoInput) {
    applyPromoBtn.onclick = () => {
      const res = applyPromoCode(promoInput.value);
      if (res.success) {
        showToast(res.message);
      } else {
        showToast(res.message, 'error');
      }
      rerender();
    };
  }

  // Promo remove
  const removePromoBtn = document.getElementById('remove-promo-btn');
  if (removePromoBtn) {
    removePromoBtn.onclick = () => {
      removePromoCode();
      showToast('Promotional code removed.');
      rerender();
    };
  }
}
