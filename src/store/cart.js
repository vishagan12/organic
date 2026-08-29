import { products } from './products.js';

// Local storage key
const STORAGE_KEY = 'aura_botanica_cart_v2';

// Thresholds & Constants in Indian Rupees (₹)
export const FREE_SHIPPING_THRESHOLD = 799.00;
export const STANDARD_SHIPPING = 80.00;
export const TAX_RATE = 0.05; // 5% GST

// Initial state from LocalStorage
function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load cart:', e);
    return [];
  }
}

let cartItems = loadCart();
let promoCode = null;

// Valid Promo Codes
const VALID_PROMOS = {
  'BOTANICAL15': { discount: 0.15, description: '15% Off Botanical Heritage' },
  'AURA10': { discount: 0.10, description: '10% Off Apothecary Staples' }
};

// Event Listeners for reactive updates
const listeners = new Set();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  } catch (e) {
    console.error('Failed to save cart:', e);
  }
  notify();
}

function notify() {
  listeners.forEach(fn => fn(cartItems, getTotals()));
  window.dispatchEvent(new CustomEvent('cart:updated', { detail: { items: cartItems, totals: getTotals() } }));
}

export function subscribeCart(callback) {
  listeners.add(callback);
  callback(cartItems, getTotals());
  return () => listeners.delete(callback);
}

export function getCartItems() {
  return [...cartItems];
}

export function getProductTotalQuantity(productId) {
  return cartItems
    .filter(item => item.product.id === productId)
    .reduce((acc, item) => acc + item.quantity, 0);
}

export function getCartItemByProduct(productId) {
  return cartItems.find(item => item.product.id === productId) || null;
}

export function addToCart(product, quantity = 1, size = null, isSubscription = false) {
  const itemSize = size || (product.sizes ? product.sizes[0] : 'Standard');
  const existingIndex = cartItems.findIndex(
    item => item.product.id === product.id && item.size === itemSize && item.isSubscription === isSubscription
  );

  if (existingIndex > -1) {
    cartItems[existingIndex].quantity += quantity;
  } else {
    cartItems.push({
      id: `${product.id}-${itemSize}-${isSubscription ? 'sub' : 'one'}`,
      product,
      quantity,
      size: itemSize,
      isSubscription
    });
  }
  persist();
  return true;
}

export function increaseProductQuantity(productId) {
  const existing = cartItems.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity += 1;
    persist();
  }
}

export function decreaseProductQuantity(productId) {
  const existing = cartItems.find(item => item.product.id === productId);
  if (existing) {
    if (existing.quantity <= 1) {
      removeFromCart(existing.id);
    } else {
      existing.quantity -= 1;
      persist();
    }
  }
}

export function updateQuantity(itemId, newQty) {
  if (newQty <= 0) {
    removeFromCart(itemId);
    return;
  }
  const item = cartItems.find(i => i.id === itemId);
  if (item) {
    item.quantity = newQty;
    persist();
  }
}

export function removeFromCart(itemId) {
  cartItems = cartItems.filter(i => i.id !== itemId);
  persist();
}

export function clearCart() {
  cartItems = [];
  promoCode = null;
  persist();
}

export function applyPromoCode(code) {
  const normalized = code.trim().toUpperCase();
  if (VALID_PROMOS[normalized]) {
    promoCode = normalized;
    notify();
    return { success: true, message: `Promo code ${normalized} applied!` };
  }
  return { success: false, message: 'Invalid promotional code.' };
}

export function removePromoCode() {
  promoCode = null;
  notify();
}

export function getTotals() {
  const subtotal = cartItems.reduce((acc, item) => {
    const basePrice = item.product.price;
    const price = item.isSubscription ? (basePrice * 0.9) : basePrice;
    return acc + (price * item.quantity);
  }, 0);

  let discount = 0;
  if (promoCode && VALID_PROMOS[promoCode]) {
    discount = subtotal * VALID_PROMOS[promoCode].discount;
  }

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const isFreeShipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = subtotal === 0 ? 0 : (isFreeShipping ? 0 : STANDARD_SHIPPING);
  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + shipping + tax;

  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return {
    subtotal,
    promoDiscount: discount,
    totalDiscount: discount,
    discountedSubtotal,
    shipping,
    tax,
    total,
    itemCount,
    isFreeShipping,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountNeededForFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
    appliedPromo: promoCode ? { code: promoCode, ...VALID_PROMOS[promoCode] } : null
  };
}
