import { getLanguage } from '../store/i18n.js';

export function renderJournalPage() {
  const isTa = getLanguage() === 'ta';

  const articlesEn = [
    {
      id: 'sprouting-science',
      tag: 'Healthy Grains',
      title: 'Why Sprouting Makes Grains 10x Easier to Digest',
      date: 'August 24, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1000&q=85',
      summary: 'Soaking and sprouting grains for 48 hours removes natural anti-nutrients, unlocks easily absorbed calcium and plant iron, and eliminates post-meal heaviness.',
      content: `
        <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">The Problem with Raw Unsprouted Grains</h4>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
          In nature, seeds protect themselves with natural outer coats (phytic acid) so they do not germinate prematurely. When we consume unsprouted grains, this protective layer binds to minerals like iron and calcium, preventing full digestion.
        </p>
        <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">What Happens During 48-Hour Sprouting</h4>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
          When grains are soaked in clean water, the seed awakens. Phytic acid breaks down naturally by over 70%, complex starches convert into simple carbohydrates, and bio-available calcium doubles.
        </p>
        <div class="p-4 sm:p-5 rounded-2xl bg-surface border-l-4 border-accent text-xs text-on-surface leading-relaxed italic mb-4">
          "Sprouting is nature's own pre-digestion. You enjoy light, energizing meals with zero bloating."
        </div>
      `
    },
    {
      id: 'morning-elixirs',
      tag: 'Daily Nutrition',
      title: '3 Simple Morning Drinks for Natural All-Day Energy',
      date: 'August 18, 2026',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=85',
      summary: 'Replace caffeine jitters with cold-pressed ABC juice, warm sprouted ragi malt, or wild amla drops to feel light, clear, and energized all day long.',
      content: `
        <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">1. Warm Sprouted Ragi Malt</h4>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
          Whisk 2 tablespoons of sprouted ragi flour with warm water or milk and a teaspoon of organic jaggery. It provides sustained calcium and iron to fuel your mornings.
        </p>
        <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">2. Raw Cold-Pressed ABC Juice</h4>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
          Cold-pressing crisp apples, beetroot, and carrots delivers natural antioxidants and Vitamin C directly to your cells without stressing your liver.
        </p>
        <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">3. Amla & Ashwagandha Drops</h4>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
          Add 15–20 drops to warm water for steady cortisol balancing and a clean immunity boost before your first meal.
        </p>
      `
    },
    {
      id: 'terracotta-healing',
      tag: 'Healthy Kitchen',
      title: 'How Cooking in Clay Pots Keeps Food Cool and Fresh',
      date: 'August 10, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85',
      summary: 'Discover the ancient science of porous terracotta pots—naturally cooling water, balancing pH acidity, and preserving wholesome flavors.',
      content: `
        <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">Natural Evaporative Cooling</h4>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
          Natural clay has microscopic pores. When water seeps into these pores, it evaporates and cools the liquid inside naturally, keeping drinking water cold and sweet without refrigeration.
        </p>
        <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">Alkaline pH Balance</h4>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
          Clay is naturally alkaline, which balances the acidic nature of water and food. Storing water in earthenware creates mineral-rich water that is gentle on your throat and digestive system.
        </p>
      `
    }
  ];

  const articlesTa = [
    {
      id: 'sprouting-science',
      tag: 'பாரம்பரிய தானியங்கள்',
      title: 'தானியங்களை முளைகட்டுவதால் செரிமானம் 10 மடங்கு எளிதாகும் விதம்',
      date: 'ஆகஸ்ட் 24, 2026',
      readTime: '4 நிமிட வாசிப்பு',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1000&q=85',
      summary: '48 மணி நேரம் தானியங்களை முளைகட்டுவதால் வாயுத்தொல்லை நீங்கி, கால்சியம் மற்றும் இரும்புச்சத்து உடலில் எளிதாக சேர்கிறது.',
      content: `
        <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">முளைகட்டாத தானியங்களின் சிக்கல்</h4>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
          இயற்கையில் விதைகள் தங்களை பாதுகாத்துக் கொள்ள 'பைடிக் அமிலம்' என்ற பாதுகாப்பு அடுக்கைக் கொண்டிருக்கும். முளைகட்டாமல் சாப்பிடும்போது இந்த அடுக்கு கால்சியம் மற்றும் இரும்புச்சத்தை உடல் உறிஞ்சுவதை தடுக்கிறது.
        </p>
        <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">48 மணி நேர முளைகட்டலின் போது நடப்பது</h4>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
          தானியங்களை சுத்தமான தண்ணீரில் ஊறவைத்து முளைகட்டும்போது, பைடிக் அமிலம் 70% மேல் குறைகிறது. சிக்கலான மாவுச்சத்து எளிதில் ஜீரணமாகும் சத்தாக மாறி உடலுக்கு உடனடி வலிமை தருகிறது.
        </p>
        <div class="p-4 sm:p-5 rounded-2xl bg-surface border-l-4 border-accent text-xs text-on-surface leading-relaxed italic mb-4">
          "முளைகட்டுதல் என்பது இயற்கையான முன்-செரிமானம். இதனால் வாயுத்தொல்லையின்றி நாள் முழுவதும் சுறுசுறுப்பாக இருக்கலாம்."
        </div>
      `
    },
    {
      id: 'morning-elixirs',
      tag: 'தினசரி ஊட்டச்சத்து',
      title: 'நாள் முழுவதும் சுறுசுறுப்பாக இருக்க 3 எளிய காலை பானங்கள்',
      date: 'ஆகஸ்ட் 18, 2026',
      readTime: '3 நிமிட வாசிப்பு',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=85',
      summary: 'காஃபின் போன்றவற்றுக்கு பதிலாக தூய ஏபிசி ஜூஸ், முளைகட்டிய ராகி கூழ் அல்லது நெல்லிக்காய் சாறு அருந்தி புத்துணர்ச்சி பெறுங்கள்.',
      content: `
        <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">1. சூடான முளைகட்டிய ராகி கூழ்</h4>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
          2 தேக்கரண்டி முளைகட்டிய ராகி மாவை பால் அல்லது தண்ணீரில் நாட்டுச்சர்க்கரையுடன் கலந்து காய்ச்சி பருகலாம். இது எலும்புகளுக்கு அதிக கால்சியம் தரும்.
        </p>
        <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">2. தூய ஏபிசி ஜூஸ் (ஆப்பிள், பீட்ரூட், கேரட்)</h4>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
          தண்ணீர் சேர்க்காமல் பிழியப்பட்ட புதிய ஏபிசி ஜூஸ் சருமத்திற்கு பொலிவையும் உடலுக்கு இயற்கை வைட்டமின் சியையும் வழங்குகிறது.
        </p>
        <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">3. நெல்லி & அஸ்வகந்தா துளிகள்</h4>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
          வெதுவெதுப்பான நீரில் 15-20 துளிகள் கலந்து பருகினால் மன அழுத்தம் குறைந்து நோய் எதிர்ப்பு சக்தி அதிகரிக்கும்.
        </p>
      `
    },
    {
      id: 'terracotta-healing',
      tag: 'ஆரோக்கிய சமையலறை',
      title: 'மண்பாண்டங்களில் நீர் அருந்துவதும் சமைப்பதும் ஏன் சிறந்தது?',
      date: 'ஆகஸ்ட் 10, 2026',
      readTime: '5 நிமிட வாசிப்பு',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=85',
      summary: 'களிமண் பாண்டங்கள் தண்ணீரை இயற்கையாக குளிர்வித்து, அமிலத்தன்மையை சமன்செய்து ஆரோக்கியமான தாதுக்களை சேர்க்கும் முறை.',
      content: `
        <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">இயற்கை ஆவியாதல் குளிர்ச்சி</h4>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
          களிமண்ணில் உள்ள நுண்துளைகள் வழியாக நீர் மெதுவாக ஆவியாகும்போது உள்ளே இருக்கும் நீர் குளிர்ச்சியாகவும் தித்திப்பாகவும் மாறுகிறது.
        </p>
        <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">காரத்தன்மை சமநிலை (Alkaline Balance)</h4>
        <p class="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3 sm:mb-4">
          மண் இயற்கையிலேயே காரத்தன்மை கொண்டது. இது நீரின் அமிலத்தன்மையை நடுநிலையாக்கி தொண்டைக்கும் வயிற்றுக்கும் இதம் தருகிறது.
        </p>
      `
    }
  ];

  const articles = isTa ? articlesTa : articlesEn;

  return `
    <div class="w-full bg-surface pt-4 sm:pt-10 pb-section-gap">
      <div class="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        
        <!-- Header -->
        <div class="max-w-3xl mb-10 sm:mb-16">
          <div class="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-surface-container-low border border-primary/10 text-tertiary-container mb-2.5 sm:mb-3 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-accent"></span>
            <span class="font-label-caps text-[9.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-accent font-bold uppercase">${isTa ? 'ஆரோக்கிய வழிகாட்டிகள்' : 'Wellness & Living Guides'}</span>
          </div>
          <h1 class="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2.5 sm:mb-4">
            ${isTa ? 'ஆரா பொட்டானிகா ஆரோக்கிய இதழ்' : 'The Botanical Journal'}
          </h1>
          <p class="font-body text-xs sm:text-base text-on-surface-variant leading-relaxed">
            ${isTa ? 'ஆரோக்கிய சமையல் குறிப்புகள், சிறுதானியங்களின் நன்மைகள் மற்றும் இயற்கை வாழ்வியல் வழிகாட்டி.' : 'Simple guides on traditional Indian grains, healthy morning drinks, and practical tips for natural everyday vitality.'}
          </p>
        </div>

        <!-- Articles Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
          ${articles.map(art => `
            <div class="bg-surface-container-low rounded-2xl sm:rounded-[2.5rem] overflow-hidden border border-primary/5 shadow-editorial hover:shadow-editorial-hover transition-all flex flex-col justify-between group">
              
              <div>
                <div class="aspect-[16/10] overflow-hidden bg-surface relative">
                  <img 
                    src="${art.image}" 
                    alt="${art.title}" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    loading="lazy" 
                    decoding="async" 
                  />
                  <span class="absolute top-3 left-3 sm:top-4 sm:left-4 bg-surface/95 backdrop-blur-sm text-primary text-[9px] sm:text-[10px] font-label-caps uppercase font-bold tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-primary/10 shadow-sm">
                    ${art.tag}
                  </span>
                </div>

                <div class="p-4 sm:p-8 pb-3 sm:pb-4">
                  <div class="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-on-surface-variant mb-1.5 sm:mb-2">
                    <span>${art.date}</span>
                    <span>•</span>
                    <span>${art.readTime}</span>
                  </div>

                  <h3 class="font-display text-lg sm:text-2xl font-bold text-primary group-hover:text-accent transition-colors mb-2 sm:mb-3 leading-snug">
                    ${art.title}
                  </h3>

                  <p class="text-xs text-on-surface-variant leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                    ${art.summary}
                  </p>
                </div>
              </div>

              <div class="p-4 sm:p-8 pt-0">
                <!-- Full Content Details -->
                <details class="border-t border-primary/10 pt-3 sm:pt-4 cursor-pointer">
                  <summary class="flex justify-between items-center list-none font-label-caps text-xs text-primary font-bold uppercase tracking-wider group-hover:text-accent">
                    <span>${isTa ? 'முழு கட்டுரையைப் படிக்க' : 'Read Full Article'}</span>
                    <span class="material-symbols-outlined text-sm">expand_more</span>
                  </summary>
                  <div class="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-primary/5">
                    ${art.content}
                  </div>
                </details>
              </div>

            </div>
          `).join('')}
        </div>

        <!-- Bottom Newsletter CTA -->
        <div class="bg-primary text-surface p-6 sm:p-14 rounded-3xl sm:rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden">
          <div class="absolute inset-0 glow-emerald pointer-events-none opacity-30"></div>
          <div class="relative z-10 max-w-xl mx-auto">
            <span class="font-label-caps text-[11px] sm:text-xs text-accent uppercase tracking-widest block mb-1.5 sm:mb-2 font-bold">${isTa ? 'ஆரோக்கிய இதழ் சந்தா' : 'Weekly Recipes in Your Inbox'}</span>
            <h2 class="font-display text-xl sm:text-4xl font-bold text-surface mb-2 sm:mb-3">
              ${isTa ? 'இயற்கை உணவு குறிப்புகளைப் பெறுங்கள்' : 'Get Fresh Recipes & Health Tips'}
            </h2>
            <p class="text-surface/80 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
              ${isTa ? 'ஒவ்வொரு வாரமும் புதிய பாரம்பரிய உணவு சமையல் குறிப்புகள் உங்கள் மின்னஞ்சலுக்கு வந்து சேரும்.' : 'Subscribe for weekly seasonal wellness advice, sprouted grain cooking recipes, and exclusive discount codes.'}
            </p>
            <a href="#/shop" class="w-full sm:w-auto bg-accent hover:bg-accent-hover text-on-primary px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-label-caps text-xs uppercase tracking-wider font-bold shadow-lg shadow-accent/25 transition-all inline-block text-center">
              ${isTa ? 'ஆர்கானிக் பொருட்களைப் பார்க்க' : 'Explore Organic Staples'}
            </a>
          </div>
        </div>

      </div>
    </div>
  `;
}
