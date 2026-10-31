const menuToggle = document.querySelector('.menu-toggle');
const concertMenu = document.querySelector('#concert-menu');
const menuBackdrop = document.querySelector('.menu-backdrop');

// Frequently asked questions sit close to the ticket and contact information.
const faqSection = document.createElement('section');
faqSection.id = 'faq';
faqSection.className = 'faq section';
faqSection.setAttribute('aria-labelledby', 'faq-heading');
faqSection.innerHTML = `
  <div class="section-inner">
    <div class="section-heading">
      <div><h2 id="faq-heading"><span class="heading-en" lang="en">FAQ</span> <span class="heading-ko">자주 묻는 질문</span></h2></div>
      <p>공연 관람 전 확인해 주세요.</p>
    </div>
    <div class="faq-list">
      <details class="faq-item"><summary><span>티켓 가격은 얼마인가요?</span><span class="faq-toggle" aria-hidden="true">+</span></summary><p>본 공연은 무료입니다. 모바일 초대권을 저장한 후 공연 당일 박스오피스에서 좌석권을 받아주세요.</p></details>
      <details class="faq-item"><summary><span>모바일 초대권은 어떻게 사용하나요?</span><span class="faq-toggle" aria-hidden="true">+</span></summary><p>공연 안내 사이트에서 모바일 초대권을 휴대폰에 저장해 주세요. 공연 당일 박스오피스에서 초대권을 보여주시면 좌석권으로 교환해 드립니다.</p></details>
      <details class="faq-item"><summary><span>초대권 한 장으로 여러 명이 입장할 수 있나요?</span><span class="faq-toggle" aria-hidden="true">+</span></summary><p>네. 모바일 초대권 한 장으로 여러 장의 좌석권을 받을 수 있습니다. 함께 방문한 관람객의 좌석권을 박스오피스에서 수령해 주세요.</p></details>
      <details class="faq-item"><summary><span>좌석은 어떻게 배정되나요?</span><span class="faq-toggle" aria-hidden="true">+</span></summary><p>좌석은 공연 당일 박스오피스에서 배정됩니다. 수령한 좌석권에 표시된 좌석에서 관람해 주세요.</p></details>
      <details class="faq-item"><summary><span>공연장에는 언제까지 도착해야 하나요?</span><span class="faq-toggle" aria-hidden="true">+</span></summary><p>원활한 좌석권 수령과 입장을 위해 공연 시작 30분 전까지 도착해 주세요. 공연은 오후 4시에 시작합니다.</p></details>
      <details class="faq-item"><summary><span>관람 가능한 연령은 어떻게 되나요?</span><span class="faq-toggle" aria-hidden="true">+</span></summary><p>초등학생 이상 관람할 수 있습니다. 미취학 아동은 입장이 어렵습니다.</p></details>
      <details class="faq-item"><summary><span>주차할 수 있나요?</span><span class="faq-toggle" aria-hidden="true">+</span></summary><p>삼성전자 인재개발원 내 주차장을 이용할 수 있습니다. 공연 당일 혼잡할 수 있으니 여유 있게 도착해 주세요.</p></details>
      <details class="faq-item"><summary><span>셔틀버스는 어디서 출발하나요?</span><span class="faq-toggle" aria-hidden="true">+</span></summary><p>양재역 9번 출구에서 오후 2시, 영통역 1번 출구에서 오후 3시와 오후 3시 30분에 출발합니다.</p></details>
      <details class="faq-item"><summary><span>대중교통으로 어떻게 방문하나요?</span><span class="faq-toggle" aria-hidden="true">+</span></summary><p>망포역 1번 출구에서 8번 버스 또는 영통역 1번 출구에서 55번 마을버스를 이용해 주세요.</p></details>
      <details class="faq-item"><summary><span>‘꽃보다 기부’는 무엇인가요?</span><span class="faq-toggle" aria-hidden="true">+</span></summary><p>꽃다발 대신 따뜻한 마음을 기부로 전하는 캠페인입니다. 공연 당일 로비의 ‘꽃보다 기부’ 코너에서 축하하고 싶은 단원의 이름으로 참여할 수 있습니다.</p></details>
      <details class="faq-item"><summary><span>기부는 어떻게 할 수 있나요?</span><span class="faq-toggle" aria-hidden="true">+</span></summary><p>공연 당일 ‘꽃보다 기부’ 코너에서 현금 또는 계좌이체로 참여할 수 있습니다.</p></details>
      <details class="faq-item"><summary><span>기부금은 어디에 사용되나요?</span><span class="faq-toggle" aria-hidden="true">+</span></summary><p>모인 기부금은 삼성서울병원 희귀난치병 환우를 위해 사용됩니다.</p></details>
      <details class="faq-item"><summary><span>공연 관련 문의는 어디로 하면 되나요?</span><span class="faq-toggle" aria-hidden="true">+</span></summary><p>카카오톡 채널 ‘삼성한우리합창단’으로 문의해 주세요.</p></details>
    </div>
  </div>`;
document.querySelector('#ticket').before(faqSection);
const contactMenuLink = concertMenu.querySelector('a[href="#ticket"]');
const faqMenuLink = document.createElement('a');
faqMenuLink.href = '#faq';
faqMenuLink.innerHTML = 'FAQ <span aria-hidden="true">↗</span>';
contactMenuLink.before(faqMenuLink);

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

// “꽃보다 기부” opens only on request; the native dialog provides focus trapping and ESC support.
const donationFab = document.createElement('button');
donationFab.className = 'donation-fab';
donationFab.type = 'button';
donationFab.setAttribute('aria-haspopup', 'dialog');
donationFab.setAttribute('aria-controls', 'donation-dialog');
donationFab.innerHTML = '<span class="donation-fab-icon" aria-hidden="true">🌷</span><span class="donation-fab-copy"><strong>꽃보다 기부</strong><small>캠페인 참여 안내</small></span><span class="donation-fab-arrow" aria-hidden="true">↗</span>';

const donationDialog = document.createElement('dialog');
donationDialog.id = 'donation-dialog';
donationDialog.className = 'donation-dialog';
donationDialog.setAttribute('aria-labelledby', 'donation-dialog-title');
donationDialog.setAttribute('aria-describedby', 'donation-dialog-description');
donationDialog.innerHTML = `
  <div class="donation-sheet">
    <button class="donation-dialog-close" type="button" aria-label="꽃보다 기부 안내 닫기">×</button>
    <p class="donation-kicker">꽃보다 기부</p>
    <h2 id="donation-dialog-title">꽃다발 대신,<br>따뜻한 마음을 전해주세요.</h2>
    <p id="donation-dialog-description" class="donation-lead">무대 위 단원에게 전하는 축하와 응원의 마음을 기부로 나눠보세요.</p>
    <div class="donation-details">
      <section>
        <h3>참여 방법</h3>
        <p>공연 당일 로비의 <strong>‘꽃보다 기부’ 코너</strong>에서 축하하고 싶은 단원의 이름으로 기부할 수 있습니다.</p>
      </section>
      <section>
        <h3>기부금 사용처</h3>
        <p>삼성서울병원 희귀난치병 환우</p>
      </section>
    </div>
    <button class="donation-dialog-confirm" type="button">확인</button>
  </div>`;
document.body.append(donationFab, donationDialog);

const donationCloseButton = donationDialog.querySelector('.donation-dialog-close');
const donationConfirmButton = donationDialog.querySelector('.donation-dialog-confirm');
let donationReturnFocus = null;
function closeDonationDialog() {
  if (donationDialog.open) donationDialog.close();
}
donationFab.addEventListener('click', () => {
  donationReturnFocus = document.activeElement;
  donationDialog.showModal();
  donationCloseButton.focus();
});
donationCloseButton.addEventListener('click', closeDonationDialog);
donationConfirmButton.addEventListener('click', closeDonationDialog);
donationDialog.addEventListener('click', event => {
  const bounds = donationDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) closeDonationDialog();
});
donationDialog.addEventListener('close', () => {
  if (donationReturnFocus instanceof HTMLElement) donationReturnFocus.focus({ preventScroll: true });
});
