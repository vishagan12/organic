import { t, getLanguage } from '../store/i18n.js';

export function renderFooter() {
  const isTa = getLanguage() === 'ta';

  return `
    <footer class="w-full bg-primary text-surface pt-12 sm:pt-20 pb-8 sm:pb-12 border-t border-primary/10 relative overflow-hidden">
      <div class="absolute inset-0 glow-emerald pointer-events-none opacity-30"></div>
      
      <div class="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
        
        <!-- Top Section: Brand Statement & Newsletter -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-16 border-b border-surface/10">
          <div class="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-8">
            <div class="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
              <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-surface/10 border border-surface/20 flex items-center justify-center text-accent">
                <span class="material-symbols-outlined text-xl sm:text-2xl">spa</span>
              </div>
              <div>
                <span class="font-display text-xl sm:text-2xl font-bold tracking-tight text-surface block">Aura Botanica</span>
                <span class="font-label-caps text-[8.5px] sm:text-[9px] tracking-[0.20em] sm:tracking-[0.25em] uppercase text-accent font-semibold">${t('brandSubtitle')}</span>
              </div>
            </div>
            <p class="font-body text-surface/80 leading-relaxed text-xs sm:text-base max-w-md mb-6 sm:mb-8">
              ${t('footerBrandDesc')}
            </p>
            <div class="flex flex-wrap gap-2.5 sm:gap-4 text-[10.5px] sm:text-xs font-label-caps uppercase tracking-wider text-accent">
              <span class="inline-flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-accent"></span> ${t('certifiedTag')}</span>
              <span class="inline-flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-accent"></span> ${t('chemFreeTag')}</span>
              <span class="inline-flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-accent"></span> ${t('noPreservativeTag')}</span>
            </div>
          </div>

          <div class="lg:col-span-6 flex flex-col justify-center">
            <div class="bg-surface/5 p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-surface/10 backdrop-blur-md">
              <span class="font-label-caps text-[10px] sm:text-xs text-accent uppercase tracking-widest block mb-1.5 sm:mb-2 font-bold">${t('newsletterTag')}</span>
              <h3 class="font-display text-xl sm:text-2xl text-surface font-bold mb-2 sm:mb-3">${t('newsletterTitle')}</h3>
              <p class="text-surface/70 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
                ${t('newsletterSub')}
              </p>
              <form id="footer-newsletter-form" class="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <input 
                  type="email" 
                  required 
                  placeholder="${t('emailPlaceholder')}" 
                  class="bg-surface/10 border border-surface/20 rounded-xl px-4 py-3 sm:py-3.5 text-surface placeholder-surface/40 text-xs sm:text-sm focus:outline-none focus:border-accent flex-1 w-full"
                />
                <button 
                  type="submit" 
                  class="w-full sm:w-auto bg-accent hover:bg-accent-hover text-on-primary font-label-caps text-xs uppercase tracking-wider px-6 py-3 sm:py-3.5 rounded-xl transition-all transform hover:-translate-y-0.5 whitespace-nowrap font-bold shadow-md text-center"
                >
                  ${t('getDiscountBtn')}
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Middle Section: Navigation Links -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-10 sm:py-16 border-b border-surface/10 text-xs sm:text-sm">
          <div>
            <h4 class="font-display text-base sm:text-lg text-surface font-bold mb-3 sm:mb-5">${t('shopColTitle')}</h4>
            <ul class="flex flex-col gap-2 sm:gap-3 text-surface/70 text-xs sm:text-sm">
              <li><a href="#/shop" class="hover:text-accent transition-colors">${isTa ? 'முளைகட்டிய தானியங்கள் & மாவு' : 'Sprouted Grains & Flours'}</a></li>
              <li><a href="#/shop" class="hover:text-accent transition-colors">${isTa ? 'புதிய பழச்சாறுகள்' : 'Fresh Cold-Pressed Juices'}</a></li>
              <li><a href="#/shop" class="hover:text-accent transition-colors">${isTa ? 'மூலிகை துளிகள்' : 'Herbal Wellness Drops'}</a></li>
              <li><a href="#/shop" class="hover:text-accent transition-colors">${isTa ? 'களிமண் பாத்திரங்கள்' : 'Clay Water Pots'}</a></li>
              <li><a href="#/shop" class="hover:text-accent transition-colors">${isTa ? 'ஆரோக்கிய சிற்றுண்டிகள்' : 'Healthy Roasted Snacks'}</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-display text-base sm:text-lg text-surface font-bold mb-3 sm:mb-5">${t('storyColTitle')}</h4>
            <ul class="flex flex-col gap-2 sm:gap-3 text-surface/70 text-xs sm:text-sm">
              <li><a href="#/story" class="hover:text-accent transition-colors">${isTa ? 'எங்கள் விவசாயக் கதை' : 'Our Farming Story'}</a></li>
              <li><a href="#/journal" class="hover:text-accent transition-colors">${isTa ? 'ஆரோக்கிய இதழ் & சமையல் குறிப்புகள்' : 'Wellness Journal & Recipes'}</a></li>
              <li><a href="#/story#sourcing" class="hover:text-accent transition-colors">${isTa ? 'இயற்கை மண் தரநிலைகள்' : 'Organic Soil Standards'}</a></li>
              <li><a href="#/story" class="hover:text-accent transition-colors">${isTa ? 'ஆய்வக சோதனை & தரம்' : 'Lab Testing & Quality'}</a></li>
              <li><a href="#/story" class="hover:text-accent transition-colors">${isTa ? 'சுற்றுச்சூழல் பேக்கிங்' : 'Eco-Friendly Packaging'}</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-display text-base sm:text-lg text-surface font-bold mb-3 sm:mb-5">${t('helpColTitle')}</h4>
            <ul class="flex flex-col gap-2 sm:gap-3 text-surface/70 text-xs sm:text-sm">
              <li><a href="#/contact" class="hover:text-accent transition-colors">${isTa ? 'வாடிக்கையாளர் ஆதரவு' : 'Contact Support Team'}</a></li>
              <li><a href="#/contact#faq" class="hover:text-accent transition-colors">${isTa ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Frequently Asked Questions'}</a></li>
              <li><a href="#/cart" class="hover:text-accent transition-colors">${isTa ? 'ஆர்டர் மற்றும் டெலிவரி நிலை' : 'Track Order & Delivery'}</a></li>
              <li><a href="#/contact" class="hover:text-accent transition-colors">${isTa ? '30-நாள் தர உத்தரவாதம்' : '30-Day Quality Guarantee'}</a></li>
              <li><a href="#/contact" class="hover:text-accent transition-colors">${isTa ? 'மொத்த கொள்முதல்' : 'Bulk & Wholesale Orders'}</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-display text-base sm:text-lg text-surface font-bold mb-3 sm:mb-5">${t('storeColTitle')}</h4>
            <div class="text-surface/70 flex flex-col gap-2 sm:gap-3 text-xs sm:text-sm">
              <p class="leading-relaxed">
                <strong class="text-surface">${isTa ? 'முதன்மைக் கடை & மில்:' : 'Flagship Store & Mill:'}</strong><br />
                742 Evergreen Orchard Road, Indiranagar<br />
                Bengaluru, Karnataka 560038
              </p>
              <p class="text-[11px] sm:text-xs text-surface/50 mt-1 sm:mt-2">
                ${isTa ? 'தினசரி திறந்திருக்கும்: 9:00 AM – 8:00 PM' : 'Open Daily: 9:00 AM – 8:00 PM'}<br />
                ${isTa ? 'இந்தியா முழுவதும் இலவச டெலிவரி' : 'Free Home Delivery across India'}
              </p>
            </div>
          </div>
        </div>

        <!-- Bottom Section: Legal & Copyright -->
        <div class="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs text-surface/50 font-label-caps text-center sm:text-left">
          <p>${t('copyright')}</p>
          <div class="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href="#/story" class="hover:text-surface transition-colors">${isTa ? 'தனியுரிமைக் கொள்கை' : 'Privacy Policy'}</a>
            <a href="#/story" class="hover:text-surface transition-colors">${isTa ? 'விதிமுறைகள்' : 'Terms of Service'}</a>
            <a href="#/contact" class="hover:text-surface transition-colors">${isTa ? 'டெலிவரி & திரும்பப்பெறுதல்' : 'Shipping & Returns'}</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
