import { getLocalizedProducts } from '../store/products.js';
import { renderProductActionButtonHtml } from '../utils/productActions.js';
import { getLanguage } from '../store/i18n.js';

export function renderSearchModal() {
  const isTa = getLanguage() === 'ta';

  return `
    <div id="search-modal-backdrop" class="fixed inset-0 bg-primary/60 backdrop-blur-md z-50 transition-opacity duration-300 opacity-0 pointer-events-none flex items-start justify-center pt-8 sm:pt-20 px-3 sm:px-6">
      <div 
        id="search-modal-panel" 
        class="w-full max-w-2xl bg-surface rounded-2xl sm:rounded-[2rem] shadow-2xl border border-primary/10 overflow-hidden transform scale-95 transition-all duration-300 flex flex-col max-h-[85vh]"
      >
        
        <!-- Search Input Bar -->
        <div class="p-3.5 sm:p-6 border-b border-primary/10 flex items-center gap-2.5 sm:gap-3 bg-surface-container-low flex-shrink-0">
          <span class="material-symbols-outlined text-accent text-xl sm:text-2xl">search</span>
          <input 
            type="text" 
            id="search-input-field" 
            placeholder="${isTa ? 'ஆர்கானிக் தானியங்கள், பழச்சாறுகள், மாவு வகைகளைத் தேடுக...' : 'Search sprouted flours, cold-pressed juices, herbal tonics...'}" 
            class="w-full bg-transparent text-primary text-sm sm:text-base placeholder-on-surface-variant/50 focus:outline-none font-body"
            autocomplete="off"
          />
          <button id="close-search-btn" class="text-on-surface-variant hover:text-primary p-1.5 sm:p-2 rounded-full hover:bg-surface transition-colors" aria-label="Close Search">
            <span class="material-symbols-outlined text-lg sm:text-xl">close</span>
          </button>
        </div>

        <!-- Suggestions / Live Results -->
        <div class="p-4 sm:p-6 overflow-y-auto flex-1">
          
          <div id="search-quick-tags" class="mb-4 sm:mb-6">
            <span class="font-label-caps text-[9.5px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.2em] text-on-surface-variant uppercase font-bold block mb-2 sm:mb-3">
              ${isTa ? 'பிரபலமான தேடல்கள்' : 'Popular Searches'}
            </span>
            <div class="flex flex-wrap gap-1.5 sm:gap-2">
              <button class="search-tag-btn text-[11px] sm:text-xs font-label-caps uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-surface-container hover:bg-primary hover:text-surface transition-colors border border-primary/5 font-semibold">
                ${isTa ? 'முளைகட்டிய ராகி' : 'Sprouted Ragi'}
              </button>
              <button class="search-tag-btn text-[11px] sm:text-xs font-label-caps uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-surface-container hover:bg-primary hover:text-surface transition-colors border border-primary/5 font-semibold">
                ${isTa ? 'ஏபிசி ஜூஸ்' : 'ABC Detox Juice'}
              </button>
              <button class="search-tag-btn text-[11px] sm:text-xs font-label-caps uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-surface-container hover:bg-primary hover:text-surface transition-colors border border-primary/5 font-semibold">
                ${isTa ? 'தினை அரிசி' : 'Foxtail Millet'}
              </button>
              <button class="search-tag-btn text-[11px] sm:text-xs font-label-caps uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-surface-container hover:bg-primary hover:text-surface transition-colors border border-primary/5 font-semibold">
                ${isTa ? 'மண்பாண்டம்' : 'Clay Water Pot'}
              </button>
            </div>
          </div>

          <div id="search-results-list" class="flex flex-col gap-2.5 sm:gap-3">
            <!-- Dynamic search results populated here -->
          </div>

        </div>

      </div>
    </div>
  `;
}

export function attachSearchModalEvents() {
  const backdrop = document.getElementById('search-modal-backdrop');
  const panel = document.getElementById('search-modal-panel');
  const closeBtn = document.getElementById('close-search-btn');
  const input = document.getElementById('search-input-field');
  const resultsContainer = document.getElementById('search-results-list');

  function close() {
    if (!backdrop || !panel) return;
    panel.classList.remove('scale-100');
    panel.classList.add('scale-95');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    if (input) input.value = '';
    if (resultsContainer) resultsContainer.innerHTML = '';
  }

  if (closeBtn) closeBtn.onclick = close;
  if (backdrop) {
    backdrop.onclick = (e) => {
      if (e.target === backdrop) close();
    };
  }

  // Tag clicks
  document.querySelectorAll('.search-tag-btn').forEach(btn => {
    btn.onclick = () => {
      if (input) {
        input.value = btn.textContent.trim();
        performSearch(input.value);
      }
    };
  });

  // Input typing
  if (input) {
    input.oninput = (e) => {
      performSearch(e.target.value);
    };
  }

  function performSearch(query) {
    if (!resultsContainer) return;
    const q = query.toLowerCase().trim();
    if (!q) {
      resultsContainer.innerHTML = '';
      return;
    }

    const prods = getLocalizedProducts();
    const matches = prods.filter(p => 
      p.name.toLowerCase().includes(q) ||
      (p.nameTa && p.nameTa.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q) ||
      (p.descriptionTa && p.descriptionTa.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      p.botanicalName.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="py-6 text-center text-on-surface-variant text-xs">
          ${getLanguage() === 'ta' ? 'பொருட்கள் எதுவும் கிடைக்கவில்லை' : `No products found matching "${query}".`}
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = matches.map(p => `
      <div class="flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors border border-primary/5 gap-2.5 sm:gap-3">
        <a href="#/product/${p.id}" class="flex items-center gap-2.5 sm:gap-3.5 flex-1 min-w-0" onclick="document.getElementById('search-modal-backdrop').classList.add('opacity-0', 'pointer-events-none')">
          <img src="${p.image}" alt="${p.name}" class="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl object-cover border border-primary/5 bg-surface flex-shrink-0" loading="lazy" decoding="async" />
          <div class="flex-1 min-w-0">
            <span class="text-[9px] sm:text-[10px] font-label-caps uppercase text-accent font-bold block truncate">${p.category}</span>
            <h4 class="font-display text-xs sm:text-sm font-bold text-primary truncate">${p.name}</h4>
            <span class="font-display text-xs sm:text-sm font-bold text-primary">₹${p.price.toFixed(0)}</span>
          </div>
        </a>
        
        <div class="product-action-slot flex-shrink-0" data-product-id="${p.id}" data-action-type="search-card">
          ${renderProductActionButtonHtml(p.id, 'search-card')}
        </div>
      </div>
    `).join('');
  }
}

export function openSearchModal() {
  const backdrop = document.getElementById('search-modal-backdrop');
  const panel = document.getElementById('search-modal-panel');
  const input = document.getElementById('search-input-field');
  if (!backdrop || !panel) return;
  backdrop.classList.remove('opacity-0', 'pointer-events-none');
  backdrop.classList.add('opacity-100');
  panel.classList.remove('scale-95');
  panel.classList.add('scale-100');
  if (input) {
    setTimeout(() => input.focus(), 100);
  }
}
