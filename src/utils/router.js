export function parseRoute() {
  const hash = window.location.hash || '#/';
  
  if (hash === '#/' || hash === '#' || hash === '') {
    return { name: 'home' };
  }
  
  if (hash === '#/shop' || hash.startsWith('#/shop?')) {
    return { name: 'shop' };
  }

  if (hash.startsWith('#/product/')) {
    const id = hash.replace('#/product/', '').split('?')[0];
    return { name: 'product-detail', params: { id } };
  }

  if (hash === '#/cart') {
    return { name: 'cart' };
  }

  if (hash === '#/checkout') {
    return { name: 'checkout' };
  }

  if (hash === '#/story' || hash.startsWith('#/story#') || hash.startsWith('#/story?')) {
    return { name: 'story' };
  }

  if (hash === '#/journal' || hash.startsWith('#/journal?')) {
    return { name: 'journal' };
  }

  if (hash === '#/contact' || hash.startsWith('#/contact#') || hash.startsWith('#/contact?')) {
    return { name: 'contact' };
  }

  return { name: 'home' };
}
