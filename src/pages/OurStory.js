import { getLanguage, t } from '../store/i18n.js';

export function renderOurStoryPage() {
  const isTa = getLanguage() === 'ta';

  return `
    <div class="w-full bg-surface pt-4 sm:pt-10 pb-section-gap">
      
      <!-- Hero Banner -->
      <section class="px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto text-center mb-12 sm:mb-20">
        <div class="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-surface-container-low border border-primary/10 text-tertiary-container mb-3 sm:mb-4 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-accent"></span>
          <span class="font-label-caps text-[9.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-accent font-bold uppercase">
            ${isTa ? 'எங்கள் விவசாய பாரம்பரியம்' : 'Our Farming Roots'}
          </span>
        </div>
        <h1 class="font-display text-2xl sm:text-4xl lg:text-6xl font-bold text-primary mb-4 sm:mb-6 leading-tight">
          ${isTa ? 'பாரம்பரிய இயற்கை உணவை உங்கள் <span class="italic text-accent font-normal">வீட்டிற்கு கொண்டு சேர்க்கிறோம்.</span>' : 'Bringing Traditional Organic Food <span class="italic text-accent font-normal">Back to Your Table.</span>'}
        </h1>
        <p class="font-body text-xs sm:text-base lg:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          ${isTa ? 'ஆரா பொட்டானிகா ஒரு எளிய நம்பிக்கையுடன் தொடங்கியது: இயற்கை விவசாயிகளால் விளைவிக்கப்பட்டு, ரசாயனம் இன்றி பாரம்பரிய முறையில் தயாரிக்கப்படும் உணவே உடலுக்கு மிகவும் நல்லது.' : 'Aura Botanica started with a simple belief: the healthiest food is the food grown naturally by local farmers, harvested with care, and prepared without harmful chemicals or intense processing.'}
        </p>
      </section>

      <!-- Editorial Story Block -->
      <section class="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto mb-16 sm:mb-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          <div class="lg:col-span-6 aspect-[4/3] rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-editorial border border-primary/5 bg-surface-container-low">
            <img 
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=85" 
              alt="Harvesting Healthy Grains" 
              class="w-full h-full object-cover" 
              loading="lazy" 
              decoding="async" 
            />
          </div>

          <div class="lg:col-span-6 flex flex-col items-start pl-0 lg:pl-6">
            <span class="font-label-caps text-[9.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-accent uppercase mb-1.5 sm:mb-2 font-bold">
              ${isTa ? 'எங்கள் தொடக்கம்' : 'Why We Started'}
            </span>
            <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4 sm:mb-6">
              ${isTa ? 'பாரம்பரிய சத்துக்களை மீண்டும் மீட்டெடுத்தல்' : 'Rediscovering Real, Nutritious Grains'}
            </h2>
            <p class="text-on-surface-variant text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
              ${isTa ? 'கடந்த சில தசாப்தங்களாக, வெள்ளை மாவு மற்றும் தீட்டப்பட்ட அரிசி நம் பாரம்பரிய சிறுதானியங்களை மாற்றிவிட்டது. இதனால் நம் உடலுக்கு தேவையான நார்ச்சத்து மற்றும் கால்சியம் போன்ற இயற்கை தாதுக்கள் குறைந்துவிட்டன.' : 'Over the decades, refined white flour and polished grains replaced traditional millets and sprouted flours. While fast to produce, these foods lost the natural fiber, calcium, and minerals that keep us energized and healthy.'}
            </p>
            <p class="text-on-surface-variant text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              ${isTa ? 'நாங்கள் இயற்கை விவசாயிகளுடன் கைகோர்த்து மழைநீரில் விளையும் கேழ்வரகு, தினை மற்றும் மூலிகைகளை ரசாயன பூச்சிக்கொல்லிகள் இன்றி பயிரிட்டு தருகிறோம்.' : 'We partnered directly with hardworking family farmers in Karnataka and the Deccan plateau to bring back naturally grown Finger Millet (Ragi), Foxtail Millet, and wild herbs—crops that naturally thrive on clean monsoon rain without synthetic sprays.'}
            </p>
            <div class="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface-container-low border-l-4 border-accent text-primary text-xs sm:text-base font-display italic leading-relaxed shadow-sm">
              ${isTa ? '"மண்ணின் வளமும் மழைநீரின் தூய்மையும் நிறைந்த உணவை நீங்கள் உண்ணும்போது உடலின் புத்துணர்ச்சியை உணர முடியும்."' : '"When you eat food grown with pure soil and clean rain, you can feel the natural vitality in every single bite."'}
            </div>
          </div>

        </div>
      </section>

      <!-- 3 Key Pillars Grid -->
      <section id="sourcing" class="w-full bg-surface-container-low py-14 sm:py-24 border-y border-primary/10 mb-16 sm:mb-24">
        <div class="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
          <div class="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span class="font-label-caps text-[9.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-accent uppercase font-bold block mb-1.5 sm:mb-2">
              ${isTa ? 'எங்கள் தர உறுதி' : 'Our Quality Promise'}
            </span>
            <h2 class="font-display text-2xl sm:text-4xl font-bold text-primary">
              ${isTa ? 'நாங்கள் பின்பற்றும் 3 முக்கிய தரநிலைகள்' : 'The 3 Standards We Live By'}
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            <div class="bg-surface p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] border border-primary/5 shadow-editorial">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4 sm:mb-6">
                <span class="material-symbols-outlined text-2xl sm:text-3xl">nest_eco_leaf</span>
              </div>
              <h3 class="font-display text-lg sm:text-2xl font-bold text-primary mb-2 sm:mb-3">
                ${isTa ? '1. 100% இயற்கை மண்' : '1. 100% Organic Soil'}
              </h3>
              <p class="text-xs text-on-surface-variant leading-relaxed">
                ${isTa ? 'செயற்கை உரங்கள் அல்லது பூச்சிக்கொல்லிகள் எதுவும் இல்லை. இயற்கை சாண உரம், வேப்பங்கொட்டை கரைசல் மற்றும் மழைநீரால் பயிரிடப்படுகிறது.' : 'Zero chemical pesticides or synthetic chemical fertilizers. Our partner farmers use natural organic compost, neem plant extracts, and rainwater.'}
              </p>
            </div>

            <div class="bg-surface p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] border border-primary/5 shadow-editorial">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4 sm:mb-6">
                <span class="material-symbols-outlined text-2xl sm:text-3xl">water_drop</span>
              </div>
              <h3 class="font-display text-lg sm:text-2xl font-bold text-primary mb-2 sm:mb-3">
                ${isTa ? '2. 48-மணி நேர முளைகட்டல்' : '2. 48-Hour Sprouting'}
              </h3>
              <p class="text-xs text-on-surface-variant leading-relaxed">
                ${isTa ? 'சுத்தமான நீரில் ஊறவைத்து 48 மணி நேரம் முளைகட்டுவதால் கால்சியம், இரும்புச்சத்து எளிதில் உறிஞ்சப்பட்டு செரிமானம் எளிதாகிறது.' : 'We soak and sprout every grain in clean spring water for 48 hours to naturally break down heaviness, making calcium and plant iron easy to digest.'}
              </p>
            </div>

            <div class="bg-surface p-6 sm:p-10 rounded-2xl sm:rounded-[2rem] border border-primary/5 shadow-editorial">
              <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4 sm:mb-6">
                <span class="material-symbols-outlined text-2xl sm:text-3xl">inventory_2</span>
              </div>
              <h3 class="font-display text-lg sm:text-2xl font-bold text-primary mb-2 sm:mb-3">
                ${isTa ? '3. பிளாஸ்டிக் அற்ற பேக்கிங்' : '3. Plastic-Free Packing'}
              </h3>
              <p class="text-xs text-on-surface-variant leading-relaxed">
                ${isTa ? 'பருத்தி துணி பைகள், மறுபயன்பாட்டு கண்ணாடி பாட்டில்கள் மற்றும் கிராஃப்ட் காகித பைகளில் பேக் செய்யப்படுகிறது.' : 'From unbleached cotton bags to reusable glass bottles and paper kraft pouches, all our packaging is safe for the planet.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- 3-Step Process -->
      <section class="px-4 sm:px-8 lg:px-12 max-w-5xl mx-auto mb-16 sm:mb-24">
        <div class="text-center mb-10 sm:mb-16">
          <span class="font-label-caps text-[9.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-accent uppercase font-bold block mb-1.5 sm:mb-2">
            ${isTa ? 'விவசாய நிலத்திலிருந்து உங்கள் வீட்டிற்கு' : 'From Farm to Home'}
          </span>
          <h2 class="font-display text-2xl sm:text-4xl font-bold text-primary">
            ${isTa ? 'எங்கள் உணவுகள் தயாராகும் முறை' : 'How Our Food Is Made'}
          </h2>
        </div>

        <div class="flex flex-col gap-6 sm:gap-8">
          
          <div class="flex flex-col md:flex-row gap-4 sm:gap-6 items-start md:items-center">
            <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary text-accent flex items-center justify-center font-display text-xl sm:text-2xl font-bold flex-shrink-0 shadow-sm">
              01
            </div>
            <div class="flex-1 bg-surface-container-low p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-primary/5 shadow-editorial">
              <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-1">
                ${isTa ? 'பாரம்பரிய இயற்கை விவசாயம்' : 'Naturally Grown by Local Farmers'}
              </h4>
              <p class="text-xs text-on-surface-variant leading-relaxed">
                ${isTa ? 'பருவமழை காலத்தில் வளமான கரிசல் மண்ணில் விதைக்கப்பட்டு, குறைந்த தண்ணீரில் இயற்கை முறையில் வளர்க்கப்படுகிறது.' : 'Sown at the start of the monsoon season in rich black soil, requiring 70% less water than industrial white rice or wheat.'}
              </p>
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4 sm:gap-6 items-start md:items-center">
            <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary text-accent flex items-center justify-center font-display text-xl sm:text-2xl font-bold flex-shrink-0 shadow-sm">
              02
            </div>
            <div class="flex-1 bg-surface-container-low p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-primary/5 shadow-editorial">
              <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-1">
                ${isTa ? 'இயற்கை ஊறவைத்தல் & முளைகட்டுதல்' : 'Natural Soaking & Sprouting'}
              </h4>
              <p class="text-xs text-on-surface-variant leading-relaxed">
                ${isTa ? 'சிறிய முளைகள் வரும் வரை சுத்தமான நீரில் ஊறவைத்து, வைட்டமின்கள் மற்றும் நார்ச்சத்துக்கள் விழிப்படைய செய்யப்படுகிறது.' : 'Steeped in clean water until tiny green shoots appear, naturally awakening vitamins, dietary fiber, and natural minerals.'}
              </p>
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-4 sm:gap-6 items-start md:items-center">
            <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-primary text-accent flex items-center justify-center font-display text-xl sm:text-2xl font-bold flex-shrink-0 shadow-sm">
              03
            </div>
            <div class="flex-1 bg-surface-container-low p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-primary/5 shadow-editorial">
              <h4 class="font-display text-lg sm:text-xl font-bold text-primary mb-1">
                ${isTa ? 'பாரம்பரிய கல் திரிகை அரைப்பு' : 'Slow Stone Grinding'}
              </h4>
              <p class="text-xs text-on-surface-variant leading-relaxed">
                ${isTa ? 'வெப்பம் உண்டாகாமல் இயற்கை கருங்கல்லில் மெதுவாக சுழற்றி அரைத்து இயற்கை எண்ணெய் சத்து மாறாமல் பாதுகாக்கப்படுகிறது.' : 'Ground gently on natural granite stone wheels that turn slowly without creating heat, keeping natural healthy oils fresh.'}
              </p>
            </div>
          </div>

        </div>
      </section>

      <!-- CTA -->
      <section class="px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto text-center bg-primary text-surface p-8 sm:p-16 rounded-3xl sm:rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div class="absolute inset-0 glow-emerald pointer-events-none opacity-40"></div>
        <div class="relative z-10">
          <h2 class="font-display text-2xl sm:text-4xl font-bold text-surface mb-3 sm:mb-4">
            ${isTa ? 'இயற்கை உணவின் சுவையை அனுபவியுங்கள்' : 'Taste the Organic Difference'}
          </h2>
          <p class="text-surface/80 text-xs sm:text-sm max-w-md mx-auto mb-6 sm:mb-8 leading-relaxed">
            ${isTa ? 'முளைகட்டிய சத்தான மாவு வகைகள், பழச்சாறுகள் மற்றும் பாரம்பரிய தானியங்களை இன்றே ஆர்டர் செய்யுங்கள்.' : 'Bring healthy sprouted flours, fresh juices, and traditional grains to your family kitchen today.'}
          </p>
          <a href="#/shop" class="w-full sm:w-auto bg-accent hover:bg-accent-hover text-on-primary px-8 py-4 rounded-xl font-label-caps text-xs uppercase tracking-[0.15em] font-bold shadow-lg shadow-accent/25 transition-all inline-block text-center">
            ${t('viewAll')}
          </a>
        </div>
      </section>

    </div>
  `;
}
