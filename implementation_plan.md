# Antigravity Build Brief — Organic Food Showcase + E-Commerce Website

**Read this whole file before starting. Treat it as the single source of truth for scope, data model, and build order.**

## 0. Context & Design Source
This is a showcase-cum-e-commerce website for a brand selling organic food products (ragi malt, ABC juice, millets, dry fruits, combos, etc.).

**The visual design is owned by a connected Google Stitch project, not by you.** Connect to it via the Stitch MCP server and fetch the `DESIGN.md` design tokens plus all generated screens (Home, Shop/Category, Product Detail, Cart, Checkout, About, Contact) before writing any UI code. Treat `DESIGN.md` as authoritative for colors, typography, spacing, and component styling — do not introduce your own default styling choices where Stitch has already specified one (no generic default fonts, no default centered-hero-carousel, no default icon-in-circle feature rows). If a screen or state isn't covered by the Stitch designs (e.g. an empty-cart state, a 404 page, a loading skeleton), extend the existing design system's tokens and patterns consistently rather than inventing an unrelated style.

After implementing each screen, use the integrated browser to compare it against the matching Stitch screen and correct any visual drift before moving on.

## 1. Stack
- **Frontend:** Next.js (App Router), Tailwind CSS mapped to the Stitch design tokens
- **State:** Zustand for cart state, persisted to `localStorage`, synced to Firestore for logged-in users
- **Backend:** Firebase — Firestore (database), Firebase Authentication, Firebase Storage (media), Firebase Hosting, Cloud Functions (serverless logic)
- **Payments:** None in this build. Checkout ends in a WhatsApp deep-link handoff, not a payment gateway (see Section 5).

## 2. Sitemap
```
/                      → Home
/shop                  → Product listing (filter/sort)
/product/[slug]        → Product detail page (PDP)
/categories/[slug]     → Category landing
/cart                  → Cart drawer/page
/checkout              → Order review → WhatsApp handoff
/account               → Basic order history (phone-OTP authenticated)
/about                 → Brand story
/contact               → Contact form + WhatsApp CTA
/faq
/privacy-policy, /terms, /shipping-policy, /refund-policy
```

## 3. Firestore Data Model

**`products`**
```json
{
  "id": "string",
  "slug": "string",
  "name": "string",
  "description": "string",
  "ingredients": "string",
  "nutritionInfo": "string",
  "category": "ref -> categories",
  "images": ["url", "..."],
  "variants": [{ "label": "500g", "price": 249, "stock": 40, "sku": "string" }],
  "tags": ["gluten-free", "no-preservatives"],
  "isFeatured": "bool",
  "isActive": "bool",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**`categories`**
```json
{ "id": "string", "slug": "string", "name": "string", "description": "string", "imageUrl": "url", "sortOrder": "number" }
```

**`orders`**
```json
{
  "id": "string",
  "orderNumber": "string",
  "customer": { "name": "string", "phone": "string", "address": "string", "pincode": "string", "notes": "string" },
  "items": [{ "productId": "string", "variantLabel": "string", "qty": "number", "price": "number" }],
  "subtotal": "number",
  "deliveryFee": "number",
  "total": "number",
  "status": "pending_confirmation | confirmed | shipped | delivered | cancelled",
  "whatsappSent": "bool",
  "createdAt": "timestamp"
}
```

**`reviews`**
```json
{ "productId": "ref -> products", "userName": "string", "rating": "number", "comment": "string", "createdAt": "timestamp", "approved": "bool" }
```

**`banners`**
```json
{ "imageUrl": "url", "title": "string", "subtitle": "string", "ctaLink": "string", "sortOrder": "number", "active": "bool" }
```

## 4. Firestore Security Rules (implement these exactly)
- `products`, `categories`, `banners`: public read; write restricted to a custom `admin` auth claim
- `orders`: public create (protect with Firebase App Check / rate limiting); read/update restricted to the order's owner (matched by phone or uid) or an admin
- `reviews`: create allowed for any authenticated user; the `approved` boolean can only be toggled by an admin; only `approved: true` reviews are shown publicly

## 5. Cart & WhatsApp Checkout Flow (build exactly as described — do not add a payment gateway)
1. **Cart:** line items with quantity edit/remove, subtotal, persisted in Zustand + localStorage; synced to Firestore if the user is signed in.
2. **Checkout screen:** collect name, phone, delivery address, pincode, preferred payment mode (COD / UPI-manual), order notes. Label this step clearly as "Reserve your order" / "Confirm on WhatsApp" — not "Checkout" or "Pay now," since no payment is actually processed here.
3. **On submit:**
   - Write a document to the `orders` collection with `status: "pending_confirmation"`.
   - Build an order-summary text string (items, quantities, prices, total, customer name/address).
   - `encodeURIComponent` that string and construct `https://wa.me/<BUSINESS_WHATSAPP_NUMBER>?text=<encoded-summary>`.
   - Open that link (new tab) and show an on-screen confirmation: "Your order is ready — confirm it on WhatsApp to complete it."
4. Add a persistent floating "Chat on WhatsApp" button site-wide for pre-sales questions (separate from the checkout flow).
5. `BUSINESS_WHATSAPP_NUMBER` should be a configurable environment variable, not hardcoded.

This is the free `wa.me` deep-link method — no WhatsApp Business API subscription or payment gateway integration in this build. Both are explicitly out of scope (see Section 8).

## 6. Auth
Firebase Authentication with phone-number OTP as the primary method (fits a WhatsApp-first customer base); optional Google sign-in as a secondary option. Authenticated users get: saved cart sync, basic order history at `/account`, and the ability to submit product reviews.

## 7. Performance, SEO, Accessibility Requirements
- Mobile-first; validate at 375px, 768px, 1024px, 1440px
- Images: WebP, responsive `srcset`, lazy-loaded below the fold
- Lighthouse targets: Performance ≥ 85, Accessibility ≥ 90, SEO ≥ 95 (mobile)
- Core Web Vitals: LCP < 2.5s, CLS < 0.1
- Per-product meta titles/descriptions, JSON-LD structured data (`Product`, `Offer`, `BreadcrumbList`), sitemap.xml, robots.txt
- Semantic HTML, ARIA labels on icon-only buttons (cart, wishlist, search), color contrast ≥ 4.5:1, full keyboard navigation

## 8. Explicitly Out of Scope (flag back rather than build)
- Real payment gateway integration (Razorpay/PayU, etc.)
- Official WhatsApp Business Cloud API / automated order-status messaging
- Full admin dashboard beyond what's needed to manage `products`/`categories`/`banners`/`orders` from the Firebase console or a minimal protected `/admin` route
- Loyalty, subscriptions, multi-currency, or multi-language support

## 9. Placeholder Content Policy
Use realistic placeholder content (ragi malt, ABC juice, millet varieties, dry fruit combos — realistic Indian pricing in ₹) until real product data, photography, and copy are supplied. Do not invent final brand copy, certifications, or claims (e.g. FSSAI numbers) — leave clearly marked placeholders for these instead.

## 10. Build Order
1. Connect Stitch MCP, fetch `DESIGN.md` + all screens
2. Home, About, Contact, header/footer, responsive nav — wired to `banners`/`categories`
3. Shop listing + category pages + PDP, wired to `products`
4. Cart + WhatsApp checkout flow, wired to `orders`
5. Phone-OTP auth, basic `/account` order history, reviews
6. SEO/performance/accessibility pass
7. Firebase Hosting deploy + custom domain + SSL + Analytics

After each numbered step, do a visual verification pass against the Stitch screens before proceeding to the next step.
