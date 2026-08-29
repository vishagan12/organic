import { getLocalizedProducts } from '../store/products.js';
import { renderProductActionButtonHtml } from '../utils/productActions.js';
import { t, getLanguage } from '../store/i18n.js';

let heroCurrentSlide = 0;
let heroTimer = null;
let isTransitioning = false;

export function renderHomePage() {
  const products = getLocalizedProducts();
  const featured = products[0]; // Sprouted Ragi Flour
  const staples = products.slice(0, 4);
  const langObj = getLanguage() === 'ta' ? t('heroSlides') : t('heroSlides');
  const slides = Array.isArray(langObj) ? langObj : [];
  heroCurrentSlide = 0;
  const currentSlide = slides[0];

  return `
    <div class="w-full bg-surface relative overflow-hidden">
      
      <!-- Ambient Glow Behind Hero -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] sm:h-[600px] glow-botanical pointer-events-none -z-0"></div>

      <!-- Hero Section with Smooth Fade In/Out Auto-Transition -->
      <section class="w-full pt-4 sm:pt-8 lg:pt-16 pb-12 sm:pb-20 lg:pb-32 relative z-10">
        <div class="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20">
          
          <!-- Left Visual: Pre-layered Crossfade Portrait -->
          <div class="w-full lg:w-1/2 relative group">
            <div class="aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/5] rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-editorial group-hover:shadow-editorial-hover transition-all duration-700 relative border border-primary/10 bg-surface-container-low">
              
              <!-- Subtle vignette overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-60 z-10 pointer-events-none"></div>
              
              <!-- Stacked Slide Images for Hardware-Accelerated Crossfade -->
              ${slides.map((s, idx) => `
                <img 
                  id="hero-slide-img-${idx}"
                  class="hero-crossfade-img absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out transform ${idx === 0 ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 pointer-events-none'}" 
                  src="${s.image}" 
                  alt="${s.pill}" 
                  loading="${idx === 0 ? 'eager' : 'lazy'}"
                  decoding="async"
                />
              `).join('')}
              
              <!-- Floating Pill Badge on Image -->
              <div id="hero-pill-container" class="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 z-20 bg-surface/95 backdrop-blur-xl p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-primary/10 shadow-lg flex items-center justify-between transition-all duration-500">
                <div class="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent/15 flex items-center justify-center text-accent flex-shrink-0">
                    <span class="material-symbols-outlined text-[16px] sm:text-[18px]">verified</span>
                  </div>
                  <div class="min-w-0">
                    <h4 id="hero-pill-title" class="font-display text-xs sm:text-sm font-bold text-primary truncate">${currentSlide.pill}</h4>
                    <p id="hero-pill-sub" class="text-[10px] sm:text-[11px] text-on-surface-variant truncate">${currentSlide.pillSub}</p>
                  </div>
                </div>
                <span id="hero-pill-batch" class="text-[10px] sm:text-xs font-label-caps text-accent font-bold uppercase tracking-wider hidden sm:inline flex-shrink-0 ml-2">${currentSlide.batch}</span>
              </div>
            </div>

            <!-- Carousel Slide Indicator Pills -->
            <div class="flex items-center justify-center gap-2 mt-4 sm:mt-5">
              ${slides.map((_, idx) => `
                <button 
                  data-slide-index="${idx}" 
                  class="hero-slide-dot h-2 rounded-full transition-all duration-500 cursor-pointer ${idx === 0 ? 'w-8 bg-accent' : 'w-2 bg-primary/20 hover:bg-primary/40'}" 
                  aria-label="Slide ${idx + 1}"
                ></button>
              `).join('')}
            </div>

            <div class="absolute -top-6 -left-6 w-32 h-32 bg-primary-fixed/30 rounded-full blur-2xl pointer-events-none -z-10"></div>
          </div>

          <!-- Right Content: Silky Fade In/Out Animated Text Panel -->
          <div id="hero-content-panel" class="w-full lg:w-1/2 flex flex-col items-start transition-all duration-500 transform">
            
            <div class="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-surface-container-low border border-primary/10 text-tertiary-container mb-4 sm:mb-6 shadow-sm">
              <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span id="hero-badge-text" class="font-label-caps text-[9.5px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] text-accent font-bold uppercase">${currentSlide.badge}</span>
            </div>

            <h1 id="hero-heading" class="font-display text-3xl sm:text-5xl lg:text-[56px] lg:leading-[64px] text-primary font-bold mb-4 sm:mb-6 tracking-tight">
              ${currentSlide.title} <span class="italic font-normal text-accent">${currentSlide.titleAccent}</span>
            </h1>

            <p id="hero-description" class="font-body text-sm sm:text-base lg:text-lg text-on-surface-variant mb-6 sm:mb-8 leading-relaxed max-w-xl">
              ${currentSlide.desc}
            </p>

            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-12">
              <a 
                id="hero-cta-shop"
                href="#/product/${currentSlide.productId}" 
                class="bg-accent hover:bg-accent-hover text-on-primary rounded-xl px-6 sm:px-7 py-3.5 sm:py-4 font-label-caps text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase font-bold transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-accent/25 text-center whitespace-nowrap"
              >
                ${currentSlide.ctaShop}
              </a>
              <a 
                href="#/story" 
                class="px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl border border-primary/20 hover:border-primary text-primary font-label-caps text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase font-bold transition-all duration-300 hover:bg-surface-container-low text-center whitespace-nowrap"
              >
                ${currentSlide.ctaStory}
              </a>
            </div>

            <!-- Dynamic Triplets -->
            <div class="grid grid-cols-3 gap-2 sm:gap-6 pt-6 sm:pt-8 border-t border-primary/10 w-full text-center sm:text-left">
              <div class="min-w-0">
                <strong id="hero-p1-val" class="font-display text-lg sm:text-2xl font-bold text-primary block leading-none mb-1 truncate">${currentSlide.point1Val}</strong>
                <span id="hero-p1-lbl" class="text-[10px] sm:text-xs text-on-surface-variant font-medium block truncate">${currentSlide.point1Label}</span>
              </div>
              <div class="min-w-0">
                <strong id="hero-p2-val" class="font-display text-lg sm:text-2xl font-bold text-primary block leading-none mb-1 truncate">${currentSlide.point2Val}</strong>
                <span id="hero-p2-lbl" class="text-[10px] sm:text-xs text-on-surface-variant font-medium block truncate">${currentSlide.point2Label}</span>
              </div>
              <div class="min-w-0">
                <strong id="hero-p3-val" class="font-display text-lg sm:text-2xl font-bold text-primary block leading-none mb-1 truncate">${currentSlide.point3Val}</strong>
                <span id="hero-p3-lbl" class="text-[10px] sm:text-xs text-on-surface-variant font-medium block truncate">${currentSlide.point3Label}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- 3 Key Features -->
      <section class="w-full bg-surface-container-low py-14 sm:py-20 border-y border-primary/10 relative">
        <div class="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-16">
            
            <!-- Feature 1 -->
            <div class="flex flex-col items-center md:items-start text-center md:text-left group cursor-default">
              <span class="font-display text-3xl sm:text-4xl italic text-accent font-normal mb-1 sm:mb-2 opacity-80 group-hover:opacity-100 transition-opacity">01</span>
              <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-surface mb-3 sm:mb-4 flex items-center justify-center shadow-sm border border-primary/10 group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-accent text-xl sm:text-2xl">eco</span>
              </div>
              <h3 class="font-display text-lg sm:text-xl font-bold text-primary mb-1.5 sm:mb-2">${t('trustTitle1')}</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed max-w-sm">${t('trustDesc1')}</p>
            </div>

            <!-- Feature 2 -->
            <div class="flex flex-col items-center md:items-start text-center md:text-left group cursor-default relative">
              <div class="hidden md:block absolute top-1/2 -left-8 w-[1px] h-24 bg-primary/10 -translate-y-1/2"></div>
              <div class="hidden md:block absolute top-1/2 -right-8 w-[1px] h-24 bg-primary/10 -translate-y-1/2"></div>
              <span class="font-display text-3xl sm:text-4xl italic text-accent font-normal mb-1 sm:mb-2 opacity-80 group-hover:opacity-100 transition-opacity">02</span>
              <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-surface mb-3 sm:mb-4 flex items-center justify-center shadow-sm border border-primary/10 group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-accent text-xl sm:text-2xl">grain</span>
              </div>
              <h3 class="font-display text-lg sm:text-xl font-bold text-primary mb-1.5 sm:mb-2">${t('trustTitle2')}</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed max-w-sm">${t('trustDesc2')}</p>
            </div>

            <!-- Feature 3 -->
            <div class="flex flex-col items-center md:items-start text-center md:text-left group cursor-default">
              <span class="font-display text-3xl sm:text-4xl italic text-accent font-normal mb-1 sm:mb-2 opacity-80 group-hover:opacity-100 transition-opacity">03</span>
              <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-surface mb-3 sm:mb-4 flex items-center justify-center shadow-sm border border-primary/10 group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-accent text-xl sm:text-2xl">spa</span>
              </div>
              <h3 class="font-display text-lg sm:text-xl font-bold text-primary mb-1.5 sm:mb-2">${t('trustTitle3')}</h3>
              <p class="text-xs text-on-surface-variant leading-relaxed max-w-sm">${t('trustDesc3')}</p>
            </div>

          </div>
        </div>
      </section>

      <!-- Best Sellers Showcase -->
      <section class="w-full py-16 sm:py-24 lg:py-32 relative">
        <div class="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-8 sm:mb-14 gap-3 sm:gap-6 border-b border-primary/10 pb-4 sm:pb-6">
            <div>
              <span class="font-label-caps text-[10px] tracking-[0.25em] text-accent uppercase mb-1 sm:mb-2 block font-bold">${t('bestSellersTag')}</span>
              <h2 class="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-primary">${t('bestSellersTitle')}</h2>
            </div>
            <a href="#/shop" class="font-label-caps text-xs text-primary border-b border-primary/30 pb-1 hover:text-accent hover:border-accent transition-colors inline-flex items-center gap-1.5 font-bold uppercase tracking-[0.12em] flex-shrink-0">
              ${t('viewAll')} <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
            </a>
          </div>

          <!-- Bento Grid Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            
            <!-- Featured Large Card (Spans 7 cols) -->
            <div class="col-span-1 lg:col-span-7 bg-surface-container-low rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-10 lg:p-12 border border-primary/5 shadow-editorial hover:shadow-editorial-hover transition-all duration-500 flex flex-col justify-between group relative overflow-hidden">
              <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div class="flex justify-between items-start z-10 relative mb-4 sm:mb-6 gap-3 sm:gap-4">
                <div class="min-w-0">
                  <span class="inline-block bg-accent text-on-primary px-3 py-1 rounded-full text-[10px] font-label-caps uppercase tracking-[0.15em] font-bold mb-2 sm:mb-3 shadow-sm">
                    ${t('featuredBadge')}
                  </span>
                  <h3 class="font-display text-xl sm:text-3xl lg:text-4xl text-primary font-bold group-hover:text-accent transition-colors truncate">${featured.name}</h3>
                  <p class="text-xs text-on-surface-variant italic mt-0.5 sm:mt-1">${featured.botanicalName}</p>
                </div>
                <span class="font-display text-xl sm:text-3xl font-bold text-primary flex-shrink-0">₹${featured.price.toFixed(0)}</span>
              </div>

              <div class="my-4 sm:my-6 relative z-10 overflow-hidden rounded-xl sm:rounded-2xl aspect-[16/9] border border-primary/5 bg-surface">
                <img 
                  src="${featured.image}" 
                  alt="${featured.name}" 
                  class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy" 
                  decoding="async" 
                />
              </div>

              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 z-10 relative pt-3 sm:pt-4 border-t border-primary/10">
                <p class="text-xs text-on-surface-variant leading-relaxed line-clamp-2 max-w-md">${featured.description}</p>
                <div class="flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto flex-shrink-0">
                  <a href="#/product/${featured.id}" class="flex-1 sm:flex-none px-3.5 sm:px-4 py-2.5 rounded-xl border border-primary/20 hover:border-primary text-primary text-xs font-label-caps uppercase tracking-wider font-bold transition-colors text-center whitespace-nowrap">
                    ${t('detailsBtn')}
                  </a>
                  
                  <!-- Reactive In-Place Action Slot for Featured -->
                  <div class="product-action-slot flex-1 sm:flex-none" data-product-id="${featured.id}" data-action-type="home-featured">
                    ${renderProductActionButtonHtml(featured.id, 'home-featured')}
                  </div>
                </div>
              </div>
            </div>

            <!-- Smaller Product Cards (Spans 5 cols) -->
            <div class="col-span-1 lg:col-span-5 flex flex-col gap-4 sm:gap-6">
              ${staples.slice(1, 4).map(p => `
                <div class="bg-surface-container-low rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-primary/5 shadow-editorial hover:shadow-editorial-hover transition-all duration-500 flex flex-col justify-between group">
                  <div class="flex gap-3.5 sm:gap-5 items-center">
                    <img 
                      src="${p.image}" 
                      alt="${p.name}" 
                      class="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl object-cover border border-primary/5 flex-shrink-0 group-hover:scale-105 transition-transform bg-surface" 
                      loading="lazy" 
                      decoding="async" 
                    />
                    <div class="flex-1 min-w-0">
                      <span class="text-[9.5px] sm:text-[10px] text-accent font-label-caps uppercase tracking-[0.15em] font-bold block mb-0.5">${p.category}</span>
                      <h4 class="font-display text-sm sm:text-lg font-bold text-primary group-hover:text-accent transition-colors truncate">${p.name}</h4>
                      <p class="text-[11px] sm:text-xs text-on-surface-variant italic truncate mb-1">${p.botanicalName}</p>
                      <span class="font-display text-sm sm:text-base font-bold text-primary">₹${p.price.toFixed(0)}</span>
                    </div>
                  </div>
                  <div class="flex items-center justify-end gap-2 sm:gap-2.5 mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-primary/5">
                    <a href="#/product/${p.id}" class="text-xs text-on-surface-variant hover:text-primary font-label-caps uppercase font-bold tracking-wider px-2 py-1">${t('detailsBtn')}</a>
                    
                    <!-- Reactive In-Place Action Slot for Staples -->
                    <div class="product-action-slot" data-product-id="${p.id}" data-action-type="home-staple">
                      ${renderProductActionButtonHtml(p.id, 'home-staple')}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

          </div>
        </div>
      </section>

      <!-- Farming Story Section -->
      <section class="w-full bg-primary text-surface py-16 sm:py-28 relative overflow-hidden">
        <div class="absolute inset-0 glow-emerald pointer-events-none opacity-40"></div>
        <div class="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center relative z-10">
          
          <div class="flex flex-col items-start">
            <span class="font-label-caps text-[11px] sm:text-xs text-accent uppercase tracking-[0.25em] mb-3 sm:mb-4 font-bold">${t('manifestoTag')}</span>
            <h2 class="font-display text-3xl sm:text-5xl font-bold text-surface mb-4 sm:mb-6 leading-[1.15]">
              ${t('manifestoTitle')} <span class="italic text-accent font-normal">${t('manifestoTitleAccent')}</span>
            </h2>
            <p class="text-surface/80 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 font-body">
              ${t('manifestoP1')}
            </p>
            <p class="text-surface/70 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 font-body">
              ${t('manifestoP2')}
            </p>
            <a href="#/story" class="border border-surface/30 hover:border-surface text-surface px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-label-caps text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] font-bold transition-all hover:bg-surface/10 whitespace-nowrap">
              ${t('manifestoBtn')}
            </a>
          </div>

          <div class="relative">
            <div class="aspect-[4/3] rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-surface/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=85" 
                alt="Traditional Grain Cleaning" 
                class="w-full h-full object-cover" 
                loading="lazy" 
                decoding="async" 
              />
            </div>
            
            <div class="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 bg-surface text-primary p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-primary/10 max-w-xs animate-float hidden sm:block">
              <span class="font-display text-2xl sm:text-3xl font-bold text-accent block mb-1">${t('manifestoBadgeVal')}</span>
              <span class="text-xs text-on-surface font-medium leading-relaxed block">${t('manifestoBadgeText')}</span>
            </div>
          </div>

        </div>
      </section>

      <!-- Wellness Journal Section -->
      <section class="w-full py-16 sm:py-24 lg:py-32">
        <div class="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          
          <div class="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span class="font-label-caps text-[10px] tracking-[0.25em] text-accent uppercase mb-1.5 sm:mb-2 block font-bold">${t('journalTag')}</span>
            <h2 class="font-display text-2xl sm:text-4xl font-bold text-primary mb-3 sm:mb-4">${t('journalTitle')}</h2>
            <p class="text-on-surface-variant text-xs sm:text-sm leading-relaxed">${t('journalSubtitle')}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            <!-- Journal Article 1 -->
            <article class="group bg-surface-container-low rounded-2xl sm:rounded-3xl overflow-hidden border border-primary/5 shadow-editorial hover:shadow-editorial-hover transition-all flex flex-col">
              <div class="aspect-[16/10] overflow-hidden bg-surface">
                <img 
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1000&q=85" 
                  alt="Traditional Millets" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy" 
                  decoding="async" 
                />
              </div>
              <div class="p-5 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span class="text-[10px] font-label-caps uppercase text-accent font-bold tracking-[0.15em] block mb-2">Healthy Grains</span>
                  <h3 class="font-display text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors mb-2 sm:mb-3 leading-snug">Why Sprouting Makes Grains 10x Easier to Digest</h3>
                  <p class="text-xs text-on-surface-variant leading-relaxed line-clamp-3">How natural soaking and sprouting breaks down heaviness and boosts bio-available calcium and iron.</p>
                </div>
                <a href="#/journal" class="font-label-caps text-xs text-primary font-bold tracking-wider mt-4 sm:mt-6 inline-flex items-center gap-1.5 group-hover:gap-3 transition-all">
                  ${t('readArticle')} <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </article>

            <!-- Journal Article 2 -->
            <article class="group bg-surface-container-low rounded-2xl sm:rounded-3xl overflow-hidden border border-primary/5 shadow-editorial hover:shadow-editorial-hover transition-all flex flex-col">
              <div class="aspect-[16/10] overflow-hidden bg-surface">
                <img 
                  src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=85" 
                  alt="Natural Juices" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy" 
                  decoding="async" 
                />
              </div>
              <div class="p-5 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span class="text-[10px] font-label-caps uppercase text-accent font-bold tracking-[0.15em] block mb-2">Daily Nutrition</span>
                  <h3 class="font-display text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors mb-2 sm:mb-3 leading-snug">3 Simple Morning Drinks for Natural All-Day Energy</h3>
                  <p class="text-xs text-on-surface-variant leading-relaxed line-clamp-3">Delicious beetroot juices, warm ragi malt, and amla drops to start your day energized without caffeine crashes.</p>
                </div>
                <a href="#/journal" class="font-label-caps text-xs text-primary font-bold tracking-wider mt-4 sm:mt-6 inline-flex items-center gap-1.5 group-hover:gap-3 transition-all">
                  ${t('readArticle')} <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </article>

            <!-- Journal Article 3 -->
            <article class="group bg-surface-container-low rounded-2xl sm:rounded-3xl overflow-hidden border border-primary/5 shadow-editorial hover:shadow-editorial-hover transition-all flex flex-col">
              <div class="aspect-[16/10] overflow-hidden bg-surface">
                <img 
                  src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85" 
                  alt="Clay Water Pots" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy" 
                  decoding="async" 
                />
              </div>
              <div class="p-5 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span class="text-[10px] font-label-caps uppercase text-accent font-bold tracking-[0.15em] block mb-2">Healthy Kitchen</span>
                  <h3 class="font-display text-lg sm:text-xl font-bold text-primary group-hover:text-accent transition-colors mb-2 sm:mb-3 leading-snug">How Cooking in Clay Pots Keeps Food Cool and Fresh</h3>
                  <p class="text-xs text-on-surface-variant leading-relaxed line-clamp-3">Why natural unglazed clay pots keep drinking water naturally cold and add healthy minerals.</p>
                </div>
                <a href="#/journal" class="font-label-caps text-xs text-primary font-bold tracking-wider mt-4 sm:mt-6 inline-flex items-center gap-1.5 group-hover:gap-3 transition-all">
                  ${t('readArticle')} <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </article>

          </div>
        </div>
      </section>

    </div>
  `;
}

function updateHeroSlide(slideIdx) {
  if (isTransitioning) return;
  const langObj = getLanguage() === 'ta' ? t('heroSlides') : t('heroSlides');
  const slides = Array.isArray(langObj) ? langObj : [];
  if (!slides[slideIdx]) return;
  
  isTransitioning = true;
  heroCurrentSlide = slideIdx;
  const slide = slides[slideIdx];

  const panel = document.getElementById('hero-content-panel');
  const pillContainer = document.getElementById('hero-pill-container');

  // Step 1: Smooth Fade-Out
  if (panel) {
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(-12px)';
  }
  if (pillContainer) {
    pillContainer.style.opacity = '0';
    pillContainer.style.transform = 'translateY(10px)';
  }

  // Crossfade Image
  slides.forEach((_, idx) => {
    const imgEl = document.getElementById(`hero-slide-img-${idx}`);
    if (imgEl) {
      if (idx === slideIdx) {
        imgEl.className = 'hero-crossfade-img absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out transform opacity-100 scale-100 z-0';
      } else {
        imgEl.className = 'hero-crossfade-img absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out transform opacity-0 scale-105 pointer-events-none';
      }
    }
  });

  // Update Slide Dots
  document.querySelectorAll('.hero-slide-dot').forEach((dot, idx) => {
    if (idx === slideIdx) {
      dot.className = 'hero-slide-dot h-2 rounded-full transition-all duration-500 w-8 bg-accent cursor-pointer';
    } else {
      dot.className = 'hero-slide-dot h-2 rounded-full transition-all duration-500 w-2 bg-primary/20 hover:bg-primary/40 cursor-pointer';
    }
  });

  // Step 2: Swap content after 450ms
  setTimeout(() => {
    const pillTitle = document.getElementById('hero-pill-title');
    const pillSub = document.getElementById('hero-pill-sub');
    const pillBatch = document.getElementById('hero-pill-batch');
    const badgeText = document.getElementById('hero-badge-text');
    const heading = document.getElementById('hero-heading');
    const desc = document.getElementById('hero-description');
    const ctaShop = document.getElementById('hero-cta-shop');
    const p1Val = document.getElementById('hero-p1-val');
    const p1Lbl = document.getElementById('hero-p1-lbl');
    const p2Val = document.getElementById('hero-p2-val');
    const p2Lbl = document.getElementById('hero-p2-lbl');
    const p3Val = document.getElementById('hero-p3-val');
    const p3Lbl = document.getElementById('hero-p3-lbl');

    if (pillTitle) pillTitle.textContent = slide.pill;
    if (pillSub) pillSub.textContent = slide.pillSub;
    if (pillBatch) pillBatch.textContent = slide.batch;
    if (badgeText) badgeText.textContent = slide.badge;
    if (heading) heading.innerHTML = `${slide.title} <span class="italic font-normal text-accent">${slide.titleAccent}</span>`;
    if (desc) desc.textContent = slide.desc;
    if (ctaShop) {
      ctaShop.textContent = slide.ctaShop;
      ctaShop.href = `#/product/${slide.productId}`;
    }
    if (p1Val) p1Val.textContent = slide.point1Val;
    if (p1Lbl) p1Lbl.textContent = slide.point1Label;
    if (p2Val) p2Val.textContent = slide.point2Val;
    if (p2Lbl) p2Lbl.textContent = slide.point2Label;
    if (p3Val) p3Val.textContent = slide.point3Val;
    if (p3Lbl) p3Lbl.textContent = slide.point3Label;

    if (panel) {
      panel.style.transform = 'translateY(12px)';
    }

    // Step 3: Smooth Fade-In
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (panel) {
          panel.style.opacity = '1';
          panel.style.transform = 'translateY(0)';
        }
        if (pillContainer) {
          pillContainer.style.opacity = '1';
          pillContainer.style.transform = 'translateY(0)';
        }
        isTransitioning = false;
      }, 50);
    });
  }, 450);
}

export function attachHomeEvents() {
  const langObj = getLanguage() === 'ta' ? t('heroSlides') : t('heroSlides');
  const slides = Array.isArray(langObj) ? langObj : [];

  // Manual dot clicking
  document.querySelectorAll('.hero-slide-dot').forEach(dot => {
    dot.onclick = () => {
      const idx = parseInt(dot.dataset.slideIndex, 10);
      updateHeroSlide(idx);
      resetHeroInterval();
    };
  });

  // 10-Second Auto-Cycling Timer
  function startHeroInterval() {
    if (heroTimer) clearInterval(heroTimer);
    heroTimer = setInterval(() => {
      const nextSlide = (heroCurrentSlide + 1) % slides.length;
      updateHeroSlide(nextSlide);
    }, 10000);
  }

  function resetHeroInterval() {
    startHeroInterval();
  }

  startHeroInterval();
}
