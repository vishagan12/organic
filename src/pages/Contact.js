import { showToast } from '../components/Toast.js';
import { getLanguage, t } from '../store/i18n.js';

export function renderContactPage() {
  const isTa = getLanguage() === 'ta';

  return `
    <div class="w-full bg-surface pt-4 sm:pt-10 pb-section-gap">
      <div class="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        
        <!-- Header -->
        <div class="max-w-3xl mb-8 sm:mb-14">
          <div class="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-surface-container-low border border-primary/10 text-tertiary-container mb-2.5 sm:mb-3 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-accent"></span>
            <span class="font-label-caps text-[9.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-accent font-bold uppercase">
              ${isTa ? 'வாடிக்கையாளர் ஆதரவு' : 'Customer Support'}
            </span>
          </div>
          <h1 class="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2.5 sm:mb-4">
            ${isTa ? 'உங்களுக்கு உதவ நாங்கள் தயாராக உள்ளோம்' : "We're Here to Help You"}
          </h1>
          <p class="font-body text-xs sm:text-base text-on-surface-variant leading-relaxed">
            ${isTa ? 'எங்கள் தயாரிப்புகள், பயன்பாட்டு முறை அல்லது டெலிவரி குறித்த கேள்விகள் இருந்தால் எங்களிடம் தொடர்பு கொள்ளுங்கள்.' : 'Have questions about our sprouted flours, recipes, or order delivery? Send us a message or get in touch with our team anytime.'}
          </p>
        </div>

        <!-- Proportional Two-Column Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-16 sm:mb-24">
          
          <!-- Left: Inquiry Form (7 cols) -->
          <div class="lg:col-span-7 bg-surface-container-low p-5 sm:p-10 lg:p-12 rounded-2xl sm:rounded-[2.5rem] border border-primary/5 shadow-editorial flex flex-col justify-between">
            <div>
              <span class="font-label-caps text-[9.5px] sm:text-[10px] tracking-[0.18em] uppercase text-accent font-bold block mb-1">
                ${isTa ? 'செய்தி அனுப்ப' : 'Send a Message'}
              </span>
              <h2 class="font-display text-xl sm:text-3xl font-bold text-primary mb-4 sm:mb-6">
                ${isTa ? 'எங்களுக்கு செய்தி அனுப்புங்கள்' : 'How Can We Help You?'}
              </h2>
              
              <form id="contact-form" class="flex flex-col gap-4 sm:gap-5">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label class="block text-[11px] sm:text-xs font-label-caps uppercase text-on-surface-variant mb-1 sm:mb-1.5 font-bold">
                      ${isTa ? 'உங்கள் பெயர் *' : 'Your Name *'}
                    </label>
                    <input type="text" required placeholder="Aarav Sharma" class="apothecary-input text-xs sm:text-sm" />
                  </div>
                  <div>
                    <label class="block text-[11px] sm:text-xs font-label-caps uppercase text-on-surface-variant mb-1 sm:mb-1.5 font-bold">
                      ${isTa ? 'மின்னஞ்சல் முகவரி *' : 'Email Address *'}
                    </label>
                    <input type="email" required placeholder="aarav@example.com" class="apothecary-input text-xs sm:text-sm" />
                  </div>
                </div>

                <div>
                  <label class="block text-[11px] sm:text-xs font-label-caps uppercase text-on-surface-variant mb-1 sm:mb-1.5 font-bold">
                    ${isTa ? 'எதைப் பற்றிய தகவல் தேவை?' : 'What is this regarding?'}
                  </label>
                  <select class="apothecary-input bg-surface-container text-xs font-medium">
                    <option value="general">${isTa ? 'தயாரிப்புகள் & உணவு ஆலோசனைகள்' : 'Product Questions & Nutrition Advice'}</option>
                    <option value="order">${isTa ? 'ஆர்டர் மற்றும் டெலிவரி நிலை' : 'Order Tracking & Delivery Status'}</option>
                    <option value="wholesale">${isTa ? 'மொத்த வியாபாரம் & விநியோகம்' : 'Bulk Orders & Store Inquiries'}</option>
                    <option value="press">${isTa ? 'கருத்துக்கள் & பிற தகவல்கள்' : 'General Feedback & Other Inquiries'}</option>
                  </select>
                </div>

                <div>
                  <label class="block text-[11px] sm:text-xs font-label-caps uppercase text-on-surface-variant mb-1 sm:mb-1.5 font-bold">
                    ${isTa ? 'உங்கள் செய்தி *' : 'Your Message *'}
                  </label>
                  <textarea rows="4" required placeholder="${isTa ? 'உங்கள் கேள்வியை இங்கே தட்டச்சு செய்யவும்...' : 'Type your question or message here...'}" class="apothecary-input text-xs"></textarea>
                </div>

                <div class="pt-1 sm:pt-2">
                  <button 
                    type="submit" 
                    class="w-full sm:w-auto bg-accent hover:bg-accent-hover text-on-primary py-3.5 sm:py-4 px-7 sm:px-8 rounded-xl font-label-caps text-xs uppercase tracking-wider font-bold transition-all transform hover:-translate-y-0.5 shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
                  >
                    <span class="material-symbols-outlined text-base sm:text-lg">send</span>
                    <span>${isTa ? 'செய்தி அனுப்புக' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            </div>

            <div class="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-primary/10 flex items-center gap-2.5 sm:gap-3 text-xs text-on-surface-variant">
              <span class="material-symbols-outlined text-accent text-base sm:text-lg flex-shrink-0">schedule</span>
              <span>${isTa ? 'எங்கள் குழு 24 மணி நேரத்திற்குள் உங்களுக்கு பதிலளிக்கும்.' : 'Our team reviews all messages and replies within 24 hours on business days.'}</span>
            </div>
          </div>

          <!-- Right: Store & Support Cards (5 cols) -->
          <div class="lg:col-span-5 flex flex-col gap-6 sm:gap-8 justify-between">
            
            <!-- Store Card 1 -->
            <div class="flex-1 bg-surface-container-low p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-primary/5 shadow-editorial flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-3 sm:gap-3.5 mb-3 sm:mb-4">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-surface flex items-center justify-center text-accent shadow-sm border border-primary/10 flex-shrink-0">
                    <span class="material-symbols-outlined text-xl sm:text-2xl">location_on</span>
                  </div>
                  <div>
                    <h3 class="font-display text-lg sm:text-xl font-bold text-primary leading-tight">${isTa ? 'பெங்களூரு முதன்மைக் கடை & மில்' : 'Bengaluru Flagship Store & Mill'}</h3>
                    <span class="text-[9.5px] sm:text-[10px] font-label-caps uppercase tracking-wider text-accent font-semibold">${isTa ? 'நேரடி அனுபவ மையம்' : 'Store & Experience Center'}</span>
                  </div>
                </div>
                
                <p class="text-xs text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
                  742 Evergreen Orchard Road, Indiranagar<br />
                  Bengaluru, Karnataka 560038
                </p>

                <div class="p-3 sm:p-3.5 rounded-xl bg-surface border border-primary/10 text-xs text-on-surface-variant flex flex-col gap-1">
                  <div class="flex justify-between">
                    <span class="font-medium">${isTa ? 'திங்கள் – சனி:' : 'Monday – Saturday:'}</span>
                    <span class="text-primary font-bold">9:00 AM – 8:00 PM</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="font-medium">${isTa ? 'ஞாயிறு:' : 'Sunday:'}</span>
                    <span class="text-primary font-bold">10:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>

              <div class="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-primary/10 flex justify-between items-center text-xs">
                <span class="text-on-surface-variant">${isTa ? 'தொலைபேசி:' : 'Phone Support:'}</span>
                <strong class="text-primary font-display">+91 (80) 4123 7491</strong>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="flex-1 bg-surface-container-low p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-primary/5 shadow-editorial flex flex-col justify-between">
              <div>
                <div class="flex items-center gap-3 sm:gap-3.5 mb-3 sm:mb-4">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-surface flex items-center justify-center text-accent shadow-sm border border-primary/10 flex-shrink-0">
                    <span class="material-symbols-outlined text-xl sm:text-2xl">support_agent</span>
                  </div>
                  <div>
                    <h3 class="font-display text-lg sm:text-xl font-bold text-primary leading-tight">${isTa ? 'உணவு & ஊட்டச்சத்து ஆலோசனை' : 'Diet & Nutrition Guidance'}</h3>
                    <span class="text-[9.5px] sm:text-[10px] font-label-caps uppercase tracking-wider text-accent font-semibold">${isTa ? 'இலவச ஆலோசனை & குறிப்புகள்' : 'Free Advice & Recipes'}</span>
                  </div>
                </div>

                <p class="text-xs text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
                  ${isTa ? 'பாரம்பரிய தானியங்களுக்கு மாற விரும்புகிறீர்களா? எங்கள் ஊட்டச்சத்து நிபுணர்கள் உங்களுக்கு ஏற்ற மாவு வகைகளையும் சமையல் குறிப்புகளையும் வழிகாட்டுவார்கள்.' : 'Need help switching from white flour to traditional sprouted millets? Our in-house nutrition team can recommend the right flours and easy recipes for your daily meals.'}
                </p>

                <div class="p-3 sm:p-3.5 rounded-xl bg-surface border border-primary/10 text-xs text-on-surface-variant flex items-center gap-2">
                  <span class="material-symbols-outlined text-accent text-base">verified</span>
                  <span>${isTa ? 'WhatsApp மற்றும் மின்னஞ்சல் மூலம் இலவச வழிகாட்டல்' : 'Free guidance on WhatsApp and email'}</span>
                </div>
              </div>

              <div class="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-primary/10 flex justify-between items-center text-xs">
                <a href="mailto:support@aurabotanica.in" class="text-accent font-label-caps uppercase tracking-wider font-bold hover:underline inline-flex items-center gap-1">
                  <span>${isTa ? 'மின்னஞ்சல் அனுப்புக' : 'Email Support Team'}</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
                <span class="text-on-surface-variant/70 text-[10px] sm:text-[11px]">${isTa ? 'தினசரி 9 AM – 7 PM' : 'Daily 9 AM – 7 PM'}</span>
              </div>
            </div>

          </div>

        </div>

        <!-- FAQ Section -->
        <section id="faq" class="pt-8 sm:pt-12 border-t border-primary/10">
          <div class="max-w-3xl mb-8 sm:mb-12">
            <span class="font-label-caps text-[9.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-accent uppercase font-bold block mb-1.5 sm:mb-2">
              ${isTa ? 'பொதுவான கேள்விகள்' : 'Common Questions'}
            </span>
            <h2 class="font-display text-2xl sm:text-3xl font-bold text-primary">
              ${isTa ? 'அடிக்கடி கேட்கப்படும் கேள்விகள்' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div class="flex flex-col gap-3.5 sm:gap-4 max-w-4xl">
            
            <details class="bg-surface-container-low p-4 sm:p-6 rounded-2xl border border-primary/5 cursor-pointer group shadow-sm" open>
              <summary class="flex justify-between items-center list-none font-display font-bold text-sm sm:text-base text-primary">
                <span>${isTa ? 'தானியங்களை அரைப்பதற்கு முன் ஏன் முளைகட்டுகிறீர்கள்?' : 'Why are your grains sprouted before grinding?'}</span>
                <span class="material-symbols-outlined text-primary group-open:rotate-180 transition-transform flex-shrink-0">expand_more</span>
              </summary>
              <p class="mt-2.5 sm:mt-3 text-xs text-on-surface-variant leading-relaxed">
                ${isTa ? 'தானியங்களை 48 மணி நேரம் ஊறவைத்து முளைகட்டுவதால் வாயுத்தொல்லை நீங்கி, கால்சியம், இரும்புச்சத்து எளிதில் உடலால் உறிஞ்சப்படுகிறது.' : 'Raw grains have natural protective outer layers that can feel heavy in the stomach. Soaking and sprouting for 48 hours breaks down heaviness naturally, making calcium, iron, and fiber much easier for your body to absorb without bloating.'}
              </p>
            </details>

            <details class="bg-surface-container-low p-4 sm:p-6 rounded-2xl border border-primary/5 cursor-pointer group shadow-sm">
              <summary class="flex justify-between items-center list-none font-display font-bold text-sm sm:text-base text-primary">
                <span>${isTa ? 'புதிதாக அரைக்கப்பட்ட மாவு எவ்வளவு காலம் கெடாமல் இருக்கும்?' : 'How long does freshly ground flour stay fresh?'}</span>
                <span class="material-symbols-outlined text-primary group-open:rotate-180 transition-transform flex-shrink-0">expand_more</span>
              </summary>
              <p class="mt-2.5 sm:mt-3 text-xs text-on-surface-variant leading-relaxed">
                ${isTa ? 'ரசாயனம் இல்லாததால் அறை வெப்பநிலையில் 6 மாதங்கள் வரையிலும், குளிர்சாதனப் பெட்டியில் வைத்தால் 12 மாதங்கள் வரையிலும் புத்துணர்ச்சியுடன் இருக்கும்.' : 'Because our flours contain natural healthy grain oils and zero preservatives, they stay fresh for up to 6 months at room temperature in a dry container, or up to 12 months when stored in the refrigerator.'}
              </p>
            </details>

            <details class="bg-surface-container-low p-4 sm:p-6 rounded-2xl border border-primary/5 cursor-pointer group shadow-sm">
              <summary class="flex justify-between items-center list-none font-display font-bold text-sm sm:text-base text-primary">
                <span>${isTa ? 'அனைத்து தயாரிப்புகளும் ஆய்வகத்தில் சோதிக்கப்படுகின்றனவா?' : 'Are all products tested for chemicals and pesticides?'}</span>
                <span class="material-symbols-outlined text-primary group-open:rotate-180 transition-transform flex-shrink-0">expand_more</span>
              </summary>
              <p class="mt-2.5 sm:mt-3 text-xs text-on-surface-variant leading-relaxed">
                ${isTa ? 'ஆம்! ஒவ்வொரு அறுவடையும் பூச்சிக்கொல்லி எச்சங்கள் மற்றும் ரசாயனங்கள் இல்லை என அங்கீகரிக்கப்பட்ட ஆய்வகங்களில் சோதிக்கப்படுகிறது.' : 'Yes! Every harvest batch is certified and lab-tested to verify zero pesticide residues, zero chemicals, and zero heavy metals.'}
              </p>
            </details>

            <details class="bg-surface-container-low p-4 sm:p-6 rounded-2xl border border-primary/5 cursor-pointer group shadow-sm">
              <summary class="flex justify-between items-center list-none font-display font-bold text-sm sm:text-base text-primary">
                <span>${isTa ? 'டெலிவரி கட்டணம் மற்றும் கால அளவு என்ன?' : 'What are the delivery charges and shipping times?'}</span>
                <span class="material-symbols-outlined text-primary group-open:rotate-180 transition-transform flex-shrink-0">expand_more</span>
              </summary>
              <p class="mt-2.5 sm:mt-3 text-xs text-on-surface-variant leading-relaxed">
                ${isTa ? '₹799-க்கு மேற்பட்ட அனைத்து ஆர்டர்களுக்கும் இந்தியா முழுவதும் இலவச டெலிவரி வழங்கப்படுகிறது. டெலிவரி 2 முதல் 4 வேலை நாட்களில் வந்து சேரும்.' : 'All orders above ₹799 receive Free Home Delivery across India! Standard delivery takes 2 to 4 business days, and orders are packed in plastic-free eco packaging.'}
              </p>
            </details>

          </div>
        </section>

      </div>
    </div>
  `;
}

export function attachContactEvents() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      showToast(getLanguage() === 'ta' ? 'நன்றி! உங்கள் செய்தி எங்கள் குழுவிற்கு அனுப்பப்பட்டது.' : 'Thank you! Your message has been sent to our customer care team.');
      form.reset();
    };
  }
}
