import { products, getProductById, getLocalizedProducts } from '../store/products.js';
import { addToCart, getProductTotalQuantity } from '../store/cart.js';
import { showToast } from '../components/Toast.js';
import { t } from '../store/i18n.js';

let selectedSizeIndex = 0;
let isSubscriptionMode = false;
let quantity = 1;
let selectedImageIndex = 0;

export function renderProductDetailPage(productId) {
  const product = getProductById(productId) || getLocalizedProducts()[0];
  selectedSizeIndex = 0;
  isSubscriptionMode = false;
  quantity = 1;
  selectedImageIndex = 0;

  const inCartQty = getProductTotalQuantity(product.id);
  const currentPrice = isSubscriptionMode ? (product.price * 0.9) : product.price;
  const pairedProducts = getLocalizedProducts().filter(p => p.id !== product.id).slice(0, 3);

  return `
    <div class="w-full bg-surface pt-4 sm:pt-6 pb-section-gap">
      <div class="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-label-caps uppercase tracking-[0.10em] sm:tracking-[0.15em] text-on-surface-variant mb-6 sm:mb-10 overflow-x-auto whitespace-nowrap pb-1">
          <a href="#/" class="hover:text-primary transition-colors flex-shrink-0">Home</a>
          <span>/</span>
          <a href="#/shop" class="hover:text-primary transition-colors flex-shrink-0">${t('shopBannerTitle')}</a>
          <span>/</span>
          <span class="text-primary font-bold flex-shrink-0">${product.category}</span>
          <span>/</span>
          <span class="text-on-surface-variant/70 truncate max-w-[120px] sm:max-w-none">${product.name}</span>
        </nav>

        <!-- Main Product Section -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start mb-16 sm:mb-24">
          
          <!-- Left: Gallery -->
          <div class="lg:col-span-7 flex flex-col-reverse md:flex-row gap-3 sm:gap-6 sticky top-28">
            <!-- Thumbnails -->
            <div class="flex md:flex-col gap-2.5 sm:gap-3 overflow-x-auto pb-2 md:pb-0">
              ${(product.gallery || [product.image]).map((img, idx) => `
                <button 
                  data-img-idx="${idx}" 
                  class="product-thumb-btn w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-surface ${selectedImageIndex === idx ? 'border-accent shadow-md' : 'border-primary/10 opacity-70 hover:opacity-100'}"
                >
                  <img src="${img}" alt="Thumbnail ${idx + 1}" class="w-full h-full object-cover" loading="lazy" decoding="async" />
                </button>
              `).join('')}
            </div>

            <!-- Main Image -->
            <div class="flex-1 aspect-[4/3] sm:aspect-[5/4] rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-primary/5 bg-surface shadow-editorial relative group">
              <img 
                id="main-product-image" 
                src="${(product.gallery && product.gallery[selectedImageIndex]) || product.image}" 
                alt="${product.name}" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                loading="eager"
                decoding="async"
              />
              ${product.badge ? `
                <span class="absolute top-4 left-4 sm:top-6 sm:left-6 bg-surface/95 backdrop-blur-md text-primary text-[10px] sm:text-xs font-label-caps uppercase font-bold tracking-wider px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-primary/10 shadow-sm">
                  ${product.badge}
                </span>
              ` : ''}
            </div>
          </div>

          <!-- Right: Product Information & Purchase -->
          <div class="lg:col-span-5 flex flex-col">
            
            <div class="border-b border-primary/10 pb-4 sm:pb-6 mb-4 sm:mb-6">
              <div class="flex items-center justify-between mb-1.5 sm:mb-2 gap-2">
                <span class="font-label-caps text-[10px] sm:text-xs text-accent uppercase tracking-widest font-bold truncate">${product.category}</span>
                <div class="flex items-center gap-1 text-xs text-primary font-bold flex-shrink-0">
                  <span class="material-symbols-outlined text-accent text-sm fill">star</span>
                  <span>${product.rating}</span>
                  <span class="text-on-surface-variant font-normal">(${product.reviewsCount})</span>
                </div>
              </div>

              <h1 class="font-display text-2xl sm:text-4xl font-bold text-primary mb-1 sm:mb-2">${product.name}</h1>
              <p class="text-xs text-on-surface-variant italic font-body mb-3 sm:mb-4">${product.botanicalName}</p>
              
              <div class="flex items-baseline gap-3 sm:gap-4 flex-wrap">
                <span id="product-display-price" class="font-display text-2xl sm:text-4xl font-bold text-primary">
                  ₹${currentPrice.toFixed(0)}
                </span>
                ${isSubscriptionMode ? `
                  <span class="text-[11px] sm:text-xs text-accent font-label-caps uppercase tracking-wider font-bold">10% Monthly Savings</span>
                ` : ''}
              </div>
            </div>

            <!-- Description -->
            <p class="font-body text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6 sm:mb-8">
              ${product.description}
            </p>

            <!-- Size Selector -->
            <div class="mb-4 sm:mb-6">
              <label class="block font-label-caps text-xs text-primary uppercase tracking-wider font-bold mb-2 sm:mb-3">
                ${t('selectSizeLabel')}
              </label>
              <div class="grid grid-cols-2 gap-2.5 sm:gap-3 w-full">
                ${product.sizes.map((s, idx) => `
                  <button 
                    data-size-idx="${idx}" 
                    class="product-size-btn p-2.5 sm:p-3.5 rounded-xl border text-xs font-label-caps uppercase tracking-wider transition-all text-center truncate ${selectedSizeIndex === idx ? 'border-primary bg-primary text-surface font-bold shadow-sm' : 'border-primary/20 text-on-surface-variant hover:border-primary'}"
                  >
                    ${s}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Monthly Delivery Option Card -->
            <div class="p-3.5 sm:p-5 rounded-2xl bg-surface-container-low border border-primary/10 mb-6 sm:mb-8 flex flex-col gap-2 sm:gap-3 w-full">
              <div class="flex items-center justify-between cursor-pointer gap-2" id="subscription-toggle">
                <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <input 
                    type="checkbox" 
                    id="sub-checkbox" 
                    class="w-4 h-4 text-accent accent-accent rounded cursor-pointer flex-shrink-0" 
                    ${isSubscriptionMode ? 'checked' : ''} 
                  />
                  <div class="min-w-0">
                    <strong class="font-display text-xs sm:text-sm text-primary block truncate">${t('monthlyPlanTitle')}</strong>
                    <span class="text-[11px] sm:text-xs text-on-surface-variant truncate block">${t('monthlyPlanSub')}</span>
                  </div>
                </div>
                <span class="text-[10px] sm:text-xs font-bold text-accent bg-accent/10 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full flex-shrink-0">${t('save10')}</span>
              </div>
            </div>

            <!-- Quantity & Add to Cart -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 mb-4 sm:mb-6 w-full">
              <div class="flex items-center justify-between sm:justify-start border border-primary/20 rounded-xl bg-surface-container-low p-1 w-full sm:w-auto">
                <button id="pdp-qty-dec" class="w-12 sm:w-10 h-11 sm:h-12 text-primary hover:bg-surface rounded-lg font-bold transition-colors">−</button>
                <span id="pdp-qty-val" class="w-10 text-center font-display font-bold text-primary">${quantity}</span>
                <button id="pdp-qty-inc" class="w-12 sm:w-10 h-11 sm:h-12 text-primary hover:bg-surface rounded-lg font-bold transition-colors">+</button>
              </div>

              <button 
                id="pdp-add-to-cart-btn" 
                class="flex-1 bg-accent hover:bg-accent-hover text-on-primary py-3.5 sm:py-4 px-6 rounded-xl font-label-caps text-xs uppercase tracking-wider font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-accent/25 flex items-center justify-center gap-2 text-center"
              >
                <span class="material-symbols-outlined text-[18px]">shopping_bag</span>
                <span class="truncate">${t('addToShoppingCart')}</span>
              </button>
            </div>

            <!-- In-Cart Status indicator -->
            <div id="pdp-in-cart-indicator" class="${inCartQty > 0 ? 'flex' : 'hidden'} items-center gap-2 text-xs font-bold text-primary bg-surface-container-low px-3.5 py-2 rounded-xl border border-primary/10 mb-6">
              <span class="material-symbols-outlined text-accent text-base">check_circle</span>
              <span>Currently in your cart: <strong id="pdp-in-cart-count" class="text-accent">${inCartQty}</strong> items</span>
            </div>

            <!-- Trust highlights -->
            <div class="grid grid-cols-2 gap-3 sm:gap-4 text-[11px] sm:text-xs text-on-surface-variant pt-4 sm:pt-6 border-t border-primary/10 mb-6 sm:mb-8">
              <div class="flex items-center gap-2 min-w-0">
                <span class="material-symbols-outlined text-accent text-base sm:text-lg flex-shrink-0">local_shipping</span>
                <span class="truncate">${t('freeCourierHighlight')}</span>
              </div>
              <div class="flex items-center gap-2 min-w-0">
                <span class="material-symbols-outlined text-accent text-base sm:text-lg flex-shrink-0">verified_user</span>
                <span class="truncate">${t('certifiedHighlight')}</span>
              </div>
            </div>

            <!-- Simple Accordions -->
            <div class="flex flex-col border-t border-primary/10">
              
              <!-- Accordion 1 -->
              <details class="group border-b border-primary/10 py-3.5 sm:py-4 cursor-pointer" open>
                <summary class="flex justify-between items-center list-none font-display font-bold text-sm sm:text-base text-primary">
                  <span>${t('ingredientsAccordion')}</span>
                  <span class="material-symbols-outlined text-primary group-open:rotate-180 transition-transform flex-shrink-0">expand_more</span>
                </summary>
                <div class="mt-2.5 sm:mt-3 text-xs text-on-surface-variant leading-relaxed">
                  <p class="mb-1.5 sm:mb-2 font-medium text-primary">${product.ingredients}</p>
                  <p>${product.details}</p>
                </div>
              </details>

              <!-- Accordion 2 -->
              <details class="group border-b border-primary/10 py-3.5 sm:py-4 cursor-pointer">
                <summary class="flex justify-between items-center list-none font-display font-bold text-sm sm:text-base text-primary">
                  <span>${t('recipeAccordion')}</span>
                  <span class="material-symbols-outlined text-primary group-open:rotate-180 transition-transform flex-shrink-0">expand_more</span>
                </summary>
                <div class="mt-2.5 sm:mt-3 text-xs text-on-surface-variant leading-relaxed">
                  <p>${product.ritual}</p>
                </div>
              </details>

              <!-- Accordion 3 -->
              <details class="group border-b border-primary/10 py-3.5 sm:py-4 cursor-pointer">
                <summary class="flex justify-between items-center list-none font-display font-bold text-sm sm:text-base text-primary">
                  <span>${t('testingAccordion')}</span>
                  <span class="material-symbols-outlined text-primary group-open:rotate-180 transition-transform flex-shrink-0">expand_more</span>
                </summary>
                <div class="mt-2.5 sm:mt-3 text-xs text-on-surface-variant leading-relaxed">
                  <p>${product.purity}</p>
                </div>
              </details>

              <!-- Accordion 4 -->
              <details class="group border-b border-primary/10 py-3.5 sm:py-4 cursor-pointer">
                <summary class="flex justify-between items-center list-none font-display font-bold text-sm sm:text-base text-primary">
                  <span>${t('packagingAccordion')}</span>
                  <span class="material-symbols-outlined text-primary group-open:rotate-180 transition-transform flex-shrink-0">expand_more</span>
                </summary>
                <div class="mt-2.5 sm:mt-3 text-xs text-on-surface-variant leading-relaxed">
                  <p>${product.sustainability}</p>
                </div>
              </details>

            </div>

          </div>

        </div>

        <!-- Frequently Bought Together -->
        <div class="pt-10 sm:pt-16 border-t border-primary/10">
          <div class="flex justify-between items-baseline mb-6 sm:mb-8">
            <h2 class="font-display text-xl sm:text-3xl font-bold text-primary">${t('frequentlyBought')}</h2>
            <a href="#/shop" class="font-label-caps text-xs text-primary font-bold uppercase hover:text-accent tracking-wider">${t('viewAll')}</a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            ${pairedProducts.map(p => `
              <div class="bg-surface-container-low p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-primary/5 flex items-center gap-3 sm:gap-4 group shadow-sm hover:shadow-md transition-shadow">
                <img src="${p.image}" alt="${p.name}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover border border-primary/5 bg-surface flex-shrink-0" loading="lazy" decoding="async" />
                <div class="flex-1 min-w-0">
                  <span class="text-[9.5px] sm:text-[10px] font-label-caps uppercase text-accent font-bold block">${p.category}</span>
                  <a href="#/product/${p.id}" class="font-display text-sm sm:text-base font-bold text-primary group-hover:text-accent transition-colors block truncate">${p.name}</a>
                  <span class="font-display text-xs sm:text-sm font-bold text-primary block mt-0.5 sm:mt-1">₹${p.price.toFixed(0)}</span>
                </div>
                <a href="#/product/${p.id}" class="p-2 sm:p-2.5 rounded-full border border-primary/20 hover:border-primary text-primary hover:bg-surface transition-colors flex-shrink-0" title="View Product">
                  <span class="material-symbols-outlined text-sm sm:text-base">arrow_forward</span>
                </a>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;
}

export function attachProductDetailEvents(product) {
  if (!product) return;

  // Thumbnail buttons
  document.querySelectorAll('.product-thumb-btn').forEach(btn => {
    btn.onclick = () => {
      selectedImageIndex = parseInt(btn.dataset.imgIdx, 10);
      const mainImg = document.getElementById('main-product-image');
      if (mainImg && product.gallery && product.gallery[selectedImageIndex]) {
        mainImg.src = product.gallery[selectedImageIndex];
      }
      document.querySelectorAll('.product-thumb-btn').forEach((b, idx) => {
        if (idx === selectedImageIndex) {
          b.className = 'product-thumb-btn w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-surface border-accent shadow-md';
        } else {
          b.className = 'product-thumb-btn w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-surface border-primary/10 opacity-70 hover:opacity-100';
        }
      });
    };
  });

  // Size buttons
  document.querySelectorAll('.product-size-btn').forEach(btn => {
    btn.onclick = () => {
      selectedSizeIndex = parseInt(btn.dataset.sizeIdx, 10);
      document.querySelectorAll('.product-size-btn').forEach((b, idx) => {
        if (idx === selectedSizeIndex) {
          b.className = 'product-size-btn p-2.5 sm:p-3.5 rounded-xl border text-xs font-label-caps uppercase tracking-wider transition-all text-center truncate border-primary bg-primary text-surface font-bold shadow-sm';
        } else {
          b.className = 'product-size-btn p-2.5 sm:p-3.5 rounded-xl border text-xs font-label-caps uppercase tracking-wider transition-all text-center truncate border-primary/20 text-on-surface-variant hover:border-primary';
        }
      });
    };
  });

  // Subscription toggle
  const subToggle = document.getElementById('subscription-toggle');
  const subCheckbox = document.getElementById('sub-checkbox');
  const priceDisplay = document.getElementById('product-display-price');

  if (subToggle && subCheckbox && priceDisplay) {
    subToggle.onclick = () => {
      isSubscriptionMode = !isSubscriptionMode;
      subCheckbox.checked = isSubscriptionMode;
      const price = isSubscriptionMode ? (product.price * 0.9) : product.price;
      priceDisplay.textContent = `₹${price.toFixed(0)}`;
    };
  }

  // Quantity handlers
  const qtyDec = document.getElementById('pdp-qty-dec');
  const qtyInc = document.getElementById('pdp-qty-inc');
  const qtyVal = document.getElementById('pdp-qty-val');

  if (qtyDec && qtyInc && qtyVal) {
    qtyDec.onclick = () => {
      if (quantity > 1) {
        quantity--;
        qtyVal.textContent = quantity;
      }
    };
    qtyInc.onclick = () => {
      quantity++;
      qtyVal.textContent = quantity;
    };
  }

  // Add to cart (NO drawer popup)
  const addToCartBtn = document.getElementById('pdp-add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.onclick = () => {
      const selectedSize = product.sizes[selectedSizeIndex] || 'Standard';
      addToCart(product, quantity, selectedSize, isSubscriptionMode);
      showToast(`Added ${quantity}× ${product.name} (${selectedSize}) to cart.`);
      
      // Update in-cart indicator
      const inCartQty = getProductTotalQuantity(product.id);
      const indicator = document.getElementById('pdp-in-cart-indicator');
      const countEl = document.getElementById('pdp-in-cart-count');
      if (indicator && countEl) {
        countEl.textContent = inCartQty;
        indicator.classList.remove('hidden');
        indicator.classList.add('flex');
      }
    };
  }
}
