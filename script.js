const menuToggle = document.querySelector('.menu-toggle');
const concertMenu = document.querySelector('#concert-menu');
const menuBackdrop = document.querySelector('.menu-backdrop');
function setMenuOpen(open, restoreFocus = false) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  document.querySelector('.header').classList.toggle('is-menu-open', open);
  concertMenu.hidden = !open;
  menuBackdrop.hidden = !open;
  if (restoreFocus) menuToggle.focus({ preventScroll: true });
}
menuToggle.addEventListener('click', () => {
  setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});
menuBackdrop.addEventListener('click', () => setMenuOpen(false, true));
concertMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    setMenuOpen(false);
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !concertMenu.hidden) setMenuOpen(false, true);
});
document.addEventListener('focusin', event => {
  if (!concertMenu.hidden && !event.target.closest('.header')) setMenuOpen(false);
});
document.querySelector('.concert-brand').addEventListener('click', () => setMenuOpen(false));

// Reveal each chapter once; content stays visible without JS or reduced motion.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const items = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  items.forEach(item => {
    item.classList.add('motion-ready');
    observer.observe(item);
  });
  reduceMotion.addEventListener('change', event => {
    if (event.matches) {
      observer.disconnect();
      items.forEach(item => item.classList.add('is-visible'));
    }
  });
}

// Font loading, text wrapping and safe areas can change the header's real height.
const siteHeader = document.querySelector('.header');
function syncHeaderHeight() {
  document.documentElement.style.setProperty('--header-height', `${Math.ceil(siteHeader.getBoundingClientRect().height)}px`);
}
syncHeaderHeight();
if ('ResizeObserver' in window) new ResizeObserver(syncHeaderHeight).observe(siteHeader);
else window.addEventListener('resize', syncHeaderHeight);


// Keep the opening poster uncluttered; show the header identity after scrolling.
const headerBrand = document.querySelector('.header .concert-brand');
function syncScrollBrand() {
  const visible = window.scrollY > 32 || menuToggle.getAttribute('aria-expanded') === 'true';
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 32);
  if (visible) {
    headerBrand.removeAttribute('aria-hidden');
    headerBrand.removeAttribute('tabindex');
  } else {
    headerBrand.setAttribute('aria-hidden', 'true');
    headerBrand.setAttribute('tabindex', '-1');
  }
}
window.addEventListener('scroll', syncScrollBrand, { passive: true });
window.addEventListener('pageshow', syncScrollBrand);
menuToggle.addEventListener('click', syncScrollBrand);
new MutationObserver(syncScrollBrand).observe(menuToggle, { attributes: true, attributeFilter: ['aria-expanded'] });
syncScrollBrand();
