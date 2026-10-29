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
const themeColor = document.querySelector('meta[name="theme-color"]');
function syncScrollBrand() {
  const visible = window.scrollY > 32 || menuToggle.getAttribute('aria-expanded') === 'true';
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 32);
  if (themeColor) themeColor.setAttribute('content', visible ? '#FFFFFF' : '#03329C');
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

// Count production visits with Vercel Web Analytics; no visitor data is shown publicly.
if (location.protocol === 'https:' && !document.querySelector('script[src="/_vercel/insights/script.js"]')) {
  const analyticsScript = document.createElement('script');
  analyticsScript.src = '/_vercel/insights/script.js';
  analyticsScript.defer = true;
  document.head.appendChild(analyticsScript);
}

// Hidden visit counter: tap the footer SAMSUNG wordmark five times to reveal it.
const sponsorWordmark = document.querySelector('.samsung-wordmark');
if (sponsorWordmark) {
  const statsDialog = document.createElement('dialog');
  statsDialog.className = 'stats-dialog';
  statsDialog.setAttribute('aria-labelledby', 'stats-dialog-title');
  statsDialog.innerHTML = `
    <button class="stats-dialog-close" type="button" aria-label="닫기">×</button>
    <p class="stats-dialog-kicker">HEAR WE GO!</p>
    <h2 id="stats-dialog-title">누적 방문</h2>
    <img class="stats-visitor-badge" src="https://api.visitorbadge.io/api/visitors?path=hanwoori2026.vercel.app&amp;label=VISITS&amp;labelColor=%2303329C&amp;countColor=%23FF453A" alt="누적 방문 횟수" width="120" height="28">
    <p class="stats-dialog-note">페이지가 열린 횟수를 기준으로 집계합니다.</p>`;
  document.body.appendChild(statsDialog);
  statsDialog.querySelector('.stats-dialog-close').addEventListener('click', () => statsDialog.close());
  statsDialog.addEventListener('click', event => {
    if (event.target === statsDialog) statsDialog.close();
  });

  let statsTapCount = 0;
  let statsTapTimer;
  sponsorWordmark.addEventListener('click', () => {
    window.clearTimeout(statsTapTimer);
    statsTapCount += 1;
    if (statsTapCount === 5) {
      statsTapCount = 0;
      statsDialog.showModal();
      return;
    }
    statsTapTimer = window.setTimeout(() => { statsTapCount = 0; }, 2500);
  });
}
