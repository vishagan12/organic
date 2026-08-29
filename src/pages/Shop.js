import { getLocalizedProducts } from '../store/products.js';
import { renderProductActionButtonHtml } from '../utils/productActions.js';
import { t, getLanguage } from '../store/i18n.js';

let selectedCategory = 'All';
let selectedBenefit = null;
let sortBy = 'featured';

export function renderShopPage() {
  const products = getLocalizedProducts();
  const isTa = getLanguage() === 'ta';

  const categoriesEn = ['All', 'Grains & Flours', 'Juices & Drinks', 'Wellness Drops', 'Healthy Snacks', 'Earthen Kitchenware'];
  const categoriesTa = ['அனைத்தும்', 'தானியங்கள் & மாவு', 'பழச்சாறுகள் & பானங்கள்', 'மூலிகை துளிகள்', 'ஆரோக்கிய சிற்றுண்டி', 'களிமண் பாத்திரங்கள்'];
  
  const categories = (isTa ? categoriesTa : categoriesEn).map((catName, idx) => {
    const rawCategory = categoriesEn[idx];
    const count = rawCategory === 'All' 
      ? products.length 
      : products.filter(p => p.category === (isTa ? categoriesTa[idx] : rawCategory) || p.category === rawCategory).length;
    return { name: catName, rawName: rawCategory, count };
  });

  const benefitsEn = ['Energy', 'Easy Digestion', 'Immunity', 'Daily Health'];
  const benefitsTa = ['உடல் ஆற்றல்', 'எளிய செரிமானம்', 'நோய் எதிர்ப்பு சக்தி', 'தினசரி நலம்'];
  const benefits = isTa ? benefitsTa : benefitsEn;

  // Filter products
  let filtered = products.filter(p => {
    if (selectedCategory !== 'All' && selectedCategory !== 'அனைத்தும்') {
      const matchCat = isTa 
        ? (p.category === selectedCategory || p.categoryTa === selectedCategory) 
        : (p.category === selectedCategory);
      if (!matchCat) return false;
    }
    if (selectedBenefit) {
      const matchBenefit = p.benefits.includes(selectedBenefit);
      if (!matchBenefit) return false;
    }
    return true;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return `
    <div class="w-full bg-surface pt-4 sm:pt-10 pb-section-gap">
      <div class="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        
        <!-- Header Banner -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-6 sm:mb-12 border-b border-primary/10 pb-4 sm:pb-6 gap-2 sm:gap-4">
          <div>
            <span class="font-label-caps text-[9.5px] sm:text-[10px] tracking-[0.25em] text-accent uppercase mb-1 sm:mb-2 block font-bold">${t('shopBannerTag')}</span>
            <h1 class="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-primary">${t('shopBannerTitle')}</h1>
          </div>
          <span class="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
            ${t('showingItems')} <strong class="text-primary font-bold">${filtered.length}</strong> ${t('ofItems')} ${products.length} ${t('itemsText')}
          </span>
        </div>

        <!-- Mobile Horizontal Swipeable Category Bar (< lg) -->
        <div class="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto no-scrollbar flex items-center gap-2 pb-2">
          ${categories.map(c => `
            <button 
              data-category="${c.rawName}" 
              class="shop-cat-btn flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-medium transition-all ${selectedCategory === c.rawName || selectedCategory === c.name ? 'bg-primary text-surface border-primary font-bold shadow-sm' : 'bg-surface-container-low border-primary/10 text-on-surface-variant'}"
            >
              <span>${c.name}</span>
              <span class="text-[10px] opacity-75 font-semibold">(${c.count})</span>
            </button>
          `).join('')}
        </div>

        <!-- Mobile Quick Sort & Health Filter Row (< lg) -->
        <div class="lg:hidden flex items-center justify-between gap-2 mb-6">
          <select id="shop-mobile-sort-select" class="bg-surface-container-low border border-primary/15 rounded-xl px-3 py-2 text-xs text-primary font-semibold focus:outline-none flex-1 truncate">
            <option value="featured" ${sortBy === 'featured' ? 'selected' : ''}>${t('sortFeatured')}</option>
            <option value="price-low" ${sortBy === 'price-low' ? 'selected' : ''}>${t('sortPriceLow')}</option>
            <option value="price-high" ${sortBy === 'price-high' ? 'selected' : ''}>${t('sortPriceHigh')}</option>
            <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>${t('sortRating')}</option>
          </select>

          <button id="shop-mobile-filter-toggle" class="bg-surface-container-low border border-primary/15 rounded-xl px-3.5 py-2 text-xs text-primary font-semibold flex items-center gap-1.5 flex-shrink-0">
            <span class="material-symbols-outlined text-[18px] text-accent">tune</span>
            <span>Filters ${selectedBenefit ? `(1)` : ''}</span>
          </button>
        </div>

        <!-- Mobile Health Goals Collapsible Strip -->
        <div id="shop-mobile-filter-panel" class="${selectedBenefit ? 'block' : 'hidden'} lg:hidden p-4 rounded-2xl bg-surface-container-low border border-primary/10 mb-6">
          <span class="text-xs font-bold text-primary block mb-2">${t('healthGoalLabel')}</span>
          <div class="flex flex-wrap gap-2">
            ${benefits.map(b => `
              <button 
                data-benefit="${b}" 
                class="shop-benefit-btn text-xs px-3 py-1 rounded-full border transition-all ${selectedBenefit === b ? 'bg-accent text-on-primary border-accent font-bold shadow-sm' : 'border-primary/20 text-on-surface-variant hover:border-primary'}"
              >
                ${b}
              </button>
            `).join('')}
            ${selectedBenefit ? `
              <button id="mobile-clear-benefit-btn" class="text-xs text-error underline pl-1 py-1 font-bold">Clear</button>
            ` : ''}
          </div>
        </div>

        <!-- Layout Grid -->
        <div class="grid grid-cols-12 gap-6 sm:gap-8 items-start">
          
          <!-- Desktop Filter Sidebar -->
          <aside class="hidden lg:block lg:col-span-3 sticky top-28 bg-surface-container-low p-6 sm:p-7 rounded-[2rem] border border-primary/5 shadow-editorial">
            <div class="flex flex-col gap-8">
              
              <!-- Categories -->
              <div>
                <h3 class="font-display text-lg font-bold text-primary mb-4 border-b border-primary/10 pb-2">${t('categoriesLabel')}</h3>
                <ul class="flex flex-col gap-1.5">
                  ${categories.map(c => `
                    <li>
                      <button 
                        data-category="${c.rawName}" 
                        class="shop-cat-btn w-full flex items-center justify-between text-xs sm:text-sm py-2 px-3 rounded-xl transition-all text-left truncate ${selectedCategory === c.rawName || selectedCategory === c.name ? 'bg-primary text-surface font-semibold shadow-sm' : 'text-on-surface-variant hover:text-primary hover:bg-surface'}"
                      >
                        <span class="truncate pr-2">${c.name}</span>
                        <span class="text-xs flex-shrink-0 ${selectedCategory === c.rawName || selectedCategory === c.name ? 'text-accent font-bold' : 'text-on-surface-variant/60'}">${c.count}</span>
                      </button>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- Benefits Filter -->
              <div>
                <h3 class="font-display text-lg font-bold text-primary mb-4 border-b border-primary/10 pb-2">${t('healthGoalLabel')}</h3>
                <div class="flex flex-wrap gap-2">
                  ${benefits.map(b => `
                    <button 
                      data-benefit="${b}" 
                      class="shop-benefit-btn text-xs font-label-caps uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all ${selectedBenefit === b ? 'bg-accent text-on-primary border-accent font-bold shadow-sm' : 'border-primary/20 text-on-surface-variant hover:border-primary'}"
                    >
                      ${b}
                    </button>
                  `).join('')}
                  ${selectedBenefit ? `
                    <button id="clear-benefit-btn" class="text-xs text-error underline font-label-caps uppercase pl-1 py-1 font-bold">Clear</button>
                  ` : ''}
                </div>
              </div>

              <!-- Sorting -->
              <div>
                <h3 class="font-display text-lg font-bold text-primary mb-4 border-b border-primary/10 pb-2">${t('sortByLabel')}</h3>
                <select id="shop-sort-select" class="w-full bg-surface border border-primary/20 rounded-xl p-2.5 sm:p-3 text-xs text-primary font-medium focus:outline-none focus:border-accent">
                  <option value="featured" ${sortBy === 'featured' ? 'selected' : ''}>${t('sortFeatured')}</option>
                  <option value="price-low" ${sortBy === 'price-low' ? 'selected' : ''}>${t('sortPriceLow')}</option>
                  <option value="price-high" ${sortBy === 'price-high' ? 'selected' : ''}>${t('sortPriceHigh')}</option>
                  <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>${t('sortRating')}</option>
                </select>
              </div>

              <!-- Guarantee badge -->
              <div class="p-4 rounded-2xl bg-surface border border-primary/10 text-xs text-on-surface-variant flex items-center gap-3">
                <span class="material-symbols-outlined text-accent text-xl flex-shrink-0">verified</span>
                <span>${t('guaranteeText')}</span>
              </div>

            </div>
          </aside>

          <!-- Products Grid (2-Column on Mobile, 3-Column on Desktop) -->
          <main class="col-span-12 lg:col-span-9">
            ${filtered.length === 0 ? `
              <div class="p-10 sm:p-16 text-center bg-surface-container-low rounded-3xl border border-primary/5">
                <span class="material-symbols-outlined text-4xl text-on-surface-variant mb-4">search_off</span>
                <h3 class="font-display text-xl sm:text-2xl text-primary font-bold mb-2">${t('noProductsMatch')}</h3>
                <button id="reset-all-filters-btn" class="bg-primary text-surface px-6 py-3 rounded-xl text-xs font-label-caps uppercase tracking-wider font-bold">
                  ${t('resetFilters')}
                </button>
              </div>
            ` : `
              <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                ${filtered.map(p => `
                  <div class="bg-surface-container-low rounded-2xl sm:rounded-3xl overflow-hidden border border-primary/5 shadow-editorial hover:shadow-editorial-hover transition-all duration-300 flex flex-col justify-between group relative">
                    
                    <div>
                      <!-- Badge -->
                      ${p.badge ? `
                        <span class="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 bg-surface/95 backdrop-blur-sm text-primary text-[9px] sm:text-[10px] font-label-caps uppercase font-bold tracking-wider px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-full border border-primary/10 shadow-sm max-w-[85%] truncate">
                          ${p.badge}
                        </span>
                      ` : ''}

                      <!-- Product Image -->
                      <a href="#/product/${p.id}" class="aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden bg-surface relative block">
                        <img 
                          src="${p.image}" 
                          alt="${p.name}" 
                          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          loading="lazy" 
                          decoding="async" 
                        />
                      </a>

                      <!-- Card Content -->
                      <div class="p-3 sm:p-6 pb-2">
                        <div class="flex items-center justify-between gap-1 mb-1 sm:mb-1.5">
                          <span class="text-[9px] sm:text-[10px] font-label-caps uppercase text-accent font-bold tracking-wider truncate">${p.category}</span>
                          <div class="flex items-center gap-0.5 text-[11px] sm:text-xs text-primary font-semibold flex-shrink-0">
                            <span class="material-symbols-outlined text-accent text-[13px] sm:text-[14px] fill">star</span>
                            <span>${p.rating}</span>
                          </div>
                        </div>

                        <a href="#/product/${p.id}" class="block group-hover:text-accent transition-colors">
                          <h3 class="font-display text-sm sm:text-xl font-bold text-primary mb-0.5 sm:mb-1 line-clamp-1">${p.name}</h3>
                        </a>
                        <p class="text-[11px] sm:text-xs text-on-surface-variant italic mb-1.5 line-clamp-1">${p.botanicalName}</p>
                        <p class="text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-2 hidden sm:block">${p.description}</p>
                      </div>
                    </div>

                    <div class="p-3 sm:p-6 pt-0">
                      <div class="pt-2 sm:pt-3 border-t border-primary/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                        <span class="font-display text-base sm:text-xl font-bold text-primary">₹${p.price.toFixed(0)}</span>
                        
                        <!-- Reactive In-Place Action Slot -->
                        <div class="product-action-slot" data-product-id="${p.id}" data-action-type="shop-card">
                          ${renderProductActionButtonHtml(p.id, 'shop-card')}
                        </div>
                      </div>
                    </div>

                  </div>
                `).join('')}
              </div>
            `}
          </main>

        </div>
      </div>
    </div>
  `;
}

export function attachShopEvents(rerender) {
  // Category switch
  document.querySelectorAll('.shop-cat-btn').forEach(btn => {
    btn.onclick = () => {
      selectedCategory = btn.dataset.category;
      if (rerender) rerender();
    };
  });

  // Benefit switch
  document.querySelectorAll('.shop-benefit-btn').forEach(btn => {
    btn.onclick = () => {
      const b = btn.dataset.benefit;
      selectedBenefit = selectedBenefit === b ? null : b;
      if (rerender) rerender();
    };
  });

  const clearBenefitBtn = document.getElementById('clear-benefit-btn');
  if (clearBenefitBtn) {
    clearBenefitBtn.onclick = () => {
      selectedBenefit = null;
      if (rerender) rerender();
    };
  }

  const mobileClearBtn = document.getElementById('mobile-clear-benefit-btn');
  if (mobileClearBtn) {
    mobileClearBtn.onclick = () => {
      selectedBenefit = null;
      if (rerender) rerender();
    };
  }

  const filterToggle = document.getElementById('shop-mobile-filter-toggle');
  const filterPanel = document.getElementById('shop-mobile-filter-panel');
  if (filterToggle && filterPanel) {
    filterToggle.onclick = () => {
      filterPanel.classList.toggle('hidden');
    };
  }

  const resetAllBtn = document.getElementById('reset-all-filters-btn');
  if (resetAllBtn) {
    resetAllBtn.onclick = () => {
      selectedCategory = 'All';
      selectedBenefit = null;
      if (rerender) rerender();
    };
  }

  const sortSelect = document.getElementById('shop-sort-select');
  if (sortSelect) {
    sortSelect.onchange = (e) => {
      sortBy = e.target.value;
      if (rerender) rerender();
    };
  }

  const mobileSortSelect = document.getElementById('shop-mobile-sort-select');
  if (mobileSortSelect) {
    mobileSortSelect.onchange = (e) => {
      sortBy = e.target.value;
      if (rerender) rerender();
    };
  }
}
