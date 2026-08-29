import { getCartItems, getTotals, clearCart } from '../store/cart.js';
import { showToast } from '../components/Toast.js';
import { t } from '../store/i18n.js';

let selectedShippingOption = 'standard';
let selectedPaymentMethod = 'upi';
let isOrderPlaced = false;
let placedOrderId = '';

export function renderCheckoutPage() {
  const items = getCartItems();
  const totals = getTotals();

  if (isOrderPlaced) {
    return renderOrderConfirmation(placedOrderId);
  }

  const shippingCost = selectedShippingOption === 'express' ? 150.00 : (totals.isFreeShipping ? 0 : 80.00);
  const finalTotal = (totals.subtotal - totals.totalDiscount) + shippingCost + totals.tax;

  return `
    <div class="w-full bg-surface pt-4 sm:pt-8 pb-section-gap">
      <div class="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        
        <!-- Header Strip -->
        <div class="flex items-center justify-between border-b border-primary/10 pb-4 sm:pb-6 mb-6 sm:mb-10 gap-3">
          <div>
            <span class="font-label-caps text-[9.5px] sm:text-[10px] tracking-[0.2em] text-accent uppercase block mb-0.5 sm:mb-1 font-bold">100% Secure Transaction</span>
            <h1 class="font-display text-xl sm:text-3xl lg:text-4xl font-bold text-primary">${t('checkoutTitle')}</h1>
          </div>
          <a href="#/cart" class="text-xs font-label-caps text-primary uppercase tracking-wider font-bold hover:text-accent flex items-center gap-1 flex-shrink-0 group">
            <span class="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span>${t('returnToCart')}</span>
          </a>
        </div>

        ${items.length === 0 ? `
          <div class="bg-surface-container-low p-8 sm:p-12 rounded-3xl sm:rounded-[2.5rem] text-center max-w-lg mx-auto shadow-editorial border border-primary/5">
            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-surface flex items-center justify-center text-primary mx-auto mb-4 border border-primary/10">
              <span class="material-symbols-outlined text-2xl sm:text-3xl">shopping_basket</span>
            </div>
            <h3 class="font-display text-xl sm:text-2xl font-bold text-primary mb-2">${t('cartEmptyTitle')}</h3>
            <p class="text-xs text-on-surface-variant mb-6 leading-relaxed">${t('cartEmptyDesc')}</p>
            <a href="#/shop" class="bg-accent hover:bg-accent-hover text-on-primary px-7 py-3 rounded-xl text-xs font-label-caps uppercase tracking-wider font-bold shadow-md transition-all inline-block">
              ${t('browseAllBtn')}
            </a>
          </div>
        ` : `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start">
            
            <!-- Left: Stepped Checkout Form (7 cols) -->
            <div class="lg:col-span-7 flex flex-col gap-4 sm:gap-6 w-full">
              
              <!-- Quick UPI / Express Option -->
              <div class="bg-surface-container-low p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-primary/5 shadow-editorial">
                <span class="font-label-caps text-[9.5px] sm:text-[10px] tracking-[0.18em] text-on-surface-variant uppercase block text-center mb-3 font-bold">${t('instantExpress')}</span>
                <div class="grid grid-cols-3 gap-2 sm:gap-3">
                  <button type="button" class="bg-surface hover:bg-surface-container text-primary border border-primary/15 py-2.5 sm:py-3 px-1.5 sm:px-2 rounded-xl flex items-center justify-center font-bold text-[11px] sm:text-xs transition-colors shadow-sm gap-1 sm:gap-1.5 truncate">
                    <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-600 flex-shrink-0"></span>
                    <span class="truncate">GPay / UPI</span>
                  </button>
                  <button type="button" class="bg-surface hover:bg-surface-container text-primary border border-primary/15 py-2.5 sm:py-3 px-1.5 sm:px-2 rounded-xl flex items-center justify-center font-bold text-[11px] sm:text-xs transition-colors shadow-sm gap-1 sm:gap-1.5 truncate">
                    <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#5f259f] flex-shrink-0"></span>
                    <span class="truncate">PhonePe</span>
                  </button>
                  <button type="button" class="bg-surface hover:bg-surface-container text-primary border border-primary/15 py-2.5 sm:py-3 px-1.5 sm:px-2 rounded-xl flex items-center justify-center font-bold text-[11px] sm:text-xs transition-colors shadow-sm gap-1 sm:gap-1.5 truncate">
                    <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#002970] flex-shrink-0"></span>
                    <span class="truncate">Paytm</span>
                  </button>
                </div>
                <div class="flex items-center gap-3 my-3 sm:my-4">
                  <div class="flex-1 h-[1px] bg-primary/10"></div>
                  <span class="text-[9.5px] sm:text-[10px] text-on-surface-variant font-label-caps uppercase tracking-wider font-semibold whitespace-nowrap">${t('orFillAddress')}</span>
                  <div class="flex-1 h-[1px] bg-primary/10"></div>
                </div>
              </div>

              <!-- Main Form Container -->
              <form id="checkout-main-form" class="flex flex-col gap-4 sm:gap-6 w-full">
                
                <!-- Section 1: Contact -->
                <div class="bg-surface-container-low p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-primary/5 shadow-editorial w-full">
                  <div class="flex items-center justify-between mb-4 sm:mb-5">
                    <h3 class="font-display text-base sm:text-xl font-bold text-primary flex items-center gap-2.5 sm:gap-3">
                      <span class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-surface text-xs font-label-caps flex items-center justify-center font-bold flex-shrink-0">1</span>
                      <span>${t('step1Title')}</span>
                    </h3>
                    <span class="text-[10px] sm:text-[11px] text-accent font-label-caps uppercase font-bold">${t('step1Step')}</span>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label class="block text-[10.5px] sm:text-[11px] font-label-caps uppercase text-on-surface-variant mb-1 font-bold">${t('emailLabel')}</label>
                      <input type="email" required placeholder="herbalist@aurabotanica.in" class="apothecary-input text-xs sm:text-sm" />
                    </div>
                    <div>
                      <label class="block text-[10.5px] sm:text-[11px] font-label-caps uppercase text-on-surface-variant mb-1 font-bold">${t('phoneLabel')}</label>
                      <input type="tel" required placeholder="+91 98765 43210" class="apothecary-input text-xs sm:text-sm" />
                    </div>
                  </div>
                  <label class="flex items-center gap-2 text-xs text-on-surface-variant mt-3 cursor-pointer">
                    <input type="checkbox" checked class="w-4 h-4 accent-accent rounded flex-shrink-0" />
                    <span class="text-[11px] sm:text-xs">${t('smsNotice')}</span>
                  </label>
                </div>

                <!-- Section 2: Delivery Address -->
                <div class="bg-surface-container-low p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-primary/5 shadow-editorial w-full">
                  <div class="flex items-center justify-between mb-4 sm:mb-5">
                    <h3 class="font-display text-base sm:text-xl font-bold text-primary flex items-center gap-2.5 sm:gap-3">
                      <span class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-surface text-xs font-label-caps flex items-center justify-center font-bold flex-shrink-0">2</span>
                      <span>${t('step2Title')}</span>
                    </h3>
                    <span class="text-[10px] sm:text-[11px] text-accent font-label-caps uppercase font-bold">${t('step2Step')}</span>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label class="block text-[10.5px] sm:text-[11px] font-label-caps uppercase text-on-surface-variant mb-1 font-bold">${t('fullNameLabel')}</label>
                      <input type="text" required placeholder="Aarav Sharma" class="apothecary-input text-xs sm:text-sm" />
                    </div>
                    <div>
                      <label class="block text-[10.5px] sm:text-[11px] font-label-caps uppercase text-on-surface-variant mb-1 font-bold">${t('pincodeLabel')}</label>
                      <input type="text" required pattern="[0-9]{6}" placeholder="560001" class="apothecary-input text-xs sm:text-sm" />
                    </div>
                    <div class="sm:col-span-2">
                      <label class="block text-[10.5px] sm:text-[11px] font-label-caps uppercase text-on-surface-variant mb-1 font-bold">${t('flatLabel')}</label>
                      <input type="text" required placeholder="Flat 402, Lotus Greens" class="apothecary-input text-xs sm:text-sm" />
                    </div>
                    <div class="sm:col-span-2">
                      <label class="block text-[10.5px] sm:text-[11px] font-label-caps uppercase text-on-surface-variant mb-1 font-bold">${t('streetLabel')}</label>
                      <input type="text" required placeholder="742 Evergreen Road, Near Temple" class="apothecary-input text-xs sm:text-sm" />
                    </div>
                    <div>
                      <label class="block text-[10.5px] sm:text-[11px] font-label-caps uppercase text-on-surface-variant mb-1 font-bold">${t('cityLabel')}</label>
                      <input type="text" required placeholder="Bengaluru" class="apothecary-input text-xs sm:text-sm" />
                    </div>
                    <div>
                      <label class="block text-[10.5px] sm:text-[11px] font-label-caps uppercase text-on-surface-variant mb-1 font-bold">${t('stateLabel')}</label>
                      <input type="text" required placeholder="Karnataka" class="apothecary-input text-xs sm:text-sm" />
                    </div>
                  </div>
                </div>

                <!-- Section 3: Courier Selection -->
                <div class="bg-surface-container-low p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-primary/5 shadow-editorial w-full">
                  <div class="flex items-center justify-between mb-4 sm:mb-5">
                    <h3 class="font-display text-base sm:text-xl font-bold text-primary flex items-center gap-2.5 sm:gap-3">
                      <span class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-surface text-xs font-label-caps flex items-center justify-center font-bold flex-shrink-0">3</span>
                      <span>${t('step3Title')}</span>
                    </h3>
                    <span class="text-[10px] sm:text-[11px] text-accent font-label-caps uppercase font-bold">${t('step3Step')}</span>
                  </div>

                  <div class="flex flex-col gap-2.5 sm:gap-3">
                    <label class="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer gap-2.5 ${selectedShippingOption === 'standard' ? 'border-accent bg-surface shadow-sm' : 'border-primary/10 hover:border-primary/25'}">
                      <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <input type="radio" name="shipping-method" value="standard" class="accent-accent w-4 h-4 flex-shrink-0" ${selectedShippingOption === 'standard' ? 'checked' : ''} />
                        <div class="min-w-0">
                          <strong class="font-display text-xs sm:text-sm text-primary block truncate">${t('standardCourier')}</strong>
                          <span class="text-[10px] sm:text-[11px] text-on-surface-variant truncate block">${t('standardCourierTime')}</span>
                        </div>
                      </div>
                      <span class="font-display text-xs sm:text-sm font-bold text-primary flex-shrink-0">
                        ${totals.isFreeShipping ? `<span class="text-accent font-label-caps uppercase text-xs">${t('freeDelivery')}</span>` : '₹80'}
                      </span>
                    </label>

                    <label class="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer gap-2.5 ${selectedShippingOption === 'express' ? 'border-accent bg-surface shadow-sm' : 'border-primary/10 hover:border-primary/25'}">
                      <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <input type="radio" name="shipping-method" value="express" class="accent-accent w-4 h-4 flex-shrink-0" ${selectedShippingOption === 'express' ? 'checked' : ''} />
                        <div class="min-w-0">
                          <strong class="font-display text-xs sm:text-sm text-primary block truncate">${t('expressCourier')}</strong>
                          <span class="text-[10px] sm:text-[11px] text-on-surface-variant truncate block">${t('expressCourierTime')}</span>
                        </div>
                      </div>
                      <span class="font-display text-xs sm:text-sm font-bold text-primary flex-shrink-0">₹150</span>
                    </label>
                  </div>
                </div>

                <!-- Section 4: Payment Option -->
                <div class="bg-surface-container-low p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-primary/5 shadow-editorial w-full">
                  <div class="flex items-center justify-between mb-4 sm:mb-5">
                    <h3 class="font-display text-base sm:text-xl font-bold text-primary flex items-center gap-2.5 sm:gap-3">
                      <span class="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-surface text-xs font-label-caps flex items-center justify-center font-bold flex-shrink-0">4</span>
                      <span>${t('step4Title')}</span>
                    </h3>
                    <span class="text-[10px] sm:text-[11px] text-accent font-label-caps uppercase font-bold">${t('step4Step')}</span>
                  </div>

                  <div class="flex flex-col gap-2.5 sm:gap-3">
                    <label class="flex items-center justify-between p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border cursor-pointer transition-all ${selectedPaymentMethod === 'upi' ? 'border-accent bg-surface shadow-sm' : 'border-primary/10 hover:border-primary/20'}">
                      <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <input type="radio" name="payment-method" value="upi" class="accent-accent w-4 h-4 flex-shrink-0" ${selectedPaymentMethod === 'upi' ? 'checked' : ''} />
                        <div class="min-w-0">
                          <strong class="font-display text-xs sm:text-sm text-primary block truncate">${t('upiTitle')}</strong>
                          <span class="text-[10px] sm:text-[11px] text-on-surface-variant truncate block">${t('upiSub')}</span>
                        </div>
                      </div>
                      <span class="material-symbols-outlined text-accent text-xl flex-shrink-0">qr_code_2</span>
                    </label>

                    <label class="flex items-center justify-between p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border cursor-pointer transition-all ${selectedPaymentMethod === 'card' ? 'border-accent bg-surface shadow-sm' : 'border-primary/10 hover:border-primary/20'}">
                      <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <input type="radio" name="payment-method" value="card" class="accent-accent w-4 h-4 flex-shrink-0" ${selectedPaymentMethod === 'card' ? 'checked' : ''} />
                        <div class="min-w-0">
                          <strong class="font-display text-xs sm:text-sm text-primary block truncate">${t('cardTitle')}</strong>
                          <span class="text-[10px] sm:text-[11px] text-on-surface-variant truncate block">${t('cardSub')}</span>
                        </div>
                      </div>
                      <span class="material-symbols-outlined text-accent text-xl flex-shrink-0">credit_card</span>
                    </label>

                    <label class="flex items-center justify-between p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border cursor-pointer transition-all ${selectedPaymentMethod === 'cod' ? 'border-accent bg-surface shadow-sm' : 'border-primary/10 hover:border-primary/20'}">
                      <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <input type="radio" name="payment-method" value="cod" class="accent-accent w-4 h-4 flex-shrink-0" ${selectedPaymentMethod === 'cod' ? 'checked' : ''} />
                        <div class="min-w-0">
                          <strong class="font-display text-xs sm:text-sm text-primary block truncate">${t('codTitle')}</strong>
                          <span class="text-[10px] sm:text-[11px] text-on-surface-variant truncate block">${t('codSub')}</span>
                        </div>
                      </div>
                      <span class="material-symbols-outlined text-accent text-xl flex-shrink-0">payments</span>
                    </label>
                  </div>
                </div>

                <!-- Complete Button -->
                <button 
                  type="submit" 
                  class="w-full bg-accent hover:bg-accent-hover text-on-primary py-4 sm:py-5 px-6 rounded-xl sm:rounded-2xl font-label-caps text-xs sm:text-sm uppercase tracking-wider font-bold transition-all transform hover:-translate-y-0.5 shadow-xl shadow-accent/30 flex items-center justify-center gap-2 text-center"
                >
                  <span class="material-symbols-outlined text-lg sm:text-xl flex-shrink-0">spa</span>
                  <span class="truncate">${t('placeOrderBtn')} • ₹${finalTotal.toFixed(0)}</span>
                </button>

              </form>
            </div>

            <!-- Right: Order Summary Sidebar (5 cols) -->
            <div class="lg:col-span-5 bg-surface-container-low p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-primary/5 shadow-editorial sticky top-28 flex flex-col gap-4 sm:gap-6 w-full">
              
              <div class="flex items-center justify-between border-b border-primary/10 pb-3 sm:pb-4">
                <h3 class="font-display text-lg sm:text-xl font-bold text-primary">
                  ${t('orderSummary')}
                </h3>
                <span class="text-[11px] sm:text-xs bg-surface border border-primary/10 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-label-caps text-primary font-bold">
                  ${totals.itemCount} ${t('itemsText')}
                </span>
              </div>

              <!-- Mini items list -->
              <div class="max-h-56 sm:max-h-64 overflow-y-auto flex flex-col gap-2.5 sm:gap-3 pr-1">
                ${items.map(item => {
                  const effectivePrice = item.isSubscription ? item.product.price * 0.9 : item.product.price;
                  return `
                    <div class="flex items-center gap-3 pb-2.5 sm:pb-3 border-b border-primary/5">
                      <img src="${item.product.image}" alt="${item.product.name}" class="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl object-cover border border-primary/5 bg-surface flex-shrink-0" loading="lazy" decoding="async" />
                      <div class="flex-1 min-w-0">
                        <h4 class="font-display text-xs sm:text-sm font-bold text-primary truncate">${item.product.name}</h4>
                        <p class="text-[10px] sm:text-[11px] text-on-surface-variant">Qty: ${item.quantity} • ${item.size}</p>
                      </div>
                      <span class="font-display text-xs sm:text-sm font-bold text-primary flex-shrink-0">₹${(effectivePrice * item.quantity).toFixed(0)}</span>
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Price Breakdown -->
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
                  <span class="font-bold text-primary font-display">
                    ${shippingCost === 0 ? `<strong class="text-accent font-label-caps uppercase text-xs font-bold">${t('freeDelivery')}</strong>` : `₹${shippingCost.toFixed(0)}`}
                  </span>
                </div>

                <div class="flex justify-between text-on-surface-variant">
                  <span>${t('gstLabel')}</span>
                  <span class="font-display font-semibold">₹${totals.tax.toFixed(0)}</span>
                </div>

                <div class="flex justify-between text-base sm:text-xl font-bold text-primary pt-3 sm:pt-4 border-t border-primary/10">
                  <span>${t('totalAmountLabel')}</span>
                  <span class="font-display text-xl sm:text-3xl text-primary font-bold">₹${finalTotal.toFixed(0)}</span>
                </div>
              </div>

              <!-- Purity guarantee badge -->
              <div class="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-surface border border-primary/10 text-[11px] sm:text-xs text-on-surface-variant flex items-center gap-2.5 sm:gap-3">
                <span class="material-symbols-outlined text-accent text-lg sm:text-xl flex-shrink-0">shield</span>
                <span>${t('purityGuarantee')}</span>
              </div>

            </div>

          </div>
        `}

      </div>
    </div>
  `;
}

function renderOrderConfirmation(orderId) {
  return `
    <div class="w-full bg-surface pt-8 sm:pt-12 pb-section-gap">
      <div class="px-4 sm:px-8 lg:px-12 max-w-3xl mx-auto">
        <div class="bg-surface-container-low p-6 sm:p-14 rounded-3xl sm:rounded-[2.5rem] border border-primary/10 shadow-2xl text-center">
          
          <div class="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-primary text-accent flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl shadow-primary-container/20 animate-scale-in">
            <span class="material-symbols-outlined text-3xl sm:text-5xl">check_circle</span>
          </div>

          <span class="font-label-caps text-[10px] sm:text-xs text-accent uppercase tracking-widest font-bold block mb-1.5 sm:mb-2">${t('orderConfirmedSub')}</span>
          <h1 class="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-primary mb-3 sm:mb-4">${t('orderConfirmedTitle')}</h1>
          
          <p class="font-body text-xs sm:text-base text-on-surface-variant max-w-md mx-auto mb-6 sm:mb-8 leading-relaxed">
            ${t('orderConfirmedDesc')}
          </p>

          <div class="bg-surface p-4 sm:p-6 rounded-2xl border border-primary/10 text-left max-w-md mx-auto mb-6 sm:mb-8 text-xs text-on-surface-variant flex flex-col gap-2 shadow-sm">
            <div class="flex justify-between">
              <span>${t('orderRef')}</span>
              <strong class="text-primary font-display text-xs sm:text-sm font-bold">${orderId}</strong>
            </div>
            <div class="flex justify-between">
              <span>${t('estimatedDelivery')}</span>
              <strong class="text-primary">${t('estimatedDeliveryTime')}</strong>
            </div>
            <div class="flex justify-between">
              <span>${t('deliveryMode')}</span>
              <strong class="text-primary">${t('deliveryModeVal')}</strong>
            </div>
            <div class="flex justify-between">
              <span>${t('orderUpdates')}</span>
              <strong class="text-primary">${t('orderUpdatesVal')}</strong>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a 
              href="#/shop" 
              id="order-continue-shopping-btn"
              class="w-full sm:w-auto bg-accent hover:bg-accent-hover text-on-primary px-7 py-3.5 rounded-xl font-label-caps text-xs uppercase tracking-wider font-bold shadow-lg shadow-accent/20 transition-all text-center"
            >
              ${t('continueExploring')}
            </a>
            <a 
              href="#/story" 
              class="w-full sm:w-auto border border-primary/20 hover:border-primary text-primary px-7 py-3.5 rounded-xl font-label-caps text-xs uppercase tracking-wider font-bold hover:bg-surface transition-all text-center"
            >
              ${t('readSourcingStory')}
            </a>
          </div>

        </div>
      </div>
    </div>
  `;
}

export function attachCheckoutEvents(rerender) {
  // Shipping method change
  document.querySelectorAll('input[name="shipping-method"]').forEach(radio => {
    radio.onchange = (e) => {
      selectedShippingOption = e.target.value;
      rerender();
    };
  });

  // Payment method change
  document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
    radio.onchange = (e) => {
      selectedPaymentMethod = e.target.value;
      rerender();
    };
  });

  // Submit form
  const form = document.getElementById('checkout-main-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      placedOrderId = 'AB-IN-' + Math.floor(100000 + Math.random() * 900000);
      isOrderPlaced = true;
      clearCart();
      showToast(`Order #${placedOrderId} placed successfully!`);
      rerender();
    };
  }

  const continueBtn = document.getElementById('order-continue-shopping-btn');
  if (continueBtn) {
    continueBtn.onclick = () => {
      isOrderPlaced = false;
      placedOrderId = '';
    };
  }
}
